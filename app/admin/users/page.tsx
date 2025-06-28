import type { Metadata } from "next"
import { UserManagement } from "@/components/admin/user-management"

export const metadata: Metadata = {
  title: "用户管理 | 管理平台",
  description: "管理系统用户、角色和权限",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">用户管理</h1>
        <p className="text-muted-foreground">管理系统用户、角色和权限设置</p>
      </div>
      <UserManagement />
    </div>
  )
}
