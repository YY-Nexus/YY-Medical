"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Search, Filter, X } from "lucide-react"

interface AdvancedSearchProps {
  onSearch: (criteria: SearchCriteria) => void
  placeholder?: string
  className?: string
}

export interface SearchCriteria {
  keyword: string
  filters: {
    [key: string]: any
  }
}

export function AdvancedSearch({ onSearch, placeholder = "搜索...", className }: AdvancedSearchProps) {
  const [keyword, setKeyword] = useState("")
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [filters, setFilters] = useState<{ [key: string]: any }>({})
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  // 在组件顶部添加搜索历史状态
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 如果关键词不为空且不在历史记录中，添加到历史记录
    if (keyword.trim() && !searchHistory.includes(keyword.trim())) {
      setSearchHistory((prev) => [keyword.trim(), ...prev].slice(0, 5))
    }

    onSearch({ keyword, filters })
  }

  // 添加或更新过滤器
  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    if (!activeFilters.includes(key)) {
      setActiveFilters((prev) => [...prev, key])
    }
  }

  // 移除过滤器
  const removeFilter = (key: string) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    setFilters(newFilters)
    setActiveFilters((prev) => prev.filter((k) => k !== key))
  }

  // 清除所有过滤器
  const clearAllFilters = () => {
    setFilters({})
    setActiveFilters([])
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-9 pr-12"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 ${activeFilters.length > 0 ? "text-primary" : ""}`}
                >
                  <Filter className="h-4 w-4" />
                  {activeFilters.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">高级筛选</h3>
                      {activeFilters.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 text-xs">
                          清除全部
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* 患者状态筛选 */}
                      <div>
                        <Label className="text-xs">患者状态</Label>
                        <Select value={filters.status || ""} onValueChange={(value) => updateFilter("status", value)}>
                          <SelectTrigger className="h-8 mt-1">
                            <SelectValue placeholder="选择状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">全部</SelectItem>
                            <SelectItem value="active">跟踪中</SelectItem>
                            <SelectItem value="pending">待复诊</SelectItem>
                            <SelectItem value="urgent">紧急</SelectItem>
                            <SelectItem value="stable">稳定</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* 风险等级筛选 */}
                      <div>
                        <Label className="text-xs">风险等级</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="risk-high"
                              checked={filters.riskHigh}
                              onCheckedChange={(checked) => updateFilter("riskHigh", checked)}
                            />
                            <label htmlFor="risk-high" className="text-xs">
                              高风险
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="risk-medium"
                              checked={filters.riskMedium}
                              onCheckedChange={(checked) => updateFilter("riskMedium", checked)}
                            />
                            <label htmlFor="risk-medium" className="text-xs">
                              中风险
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="risk-low"
                              checked={filters.riskLow}
                              onCheckedChange={(checked) => updateFilter("riskLow", checked)}
                            />
                            <label htmlFor="risk-low" className="text-xs">
                              低风险
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* 就诊日期范围 */}
                      <div>
                        <Label className="text-xs">最近就诊日期</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <DatePicker
                            placeholder="开始日期"
                            value={filters.visitFrom}
                            onChange={(date) => updateFilter("visitFrom", date)}
                          />
                          <DatePicker
                            placeholder="结束日期"
                            value={filters.visitTo}
                            onChange={(date) => updateFilter("visitTo", date)}
                          />
                        </div>
                      </div>

                      {/* 年龄范围 */}
                      <div>
                        <Label className="text-xs">年龄范围</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Input
                            type="number"
                            placeholder="最小年龄"
                            className="h-8"
                            value={filters.ageMin || ""}
                            onChange={(e) => updateFilter("ageMin", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="最大年龄"
                            className="h-8"
                            value={filters.ageMax || ""}
                            onChange={(e) => updateFilter("ageMax", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* 性别筛选 */}
                      <div>
                        <Label className="text-xs">性别</Label>
                        <Select value={filters.gender || ""} onValueChange={(value) => updateFilter("gender", value)}>
                          <SelectTrigger className="h-8 mt-1">
                            <SelectValue placeholder="选择性别" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">全部</SelectItem>
                            <SelectItem value="male">男</SelectItem>
                            <SelectItem value="female">女</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsAdvancedOpen(false)}>
                        取消
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          onSearch({ keyword, filters })
                          setIsAdvancedOpen(false)
                        }}
                      >
                        应用筛选
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
            <Button type="submit" variant="ghost" size="icon" className="h-7 w-7">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {/* 搜索历史下拉菜单 */}
          {keyword.trim() === "" && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
              <div className="p-2 text-xs font-medium text-muted-foreground">搜索历史</div>
              <ul className="max-h-40 overflow-y-auto">
                {searchHistory.map((item, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center"
                      onClick={() => setKeyword(item)}
                    >
                      <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>
      {/* 在组件中添加快捷筛选按钮 */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => {
            updateFilter("status", "urgent")
            onSearch({ keyword, filters: { ...filters, status: "urgent" } })
          }}
        >
          紧急患者
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => {
            updateFilter("riskHigh", true)
            onSearch({ keyword, filters: { ...filters, riskHigh: true } })
          }}
        >
          高风险患者
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => {
            const today = new Date()
            updateFilter("visitFrom", today)
            onSearch({ keyword, filters: { ...filters, visitFrom: today } })
          }}
        >
          今日就诊
        </Button>
      </div>

      {/* 显示活动的筛选条件 */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters.map((key) => {
            let label = ""
            let value = ""

            switch (key) {
              case "status":
                label = "状态"
                value =
                  filters[key] === "active"
                    ? "跟踪中"
                    : filters[key] === "pending"
                      ? "待复诊"
                      : filters[key] === "urgent"
                        ? "紧急"
                        : filters[key] === "stable"
                          ? "稳定"
                          : filters[key]
                break
              case "riskHigh":
                label = "风险"
                value = "高风险"
                break
              case "riskMedium":
                label = "风险"
                value = "中风险"
                break
              case "riskLow":
                label = "风险"
                value = "低风险"
                break
              case "visitFrom":
                label = "就诊自"
                value = filters[key].toLocaleDateString()
                break
              case "visitTo":
                label = "就诊至"
                value = filters[key].toLocaleDateString()
                break
              case "ageMin":
                label = "年龄自"
                value = filters[key]
                break
              case "ageMax":
                label = "年龄至"
                value = filters[key]
                break
              case "gender":
                label = "性别"
                value = filters[key] === "male" ? "男" : filters[key] === "female" ? "女" : filters[key]
                break
              default:
                label = key
                value = filters[key]
            }

            return (
              <div key={key} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs">
                <span className="font-medium">{label}:</span>
                <span>{value}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => removeFilter(key)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
