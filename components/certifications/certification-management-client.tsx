"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { UserCheck, Plus, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CertificationUploadForm } from "@/components/profile/certifications/certification-upload-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BulkImportDialog } from "./bulk-import-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificationList } from "@/components/profile/certifications/certification-list"

export function CertificationManagementClient() {
  const [bulkAction, setBulkAction] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showBulkImportDialog, setShowBulkImportDialog] = useState(false)

  const handleSaveCertification = (data: any) => {
    console.log("保存资质:", data)
    setShowUploadDialog(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader title="资质管理" description="管理医疗专业人员资质证书" icon={<UserCheck className="h-6 w-6" />} />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Label htmlFor="bulk-action">批量操作:</Label>
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger id="bulk-action" className="w-[180px]">
              <SelectValue placeholder="选择操作..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="export">导出选中项</SelectItem>
              <SelectItem value="remind">发送提醒</SelectItem>
              <SelectItem value="archive">归档</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" disabled={!bulkAction}>
            应用
          </Button>
        </div>

        <div className="flex space-x-2">
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                添加资质
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>添加新资质</DialogTitle>
                <DialogDescription>上传新的资质证书进行验证</DialogDescription>
              </DialogHeader>
              <CertificationUploadForm onSave={handleSaveCertification} onCancel={() => setShowUploadDialog(false)} />
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>

          <Dialog open={showBulkImportDialog} onOpenChange={setShowBulkImportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                批量导入
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>批量导入资质</DialogTitle>
                <DialogDescription>通过Excel或CSV文件批量导入资质信息</DialogDescription>
              </DialogHeader>
              <BulkImportDialog onClose={() => setShowBulkImportDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">活跃资质</TabsTrigger>
          <TabsTrigger value="expiring">即将过期</TabsTrigger>
          <TabsTrigger value="archived">已归档</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>活跃资质</CardTitle>
              <CardDescription>当前有效的资质证书</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationList isManagement={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring">
          <Card>
            <CardHeader>
              <CardTitle>即将过期资质</CardTitle>
              <CardDescription>90天内即将到期的资质证书</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationList isManagement={true} filter="expiring" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>已归档资质</CardTitle>
              <CardDescription>已归档或过期的资质证书</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationList isManagement={true} filter="archived" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
