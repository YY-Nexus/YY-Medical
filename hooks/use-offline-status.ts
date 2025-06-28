"use client"

import { useState, useEffect } from "react"

export function useOfflineStatus() {
  // 初始状态设置为当前的在线状态
  const [isOffline, setIsOffline] = useState(typeof navigator !== "undefined" ? !navigator.onLine : false)

  // 离线消息
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null)

  // 上次离线时间
  const [lastOfflineTime, setLastOfflineTime] = useState<Date | null>(null)

  useEffect(() => {
    // 处理离线事件
    const handleOffline = () => {
      setIsOffline(true)
      setOfflineMessage("您当前处于离线状态，部分功能可能不可用")
      setLastOfflineTime(new Date())
    }

    // 处理在线事件
    const handleOnline = () => {
      setIsOffline(false)

      if (lastOfflineTime) {
        const now = new Date()
        const diffInMinutes = Math.round((now.getTime() - lastOfflineTime.getTime()) / 60000)

        if (diffInMinutes < 1) {
          setOfflineMessage("网络连接已恢复")
        } else {
          setOfflineMessage(`网络连接已恢复，您已离线 ${diffInMinutes} 分钟`)
        }

        // 5秒后清除消息
        setTimeout(() => {
          setOfflineMessage(null)
        }, 5000)
      }
    }

    // 添加事件监听器
    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    // 初始检查
    if (!navigator.onLine) {
      handleOffline()
    }

    // 清理事件监听器
    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [lastOfflineTime])

  return { isOffline, offlineMessage, setOfflineMessage }
}
