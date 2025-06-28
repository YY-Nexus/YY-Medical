"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { FileCheck, Info } from "lucide-react"
import { CertificationUploadForm } from "@/components/profile/certifications/certification-upload-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function CertificationUploadClient() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = (data: any) => {
    setIsSubmitting(true)
    // 模拟保存操作
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "资质已提交",
        description: "您的资质信息已成功提交，我们将尽快进行审核。",
      })
    }, 1000)
  }

  const handleCancel = () => {
    // 处理取消操作
    toast({
      title: "操作已取消",
      description: "您已取消资质上传。",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="资质上传"
        description="上传医疗专业人员资质证书进行验证"
        icon={<FileCheck className="h-6 w-6" />}
      />

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>资质验证说明</AlertTitle>
        <AlertDescription>
          上传的资质证书将通过第三方验证服务进行真实性验证。请确保上传清晰完整的证书图片或PDF文件，包含所有必要信息。验证过程通常需要1-3个工作日。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>上传资质证书</CardTitle>
          <CardDescription>支持JPG、PNG和PDF格式，单个文件大小不超过10MB</CardDescription>
        </CardHeader>
        <CardContent>
          <CertificationUploadForm onSave={handleSave} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
