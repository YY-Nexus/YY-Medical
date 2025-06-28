"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { errorService, ErrorType } from "@/services/error-handling-service"

interface NetworkErrorHandlerProps {
  children: React.ReactNode
}

export function NetworkErrorHandler({ children }: NetworkErrorHandlerProps) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [apiServerError, setApiServerError] = useState(false)
  const [failedRequests, setFailedRequests] = useState<string[]>([])

  useEffect(() => {
    // 监听在线状态变化
    const handleOnline = () => {
      setIsOnline(true)
      // 如果恢复在线，尝试清除API服务器错误状态
      if (apiServerError) {
        setTimeout(() => {
          setApiServerError(false)
        }, 2000)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      // 记录网络错误
      errorService?.handleError?.(new Error("网络连接已断开"), ErrorType.NETWORK, { timestamp: Date.now() })
    }

    // 监听API错误
    const removeErrorListener = errorService?.addErrorListener?.((errorDetails) => {
      if (errorDetails.type === ErrorType.SERVER || errorDetails.type === ErrorType.NETWORK) {
        // 如果是服务器错误或网络错误，可能表示API服务器问题
        if (isOnline) {
          setApiServerError(true)
          // 记录失败的请求路径
          if (errorDetails.path) {
            setFailedRequests((prev) => {
              const newRequests = [...prev, errorDetails.path!]
              // 只保留最近5个请求
              return newRequests.slice(-5)
            })
          }
        }
      }
    })

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      removeErrorListener?.()
    }
  }, [isOnline, apiServerError])

  // 尝试重新连接
  const handleReconnect = () => {
    setIsReconnecting(true)

    // 模拟网络检查
    setTimeout(() => {
      setIsReconnecting(false)
      // 如果已经恢复在线，刷新页面
      if (navigator.onLine) {
        window.location.reload()
      }
    }, 2000)
  }

  // 继续尝试（忽略API服务器错误）
  const handleContinue = () => {
    setApiServerError(false)
  }

  // 检查是否显示网络错误UI
  if (!isOnline || apiServerError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 text-center border border-medical-100">
          <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {isOnline ? (
              <Wifi className="h-8 w-8 text-medical-500" />
            ) : (
              <WifiOff className="h-8 w-8 text-medical-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-medical-800 mb-2">
            {apiServerError ? "服务器连接问题" : "网络连接中断"}
          </h2>
          <p className="text-medical-600 mb-6">
            {apiServerError
              ? "无法连接到医枢³服务器。请稍后再试，或联系技术支持。"
              : "您的设备似乎已断开网络连接。请检查您的网络设置并重试。"}
          </p>
          <div className="space-y-3">
            <MedicalButton onClick={() => window.location.reload()} className="w-full">
              {isReconnecting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  正在重新连接...
                </>
              ) : (
                <>
                  <Wifi className="mr-2 h-4 w-4" />
                  重新连接
                </>
              )}
            </MedicalButton>
            {apiServerError && (
              <MedicalButton variant="outline" onClick={handleContinue} className="w-full">
                继续尝试
              </MedicalButton>
            )}
          </div>

          {process.env.NODE_ENV !== "production" && failedRequests.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-60">
              <p className="font-mono text-sm text-gray-700 mb-2">失败的请求:</p>
              <ul className="list-disc pl-5">
                {failedRequests.map((url, index) => (
                  <li key={index} className="font-mono text-xs text-gray-600 truncate">
                    {url}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 如果没有错误，正常渲染子组件
  return <>{children}</>
}
