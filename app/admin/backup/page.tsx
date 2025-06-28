import type { Metadata } from "next"
import { BackupClient } from "@/components/admin/backup/backup-client"

export const metadata: Metadata = {
  title: "数据备份与恢复 | MediNexus³ 管理平台",
  description: "管理系统数据的备份和恢复操作，确保数据安全",
}

export default function BackupPage() {
  return <BackupClient />
}
