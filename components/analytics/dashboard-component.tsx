"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowRight, BarChart2, LineChartIcon, PieChartIcon, GitCompare } from "lucide-react"

// 模拟数据
const performanceData = [
  { month: "1月", 患者满意度: 85, 医疗质量: 88 },
  { month: "2月", 患者满意度: 83, 医疗质量: 87 },
  { month: "3月", 患者满意度: 86, 医疗质量: 89 },
  { month: "4月", 患者满意度: 88, 医疗质量: 90 },
  { month: "5月", 患者满意度: 87, 医疗质量: 91 },
  { month: "6月", 患者满意度: 90, 医疗质量: 92 },
]

const departmentData = [
  { name: "内科", 患者数: 1200 },
  { name: "外科", 患者数: 900 },
  { name: "儿科", 患者数: 600 },
  { name: "妇产科", 患者数: 800 },
  { name: "神经科", 患者数: 500 },
  { name: "心脏科", 患者数: 700 },
]

interface DashboardProps {
  onViewDetailedCharts: () => void
  onViewAdvancedCharts: () => void
  onViewDataComparison?: () => void
}

export default function Dashboard({
  onViewDetailedCharts,
  onViewAdvancedCharts,
  onViewDataComparison,
}: DashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">医疗绩效指标</CardTitle>
            <CardDescription>过去6个月的关键绩效指标</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                患者满意度: {
                  label: "患者满意度",
                  color: "hsl(var(--chart-1))",
                },
                医疗质量: {
                  label: "医疗质量",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="患者满意度" stroke="var(--color-患者满意度)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="医疗质量" stroke="var(--color-医疗质量)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={onViewDetailedCharts}>
                查看详细数据
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">各科室患者分布</CardTitle>
            <CardDescription>本月各科室患者数量统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                患者数: {
                  label: "患者数",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="患者数" fill="var(--color-患者数)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={onViewAdvancedCharts}>
                查看高级图表
                <PieChartIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">数据分析工具</CardTitle>
          <CardDescription>选择合适的图表类型进行深入分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onViewDetailedCharts}>
              <LineChartIcon className="h-10 w-10 mb-2 text-blue-600" />
              <div className="text-sm font-medium">趋势分析</div>
              <div className="text-xs text-gray-500 mt-1">查看关键指标的历史趋势</div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onViewAdvancedCharts}>
              <PieChartIcon className="h-10 w-10 mb-2 text-green-600" />
              <div className="text-sm font-medium">分布分析</div>
              <div className="text-xs text-gray-500 mt-1">了解各类数据的分布情况</div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onViewAdvancedCharts}>
              <BarChart2 className="h-10 w-10 mb-2 text-purple-600" />
              <div className="text-sm font-medium">对比分析</div>
              <div className="text-xs text-gray-500 mt-1">比较不同维度的数据指标</div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onViewDataComparison}>
              <GitCompare className="h-10 w-10 mb-2 text-orange-600" />
              <div className="text-sm font-medium">时期对比</div>
              <div className="text-xs text-gray-500 mt-1">比较不同时期的数据变化</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
