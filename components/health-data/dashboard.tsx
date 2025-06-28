"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Heart, Thermometer, Droplets, Users, TrendingUp } from "lucide-react"

// 模拟健康数据
const vitalSignsData = [
  { month: "1月", heartRate: 72, bloodPressure: 120, temperature: 36.5, bloodOxygen: 98 },
  { month: "2月", heartRate: 75, bloodPressure: 122, temperature: 36.6, bloodOxygen: 97 },
  { month: "3月", heartRate: 71, bloodPressure: 118, temperature: 36.4, bloodOxygen: 99 },
  { month: "4月", heartRate: 73, bloodPressure: 121, temperature: 36.5, bloodOxygen: 98 },
  { month: "5月", heartRate: 74, bloodPressure: 123, temperature: 36.7, bloodOxygen: 97 },
  { month: "6月", heartRate: 70, bloodPressure: 119, temperature: 36.5, bloodOxygen: 98 },
]

// 模拟疾病分布数据
const diseaseDistributionData = [
  { name: "心血管疾病", value: 35 },
  { name: "呼吸系统疾病", value: 25 },
  { name: "消化系统疾病", value: 20 },
  { name: "内分泌疾病", value: 15 },
  { name: "其他", value: 5 },
]

// 模拟年龄分布数据
const ageDistributionData = [
  { age: "0-18", count: 120 },
  { age: "19-35", count: 250 },
  { age: "36-50", count: 380 },
  { age: "51-65", count: 420 },
  { age: "66+", count: 280 },
]

// 饼图颜色
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function HealthDataDashboard() {
  const [activeTab, setActiveTab] = useState("vital-signs")

  return (
    <Card>
      <CardHeader>
        <CardTitle>健康数据概览</CardTitle>
        <CardDescription>患者健康数据的统计分析和趋势可视化</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均心率</CardTitle>
              <Heart className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                72 <span className="text-sm font-normal">bpm</span>
              </div>
              <p className="text-xs text-muted-foreground">
                较上月 <span className="text-green-500">↓ 2.7%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均血压</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                120/80 <span className="text-sm font-normal">mmHg</span>
              </div>
              <p className="text-xs text-muted-foreground">
                较上月 <span className="text-green-500">↓ 1.6%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均体温</CardTitle>
              <Thermometer className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                36.5 <span className="text-sm font-normal">°C</span>
              </div>
              <p className="text-xs text-muted-foreground">
                较上月 <span className="text-muted-foreground">无变化</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均血氧</CardTitle>
              <Droplets className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                98 <span className="text-sm font-normal">%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                较上月 <span className="text-amber-500">↑ 1.0%</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="vital-signs">生命体征趋势</TabsTrigger>
            <TabsTrigger value="disease-distribution">疾病分布</TabsTrigger>
            <TabsTrigger value="demographics">人口统计</TabsTrigger>
          </TabsList>

          <TabsContent value="vital-signs" className="space-y-4">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  heartRate: {
                    label: "心率 (bpm)",
                    color: "hsl(var(--chart-1))",
                  },
                  bloodPressure: {
                    label: "收缩压 (mmHg)",
                    color: "hsl(var(--chart-2))",
                  },
                  temperature: {
                    label: "体温 (°C)",
                    color: "hsl(var(--chart-3))",
                  },
                  bloodOxygen: {
                    label: "血氧 (%)",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={vitalSignsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      stroke="var(--color-heartRate)"
                      name="心率 (bpm)"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bloodPressure"
                      stroke="var(--color-bloodPressure)"
                      name="收缩压 (mmHg)"
                    />
                    <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" name="体温 (°C)" />
                    <Line type="monotone" dataKey="bloodOxygen" stroke="var(--color-bloodOxygen)" name="血氧 (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="disease-distribution">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">疾病分布</CardTitle>
                  <CardDescription>按疾病类型统计的患者分布</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diseaseDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {diseaseDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "比例"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">疾病分布详情</CardTitle>
                  <CardDescription>各类疾病的患者数量和占比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {diseaseDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.value}% 的患者</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          查看详情
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">年龄分布</CardTitle>
                  <CardDescription>按年龄段统计的患者分布</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      count: {
                        label: "患者数量",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={ageDistributionData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="count" fill="var(--color-count)" name="患者数量" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">人口统计分析</CardTitle>
                  <CardDescription>患者人口统计学特征</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">总患者数</span>
                      </div>
                      <span className="font-medium">1,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 mr-2 text-muted-foreground"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-sm">男性比例</span>
                      </div>
                      <span className="font-medium">48%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 mr-2 text-muted-foreground"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-sm">女性比例</span>
                      </div>
                      <span className="font-medium">52%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">平均年龄</span>
                      </div>
                      <span className="font-medium">42.5 岁</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">新增患者 (本月)</span>
                      </div>
                      <span className="font-medium">+85</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
