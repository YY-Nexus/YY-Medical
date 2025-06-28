import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import EHRMappingClient from "@/components/ehr/ehr-mapping-client"
import { PageHeader } from "@/components/page-header"

export default function EHRMappingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="电子病历数据映射"
        description="配置和管理电子病历系统与平台之间的数据字段映射关系"
        breadcrumbs={[
          { title: "首页", href: "/" },
          { title: "电子病历集成", href: "/ehr-integration" },
          { title: "数据映射", href: "/ehr-integration/mapping" },
        ]}
      />

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <EHRMappingClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
