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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Copy } from "lucide-react"

// 模拟通知规则数据
const initialRules = [
  {
    id: 1,
    name: "新患者注册",
    event: "patient.registered",
    condition: "user.role === 'doctor'",
    channel: "email,sms",
    template: "patient-registered",
    active: true,
  },
  {
    id: 2,
    name: "资质验证失败",
    event: "certification.failed",
    condition: "always",
    channel: "email,push",
    template: "certification-failed",
    active: true,
  },
  {
    id: 3,
    name: "系统性能警告",
    event: "system.performance.warning",
    condition: "user.role === 'admin'",
    channel: "email",
    template: "system-warning",
    active: false,
  },
  {
    id: 4,
    name: "数据备份完成",
    event: "backup.completed",
    condition: "user.role === 'admin'",
    channel: "email",
    template: "backup-completed",
    active: true,
  },
  {
    id: 5,
    name: "患者预约提醒",
    event: "appointment.reminder",
    condition: "always",
    channel: "email,sms,push",
    template: "appointment-reminder",
    active: true,
  },
]

export function NotificationRules() {
  const [rules, setRules] = useState(initialRules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentRule, setCurrentRule] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleActive = (id) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, active: !rule.active } : rule)))
  }

  const handleAddRule = () => {
    setCurrentRule({
      id: rules.length + 1,
      name: "",
      event: "",
      condition: "",
      channel: "",
      template: "",
      active: true,
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEditRule = (rule) => {
    setCurrentRule(rule)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDuplicateRule = (rule) => {
    const newRule = {
      ...rule,
      id: rules.length + 1,
      name: `${rule.name} (复制)`,
    }
    setRules([...rules, newRule])
  }

  const handleDeleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const handleSaveRule = () => {
    if (isEditing) {
      setRules(rules.map((rule) => (rule.id === currentRule.id ? currentRule : rule)))
    } else {
      setRules([...rules, currentRule])
    }
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>通知规则</CardTitle>
          <CardDescription>配置系统事件触发的通知规则</CardDescription>
        </div>
        <Button onClick={handleAddRule}>
          <Plus className="mr-2 h-4 w-4" />
          添加规则
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>规则名称</TableHead>
              <TableHead>触发事件</TableHead>
              <TableHead>通知渠道</TableHead>
              <TableHead>模板</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.event}</TableCell>
                <TableCell>{rule.channel}</TableCell>
                <TableCell>{rule.template}</TableCell>
                <TableCell>
                  <Switch checked={rule.active} onCheckedChange={() => handleToggleActive(rule.id)} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRule(rule)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDuplicateRule(rule)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
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
              <DialogTitle>{isEditing ? "编辑通知规则" : "添加通知规则"}</DialogTitle>
              <DialogDescription>配置触发条件和通知内容</DialogDescription>
            </DialogHeader>
            {currentRule && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    规则名称
                  </Label>
                  <Input
                    id="name"
                    value={currentRule.name}
                    onChange={(e) => setCurrentRule({ ...currentRule, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event" className="text-right">
                    触发事件
                  </Label>
                  <Input
                    id="event"
                    value={currentRule.event}
                    onChange={(e) => setCurrentRule({ ...currentRule, event: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="condition" className="text-right">
                    触发条件
                  </Label>
                  <Input
                    id="condition"
                    value={currentRule.condition}
                    onChange={(e) =>
                      setCurrentRule({
                        ...currentRule,
                        condition: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="channel" className="text-right">
                    通知渠道
                  </Label>
                  <Select
                    value={currentRule.channel}
                    onValueChange={(value) => setCurrentRule({ ...currentRule, channel: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择通知渠道" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">邮件</SelectItem>
                      <SelectItem value="sms">短信</SelectItem>
                      <SelectItem value="push">推送</SelectItem>
                      <SelectItem value="email,sms">邮件和短信</SelectItem>
                      <SelectItem value="email,push">邮件和推送</SelectItem>
                      <SelectItem value="email,sms,push">所有渠道</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template" className="text-right">
                    通知模板
                  </Label>
                  <Select
                    value={currentRule.template}
                    onValueChange={(value) => setCurrentRule({ ...currentRule, template: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择通知模板" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient-registered">患者注册模板</SelectItem>
                      <SelectItem value="certification-failed">资质验证失败模板</SelectItem>
                      <SelectItem value="system-warning">系统警告模板</SelectItem>
                      <SelectItem value="backup-completed">备份完成模板</SelectItem>
                      <SelectItem value="appointment-reminder">预约提醒模板</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    启用状态
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch
                      id="active"
                      checked={currentRule.active}
                      onCheckedChange={(checked) => setCurrentRule({ ...currentRule, active: checked })}
                    />
                    <Label htmlFor="active">{currentRule.active ? "已启用" : "已禁用"}</Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveRule}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
