"use client"

import { CalendarIcon, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface LogsFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  dateRange: { from: Date | undefined; to: Date | undefined }
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void
  logLevel: string[]
  setLogLevel: (levels: string[]) => void
  userFilter: string[]
  setUserFilter: (users: string[]) => void
  moduleFilter: string[]
  setModuleFilter: (modules: string[]) => void
}

export function LogsFilter({
  searchQuery,
  setSearchQuery,
  dateRange,
  setDateRange,
  logLevel,
  setLogLevel,
  userFilter,
  setUserFilter,
  moduleFilter,
  setModuleFilter,
}: LogsFilterProps) {
  // 模拟的用户和模块列表
  const availableUsers = ["系统", "zhang.wei@example.com", "li.na@example.com", "system_api"]

  const availableModules = [
    { value: "auth", label: "认证" },
    { value: "system", label: "系统" },
    { value: "database", label: "数据库" },
    { value: "api", label: "API" },
    { value: "medical_records", label: "病历" },
    { value: "scheduler", label: "计划任务" },
    { value: "security", label: "安全" },
    { value: "user", label: "用户" },
  ]

  const logLevels = [
    { value: "debug", label: "调试", color: "bg-gray-100 text-gray-800" },
    { value: "info", label: "信息", color: "bg-blue-100 text-blue-800" },
    { value: "warning", label: "警告", color: "bg-yellow-100 text-yellow-800" },
    { value: "error", label: "错误", color: "bg-red-100 text-red-800" },
    { value: "critical", label: "严重", color: "bg-red-200 text-red-900" },
    { value: "success", label: "成功", color: "bg-green-100 text-green-800" },
  ]

  const handleLevelChange = (value: string) => {
    setLogLevel((prevLevels) =>
      prevLevels.includes(value) ? prevLevels.filter((level) => level !== value) : [...prevLevels, value],
    )
  }

  const handleUserChange = (value: string) => {
    setUserFilter((prevUsers) =>
      prevUsers.includes(value) ? prevUsers.filter((user) => user !== value) : [...prevUsers, value],
    )
  }

  const handleModuleChange = (value: string) => {
    setModuleFilter((prevModules) =>
      prevModules.includes(value) ? prevModules.filter((module) => module !== value) : [...prevModules, value],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDateRange({ from: undefined, to: undefined })
    setLogLevel([])
    setUserFilter([])
    setModuleFilter([])
  }

  // 计算活跃的筛选器数量
  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (dateRange.from || dateRange.to ? 1 : 0) +
    (logLevel.length > 0 ? 1 : 0) +
    (userFilter.length > 0 ? 1 : 0) +
    (moduleFilter.length > 0 ? 1 : 0)

  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="搜索日志内容、用户或详情..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">清除搜索</span>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* 日期范围选择器 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={dateRange.from || dateRange.to ? "default" : "outline"}
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "yyyy/MM/dd", { locale: zhCN })} -{" "}
                      {format(dateRange.to, "yyyy/MM/dd", { locale: zhCN })}
                    </>
                  ) : (
                    format(dateRange.from, "yyyy/MM/dd", { locale: zhCN })
                  )
                ) : (
                  "日期范围"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={zhCN}
                mode="range"
                defaultMonth={new Date()}
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) =>
                  setDateRange({
                    from: range?.from,
                    to: range?.to,
                  })
                }
                numberOfMonths={2}
              />
              <div className="flex items-center justify-between p-3 border-t">
                <Button variant="ghost" size="sm" onClick={() => setDateRange({ from: undefined, to: undefined })}>
                  清除
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // 设置为最近7天
                    const to = new Date()
                    const from = new Date()
                    from.setDate(from.getDate() - 7)
                    setDateRange({ from, to })
                  }}
                >
                  最近7天
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* 日志级别筛选器 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={logLevel.length > 0 ? "default" : "outline"}
                className="justify-start text-left font-normal"
              >
                {logLevel.length > 0 ? `级别: ${logLevel.length}项已选择` : "日志级别"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-3" align="start">
              <div className="space-y-2">
                {logLevels.map((level) => (
                  <div key={level.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`level-${level.value}`}
                      checked={logLevel.includes(level.value)}
                      onCheckedChange={() => handleLevelChange(level.value)}
                    />
                    <label
                      htmlFor={`level-${level.value}`}
                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Badge className={`${level.color} ml-1`}>{level.label}</Badge>
                    </label>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => setLogLevel([])}>
                清除
              </Button>
            </PopoverContent>
          </Popover>

          {/* 用户筛选器 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={userFilter.length > 0 ? "default" : "outline"}
                className="justify-start text-left font-normal"
              >
                {userFilter.length > 0 ? `用户: ${userFilter.length}项已选择` : "用户筛选"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-3" align="start">
              <div className="space-y-2">
                {availableUsers.map((user) => (
                  <div key={user} className="flex items-center space-x-2">
                    <Checkbox
                      id={`user-${user}`}
                      checked={userFilter.includes(user)}
                      onCheckedChange={() => handleUserChange(user)}
                    />
                    <label
                      htmlFor={`user-${user}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {user}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => setUserFilter([])}>
                清除
              </Button>
            </PopoverContent>
          </Popover>

          {/* 模块筛选器 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={moduleFilter.length > 0 ? "default" : "outline"}
                className="justify-start text-left font-normal"
              >
                {moduleFilter.length > 0 ? `模块: ${moduleFilter.length}项已选择` : "模块筛选"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-3" align="start">
              <div className="space-y-2">
                {availableModules.map((module) => (
                  <div key={module.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`module-${module.value}`}
                      checked={moduleFilter.includes(module.value)}
                      onCheckedChange={() => handleModuleChange(module.value)}
                    />
                    <label
                      htmlFor={`module-${module.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {module.label}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => setModuleFilter([])}>
                清除
              </Button>
            </PopoverContent>
          </Popover>

          {/* 清除所有筛选器 */}
          {activeFilterCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="gap-1.5">
              <X className="h-4 w-4" />
              清除全部筛选
              <Badge variant="outline" className="ml-1.5 text-xs">
                {activeFilterCount}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* 活跃筛选器标签 */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1" onClick={() => setSearchQuery("")}>
              搜索: {searchQuery}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          )}

          {(dateRange.from || dateRange.to) && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => setDateRange({ from: undefined, to: undefined })}
            >
              日期: {dateRange.from ? format(dateRange.from, "yyyy/MM/dd", { locale: zhCN }) : ""}
              {dateRange.to ? ` - ${format(dateRange.to, "yyyy/MM/dd", { locale: zhCN })}` : ""}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          )}

          {logLevel.map((level) => {
            const levelInfo = logLevels.find((l) => l.value === level)
            return (
              <Badge
                key={level}
                variant="secondary"
                className="flex items-center gap-1"
                onClick={() => handleLevelChange(level)}
              >
                级别: {levelInfo?.label || level}
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
            )
          })}

          {userFilter.map((user) => (
            <Badge
              key={user}
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => handleUserChange(user)}
            >
              用户: {user}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          ))}

          {moduleFilter.map((module) => {
            const moduleInfo = availableModules.find((m) => m.value === module)
            return (
              <Badge
                key={module}
                variant="secondary"
                className="flex items-center gap-1"
                onClick={() => handleModuleChange(module)}
              >
                模块: {moduleInfo?.label || module}
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
            )
          })}
        </div>
      )}
    </Card>
  )
}
