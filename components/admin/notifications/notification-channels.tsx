"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Settings } from "lucide-react"

// 模拟通知渠道数据
const initialChannels = [
  {
    id: 1,
    name: "系统邮件服务",
    type: "email",
    config: {
      host: "smtp.example.com",
      port: 587,
      username: "notifications@example.com",
      password: "********",
      from: "YanYu MediNexus <notifications@example.com>",
    },
    active: true,
  },
  {
    id: 2,
    name: "短信服务",
    type: "sms",
    config: {
      provider: "阿里云",
      accessKey: "AKIAXXXXXXXX",
      secretKey: "********",
      signName: "言语医枢",
    },
    active: true,
  },
  {
    id: 3,
    name: "移动应用推送",
    type: "push",
    config: {
      provider: "极光推送",
      appKey: "JPUSHXXXXXXXX",
      masterSecret: "********",
    },
    active: true,
  },
  {
    id: 4,
    name: "备用邮件服务",
    type: "email",
    config: {
      host: "smtp.backup.com",
      port: 465,
      username: "backup@example.com",
      password: "********",
      from: "YanYu MediNexus <backup@example.com>",
    },
    active: false,
  },
]

export function NotificationChannels() {
  const [channels, setChannels] = useState(initialChannels)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentChannel, setCurrentChannel] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)

  const handleToggleActive = (id) => {
    setChannels(channels.map((channel) => (channel.id === id ? { ...channel, active: !channel.active } : channel)))
  }

  const handleAddChannel = () => {
    setCurrentChannel({
      id: channels.length + 1,
      name: "",
      type: "email",
      config: {},
      active: true,
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEditChannel = (channel) => {
    setCurrentChannel(channel)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteChannel = (id) => {
    setChannels(channels.filter((channel) => channel.id !== id))
  }

  const handleSaveChannel = () => {
    if (isEditing) {
      setChannels(channels.map((channel) => (channel.id === currentChannel.id ? currentChannel : channel)))
    } else {
      setChannels([...channels, currentChannel])
    }
    setIsDialogOpen(false)
  }

  const handleConfigureChannel = (channel) => {
    setCurrentChannel(channel)
    setIsConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    setChannels(channels.map((channel) => (channel.id === currentChannel.id ? currentChannel : channel)))
    setIsConfigDialogOpen(false)
  }

  const renderConfigFields = () => {
    if (!currentChannel) return null

    switch (currentChannel.type) {
      case "email":
        return (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="host" className="text-right">
                SMTP服务器
              </Label>
              <Input
                id="host"
                value={currentChannel.config.host || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      host: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">
                端口
              </Label>
              <Input
                id="port"
                type="number"
                value={currentChannel.config.port || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      port: Number.parseInt(e.target.value),
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                用户名
              </Label>
              <Input
                id="username"
                value={currentChannel.config.username || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      username: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                密码
              </Label>
              <Input
                id="password"
                type="password"
                value={currentChannel.config.password || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      password: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="from" className="text-right">
                发件人
              </Label>
              <Input
                id="from"
                value={currentChannel.config.from || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      from: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
          </>
        )
      case "sms":
        return (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">
                服务提供商
              </Label>
              <Input
                id="provider"
                value={currentChannel.config.provider || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      provider: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accessKey" className="text-right">
                Access Key
              </Label>
              <Input
                id="accessKey"
                value={currentChannel.config.accessKey || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      accessKey: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secretKey" className="text-right">
                Secret Key
              </Label>
              <Input
                id="secretKey"
                type="password"
                value={currentChannel.config.secretKey || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      secretKey: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="signName" className="text-right">
                签名名称
              </Label>
              <Input
                id="signName"
                value={currentChannel.config.signName || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      signName: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
          </>
        )
      case "push":
        return (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">
                服务提供商
              </Label>
              <Input
                id="provider"
                value={currentChannel.config.provider || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      provider: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appKey" className="text-right">
                App Key
              </Label>
              <Input
                id="appKey"
                value={currentChannel.config.appKey || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      appKey: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="masterSecret" className="text-right">
                Master Secret
              </Label>
              <Input
                id="masterSecret"
                type="password"
                value={currentChannel.config.masterSecret || ""}
                onChange={(e) =>
                  setCurrentChannel({
                    ...currentChannel,
                    config: {
                      ...currentChannel.config,
                      masterSecret: e.target.value,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>通知渠道</CardTitle>
          <CardDescription>配置系统通知的发送渠道</CardDescription>
        </div>
        <Button onClick={handleAddChannel}>
          <Plus className="mr-2 h-4 w-4" />
          添加渠道
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>渠道名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {channels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell className="font-medium">{channel.name}</TableCell>
                <TableCell>{channel.type === "email" ? "邮件" : channel.type === "sms" ? "短信" : "推送"}</TableCell>
                <TableCell>
                  <Switch checked={channel.active} onCheckedChange={() => handleToggleActive(channel.id)} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleConfigureChannel(channel)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditChannel(channel)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteChannel(channel.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "编辑通知渠道" : "添加通知渠道"}</DialogTitle>
              <DialogDescription>配置通知渠道的基本信息</DialogDescription>
            </DialogHeader>
            {currentChannel && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    渠道名称
                  </Label>
                  <Input
                    id="name"
                    value={currentChannel.name}
                    onChange={(e) => setCurrentChannel({ ...currentChannel, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    渠道类型
                  </Label>
                  <select
                    id="type"
                    value={currentChannel.type}
                    onChange={(e) => setCurrentChannel({ ...currentChannel, type: e.target.value })}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="email">邮件</option>
                    <option value="sms">短信</option>
                    <option value="push">推送</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    启用状态
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch
                      id="active"
                      checked={currentChannel.active}
                      onCheckedChange={(checked) => setCurrentChannel({ ...currentChannel, active: checked })}
                    />
                    <Label htmlFor="active">{currentChannel.active ? "已启用" : "已禁用"}</Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveChannel}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>配置通知渠道</DialogTitle>
              <DialogDescription>配置通知渠道的详细参数</DialogDescription>
            </DialogHeader>
            {currentChannel && <div className="grid gap-4 py-4">{renderConfigFields()}</div>}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveConfig}>保存配置</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
