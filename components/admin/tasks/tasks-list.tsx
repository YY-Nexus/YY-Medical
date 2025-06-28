"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Edit, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react"
import { EditTaskDialog } from "@/components/admin/tasks/edit-task-dialog"

// 模拟数据
const tasks = [
  {
    id: "task-1",
    name: "数据库备份",
    type: "system",
    schedule: "每日 00:00",
    status: "active",
    lastRun: "2025-05-18 00:00:12",
    nextRun: "2025-05-19 00:00:00",
    duration: "2分32秒",
  },
  {
    id: "task-2",
    name: "系统日志清理",
    type: "system",
    schedule: "每周日 02:00",
    status: "active",
    lastRun: "2025-05-12 02:00:05",
    nextRun: "2025-05-19 02:00:00",
    duration: "5分17秒",
  },
  {
    id: "task-3",
    name: "患者数据统计",
    type: "analytics",
    schedule: "每日 06:00",
    status: "active",
    lastRun: "2025-05-18 06:00:03",
    nextRun: "2025-05-19 06:00:00",
    duration: "3分45秒",
  },
  {
    id: "task-4",
    name: "诊断模型训练",
    type: "ai",
    schedule: "每周六 04:00",
    status: "paused",
    lastRun: "2025-05-11 04:00:00",
    nextRun: "暂停中",
    duration: "1小时23分",
  },
  {
    id: "task-5",
    name: "系统性能报告",
    type: "system",
    schedule: "每日 08:00",
    status: "active",
    lastRun: "2025-05-18 08:00:07",
    nextRun: "2025-05-19 08:00:00",
    duration: "1分12秒",
  },
  {
    id: "task-6",
    name: "用户活动分析",
    type: "analytics",
    schedule: "每日 07:00",
    status: "active",
    lastRun: "2025-05-18 07:00:02",
    nextRun: "2025-05-19 07:00:00",
    duration: "2分56秒",
  },
  {
    id: "task-7",
    name: "资源使用预测",
    type: "ai",
    schedule: "每月1日 03:00",
    status: "active",
    lastRun: "2025-05-01 03:00:04",
    nextRun: "2025-06-01 03:00:00",
    duration: "15分23秒",
  },
]

export function TasksList() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [editTask, setEditTask] = useState<any>(null)

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const toggleAllTasks = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(tasks.map((task) => task.id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">活动</Badge>
      case "paused":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            已暂停
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">失败</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "system":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            系统
          </Badge>
        )
      case "analytics":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-500">
            分析
          </Badge>
        )
      case "ai":
        return (
          <Badge variant="outline" className="text-emerald-500 border-emerald-500">
            AI
          </Badge>
        )
      default:
        return <Badge variant="outline">其他</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Checkbox
                  checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  indeterminate={selectedTasks.length > 0 && selectedTasks.length < tasks.length}
                  onCheckedChange={toggleAllTasks}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                任务名称
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                类型
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                调度
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                状态
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                上次执行
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                下次执行
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                执行时长
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-muted/50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={() => toggleTaskSelection(task.id)}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium">{task.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{getTypeBadge(task.type)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{task.schedule}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(task.status)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{task.lastRun}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {task.status === "paused" ? (
                    <span className="text-amber-500">暂停中</span>
                  ) : (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{task.nextRun}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{task.duration}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    {task.status === "active" ? (
                      <Button variant="ghost" size="icon" title="暂停">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" title="启动">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>任务操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setEditTask(task)}>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTasks.length > 0 && (
        <div className="flex items-center gap-2 py-2">
          <span className="text-sm text-muted-foreground">已选择 {selectedTasks.length} 个任务</span>
          <Button variant="outline" size="sm">
            批量启动
          </Button>
          <Button variant="outline" size="sm">
            批量暂停
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            批量删除
          </Button>
        </div>
      )}

      {editTask && (
        <EditTaskDialog task={editTask} open={!!editTask} onOpenChange={(open) => !open && setEditTask(null)} />
      )}
    </div>
  )
}
