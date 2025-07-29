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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setIsLoading(false)
      } catch (error) {
        console.error("应用初始化失败:", error)
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOW_PERFORMANCE_MONITOR === "true") {
      const timer = setTimeout(() => {
        setShowPerformanceMonitor(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

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
