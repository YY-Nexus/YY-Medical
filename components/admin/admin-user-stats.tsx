"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// 模拟用户增长数据
const userGrowthData = [
  { month: "1月", users: 120 },
  { month: "2月", users: 180 },
  { month: "3月", users: 250 },
  { month: "4月", users: 310 },
  { month: "5月", users: 410 },
  { month: "6月", users: 520 },
  { month: "7月", users: 620 },
  { month: "8月", users: 750 },
  { month: "9月", users: 830 },
  { month: "10月", users: 940 },
  { month: "11月", users: 1050 },
  { month: "12月", users: 1256 },
]

// 模拟用户角色分布
const userRoleData = [
  { name: "医生", value: 520, color: "#8884d8" },
  { name: "研究员", value: 320, color: "#82ca9d" },
  { name: "管理员", value: 120, color: "#ffc658" },
  { name: "患者", value: 296, color: "#ff8042" },
]

// 模拟用户活跃度数据
const userActivityData = [
  { day: "周一", active: 420, inactive: 180 },
  { day: "周二", active: 460, inactive: 160 },
  { day: "周三", active: 510, inactive: 140 },
  { day: "周四", active: 530, inactive: 120 },
  { day: "周五", active: 580, inactive: 100 },
  { day: "周六", active: 320, inactive: 280 },
  { day: "周日", active: 280, inactive: 320 },
]

// 模拟用户地区分布
const userRegionData = [
  { name: "华东", value: 420, color: "#8884d8" },
  { name: "华北", value: 320, color: "#82ca9d" },
  { name: "华南", value: 280, color: "#ffc658" },
  { name: "西南", value: 120, color: "#ff8042" },
  { name: "西北", value: 80, color: "#0088fe" },
  { name: "东北", value: 36, color: "#00C49F" },
]

export function AdminUserStats() {
  const [activeTab, setActiveTab] = useState("growth")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="growth" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">用户增长</TabsTrigger>
          <TabsTrigger value="roles">角色分布</TabsTrigger>
          <TabsTrigger value="activity">活跃度</TabsTrigger>
          <TabsTrigger value="region">地区分布</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="pt-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userGrowthData}
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
                <Bar dataKey="users" fill="#8884d8" name="用户数量" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,256</div>
                <p className="text-xs text-muted-foreground">较上月增长 19.6%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">月均增长率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.4%</div>
                <p className="text-xs text-muted-foreground">过去12个月平均</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">预计下月用户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,380</div>
                <p className="text-xs text-muted-foreground">基于当前增长趋势</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} 用户`, "数量"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>角色分布分析</CardTitle>
                  <CardDescription>系统中各角色用户的分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userRoleData.map((role) => (
                      <div key={role.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: role.color }} />
                          <span>{role.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{role.value}</span>
                          <span className="text-xs text-muted-foreground">
                            {((role.value / 1256) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>角色权限管理</CardTitle>
                  <CardDescription>快速访问角色权限设置</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userRoleData.map((role) => (
                      <div key={role.name} className="flex items-center justify-between">
                        <span>{role.name}</span>
                        <a
                          href={`/admin/roles/${role.name.toLowerCase()}`}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          管理权限
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivityData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" stackId="a" fill="#82ca9d" name="活跃用户" />
                <Bar dataKey="inactive" stackId="a" fill="#ffc658" name="非活跃用户" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">日均活跃用户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">443</div>
                <p className="text-xs text-muted-foreground">占总用户的 35.3%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">周活跃率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">69.7%</div>
                <p className="text-xs text-muted-foreground">较上周增长 3.2%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">平均使用时长</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27分钟</div>
                <p className="text-xs text-muted-foreground">每次登录平均时长</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="region" className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRegionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRegionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} 用户`, "数量"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>地区分布分析</CardTitle>
                  <CardDescription>用户在不同地区的分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userRegionData.map((region) => (
                      <div key={region.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: region.color }} />
                          <span>{region.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{region.value}</span>
                          <span className="text-xs text-muted-foreground">
                            {((region.value / 1256) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>地区增长趋势</CardTitle>
                  <CardDescription>各地区用户增长情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userRegionData.map((region) => (
                      <div key={region.name} className="flex items-center justify-between">
                        <span>{region.name}</span>
                        <div className="flex items-center gap-1">
                          <span
                            className={
                              region.name === "华东" || region.name === "华北" || region.name === "华南"
                                ? "text-green-500"
                                : "text-amber-500"
                            }
                          >
                            {region.name === "华东" || region.name === "华北" || region.name === "华南" ? "+" : ""}
                            {region.name === "华东"
                              ? "32.5%"
                              : region.name === "华北"
                                ? "28.7%"
                                : region.name === "华南"
                                  ? "24.3%"
                                  : region.name === "西南"
                                    ? "15.2%"
                                    : region.name === "西北"
                                      ? "12.8%"
                                      : "8.5%"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
