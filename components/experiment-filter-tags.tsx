"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { ExperimentFilters } from "./experiment-filter-drawer"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface ExperimentFilterTagsProps {
  filters: ExperimentFilters
  onRemoveFilter: (key: keyof ExperimentFilters, value?: string) => void
  onClearFilters: () => void
}

export function ExperimentFilterTags({ filters, onRemoveFilter, onClearFilters }: ExperimentFilterTagsProps) {
  // 计算活跃筛选器数量
  const getActiveFilterCount = () => {
    let count = 0
    if (filters.types.length > 0) count++
    if (filters.designTypes.length > 0) count++
    if (filters.statuses.length > 0) count++
    if (filters.departments.length > 0) count++
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.tags.length > 0) count++
    if (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 1000000) count++
    if (filters.sampleTypes.length > 0) count++
    if (filters.hasEthicalApproval !== null) count++
    if (filters.createdByMe) count++
    if (filters.collaborators.length > 0) count++
    if (filters.searchTerm) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  if (activeFilterCount === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">筛选条件:</span>

      {filters.searchTerm && (
        <Badge variant="secondary" className="flex items-center gap-1">
          搜索: {filters.searchTerm}
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => onRemoveFilter("searchTerm")}>
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {filters.types.map((type) => (
        <Badge key={type} variant="secondary" className="flex items-center gap-1">
          类型: {type}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("types", type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {filters.designTypes.map((type) => (
        <Badge key={type} variant="secondary" className="flex items-center gap-1">
          设计: {type}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("designTypes", type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {filters.statuses.map((status) => (
        <Badge key={status} variant="secondary" className="flex items-center gap-1">
          状态: {status}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("statuses", status)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {filters.departments.map((dept) => (
        <Badge key={dept} variant="secondary" className="flex items-center gap-1">
          部门: {dept}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("departments", dept)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {(filters.dateRange.from || filters.dateRange.to) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          日期:
          {filters.dateRange.from ? format(filters.dateRange.from, "yyyy-MM-dd", { locale: zhCN }) : "开始"} 至
          {filters.dateRange.to ? format(filters.dateRange.to, "yyyy-MM-dd", { locale: zhCN }) : "结束"}
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => onRemoveFilter("dateRange")}>
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {filters.tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          标签: {tag}
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => onRemoveFilter("tags", tag)}>
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {(filters.budgetRange[0] > 0 || filters.budgetRange[1] < 1000000) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          预算: {filters.budgetRange[0].toLocaleString()} - {filters.budgetRange[1].toLocaleString()} 元
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("budgetRange")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {filters.sampleTypes.map((type) => (
        <Badge key={type} variant="secondary" className="flex items-center gap-1">
          样本: {type}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("sampleTypes", type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {filters.hasEthicalApproval !== null && (
        <Badge variant="secondary" className="flex items-center gap-1">
          伦理批准: {filters.hasEthicalApproval ? "已批准" : "未批准"}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("hasEthicalApproval")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {filters.createdByMe && (
        <Badge variant="secondary" className="flex items-center gap-1">
          我创建的
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveFilter("createdByMe")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      <Button variant="ghost" size="sm" className="text-xs h-7" onClick={onClearFilters}>
        清除全部
      </Button>
    </div>
  )
}
