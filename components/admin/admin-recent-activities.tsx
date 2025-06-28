"use client"

import { useState } from "react"
import { Activity, User, Shield, Database, AlertTriangle, Server, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟活动数据
const mockActivities = [
  {
    id: 1,
    type: "user",
    action: "login",
    user: "张医生",
    userId: "user-001",
    timestamp: "2025-05-15 14:32:45",
    details: "从192.168.1.105登录系统",
    status: "success",
  },
  {
    id: 2,
    type: "admin",
    action: "update",
    user: "系统管理员",
    userId: "admin-001",
    timestamp: "2025-05-15 13:45:12",
    details: "更新系统配置：邮件服务器设置",
    status: "success",
  },
  {
    id: 3,
    type: "security",
    action: "alert",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 12:30:05",
    details: "检测到异常登录尝试，IP: 203.0.113.42",
    status: "warning",
  },
  {
    id: 4,
    type: "data",
    action: "backup",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 12:00:00",
    details: "自动数据库备份完成",
    status: "success",
  },
  {
    id: 5,
    type: "user",
    action: "create",
    user: "李管理员",
    userId: "admin-002",
    timestamp: "2025-05-15 11:23:18",
    details: "创建新用户：王医生",
    status: "success",
  },
  {
    id: 6,
    type: "system",
    action: "update",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 10:15:30",
    details: "系统更新至版本3.5.2",
    status: "success",
  },
  {
    id: 7,
    type: "security",
    action: "scan",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 09:00:00",
    details: "完成安全漏洞扫描，发现3个低危漏洞",
    status: "warning",
  },
  {
    id: 8,
    type: "data",
    action: "export",
    user: "张医生",
    userId: "user-001",
    timestamp: "2025-05-15 08:45:22",
    details: "导出患者数据报告",
    status: "success",
  },
  {
    id: 9,
    type: "user",
    action: "logout",
    user: "王研究员",
    userId: "user-002",
    timestamp: "2025-05-15 08:30:15",
    details: "用户登出系统",
    status: "success",
  },
  {
    id: 10,
    type: "system",
    action: "error",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 07:12:33",
    details: "数据库连接超时，自动重连成功",
    status: "error",
  },
  {
    id: 11,
    type: "admin",
    action: "permission",
    user: "超级管理员",
    userId: "admin-000",
    timestamp: "2025-05-15 06:50:19",
    details: "修改角色权限：研究员",
    status: "success",
  },
  {
    id: 12,
    type: "data",
    action: "import",
    user: "李研究员",
    userId: "user-003",
    timestamp: "2025-05-15 06:30:45",
    details: "导入研究数据集",
    status: "success",
  },
  {
    id: 13,
    type: "security",
    action: "block",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 05:15:10",
    details: "阻止可疑IP访问：198.51.100.23",
    status: "success",
  },
  {
    id: 14,
    type: "system",
    action: "restart",
    user: "系统管理员",
    userId: "admin-001",
    timestamp: "2025-05-15 04:00:00",
    details: "计划内系统维护重启",
    status: "success",
  },
  {
    id: 15,
    type: "user",
    action: "update",
    user: "张医生",
    userId: "user-001",
    timestamp: "2025-05-15 03:45:30",
    details: "更新个人资料",
    status: "success",
  },
  {
    id: 16,
    type: "admin",
    action: "config",
    user: "李管理员",
    userId: "admin-002",
    timestamp: "2025-05-15 02:30:15",
    details: "修改系统通知设置",
    status: "success",
  },
  {
    id: 17,
    type: "security",
    action: "alert",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 01:20:05",
    details: "多次密码错误，账户临时锁定：user-005",
    status: "warning",
  },
  {
    id: 18,
    type: "data",
    action: "cleanup",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 01:00:00",
    details: "自动清理临时文件，释放空间：1.2GB",
    status: "success",
  },
  {
    id: 19,
    type: "system",
    action: "monitor",
    user: "系统",
    userId: "system",
    timestamp: "2025-05-15 00:30:00",
    details: "系统资源使用率报告生成",
    status: "success",
  },
  {
    id: 20,
    type: "user",
    action: "reset",
    user: "系统管理员",
    userId: "admin-001",
    timestamp: "2025-05-15 00:15:45",
    details: "重置用户密码：user-008",
    status: "success",
  },
]

interface AdminRecentActivitiesProps {
  limit?: number
}

export function AdminRecentActivities({ limit }: AdminRecentActivitiesProps) {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 获取活动图标
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      case "security":
        return <AlertTriangle className="h-4 w-4" />
      case "data":
        return <Database className="h-4 w-4" />
      case "system":
        return <Server className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="mr-1 h-3 w-3" /> 成功
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> 警告
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="mr-1 h-3 w-3" /> 错误
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // 过滤活动
  const filteredActivities = mockActivities
    .filter((activity) => {
      if (filter === "all") return true
      return activity.type === filter
    })
    .filter((activity) => {
      if (!searchTerm) return true
      return (
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.timestamp.includes(searchTerm)
      )
    })
    .slice(0, limit || filteredActivities.length)

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="搜索活动..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="活动类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="user">用户活动</SelectItem>
              <SelectItem value="admin">管理活动</SelectItem>
              <SelectItem value="security">安全事件</SelectItem>
              <SelectItem value="data">数据操作</SelectItem>
              <SelectItem value="system">系统事件</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilter("all")
              setSearchTerm("")
            }}
          >
            重置筛选
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full 
              ${
                activity.type === "user"
                  ? "bg-blue-100"
                  : activity.type === "admin"
                    ? "bg-purple-100"
                    : activity.type === "security"
                      ? "bg-red-100"
                      : activity.type === "data"
                        ? "bg-green-100"
                        : "bg-gray-100"
              }`}
            >
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{activity.details}</p>
                {getStatusBadge(activity.status)}
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium text-gray-700">{activity.user}</span>
                <span className="mx-2">•</span>
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!limit && filteredActivities.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">没有找到匹配的活动记录</p>
          </div>
        </div>
      )}
    </div>
  )
}
