import type { Metadata } from "next"
import { SettingsClient } from "@/components/admin/settings/settings-client"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "系统设置 | 言语云³",
  description: "管理系统全局设置和参数配置",
}

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="系统设置" description="管理系统全局设置和参数配置" />
      <SettingsClient />
    </div>
  )
}
