"use client"

import { useOfflineStatus } from "@/hooks/use-offline-status"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WifiOff, Wifi, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export function OfflineNotification() {
  const { isOnline, wasOffline } = useOfflineStatus()
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true)
      const timer = setTimeout(() => {
        setShowReconnected(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, wasOffline])

  if (isOnline && !showReconnected) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {!isOnline ? (
        <Alert className="border-yellow-200 bg-yellow-50">
          <WifiOff className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <div className="flex items-center justify-between">
              <span>您当前处于离线状态</span>
              <AlertTriangle className="h-4 w-4 ml-2" />
            </div>
            <p className="text-xs mt-1 text-yellow-700">部分功能可能受限，数据将在重新连接后同步</p>
          </AlertDescription>
        </Alert>
      ) : showReconnected ? (
        <Alert className="border-green-200 bg-green-50">
          <Wifi className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="flex items-center justify-between">
              <span>网络连接已恢复</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse ml-2" />
            </div>
            <p className="text-xs mt-1 text-green-700">正在同步离线期间的数据...</p>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  )
}
