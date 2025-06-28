"use client"

import { useState, useEffect } from "react"
import { X, Activity } from "lucide-react"

export function SimplePerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(true)
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [domNodes, setDomNodes] = useState<number | null>(null)

  useEffect(() => {
    // 确保只在客户端运行
    if (typeof window === "undefined") return

    // 初始收集
    collectMetrics()

    // 定期更新
    const intervalId = setInterval(collectMetrics, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const collectMetrics = () => {
    // 获取DOM节点数量
    setDomNodes(document.querySelectorAll("*").length)

    // 获取内存使用情况（如果可用）
    if (performance && (performance as any).memory) {
      setMemoryUsage(Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024)))
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 right-0 z-50 p-2 bg-white border border-medical-200 rounded-tl-lg shadow-lg text-xs">
      <div className="flex justify-between items-center mb-1">
        <div className="font-bold flex items-center text-medical-700">
          <Activity className="w-3 h-3 mr-1" />
          性能监控
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="关闭性能监控"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-y-1">
        <div className="flex items-center">
          <span className="text-gray-600">DOM节点:</span>
          <span className="ml-1 font-mono">{domNodes !== null ? domNodes : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600">内存使用:</span>
          <span className="ml-1 font-mono">{memoryUsage !== null ? `${memoryUsage}MB` : "不可用"}</span>
        </div>
      </div>
    </div>
  )
}
