"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  Bug,
  User,
  Shield,
  Database,
  Globe,
  Server,
  FileText,
  EyeOff,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

interface LogsListProps {
  type: string
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
  logLevel: string[]
  userFilter: string[]
  moduleFilter: string[]
  setSearchQuery: (query: string) => void
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void
  setLogLevel: (levels: string[]) => void
  setUserFilter: (users: string[]) => void
  setModuleFilter: (modules: string[]) => void
}

// 模拟的日志数据
const mockLogs = [
  {
    id: "log_1",
    timestamp: new Date(2023, 5, 15, 10, 30, 45),
    level: "error",
    message: "数据库连接失败",
    source: "database",
    details: "连接超时，请检查数据库配置",
    user: "系统",
    ipAddress: "192.168.1.1",
    userAgent: "Server/1.0",
  },
  {
    id: "log_2",
    timestamp: new Date(2023, 5, 15, 11, 20, 10),
    level: "info",
    message: "用户登录成功",
    source: "auth",
    details: "用户通过标准认证登录",
    user: "zhang.wei@example.com",
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 Chrome/91.0",
  },
  {
    id: "log_3",
    timestamp: new Date(2023, 5, 15, 12, 15, 30),
    level: "warning",
    message: "API请求失败重试",
    source: "api",
    details: "第三方服务暂时不可用，5秒后重试",
    user: "system_api",
    ipAddress: "10.0.0.5",
    userAgent: "API Client/2.1",
  },
  {
    id: "log_4",
    timestamp: new Date(2023, 5, 15, 14, 45, 22),
    level: "debug",
    message: "任务计划执行完成",
    source: "scheduler",
    details: "备份任务完成，用时43秒",
    user: "系统",
    ipAddress: "内部",
    userAgent: "Scheduler/1.0",
  },
  {
    id: "log_5",
    timestamp: new Date(2023, 5, 15, 16, 10, 5),
    level: "critical",
    message: "存储空间不足",
    source: "system",
    details: "主存储剩余空间低于10%",
    user: "系统",
    ipAddress: "内部",
    userAgent: "Monitor/1.0",
  },
  {
    id: "log_6",
    timestamp: new Date(2023, 5, 15, 17, 30, 15),
    level: "info",
    message: "患者记录更新",
    source: "medical_records",
    details: "更新患者治疗计划",
    user: "li.na@example.com",
    ipAddress: "203.0.113.101",
    userAgent: "Mozilla/5.0 Safari/605.1.15",
  },
]

// 日志级别图标映射
const levelIcons = {
  debug: <Bug className="h-4 w-4 text-gray-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  critical: <AlertCircle className="h-4 w-4 text-red-600" />,
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
}

// 日志源图标映射
const sourceIcons = {
  auth: <Shield className="h-4 w-4 text-purple-500" />,
  system: <Server className="h-4 w-4 text-gray-500" />,
  database: <Database className="h-4 w-4 text-blue-500" />,
  api: <Globe className="h-4 w-4 text-green-500" />,
  medical_records: <FileText className="h-4 w-4 text-teal-500" />,
  user: <User className="h-4 w-4 text-orange-500" />,
  security: <EyeOff className="h-4 w-4 text-red-500" />,
  scheduler: <Clock className="h-4 w-4 text-indigo-500" />,
}

export function LogsList({
  type,
  searchQuery,
  dateRange,
  logLevel,
  userFilter,
  moduleFilter,
  setSearchQuery,
  setDateRange,
  setLogLevel,
  setUserFilter,
  setModuleFilter,
}: LogsListProps) {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // 模拟加载日志数据
  useEffect(() => {
    setLoading(true)

    // 模拟API调用延迟
    const timer = setTimeout(() => {
      // 这里应该是真实的API调用，根据筛选条件获取日志
      // 目前使用模拟数据

      // 筛选日志
      let filteredLogs = [...mockLogs]

      // 根据类型筛选
      if (type !== "all") {
        const typeMap: Record<string, string[]> = {
          system: ["system", "scheduler"],
          security: ["auth", "security"],
          user: ["user"],
          api: ["api"],
          error: ["error", "critical"],
        }

        if (typeMap[type]) {
          filteredLogs = filteredLogs.filter(
            (log) =>
              typeMap[type].includes(log.source) || (type === "error" && ["error", "critical"].includes(log.level)),
          )
        }
      }

      // 根据搜索词筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredLogs = filteredLogs.filter(
          (log) =>
            log.message.toLowerCase().includes(query) ||
            log.details.toLowerCase().includes(query) ||
            log.user.toLowerCase().includes(query),
        )
      }

      // 根据日期范围筛选
      if (dateRange.from) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp >= dateRange.from)
      }

      if (dateRange.to) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp <= dateRange.to)
      }

      // 根据日志级别筛选
      if (logLevel.length > 0) {
        filteredLogs = filteredLogs.filter((log) => logLevel.includes(log.level))
      }

      // 根据用户筛选
      if (userFilter.length > 0) {
        filteredLogs = filteredLogs.filter((log) => userFilter.includes(log.user))
      }

      // 根据模块筛选
      if (moduleFilter.length > 0) {
        filteredLogs = filteredLogs.filter((log) => moduleFilter.includes(log.source))
      }

      setLogs(filteredLogs)
      setHasMore(filteredLogs.length >= 10)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [type, searchQuery, dateRange, logLevel, userFilter, moduleFilter, page])

  const formatDate = (date: Date) => {
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getLevelBadge = (level: string) => {
    const colorMap: Record<string, string> = {
      debug: "bg-gray-100 text-gray-800",
      info: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      critical: "bg-red-200 text-red-900",
      success: "bg-green-100 text-green-800",
    }

    return (
      <Badge className={`${colorMap[level] || ""} flex items-center gap-1`}>
        {levelIcons[level as keyof typeof levelIcons]}
        <span>
          {level === "debug"
            ? "调试"
            : level === "info"
              ? "信息"
              : level === "warning"
                ? "警告"
                : level === "error"
                  ? "错误"
                  : level === "critical"
                    ? "严重"
                    : level === "success"
                      ? "成功"
                      : level}
        </span>
      </Badge>
    )
  }

  // 加载中状态
  if (loading && page === 1) {
    return (
      <Card>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-8 w-32" />
            </div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/5" />
                </div>
              ))}
          </div>
        </div>
      </Card>
    )
  }

  // 无数据状态
  if (!loading && logs.length === 0) {
    return (
      <Card>
        <div className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无日志数据</h3>
          <p className="text-gray-500 mb-4">根据您的筛选条件未找到任何日志记录</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setDateRange({ from: undefined, to: undefined })
              setLogLevel([])
              setUserFilter([])
              setModuleFilter([])
            }}
          >
            清除筛选条件
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">时间</TableHead>
              <TableHead className="w-[100px]">级别</TableHead>
              <TableHead className="w-[120px]">来源</TableHead>
              <TableHead>消息</TableHead>
              <TableHead className="w-[150px]">用户</TableHead>
              <TableHead className="w-[120px]">IP地址</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{formatDate(log.timestamp)}</TableCell>
                <TableCell>{getLevelBadge(log.level)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {sourceIcons[log.source as keyof typeof sourceIcons] || (
                      <Server className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="text-sm">
                      {log.source === "auth"
                        ? "认证"
                        : log.source === "system"
                          ? "系统"
                          : log.source === "database"
                            ? "数据库"
                            : log.source === "api"
                              ? "API"
                              : log.source === "medical_records"
                                ? "病历"
                                : log.source === "user"
                                  ? "用户"
                                  : log.source === "security"
                                    ? "安全"
                                    : log.source === "scheduler"
                                      ? "计划任务"
                                      : log.source}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{log.message}</div>
                    <div className="text-sm text-gray-500 truncate max-w-sm">{log.details}</div>
                  </div>
                </TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {logs.length > 0 && (
        <div className="flex items-center justify-center p-4 border-t">
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore || loading}
            className="w-full max-w-xs"
          >
            {loading ? "加载中..." : hasMore ? "加载更多" : "已显示全部"}
          </Button>
        </div>
      )}
    </Card>
  )
}
