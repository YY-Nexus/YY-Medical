import { PageHeader } from "@/components/page-header"
import { Settings } from "lucide-react"
import { SettingsClient } from "@/components/settings/settings-client"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader title="系统设置" description="自定义系统功能和外观" icon={<Settings className="h-6 w-6" />} />
      <SettingsClient />
    </div>
  )
}
