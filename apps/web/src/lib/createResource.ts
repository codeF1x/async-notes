type Status = "pending" | "success" | "error"

export function createResource<T>(promise: Promise<T>) {
  let status: Status = "pending"
  let result: T | Error

  const suspender = promise.then(
    (value) => {
      status = "success"
      result = value
    },
    (error) => {
      status = "error"
      result = error
    }
  )

  return {
    read(): T {
      if (status === "pending") {
        // 告诉 React：我还在加载，去走 Suspense fallback
        throw suspender
      }
      if (status === "error") {
        // 告诉 React：我挂了，交给 ErrorBoundary
        throw result
      }
      return result as T
    },
  }
}
