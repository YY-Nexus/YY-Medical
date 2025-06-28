"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

// 模拟数据
const statusData = [
  { name: "已验证", value: 540, color: "#4ade80" },
  { name: "待验证", value: 210, color: "#facc15" },
  { name: "验证失败", value: 45, color: "#f87171" },
  { name: "已过期", value: 25, color: "#94a3b8" },
]

const typeData = [
  { name: "医师执业证", value: 320 },
  { name: "护士执业证", value: 280 },
  { name: "药师执业证", value: 120 },
  { name: "医院资质", value: 60 },
  { name: "其他资质", value: 40 },
]

const trendData = [
  { month: "1月", verified: 42, pending: 18, failed: 4 },
  { month: "2月", verified: 48, pending: 16, failed: 3 },
  { month: "3月", verified: 55, pending: 20, failed: 5 },
  { month: "4月", verified: 62, pending: 15, failed: 2 },
  { month: "5月", verified: 70, pending: 22, failed: 6 },
  { month: "6月", verified: 85, pending: 25, failed: 4 },
]

export function CertificationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">资质验证仪表板</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新数据
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总资质数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">820</div>
            <p className="text-xs text-muted-foreground">较上月增长 +5.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已验证资质</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">540</div>
            <p className="text-xs text-muted-foreground">占比 65.8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">待验证资质</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210</div>
            <p className="text-xs text-muted-foreground">占比 25.6%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">验证失败</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">占比 5.5%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="types">资质类型</TabsTrigger>
          <TabsTrigger value="trends">验证趋势</TabsTrigger>
          <TabsTrigger value="providers">验证机构</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>资质状态分布</CardTitle>
                <CardDescription>各状态资质数量占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>最近验证活动</CardTitle>
                <CardDescription>最近10条验证记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">李医生 - 医师执业证</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "destructive"}>
                        {i % 3 === 0 ? "已验证" : i % 3 === 1 ? "待验证" : "验证失败"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="types">
          <Card>
            <CardHeader>
              <CardTitle>资质类型分布</CardTitle>
              <CardDescription>各类型资质数量统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="数量" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>验证趋势</CardTitle>
              <CardDescription>近6个月验证状态趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="verified" stroke="#4ade80" name="已验证" />
                    <Line type="monotone" dataKey="pending" stroke="#facc15" name="待验证" />
                    <Line type="monotone" dataKey="failed" stroke="#f87171" name="验证失败" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle>验证机构统计</CardTitle>
              <CardDescription>各验证机构处理资质数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: "国家医师资格认证中心", value: 320 },
                      { name: "卫健委资质验证平台", value: 280 },
                      { name: "医疗机构信息系统", value: 120 },
                      { name: "第三方验证服务A", value: 60 },
                      { name: "第三方验证服务B", value: 40 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="处理数量" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
