import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import AnalyticsClient from "@/components/analytics/analytics-client"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-medical-800 mb-6">数据分析中心</h1>

      <Suspense fallback={<LoadingSpinner />}>
        <AnalyticsClient />
      </Suspense>
    </div>
  )
}
