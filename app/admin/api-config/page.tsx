import { PageHeader } from "@/components/page-header"
import { Settings } from "lucide-react"
import { ApiConfigClient } from "@/components/admin/api-config/api-config-client"

export default function ApiConfigPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="API配置管理"
        description="管理验证机构API密钥和参数配置"
        icon={<Settings className="h-6 w-6" />}
      />

      <ApiConfigClient />
    </div>
  )
}
