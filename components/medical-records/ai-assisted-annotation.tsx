"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  Crosshair,
  Check,
  X,
  AlertCircle,
  Lightbulb,
  Layers,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react"
import { InteractiveImageAnnotation } from "./interactive-image-annotation"
import { aiAnnotationService } from "../../services/ai-annotation-service"
import { knowledgeGraphService } from "../../services/knowledge-graph-service"
import type { ImageMarker } from "../../types/imaging-features"
import type { AIAnnotationSuggestion, GraphNode } from "../../types/knowledge-graph"

interface AIAssistedAnnotationProps {
  selectedImage: string
  modality: string
  anatomicalRegion: string
  onAnnotationComplete?: (markers: ImageMarker[]) => void
}

export function AIAssistedAnnotation({
  selectedImage,
  modality,
  anatomicalRegion,
  onAnnotationComplete,
}: AIAssistedAnnotationProps) {
  const [userMarkers, setUserMarkers] = useState<ImageMarker[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<AIAnnotationSuggestion[]>([])
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [consistencyResult, setConsistencyResult] = useState<{ score: number; feedback: string[] } | null>(null)
  const [activeTab, setActiveTab] = useState<"manual" | "ai-assisted" | "evaluation">("manual")
  const [relatedNodes, setRelatedNodes] = useState<GraphNode[]>([])
  const [selectedSuggestion, setSelectedSuggestion] = useState<AIAnnotationSuggestion | null>(null)

  const imageRef = useRef<HTMLImageElement | null>(null)

  // 加载图像
  useEffect(() => {
    if (!selectedImage) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = selectedImage
    img.onload = () => {
      imageRef.current = img
    }
  }, [selectedImage])

  // 处理用户标注更新
  const handleUserAnnotationUpdate = (markers: ImageMarker[]) => {
    setUserMarkers(markers)
    if (onAnnotationComplete) {
      onAnnotationComplete(markers)
    }
  }

  // 生成AI标注建议
  const generateAIAnnotations = async () => {
    setIsGeneratingAI(true)
    try {
      const suggestions = await aiAnnotationService.generateAnnotations(selectedImage, modality, anatomicalRegion)
      setAiSuggestions(suggestions)

      // 获取相关知识图谱节点
      const relatedNodeIds = new Set<string>()
      suggestions.forEach((suggestion) => {
        suggestion.relatedNodeIds.forEach((id) => relatedNodeIds.add(id))
      })

      const nodes: GraphNode[] = []
      relatedNodeIds.forEach((id) => {
        const graph = knowledgeGraphService.getGraphById("lung-nodule-graph") // 使用肺结节图谱作为示例
        if (graph) {
          const node = graph.nodes.find((n) => n.id === id)
          if (node) nodes.push(node)
        }
      })
      setRelatedNodes(nodes)
    } catch (error) {
      console.error("生成AI标注建议失败:", error)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  // 应用AI建议
  const applyAISuggestions = () => {
    const aiMarkers = aiAnnotationService.convertToImageMarkers(aiSuggestions)
    setUserMarkers([...userMarkers, ...aiMarkers])
    if (onAnnotationComplete) {
      onAnnotationComplete([...userMarkers, ...aiMarkers])
    }
  }

  // 评估标注一致性
  const evaluateConsistency = () => {
    const result = aiAnnotationService.evaluateAnnotationConsistency(userMarkers, aiSuggestions)
    setConsistencyResult(result)
    setActiveTab("evaluation")
  }

  // 切换AI建议显示
  const toggleAISuggestions = () => {
    setShowAISuggestions(!showAISuggestions)
  }

  // 获取一致性评分的颜色
  const getConsistencyScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600"
    if (score >= 0.5) return "text-amber-600"
    return "text-red-600"
  }

  // 获取一致性评分的文本描述
  const getConsistencyScoreText = (score: number) => {
    if (score >= 0.8) return "优秀"
    if (score >= 0.5) return "良好"
    return "需要改进"
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          AI辅助标注
        </CardTitle>
        <CardDescription>利用AI技术辅助医学影像标注，提高效率和准确性</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <div className="border-b">
            <TabsList className="p-0 bg-transparent h-12">
              <TabsTrigger
                value="manual"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                <Crosshair className="h-4 w-4 mr-2" />
                手动标注
              </TabsTrigger>
              <TabsTrigger
                value="ai-assisted"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI辅助标注
              </TabsTrigger>
              <TabsTrigger
                value="evaluation"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                <Layers className="h-4 w-4 mr-2" />
                评估与反馈
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="manual" className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">手动标注模式</h3>
              <p className="text-sm text-gray-500">
                在此模式下，您可以手动标注医学影像中的特征。使用标注工具在图像上创建标记，并关联相应的影像特征。
              </p>
            </div>

            <InteractiveImageAnnotation
              selectedImage={selectedImage}
              modality={modality as any}
              anatomicalRegion={anatomicalRegion as any}
              onAnnotationComplete={handleUserAnnotationUpdate}
            />

            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  已创建 <span className="font-medium">{userMarkers.length}</span> 个标注
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setActiveTab("ai-assisted")}>
                  <Brain className="h-4 w-4 mr-2" />
                  切换到AI辅助模式
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-assisted" className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">AI辅助标注模式</h3>
              <p className="text-sm text-gray-500">
                在此模式下，AI将分析医学影像并提供标注建议。您可以查看、接受或拒绝这些建议，也可以继续手动添加标注。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 左侧AI建议面板 */}
              <div className="md:col-span-1 border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">AI标注建议</h4>
                  <div>
                    <Button variant="outline" size="sm" onClick={generateAIAnnotations} disabled={isGeneratingAI}>
                      {isGeneratingAI ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          生成建议
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {aiSuggestions.length > 0 ? (
                  <>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {aiSuggestions.map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedSuggestion?.id === suggestion.id
                                ? "bg-blue-50 border-blue-200"
                                : "hover:bg-gray-50 border-gray-200"
                            }`}
                            onClick={() => setSelectedSuggestion(suggestion)}
                          >
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium">{suggestion.featureType}</h5>
                              <Badge className="bg-blue-100 text-blue-800">
                                {(suggestion.confidence * 100).toFixed(0)}%
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Crosshair className="h-3 w-3 mr-1" />
                              <span>
                                位置: ({suggestion.boundingBox.x}, {suggestion.boundingBox.y})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="mt-4 space-y-2">
                      <Button className="w-full" onClick={applyAISuggestions}>
                        <Check className="h-4 w-4 mr-2" />
                        应用所有AI建议
                      </Button>
                      <Button variant="outline" className="w-full" onClick={toggleAISuggestions}>
                        {showAISuggestions ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            隐藏AI建议
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            显示AI建议
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={evaluateConsistency}>
                        <Layers className="h-4 w-4 mr-2" />
                        评估标注一致性
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">暂无AI标注建议</p>
                    <p className="text-sm">点击"生成建议"按钮，AI将分析当前影像并提供标注建议</p>
                  </div>
                )}
              </div>

              {/* 右侧图像和知识关联 */}
              <div className="md:col-span-2">
                <div className="border rounded-md overflow-hidden">
                  {/* 图像预览区域 */}
                  <div className="relative" style={{ height: "400px" }}>
                    {selectedImage && (
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="医学影像"
                        className="w-full h-full object-contain"
                      />
                    )}

                    {/* 用户标注 */}
                    {userMarkers.map((marker) => (
                      <div
                        key={marker.id}
                        className="absolute border-2 border-blue-500"
                        style={{
                          left: marker.coordinates.x,
                          top: marker.coordinates.y,
                          width: marker.coordinates.width,
                          height: marker.coordinates.height,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                          {marker.description}
                        </div>
                      </div>
                    ))}

                    {/* AI建议标注 */}
                    {showAISuggestions &&
                      aiSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className={`absolute border-2 border-dashed ${
                            selectedSuggestion?.id === suggestion.id ? "border-yellow-500" : "border-green-500"
                          }`}
                          style={{
                            left: suggestion.boundingBox.x,
                            top: suggestion.boundingBox.y,
                            width: suggestion.boundingBox.width,
                            height: suggestion.boundingBox.height,
                          }}
                          onClick={() => setSelectedSuggestion(suggestion)}
                        >
                          <div
                            className={`absolute -top-6 left-0 ${
                              selectedSuggestion?.id === suggestion.id ? "bg-yellow-500" : "bg-green-500"
                            } text-white text-xs px-1 py-0.5 rounded`}
                          >
                            AI: {suggestion.featureType} ({(suggestion.confidence * 100).toFixed(0)}%)
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* 知识关联区域 */}
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-2">知识图谱关联</h4>
                    {selectedSuggestion ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-blue-100 text-blue-800">{selectedSuggestion.featureType}</Badge>
                          <span className="text-sm text-gray-500">
                            置信度: {(selectedSuggestion.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-sm mb-3">{selectedSuggestion.description}</p>

                        <h5 className="text-sm font-medium mb-2">相关知识节点:</h5>
                        <div className="flex flex-wrap gap-2">
                          {relatedNodes
                            .filter((node) => selectedSuggestion.relatedNodeIds.includes(node.id))
                            .map((node) => (
                              <Badge key={node.id} variant="outline" className="bg-gray-100">
                                {node.name} ({node.type})
                              </Badge>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              const marker = aiAnnotationService.convertToImageMarkers([selectedSuggestion])[0]
                              setUserMarkers([...userMarkers, marker])
                              if (onAnnotationComplete) {
                                onAnnotationComplete([...userMarkers, marker])
                              }
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            接受此建议
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setAiSuggestions(aiSuggestions.filter((s) => s.id !== selectedSuggestion.id))
                              setSelectedSuggestion(null)
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            拒绝此建议
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        选择一个AI标注建议或创建自己的标注，查看相关的知识图谱节点
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="evaluation" className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">标注评估与反馈</h3>
              <p className="text-sm text-gray-500">此页面显示您的标注与AI建议的一致性评估结果，并提供改进建议。</p>
            </div>

            {consistencyResult ? (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">一致性评分</h4>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-3xl font-bold flex items-center">
                      <span className={getConsistencyScoreColor(consistencyResult.score)}>
                        {(consistencyResult.score * 100).toFixed(0)}%
                      </span>
                      <span className="text-base font-normal text-gray-500 ml-2">
                        ({getConsistencyScoreText(consistencyResult.score)})
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={consistencyResult.score * 100}
                    className="h-2"
                    indicatorClassName={
                      consistencyResult.score >= 0.8
                        ? "bg-green-500"
                        : consistencyResult.score >= 0.5
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-3">详细反馈</h4>
                  <div className="space-y-2">
                    {consistencyResult.feedback.map((feedback, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          feedback.startsWith("✓")
                            ? "bg-green-50 border border-green-100"
                            : feedback.startsWith("✗")
                              ? "bg-red-50 border border-red-100"
                              : "bg-gray-50 border border-gray-100"
                        }`}
                      >
                        <div className="flex items-start">
                          {feedback.startsWith("✓") ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          ) : feedback.startsWith("✗") ? (
                            <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                          ) : (
                            <HelpCircle className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                          )}
                          <p className="text-sm">{feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">改进建议</h4>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>标注提示</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>确保标注包含完整的病变区域，不要截断</li>
                        <li>对于模糊边界的病变，尽量包含整个可疑区域</li>
                        <li>注意检查容易被忽略的区域，如肺尖和肺底</li>
                        <li>对于多发病变，确保每个病灶都被标注</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("ai-assisted")}>
                    <Brain className="h-4 w-4 mr-2" />
                    返回AI辅助标注
                  </Button>
                  <Button onClick={() => setActiveTab("manual")}>
                    <Crosshair className="h-4 w-4 mr-2" />
                    继续手动标注
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Layers className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="mb-2">暂无评估结果</p>
                <p className="text-sm">
                  请先在AI辅助标注页面点击"评估标注一致性"按钮，系统将分析您的标注与AI建议的一致性
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
