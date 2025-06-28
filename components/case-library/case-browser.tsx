"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Calendar,
  Tag,
  Eye,
  Bookmark,
  Clock,
  AlertTriangle,
  FileText,
  User,
  RefreshCw,
  ChevronRight,
  Network,
} from "lucide-react"
import { caseLibraryService } from "../../services/case-library-service"
import type {
  ClinicalCase,
  CaseLibraryFilterOptions,
  CaseLibrarySortOption,
  CaseTag,
  CaseType,
  CaseSeverity,
  CaseStatus,
} from "../../types/case-library"

interface CaseBrowserProps {
  initialNodeIds?: string[]
  onCaseSelect?: (caseId: string) => void
}

export function CaseBrowser({ initialNodeIds, onCaseSelect }: CaseBrowserProps) {
  const [cases, setCases] = useState<ClinicalCase[]>([])
  const [filteredCases, setFilteredCases] = useState<ClinicalCase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<CaseType[]>([])
  const [selectedSeverities, setSelectedSeverities] = useState<CaseSeverity[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<CaseStatus[]>([])
  const [sortOption, setSortOption] = useState<CaseLibrarySortOption>("最新添加")
  const [tags, setTags] = useState<CaseTag[]>([])
  const [caseTypes, setCaseTypes] = useState<CaseType[]>([])
  const [severities, setSeverities] = useState<CaseSeverity[]>([])
  const [statuses, setStatuses] = useState<CaseStatus[]>([])
  const [relatedNodeIds, setRelatedNodeIds] = useState<string[]>(initialNodeIds || [])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // 加载病例数据
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      // 加载所有病例
      const allCases = caseLibraryService.getAllCases()
      setCases(allCases)

      // 加载标签、类型、严重程度和状态
      setTags(caseLibraryService.getAllTags())
      setCaseTypes(caseLibraryService.getAllCaseTypes())
      setSeverities(caseLibraryService.getAllSeverities())
      setStatuses(caseLibraryService.getAllStatuses())

      // 应用初始过滤器
      applyFilters(allCases)
    } catch (err) {
      console.error("加载病例数据失败:", err)
      setError("加载病例数据失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [])

  // 当过滤条件变化时应用过滤器
  useEffect(() => {
    applyFilters(cases)
  }, [
    searchQuery,
    selectedTags,
    selectedTypes,
    selectedSeverities,
    selectedStatuses,
    sortOption,
    relatedNodeIds,
    cases,
  ])

  // 应用过滤器
  const applyFilters = (casesToFilter: ClinicalCase[]) => {
    try {
      const filterOptions: CaseLibraryFilterOptions = {
        searchQuery: searchQuery || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        type: selectedTypes.length > 0 ? selectedTypes : undefined,
        severity: selectedSeverities.length > 0 ? selectedSeverities : undefined,
        status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
        relatedNodeIds: relatedNodeIds.length > 0 ? relatedNodeIds : undefined,
      }

      let filtered = caseLibraryService.getFilteredCases(filterOptions)
      filtered = caseLibraryService.sortCases(filtered, sortOption)
      setFilteredCases(filtered)
    } catch (err) {
      console.error("应用过滤器失败:", err)
      setError("应用过滤器失败")
    }
  }

  // 重置过滤器
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedTypes([])
    setSelectedSeverities([])
    setSelectedStatuses([])
    setSortOption("最新添加")
    setRelatedNodeIds(initialNodeIds || [])
  }

  // 处理标签选择变化
  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tagId])
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId))
    }
  }

  // 处理类型选择变化
  const handleTypeChange = (type: CaseType, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  // 处理严重程度选择变化
  const handleSeverityChange = (severity: CaseSeverity, checked: boolean) => {
    if (checked) {
      setSelectedSeverities([...selectedSeverities, severity])
    } else {
      setSelectedSeverities(selectedSeverities.filter((s) => s !== severity))
    }
  }

  // 处理状态选择变化
  const handleStatusChange = (status: CaseStatus, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status])
    } else {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    }
  }

  // 处理病例选择
  const handleCaseSelect = (caseId: string) => {
    // 增加查看次数
    caseLibraryService.incrementViewCount(caseId)

    // 调用外部处理函数
    if (onCaseSelect) {
      onCaseSelect(caseId)
    }
  }

  // 获取严重程度的颜色
  const getSeverityColor = (severity: CaseSeverity) => {
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
  const getStatusColor = (status: CaseStatus) => {
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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">正在加载病例库...</p>
        </div>
      </div>
    )
  }

  // 渲染错误状态
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p className="text-xl mb-2">加载失败</p>
          <p>{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              典型病例库
            </CardTitle>
            <CardDescription>浏览与知识图谱相关的典型病例，辅助临床决策</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-1" />
              {showFilters ? "隐藏过滤器" : "显示过滤器"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? "列表视图" : "网格视图"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* 过滤器面板 */}
          {showFilters && (
            <div className="w-full md:w-64 border-r border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">过滤选项</h3>
                <div className="flex items-center mb-4">
                  <Input
                    placeholder="搜索病例..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mr-2"
                  />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* 标签过滤 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      标签
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center">
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={(checked) => handleTagChange(tag.id, checked as boolean)}
                          />
                          <Label htmlFor={`tag-${tag.id}`} className="ml-2 flex items-center">
                            <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: tag.color }}></span>
                            {tag.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 类型过滤 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      病例类型
                    </h4>
                    <div className="space-y-2">
                      {caseTypes.map((type) => (
                        <div key={type} className="flex items-center">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                          />
                          <Label htmlFor={`type-${type}`} className="ml-2">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 严重程度过滤 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      严重程度
                    </h4>
                    <div className="space-y-2">
                      {severities.map((severity) => (
                        <div key={severity} className="flex items-center">
                          <Checkbox
                            id={`severity-${severity}`}
                            checked={selectedSeverities.includes(severity)}
                            onCheckedChange={(checked) => handleSeverityChange(severity, checked as boolean)}
                          />
                          <Label htmlFor={`severity-${severity}`} className="ml-2">
                            <Badge className={getSeverityColor(severity)}>{severity}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 状态过滤 */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      状态
                    </h4>
                    <div className="space-y-2">
                      {statuses.map((status) => (
                        <div key={status} className="flex items-center">
                          <Checkbox
                            id={`status-${status}`}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                          />
                          <Label htmlFor={`status-${status}`} className="ml-2">
                            <Badge className={getStatusColor(status)}>{status}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 排序选项 */}
                  <div>
                    <h4 className="font-medium mb-2">排序方式</h4>
                    <Select value={sortOption} onValueChange={(value) => setSortOption(value as CaseLibrarySortOption)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="最新添加">最新添加</SelectItem>
                        <SelectItem value="最多查看">最多查看</SelectItem>
                        <SelectItem value="最多保存">最多保存</SelectItem>
                        <SelectItem value="最新更新">最新更新</SelectItem>
                        <SelectItem value="严重程度">严重程度</SelectItem>
                        <SelectItem value="相关性">相关性</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 知识图谱关联 */}
                  {relatedNodeIds.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Network className="h-4 w-4 mr-1" />
                        知识图谱关联
                      </h4>
                      <p className="text-sm text-gray-500">当前已关联 {relatedNodeIds.length} 个知识图谱节点</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => setRelatedNodeIds([])}>
                        清除知识图谱过滤
                      </Button>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重置过滤器
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 主内容区域 */}
          <div className="flex-1 p-4">
            {/* 结果统计 */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                找到 <span className="font-medium">{filteredCases.length}</span> 个病例
                {relatedNodeIds.length > 0 && <span> (与知识图谱节点关联)</span>}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">排序:</span>
                <Select value={sortOption} onValueChange={(value) => setSortOption(value as CaseLibrarySortOption)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="最新添加">最新添加</SelectItem>
                    <SelectItem value="最多查看">最多查看</SelectItem>
                    <SelectItem value="最多保存">最多保存</SelectItem>
                    <SelectItem value="最新更新">最新更新</SelectItem>
                    <SelectItem value="严重程度">严重程度</SelectItem>
                    <SelectItem value="相关性">相关性</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 病例列表 */}
            {filteredCases.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-xl mb-2">未找到匹配的病例</p>
                  <p>尝试调整过滤条件或清除搜索查询</p>
                  <Button variant="outline" className="mt-4" onClick={resetFilters}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    重置过滤器
                  </Button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCases.map((clinicalCase) => (
                  <Card key={clinicalCase.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg line-clamp-2">{clinicalCase.title}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {clinicalCase.tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            className="text-xs"
                            style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{clinicalCase.diagnosis.primary}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className={getSeverityColor(clinicalCase.severity)}>{clinicalCase.severity}</Badge>
                        <Badge className={getStatusColor(clinicalCase.status)}>{clinicalCase.status}</Badge>
                        <Badge variant="outline">{clinicalCase.type}</Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <User className="h-3 w-3 mr-1" />
                        <span>{clinicalCase.createdBy.name}</span>
                        <span className="mx-1">·</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(clinicalCase.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{clinicalCase.viewCount}</span>
                        </div>
                        <div className="flex items-center">
                          <Bookmark className="h-3 w-3 mr-1" />
                          <span>{clinicalCase.saveCount}</span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleCaseSelect(clinicalCase.id)}>
                        查看详情
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCases.map((clinicalCase) => (
                  <Card key={clinicalCase.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg mb-1">{clinicalCase.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{clinicalCase.diagnosis.primary}</p>
                          </div>
                          <div className="flex gap-1">
                            <Badge className={getSeverityColor(clinicalCase.severity)}>{clinicalCase.severity}</Badge>
                            <Badge className={getStatusColor(clinicalCase.status)}>{clinicalCase.status}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {clinicalCase.tags.map((tag) => (
                            <Badge
                              key={tag.id}
                              className="text-xs"
                              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <User className="h-3 w-3 mr-1" />
                          <span>{clinicalCase.createdBy.name}</span>
                          <span className="mx-1">·</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(clinicalCase.createdAt).toLocaleDateString()}</span>
                          <span className="mx-1">·</span>
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{clinicalCase.viewCount}</span>
                          <span className="mx-1">·</span>
                          <Bookmark className="h-3 w-3 mr-1" />
                          <span>{clinicalCase.saveCount}</span>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-end md:border-l border-gray-100">
                        <Button size="sm" onClick={() => handleCaseSelect(clinicalCase.id)}>
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
