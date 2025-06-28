import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { FollowupClient } from "@/components/patients/followup-client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"

export const metadata = {
  title: "随访计划 | MediNexus³",
  description: "管理患者随访计划和提醒",
}

export default function PatientFollowupPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-medical-800">随访计划</h1>
          <p className="text-sm text-medical-600 mt-1">管理患者随访计划和提醒</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="bg-medical-gradient text-white">
            <Plus className="mr-2 h-4 w-4" />
            创建随访计划
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>即将到期</span>
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>已逾期</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>已完成</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>全部计划</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>即将到期的随访</CardTitle>
              <CardDescription>未来7天内需要进行的随访计划</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <FollowupClient status="upcoming" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle>已逾期的随访</CardTitle>
              <CardDescription>已经超过计划日期但尚未完成的随访</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <FollowupClient status="overdue" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>已完成的随访</CardTitle>
              <CardDescription>已经成功完成的随访记录</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <FollowupClient status="completed" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>全部随访计划</CardTitle>
              <CardDescription>查看所有随访计划和记录</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <FollowupClient status="all" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
