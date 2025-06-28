"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, CheckCheck } from "lucide-react"

// 模拟通知数据
const mockNotifications = [
  {
    id: "1",
    title: "系统更新",
    message: "系统将于今晚22:00-23:00进行例行维护，期间部分功能可能暂时不可用。",
    type: "info",
    date: "2023-11-15T10:30:00",
    read: false,
  },
  {
    id: "2",
    title: "安全提醒",
    message: "您的账号刚刚在新设备上登录，如非本人操作，请立即修改密码。",
    type: "warning",
    date: "2023-11-14T16:45:00",
    read: false,
  },
  {
    id: "3",
    title: "资质验证成功",
    message: "您上传的医师资格证已通过验证，有效期至2030年12月31日。",
    type: "success",
    date: "2023-11-13T09:15:00",
    read: true,
  },
  {
    id: "4",
    title: "患者预约",
    message: "李患者已预约您明天下午15:00的远程会诊，请准时参加。",
    type: "info",
    date: "2023-11-12T14:20:00",
    read: true,
  },
  {
    id: "5",
    title: "模型训练完成",
    message: "您的AI诊断模型v2.3已训练完成，准确率达到94.5%。",
    type: "success",
    date: "2023-11-10T11:05:00",
    read: true,
  },
]

export function NotificationsClient() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab)

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">通知列表</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} 未读
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-1" />
              全部标为已读
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={clearAll}>
            <Trash2 className="h-4 w-4 mr-1" />
            清空通知
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">全部通知</TabsTrigger>
          <TabsTrigger value="unread">未读 ({unreadCount})</TabsTrigger>
          <TabsTrigger value="info">信息</TabsTrigger>
          <TabsTrigger value="success">成功</TabsTrigger>
          <TabsTrigger value="warning">警告</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                没有{activeTab === "all" ? "" : activeTab === "unread" ? "未读" : activeTab}通知
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={notification.read ? "" : "border-l-4 border-l-blue-500"}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(notification.type)}
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {!notification.read && (
                          <Badge variant="secondary" className="ml-2">
                            新
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{formatDate(notification.date)}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p>{notification.message}</p>
                  </CardContent>
                  <CardFooter className="py-2 flex justify-end gap-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        标为已读
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      删除
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
