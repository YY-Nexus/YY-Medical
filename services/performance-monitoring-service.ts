"use client"

import type React from "react"

import { useEffect, useState } from "react"

// 性能指标类型
export type PerformanceMetric = {
  name: string
  value: number
  unit: string
  timestamp: number
}

// 自定义事件类型
export type CustomEvent = {
  name: string
  data: Record<string, any>
  timestamp: number
}

// 性能报告类型
export type PerformanceReport = {
  metrics: PerformanceMetric[]
  events: CustomEvent[]
  navigationTiming: Record<string, number>
  resourceTiming: Array<Record<string, any>>
  userTiming: Array<Record<string, any>>
}

class PerformanceMonitoringService {
  private metrics: PerformanceMetric[] = []
  private events: CustomEvent[] = []
  private observers: Array<(report: PerformanceReport) => void> = []
  private isMonitoring = false
  private intervalId: NodeJS.Timeout | null = null
  private config = {
    collectInterval: 5000, // 收集间隔，默认5秒
    maxMetrics: 100, // 最大指标数量
    maxEvents: 100, // 最大事件数量
    enabledInProduction: false, // 是否在生产环境启用
    trackResourceTiming: true, // 是否跟踪资源加载时间
    trackUserTiming: true, // 是否跟踪用户交互时间
    trackLongTasks: true, // 是否跟踪长任务
    trackMemory: true, // 是否跟踪内存使用
    customMetrics: [] as string[], // 自定义指标
  }

  constructor() {
    // 仅在浏览器环境中初始化
    if (typeof window !== "undefined") {
      this.setupPerformanceObservers()
    }
  }

  // 配置监控服务
  configure(config: Partial<typeof this.config>) {
    this.config = { ...this.config, ...config }
    return this
  }

  // 开始监控
  startMonitoring() {
    if (this.isMonitoring) return this

    // 生产环境检查
    if (process.env.NODE_ENV === "production" && !this.config.enabledInProduction) {
      console.warn("性能监控在生产环境中被禁用。如需启用，请设置 enabledInProduction: true")
      return this
    }

    this.isMonitoring = true
    this.collectInitialMetrics()

    // 定期收集指标
    this.intervalId = setInterval(() => {
      this.collectPeriodicMetrics()
      this.notifyObservers()
    }, this.config.collectInterval)

    return this
  }

  // 停止监控
  stopMonitoring() {
    if (!this.isMonitoring) return this

    this.isMonitoring = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    return this
  }

  // 添加自定义指标
  addMetric(name: string, value: number, unit = "") {
    if (!this.isMonitoring) return this

    this.metrics.push({
      name,
      value,
      unit,
      timestamp: Date.now(),
    })

    // 限制指标数量
    if (this.metrics.length > this.config.maxMetrics) {
      this.metrics = this.metrics.slice(-this.config.maxMetrics)
    }

    return this
  }

  // 跟踪自定义事件
  trackEvent(name: string, data: Record<string, any> = {}) {
    if (!this.isMonitoring) return this

    this.events.push({
      name,
      data,
      timestamp: Date.now(),
    })

    // 限制事件数量
    if (this.events.length > this.config.maxEvents) {
      this.events = this.events.slice(-this.config.maxEvents)
    }

    return this
  }

  // 订阅性能报告
  subscribe(callback: (report: PerformanceReport) => void) {
    this.observers.push(callback)
    return () => {
      this.observers = this.observers.filter((cb) => cb !== callback)
    }
  }

  // 获取当前性能报告
  getReport(): PerformanceReport {
    return {
      metrics: [...this.metrics],
      events: [...this.events],
      navigationTiming: this.getNavigationTiming(),
      resourceTiming: this.getResourceTiming(),
      userTiming: this.getUserTiming(),
    }
  }

  // 清除所有收集的数据
  clearData() {
    this.metrics = []
    this.events = []
    return this
  }

  // 设置性能观察器
  private setupPerformanceObservers() {
    if (typeof PerformanceObserver === "undefined") return

    // 观察长任务
    if (this.config.trackLongTasks) {
      try {
        const longTaskObserver = new PerformanceObserver((entries) => {
          entries.getEntries().forEach((entry) => {
            this.addMetric(`长任务-${entry.name || "未命名"}`, entry.duration, "ms")
          })
        })
        longTaskObserver.observe({ entryTypes: ["longtask"] })
      } catch (e) {
        console.warn("长任务观察不可用:", e)
      }
    }

    // 观察资源加载
    if (this.config.trackResourceTiming) {
      try {
        const resourceObserver = new PerformanceObserver((entries) => {
          entries.getEntries().forEach((entry) => {
            if (entry.entryType === "resource") {
              const resourceEntry = entry as PerformanceResourceTiming
              this.trackEvent("资源加载", {
                name: resourceEntry.name,
                initiatorType: resourceEntry.initiatorType,
                duration: resourceEntry.duration,
                transferSize: resourceEntry.transferSize,
                decodedBodySize: resourceEntry.decodedBodySize,
              })
            }
          })
        })
        resourceObserver.observe({ entryTypes: ["resource"] })
      } catch (e) {
        console.warn("资源计时观察不可用:", e)
      }
    }

    // 观察用户交互
    if (this.config.trackUserTiming) {
      try {
        const userTimingObserver = new PerformanceObserver((entries) => {
          entries.getEntries().forEach((entry) => {
            this.trackEvent("用户计时", {
              name: entry.name,
              entryType: entry.entryType,
              startTime: entry.startTime,
              duration: entry.duration,
            })
          })
        })
        userTimingObserver.observe({ entryTypes: ["measure", "mark"] })
      } catch (e) {
        console.warn("用户计时观察不可用:", e)
      }
    }
  }

  // 收集初始指标
  private collectInitialMetrics() {
    if (typeof window === "undefined" || !window.performance) return

    // 收集导航计时指标
    const navTiming = this.getNavigationTiming()
    Object.entries(navTiming).forEach(([name, value]) => {
      this.addMetric(`导航-${name}`, value, "ms")
    })

    // 收集FCP和LCP指标
    if ("getEntriesByType" in performance) {
      const paintEntries = performance.getEntriesByType("paint")
      paintEntries.forEach((entry) => {
        this.addMetric(`绘制-${entry.name}`, entry.startTime, "ms")
      })
    }
  }

  // 定期收集指标
  private collectPeriodicMetrics() {
    // 收集内存使用情况
    if (this.config.trackMemory && "memory" in performance) {
      const memory = (performance as any).memory
      if (memory) {
        this.addMetric("内存-已用堆大小", memory.usedJSHeapSize / (1024 * 1024), "MB")
        this.addMetric("内存-堆大小限制", memory.jsHeapSizeLimit / (1024 * 1024), "MB")
      }
    }

    // 收集自定义指标
    this.config.customMetrics.forEach((metricName) => {
      if (typeof window[metricName as keyof Window] === "function") {
        try {
          const value = (window[metricName as keyof Window] as Function)()
          if (typeof value === "number") {
            this.addMetric(`自定义-${metricName}`, value)
          }
        } catch (e) {
          console.warn(`无法收集自定义指标 ${metricName}:`, e)
        }
      }
    })

    // 收集FPS
    this.collectFPS()
  }

  // 收集FPS
  private lastFrameTime = 0
  private frameCount = 0
  private collectFPS() {
    if (typeof requestAnimationFrame === "undefined") return

    const now = performance.now()
    this.frameCount++

    // 每秒计算一次FPS
    if (now - this.lastFrameTime >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / (now - this.lastFrameTime))
      this.addMetric("FPS", fps, "fps")
      this.lastFrameTime = now
      this.frameCount = 0
    }

    requestAnimationFrame(() => this.collectFPS())
  }

  // 获取导航计时数据
  private getNavigationTiming(): Record<string, number> {
    if (typeof window === "undefined" || !window.performance) {
      return {}
    }

    const result: Record<string, number> = {}

    // 使用Navigation Timing API
    if ("getEntriesByType" in performance) {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navEntry) {
        result.loadTime = navEntry.loadEventEnd - navEntry.startTime
        result.domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.startTime
        result.firstByte = navEntry.responseStart - navEntry.requestStart
        result.domInteractive = navEntry.domInteractive - navEntry.startTime
        result.domComplete = navEntry.domComplete - navEntry.startTime
        result.redirectTime = navEntry.redirectEnd - navEntry.redirectStart
        result.dnsLookup = navEntry.domainLookupEnd - navEntry.domainLookupStart
        result.tcpConnection = navEntry.connectEnd - navEntry.connectStart
        result.requestTime = navEntry.responseEnd - navEntry.requestStart
      }
    }

    return result
  }

  // 获取资源计时数据
  private getResourceTiming(): Array<Record<string, any>> {
    if (typeof window === "undefined" || !window.performance || !this.config.trackResourceTiming) {
      return []
    }

    const result: Array<Record<string, any>> = []

    if ("getEntriesByType" in performance) {
      const resourceEntries = performance.getEntriesByType("resource")
      resourceEntries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming
        result.push({
          name: resourceEntry.name,
          initiatorType: resourceEntry.initiatorType,
          duration: resourceEntry.duration,
          transferSize: resourceEntry.transferSize,
          decodedBodySize: resourceEntry.decodedBodySize,
          startTime: resourceEntry.startTime,
        })
      })
    }

    return result
  }

  // 获取用户计时数据
  private getUserTiming(): Array<Record<string, any>> {
    if (typeof window === "undefined" || !window.performance || !this.config.trackUserTiming) {
      return []
    }

    const result: Array<Record<string, any>> = []

    if ("getEntriesByType" in performance) {
      const markEntries = performance.getEntriesByType("mark")
      const measureEntries = performance.getEntriesByType("measure")
      ;[...markEntries, ...measureEntries].forEach((entry) => {
        result.push({
          name: entry.name,
          entryType: entry.entryType,
          startTime: entry.startTime,
          duration: entry.duration,
        })
      })
    }

    return result
  }

  // 通知所有观察者
  private notifyObservers() {
    const report = this.getReport()
    this.observers.forEach((callback) => {
      try {
        callback(report)
      } catch (e) {
        console.error("性能监控观察者回调错误:", e)
      }
    })
  }
}

// 创建单例实例
export const performanceMonitor = new PerformanceMonitoringService()

// React Hook
export function usePerformanceMonitor(config?: Partial<typeof performanceMonitor.config>) {
  const [report, setReport] = useState<PerformanceReport | null>(null)

  useEffect(() => {
    // 配置并启动监控
    if (config) {
      performanceMonitor.configure(config)
    }

    performanceMonitor.startMonitoring()

    // 订阅报告更新
    const unsubscribe = performanceMonitor.subscribe((newReport) => {
      setReport(newReport)
    })

    // 清理函数
    return () => {
      unsubscribe()
      performanceMonitor.stopMonitoring()
    }
  }, [])

  // 返回当前报告和工具函数
  return {
    report,
    trackEvent: performanceMonitor.trackEvent.bind(performanceMonitor),
    addMetric: performanceMonitor.addMetric.bind(performanceMonitor),
    clearData: performanceMonitor.clearData.bind(performanceMonitor),
  }
}

// 用于标记用户交互的工具函数
export function markUserInteraction(name: string) {
  if (typeof performance !== "undefined" && "mark" in performance) {
    const markName = `用户交互-${name}-开始`
    performance.mark(markName)
    return () => {
      const measureName = `用户交互-${name}`
      performance.measure(measureName, markName)
      performanceMonitor.trackEvent(measureName, {
        type: "用户交互",
        name,
      })
    }
  }
  return () => {}
}

// 用于测量组件渲染时间的HOC
export function withPerformanceTracking<P extends object>(Component: React.ComponentType<P>, componentName: string) {
  return function PerformanceTrackedComponent(props: P) {
    useEffect(() => {
      const endMark = markUserInteraction(`${componentName}渲染`)
      return () => {
        endMark()
      }
    }, [])

    return <Component {...props} />
  }
}
