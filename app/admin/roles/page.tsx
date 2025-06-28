import type { Metadata } from "next"
import { RolesClient } from "@/components/admin/roles/roles-client"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "角色权限管理 | 言语云³",
  description: "管理用户角色和权限",
}

export default function RolesPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="角色权限管理" description="管理用户角色和系统权限" />
      <RolesClient />
    </div>
  )
}
