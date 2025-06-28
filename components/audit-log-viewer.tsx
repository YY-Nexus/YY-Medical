"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, User, FileText, Lock, Settings, Clock } from "lucide-react"

// 模拟审计日志数据
const auditLogs = [
  {
    id: "log-001",
    timestamp: "2025-04-28 14:35:22",
    user: "张医生",
    action: "查看患者记录",
    resource: "患者ID: P12345",
    status: "success",
    details: "查看了患者张明的完整医疗记录",
    ip: "192.168.1.101",
  },
  {
    id: "log-002",
    timestamp: "2025-04-28 14:30:15",
    user: "李护士",
    action: "更新患者信息",
    resource: "患者ID: P12345",
    status: "success",
    details: "更新了患者张明的联系电话",
    ip: "192.168.1.102",
  },
  {
    id: "log-003",
    timestamp: "2025-04-28 14:15:08",
    user: "王管理",
    action: "修改用户权限",
    resource: "用户ID: user-005",
    status: "success",
    details: '将用户刘医生的角色从"实习医生"更改为"医生"',
    ip: "192.168.1.100",
  },
  {
    id: "log-004",
    timestamp: "2025-04-28 13:45:30",
    user: "未知用户",
    action: "登录尝试",
    resource: "系统登录",
    status: "failure",
    details: "使用无效凭据尝试登录系统",
    ip: "203.0.113.42",
  },
  {
    id: "log-005",
    timestamp: "2025-04-28 13:30:12",
    user: "系统",
    action: "数据备份",
    resource: "患者数据库",
    status: "success",
    details: "完成每日自动备份",
    ip: "192.168.1.5",
  },
  {
    id: "log-006",
    timestamp: "2025-04-28 12:15:45",
    user: "张医生",
    action: "创建诊断报告",
    resource: "患者ID: P12346",
    status: "success",
    details: "为患者李华创建了新的诊断报告",
    ip: "192.168.1.101",
  },
  {
    id: "log-007",
    timestamp: "2025-04-28 11:05:33",
    user: "赵患者",
    action: "查看个人记录",
    resource: "患者ID: P12347",
    status: "success",
    details: "查看了自己的医疗记录",
    ip: "203.0.113.25",
  },
  {
    id: "log-008",
    timestamp: "2025-04-28 10:30:18",
    user: "王管理",
    action: "系统配置更改",
    resource: "安全设置",
    status: "success",
    details: "更新了密码策略，要求最小长度为10个字符",
    ip: "192.168.1.100",
  },
]

export function AuditLogViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedLog, setExpandedLog] = useState(null)

  // 过滤日志
  const filteredLogs = auditLogs.filter((log) => {
    // 搜索过滤
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())

    // 动作过滤
    const matchesAction = actionFilter === "all" || log.action === actionFilter

    // 状态过滤
    const matchesStatus = statusFilter === "all" || log.status === statusFilter

    return matchesSearch && matchesAction && matchesStatus
  })

  // 切换日志详情展开/折叠
  const toggleLogDetails = (logId) => {
    if (expandedLog === logId) {
      setExpandedLog(null)
    } else {
      setExpandedLog(logId)
    }
  }

  // 获取������图标
  const getActionIcon = (action) => {
    switch (action) {
      case "查看患者记录":
      case "查看个人记录":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "更新患者信息":
      case "创建诊断报告":
        return <FileText className="w-4 h-4 text-emerald-500" />
      case "修改用户权限":
      case "系统配置更改":
        return <Settings className="w-4 h-4 text-purple-500" />
      case "登录尝试":
        return <Lock className="w-4 h-4 text-amber-500" />
      case "数据备份":
        return <FileText className="w-4 h-4 text-gray-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>审计日志</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出日志
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索日志..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="动作类型" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有动作</SelectItem>
                <SelectItem value="查看患者记录">查看患者记录</SelectItem>
                <SelectItem value="更新患者信息">更新患者信息</SelectItem>
                <SelectItem value="修改用户权限">修改用户权限</SelectItem>
                <SelectItem value="登录尝试">登录尝试</SelectItem>
                <SelectItem value="数据备份">数据备份</SelectItem>
                <SelectItem value="创建诊断报告">创建诊断报告</SelectItem>
                <SelectItem value="查看个人记录">查看个人记录</SelectItem>
                <SelectItem value="系统配置更改">系统配置更改</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="状态" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="success">成功</SelectItem>
                <SelectItem value="failure">失败</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div key={log.id} className="border rounded-lg overflow-hidden">
              <div
                className="p-3 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-muted/50"
                onClick={() => toggleLogDetails(log.id)}
              >
                <div className="flex items-center gap-2">
                  {getActionIcon(log.action)}
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-muted-foreground">{log.resource}</div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 md:mt-0">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{log.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{log.timestamp}</span>
                  </div>
                  <Badge
                    variant={log.status === "success" ? "default" : "outline"}
                    className={log.status === "success" ? "bg-emerald-500" : "text-red-500 border-red-500"}
                  >
                    {log.status === "success" ? "成功" : "失败"}
                  </Badge>
                </div>
              </div>

              {expandedLog === log.id && (
                <div className="p-3 bg-muted border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm font-medium">详细信息</div>
                      <div className="text-sm">{log.details}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">IP地址</div>
                      <div className="text-sm">{log.ip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
