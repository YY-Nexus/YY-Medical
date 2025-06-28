"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

// 模拟API使用数据
const apiUsageData = [
  { date: "2023-01-01", calls: 1200, errors: 23, latency: 120 },
  { date: "2023-01-02", calls: 1300, errors: 18, latency: 115 },
  { date: "2023-01-03", calls: 1400, errors: 28, latency: 130 },
  { date: "2023-01-04", calls: 1100, errors: 15, latency: 110 },
  { date: "2023-01-05", calls: 1500, errors: 30, latency: 125 },
  { date: "2023-01-06", calls: 1700, errors: 25, latency: 118 },
  { date: "2023-01-07", calls: 1600, errors: 20, latency: 122 },
]

// 模拟端点数据
const endpointData = [
  { name: "/api/patients", calls: 450, errors: 12, latency: 135 },
  { name: "/api/diagnoses", calls: 380, errors: 8, latency: 142 },
  { name: "/api/auth", calls: 320, errors: 5, latency: 95 },
  { name: "/api/records", calls: 280, errors: 10, latency: 128 },
  { name: "/api/analytics", calls: 170, errors: 3, latency: 150 },
]

export function ApiUsageMonitorClient() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">API使用监控</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">过去24小时</SelectItem>
            <SelectItem value="7d">过去7天</SelectItem>
            <SelectItem value="30d">过去30天</SelectItem>
            <SelectItem value="90d">过去90天</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总API调用</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,800</div>
            <p className="text-xs text-muted-foreground">较上周增长 +12.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120ms</div>
            <p className="text-xs text-muted-foreground">较上周改善 -5.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">错误率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8%</div>
            <p className="text-xs text-muted-foreground">较上周增加 +0.3%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage">
        <TabsList>
          <TabsTrigger value="usage">使用趋势</TabsTrigger>
          <TabsTrigger value="endpoints">端点分析</TabsTrigger>
          <TabsTrigger value="errors">错误分析</TabsTrigger>
          <TabsTrigger value="latency">延迟分析</TabsTrigger>
        </TabsList>
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API调用趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calls" stroke="#8884d8" name="API调用数" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>端点使用情况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={endpointData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" fill="#8884d8" name="调用次数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>错误分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="errors" stroke="#ff0000" name="错误数" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="latency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>响应时间分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="latency" stroke="#82ca9d" name="响应时间(ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
