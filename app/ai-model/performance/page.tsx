import { Suspense } from "react"
import { ModelPerformanceClient } from "@/components/ai-model/model-performance-client"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "模型性能分析 | MediNexus³",
  description: "分析和评估AI诊断模型的性能",
}

export default function ModelPerformancePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title="模型性能分析" description="全面分析和评估AI诊断模型的性能指标" icon="brain" />

      <Suspense fallback={<LoadingFallback />}>
        <ModelPerformanceClient />
      </Suspense>
    </div>
  )
}
