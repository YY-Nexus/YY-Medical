import { PageHeader } from "@/components/page-header"
import { Bell } from "lucide-react"
import { NotificationsClient } from "@/components/notifications/notifications-client"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader title="通知中心" description="查看和管理您的所有系统通知" icon={<Bell className="h-6 w-6" />} />
      <NotificationsClient />
    </div>
  )
}
