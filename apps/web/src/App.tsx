/**
 * 首次渲染走到 NotesInitializer → 调用 notesResource.read()

因为还在请求 → read() 抛出 Promise → Suspense 捕获 → 显示 <AppSkeleton />

请求成功 → read() 返回 notes → useEffect 把 notes 塞进 Zustand

children（AppLayout & 其子组件）重渲染 → Sidebar/MainArea 从 store 读到数据

如果请求失败 → read() 抛出 Error → ErrorBoundary 捕获 → 显示 <Alert> + 重试按钮
 */
import { Suspense } from "react"
import AppLayout from "@/components/layout/app-layout"
import { NotesInitializer } from "@/components/notes-initializer"
import { ErrorBoundary } from "@/components/error-boundary"
import { AppSkeleton } from "@/components/layout/app-skeleton"

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppSkeleton />}>
        <NotesInitializer>
          <AppLayout />
        </NotesInitializer>
      </Suspense>
    </ErrorBoundary>
  )
}
