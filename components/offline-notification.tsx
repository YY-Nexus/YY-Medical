"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WifiOff, Wifi } from "lucide-react"
import { useOfflineStatus } from "@/hooks/use-offline-status"

export function OfflineNotification() {
  const { isOffline, offlineMessage, setOfflineMessage } = useOfflineStatus()
  const [visible, setVisible] = useState(false)

  // 控制通知显示
  useEffect(() => {
    if (offlineMessage) {
      setVisible(true)

      // 如果是在线消息，5秒后自动隐藏
      if (!isOffline) {
        const timer = setTimeout(() => {
          setVisible(false)
        }, 5000)
        return () => clearTimeout(timer)
      }
    } else {
      setVisible(false)
    }
  }, [offlineMessage, isOffline])

  // 关闭通知
  const handleClose = () => {
    setVisible(false)
    if (!isOffline) {
      setOfflineMessage(null)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`fixed top-0 left-0 right-0 z-50 mx-auto max-w-md px-4 py-3 mt-4 rounded-lg shadow-lg flex items-center ${
            isOffline ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <div className="mr-3">{isOffline ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}</div>
          <div className="flex-1">{offlineMessage}</div>
          <button
            onClick={handleClose}
            className="ml-3 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label="关闭通知"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
