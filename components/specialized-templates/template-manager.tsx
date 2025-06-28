"use client"

import { useState } from "react"
import { TemplateCatalog } from "./template-catalog"
import { TemplateDetail } from "./template-detail"

interface TemplateManagerProps {
  onSelectTemplate: (template: any) => void
  onClose: () => void
}

export function TemplateManager({ onSelectTemplate, onClose }: TemplateManagerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null)

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template)
  }

  const handleBack = () => {
    setSelectedTemplate(null)
  }

  const handleUseTemplate = (template: any) => {
    onSelectTemplate(template)
    onClose()
  }

  return (
    <div className="h-full overflow-auto">
      {selectedTemplate ? (
        <TemplateDetail template={selectedTemplate} onBack={handleBack} onUseTemplate={handleUseTemplate} />
      ) : (
        <TemplateCatalog onSelectTemplate={handleSelectTemplate} />
      )}
    </div>
  )
}
