"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { availableModalities, availableAIModels } from "../../services/multi-modal-ai-service"

interface AIModelSelectorProps {
  selectedModalities: string[]
  selectedModels: { [key: string]: string }
  onModelSelect: (modalityId: string, modelId: string) => void
}

export function AIModelSelector({ selectedModalities, selectedModels, onModelSelect }: AIModelSelectorProps) {
  const [expandedModality, setExpandedModality] = useState<string | null>(null)

  // 获取特定模态可用的模型
  const getModelsForModality = (modalityId: string) => {
    return availableAIModels.filter((model) => model.modalities.includes(modalityId))
  }

  // 处理模型选择
  const handleModelChange = (modalityId: string, modelId: string) => {
    onModelSelect(modalityId, modelId)
  }

  // 切换展开/折叠状态
  const toggleExpand = (modalityId: string) => {
    if (expandedModality === modalityId) {
      setExpandedModality(null)
    } else {
      setExpandedModality(modalityId)
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium">AI模型选择</h4>

      {selectedModalities.map((modalityId) => {
        const modality = availableModalities.find((m) => m.id === modalityId)
        const availableModels = getModelsForModality(modalityId)
        const isExpanded = expandedModality === modalityId
        const selectedModel = availableModels.find((m) => m.id === selectedModels[modalityId])

        // 如果没有选择模型，默认选择第一个
        if (availableModels.length > 0 && !selectedModels[modalityId]) {
          onModelSelect(modalityId, availableModels[0].id)
        }

        return (
          <Card key={modalityId} className="overflow-hidden">
            <div
              className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(modalityId)}
            >
              <div>
                <h5 className="font-medium">{modality?.name}</h5>
                {selectedModel && (
                  <p className="text-sm text-gray-500">
                    已选: {selectedModel.name} (v{selectedModel.version})
                  </p>
                )}
              </div>
              <div className="text-gray-400">
                {isExpanded ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </div>
            </div>

            {isExpanded && (
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">选择AI模型</label>
                    <Select
                      value={selectedModels[modalityId] || ""}
                      onValueChange={(value) => handleModelChange(modalityId, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择AI模型" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} (v{model.version})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedModel && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">描述</p>
                        <p>{selectedModel.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">准确率</p>
                          <p className="font-medium">{Math.round(selectedModel.accuracy * 100)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">最后更新</p>
                          <p className="font-medium">{selectedModel.lastUpdated}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">支持的模态</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedModel.modalities.map((modalityId) => {
                            const modality = availableModalities.find((m) => m.id === modalityId)
                            return (
                              <span
                                key={modalityId}
                                className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs"
                              >
                                {modality?.name || modalityId}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
