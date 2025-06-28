"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { performanceMonitor, markUserInteraction } from "@/services/performance-monitoring-service"

type EventTrackerProps = {
  children: React.ReactNode
  eventName: string
  data?: Record<string, any>
  trackMount?: boolean
  trackUnmount?: boolean
  trackClick?: boolean
  trackHover?: boolean
}

export default function EventTracker({
  children,
  eventName,
  data = {},
  trackMount = false,
  trackUnmount = false,
  trackClick = false,
  trackHover = false,
}: EventTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 跟踪组件挂载
    if (trackMount) {
      performanceMonitor.trackEvent(`${eventName}:挂载`, {
        ...data,
        timestamp: Date.now(),
      })
    }

    // 跟踪组件卸载
    return () => {
      if (trackUnmount) {
        performanceMonitor.trackEvent(`${eventName}:卸载`, {
          ...data,
          timestamp: Date.now(),
        })
      }
    }
  }, [])

  // 点击事件处理
  const handleClick = () => {
    if (trackClick) {
      performanceMonitor.trackEvent(`${eventName}:点击`, {
        ...data,
        timestamp: Date.now(),
      })

      // 使用用户交互标记
      const endMark = markUserInteraction(`${eventName}:点击`)
      // 模拟处理时间
      setTimeout(endMark, 100)
    }
  }

  // 悬停事件处理
  const handleMouseEnter = () => {
    if (trackHover) {
      performanceMonitor.trackEvent(`${eventName}:悬停开始`, {
        ...data,
        timestamp: Date.now(),
      })
    }
  }

  const handleMouseLeave = () => {
    if (trackHover) {
      performanceMonitor.trackEvent(`${eventName}:悬停结束`, {
        ...data,
        timestamp: Date.now(),
      })
    }
  }

  return (
    <div ref={ref} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}
