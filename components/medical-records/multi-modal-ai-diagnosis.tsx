"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  Brain,
  CheckCircle,
  Layers,
  Activity,
  ImageIcon,
  Radio,
  Zap,
  Search,
  Grid,
  Video,
  Download,
  Share2,
  FileText,
} from "lucide-react"
import { ModalitySpecificAnalysis } from "./modality-specific-analysis"
import { CrossModalAnalysis } from "./cross-modal-analysis"
import { AIModelSelector } from "./ai-model-selector"
import { availableModalities, availableAIModels, multiModalAIService } from "../../services/multi-modal-ai-service"
import type { ModalityAnalysisResult, CrossModalAnalysisResult } from "../../types/medical-records"

interface MultiModalAIDiagnosisProps {
  patientId?: string
}

export function MultiModalAIDiagnosis({ patientId }: MultiModalAIDiagnosisProps) {
  const [selectedModalities, setSelectedModalities] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<{ [key: string]: string }>({})
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string[] }>({})
  const [analysisInProgress, setAnalysisInProgress] = useState(false)
  const [modalityResults, setModalityResults] = useState<ModalityAnalysisResult[]>([])
  const [crossModalResult, setCrossModalResult] = useState<CrossModalAnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("modality-selection")
  const [analysisStep, setAnalysisStep] = useState<"selection" | "upload" | "analysis" | "results">("selection")

  // 模态图标映射
  const modalityIcons: { [key: string]: any } = {
    layers: Layers,
    activity: Activity,
    image: ImageIcon,
    radio: Radio,
    zap: Zap,
    search: Search,
    grid: Grid,
    video: Video,
  }

  // 处理模态选择
  const handleModalitySelection = (modalityId: string) => {
    if (selectedModalities.includes(modalityId)) {
      setSelectedModalities(selectedModalities.filter((id) => id !== modalityId))
    } else {
      setSelectedModalities([...selectedModalities, modalityId])
    }
  }

  // 处理模型选择
  const handleModelSelection = (modalityId: string, modelId: string) => {
    setSelectedModels({
      ...selectedModels,
      [modalityId]: modelId,
    })
  }

  // 模拟图像上传
  const handleImageUpload = (modalityId: string, files: FileList | null) => {
    if (!files || files.length === 0) return

    // 模拟上传过程
    const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file))

    setUploadedImages({
      ...uploadedImages,
      [modalityId]: imageUrls,
    })
  }

  // 开始分析
  const startAnalysis = async () => {
    setAnalysisInProgress(true)
    setModalityResults([])
    setCrossModalResult(null)

    try {
      // 分析每个选定的模态
      const results: ModalityAnalysisResult[] = []

      for (const modalityId of selectedModalities) {
        if (uploadedImages[modalityId] && uploadedImages[modalityId].length > 0) {
          const modelId = selectedModels[modalityId]
          const result = await multiModalAIService.analyzeModality(modalityId, uploadedImages[modalityId][0], modelId)
          results.push(result)
        }
      }

      setModalityResults(results)

      // 如果有多个模态结果，执行跨模态分析
      if (results.length > 1) {
        const crossResult = await multiModalAIService.performCrossModalAnalysis(results, patientId)
        setCrossModalResult(crossResult)
      }

      setAnalysisStep("results")
      setActiveTab("results")
    } catch (error) {
      console.error("分析过程中出错:", error)
    } finally {
      setAnalysisInProgress(false)
    }
  }

  // 重置分析
  const resetAnalysis = () => {
    setSelectedModalities([])
    setSelectedModels({})
    setUploadedImages({})
    setModalityResults([])
    setCrossModalResult(null)
    setAnalysisStep("selection")
    setActiveTab("modality-selection")
  }

  // 进入下一步
  const goToNextStep = () => {
    if (analysisStep === "selection" && selectedModalities.length > 0) {
      setAnalysisStep("upload")
      setActiveTab("image-upload")
    } else if (analysisStep === "upload") {
      // 检查是否所有选定的模态都有上传的图像
      const allUploaded = selectedModalities.every(
        (modalityId) => uploadedImages[modalityId] && uploadedImages[modalityId].length > 0,
      )

      if (allUploaded) {
        setAnalysisStep("analysis")
        setActiveTab("analysis")
      }
    }
  }

  // 返回上一步
  const goToPreviousStep = () => {
    if (analysisStep === "upload") {
      setAnalysisStep("selection")
      setActiveTab("modality-selection")
    } else if (analysisStep === "analysis") {
      setAnalysisStep("upload")
      setActiveTab("image-upload")
    } else if (analysisStep === "results") {
      setAnalysisStep("analysis")
      setActiveTab("analysis")
    }
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          多模态AI辅助诊断系统
        </CardTitle>
        <CardDescription>集成多种医学影像模态的AI分析，提供更全面的诊断建议</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger
              value="modality-selection"
              disabled={analysisStep !== "selection" && analysisStep !== "results"}
            >
              模态选择
            </TabsTrigger>
            <TabsTrigger value="image-upload" disabled={analysisStep !== "upload" && analysisStep !== "results"}>
              影像上传
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={analysisStep !== "analysis" && analysisStep !== "results"}>
              AI分析
            </TabsTrigger>
            <TabsTrigger value="results" disabled={analysisStep !== "results"}>
              分析结果
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modality-selection" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableModalities.map((modality) => {
                const IconComponent = modalityIcons[modality.icon] || Brain
                return (
                  <Card
                    key={modality.id}
                    className={`cursor-pointer transition-all ${
                      selectedModalities.includes(modality.id) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    } ${!modality.isAvailable ? "opacity-50" : ""}`}
                    onClick={() => modality.isAvailable && handleModalitySelection(modality.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div
                        className={`p-3 rounded-full ${
                          selectedModalities.includes(modality.id)
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        } mb-3`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium mb-1">{modality.name}</h3>
                      <p className="text-xs text-gray-500">{modality.description}</p>
                      {!modality.isAvailable && (
                        <span className="mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          即将推出
                        </span>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedModalities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">已选择的模态</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedModalities.map((modalityId) => {
                    const modality = availableModalities.find((m) => m.id === modalityId)
                    return (
                      <div
                        key={modalityId}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {modality?.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleModalitySelection(modalityId)
                          }}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4">
                  <AIModelSelector
                    selectedModalities={selectedModalities}
                    onModelSelect={handleModelSelection}
                    selectedModels={selectedModels}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button
                onClick={goToNextStep}
                disabled={selectedModalities.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                下一步：上传影像
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="image-upload" className="space-y-6">
            <div className="space-y-6">
              {selectedModalities.map((modalityId) => {
                const modality = availableModalities.find((m) => m.id === modalityId)
                return (
                  <div key={modalityId} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">{modality?.name}影像上传</h3>
                    <p className="text-sm text-gray-500 mb-4">支持的格式: {modality?.supportedFormats.join(", ")}</p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {uploadedImages[modalityId] && uploadedImages[modalityId].length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </div>
                          <p className="text-green-600 font-medium">
                            已上传 {uploadedImages[modalityId].length} 个文件
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setUploadedImages({
                                ...uploadedImages,
                                [modalityId]: [],
                              })
                            }
                          >
                            清除
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-gray-500">拖放文件到此处，或点击下方按钮选择文件</p>
                          <input
                            type="file"
                            id={`file-upload-${modalityId}`}
                            className="hidden"
                            multiple
                            onChange={(e) => handleImageUpload(modalityId, e.target.files)}
                          />
                          <label
                            htmlFor={`file-upload-${modalityId}`}
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                          >
                            选择文件
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPreviousStep}>
                返回：模态选择
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={
                  !selectedModalities.every(
                    (modalityId) => uploadedImages[modalityId] && uploadedImages[modalityId].length > 0,
                  )
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                下一步：AI分析
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">AI分析配置</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">已选择的模态</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModalities.map((modalityId) => {
                      const modality = availableModalities.find((m) => m.id === modalityId)
                      return (
                        <div key={modalityId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {modality?.name}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">已上传的影像</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedModalities.map((modalityId) => {
                      const modality = availableModalities.find((m) => m.id === modalityId)
                      return (
                        <div key={modalityId} className="border rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">{modality?.name}</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              {uploadedImages[modalityId]?.length || 0} 个文件
                            </span>
                          </div>
                          {uploadedImages[modalityId] && uploadedImages[modalityId].length > 0 && (
                            <div className="text-xs text-gray-500">已准备好进行分析</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">选择的AI模型</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedModels).map(([modalityId, modelId]) => {
                      const modality = availableModalities.find((m) => m.id === modalityId)
                      const model = availableAIModels.find((m) => m.id === modelId)
                      return (
                        <div key={modalityId} className="flex justify-between items-center text-sm border-b pb-2">
                          <span>{modality?.name}</span>
                          <span className="font-medium">
                            {model?.name} (v{model?.version})
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {patientId && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-1">患者信息</h4>
                    <p className="text-sm">患者ID: {patientId}</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button
                  onClick={startAnalysis}
                  disabled={analysisInProgress}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {analysisInProgress ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      分析中...
                    </>
                  ) : (
                    "开始AI分析"
                  )}
                </Button>
              </div>
            </div>

            {analysisInProgress && (
              <div className="p-6 text-center border rounded-lg">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
                <p className="mt-4 text-lg font-medium">AI正在分析多模态影像，请稍候...</p>
                <p className="text-sm text-gray-500">多模态分析通常需要1-3分钟</p>

                <div className="mt-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    {selectedModalities.map((modalityId, index) => {
                      const modality = availableModalities.find((m) => m.id === modalityId)
                      const isComplete = modalityResults.some((r) => r.modalityId === modalityId)
                      return (
                        <div key={modalityId} className="flex items-center">
                          <div className="w-1/3 text-left text-sm">{modality?.name}</div>
                          <div className="w-2/3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${isComplete ? "bg-green-500" : "bg-blue-500"}`}
                                style={{
                                  width: isComplete ? "100%" : `${Math.random() * 90}%`,
                                  transition: "width 0.5s ease-in-out",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {selectedModalities.length > 1 && (
                      <div className="flex items-center">
                        <div className="w-1/3 text-left text-sm">跨模态分析</div>
                        <div className="w-2/3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${crossModalResult ? "bg-green-500" : "bg-purple-500"}`}
                              style={{
                                width: crossModalResult ? "100%" : `${Math.random() * 70}%`,
                                transition: "width 0.5s ease-in-out",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPreviousStep} disabled={analysisInProgress}>
                返回：影像上传
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {modalityResults.length > 0 ? (
              <div className="space-y-6">
                <Tabs defaultValue={modalityResults.length > 1 ? "cross-modal" : modalityResults[0].modalityId}>
                  <TabsList className="mb-4">
                    {modalityResults.length > 1 && <TabsTrigger value="cross-modal">综合分析</TabsTrigger>}
                    {modalityResults.map((result) => (
                      <TabsTrigger key={result.modalityId} value={result.modalityId}>
                        {result.modalityName}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {modalityResults.length > 1 && (
                    <TabsContent value="cross-modal">
                      {crossModalResult ? (
                        <CrossModalAnalysis result={crossModalResult} />
                      ) : (
                        <div className="text-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                          <p className="mt-4">正在生成跨模态分析结果...</p>
                        </div>
                      )}
                    </TabsContent>
                  )}

                  {modalityResults.map((result) => (
                    <TabsContent key={result.modalityId} value={result.modalityId}>
                      <ModalitySpecificAnalysis result={result} />
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={resetAnalysis}>
                    重新开始
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      确认诊断
                    </Button>
                    <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                      <FileText className="mr-2 h-4 w-4" />
                      生成报告
                    </Button>
                    <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                      <Share2 className="mr-2 h-4 w-4" />
                      分享结果
                    </Button>
                    <Button variant="outline" className="border-gray-500 text-gray-600 hover:bg-gray-50">
                      <Download className="mr-2 h-4 w-4" />
                      导出数据
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">尚未进行分析，请先选择模态并上传影像</p>
                <Button
                  onClick={() => {
                    setAnalysisStep("selection")
                    setActiveTab("modality-selection")
                  }}
                  className="mt-4"
                >
                  开始新的分析
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
