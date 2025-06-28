"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const mockTaskHistory = [
  {
    id: "T001",
    name: "数据备份",
    status: "completed",
    duration: "2分30秒",
    startTime: "2024-01-20 02:00",
    endTime: "2024-01-20 02:02",
  },
  {
    id: "T002",
    name: "系统清理",
    status: "failed",
    duration: "1分15秒",
    startTime: "2024-01-20 03:00",
    endTime: "2024-01-20 03:01",
  },
  { id: "T003", name: "报告生成", status: "running", duration: "进行中", startTime: "2024-01-20 04:00", endTime: "-" },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "running":
      return <Clock className="h-4 w-4 text-blue-500" />
    default:
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          已完成
        </Badge>
      )
    case "failed":
      return <Badge variant="destructive">失败</Badge>
    case "running":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          运行中
        </Badge>
      )
    default:
      return <Badge variant="outline">未知</Badge>
  }
}

export function TaskHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>任务历史</CardTitle>
        <CardDescription>查看最近执行的任务记录</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>任务ID</TableHead>
              <TableHead>任务名称</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>持续时间</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>结束时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTaskHistory.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    {task.name}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell>{task.duration}</TableCell>
                <TableCell>{task.startTime}</TableCell>
                <TableCell>{task.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
