"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react"

// 模拟认证状态数据
const certificationStatusData = [
  { name: "已验证", value: 68, color: "#4ade80" },
  { name: "待审核", value: 15, color: "#facc15" },
  { name: "已拒绝", value: 8, color: "#f87171" },
  { name: "已过期", value: 9, color: "#94a3b8" },
]

// 模拟认证类型数据
const certificationTypeData = [
  { name: "医师执业证书", verified: 42, pending: 8, rejected: 3 },
  { name: "专科医师资格证", verified: 35, pending: 5, rejected: 2 },
  { name: "研究员证书", verified: 15, pending: 2, rejected: 1 },
  { name: "其他资质证书", verified: 10, pending: 3, rejected: 2 },
]

// 模拟每月认证数据
const monthlyCertificationData = [
  { month: "1月", count: 12 },
  { month: "2月", count: 15 },
  { month: "3月", count: 18 },
  { month: "4月", count: 14 },
  { month: "5月", count: 22 },
  { month: "6月", count: 26 },
  { month: "7月", count: 32 },
  { month: "8月", count: 28 },
  { month: "9月", count: 24 },
  { month: "10月", count: 30 },
  { month: "11月", count: 35 },
  { month: "12月", count: 40 },
]

export function CertificationDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总认证数</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">296</div>
            <p className="text-xs text-muted-foreground">来自125位医生和研究员</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>较上月增长 12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已验证认证</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">202</div>
            <p className="text-xs text-muted-foreground">占总认证的 68.2%</p>
            <div className="mt-2">
              <Progress value={68.2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审核认证</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">平均审核时间: 1.5天</p>
            <div className="mt-2">
              <Progress value={15.2} className="h-2 bg-yellow-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">问题认证</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                已拒绝: 24
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                已过期: 25
              </Badge>
            </div>
            <div className="mt-2">
              <Progress value={16.6} className="h-2 bg-red-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>认证状态分布</CardTitle>
            <CardDescription>各状态认证数量占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={certificationStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {certificationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} 个认证`, "数量"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>认证类型分布</CardTitle>
            <CardDescription>各类型认证数量及状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={certificationTypeData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="verified" name="已验证" fill="#4ade80" stackId="a" />
                  <Bar dataKey="pending" name="待审核" fill="#facc15" stackId="a" />
                  <Bar dataKey="rejected" name="已拒绝" fill="#f87171" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>月度认证趋势</CardTitle>
          <CardDescription>过去12个月认证数量变化</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCertificationData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="认证数量" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
