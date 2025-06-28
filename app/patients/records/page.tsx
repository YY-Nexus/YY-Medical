import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MedicalRecordsClient } from "@/components/patients/medical-records-client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ImageIcon, FileSpreadsheet, FilePlus } from "lucide-react"

export const metadata = {
  title: "病历管理 | MediNexus³",
  description: "集中管理和查看患者的电子病历",
}

export default function PatientRecordsPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-medical-800">病历管理</h1>
          <p className="text-sm text-medical-600 mt-1">集中管理和查看患者的电子病历</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="bg-medical-gradient text-white">
            <FilePlus className="mr-2 h-4 w-4" />
            上传新病历
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>全部病历</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-1">
            <ImageIcon className="h-4 w-4" />
            <span>影像资料</span>
          </TabsTrigger>
          <TabsTrigger value="lab" className="flex items-center gap-1">
            <FileSpreadsheet className="h-4 w-4" />
            <span>检验报告</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>全部病历记录</CardTitle>
              <CardDescription>查看和管理所有类型的病历记录</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <MedicalRecordsClient recordType="all" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>影像资料</CardTitle>
              <CardDescription>查看和管理患者的影像学检查资料</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <MedicalRecordsClient recordType="images" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab">
          <Card>
            <CardHeader>
              <CardTitle>检验报告</CardTitle>
              <CardDescription>查看和管理患者的实验室检验报告</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <MedicalRecordsClient recordType="lab" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
