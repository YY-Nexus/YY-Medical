import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import EHRSyncClient from "@/components/ehr/ehr-sync-client"
import { PageHeader } from "@/components/page-header"

export default function EHRSyncPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="电子病历同步状态"
        description="监控和管理电子病历系统与平台之间的数据同步状态和历史记录"
        breadcrumbs={[
          { title: "首页", href: "/" },
          { title: "电子病历集成", href: "/ehr-integration" },
          { title: "同步状态", href: "/ehr-integration/sync" },
        ]}
      />

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <EHRSyncClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
