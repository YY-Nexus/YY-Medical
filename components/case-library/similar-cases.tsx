"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { caseSimilarityService, type SimilarCaseResult } from "../../services/case-similarity-service"
import { ChevronRight, BarChart2, Lightbulb, AlertTriangle } from "lucide-react"

interface SimilarCasesProps {
  caseId: string
  onCaseSelect?: (caseId: string) => void
}

export function SimilarCases({ caseId, onCaseSelect }: SimilarCasesProps) {
  const [similarCases, setSimilarCases] = useState<SimilarCaseResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // 加载相似病例
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      const results = caseSimilarityService.getSimilarCases(caseId)
      setSimilarCases(results)
    } catch (err) {
      console.error("加载相似病例失败:", err)
      setError("加载相似病例失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [caseId])

  // 切换展开状态
  const toggleExpanded = (caseId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [caseId]: !prev[caseId],
    }))
  }

  // 处理病例选择
  const handleCaseSelect = (caseId: string) => {
    if (onCaseSelect) {
      onCaseSelect(caseId)
    }
  }

  // ��式化相似度为百分比
  const formatSimilarity = (similarity: number) => {
    return `${Math.round(similarity * 100)}%`
  }

  // 获取相似度颜色
  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.7) return "text-green-600"
    if (similarity >= 0.5) return "text-blue-600"
    if (similarity >= 0.3) return "text-yellow-600"
    return "text-gray-600"
  }

  // 渲染加载状态
  if (loading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
            相似病例分析
          </CardTitle>
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
  if (error) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
            相似病例分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-center text-red-500">
            <div>
              <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
              <p>{error}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.reload()}>
                重试
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 如果没有相似病例
  if (similarCases.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
            相似病例分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-center text-gray-500">
            <div>
              <Lightbulb className="h-10 w-10 mx-auto mb-2" />
              <p>未找到相似病例</p>
              <p className="text-sm mt-1">当前病例的特征与数据库中的其他病例差异较大</p>
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
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          相似病例分析
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[500px]">
          <div className="space-y-4">
            {similarCases.map((result) => (
              <div key={result.case.id} className="border rounded-md overflow-hidden">
                <div className="p-3 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium line-clamp-1">{result.case.title}</h3>
                    <div className="flex items-center">
                      <span className={`font-medium ${getSimilarityColor(result.similarity)}`}>
                        {formatSimilarity(result.similarity)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={result.similarity * 100} className="h-1.5" />
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">主要诊断：</span>
                    {result.case.diagnosis.primary}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {result.case.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                        className="text-xs"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>

                  {/* 匹配特征 */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">匹配特征：</h4>
                    <div className="space-y-1">
                      {result.matchedFeatures.map((feature, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{feature.category}：</span>
                          {feature.items.join(", ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 展开/收起详情 */}
                  <div className="flex justify-between items-center mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(result.case.id)}
                      className="text-xs"
                    >
                      {expanded[result.case.id] ? "收起详情" : "展开详情"}
                    </Button>
                    <Button size="sm" onClick={() => handleCaseSelect(result.case.id)} className="text-xs">
                      查看病例
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>

                  {/* 展开的详情 */}
                  {expanded[result.case.id] && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <span className="text-gray-500">患者：</span>
                          {result.case.patientInfo.age}岁 {result.case.patientInfo.gender}
                        </div>
                        <div>
                          <span className="text-gray-500">创建日期：</span>
                          {new Date(result.case.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">主诉：</span>
                        {result.case.chiefComplaint}
                      </div>
                      {result.case.images.length > 0 && (
                        <div className="mb-2">
                          <span className="text-gray-500">影像：</span>
                          {result.case.images.length}张 ({result.case.images.map((img) => img.type).join(", ")})
                        </div>
                      )}
                      {result.case.treatments.length > 0 && (
                        <div>
                          <span className="text-gray-500">治疗：</span>
                          {result.case.treatments.map((t) => t.name).join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
