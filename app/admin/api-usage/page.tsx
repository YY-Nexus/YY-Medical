import { PageHeader } from "@/components/page-header"
import { LineChart } from "lucide-react"
import { ApiUsageMonitorClient } from "@/components/admin/api-usage/api-usage-monitor-client"

export default function ApiUsageMonitorPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="API使用量监控"
        description="监控API调用次数和费用，设置使用量警报"
        icon={<LineChart className="h-6 w-6" />}
      />

      <ApiUsageMonitorClient />
    </div>
  )
}
