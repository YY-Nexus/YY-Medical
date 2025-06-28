"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CaseImageViewer } from "./case-image-viewer"
import { CaseLabResults } from "./case-lab-results"
import { CaseTreatmentTimeline } from "./case-treatment-timeline"
import { CaseKnowledgePoints } from "./case-knowledge-points"
import { CaseComments } from "./case-comments"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { caseLibraryService } from "../../services/case-library-service"
import { knowledgeGraphService } from "../../services/knowledge-graph-service"
import type { ClinicalCase } from "../../types/case-library"
import type { GraphNode } from "../../types/knowledge-graph"
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  FileText,
  Eye,
  Bookmark,
  Share2,
  Download,
  Printer,
  Network,
  ImageIcon,
  FlaskRoundIcon as Flask,
  Pill,
  Lightbulb,
  ChevronRight,
} from "lucide-react"

interface CaseDetailProps {
  caseId: string
  onBack?: () => void
  onNodeClick?: (nodeId: string) => void
}

export function CaseDetail({ caseId, onBack, onNodeClick }: CaseDetailProps) {
  const router = useRouter()
  const [clinicalCase, setClinicalCase] = useState<ClinicalCase | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedNodes, setRelatedNodes] = useState<GraphNode[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  // 加载病例数据
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      // 获取病例详情
      const caseData = caseLibraryService.getCaseById(caseId)
      if (caseData) {
        setClinicalCase(caseData)

        // 获取关联的知识图谱节点
        if (caseData.relatedNodeIds && caseData.relatedNodeIds.length > 0) {
          const nodes = caseData.relatedNodeIds
            .map((nodeId) => {
              try {
                return knowledgeGraphService.getNodeById("graph-1", nodeId)
              } catch (err) {
                console.error(`获取节点 ${nodeId} 失败:`, err)
                return null
              }
            })
            .filter((node): node is GraphNode => node !== null)

          setRelatedNodes(nodes)
        }
      } else {
        setError("未找到指定的病例")
      }
    } catch (err) {
      console.error("加载病例数据失败:", err)
      setError("加载病例数据失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [caseId])

  // 处理返回
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  // 处理知识图谱节点点击
  const handleNodeClick = (nodeId: string) => {
    if (onNodeClick) {
      onNodeClick(nodeId)
    } else {
      // 导航到知识图谱页面并聚焦到指定节点
      router.push(`/knowledge-graph?focusNode=${nodeId}`)
    }
  }

  // 获取严重程度的颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "轻度":
        return "bg-green-100 text-green-800"
      case "中度":
        return "bg-yellow-100 text-yellow-800"
      case "重度":
        return "bg-orange-100 text-orange-800"
      case "危重":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取状态的颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "进行中":
        return "bg-blue-100 text-blue-800"
      case "已完成":
        return "bg-green-100 text-green-800"
      case "已归档":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 渲染加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <LoadingSpinner className="h-12 w-12 mx-auto mb-4" />
          <p className="text-gray-500">正在加载病例详情...</p>
        </div>
      </div>
    )
  }

  // 渲染错误状态
  if (error || !clinicalCase) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p className="text-xl mb-2">加载失败</p>
          <p>{error || "未找到病例数据"}</p>
          <Button variant="outline" className="mt-4" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* 顶部导航和操作栏 */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回病例库
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            分享
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            打印
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </div>

      {/* 病例标题和基本信息 */}
      <Card className="mb-6 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-2xl text-blue-800">{clinicalCase.title}</CardTitle>
              <CardDescription className="mt-2">
                <span className="font-medium">主要诊断：</span>
                {clinicalCase.diagnosis.primary}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className={getSeverityColor(clinicalCase.severity)}>{clinicalCase.severity}</Badge>
                <Badge className={getStatusColor(clinicalCase.status)}>{clinicalCase.status}</Badge>
                <Badge variant="outline">{clinicalCase.type}</Badge>
                {clinicalCase.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                    className="text-xs"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  <span className="font-medium">创建者：</span>
                  {clinicalCase.createdBy.name} ({clinicalCase.createdBy.role})
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  <span className="font-medium">创建日期：</span>
                  {new Date(clinicalCase.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  <span className="font-medium">更新日期：</span>
                  {new Date(clinicalCase.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  <span className="font-medium">查看次数：</span>
                  {clinicalCase.viewCount}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 左侧信息面板 */}
        <div className="md:col-span-1">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">患者信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">年龄</p>
                  <p className="font-medium">{clinicalCase.patientInfo.age} 岁</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">性别</p>
                  <p className="font-medium">{clinicalCase.patientInfo.gender}</p>
                </div>
                {clinicalCase.patientInfo.occupation && (
                  <div>
                    <p className="text-sm text-gray-500">职业</p>
                    <p className="font-medium">{clinicalCase.patientInfo.occupation}</p>
                  </div>
                )}
                <Separator />
                <div>
                  <p className="text-sm text-gray-500 mb-1">既往病史</p>
                  {clinicalCase.patientInfo.medicalHistory && clinicalCase.patientInfo.medicalHistory.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {clinicalCase.patientInfo.medicalHistory.map((history, index) => (
                        <li key={index}>{history}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">无</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">家族史</p>
                  {clinicalCase.patientInfo.familyHistory && clinicalCase.patientInfo.familyHistory.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {clinicalCase.patientInfo.familyHistory.map((history, index) => (
                        <li key={index}>{history}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">无</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">过敏史</p>
                  {clinicalCase.patientInfo.allergies && clinicalCase.patientInfo.allergies.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {clinicalCase.patientInfo.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">无</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 知识图谱关联 */}
          {relatedNodes.length > 0 && (
            <Card className="shadow-md mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Network className="h-5 w-5 mr-2 text-blue-600" />
                  知识图谱关联
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    {relatedNodes.map((node) => (
                      <div
                        key={node.id}
                        className="p-2 border border-gray-100 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => handleNodeClick(node.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{node.name}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {node.type}
                            </Badge>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => router.push("/knowledge-graph")}
                >
                  查看完整知识图谱
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧主要内容 */}
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                概述
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-2" />
                影像
              </TabsTrigger>
              <TabsTrigger value="labs" className="flex items-center">
                <Flask className="h-4 w-4 mr-2" />
                检验
              </TabsTrigger>
              <TabsTrigger value="treatment" className="flex items-center">
                <Pill className="h-4 w-4 mr-2" />
                治疗
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                知识点
              </TabsTrigger>
            </TabsList>

            {/* 概述标签页 */}
            <TabsContent value="overview" className="mt-0">
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">主诉</h3>
                      <p>{clinicalCase.chiefComplaint}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">现病史</h3>
                      <p className="whitespace-pre-line">{clinicalCase.presentIllness}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">体格检查</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {clinicalCase.physicalExamination.map((exam, index) => (
                          <li key={index}>{exam}</li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">诊断</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">主要诊断：</p>
                          <p>{clinicalCase.diagnosis.primary}</p>
                        </div>
                        {clinicalCase.diagnosis.differential && clinicalCase.diagnosis.differential.length > 0 && (
                          <div>
                            <p className="font-medium">鉴别诊断：</p>
                            <ul className="list-disc list-inside">
                              {clinicalCase.diagnosis.differential.map((diagnosis, index) => (
                                <li key={index}>{diagnosis}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {clinicalCase.diagnosis.icd10Code && (
                          <div>
                            <p className="font-medium">ICD-10编码：</p>
                            <p>{clinicalCase.diagnosis.icd10Code}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">结局</h3>
                      <p>{clinicalCase.outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 评论区 */}
              <div className="mt-6">
                <CaseComments comments={clinicalCase.comments} caseId={clinicalCase.id} />
              </div>
            </TabsContent>

            {/* 影像标签页 */}
            <TabsContent value="images" className="mt-0">
              <CaseImageViewer images={clinicalCase.images} />
            </TabsContent>

            {/* 检验标签页 */}
            <TabsContent value="labs" className="mt-0">
              <CaseLabResults labTests={clinicalCase.labTests} />
            </TabsContent>

            {/* 治疗标签页 */}
            <TabsContent value="treatment" className="mt-0">
              <CaseTreatmentTimeline treatments={clinicalCase.treatments} followUps={clinicalCase.followUps} />
            </TabsContent>

            {/* 知识点标签页 */}
            <TabsContent value="knowledge" className="mt-0">
              <CaseKnowledgePoints knowledgePoints={clinicalCase.knowledgePoints} onNodeClick={handleNodeClick} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
