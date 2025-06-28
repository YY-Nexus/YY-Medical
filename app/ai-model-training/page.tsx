import { Suspense } from "react"
import { ModelTrainingClient } from "@/components/ai-model-training/model-training-client"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "模型训练 | MediNexus³",
  description: "医疗AI模型训练与管理平台",
}

export default function ModelTrainingPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="模型训练"
        description="训练、评估和部署医疗AI模型"
        breadcrumbs={[
          { label: "首页", href: "/" },
          { label: "智能诊断", href: "/ai-model" },
          { label: "模型训练", href: "/ai-model-training" },
        ]}
      />

      <Suspense fallback={<LoadingFallback />}>
        <ModelTrainingClient />
      </Suspense>
    </div>
  )
}
