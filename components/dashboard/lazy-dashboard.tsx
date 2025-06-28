"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createLazyComponent } from "@/components/ui/lazy-load"
import { preloadComponents } from "@/utils/dependency-optimizer"

// 懒加载大型组件
const LazyHealthDataDashboard = createLazyComponent(() =>
  import("@/components/health-data/dashboard").then((mod) => ({ default: mod.HealthDataDashboard })),
)

const LazyDataTrendsAnalysis = createLazyComponent(() =>
  import("@/components/health-data/data-trends-analysis").then((mod) => ({ default: mod.DataTrendsAnalysis })),
)

const LazyClinicalDashboard = createLazyComponent(() =>
  import("@/components/clinical-decision/dashboard").then((mod) => ({ default: mod.ClinicalDashboard })),
)

const LazyTreatmentRecommendations = createLazyComponent(() =>
  import("@/components/clinical-decision/treatment-recommendations").then((mod) => ({
    default: mod.TreatmentRecommendations,
  })),
)

export function LazyDashboard() {
  const [activeTab, setActiveTab] = useState("health")
  const [isPreloaded, setIsPreloaded] = useState(false)

  // 预加载其他标签页内容
  useEffect(() => {
    if (!isPreloaded) {
      // 在用户交互后预加载其他组件
      const timer = setTimeout(() => {
        preloadComponents([
          "/components/health-data/dashboard",
          "/components/health-data/data-trends-analysis",
          "/components/clinical-decision/dashboard",
          "/components/clinical-decision/treatment-recommendations",
        ])
        setIsPreloaded(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isPreloaded])

  // 当标签页改变时预加载相关组件
  useEffect(() => {
    if (activeTab === "health") {
      import("@/components/health-data/dashboard")
      import("@/components/health-data/data-trends-analysis")
    } else if (activeTab === "clinical") {
      import("@/components/clinical-decision/dashboard")
      import("@/components/clinical-decision/treatment-recommendations")
    }
  }, [activeTab])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">医疗数据仪表板</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="health">健康数据</TabsTrigger>
          <TabsTrigger value="clinical">临床决策</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6 mt-6">
          <LazyHealthDataDashboard />
          <LazyDataTrendsAnalysis />
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6 mt-6">
          <LazyClinicalDashboard />
          <LazyTreatmentRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  )
}
