"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟会诊统计数据
const consultationStats = [
  { month: "1月", 心脏科: 25, 神经科: 18, 骨科: 15, 内科: 22, 其他: 10 },
  { month: "2月", 心脏科: 28, 神经科: 20, 骨科: 16, 内科: 24, 其他: 12 },
  { month: "3月", 心脏科: 32, 神经科: 22, 骨科: 18, 内科: 26, 其他: 14 },
  { month: "4月", 心脏科: 35, 神经科: 25, 骨科: 20, 内科: 28, 其他: 15 },
]

// 模拟科室分布
const departmentDistribution = [
  { name: "心脏科", value: 35, color: "#ef4444" },
  { name: "神经科", value: 25, color: "#3b82f6" },
  { name: "骨科", value: 20, color: "#f59e0b" },
  { name: "内科", value: 28, color: "#10b981" },
  { name: "其他", value: 15, color: "#8b5cf6" },
]

// 模拟医院分布
const hospitalDistribution = [
  { name: "中心医院", value: 45, color: "#10b981" },
  { name: "区域医院", value: 30, color: "#3b82f6" },
  { name: "社区医院", value: 15, color: "#f59e0b" },
  { name: "专科医院", value: 10, color: "#8b5cf6" },
]

// 模拟会诊结果
const consultationResults = [
  { name: "诊断确认", value: 40, color: "#10b981" },
  { name: "诊断修改", value: 25, color: "#3b82f6" },
  { name: "需进一步检查", value: 20, color: "#f59e0b" },
  { name: "转诊", value: 15, color: "#ef4444" },
]

export function TeleconsultationDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>远程会诊统计</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="departments">科室分析</TabsTrigger>
            <TabsTrigger value="results">会诊结果</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium mb-2">会诊数量趋势</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={consultationStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="心脏科" stroke="#ef4444" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="神经科" stroke="#3b82f6" />
                      <Line type="monotone" dataKey="骨科" stroke="#f59e0b" />
                      <Line type="monotone" dataKey="内科" stroke="#10b981" />
                      <Line type="monotone" dataKey="其他" stroke="#8b5cf6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">医院分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={hospitalDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {hospitalDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-emerald-500">123</div>
                <div className="text-sm text-muted-foreground">总会诊次数</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-500">42</div>
                <div className="text-sm text-muted-foreground">参与医生</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500">4</div>
                <div className="text-sm text-muted-foreground">合作医院</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-purple-500">85%</div>
                <div className="text-sm text-muted-foreground">诊断一致率</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">科室分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">科室会诊数量</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="会诊数量">
                        {departmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">科室会诊详情</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        科室
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        会诊次数
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        参与医生
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        平均时长
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        诊断一致率
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">心脏科</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">35</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">12</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">45分钟</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">92%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">神经科</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">25</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">8</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">55分钟</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">88%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">骨科</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">20</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">6</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">40分钟</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">90%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">内科</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">28</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">10</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">50分钟</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">85%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">其他</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">15</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">6</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">35分钟</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">会诊结果分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={consultationResults}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {consultationResults.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">会诊效果评估</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">诊断准确率</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">治疗方案优化率</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">患者满意度</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "88%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">医生满意度</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">会诊结果详情</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        结果类型
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        数量
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        占比
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        主要科室
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">诊断确认</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">40</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">40%</td>
                      <td className="px-4 py-3 whitespace-nowrap">心脏科, 内科</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">诊断修改</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">25</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">25%</td>
                      <td className="px-4 py-3 whitespace-nowrap">神经科, 内科</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">需进一步检查</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">20</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">20%</td>
                      <td className="px-4 py-3 whitespace-nowrap">骨科, 神经科</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">转诊</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">15</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">15%</td>
                      <td className="px-4 py-3 whitespace-nowrap">心脏科, 神经科</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
