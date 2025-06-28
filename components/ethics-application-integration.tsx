"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { EthicsApplicationForm } from "@/components/ethics-application-form"
import { EthicsTemplateManager } from "@/components/ethics-template-manager"
import { FileText, Plus } from "lucide-react"

interface EthicsApplicationIntegrationProps {
  experimentId: string
  experimentData?: any
}

export function EthicsApplicationIntegration({ experimentId, experimentData }: EthicsApplicationIntegrationProps) {
  const [showForm, setShowForm] = useState(false)
  const [showTemplateManager, setShowTemplateManager] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  // 处理表单提交
  const handleSubmit = (data: any) => {
    console.log("提交伦理申请:", data)
    // 这里可以添加提交到后端的逻辑
    setShowForm(false)
  }

  // 处理保存草稿
  const handleSaveDraft = (data: any) => {
    console.log("保存草稿:", data)
    // 这里可以添加保存草稿到后端的逻辑
  }

  // 处理模板选择
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
    setShowTemplateManager(false)
    setShowForm(true)
  }

  return (
    <div>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            创建伦理申请
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <EthicsApplicationForm
            experimentId={experimentId}
            experimentData={experimentData}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showTemplateManager} onOpenChange={setShowTemplateManager}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 ml-2">
            <Plus className="h-4 w-4" />
            使用模板
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <EthicsTemplateManager
            onSelectTemplate={handleSelectTemplate}
            onClose={() => setShowTemplateManager(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
