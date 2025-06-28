"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, RefreshCw, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  certificationVerificationService,
  type VerificationProvider,
} from "@/services/certification-verification-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUpload } from "./file-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface CertificationUploadFormProps {
  onSave: (data: any) => void
  onCancel: () => void
}

export function CertificationUploadForm({ onSave, onCancel }: CertificationUploadFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    type: "doctor-license",
    licenseNumber: "",
    name: "",
    specialty: "",
    institution: "",
    issueDate: "",
    expiryDate: "",
    notes: "",
    providerId: "nhc", // 默认验证机构
  })
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [additionalFile, setAdditionalFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [availableProviders, setAvailableProviders] = useState<VerificationProvider[]>([])

  // 当资质类型变化时，更新可用的验证机构
  useEffect(() => {
    const providers = certificationVerificationService.getAvailableProviders(formData.type)
    setAvailableProviders(providers)

    // 如果当前选择的验证机构不支持该资质类型，则选择第一个可用的验证机构
    if (!providers.some((p) => p.id === formData.providerId)) {
      setFormData((prev) => ({
        ...prev,
        providerId: providers[0]?.id || "nhc",
      }))
    }
  }, [formData.type])

  // 处理表单变更
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 验证资质
  const verifyCertification = async () => {
    if (!certificateFile) {
      toast({
        title: "缺少资质证书",
        description: "请上传资质证书文件",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      // 模拟文件上传
      console.log("上传证书文件:", certificateFile.name)
      if (additionalFile) {
        console.log("上传附加文件:", additionalFile.name)
      }

      // 调用验证服务
      let result
      if (formData.type === "doctor-license") {
        result = await certificationVerificationService.verifyDoctorLicense(
          formData.licenseNumber,
          formData.name,
          formData.providerId,
        )
      } else if (formData.type === "specialist-certificate") {
        result = await certificationVerificationService.verifySpecialistCertificate(
          formData.licenseNumber,
          formData.name,
          formData.specialty,
          formData.providerId,
        )
      } else {
        throw new Error("不支持的资质类型")
      }

      setVerificationResult(result)
    } catch (error) {
      console.error("资质验证失败:", error)
      toast({
        title: "资质验证失败",
        description: error instanceof Error ? error.message : "发生未知错误",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  // 保存资质信息
  const handleSave = () => {
    if (!verificationResult?.isValid) {
      toast({
        title: "无法保存",
        description: "请先验证资质信息",
        variant: "destructive",
      })
      return
    }

    if (!certificateFile) {
      toast({
        title: "缺少资质证书",
        description: "请上传资质证书文件",
        variant: "destructive",
      })
      return
    }

    // 合并表单数据和文件信息
    const completeData = {
      ...formData,
      certificateFile,
      additionalFile,
      verificationResult,
    }

    onSave(completeData)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="files">证书文件</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">资质类型</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="选择资质类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor-license">执业医师资格证</SelectItem>
                  <SelectItem value="specialist-certificate">专科医师资格证</SelectItem>
                  <SelectItem value="practice-permit">医疗机构执业许可证</SelectItem>
                  <SelectItem value="continuing-education">继续教育证书</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="providerId">验证机构</Label>
              <Select value={formData.providerId} onValueChange={(value) => handleChange("providerId", value)}>
                <SelectTrigger id="providerId">
                  <SelectValue placeholder="选择验证机构" />
                </SelectTrigger>
                <SelectContent>
                  {availableProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center">
                        <span>{provider.name}</span>
                        {provider.isOfficial && (
                          <Badge className="ml-2 bg-blue-500 text-xs">
                            <Shield className="h-2 w-2 mr-1" />
                            官方
                          </Badge>
                        )}
                        {provider.isFast && (
                          <Badge className="ml-2 bg-green-500 text-xs">
                            <Clock className="h-2 w-2 mr-1" />
                            快速
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {availableProviders.find((p) => p.id === formData.providerId)?.verificationTime} ·
                {availableProviders.find((p) => p.id === formData.providerId)?.fee}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">证书编号</Label>
              <Input
                id="licenseNumber"
                placeholder="输入证书编号"
                value={formData.licenseNumber}
                onChange={(e) => handleChange("licenseNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                placeholder="输入姓名"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {formData.type === "specialist-certificate" && (
              <div className="space-y-2">
                <Label htmlFor="specialty">专科</Label>
                <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="选择专科" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">心血管内科</SelectItem>
                    <SelectItem value="neurology">神经内科</SelectItem>
                    <SelectItem value="oncology">肿瘤科</SelectItem>
                    <SelectItem value="pediatrics">儿科</SelectItem>
                    <SelectItem value="surgery">外科</SelectItem>
                    <SelectItem value="orthopedics">骨科</SelectItem>
                    <SelectItem value="gynecology">妇产科</SelectItem>
                    <SelectItem value="dermatology">皮肤科</SelectItem>
                    <SelectItem value="ophthalmology">眼科</SelectItem>
                    <SelectItem value="psychiatry">精神科</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="institution">发证机构</Label>
              <Input
                id="institution"
                placeholder="输入发证机构"
                value={formData.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDate">发证日期</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => handleChange("issueDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">有效期至</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">备注</Label>
              <Textarea
                id="notes"
                placeholder="添加备注信息"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-4 mt-4">
          <div className="space-y-6">
            <FileUpload
              onFileChange={setCertificateFile}
              label="上传资质证书"
              description="请上传资质证书的扫描件或照片，支持JPG、PNG和PDF格式，最大5MB"
            />

            <FileUpload
              onFileChange={setAdditionalFile}
              label="上传附加材料（可选）"
              description="如有需要，可上传附加证明材料，支持JPG、PNG和PDF格式，最大5MB"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={verifyCertification} disabled={isVerifying}>
            {isVerifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                验证中...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                验证资质
              </>
            )}
          </Button>
          <Button onClick={handleSave} disabled={!verificationResult?.isValid}>
            保存
          </Button>
        </div>
      </div>

      {verificationResult && (
        <div className="mt-6">
          {verificationResult.isValid ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>资质验证通过</AlertTitle>
              <AlertDescription>
                {verificationResult.message}
                <ul className="mt-2 list-disc list-inside">
                  {verificationResult.name && <li>姓名: {verificationResult.name}</li>}
                  {verificationResult.institution && <li>机构: {verificationResult.institution}</li>}
                  {verificationResult.specialty && <li>专科: {verificationResult.specialty}</li>}
                  {verificationResult.validUntil && <li>有效期至: {verificationResult.validUntil}</li>}
                  {verificationResult.verificationProvider && (
                    <li>验证机构: {verificationResult.verificationProvider}</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>资质验证失败</AlertTitle>
              <AlertDescription>
                {verificationResult.message}
                {verificationResult.verificationProvider && (
                  <p className="mt-1">验证机构: {verificationResult.verificationProvider}</p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}
