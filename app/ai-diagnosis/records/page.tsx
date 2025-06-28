import { Suspense } from "react"
import { DiagnosisRecordsClient } from "@/components/ai-diagnosis/diagnosis-records-client"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "诊断记录 | MediNexus³",
  description: "查看和管理AI辅助诊断的历史记录",
}

export default function DiagnosisRecordsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="诊断记录"
        description="查看、管理和分析AI辅助诊断的历史记录"
        breadcrumbs={[
          { label: "首页", href: "/" },
          { label: "智能诊断", href: "/ai-diagnosis" },
          { label: "诊断记录", href: "/ai-diagnosis/records" },
        ]}
      />

      <Suspense fallback={<LoadingFallback />}>
        <DiagnosisRecordsClient />
      </Suspense>
    </div>
  )
}
