"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Database, RefreshCw, FileText, Users, ArrowUpDown, CheckCircle, AlertTriangle } from "lucide-react"

// 模拟数据同步统计
const syncStats = [
  { month: "1月", 患者记录: 1250, 诊断报告: 850, 医嘱: 650, 检查结果: 950 },
  { month: "2月", 患者记录: 1320, 诊断报告: 920, 医嘱: 680, 检查结果: 1020 },
  { month: "3月", 患者记录: 1450, 诊断报告: 980, 医嘱: 720, 检查结果: 1100 },
  { month: "4月", 患者记录: 1580, 诊断报告: 1050, 医嘱: 780, 检查结果: 1180 },
]

// 模拟数据类型分布
const dataTypeDistribution = [
  { name: "患者基本信息", value: 25, color: "#10b981" },
  { name: "诊断报告", value: 20, color: "#3b82f6" },
  { name: "检查结果", value: 18, color: "#f59e0b" },
  { name: "医嘱", value: 15, color: "#8b5cf6" },
  { name: "用药记录", value: 12, color: "#ec4899" },
  { name: "手术记录", value: 10, color: "#ef4444" },
]

// 模拟系统集成状态
const systemIntegrations = [
  { id: 1, name: "中心医院HIS系统", status: "active", lastSync: "2025-04-28 14:30", recordCount: 25680 },
  { id: 2, name: "社区医疗中心EMR", status: "active", lastSync: "2025-04-28 13:45", recordCount: 12450 },
  { id: 3, name: "专科医院LIS系统", status: "warning", lastSync: "2025-04-28 10:15", recordCount: 8320 },
  { id: 4, name: "区域医疗平台", status: "active", lastSync: "2025-04-28 12:30", recordCount: 31250 },
  { id: 5, name: "医学影像PACS系统", status: "error", lastSync: "2025-04-27 16:45", recordCount: 5680 },
]

export function EHRDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [lastSyncTime, setLastSyncTime] = useState("2025-04-28 14:30")

  // 模拟数据同步
  const syncData = () => {
    // 更新最后同步时间
    const now = new Date()
    setLastSyncTime(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>电子病历集成状态</CardTitle>
          <Button variant="outline" size="sm" onClick={syncData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            同步数据
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="systems">系统集成</TabsTrigger>
            <TabsTrigger value="data">数据分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">总集成系统数</div>
                  <div className="text-4xl font-bold mb-2">5</div>
                  <div className="flex gap-2">
                    <Badge className="bg-emerald-500">3 正常</Badge>
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      1 警告
                    </Badge>
                    <Badge variant="outline" className="text-red-500 border-red-500">
                      1 错误
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">上次同步: {lastSyncTime}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Database className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="font-medium">总记录数</div>
                      <div className="text-sm text-muted-foreground">83,380 条</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">数据类型</div>
                      <div className="text-sm text-muted-foreground">6 种</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Users className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="font-medium">患者数量</div>
                      <div className="text-sm text-muted-foreground">12,450 名</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <ArrowUpDown className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium">今日同步</div>
                      <div className="text-sm text-muted-foreground">1,250 条</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">数据类型分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">数据同步趋势</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={syncStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="患者记录" stroke="#10b981" />
                    <Line type="monotone" dataKey="诊断报告" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="医嘱" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="检查结果" stroke="#8b5cf6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="systems" className="pt-4">
            <div className="space-y-3">
              {systemIntegrations.map((system) => (
                <div key={system.id} className="border rounded-lg overflow-hidden">
                  <div className="p-3 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-2">
                      {system.status === "active" ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : system.status === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium">{system.name}</div>
                        <div className="text-sm text-muted-foreground">上次同步: {system.lastSync}</div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 md:mt-0">
                      <div className="text-sm">
                        <span className="text-muted-foreground">记录数: </span>
                        <span className="font-medium">{system.recordCount.toLocaleString()}</span>
                      </div>
                      <Badge
                        variant={system.status === "active" ? "default" : "outline"}
                        className={
                          system.status === "active"
                            ? "bg-emerald-500"
                            : system.status === "warning"
                              ? "text-amber-500 border-amber-500"
                              : "text-red-500 border-red-500"
                        }
                      >
                        {system.status === "active" ? "正常" : system.status === "warning" ? "警告" : "错误"}
                      </Badge>
                      <Button size="sm">同步</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button className="w-full">添加新系统集成</Button>
            </div>
          </TabsContent>

          <TabsContent value="data" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={syncStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="患者记录" fill="#10b981" />
                  <Bar dataKey="诊断报告" fill="#3b82f6" />
                  <Bar dataKey="医嘱" fill="#f59e0b" />
                  <Bar dataKey="检查结果" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">数据质量</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">完整性</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">准确性</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "88%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">一致性</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">数据使用情况</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span>AI诊断模型</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span>医生查询</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span>患者访问</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span>研究分析</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
