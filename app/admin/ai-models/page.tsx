import { PageHeader } from "@/components/page-header"
import { Bot } from "lucide-react"
import { AIProviderManager } from "@/components/admin/ai-models/ai-provider-manager"

export default function AIModelsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="AI模型管理"
        description="配置和管理多个AI模型提供商，统一调用接口"
        icon={<Bot className="h-6 w-6" />}
      />

      <AIProviderManager />
    </div>
  )
}
