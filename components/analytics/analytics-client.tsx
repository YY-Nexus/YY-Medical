"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// 动态导入大型组件并禁用SSR
const Dashboard = dynamic(() => import("@/components/analytics/dashboard-component"), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false, // 禁用服务器端渲染以避免window错误
})

const TrendReports = dynamic(() => import("@/components/analytics/trend-reports"), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

const PredictionModels = dynamic(() => import("@/components/analytics/prediction-models"), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

const InteractiveCharts = dynamic(() => import("@/components/analytics/interactive-charts"), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

const AdvancedCharts = dynamic(() => import("@/components/analytics/advanced-charts"), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

const DataComparison = dynamic(() => import("@/components/analytics/data-comparison"), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

export default function AnalyticsClient() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showDetailedCharts, setShowDetailedCharts] = useState(false)
  const [showAdvancedCharts, setShowAdvancedCharts] = useState(false)
  const [showDataComparison, setShowDataComparison] = useState(false)

  if (showDataComparison) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <DataComparison onBack={() => setShowDataComparison(false)} />
      </Suspense>
    )
  }

  if (showAdvancedCharts) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AdvancedCharts onBack={() => setShowAdvancedCharts(false)} />
      </Suspense>
    )
  }

  if (showDetailedCharts) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <InteractiveCharts onBack={() => setShowDetailedCharts(false)} />
      </Suspense>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="dashboard">总览仪表盘</TabsTrigger>
        <TabsTrigger value="trends">趋势报告</TabsTrigger>
        <TabsTrigger value="predictions">预测模型</TabsTrigger>
        <TabsTrigger value="advanced">高级图表</TabsTrigger>
        <TabsTrigger value="comparison">数据���比</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="pt-4">
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard
            onViewDetailedCharts={() => setShowDetailedCharts(true)}
            onViewAdvancedCharts={() => setShowAdvancedCharts(true)}
          />
        </Suspense>
      </TabsContent>
      <TabsContent value="trends" className="pt-4">
        <Suspense fallback={<LoadingSpinner />}>
          <TrendReports />
        </Suspense>
      </TabsContent>
      <TabsContent value="predictions" className="pt-4">
        <Suspense fallback={<LoadingSpinner />}>
          <PredictionModels />
        </Suspense>
      </TabsContent>
      <TabsContent value="advanced" className="pt-4">
        <Suspense fallback={<LoadingSpinner />}>
          <AdvancedCharts onBack={() => setActiveTab("dashboard")} />
        </Suspense>
      </TabsContent>
      <TabsContent value="comparison" className="pt-4">
        <Suspense fallback={<LoadingSpinner />}>
          <DataComparison onBack={() => setActiveTab("dashboard")} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
