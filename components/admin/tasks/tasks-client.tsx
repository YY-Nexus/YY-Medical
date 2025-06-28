"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { TasksList } from "@/components/admin/tasks/tasks-list"
import { TaskScheduler } from "@/components/admin/tasks/task-scheduler"
import { TaskHistory } from "@/components/admin/tasks/task-history"
import { TaskMonitor } from "@/components/admin/tasks/task-monitor"
import { Plus, RefreshCw } from "lucide-react"
import { CreateTaskDialog } from "@/components/admin/tasks/create-task-dialog"

export default function TasksClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [refreshTrigger])

  const handleRefresh = () => {
    setIsLoading(true)
    setRefreshTrigger((prev) => prev + 1)
  }

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="active">活动任务</TabsTrigger>
            <TabsTrigger value="scheduler">任务调度</TabsTrigger>
            <TabsTrigger value="history">执行历史</TabsTrigger>
            <TabsTrigger value="monitor">任务监控</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            新建任务
          </Button>
        </div>
      </div>

      <TabsContent value="active" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>活动任务</CardTitle>
            <CardDescription>当前系统中正在运行和计划中的任务</CardDescription>
          </CardHeader>
          <CardContent>
            <TasksList />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="scheduler" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>任务调度</CardTitle>
            <CardDescription>管理任务调度计划和执行频率</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskScheduler />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>执行历史</CardTitle>
            <CardDescription>查看任务执行历史记录和结果</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskHistory />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monitor" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>任务监控</CardTitle>
            <CardDescription>监控任务执行状态和系统资源使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskMonitor />
          </CardContent>
        </Card>
      </TabsContent>

      {showCreateDialog && (
        <CreateTaskDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} onTaskCreated={handleRefresh} />
      )}
    </div>
  )
}
