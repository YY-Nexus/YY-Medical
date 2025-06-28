"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart as RechartsLineChart,
  Line,
} from "recharts"

// 模拟数据
const comparisonData = [
  { name: "肺炎", aiAccuracy: 92, humanAccuracy: 88 },
  { name: "肺结核", aiAccuracy: 89, humanAccuracy: 91 },
  { name: "肺癌", aiAccuracy: 87, humanAccuracy: 90 },
  { name: "慢性阻塞性肺疾病", aiAccuracy: 94, humanAccuracy: 89 },
  { name: "支气管炎", aiAccuracy: 91, humanAccuracy: 87 },
  { name: "胸腔积液", aiAccuracy: 95, humanAccuracy: 92 },
]

const timelineData = [
  { month: "1月", aiAccuracy: 85, humanAccuracy: 87 },
  { month: "2月", aiAccuracy: 87, humanAccuracy: 87 },
  { month: "3月", aiAccuracy: 89, humanAccuracy: 88 },
  { month: "4月", aiAccuracy: 90, humanAccuracy: 88 },
  { month: "5月", aiAccuracy: 91, humanAccuracy: 89 },
  { month: "6月", aiAccuracy: 93, humanAccuracy: 89 },
]

export function DiagnosisComparison() {
  const [selectedModel, setSelectedModel] = useState("model-1")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6-months")
  const [chartType, setChartType] = useState("bar")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>诊断比较分析</CardTitle>
          <CardDescription>比较AI诊断与人类医生诊断的准确率和效率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">AI模型</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="选择AI模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="model-1">肺部疾病诊断模型 v3.2</SelectItem>
                  <SelectItem value="model-2">综合诊断模型 v2.1</SelectItem>
                  <SelectItem value="model-3">专科诊断模型 v1.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">时间范围</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-month">最近1个月</SelectItem>
                  <SelectItem value="3-months">最近3个月</SelectItem>
                  <SelectItem value="6-months">最近6个月</SelectItem>
                  <SelectItem value="1-year">最近1年</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">图表类型</label>
              <div className="flex space-x-2">
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setChartType("bar")}
                >
                  <BarChart className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setChartType("line")}
                >
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setChartType("pie")}
                >
                  <PieChart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="by-disease">
            <TabsList className="mb-4">
              <TabsTrigger value="by-disease">按疾病类型</TabsTrigger>
              <TabsTrigger value="by-time">按时间趋势</TabsTrigger>
            </TabsList>

            <TabsContent value="by-disease">
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    aiAccuracy: {
                      label: "AI诊断准确率",
                      color: "hsl(var(--chart-1))",
                    },
                    humanAccuracy: {
                      label: "人类医生准确率",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "bar" ? (
                      <RechartsBarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="aiAccuracy" name="AI诊断准确率" fill="var(--color-aiAccuracy)" />
                        <Bar dataKey="humanAccuracy" name="人类医生准确率" fill="var(--color-humanAccuracy)" />
                      </RechartsBarChart>
                    ) : (
                      <RechartsLineChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="aiAccuracy"
                          name="AI诊断准确率"
                          stroke="var(--color-aiAccuracy)"
                        />
                        <Line
                          type="monotone"
                          dataKey="humanAccuracy"
                          name="人类医生准确率"
                          stroke="var(--color-humanAccuracy)"
                        />
                      </RechartsLineChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="by-time">
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    aiAccuracy: {
                      label: "AI诊断准确率",
                      color: "hsl(var(--chart-1))",
                    },
                    humanAccuracy: {
                      label: "人类医生准确率",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="aiAccuracy" name="AI诊断准确率" stroke="var(--color-aiAccuracy)" />
                      <Line
                        type="monotone"
                        dataKey="humanAccuracy"
                        name="人类医生准确率"
                        stroke="var(--color-humanAccuracy)"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">平均诊断准确率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">91.3%</div>
                <p className="text-sm text-gray-500">AI模型较人类医生高出2.1%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">平均诊断时间</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">8.2秒</div>
                <p className="text-sm text-gray-500">较人类医生快87%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">诊断一致率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">83.7%</div>
                <p className="text-sm text-gray-500">AI与人类医生诊断结果一致性</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>诊断差异分析</CardTitle>
          <CardDescription>分析AI与人类医生诊断结果存在差异的案例</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">在诊断结果存在差异的案例中，AI模型在以下疾病类型中表现更优：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>早期肺部感染（准确率高出8.3%）</li>
              <li>慢性阻塞性肺疾病（准确率高出5.1%）</li>
              <li>胸腔积液（准确率高出3.2%）</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">人类医生在以下疾病类型中表现更优：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>非典型肺癌表现（准确率高出4.7%）</li>
              <li>多种疾病共存情况（准确率高出6.2%）</li>
              <li>罕见肺部疾病（准确率高出9.5%）</li>
            </ul>
            <Button className="mt-4">查看详细差异报告</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
