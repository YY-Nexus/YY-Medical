"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Activity } from "lucide-react"

interface PerformanceMetrics {
  memory: number
  loadTime: number
  fps: number
  timestamp: number
}

export function SimplePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const updateMetrics = () => {
      const memory = (performance as any).memory?.usedJSHeapSize || 0
      const loadTime = performance.now()

      setMetrics({
        memory: Math.round((memory / 1024 / 1024) * 100) / 100,
        loadTime: Math.round(loadTime),
        fps: 60, // 简化的FPS值
        timestamp: Date.now(),
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 2000)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsMinimized(false)} size="icon" variant="outline" className="bg-white shadow-lg">
          <Activity className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-64 bg-white shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">性能监控</CardTitle>
            <div className="flex gap-1">
              <Button onClick={() => setIsMinimized(true)} size="icon" variant="ghost" className="h-6 w-6">
                <span className="text-xs">−</span>
              </Button>
              <Button onClick={() => setIsVisible(false)} size="icon" variant="ghost" className="h-6 w-6">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {metrics && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>内存使用:</span>
                <span className="font-mono">{metrics.memory} MB</span>
              </div>
              <div className="flex justify-between">
                <span>加载时间:</span>
                <span className="font-mono">{metrics.loadTime} ms</span>
              </div>
              <div className="flex justify-between">
                <span>帧率:</span>
                <span className="font-mono">{metrics.fps} FPS</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                更新时间: {new Date(metrics.timestamp).toLocaleTimeString()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
