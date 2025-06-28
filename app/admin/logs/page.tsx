import type { Metadata } from "next"
import { LogsClient } from "@/components/admin/logs/logs-client"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "系统日志管理 | 言语云³",
  description: "查看和管理系统日志",
}

export default function LogsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="系统日志管理" description="查看、筛选和导出系统操作日志" />
      <LogsClient />
    </div>
  )
}
