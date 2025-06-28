import { PageHeader } from "@/components/page-header"
import { MessageSquare } from "lucide-react"
import { AIChatTester } from "@/components/admin/ai-models/ai-chat-tester"

export default function AITestPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="AI模型测试"
        description="测试不同AI模型的响应效果和性能"
        icon={<MessageSquare className="h-6 w-6" />}
      />

      <AIChatTester />
    </div>
  )
}
