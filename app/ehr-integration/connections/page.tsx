import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import EHRConnectionsClient from "@/components/ehr/ehr-connections-client"
import { PageHeader } from "@/components/page-header"

export default function EHRConnectionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="电子病历系统连接"
        description="管理与外部电子病历系统的连接配置和状态"
        breadcrumbs={[
          { title: "首页", href: "/" },
          { title: "电子病历集成", href: "/ehr-integration" },
          { title: "系统连接", href: "/ehr-integration/connections" },
        ]}
      />

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <EHRConnectionsClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
