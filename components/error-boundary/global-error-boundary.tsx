"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { errorService, ErrorType } from "@/services/error-handling-service"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新状态，下次渲染时显示错误UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 记录错误信息
    this.setState({
      errorInfo,
    })

    // 使用错误处理服务记录错误
    errorService?.handleError?.(error, ErrorType.CLIENT, {
      componentStack: errorInfo.componentStack,
      path: typeof window !== "undefined" ? window.location.pathname : "",
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
    })

    // 在控制台输出更详细的错误信息
    console.error("应用程序错误:", error)
    console.error("组件堆栈:", errorInfo.componentStack)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleReload = (): void => {
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 渲染错误UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">应用程序错误</h2>
            <p className="text-gray-600 mb-6">
              抱歉，应用程序遇到了意外错误。我们的技术团队已经收到通知，正在努力解决问题。
            </p>
            <div className="space-y-3">
              <MedicalButton onClick={this.handleReset} className="w-full">
                尝试恢复
              </MedicalButton>
              <MedicalButton variant="outline" onClick={this.handleReload} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                刷新页面
              </MedicalButton>
              <MedicalButton variant="ghost" onClick={() => (window.location.href = "/")} className="w-full">
                返回首页
              </MedicalButton>
            </div>

            {process.env.NODE_ENV !== "production" && this.state.error && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-60">
                <p className="font-mono text-sm text-red-600 mb-2">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre className="font-mono text-xs text-gray-700 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
