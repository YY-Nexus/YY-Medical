"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dna, Pill, AlertTriangle, CheckCircle, XCircle, Info, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { pharmacogenomicsService, type PharmacogenomicsProfile } from "@/services/pharmacogenomics-service"

interface PharmacogenomicsAnalysisProps {
  patientId: string
}

export function PharmacogenomicsAnalysis({ patientId }: PharmacogenomicsAnalysisProps) {
  const [profile, setProfile] = useState<PharmacogenomicsProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    loadPatientProfile()
  }, [patientId])

  const loadPatientProfile = async () => {
    try {
      setLoading(true)
      const data = await pharmacogenomicsService.getPatientProfile(patientId)
      setProfile(data)
    } catch (error) {
      console.error("加载药物基因组学档案失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const getMetabolizerIcon = (type: string) => {
    switch (type) {
      case "poor":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "intermediate":
        return <Minus className="h-4 w-4 text-yellow-500" />
      case "normal":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rapid":
      case "ultrarapid":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "standard":
        return <Badge className="bg-green-500">标准剂量</Badge>
      case "reduced":
        return <Badge className="bg-yellow-500">减少剂量</Badge>
      case "increased":
        return <Badge className="bg-blue-500">增加剂量</Badge>
      case "alternative":
        return <Badge className="bg-purple-500">替代药物</Badge>
      case "avoid":
        return <Badge className="bg-red-500">避免使用</Badge>
      default:
        return <Badge className="bg-gray-500">待评估</Badge>
    }
  }

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "A":
        return "text-green-600"
      case "B":
        return "text-blue-600"
      case "C":
        return "text-yellow-600"
      case "D":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">加载药物基因组学分析...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Dna className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">暂无药物基因组学数据</h3>
            <p className="text-muted-foreground mb-4">该患者尚未进行药物基因组学检测</p>
            <Button>申请基因检测</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Dna className="mr-2 h-5 w-5" />
            药物基因组学分析
          </CardTitle>
          <Badge className={profile.status === "completed" ? "bg-green-500" : "bg-yellow-500"}>
            {profile.status === "completed" ? "已完成" : profile.status === "reviewed" ? "已审核" : "处理中"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="genes">基因变异</TabsTrigger>
            <TabsTrigger value="recommendations">用药建议</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">检测基因</div>
                  <div className="text-2xl font-bold">{profile.geneVariants.length}</div>
                  <div className="text-sm text-muted-foreground">个基因位点</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">药物建议</div>
                  <div className="text-2xl font-bold">{profile.drugRecommendations.length}</div>
                  <div className="text-sm text-muted-foreground">种药物</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">高风险药物</div>
                  <div className="text-2xl font-bold text-red-600">
                    {profile.drugRecommendations.filter((r) => r.recommendation === "avoid").length}
                  </div>
                  <div className="text-sm text-muted-foreground">需避免使用</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">重要提醒</h3>
                <div className="space-y-2">
                  {profile.drugRecommendations
                    .filter((rec) => rec.recommendation === "avoid" || rec.recommendation === "alternative")
                    .map((rec, index) => (
                      <Alert key={index} className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription>
                          <strong>{rec.drugName}</strong>: {rec.reasoning}
                          {rec.recommendation === "avoid" && " - 建议避免使用"}
                          {rec.recommendation === "alternative" && " - 建议使用替代药物"}
                        </AlertDescription>
                      </Alert>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">检测信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">检测日期</div>
                    <div>{profile.testDate}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">报告生成</div>
                    <div>{profile.reportGenerated}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="genes" className="mt-4">
            <div className="space-y-4">
              {profile.geneVariants.map((variant, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-medium mr-2">{variant.gene}</h3>
                          {getMetabolizerIcon(variant.metabolizerType)}
                          <Badge
                            className={`ml-2 ${
                              variant.clinicalSignificance === "high"
                                ? "bg-red-500"
                                : variant.clinicalSignificance === "moderate"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          >
                            {variant.clinicalSignificance === "high"
                              ? "高"
                              : variant.clinicalSignificance === "moderate"
                                ? "中"
                                : "低"}
                            风险
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">变异型: {variant.variant}</div>
                        <div className="text-sm">表型: {variant.phenotype}</div>
                        <div className="text-sm">
                          代谢类型:{" "}
                          {variant.metabolizerType === "poor"
                            ? "慢代谢型"
                            : variant.metabolizerType === "intermediate"
                              ? "中间代谢型"
                              : variant.metabolizerType === "normal"
                                ? "正常代谢型"
                                : variant.metabolizerType === "rapid"
                                  ? "快代谢型"
                                  : "超快代谢型"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            <div className="space-y-4">
              {profile.drugRecommendations.map((rec, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Pill className="mr-2 h-4 w-4" />
                          <h3 className="text-lg font-medium mr-2">{rec.drugName}</h3>
                          {getRecommendationBadge(rec.recommendation)}
                          <span className={`ml-2 text-sm font-medium ${getEvidenceLevelColor(rec.evidenceLevel)}`}>
                            证据等级: {rec.evidenceLevel}
                          </span>
                        </div>
                        <div className="text-sm mb-2">{rec.reasoning}</div>
                        {rec.dosageAdjustment && (
                          <div className="text-sm font-medium text-blue-600">剂量调整: {rec.dosageAdjustment}</div>
                        )}
                      </div>
                      <div className="flex items-center">
                        {rec.recommendation === "avoid" && <XCircle className="h-5 w-5 text-red-500" />}
                        {rec.recommendation === "alternative" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                        {rec.recommendation === "standard" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline">下载报告</Button>
          <Button>更新建议</Button>
        </div>
      </CardContent>
    </Card>
  )
}
