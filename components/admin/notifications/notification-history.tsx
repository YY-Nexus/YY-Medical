"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Eye, RefreshCw, Download } from "lucide-react"

// 模拟通知历史数据
const notificationHistory = [
  {
    id: 1,
    recipient: "张医生",
    subject: "新患者注册通知",
    channel: "email",
    status: "delivered",
    sentAt: "2023-05-15T08:30:00Z",
    readAt: "2023-05-15T09:15:00Z",
  },
  {
    id: 2,
    recipient: "李护士",
    subject: "患者预约提醒",
    channel: "sms",
    status: "delivered",
    sentAt: "2023-05-15T09:00:00Z",
    readAt: null,
  },
  {
    id: 3,
    recipient: "王管理员",
    subject: "系统性能警告",
    channel: "email",
    status: "delivered",
    sentAt: "2023-05-15T10:15:00Z",
    readAt: "2023-05-15T10:20:00Z",
  },
  {
    id: 4,
    recipient: "赵医生",
    subject: "资质验证失败",
    channel: "push",
    status: "failed",
    sentAt: "2023-05-15T11:30:00Z",
    readAt: null,
  },
  {
    id: 5,
    recipient: "系统管理员",
    subject: "数据备份完成",
    channel: "email",
    status: "delivered",
    sentAt: "2023-05-15T12:45:00Z",
    readAt: "2023-05-15T14:10:00Z",
  },
  {
    id: 6,
    recipient: "刘医生",
    subject: "患者检查结果通知",
    channel: "sms",
    status: "pending",
    sentAt: "2023-05-15T13:20:00Z",
    readAt: null,
  },
  {
    id: 7,
    recipient: "陈护士",
    subject: "排班变更通知",
    channel: "email",
    status: "delivered",
    sentAt: "2023-05-15T14:00:00Z",
    readAt: null,
  },
  {
    id: 8,
    recipient: "黄医生",
    subject: "会议提醒",
    channel: "push",
    status: "delivered",
    sentAt: "2023-05-15T15:30:00Z",
    readAt: "2023-05-15T15:35:00Z",
  },
]

export function NotificationHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredNotifications = notificationHistory.filter((notification) => {
    const matchesSearch =
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.subject.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || notification.status === statusFilter

    const matchesChannel = channelFilter === "all" || notification.channel === channelFilter

    return matchesSearch && matchesStatus && matchesChannel
  })

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification)
    setIsDialogOpen(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "未读"
    const date = new Date(dateString)
    return date.toLocaleString("zh-CN")
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return <Badge variant="default">已送达</Badge>
      case "failed":
        return <Badge variant="destructive">失败</Badge>
      case "pending":
        return <Badge variant="secondary">处理中</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getChannelBadge = (channel) => {
    switch (channel) {
      case "email":
        return <Badge variant="outline">邮件</Badge>
      case "sms":
        return <Badge variant="outline">短信</Badge>
      case "push":
        return <Badge variant="outline">推送</Badge>
      default:
        return <Badge variant="outline">其他</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>通知历史</CardTitle>
          <CardDescription>查看系统发送的所有通知记录</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索收件人或主题..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="delivered">已送达</SelectItem>
                <SelectItem value="failed">失败</SelectItem>
                <SelectItem value="pending">处理中</SelectItem>
              </SelectContent>
            </Select>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="渠道筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有渠道</SelectItem>
                <SelectItem value="email">邮件</SelectItem>
                <SelectItem value="sms">短信</SelectItem>
                <SelectItem value="push">推送</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>收件人</TableHead>
              <TableHead>主题</TableHead>
              <TableHead>渠道</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>发送时间</TableHead>
              <TableHead>阅读时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="font-medium">{notification.recipient}</TableCell>
                <TableCell>{notification.subject}</TableCell>
                <TableCell>{getChannelBadge(notification.channel)}</TableCell>
                <TableCell>{getStatusBadge(notification.status)}</TableCell>
                <TableCell>{formatDate(notification.sentAt)}</TableCell>
                <TableCell>{formatDate(notification.readAt)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleViewDetails(notification)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>通知详情</DialogTitle>
              <DialogDescription>查看通知的详细信息</DialogDescription>
            </DialogHeader>
            {selectedNotification && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">收件人:</div>
                  <div className="col-span-2">{selectedNotification.recipient}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">主题:</div>
                  <div className="col-span-2">{selectedNotification.subject}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">渠道:</div>
                  <div className="col-span-2">{getChannelBadge(selectedNotification.channel)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">状态:</div>
                  <div className="col-span-2">{getStatusBadge(selectedNotification.status)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">发送时间:</div>
                  <div className="col-span-2">{formatDate(selectedNotification.sentAt)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">阅读时间:</div>
                  <div className="col-span-2">{formatDate(selectedNotification.readAt)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">内容:</div>
                  <div className="col-span-2">这是一条模拟的通知内容，实际内容会根据通知模板和数据动态生成。</div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
