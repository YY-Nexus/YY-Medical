"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { caseLibraryService } from "../../services/case-library-service"
import type { ClinicalCase } from "../../types/case-library"
import type { GraphNode } from "../../types/knowledge-graph"
import { FileText, Calendar, ChevronRight, AlertTriangle, Eye } from "lucide-react"

interface RelatedCasesPanelProps {
  node: GraphNode
  onCaseSelect?: (caseId: string) => void
}

export function RelatedCasesPanel({ node, onCaseSelect }: RelatedCasesPanelProps) {
  const router = useRouter()
  const [relatedCases, setRelatedCases] = useState<ClinicalCase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 加载相关病例
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      // 获取与节点相关的病例
      const cases = caseLibraryService.getCasesByNodeId(node.id)
      setRelatedCases(cases)
    } catch (err) {
      console.error("加载相关病例失败:", err)
      setError("加载相关病例数据失败")
    } finally {
      setLoading(false)
    }
  }, [node.id])

  // 处理病例选择
  const handleCaseSelect = (caseId: string) => {
    // 增加查看次数
    caseLibraryService.incrementViewCount(caseId)

    // 调用外部处理函数或导航到病例详情页
    if (onCaseSelect) {
      onCaseSelect(caseId)
    } else {
      router.push(`/case-library/${caseId}`)
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

  // 渲染加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">正在加载相关病例...</p>
        </div>
      </div>
    )
  }

  // 渲染错误状态
  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center text-red-500">
          <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        相关典型病例 ({relatedCases.length})
      </h3>

      {relatedCases.length === 0 ? (
        <div className="text-center py-6 text-gray-500 border rounded-md">
          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>没有与该节点相关的典型病例</p>
        </div>
      ) : (
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {relatedCases.map((clinicalCase) => (
              <Card key={clinicalCase.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium line-clamp-1">{clinicalCase.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-1 mt-1">{clinicalCase.diagnosis.primary}</p>
                    </div>
                    <Badge className={getSeverityColor(clinicalCase.severity)}>{clinicalCase.severity}</Badge>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(clinicalCase.createdAt).toLocaleDateString()}</span>
                    <span className="mx-1">·</span>
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{clinicalCase.viewCount}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleCaseSelect(clinicalCase.id)}
                  >
                    查看病例
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-4"
        onClick={() => router.push(`/case-library?nodeId=${node.id}`)}
      >
        查看所有相关病例
      </Button>
    </div>
  )
}
