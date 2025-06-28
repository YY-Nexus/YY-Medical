import type { Metadata } from "next"
import { AdminGuideWizard } from "@/components/admin/guide/admin-guide-wizard"
import { IntelligentChatAssistant } from "@/components/admin/guide/intelligent-chat-assistant"
import { KnowledgeBaseBrowser } from "@/components/admin/guide/knowledge-base-browser"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, MessageSquare, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "使用指南 | 言语云³管理后台",
  description: "管理后台使用指南和智能科普助手",
}

export default function AdminGuidePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">使用指南</h1>
          <p className="text-muted-foreground">快速上手管理后台，了解医疗AI系统的功能和使用方法</p>
        </div>
      </div>

      <Tabs defaultValue="wizard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="wizard" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            使用向导
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            智能助手
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            知识库
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wizard">
          <AdminGuideWizard />
        </TabsContent>

        <TabsContent value="chat">
          <IntelligentChatAssistant />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeBaseBrowser />
        </TabsContent>
      </Tabs>
    </div>
  )
}
