"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useOfflineStatus } from "@/hooks/use-offline-status"
import { OfflineNotification } from "@/components/offline-notification"
import { NetworkErrorHandler } from "@/components/error-boundary/network-error-handler"
import { SimplePerformanceMonitor } from "@/components/performance/simple-performance-monitor"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const { isOffline } = useOfflineStatus()
  const [isLoading, setIsLoading] = useState(true)
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false)

  // 简化加载逻辑，快速完成初始化
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 模拟必要的初始化，但不要太长
        await new Promise((resolve) => setTimeout(resolve, 800))
        setIsLoading(false)
      } catch (error) {
        console.error("应用初始化失败:", error)
        // 即使出错也要结束加载状态
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  // 延迟显示性能监控
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOW_PERFORMANCE_MONITOR === "true") {
      const timer = setTimeout(() => {
        setShowPerformanceMonitor(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  // 如果还在加载，显示简化的加载界面
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-blue-700 font-medium">系统初始化中...</p>
        </div>
      </div>
    )
  }

  return (
    <NetworkErrorHandler>
      <div className="flex flex-col min-h-screen">
        <OfflineNotification />
        <main className="flex-1">{children}</main>
        {showPerformanceMonitor && <SimplePerformanceMonitor />}
      </div>
    </NetworkErrorHandler>
  )
}
