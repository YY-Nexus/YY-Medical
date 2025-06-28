"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
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
import { Shield, Lock, AlertTriangle, CheckCircle, Database, RefreshCw } from "lucide-react"

// 模拟安全评分数据
const securityScores = [
  { category: "数据加密", score: 92, color: "#10b981" },
  { category: "访问控制", score: 85, color: "#3b82f6" },
  { category: "漏洞防护", score: 78, color: "#f59e0b" },
  { category: "合规性", score: 90, color: "#8b5cf6" },
  { category: "审计日志", score: 95, color: "#ec4899" },
]

// 模拟安全事件数据
const securityEvents = [
  { month: "1月", 登录失败: 45, 权限变更: 12, 数据访问: 78 },
  { month: "2月", 登录失败: 38, 权限变更: 15, 数据访问: 82 },
  { month: "3月", 登录失败: 52, 权限变更: 18, 数据访问: 85 },
  { month: "4月", 登录失败: 40, 权限变更: 10, 数据访问: 90 },
  { month: "5月", 登录失败: 35, 权限变更: 14, 数据访问: 88 },
  { month: "6月", 登录失败: 30, 权限变更: 16, 数据访问: 92 },
]

// 模拟数据加密状态
const encryptionStatus = [
  { name: "已加密", value: 85, color: "#10b981" },
  { name: "未加密", value: 15, color: "#f43f5e" },
]

// 模拟安全检查项
const securityChecks = [
  { id: 1, name: "强密码策略", status: "passed", description: "所有用户密码符合复杂度要求" },
  { id: 2, name: "双因素认证", status: "passed", description: "已为所有管理员启用双因素认证" },
  { id: 3, name: "数据备份", status: "passed", description: "自动备份已配置并正常运行" },
  { id: 4, name: "漏洞扫描", status: "warning", description: "上次扫描发现3个低风险漏洞" },
  { id: 5, name: "访问日志审计", status: "passed", description: "所有系统访问均被记录和监控" },
  { id: 6, name: "数据传输加密", status: "passed", description: "所有数据传输使用TLS 1.3加密" },
  { id: 7, name: "敏感数据识别", status: "warning", description: "部分数据未被正确标记为敏感信息" },
  { id: 8, name: "安全更新", status: "passed", description: "所有系统组件均为最新版本" },
]

export function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [lastScanTime, setLastScanTime] = useState("2025-04-28 14:30")

  // 计算总体安全评分
  const overallScore = Math.round(securityScores.reduce((sum, item) => sum + item.score, 0) / securityScores.length)

  // 模拟安全扫描
  const runSecurityScan = () => {
    // 更新最后扫描时间
    const now = new Date()
    setLastScanTime(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>安全状态</CardTitle>
          <Button variant="outline" size="sm" onClick={runSecurityScan}>
            <RefreshCw className="w-4 h-4 mr-2" />
            运行安全扫描
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">安全概览</TabsTrigger>
            <TabsTrigger value="encryption">数据加密</TabsTrigger>
            <TabsTrigger value="checks">安全检查</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">总体安全评分</div>
                  <div className="text-4xl font-bold mb-2">{overallScore}</div>
                  <Progress value={overallScore} className="w-full h-2" />
                  <div className="text-xs text-muted-foreground mt-2">上次扫描: {lastScanTime}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="font-medium">活跃用户</div>
                      <div className="text-sm text-muted-foreground">42 名用户</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Lock className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">访问控制</div>
                      <div className="text-sm text-muted-foreground">12 个角色</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="font-medium">安全警报</div>
                      <div className="text-sm text-muted-foreground">2 ��待处理</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Database className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium">数据量</div>
                      <div className="text-sm text-muted-foreground">1.2 TB</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">安全评分详情</h3>
                <div className="space-y-3">
                  {securityScores.map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.category}</span>
                        <span className="text-sm font-medium">{item.score}</span>
                      </div>
                      <Progress value={item.score} className="h-2" style={{ backgroundColor: item.color + "40" }}>
                        <div className="h-full" style={{ backgroundColor: item.color, width: `${item.score}%` }} />
                      </Progress>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">安全事件趋势</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityEvents} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="登录失败" stroke="#ef4444" />
                    <Line type="monotone" dataKey="权限变更" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="数据访问" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="encryption" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">数据加密状态</h3>
                <div className="h-60 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={encryptionStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {encryptionStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">加密详情</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-medium">患者个人信息</div>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm text-muted-foreground">AES-256 加密</span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-medium">医疗记录</div>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm text-muted-foreground">AES-256 加密</span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-medium">诊断图像</div>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm text-muted-foreground">AES-256 加密</span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-medium">系统日志</div>
                    <div className="flex items-center mt-1">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                      <span className="text-sm text-muted-foreground">部分未加密</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">加密策略</h3>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">传输加密</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    所有数据传输使用TLS 1.3加密，确保数据在网络传输过程中的安全。
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">存储加密</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    所有敏感数据使用AES-256算法进行加密存储，密钥使用HSM进行管理。
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">端到端加密</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    医生与患者之间的通信采用端到端加密，确保只有通信双方能够访问内容。
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="checks" className="pt-4">
            <div className="space-y-3">
              {securityChecks.map((check) => (
                <div key={check.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {check.status === "passed" ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                      )}
                      <span className="font-medium">{check.name}</span>
                    </div>
                    <Badge
                      variant={check.status === "passed" ? "default" : "outline"}
                      className={check.status === "passed" ? "bg-emerald-500" : "text-amber-500 border-amber-500"}
                    >
                      {check.status === "passed" ? "通过" : "警告"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 ml-7">{check.description}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button className="w-full">导出安全报告</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
