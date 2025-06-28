import { PageHeader } from "@/components/page-header"
import { HelpCircle } from "lucide-react"
import { HelpClient } from "@/components/help/help-client"

export default function HelpPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="帮助与支持"
        description="获取系统使用帮助和技术支持"
        icon={<HelpCircle className="h-6 w-6" />}
      />
      <HelpClient />
    </div>
  )
}
