import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import EHRSettingsClient from "@/components/ehr/ehr-settings-client"
import { PageHeader } from "@/components/page-header"

export default function EHRSettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="电子病历集成设置"
        description="配置电子病历集成的全局设置和参数"
        breadcrumbs={[
          { title: "首页", href: "/" },
          { title: "电子病历集成", href: "/ehr-integration" },
          { title: "集成设置", href: "/ehr-integration/settings" },
        ]}
      />

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <EHRSettingsClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
