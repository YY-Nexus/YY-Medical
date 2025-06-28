"use client"

import { useState, useEffect } from "react"
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
import { Activity, Users, TrendingUp, RefreshCw } from "lucide-react"
import { useRealTimeData } from "@/hooks/use-real-time-data"
import { isClient } from "@/utils/client-utils"

// 初始数据
const initialVisitData = [
  { month: "1月", 门诊量: 1200, 住院量: 450, 手术量: 180 },
  { month: "2月", 门诊量: 1350, 住院量: 420, 手术量: 190 },
  { month: "3月", 门诊量: 1480, 住院量: 480, 手术量: 220 },
  { month: "4月", 门诊量: 1520, 住院量: 510, 手术量: 240 },
  { month: "5月", 门诊量: 1650, 住院量: 530, 手术量: 250 },
  { month: "6月", 门诊量: 1800, 住院量: 580, 手术量: 270 },
]

// 疾病分布数据
const diseaseDistributionData = [
  { name: "心血管疾病", value: 35 },
  { name: "呼吸系统疾病", value: 25 },
  { name: "消化系统疾病", value: 20 },
  { name: "内分泌疾病", value: 15 },
  { name: "其他", value: 5 },
]

// 饼图颜色
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AnalyticsDashboard({ onViewDetailedCharts }) {
  const [activeTab, setActiveTab] = useState("visit-stats")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isAutoRefresh, setIsAutoRefresh] = useState(false)

  // 使用自定义hook获取实时数据
  const {
    data: visitData,
    isLoading,
    refresh,
  } = useRealTimeData(
    initialVisitData,
    isAutoRefresh ? 10000 : null, // 如果启用自动刷新，则每10秒更新一次
  )

  // 手动刷新数据
  const handleRefresh = () => {
    refresh()
    setLastUpdated(new Date())
  }

  // 切换自动刷新
  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh)
  }

  // 当自动刷新状态改变时更新最后更新时间
  useEffect(() => {
    if (isClient && isAutoRefresh) {
      setLastUpdated(new Date())
    }
  }, [isAutoRefresh, visitData])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>医疗数据统计分析</CardTitle>
            <CardDescription>医疗服务量、疾病分布和患者人口统计数据分析</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">
              最后更新: {isClient ? lastUpdated.toLocaleTimeString() : "加载中..."}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoRefresh}
              className={isAutoRefresh ? "bg-green-50 text-green-700 border-green-200" : ""}
            >
              {isAutoRefresh ? "自动刷新中" : "自动刷新"}
            </Button>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日门诊量</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 100) + 150}</div>
              <p className="text-xs text-muted-foreground">
                较昨日 <span className="text-green-500">↑ 12%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日住院量</CardTitle>
              <Users className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 30) + 50}</div>
              <p className="text-xs text-muted-foreground">
                较昨日 <span className="text-amber-500">↑ 3%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日手术量</CardTitle>
              <Activity className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 15) + 20}</div>
              <p className="text-xs text-muted-foreground">
                较昨日 <span className="text-red-500">↓ 5%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均住院日</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(Math.random() * 2 + 8).toFixed(1)} <span className="text-sm font-normal">天</span>
              </div>
              <p className="text-xs text-muted-foreground">
                较上月 <span className="text-green-500">↓ 0.3天</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="visit-stats">医疗服务量趋势</TabsTrigger>
            <TabsTrigger value="disease-distribution">疾病分布</TabsTrigger>
            <TabsTrigger value="demographics">患者人口统计</TabsTrigger>
          </TabsList>

          <TabsContent value="visit-stats" className="space-y-4">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  门诊量: {
                    label: "门诊量",
                    color: "hsl(var(--chart-1))",
                  },
                  住院量: {
                    label: "住院量",
                    color: "hsl(var(--chart-2))",
                  },
                  手术量: {
                    label: "手术量",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={visitData}
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
                      dataKey="门诊量"
                      stroke="var(--color-门诊量)"
                      name="门诊量"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="住院量" stroke="var(--color-住院量)" name="住院量" />
                    <Line type="monotone" dataKey="手术量" stroke="var(--color-手术量)" name="手术量" />
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
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  男性: {
                    label: "男性",
                    color: "hsl(var(--chart-1))",
                  },
                  女性: {
                    label: "女性",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { 年龄段: "0-18", 男性: 120, 女性: 110 },
                      { 年龄段: "19-35", 男性: 250, 女性: 280 },
                      { 年龄段: "36-50", 男性: 380, 女性: 340 },
                      { 年龄段: "51-65", 男性: 420, 女性: 380 },
                      { 年龄段: "66+", 男性: 280, 女性: 320 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="年龄段" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="男性" fill="var(--color-男性)" name="男性" />
                    <Bar dataKey="女性" fill="var(--color-女性)" name="女性" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// 默认导出组件
export default AnalyticsDashboard
