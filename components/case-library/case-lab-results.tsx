"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { CaseLab } from "../../types/case-library"
import { Search, Download, Calendar, ArrowUpDown, AlertTriangle, FlaskRoundIcon as Flask } from "lucide-react"

interface CaseLabResultsProps {
  labTests: CaseLab[]
}

export function CaseLabResults({ labTests }: CaseLabResultsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "name" | "abnormal">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"table" | "chart">("table")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // 获取所有检验类别
  const getCategories = () => {
    const categories = new Set<string>()
    labTests.forEach((test) => {
      // 从检验名称中提取类别，例如"血常规 - 白细胞"中的"血常规"
      const category = test.name.split(" - ")[0]
      if (category) {
        categories.add(category)
      }
    })
    return Array.from(categories)
  }

  const categories = getCategories()

  // 过滤和排序实验室检查
  const getFilteredAndSortedTests = () => {
    return labTests
      .filter((test) => {
        // 按搜索词过滤
        if (searchQuery && !test.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false
        }
        // 按类别过滤
        if (selectedCategory !== "all") {
          const category = test.name.split(" - ")[0]
          if (category !== selectedCategory) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        // 按选定字段排序
        if (sortBy === "date") {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA
        } else if (sortBy === "name") {
          return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else if (sortBy === "abnormal") {
          if (a.isAbnormal === b.isAbnormal) {
            return 0
          }
          if (sortDirection === "asc") {
            return a.isAbnormal ? 1 : -1
          } else {
            return a.isAbnormal ? -1 : 1
          }
        }
        return 0
      })
  }

  const filteredTests = getFilteredAndSortedTests()

  // 切换排序方向
  const toggleSort = (field: "date" | "name" | "abnormal") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("desc")
    }
  }

  // 准备图表数据
  const prepareChartData = () => {
    // 按日期分组
    const dateGroups: { [key: string]: { date: string; [key: string]: any } } = {}

    filteredTests.forEach((test) => {
      const date = new Date(test.date).toLocaleDateString()
      if (!dateGroups[date]) {
        dateGroups[date] = { date }
      }

      // 使用检验名称作为键
      const name = test.name.split(" - ").length > 1 ? test.name.split(" - ")[1] : test.name
      dateGroups[date][name] = Number.parseFloat(test.value)
    })

    return Object.values(dateGroups)
  }

  const chartData = prepareChartData()

  // 如果没有检验结果
  if (labTests.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">实验室检查</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Flask className="h-12 w-12 mx-auto mb-4" />
            <p>该病例没有相关实验室检查结果</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">实验室检查 ({labTests.length})</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              表格视图
            </Button>
            <Button
              variant={viewMode === "chart" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("chart")}
            >
              图表视图
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 过滤和搜索工具栏 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex items-center flex-1">
            <Input
              placeholder="搜索检验项目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button variant="outline" size="icon" className="shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-[200px]">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="normal">正常</TabsTrigger>
                <TabsTrigger value="abnormal">异常</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* 类别选择器 */}
        <ScrollArea className="whitespace-nowrap pb-4 mb-4">
          <div className="flex gap-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("all")}
            >
              全部
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </ScrollArea>

        {/* 表格视图 */}
        {viewMode === "table" && (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" size="sm" onClick={() => toggleSort("name")} className="flex items-center">
                      检验项目
                      {sortBy === "name" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>结果</TableHead>
                  <TableHead>参考范围</TableHead>
                  <TableHead className="w-[100px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSort("abnormal")}
                      className="flex items-center"
                    >
                      状态
                      {sortBy === "abnormal" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <Button variant="ghost" size="sm" onClick={() => toggleSort("date")} className="flex items-center">
                      日期
                      {sortBy === "date" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      未找到匹配的检验结果
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTests.map((test, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell
                        className={test.isAbnormal ? "text-red-600 font-medium" : ""}
                      >{`${test.value} ${test.unit}`}</TableCell>
                      <TableCell>{test.referenceRange}</TableCell>
                      <TableCell>
                        {test.isAbnormal ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            异常
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50">
                            正常
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(test.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* 图表视图 */}
        {viewMode === "chart" && (
          <div className="border rounded-md p-4">
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <p>没有可用于图表显示的数据</p>
                </div>
              </div>
            ) : (
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "数值",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {Object.keys(chartData[0])
                        .filter((key) => key !== "date")
                        .map((key, index) => (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={`var(--color-${index % 10})`}
                            name={key}
                          />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
