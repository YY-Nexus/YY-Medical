import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import TasksClient from "@/components/admin/tasks/tasks-client"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">计划任务管理</h1>
      <p className="text-muted-foreground">管理系统计划任务、定时作业和自动化流程</p>

      <Suspense fallback={<LoadingSpinner />}>
        <TasksClient />
      </Suspense>
    </div>
  )
}
