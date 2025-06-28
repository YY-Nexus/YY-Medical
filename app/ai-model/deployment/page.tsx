import { Suspense } from "react"
import { ModelDeployment } from "@/components/model-deployment/ModelDeployment"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PageHeader } from "@/components/page-header"

export default function ModelDeploymentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="模型部署"
        description="管理AI模型的部署环境和版本"
        breadcrumbs={[
          { title: "首页", href: "/" },
          { title: "AI模型", href: "/ai-model" },
          { title: "模型部署", href: "/ai-model/deployment" },
        ]}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <ModelDeployment />
      </Suspense>
    </div>
  )
}
