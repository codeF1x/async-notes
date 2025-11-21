// src/components/error-boundary.tsx
import { Component, type ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

type ErrorBoundaryProps = {
    children: ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    handleRetry = () => {
        // 简单粗暴：刷新页面重新请求
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-screen flex items-center justify-center">
                    <Alert variant="destructive" className="max-w-md">
                        <AlertTitle>加载失败</AlertTitle>
                        <AlertDescription className="space-y-2">
                            <p>{this.state.error?.message ?? "未知错误"}</p>
                            <Button size="sm" onClick={this.handleRetry}>
                                重试
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            )
        }

        return this.props.children
    }
}
