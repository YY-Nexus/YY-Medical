"use client"

import type React from "react"

import { useEffect } from "react"
import { isClient } from "@/utils/client-utils"

interface GlobalErrorHandlerProps {
  children: React.ReactNode
}

export function GlobalErrorHandler({ children }: GlobalErrorHandlerProps) {
  useEffect(() => {
    if (!isClient) return

    // 处理未捕获的Promise错误
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("未处理的Promise拒绝:", event.reason)
      // 可以在这里添加错误报告逻辑
      event.preventDefault()
    }

    // 处理全局错误
    const handleError = (event: ErrorEvent) => {
      console.error("全局错误:", event.error)
      // 可以在这里添加错误报告逻辑
      event.preventDefault()
    }

    // 添加事件监听器
    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // 清理函数
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])

  return <>{children}</>
}
