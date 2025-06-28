"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Lightbulb,
  AlertTriangle,
  FileText,
  Stethoscope,
  Pill,
  CalendarClock,
  AlertCircle,
  BookOpen,
  BarChart,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Info,
  CheckCircle2,
  HelpCircle,
} from "lucide-react"
import {
  clinicalDecisionService,
  type DecisionSupportResult,
  type DecisionRecommendation,
  type EvidenceLevel,
  type RecommendationStrength,
} from "../../services/clinical-decision-service"

interface DecisionSupportPanelProps {
  caseId: string
  onRecommendationSelect?: (recommendation: DecisionRecommendation) => void
}

export function DecisionSupportPanel({ caseId, onRecommendationSelect }: DecisionSupportPanelProps) {
  const [result, setResult] = useState<DecisionSupportResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("recommendations")
  const [expandedRecommendations, setExpandedRecommendations] = useState<Record<string, boolean>>({})
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, "positive" | "negative" | null>>({})

  // 加载决策支持结果
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      // 获取决策支持结果
      const supportResult = clinicalDecisionService.getDecisionSupport(caseId)

      if (supportResult) {
        setResult(supportResult)
      } else {
        setError("无法获取决策支持结果")
      }
    } catch (err) {
      console.error("加载决策支持失败:", err)
      setError("加载决策支持失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [caseId])

  // 切换推荐展开状态
  const toggleRecommendationExpanded = (id: string) => {
    setExpandedRecommendations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 处理推荐选择
  const handleRecommendationSelect = (recommendation: DecisionRecommendation) => {
    if (onRecommendationSelect) {
      onRecommendationSelect(recommendation)
    }
  }

  // 提供反馈
  const provideFeedback = (id: string, type: "positive" | "negative") => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [id]: type,
    }))

    // 这里可以添加实际的反馈提交逻辑
    console.log(`为建议 ${id} 提供了${type === "positive" ? "正面" : "负面"}反馈`)
  }

  // 获取证据级别标签颜色
  const getEvidenceLevelColor = (level: EvidenceLevel) => {
    switch (level) {
      case "Ia":
        return "bg-green-100 text-green-800"
      case "Ib":
        return "bg-green-100 text-green-800"
      case "IIa":
        return "bg-blue-100 text-blue-800"
      case "IIb":
        return "bg-blue-100 text-blue-800"
      case "III":
        return "bg-yellow-100 text-yellow-800"
      case "IV":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取推荐强度标签颜色
  const getRecommendationStrengthColor = (strength: RecommendationStrength) => {
    switch (strength) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-orange-100 text-orange-800"
      case "GPP":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取推荐类型图标
  const getRecommendationTypeIcon = (type: string) => {
    switch (type) {
      case "诊断建议":
        return <Stethoscope className="h-5 w-5 text-blue-500" />
      case "治疗方案":
        return <Pill className="h-5 w-5 text-green-500" />
      case "用药建议":
        return <Pill className="h-5 w-5 text-purple-500" />
      case "检查建议":
        return <FileText className="h-5 w-5 text-indigo-500" />
      case "随访计划":
        return <CalendarClock className="h-5 w-5 text-orange-500" />
      case "风险评估":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-gray-500" />
    }
  }

  // 获取风险级别颜色
  const getRiskLevelColor = (level: "低" | "中" | "高") => {
    switch (level) {
      case "低":
        return "bg-green-100 text-green-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "高":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 渲染加载状态
  if (loading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
            临床决策支持
          </CardTitle>
          <CardDescription>正在分析病例数据...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // 渲染错误状态
  if (error || !result) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
            临床决策支持
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-center text-red-500">
            <div>
              <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
              <p>{error || "无法获取决策支持结果"}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.reload()}>
                重试
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
          临床决策支持
        </CardTitle>
        <CardDescription>基于患者数据和临床指南的智能决策支持</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
            <TabsTrigger value="recommendations" className="text-xs">
              建议
            </TabsTrigger>
            <TabsTrigger value="differential" className="text-xs">
              鉴别诊断
            </TabsTrigger>
            <TabsTrigger value="risks" className="text-xs">
              风险因素
            </TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs">
              证据
            </TabsTrigger>
          </TabsList>

          {/* 建议选项卡 */}
          <TabsContent value="recommendations" className="m-0">
            <div className="p-4">
              <Alert className="mb-4 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertTitle>决策支持摘要</AlertTitle>
                <AlertDescription className="mt-1 text-sm">{result.summary}</AlertDescription>
              </Alert>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {result.recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-md overflow-hidden">
                      <div
                        className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleRecommendationExpanded(recommendation.id)}
                      >
                        <div className="flex items-center">
                          {getRecommendationTypeIcon(recommendation.type)}
                          <h3 className="font-medium ml-2">{recommendation.title}</h3>
                        </div>
                        <div className="flex items-center">
                          <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {recommendation.type}
                          </Badge>
                          <span className="text-sm font-medium text-blue-600">
                            {Math.round(recommendation.confidence * 100)}%
                          </span>
                          <ChevronRight
                            className={`h-4 w-4 ml-1 transition-transform ${
                              expandedRecommendations[recommendation.id] ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {expandedRecommendations[recommendation.id] && (
                        <div className="p-3 border-t">
                          <p className="text-sm mb-3">{recommendation.description}</p>

                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">理由：</h4>
                            <p className="text-sm">{recommendation.rationale}</p>
                          </div>

                          {recommendation.evidences.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-gray-500 mb-1">证据：</h4>
                              <div className="space-y-1">
                                {recommendation.evidences.map((evidence) => (
                                  <div key={evidence.id} className="text-sm flex items-center">
                                    <Badge className={`mr-1 ${getEvidenceLevelColor(evidence.level)}`}>
                                      {evidence.level}
                                    </Badge>
                                    <Badge className={`mr-2 ${getRecommendationStrengthColor(evidence.strength)}`}>
                                      {evidence.strength}
                                    </Badge>
                                    <span>{evidence.description}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {recommendation.alternatives && recommendation.alternatives.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-gray-500 mb-1">替代方案：</h4>
                              <div className="space-y-1">
                                {recommendation.alternatives.map((alt, index) => (
                                  <div key={index} className="text-sm">
                                    <span className="font-medium">{alt.title}：</span>
                                    {alt.description}
                                    {alt.conditions && (
                                      <div className="text-xs text-gray-500 mt-0.5">适用条件：{alt.conditions}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {recommendation.contraindications && recommendation.contraindications.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-gray-500 mb-1">禁忌：</h4>
                              <ul className="list-disc list-inside text-sm">
                                {recommendation.contraindications.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {recommendation.warnings && recommendation.warnings.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-gray-500 mb-1">注意事项：</h4>
                              <ul className="list-disc list-inside text-sm">
                                {recommendation.warnings.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex justify-between items-center mt-4 pt-2 border-t">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className={`text-xs ${feedbackGiven[recommendation.id] === "positive" ? "bg-green-100" : ""}`}
                                onClick={() => provideFeedback(recommendation.id, "positive")}
                                disabled={feedbackGiven[recommendation.id] !== null}
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                有用
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className={`text-xs ${feedbackGiven[recommendation.id] === "negative" ? "bg-red-100" : ""}`}
                                onClick={() => provideFeedback(recommendation.id, "negative")}
                                disabled={feedbackGiven[recommendation.id] !== null}
                              >
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                不适用
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              className="text-xs"
                              onClick={() => handleRecommendationSelect(recommendation)}
                            >
                              应用建议
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 鉴别诊断选项卡 */}
          <TabsContent value="differential" className="m-0">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">主要诊断</h3>
                <div className="p-3 bg-blue-50 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">{result.primaryDiagnosis}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-medium mb-2">鉴别诊断</h3>
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-3">
                  {result.differentialDiagnoses.map((diff, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="p-3 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{diff.diagnosis}</h4>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-blue-600 mr-2">
                              {Math.round(diff.probability * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={diff.probability * 100} className="h-1.5" />
                        </div>
                      </div>

                      <div className="p-3">
                        <h5 className="text-xs font-medium text-gray-500 mb-1">关键发现：</h5>
                        <ul className="list-disc list-inside text-sm">
                          {diff.keyFindings.map((finding, idx) => (
                            <li key={idx}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 风险因素选项卡 */}
          <TabsContent value="risks" className="m-0">
            <div className="p-4">
              <h3 className="text-sm font-medium mb-2">风险因素评估</h3>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {result.riskFactors.map((risk, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">{risk.factor}</h4>
                        </div>
                        <Badge className={getRiskLevelColor(risk.level)}>{risk.level}风险</Badge>
                      </div>

                      <div className="px-3 pb-3">
                        <p className="text-sm">{risk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 证据选项卡 */}
          <TabsContent value="evidence" className="m-0">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium">证据级别说明</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  了解更多
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="border rounded-md p-2">
                  <h4 className="text-xs font-medium mb-1">证据级别</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 mr-1">Ia</Badge>
                      <span>来自随机对照试验的系统评价</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 mr-1">Ib</Badge>
                      <span>至少一项随机对照试验</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 mr-1">IIa</Badge>
                      <span>至少一项设计良好的非随机对照研究</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 mr-1">IIb</Badge>
                      <span>至少一项设计良好的准实验研究</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-yellow-100 text-yellow-800 mr-1">III</Badge>
                      <span>设计良好的非实验性研究</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-gray-100 text-gray-800 mr-1">IV</Badge>
                      <span>专家意见或临床经验</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-2">
                  <h4 className="text-xs font-medium mb-1">推荐强度</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 mr-1">A</Badge>
                      <span>强烈推荐，高质量证据</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 mr-1">B</Badge>
                      <span>推荐，中等质量证据</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-yellow-100 text-yellow-800 mr-1">C</Badge>
                      <span>弱推荐，低质量证据</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-orange-100 text-orange-800 mr-1">D</Badge>
                      <span>不推荐，证据不足</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-purple-100 text-purple-800 mr-1">GPP</Badge>
                      <span>良好实践建议</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-medium mb-2">参考文献</h3>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {result.recommendations
                    .flatMap((rec) => rec.evidences)
                    .flatMap((ev) => ev.references)
                    .filter((ref, index, self) => index === self.findIndex((r) => r.id === ref.id))
                    .sort((a, b) => b.year - a.year)
                    .map((reference) => (
                      <div key={reference.id} className="border rounded-md p-3">
                        <h4 className="text-sm font-medium mb-1">{reference.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{reference.authors}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>
                            {reference.journal}, {reference.year}
                          </span>
                          {reference.citationCount && (
                            <Badge className="ml-2 bg-gray-100 text-gray-800">引用: {reference.citationCount}</Badge>
                          )}
                        </div>
                        {reference.doi && (
                          <Button variant="link" size="sm" className="h-6 p-0 text-xs mt-1">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            DOI: {reference.doi}
                          </Button>
                        )}
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-3">
        <Button variant="ghost" size="sm" className="text-xs">
          <BookOpen className="h-3 w-3 mr-1" />
          查看临床指南
        </Button>
        <Button variant="ghost" size="sm" className="text-xs">
          <BarChart className="h-3 w-3 mr-1" />
          查看相似病例
        </Button>
      </CardFooter>
    </Card>
  )
}
