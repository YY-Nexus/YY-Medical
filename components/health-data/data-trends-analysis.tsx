"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, TrendingUp, Download, BarChart3 } from "lucide-react"

// 模拟血糖趋势数据
const bloodGlucoseData = [
  { date: "2023-05-01", fasting: 5.2, postprandial: 7.1 },
  { date: "2023-05-08", fasting: 5.4, postprandial: 7.3 },
  { date: "2023-05-15", fasting: 5.1, postprandial: 6.9 },
  { date: "2023-05-22", fasting: 5.3, postprandial: 7.2 },
  { date: "2023-05-29", fasting: 5.0, postprandial: 6.8 },
  { date: "2023-06-05", fasting: 5.2, postprandial: 7.0 },
]

// 模拟血压趋势数据
const bloodPressureData = [
  { date: "2023-05-01", systolic: 125, diastolic: 82 },
  { date: "2023-05-08", systolic: 128, diastolic: 84 },
  { date: "2023-05-15", systolic: 122, diastolic: 80 },
  { date: "2023-05-22", systolic: 126, diastolic: 83 },
  { date: "2023-05-29", systolic: 120, diastolic: 78 },
  { date: "2023-06-05", systolic: 124, diastolic: 81 },
]

// 模拟体重趋势数据
const weightData = [
  { date: "2023-05-01", weight: 68.5, bmi: 24.2 },
  { date: "2023-05-08", weight: 68.2, bmi: 24.1 },
  { date: "2023-05-15", weight: 67.8, bmi: 23.9 },
  { date: "2023-05-22", weight: 67.5, bmi: 23.8 },
  { date: "2023-05-29", weight: 67.2, bmi: 23.7 },
  { date: "2023-06-05", weight: 66.9, bmi: 23.6 },
]

export function DataTrendsAnalysis() {
  const [activeTab, setActiveTab] = useState("blood-glucose")
  const [timeRange, setTimeRange] = useState("1m")

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>健康数据趋势分析</CardTitle>
            <CardDescription>跟踪关键健康指标的变化趋势</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="选择时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1w">近1周</SelectItem>
                <SelectItem value="1m">近1月</SelectItem>
                <SelectItem value="3m">近3月</SelectItem>
                <SelectItem value="6m">近6月</SelectItem>
                <SelectItem value="1y">近1年</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blood-glucose">血糖趋势</TabsTrigger>
            <TabsTrigger value="blood-pressure">血压趋势</TabsTrigger>
            <TabsTrigger value="weight">体重趋势</TabsTrigger>
          </TabsList>

          <TabsContent value="blood-glucose" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  fasting: {
                    label: "空腹血糖 (mmol/L)",
                    color: "hsl(var(--chart-1))",
                  },
                  postprandial: {
                    label: "餐后血糖 (mmol/L)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bloodGlucoseData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[4, 8]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="fasting"
                      stroke="var(--color-fasting)"
                      name="空腹血糖 (mmol/L)"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="postprandial"
                      stroke="var(--color-postprandial)"
                      name="餐后血糖 (mmol/L)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">血糖控制状况</div>
                <div className="text-sm text-muted-foreground">空腹血糖平均值: 5.2 mmol/L</div>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <BarChart3 className="h-4 w-4" />
                详细分析
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="blood-pressure" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  systolic: {
                    label: "收缩压 (mmHg)",
                    color: "hsl(var(--chart-1))",
                  },
                  diastolic: {
                    label: "舒张压 (mmHg)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bloodPressureData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[70, 140]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="var(--color-systolic)"
                      name="收缩压 (mmHg)"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="diastolic" stroke="var(--color-diastolic)" name="舒张压 (mmHg)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">血压控制状况</div>
                <div className="text-sm text-muted-foreground">平均血压: 124/81 mmHg</div>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <BarChart3 className="h-4 w-4" />
                详细分析
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  weight: {
                    label: "体重 (kg)",
                    color: "hsl(var(--chart-1))",
                  },
                  bmi: {
                    label: "BMI",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" domain={[65, 70]} />
                    <YAxis yAxisId="right" orientation="right" domain={[22, 25]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="weight"
                      stroke="var(--color-weight)"
                      name="体重 (kg)"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="var(--color-bmi)" name="BMI" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">体重变化趋势</div>
                <div className="text-sm text-muted-foreground">近期减重: -1.6 kg</div>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <TrendingUp className="h-4 w-4" />
                详细分析
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
