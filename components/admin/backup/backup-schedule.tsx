"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, Trash2 } from "lucide-react"

// 模拟备份计划数据
const scheduleData = [
  {
    id: "sch-001",
    name: "每日备份",
    frequency: "每日",
    time: "00:00",
    retention: "7天",
    status: "启用",
    lastRun: "2025-05-15 00:00:00",
    nextRun: "2025-05-16 00:00:00",
  },
  {
    id: "sch-002",
    name: "每周备份",
    frequency: "每周",
    time: "01:00",
    retention: "4周",
    status: "启用",
    lastRun: "2025-05-10 01:00:00",
    nextRun: "2025-05-17 01:00:00",
  },
  {
    id: "sch-003",
    name: "每月备份",
    frequency: "每月",
    time: "02:00",
    retention: "12个月",
    status: "启用",
    lastRun: "2025-05-01 02:00:00",
    nextRun: "2025-06-01 02:00:00",
  },
]

export function BackupSchedule() {
  const { toast } = useToast()
  const [schedules, setSchedules] = useState(scheduleData)
  const [isEditing, setIsEditing] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<any>(null)

  const handleToggleStatus = (id: string) => {
    setSchedules(
      schedules.map((schedule) => {
        if (schedule.id === id) {
          const newStatus = schedule.status === "启用" ? "禁用" : "启用"
          return { ...schedule, status: newStatus }
        }
        return schedule
      }),
    )

    toast({
      title: "计划状态已更新",
      description: "备份计划状态已成功更新。",
    })
  }

  const handleEditSchedule = (schedule: any) => {
    setEditingSchedule({ ...schedule })
    setIsEditing(true)
  }

  const handleSaveSchedule = () => {
    if (editingSchedule) {
      setSchedules(schedules.map((schedule) => (schedule.id === editingSchedule.id ? editingSchedule : schedule)))

      setIsEditing(false)
      setEditingSchedule(null)

      toast({
        title: "备份计划已更新",
        description: "备份计划设置已成功保存。",
      })
    }
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))

    toast({
      title: "备份计划已删除",
      description: "所选备份计划已成功删除。",
    })
  }

  const handleAddSchedule = () => {
    const newSchedule = {
      id: `sch-${Math.floor(Math.random() * 1000)}`,
      name: "新建备份计划",
      frequency: "每日",
      time: "03:00",
      retention: "7天",
      status: "启用",
      lastRun: "-",
      nextRun: "2025-05-16 03:00:00",
    }

    setEditingSchedule(newSchedule)
    setIsEditing(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>备份计划</CardTitle>
            <CardDescription>设置自动备份的频率和保留策略</CardDescription>
          </div>
          <Button onClick={handleAddSchedule}>添加备份计划</Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-lg font-medium">
              {editingSchedule.id.includes("sch-") ? "编辑备份计划" : "新建备份计划"}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="schedule-name">计划名称</Label>
                <Input
                  id="schedule-name"
                  value={editingSchedule.name}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-frequency">备份频率</Label>
                <Select
                  value={editingSchedule.frequency}
                  onValueChange={(value) => setEditingSchedule({ ...editingSchedule, frequency: value })}
                >
                  <SelectTrigger id="schedule-frequency">
                    <SelectValue placeholder="选择频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="每日">每日</SelectItem>
                    <SelectItem value="每周">每周</SelectItem>
                    <SelectItem value="每月">每月</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-time">备份时间</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={editingSchedule.time}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-retention">保留策略</Label>
                <Select
                  value={editingSchedule.retention}
                  onValueChange={(value) => setEditingSchedule({ ...editingSchedule, retention: value })}
                >
                  <SelectTrigger id="schedule-retention">
                    <SelectValue placeholder="选择保留时长" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3天">3天</SelectItem>
                    <SelectItem value="7天">7天</SelectItem>
                    <SelectItem value="14天">14天</SelectItem>
                    <SelectItem value="30天">30天</SelectItem>
                    <SelectItem value="4周">4周</SelectItem>
                    <SelectItem value="12个月">12个月</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="schedule-status"
                checked={editingSchedule.status === "启用"}
                onCheckedChange={(checked) =>
                  setEditingSchedule({ ...editingSchedule, status: checked ? "启用" : "禁用" })
                }
              />
              <Label htmlFor="schedule-status">启用此备份计划</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setEditingSchedule(null)
                }}
              >
                取消
              </Button>
              <Button onClick={handleSaveSchedule}>保存计划</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>计划名称</TableHead>
                  <TableHead>频率</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead>保留策略</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>下次运行</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      未找到备份计划
                    </TableCell>
                  </TableRow>
                ) : (
                  schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.name}</TableCell>
                      <TableCell>{schedule.frequency}</TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.retention}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge
                            variant={schedule.status === "启用" ? "success" : "secondary"}
                            className={
                              schedule.status === "启用" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {schedule.status}
                          </Badge>
                          <Switch
                            className="ml-2"
                            size="sm"
                            checked={schedule.status === "启用"}
                            onCheckedChange={() => handleToggleStatus(schedule.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          {schedule.nextRun}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSchedule(schedule)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">编辑</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteSchedule(schedule.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">删除</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
