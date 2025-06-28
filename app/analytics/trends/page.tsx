import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import TrendReportsClient from "@/components/analytics/trend-reports-client"
import { PageHeader } from "@/components/page-header"

export default function TrendsPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <PageHeader title="趋势报告" description="查看关键指标的历史趋势和变化模式" />

      <Suspense fallback={<LoadingSpinner />}>
        <TrendReportsClient />
      </Suspense>
    </div>
  )
}
