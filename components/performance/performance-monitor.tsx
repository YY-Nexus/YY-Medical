"use client"

import { useEffect, useState } from "react"
import { X, Activity, Cpu, Clock } from "lucide-react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  cls: number | null
  fid: number | null
  ttfb: number | null
  jsHeapSize: number | null
  domNodes: number | null
  renderTime: number | null
}

export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(true)
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    jsHeapSize: null,
    domNodes: null,
    renderTime: null,
  })

  useEffect(() => {
    // 确保只在客户端运行
    if (typeof window === "undefined") return

    // 检查是否支持性能API
    if (!window.performance) {
      console.warn("性能API不受支持")
      return
    }

    // 收集基本性能指标
    const collectBasicMetrics = () => {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navEntry) {
        setMetrics((prev) => ({
          ...prev,
          ttfb: Math.round(navEntry.responseStart - navEntry.requestStart),
        }))
      }

      // 获取DOM节点数量
      const domNodes = document.querySelectorAll("*").length
      setMetrics((prev) => ({
        ...prev,
        domNodes,
      }))

      // 获取JS堆大小（如果可用）
      if (performance.memory) {
        setMetrics((prev) => ({
          ...prev,
          jsHeapSize: Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024)),
        }))
      }
    }

    // 收集Web Vitals指标
    const collectWebVitals = () => {
      if ("PerformanceObserver" in window) {
        // 首次内容绘制 (FCP)
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            if (entries.length > 0) {
              const fcp = entries[0].startTime
              setMetrics((prev) => ({
                ...prev,
                fcp: Math.round(fcp),
              }))
            }
          }).observe({ type: "paint", buffered: true })
        } catch (e) {
          console.warn("FCP监控不受支持", e)
        }

        // 最大内容绘制 (LCP)
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            if (entries.length > 0) {
              const lcp = entries[entries.length - 1].startTime
              setMetrics((prev) => ({
                ...prev,
                lcp: Math.round(lcp),
              }))
            }
          }).observe({ type: "largest-contentful-paint", buffered: true })
        } catch (e) {
          console.warn("LCP监控不受支持", e)
        }

        // 累积布局偏移 (CLS)
        try {
          let clsValue = 0
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
              }
            }
            setMetrics((prev) => ({
              ...prev,
              cls: Math.round(clsValue * 1000) / 1000,
            }))
          }).observe({ type: "layout-shift", buffered: true })
        } catch (e) {
          console.warn("CLS监控不受支持", e)
        }

        // 首次输入延迟 (FID)
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            if (entries.length > 0) {
              const fid = entries[0].processingStart - entries[0].startTime
              setMetrics((prev) => ({
                ...prev,
                fid: Math.round(fid),
              }))
            }
          }).observe({ type: "first-input", buffered: true })
        } catch (e) {
          console.warn("FID监控不受支持", e)
        }
      }
    }

    // 测量渲染时间
    const startTime = performance.now()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const endTime = performance.now()
        setMetrics((prev) => ({
          ...prev,
          renderTime: Math.round(endTime - startTime),
        }))
      })
    })

    // 收集所有指标
    collectBasicMetrics()
    collectWebVitals()

    // 定期更新内存和DOM节点数量
    const intervalId = setInterval(() => {
      collectBasicMetrics()
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1 text-blue-500" />
          <span className="text-gray-600">FCP:</span>
          <span className="ml-1 font-mono">{metrics.fcp !== null ? `${metrics.fcp}ms` : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1 text-green-500" />
          <span className="text-gray-600">LCP:</span>
          <span className="ml-1 font-mono">{metrics.lcp !== null ? `${metrics.lcp}ms` : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <Activity className="w-3 h-3 mr-1 text-yellow-500" />
          <span className="text-gray-600">CLS:</span>
          <span className="ml-1 font-mono">{metrics.cls !== null ? metrics.cls : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1 text-purple-500" />
          <span className="text-gray-600">FID:</span>
          <span className="ml-1 font-mono">{metrics.fid !== null ? `${metrics.fid}ms` : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1 text-red-500" />
          <span className="text-gray-600">TTFB:</span>
          <span className="ml-1 font-mono">{metrics.ttfb !== null ? `${metrics.ttfb}ms` : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <Cpu className="w-3 h-3 mr-1 text-blue-500" />
          <span className="text-gray-600">内存:</span>
          <span className="ml-1 font-mono">{metrics.jsHeapSize !== null ? `${metrics.jsHeapSize}MB` : "不可用"}</span>
        </div>
        <div className="flex items-center">
          <Activity className="w-3 h-3 mr-1 text-green-500" />
          <span className="text-gray-600">DOM:</span>
          <span className="ml-1 font-mono">{metrics.domNodes !== null ? metrics.domNodes : "测量中..."}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1 text-orange-500" />
          <span className="text-gray-600">渲染:</span>
          <span className="ml-1 font-mono">
            {metrics.renderTime !== null ? `${metrics.renderTime}ms` : "测量中..."}
          </span>
        </div>
      </div>
    </div>
  )
}
