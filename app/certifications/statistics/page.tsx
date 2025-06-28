import { PageHeader } from "@/components/page-header"
import { BarChart } from "lucide-react"
import { VerificationStatisticsClient } from "@/components/certifications/statistics/verification-statistics-client"

export default function VerificationStatisticsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="验证机构数据统计"
        description="查看资质验证机构的使用情况和成功率统计"
        icon={<BarChart className="h-6 w-6" />}
      />

      <VerificationStatisticsClient />
    </div>
  )
}
