"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Database, Server, ShieldAlert, Activity, Clock, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminSystemStatus } from "./admin-system-status"
import { AdminUserStats } from "./admin-user-stats"
import { AdminRecentActivities } from "./admin-recent-activities"
import { AdminResourceUsage } from "./admin-resource-usage"

// 模拟数据
const mockStats = {
  users: {
    total: 1256,
    active: 876,
    new: 34,
    growth: 5.2,
  },
  data: {
    storage: "1.2TB",
    databases: 5,
    backups: 12,
    growth: 8.7,
  },
  system: {
    uptime: "99.98%",
    services: 24,
    alerts: 2,
    performance: 92.5,
  },
  security: {
    threats: 0,
    vulnerabilities: 3,
    lastScan: "2025-05-14 08:30",
    score: 94,
  },
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="users">用户统计</TabsTrigger>
          <TabsTrigger value="resources">资源使用</TabsTrigger>
          <TabsTrigger value="activities">最近活动</TabsTrigger>
        </TabsList>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            导出报告
          </Button>
          <Button size="sm">系统诊断</Button>
        </div>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">用户总数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.users.total}</div>
              <p className="text-xs text-muted-foreground">活跃用户: {mockStats.users.active}</p>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>增长 {mockStats.users.growth}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">数据存储</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.data.storage}</div>
              <p className="text-xs text-muted-foreground">
                数据库: {mockStats.data.databases} | 备份: {mockStats.data.backups}
              </p>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>增长 {mockStats.data.growth}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">系统状态</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.system.uptime}</div>
              <p className="text-xs text-muted-foreground">
                服务: {mockStats.system.services} | 告警: {mockStats.system.alerts}
              </p>
              <div className="mt-2 flex items-center text-xs text-blue-500">
                <Activity className="mr-1 h-3 w-3" />
                <span>性能指数: {mockStats.system.performance}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">安全状况</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.security.score}</div>
              <p className="text-xs text-muted-foreground">
                威胁: {mockStats.security.threats} | 漏洞: {mockStats.security.vulnerabilities}
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Clock className="mr-1 h-3 w-3" />
                <span>最近扫描: {mockStats.security.lastScan}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>系统状态监控</CardTitle>
              <CardDescription>实时监控系统各项指标</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AdminSystemStatus />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
              <CardDescription>系统最近的操作和事件</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRecentActivities limit={5} />
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => setActiveTab("activities")}>
                查看全部活动
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>用户统计</CardTitle>
            <CardDescription>用户增长、活跃度和分布情况</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminUserStats />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="resources">
        <Card>
          <CardHeader>
            <CardTitle>资源使用情况</CardTitle>
            <CardDescription>系统资源使用和分配情况</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminResourceUsage />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activities">
        <Card>
          <CardHeader>
            <CardTitle>系统活动日志</CardTitle>
            <CardDescription>所有系统活动和操作记录</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRecentActivities limit={20} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
