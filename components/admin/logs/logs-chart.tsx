"use client"

import { useState, useEffect } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface LogsChartProps {
  type: string
  dateRange: { from: Date | undefined; to: Date | undefined }
  logLevel: string[]
  userFilter: string[]
  moduleFilter: string[]
}

// 模拟日期范围内的日志统计数据
const generateMockData = (days: number) => {
  const data = []
  const now = new Date()
  const levels = ["debug", "info", "warning", "error", "critical"]

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const entry: any = {
      date: date.toISOString().split("T")[0],
      total: Math.floor(Math.random() * 200) + 50,
    }

    // 添加各级别的随机数据
    levels.forEach((level) => {
      let value
      switch (level) {
        case "info":
          value = Math.floor(Math.random() * 100) + 20
          break
        case "debug":
          value = Math.floor(Math.random() * 50) + 10
          break
        case "warning":
          value = Math.floor(Math.random() * 30) + 5
          break
        case "error":
          value = Math.floor(Math.random() * 20) + 1
          break
        case "critical":
          value = Math.floor(Math.random() * 5)
          break
        default:
          value = 0
      }
      entry[level] = value
    })

    data.push(entry)
  }

  return data
}

// 模拟模块分布数据
const generateModuleData = () => {
  return [
    { name: "认证", value: 254 },
    { name: "系统", value: 187 },
    { name: "数据库", value: 123 },
    { name: "API", value: 245 },
    { name: "病历", value: 289 },
    { name: "计划任务", value: 98 },
    { name: "安全", value: 65 },
    { name: "用户", value: 176 },
  ]
}

export function LogsChart({ type, dateRange, logLevel, userFilter, moduleFilter }: LogsChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [moduleData, setModuleData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState("trend")

  useEffect(() => {
    setLoading(true)

    // 模拟API调用延迟
    const timer = setTimeout(() => {
      // 这里应该是真实的API调用，目前使用模拟数据
      setChartData(generateMockData(14))
      setModuleData(generateModuleData())
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [type, dateRange, logLevel, userFilter, moduleFilter])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs value={chartType} onValueChange={setChartType}>
        <TabsList>
          <TabsTrigger value="trend">趋势图</TabsTrigger>
          <TabsTrigger value="distribution">分布图</TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="trend" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>日志趋势分析</CardTitle>
            <CardDescription>最近14天的日志数量趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "总量",
                  color: "hsl(var(--chart-1))",
                },
                info: {
                  label: "信息",
                  color: "hsl(var(--blue-8))",
                },
                warning: {
                  label: "警告",
                  color: "hsl(var(--amber-8))",
                },
                error: {
                  label: "错误",
                  color: "hsl(var(--red-8))",
                },
                critical: {
                  label: "严重",
                  color: "hsl(var(--red-9))",
                },
                debug: {
                  label: "调试",
                  color: "hsl(var(--gray-8))",
                },
              }}
              className="aspect-[16/9]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return `${date.getMonth() + 1}/${date.getDate()}`
                    }}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="var(--color-total)" name="总量" strokeWidth={2} />
                  <Line type="monotone" dataKey="info" stroke="var(--color-info)" name="信息" />
                  <Line type="monotone" dataKey="warning" stroke="var(--color-warning)" name="警告" />
                  <Line type="monotone" dataKey="error" stroke="var(--color-error)" name="错误" />
                  <Line type="monotone" dataKey="critical" stroke="var(--color-critical)" name="严重" />
                  <Line type="monotone" dataKey="debug" stroke="var(--color-debug)" name="调试" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="distribution" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>日志来源分布</CardTitle>
            <CardDescription>按模块统计的日志数量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, "数量"]} />
                  <Legend />
                  <Bar dataKey="value" name="日志数量" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}
