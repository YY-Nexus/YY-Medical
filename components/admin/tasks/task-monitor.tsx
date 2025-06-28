"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Square, RotateCcw } from "lucide-react"

const mockRunningTasks = [
  { id: "T003", name: "报告生成", progress: 75, status: "running", eta: "2分钟" },
  { id: "T004", name: "数据同步", progress: 45, status: "running", eta: "5分钟" },
  { id: "T005", name: "索引重建", progress: 20, status: "paused", eta: "暂停中" },
]

export function TaskMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>任务监控</CardTitle>
        <CardDescription>实时监控正在执行的任务</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRunningTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-muted-foreground">任务ID: {task.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={task.status === "running" ? "default" : "secondary"}>
                    {task.status === "running" ? "运行中" : "已暂停"}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      {task.status === "running" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Square className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>进度</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} />
                <div className="text-sm text-muted-foreground">预计剩余时间: {task.eta}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
