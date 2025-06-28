import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PatientGroupsClient } from "@/components/patients/patient-groups-client"
import { Plus } from "lucide-react"

export const metadata = {
  title: "患者分组 | MediNexus³",
  description: "创建和管理患者分组，优化工作流程",
}

export default function PatientGroupsPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-medical-800">患者分组</h1>
          <p className="text-sm text-medical-600 mt-1">创建和管理患者分组，优化工作流程</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="bg-medical-gradient text-white">
            <Plus className="mr-2 h-4 w-4" />
            创建新分组
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>患者分组</CardTitle>
              <CardDescription>管理您的患者分组和成员</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <PatientGroupsClient />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>分组统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">总分组数</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">总患者数</span>
                  <span className="font-medium">248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">最大分组</span>
                  <span className="font-medium">心血管患者 (56人)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">最近更新</span>
                  <span className="font-medium">2024-04-28</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <span>批量导入患者</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>导出分组数据</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>批量随访设置</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>分组权限管理</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
