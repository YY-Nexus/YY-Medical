"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  RefreshCw,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"

// 模拟同步数据
const syncHistory = [
  {
    id: 1,
    startTime: "2025-05-19 08:00:00",
    endTime: "2025-05-19 08:15:23",
    status: "success",
    records: 1250,
    errors: 0,
    system: "中心医院HIS系统",
  },
  {
    id: 2,
    startTime: "2025-05-19 04:00:00",
    endTime: "2025-05-19 04:12:45",
    status: "success",
    records: 980,
    errors: 0,
    system: "中心医院HIS系统",
  },
  {
    id: 3,
    startTime: "2025-05-19 00:00:00",
    endTime: "2025-05-19 00:18:12",
    status: "warning",
    records: 1120,
    errors: 23,
    system: "中心医院HIS系统",
  },
  {
    id: 4,
    startTime: "2025-05-18 20:00:00",
    endTime: "2025-05-18 20:14:56",
    status: "success",
    records: 1050,
    errors: 0,
    system: "中心医院HIS系统",
  },
  {
    id: 5,
    startTime: "2025-05-18 16:00:00",
    endTime: "2025-05-18 16:22:31",
    status: "error",
    records: 850,
    errors: 142,
    system: "中心医院HIS系统",
  },
]

// 模拟同步统计数据
const syncStats = [
  { date: "05-13", records: 4250, errors: 23 },
  { date: "05-14", records: 3980, errors: 15 },
  { date: "05-15", records: 4120, errors: 18 },
  { date: "05-16", records: 4350, errors: 12 },
  { date: "05-17", records: 3850, errors: 8 },
  { date: "05-18", records: 4050, errors: 165 },
  { date: "05-19", records: 2230, errors: 23 },
]

// 模拟错误类型分布
const errorTypes = [
  { name: "字段映射错误", value: 45, color: "#ff4d4f" },
  { name: "网络连接超时", value: 25, color: "#faad14" },
  { name: "数据格式不兼容", value: 18, color: "#1890ff" },
  { name: "权限验证失败", value: 12, color: "#722ed1" },
]

// 模拟当前同步任务
const currentSync = {
  system: "中心医院HIS系统",
  startTime: "2025-05-19 12:00:00",
  elapsed: "00:08:45",
  progress: 65,
  processed: 820,
  total: 1250,
  errors: 2,
  status: "running", // running, paused, completed, error
}

export default function EHRSyncClient() {
  const router = useRouter()
  const [activeSystem, setActiveSystem] = useState("all")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sync" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" onClick={() => router.push("/ehr-integration")}>
            集成概览
          </TabsTrigger>
          <TabsTrigger value="mapping" onClick={() => router.push("/ehr-integration/mapping")}>
            数据映射
          </TabsTrigger>
          <TabsTrigger value="sync" onClick={() => router.push("/ehr-integration/sync")}>
            同步状态
          </TabsTrigger>
          <TabsTrigger value="connections" onClick={() => router.push("/ehr-integration/connections")}>
            系统连接
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">数据同步状态</h2>
          <p className="text-muted-foreground">监控和管理电子病历系统与平台之间的数据同步状态</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            计划同步
          </Button>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            立即同步
          </Button>
        </div>
      </div>

      {/* 当前同步状态 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>当前同步任务</CardTitle>
        </CardHeader>
        <CardContent>
          {currentSync.status === "running" || currentSync.status === "paused" ? (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">{currentSync.system}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>开始时间: {currentSync.startTime}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>已运行: {currentSync.elapsed}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {currentSync.status === "running" ? (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-2" />
                      暂停
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      继续
                    </Button>
                  )}
                  <Button variant="destructive" size="sm">
                    <XCircle className="w-4 h-4 mr-2" />
                    取消
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>进度: {currentSync.progress}%</span>
                  <span>
                    {currentSync.processed} / {currentSync.total} 条记录
                  </span>
                </div>
                <Progress value={currentSync.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm">已处理记录</span>
                  <span className="font-medium">{currentSync.processed}</span>
                </div>
                <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm">总记录数</span>
                  <span className="font-medium">{currentSync.total}</span>
                </div>
                <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm">错误数</span>
                  <span className="font-medium text-red-500">{currentSync.errors}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">没有正在进行的同步任务</h3>
              <p className="text-muted-foreground mb-4">上次同步完成于 2025-05-19 08:15:23</p>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                开始新同步
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 同步历史 */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>同步历史记录</CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="all" onValueChange={setActiveSystem}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择系统" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有系统</SelectItem>
                <SelectItem value="his">中心医院HIS系统</SelectItem>
                <SelectItem value="emr">社区医疗中心EMR</SelectItem>
                <SelectItem value="lis">专科医院LIS系统</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    开始时间
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    结束时间
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    系统
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    记录数
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    错误数
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {syncHistory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 whitespace-nowrap">{item.startTime}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.endTime}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.system}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">{item.records}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {item.errors > 0 ? (
                        <span className="text-red-500">{item.errors}</span>
                      ) : (
                        <span>{item.errors}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {item.status === "success" ? (
                        <Badge className="bg-green-500">成功</Badge>
                      ) : item.status === "warning" ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          警告
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500 border-red-500">
                          错误
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm">
                        查看详情
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 同步统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>同步记录统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={syncStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="records" stroke="#10b981" name="同步记录数" />
                  <Line type="monotone" dataKey="errors" stroke="#ef4444" name="错误数" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>错误类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {errorTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.push("/ehr-integration")}>
          返回概览
        </Button>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新数据
        </Button>
      </div>
    </div>
  )
}
