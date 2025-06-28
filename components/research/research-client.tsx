"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { ActiveProjects } from "@/components/research/active-projects"

// 动态导入可能使用浏览器API的组件
const ResearchProjectsDashboard = dynamic(
  () => import("@/components/research/projects-dashboard").then((mod) => ({ default: mod.ResearchProjectsDashboard })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const DataAnalysisOverview = dynamic(
  () => import("@/components/research/data-analysis-overview").then((mod) => ({ default: mod.DataAnalysisOverview })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function ResearchClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">研究项目概览</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ResearchProjectsDashboard />
          </Suspense>
        </ErrorBoundary>

        <h2 className="text-xl font-semibold mt-8 mb-4">数据分析</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <DataAnalysisOverview />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">活跃项目</h2>
        <ActiveProjects />
      </div>
    </div>
  )
}
