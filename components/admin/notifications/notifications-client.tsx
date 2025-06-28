"use client"

import { NotificationsDashboard } from "./notifications-dashboard"
import { PageHeader } from "@/components/page-header"

export function NotificationsClient() {
  return (
    <div className="flex flex-col space-y-6">
      <PageHeader title="通知管理中心" description="管理系统通知模板、发送规则和通知历史" />
      <NotificationsDashboard />
    </div>
  )
}
