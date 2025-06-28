import { Suspense } from "react"
import { AIDiagnosisClient } from "@/components/ai-diagnosis/ai-diagnosis-client"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "智能诊断 | MediNexus³",
  description: "AI辅助医疗诊断系统",
}

export default function AIDiagnosisPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="智能诊断"
        description="利用先进AI模型辅助医疗诊断，提高诊断准确率和效率"
        breadcrumbs={[
          { label: "首页", href: "/" },
          { label: "智能诊断", href: "/ai-diagnosis" },
        ]}
      />

      <Suspense fallback={<LoadingFallback />}>
        <AIDiagnosisClient />
      </Suspense>
    </div>
  )
}
