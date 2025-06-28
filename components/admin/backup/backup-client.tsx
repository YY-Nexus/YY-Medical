"use client"

import { BackupDashboard } from "./backup-dashboard"
import { PageHeader } from "@/components/page-header"

export function BackupClient() {
  return (
    <div className="flex flex-col space-y-6">
      <PageHeader title="数据备份与恢复" description="管理系统数据的备份和恢复操作，确保数据安全" />
      <BackupDashboard />
    </div>
  )
}
