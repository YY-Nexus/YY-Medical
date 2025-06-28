"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useOfflineStatus } from "@/hooks/use-offline-status"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  progress: number
  skipLoading: () => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
  progress: 0,
  skipLoading: () => {},
})

export const useLoading = () => useContext(LoadingContext)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const isMobile = useIsMobile()
  const { isOffline } = useOfflineStatus()

  // 跳过加载动画
  const skipLoading = () => {
    setProgress(100)
    setIsLoading(false)
  }

  // 模拟加载进度
  useEffect(() => {
    if (!isLoading) {
      setProgress(100)
      return
    }

    // 移动设备上加载速度稍快
    const loadingSpeed = isMobile ? 250 : 200
    // 离线状态下最大进度为95%
    const maxProgress = isOffline ? 95 : 90

    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= maxProgress) {
          clearInterval(interval)
          return maxProgress
        }
        return prev + (maxProgress - prev) * 0.1
      })
    }, loadingSpeed)

    return () => clearInterval(interval)
  }, [isLoading, isMobile, isOffline])

  // 初始加载完成后
  useEffect(() => {
    // 离线状态下不自动完成加载，需要用户手动跳过
    if (!isOffline) {
      // 移动设备上加载时间稍短
      const loadingDuration = isMobile ? 2500 : 3000

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, loadingDuration)

      return () => clearTimeout(timer)
    }
  }, [isMobile, isOffline])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, progress, skipLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
