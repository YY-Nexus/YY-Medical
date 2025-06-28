import type React from "react"
import type { Metadata } from "next"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "管理平台 | 言语云³",
  description: "医疗系统管理平台",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRoles={["admin", "super_admin"]}>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
