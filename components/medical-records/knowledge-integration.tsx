"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BookOpen, Pill, AlertTriangle, Stethoscope, BookMarked, Search, RefreshCw } from "lucide-react"
import {
  medicalKnowledgeService,
  type DiseaseReference,
  type TreatmentGuideline,
  type MedicalReference,
} from "../../services/medical-knowledge-service"
import type { DiagnosticFinding } from "../../types/medical-records"

interface KnowledgeIntegrationProps {
  findings: DiagnosticFinding[]
  patientId?: string
}

export function KnowledgeIntegration({ findings, patientId }: KnowledgeIntegrationProps) {
  const [relatedDiseases, setRelatedDiseases] = useState<{ disease: DiseaseReference; relevanceScore: number }[]>([])
  const [selectedDisease, setSelectedDisease] = useState<DiseaseReference | null>(null)
  const [treatmentGuidelines, setTreatmentGuidelines] = useState<TreatmentGuideline[]>([])
  const [references, setReferences] = useState<MedicalReference[]>([])
  const [activeTab, setActiveTab] = useState("disease-info")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // 从诊断结果中提取疾病名称并加载相关数据
  useEffect(() => {
    if (findings.length > 0) {
      loadRelatedDiseases()
    } else {
      setIsLoading(false)
    }
  }, [findings])

  // 加载相关疾病数据
  const loadRelatedDiseases = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const findingTexts = findings.map((finding) => finding.finding)
      const matchedDiseases = medicalKnowledgeService.findDiseasesByDiagnosticFindings(findingTexts)
      setRelatedDiseases(matchedDiseases)

      // 如果有匹配的疾病，默认选择第一个
      if (matchedDiseases.length > 0) {
        const firstDisease = matchedDiseases[0].disease
        setSelectedDisease(firstDisease)
        loadDiseaseDetails(firstDisease.id)
      } else {
        setTreatmentGuidelines([])
        setReferences([])
      }
    } catch (err) {
      console.error("加载疾病数据失败:", err)
      setError("加载疾病数据时发生错误，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  // 加载疾病详细信息
  const loadDiseaseDetails = (diseaseId: string) => {
    try {
      // 获取相关的治疗指南和参考文献
      const guidelines = medicalKnowledgeService.getTreatmentGuidelinesForDisease(diseaseId)
      setTreatmentGuidelines(guidelines)

      const refs = medicalKnowledgeService.getReferencesForDisease(diseaseId)
      setReferences(refs)
    } catch (err) {
      console.error("加载疾病详情失败:", err)
      setError("加载疾病详情时发生错误")
    }
  }

  // 处理疾病选择
  const handleDiseaseSelect = (disease: DiseaseReference) => {
    setSelectedDisease(disease)
    setActiveTab("disease-info")
    loadDiseaseDetails(disease.id)
  }

  // 处理搜索
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    try {
      const searchResults = medicalKnowledgeService.searchDiseases(searchQuery)
      setRelatedDiseases(searchResults.map((disease) => ({ disease, relevanceScore: 50 })))

      if (searchResults.length > 0) {
        setSelectedDisease(searchResults[0])
        loadDiseaseDetails(searchResults[0].id)
      }
    } catch (err) {
      console.error("搜索疾病失败:", err)
      setError("搜索疾病时发生错误")
    }
  }

  // 获取推荐级别的颜色
  const getRecommendationColor = (level: string) => {
    switch (level) {
      case "强烈推荐":
        return "bg-green-100 text-green-800"
      case "推荐":
        return "bg-blue-100 text-blue-800"
      case "可考虑":
        return "bg-yellow-100 text-yellow-800"
      case "谨慎使用":
        return "bg-orange-100 text-orange-800"
      case "不推荐":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取证据级别的颜色
  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "A":
        return "bg-purple-100 text-purple-800"
      case "B":
        return "bg-indigo-100 text-indigo-800"
      case "C":
        return "bg-blue-100 text-blue-800"
      case "D":
        return "bg-teal-100 text-teal-800"
      case "E":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 渲染错误提示
  const renderError = () => {
    if (!error) return null

    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>加载失败</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          医学知识库集成
        </CardTitle>
        <CardDescription>基于AI诊断结果，提供相关疾病信息、治疗指南和参考文献</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {renderError()}

        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* 左侧疾病列表 */}
          <div className="border-r border-gray-200 p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">相关疾病</h3>
              <p className="text-sm text-gray-500 mb-4">基于AI诊断结果，系统自动匹配了以下可能相关的疾病信息</p>

              {/* 添加搜索功能 */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="搜索疾病..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button variant="outline" size="sm" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* 刷新按钮 */}
              {findings.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mb-4"
                  onClick={loadRelatedDiseases}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  重新匹配疾病
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : relatedDiseases.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <div className="space-y-2">
                  {relatedDiseases.map(({ disease, relevanceScore }) => (
                    <div
                      key={disease.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedDisease?.id === disease.id
                          ? "bg-blue-100 border-l-4 border-blue-500"
                          : "hover:bg-gray-100 border-l-4 border-transparent"
                      }`}
                      onClick={() => handleDiseaseSelect(disease)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{disease.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          相关度: {Math.min(100, Math.round(relevanceScore * 5))}%
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{disease.description}</p>
                      {disease.icd10Code && (
                        <div className="mt-1 text-xs text-gray-500">ICD-10: {disease.icd10Code}</div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>未找到与当前诊断相关的疾病信息</p>
                <p className="text-sm mt-2">尝试使用搜索功能查找特定疾病</p>
              </div>
            )}
          </div>

          {/* 右侧详细信息 */}
          <div className="col-span-3 p-0">
            {selectedDisease ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b">
                  <TabsList className="p-0 bg-transparent h-12">
                    <TabsTrigger
                      value="disease-info"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      疾病信息
                    </TabsTrigger>
                    <TabsTrigger
                      value="treatment"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                    >
                      <Pill className="h-4 w-4 mr-2" />
                      治疗指南
                      {treatmentGuidelines.length > 0 && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {treatmentGuidelines.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="references"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                    >
                      <BookMarked className="h-4 w-4 mr-2" />
                      参考文献
                      {references.length > 0 && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">{references.length}</Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="disease-info" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-800 mb-2">{selectedDisease.name}</h2>
                      {selectedDisease.icd10Code && (
                        <Badge variant="outline" className="mb-4">
                          ICD-10: {selectedDisease.icd10Code}
                        </Badge>
                      )}
                      <p className="text-gray-700 mb-4">{selectedDisease.description}</p>
                      {selectedDisease.prevalence && (
                        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 mb-4">
                          <strong>流行病学：</strong> {selectedDisease.prevalence}
                        </div>
                      )}
                    </div>

                    <Accordion type="multiple" className="space-y-4">
                      <AccordionItem value="symptoms" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                            <span className="font-medium">症状表现</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedDisease.symptoms.map((symptom, index) => (
                              <li key={index} className="text-gray-700">
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      {/* 其他手风琴项保持不变 */}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="p-6">
                  {treatmentGuidelines.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-blue-800 mb-4">{selectedDisease.name}的治疗指南</h2>

                      {treatmentGuidelines.map((guideline) => (
                        <Card key={guideline.id} className="overflow-hidden">
                          <CardHeader className="bg-gray-50 p-4">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{guideline.title}</CardTitle>
                              <div className="flex gap-2">
                                <Badge className={getRecommendationColor(guideline.recommendationLevel)}>
                                  {guideline.recommendationLevel}
                                </Badge>
                                <Badge className={getEvidenceLevelColor(guideline.evidenceLevel)}>
                                  证据级别: {guideline.evidenceLevel}
                                </Badge>
                              </div>
                            </div>
                            <CardDescription>{guideline.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">详细说明</h4>
                                <p className="text-gray-700">{guideline.details}</p>
                              </div>

                              {/* 其他治疗指南内容保持不变 */}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Pill className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">暂无治疗指南</p>
                      <p>当前疾病在知识库中没有相关的治疗指南信息</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="references" className="p-6">
                  {/* 参考文献内容保持不变 */}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-full py-16 text-center text-gray-500">
                <div>
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">请选择一个疾病</p>
                  <p>从左侧列表中选择一个疾病以查看详细信息</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
