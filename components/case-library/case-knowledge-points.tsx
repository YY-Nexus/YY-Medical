"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import type { CaseKnowledgePoint } from "../../types/case-library"
import { Lightbulb, Search, ArrowUpDown, Network, BookOpen, ChevronRight, Star } from "lucide-react"

interface CaseKnowledgePointsProps {
  knowledgePoints: CaseKnowledgePoint[]
  onNodeClick?: (nodeId: string) => void
}

export function CaseKnowledgePoints({ knowledgePoints, onNodeClick }: CaseKnowledgePointsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"importance" | "title">("importance")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [minImportance, setMinImportance] = useState(0)
  const [selectedKnowledgePoint, setSelectedKnowledgePoint] = useState<CaseKnowledgePoint | null>(null)

  // 过滤和排序知识点
  const getFilteredAndSortedKnowledgePoints = () => {
    return knowledgePoints
      .filter((point) => {
        // 按搜索词过滤
        if (
          searchQuery &&
          !point.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !point.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false
        }
        // 按重要性过滤
        if (point.importance < minImportance) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        // 按选定字段排序
        if (sortBy === "importance") {
          return sortDirection === "asc" ? a.importance - b.importance : b.importance - a.importance
        } else if (sortBy === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        }
        return 0
      })
  }

  const filteredKnowledgePoints = getFilteredAndSortedKnowledgePoints()

  // 切换排序方向
  const toggleSort = (field: "importance" | "title") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("desc")
    }
  }

  // 处理知识图谱节点点击
  const handleNodeClick = (nodeId: string) => {
    if (onNodeClick) {
      onNodeClick(nodeId)
    }
  }

  // 如果没有知识点
  if (knowledgePoints.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">知识点</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Lightbulb className="h-12 w-12 mx-auto mb-4" />
            <p>该病例没有相关知识点</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">知识点 ({knowledgePoints.length})</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toggleSort("importance")} className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              按重要性
              {sortBy === "importance" && (
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleSort("title")} className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              按标题
              {sortBy === "title" && (
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 过滤和搜索工具栏 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex items-center flex-1">
            <Input
              placeholder="搜索知识点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button variant="outline" size="icon" className="shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full sm:w-[200px]">
            <div className="text-sm mb-1 flex justify-between">
              <span>最小重要性: {minImportance}</span>
            </div>
            <Slider
              value={[minImportance]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => setMinImportance(value[0])}
            />
          </div>
        </div>

        {/* 知识点列表和详情 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 知识点列表 */}
          <div className="md:col-span-1 border rounded-md overflow-hidden">
            <div className="bg-gray-50 p-3 border-b font-medium">知识点列表</div>
            <ScrollArea className="h-[500px]">
              {filteredKnowledgePoints.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-500">未找到匹配的知识点</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredKnowledgePoints.map((point) => (
                    <div
                      key={point.id}
                      className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                        selectedKnowledgePoint?.id === point.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedKnowledgePoint(point)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{point.title}</h3>
                        <div className="flex items-center">
                          <Badge variant="outline" className="ml-2">
                            {point.importance}/10
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{point.description}</p>
                      <div className="flex items-center text-xs text-blue-600 mt-2">
                        <Network className="h-3 w-3 mr-1" />
                        <span>{point.relatedNodeIds.length} 个关联节点</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* 知识点详情 */}
          <div className="md:col-span-2 border rounded-md overflow-hidden">
            {selectedKnowledgePoint ? (
              <div>
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-medium">{selectedKnowledgePoint.title}</h2>
                    <Badge className="bg-blue-100 text-blue-800">重要性: {selectedKnowledgePoint.importance}/10</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="whitespace-pre-line">{selectedKnowledgePoint.description}</p>

                  {/* 关联的知识图谱节点 */}
                  {selectedKnowledgePoint.relatedNodeIds && selectedKnowledgePoint.relatedNodeIds.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-3 flex items-center">
                        <Network className="h-5 w-5 mr-2 text-blue-600" />
                        关联的知识图谱节点
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedKnowledgePoint.relatedNodeIds.map((nodeId) => (
                          <Button
                            key={nodeId}
                            variant="outline"
                            className="justify-between"
                            onClick={() => handleNodeClick(nodeId)}
                          >
                            <div className="flex items-center">
                              <Network className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="truncate">{nodeId}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <div className="text-center text-gray-500">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                  <p>请从左侧列表选择一个知识点查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
