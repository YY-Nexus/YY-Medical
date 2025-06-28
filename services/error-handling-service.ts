export enum ErrorType {
  NETWORK = "network",
  SERVER = "server",
  CLIENT = "client",
  VALIDATION = "validation",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  NOT_FOUND = "not_found",
  TIMEOUT = "timeout",
  UNKNOWN = "unknown",
}

export interface ErrorDetails {
  message: string
  type: ErrorType
  code?: string
  path?: string
  timestamp?: number
  data?: any
}

type ErrorListener = (errorDetails: ErrorDetails) => void

class ErrorHandlingService {
  private listeners: ErrorListener[] = []
  private errorLog: ErrorDetails[] = []
  private maxLogSize = 100

  constructor() {
    // 全局错误处理
    if (typeof window !== "undefined") {
      window.addEventListener("error", (event) => {
        this.handleError(event.error || new Error(event.message), ErrorType.CLIENT, {
          path: window.location.pathname,
        })
      })

      window.addEventListener("unhandledrejection", (event) => {
        this.handleError(
          event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
          ErrorType.CLIENT,
          {
            path: window.location.pathname,
          },
        )
      })
    }
  }

  public handleError(error: Error, type: ErrorType = ErrorType.UNKNOWN, additionalData: any = {}): void {
    const errorDetails: ErrorDetails = {
      message: error.message || "未知错误",
      type,
      timestamp: Date.now(),
      ...additionalData,
    }

    // 记录错误
    this.logError(errorDetails)

    // 通知监听器
    this.notifyListeners(errorDetails)

    // 根据错误类型执行特定操作
    this.handleSpecificErrorType(errorDetails)

    // 开发环境下在控制台输出错误
    if (process.env.NODE_ENV !== "production") {
      console.error(`[${type}] ${error.message}`, error, additionalData)
    }
  }

  public addErrorListener(listener: ErrorListener): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  public getErrorLog(): ErrorDetails[] {
    return [...this.errorLog]
  }

  public clearErrorLog(): void {
    this.errorLog = []
  }

  private logError(errorDetails: ErrorDetails): void {
    this.errorLog.unshift(errorDetails)
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(0, this.maxLogSize)
    }
  }

  private notifyListeners(errorDetails: ErrorDetails): void {
    this.listeners.forEach((listener) => {
      try {
        listener(errorDetails)
      } catch (error) {
        console.error("错误监听器执行失败", error)
      }
    })
  }

  private handleSpecificErrorType(errorDetails: ErrorDetails): void {
    switch (errorDetails.type) {
      case ErrorType.AUTHENTICATION:
        // 可以在这里处理身份验证错误，例如重定向到登录页面
        break
      case ErrorType.NETWORK:
        // 网络错误处理
        break
      case ErrorType.SERVER:
        // 服务器错误处理
        break
      // 其他错误类型的特定处理...
    }
  }
}

// 创建单例实例
export const errorService = new ErrorHandlingService()
