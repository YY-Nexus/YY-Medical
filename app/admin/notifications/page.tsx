import type { Metadata } from "next"
import { NotificationsClient } from "@/components/admin/notifications/notifications-client"

export const metadata: Metadata = {
  title: "通知管理中心 | MediNexus³ 管理平台",
  description: "管理系统通知模板、发送规则和通知历史",
}

export default function NotificationsPage() {
  return <NotificationsClient />
}
