import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import PredictionModelsClient from "@/components/analytics/prediction-models-client"
import { PageHeader } from "@/components/page-header"

export default function PredictionPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <PageHeader title="预测模型" description="基于历史数据的预测分析和模型应用" />

      <Suspense fallback={<LoadingSpinner />}>
        <PredictionModelsClient />
      </Suspense>
    </div>
  )
}
