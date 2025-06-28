"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertCircle,
  FileText,
  Save,
  Eye,
  Send,
  ChevronLeft,
  ChevronRight,
  Upload,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface EthicsApplicationFormProps {
  experimentId: string
  experimentData?: any
  onSubmit: (data: any) => void
  onSaveDraft: (data: any) => void
  onCancel: () => void
}

export function EthicsApplicationForm({
  experimentId,
  experimentData,
  onSubmit,
  onSaveDraft,
  onCancel,
}: EthicsApplicationFormProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // 初始化表单数据，如果有实验数据则预填充
  const [formData, setFormData] = useState({
    // 基本信息
    projectTitle: experimentData?.title || "",
    principalInvestigator: experimentData?.principalInvestigator || "",
    department: experimentData?.department || "",
    applicationDate: new Date().toISOString().split("T")[0],
    contactEmail: "",
    contactPhone: "",

    // 研究设计
    researchObjective: experimentData?.objective || "",
    researchBackground: "",
    methodology: experimentData?.methods?.map((m: any) => m.description).join("\n\n") || "",
    participantSelection:
      experimentData?.groups?.map((g: any) => `${g.name}: ${g.description} (n=${g.size})`).join("\n") || "",
    sampleSize: experimentData?.groups?.reduce((sum: number, g: any) => sum + g.size, 0) || 0,
    studyDuration:
      experimentData?.startDate && experimentData?.endDate
        ? `${experimentData.startDate} 至 ${experimentData.endDate}`
        : "",

    // 伦理考虑
    potentialRisks: "",
    riskManagement: "",
    anticipatedBenefits: "",
    informedConsent: "yes",
    consentProcess: "",
    dataProtection: "",
    confidentiality: "",
    compensationDetails: "",
    conflictOfInterest: "no",
    conflictDetails: "",

    // 声明与确认
    declarationAccuracy: false,
    declarationCompliance: false,
    declarationReporting: false,
    declarationResponsibility: false,

    // 元数据
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    experimentId: experimentId,
  })

  // 处理表单字段变化
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // 清除该字段的错误
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // 验证表单
  const validateForm = () => {
    const errors: Record<string, string> = {}

    // 基本信息验证
    if (!formData.projectTitle.trim()) errors.projectTitle = "请输入项目标题"
    if (!formData.principalInvestigator.trim()) errors.principalInvestigator = "请输入主要研究者姓名"
    if (!formData.department.trim()) errors.department = "请输入部门"
    if (!formData.contactEmail.trim()) errors.contactEmail = "请输入联系邮箱"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) errors.contactEmail = "请输入有效的邮箱地址"

    // 研究设计验证
    if (!formData.researchObjective.trim()) errors.researchObjective = "请输入研究目标"
    if (!formData.methodology.trim()) errors.methodology = "请描述研究方法"
    if (!formData.participantSelection.trim()) errors.participantSelection = "请描述参与者选择标准"

    // 伦理考虑验证
    if (!formData.potentialRisks.trim()) errors.potentialRisks = "请描述潜在风险"
    if (!formData.riskManagement.trim()) errors.riskManagement = "请描述风险管理措施"
    if (formData.informedConsent === "yes" && !formData.consentProcess.trim())
      errors.consentProcess = "请描述知情同意过程"
    if (!formData.dataProtection.trim()) errors.dataProtection = "请描述数据保护措施"
    if (formData.conflictOfInterest === "yes" && !formData.conflictDetails.trim())
      errors.conflictDetails = "请描述利益冲突详情"

    // 声明与确认验证
    if (!formData.declarationAccuracy) errors.declarationAccuracy = "请确认此声明"
    if (!formData.declarationCompliance) errors.declarationCompliance = "请确认此声明"
    if (!formData.declarationReporting) errors.declarationReporting = "请确认此声明"
    if (!formData.declarationResponsibility) errors.declarationResponsibility = "请确认此声明"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)])
    }
  }

  // 删除上传的文件
  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // 保存草稿
  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      status: "draft",
      updatedAt: new Date().toISOString(),
      files: uploadedFiles.map((file) => file.name),
    }
    onSaveDraft(draftData)
  }

  // 预览申请
  const handlePreview = () => {
    if (validateForm()) {
      setShowPreviewDialog(true)
    } else {
      // 滚动到第一个错误字段
      const firstErrorField = Object.keys(formErrors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        element.focus()
      }
    }
  }

  // 提交申请
  const handleSubmit = () => {
    if (validateForm()) {
      setShowSubmitDialog(true)
    } else {
      // 滚动到第一个错误字段
      const firstErrorField = Object.keys(formErrors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        element.focus()
      }
    }
  }

  // 确认提交
  const confirmSubmit = () => {
    const submissionData = {
      ...formData,
      status: "submitted",
      updatedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      files: uploadedFiles.map((file) => file.name),
    }
    onSubmit(submissionData)
    setShowSubmitDialog(false)
  }

  // 导航到下一个标签页
  const goToNextTab = () => {
    switch (activeTab) {
      case "basic-info":
        setActiveTab("research-design")
        break
      case "research-design":
        setActiveTab("ethical-considerations")
        break
      case "ethical-considerations":
        setActiveTab("file-upload")
        break
      case "file-upload":
        setActiveTab("declaration")
        break
    }
  }

  // 导航到上一个标签页
  const goToPrevTab = () => {
    switch (activeTab) {
      case "research-design":
        setActiveTab("basic-info")
        break
      case "ethical-considerations":
        setActiveTab("research-design")
        break
      case "file-upload":
        setActiveTab("ethical-considerations")
        break
      case "declaration":
        setActiveTab("file-upload")
        break
    }
  }

  // 渲染表单字段错误信息
  const renderError = (field: string) => {
    if (!formErrors[field]) return null
    return <div className="text-red-500 text-sm mt-1">{formErrors[field]}</div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">伦理审查申请</h2>
            <p className="text-muted-foreground">
              实验ID: {experimentId} · {formData.status === "draft" ? "草稿" : "已提交"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              取消
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic-info">基本信息</TabsTrigger>
              <TabsTrigger value="research-design">研究设计</TabsTrigger>
              <TabsTrigger value="ethical-considerations">伦理考虑</TabsTrigger>
              <TabsTrigger value="file-upload">文件上传</TabsTrigger>
              <TabsTrigger value="declaration">声明与确认</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-6 py-4">
              <TabsContent value="basic-info" className="mt-0 h-full">
                <Card>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">
                        项目标题 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="projectTitle"
                        value={formData.projectTitle}
                        onChange={(e) => handleChange("projectTitle", e.target.value)}
                        className={formErrors.projectTitle ? "border-red-500" : ""}
                      />
                      {renderError("projectTitle")}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="principalInvestigator">
                          主要研究者 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="principalInvestigator"
                          value={formData.principalInvestigator}
                          onChange={(e) => handleChange("principalInvestigator", e.target.value)}
                          className={formErrors.principalInvestigator ? "border-red-500" : ""}
                        />
                        {renderError("principalInvestigator")}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">
                          部门 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => handleChange("department", e.target.value)}
                          className={formErrors.department ? "border-red-500" : ""}
                        />
                        {renderError("department")}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">
                          联系邮箱 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleChange("contactEmail", e.target.value)}
                          className={formErrors.contactEmail ? "border-red-500" : ""}
                        />
                        {renderError("contactEmail")}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">联系电话</Label>
                        <Input
                          id="contactPhone"
                          value={formData.contactPhone}
                          onChange={(e) => handleChange("contactPhone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="applicationDate">申请日期</Label>
                      <Input
                        id="applicationDate"
                        type="date"
                        value={formData.applicationDate}
                        onChange={(e) => handleChange("applicationDate", e.target.value)}
                        disabled
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={goToNextTab}>
                      下一步
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="research-design" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>研究设计</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="researchObjective">
                        研究目标 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="researchObjective"
                        value={formData.researchObjective}
                        onChange={(e) => handleChange("researchObjective", e.target.value)}
                        className={`min-h-[80px] ${formErrors.researchObjective ? "border-red-500" : ""}`}
                      />
                      {renderError("researchObjective")}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="researchBackground">研究背景</Label>
                      <Textarea
                        id="researchBackground"
                        value={formData.researchBackground}
                        onChange={(e) => handleChange("researchBackground", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="methodology">
                        研究方法 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="methodology"
                        value={formData.methodology}
                        onChange={(e) => handleChange("methodology", e.target.value)}
                        className={`min-h-[100px] ${formErrors.methodology ? "border-red-500" : ""}`}
                      />
                      {renderError("methodology")}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="participantSelection">
                          参与者选择标准 <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="participantSelection"
                          value={formData.participantSelection}
                          onChange={(e) => handleChange("participantSelection", e.target.value)}
                          className={`min-h-[80px] ${formErrors.participantSelection ? "border-red-500" : ""}`}
                        />
                        {renderError("participantSelection")}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sampleSize">样本量</Label>
                        <Input
                          id="sampleSize"
                          type="number"
                          value={formData.sampleSize}
                          onChange={(e) => handleChange("sampleSize", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studyDuration">研究持续时间</Label>
                      <Input
                        id="studyDuration"
                        value={formData.studyDuration}
                        onChange={(e) => handleChange("studyDuration", e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={goToPrevTab}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      上一步
                    </Button>
                    <Button onClick={goToNextTab}>
                      下一步
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="ethical-considerations" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>伦理考虑</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="potentialRisks">
                        潜在风险 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="potentialRisks"
                        value={formData.potentialRisks}
                        onChange={(e) => handleChange("potentialRisks", e.target.value)}
                        className={`min-h-[80px] ${formErrors.potentialRisks ? "border-red-500" : ""}`}
                        placeholder="描述研究可能带来的潜在风险"
                      />
                      {renderError("potentialRisks")}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="riskManagement">
                        风险管理措施 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="riskManagement"
                        value={formData.riskManagement}
                        onChange={(e) => handleChange("riskManagement", e.target.value)}
                        className={`min-h-[80px] ${formErrors.riskManagement ? "border-red-500" : ""}`}
                        placeholder="描述如何管理和减轻潜在风险"
                      />
                      {renderError("riskManagement")}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="anticipatedBenefits">预期收益</Label>
                      <Textarea
                        id="anticipatedBenefits"
                        value={formData.anticipatedBenefits}
                        onChange={(e) => handleChange("anticipatedBenefits", e.target.value)}
                        className="min-h-[80px]"
                        placeholder="描述研究可能带来的收益"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        是否需要知情同意 <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.informedConsent}
                        onValueChange={(value) => handleChange("informedConsent", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="informed-consent-yes" />
                          <Label htmlFor="informed-consent-yes">是</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="informed-consent-no" />
                          <Label htmlFor="informed-consent-no">否</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.informedConsent === "yes" && (
                      <div className="space-y-2">
                        <Label htmlFor="consentProcess">
                          知情同意过程 <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="consentProcess"
                          value={formData.consentProcess}
                          onChange={(e) => handleChange("consentProcess", e.target.value)}
                          className={`min-h-[80px] ${formErrors.consentProcess ? "border-red-500" : ""}`}
                          placeholder="描述如何获取知情同意"
                        />
                        {renderError("consentProcess")}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="dataProtection">
                        数据保护措施 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="dataProtection"
                        value={formData.dataProtection}
                        onChange={(e) => handleChange("dataProtection", e.target.value)}
                        className={`min-h-[80px] ${formErrors.dataProtection ? "border-red-500" : ""}`}
                        placeholder="描述如何保护研究数据"
                      />
                      {renderError("dataProtection")}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confidentiality">保密措施</Label>
                      <Textarea
                        id="confidentiality"
                        value={formData.confidentiality}
                        onChange={(e) => handleChange("confidentiality", e.target.value)}
                        className="min-h-[80px]"
                        placeholder="描述如何保护参与者隐私"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="compensationDetails">补偿详情</Label>
                      <Textarea
                        id="compensationDetails"
                        value={formData.compensationDetails}
                        onChange={(e) => handleChange("compensationDetails", e.target.value)}
                        className="min-h-[80px]"
                        placeholder="描述参与者补偿方案（如有）"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        是否存在利益冲突 <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.conflictOfInterest}
                        onValueChange={(value) => handleChange("conflictOfInterest", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="conflict-yes" />
                          <Label htmlFor="conflict-yes">是</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="conflict-no" />
                          <Label htmlFor="conflict-no">否</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.conflictOfInterest === "yes" && (
                      <div className="space-y-2">
                        <Label htmlFor="conflictDetails">
                          利益冲突详情 <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="conflictDetails"
                          value={formData.conflictDetails}
                          onChange={(e) => handleChange("conflictDetails", e.target.value)}
                          className={`min-h-[80px] ${formErrors.conflictDetails ? "border-red-500" : ""}`}
                          placeholder="描述利益冲突的性质和管理方法"
                        />
                        {renderError("conflictDetails")}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={goToPrevTab}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      上一步
                    </Button>
                    <Button onClick={goToNextTab}>
                      下一步
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="file-upload" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>文件上传</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>上传必要的研究文档</AlertTitle>
                      <AlertDescription>
                        请上传与研究相关的文档，如研究方案、知情同意书、问卷等。支持PDF、Word、Excel和图片格式。
                      </AlertDescription>
                    </Alert>

                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">拖放文件到此处或点击上传</p>
                      <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
                      <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                        选择文件
                      </Button>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>已上传文件</Label>
                        <div className="border rounded-md divide-y">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(index)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={goToPrevTab}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      上一步
                    </Button>
                    <Button onClick={goToNextTab}>
                      下一步
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="declaration" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>声明与确认</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>重要声明</AlertTitle>
                      <AlertDescription>
                        请仔细阅读以下声明，并确认您同意这些条款。提交申请即表示您承诺遵守相关伦理准则和法规。
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="declarationAccuracy"
                          checked={formData.declarationAccuracy}
                          onCheckedChange={(checked) => handleChange("declarationAccuracy", checked === true)}
                          className={formErrors.declarationAccuracy ? "border-red-500" : ""}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="declarationAccuracy" className="font-medium">
                            我确认本申请中提供的所有信息真实准确 <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            我理解提供虚假信息可能导致申请被拒绝或已获批准的研究被终止。
                          </p>
                          {renderError("declarationAccuracy")}
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="declarationCompliance"
                          checked={formData.declarationCompliance}
                          onCheckedChange={(checked) => handleChange("declarationCompliance", checked === true)}
                          className={formErrors.declarationCompliance ? "border-red-500" : ""}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="declarationCompliance" className="font-medium">
                            我承诺遵守相关伦理准则和法规 <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            我将按照国家和国际伦理准则开展研究，保护参与者的权益和福祉。
                          </p>
                          {renderError("declarationCompliance")}
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="declarationReporting"
                          checked={formData.declarationReporting}
                          onCheckedChange={(checked) => handleChange("declarationReporting", checked === true)}
                          className={formErrors.declarationReporting ? "border-red-500" : ""}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="declarationReporting" className="font-medium">
                            我承诺及时报告研究过程中的任何不良事件或问题 <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            如研究过程中出现任何不良事件、偏离方案或其他问题，我将及时向伦理委员会报告。
                          </p>
                          {renderError("declarationReporting")}
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="declarationResponsibility"
                          checked={formData.declarationResponsibility}
                          onCheckedChange={(checked) => handleChange("declarationResponsibility", checked === true)}
                          className={formErrors.declarationResponsibility ? "border-red-500" : ""}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="declarationResponsibility" className="font-medium">
                            我理解并接受作为主要研究者的责任 <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            我将对研究的伦理实施负全责，确保所有研究人员遵守伦理要求。
                          </p>
                          {renderError("declarationResponsibility")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={goToPrevTab}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      上一步
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handlePreview}>
                        <Eye className="h-4 w-4 mr-2" />
                        预览
                      </Button>
                      <Button onClick={handleSubmit}>
                        <Send className="h-4 w-4 mr-2" />
                        提交
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </div>

      {/* 预览对话框 */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>申请预览</DialogTitle>
            <DialogDescription>请检查您的申请内容，确认无误后可以提交</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold">基本信息</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">项目标题</p>
                    <p>{formData.projectTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">主要研究者</p>
                    <p>{formData.principalInvestigator}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">部门</p>
                    <p>{formData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">联系邮箱</p>
                    <p>{formData.contactEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">联系电话</p>
                    <p>{formData.contactPhone || "未提供"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">申请日期</p>
                    <p>{formData.applicationDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">研究设计</h3>
                <div className="space-y-3 mt-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">研究目标</p>
                    <p className="whitespace-pre-line">{formData.researchObjective}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">研究背景</p>
                    <p className="whitespace-pre-line">{formData.researchBackground || "未提供"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">研究方法</p>
                    <p className="whitespace-pre-line">{formData.methodology}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">参与者选择标准</p>
                    <p className="whitespace-pre-line">{formData.participantSelection}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">样本量</p>
                    <p>{formData.sampleSize}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">研究持续时间</p>
                    <p>{formData.studyDuration || "未提供"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">伦理考虑</h3>
                <div className="space-y-3 mt-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">潜在风险</p>
                    <p className="whitespace-pre-line">{formData.potentialRisks}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">风险管理措施</p>
                    <p className="whitespace-pre-line">{formData.riskManagement}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">预期收益</p>
                    <p className="whitespace-pre-line">{formData.anticipatedBenefits || "未提供"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">是否需要知情同意</p>
                    <p>{formData.informedConsent === "yes" ? "是" : "否"}</p>
                  </div>
                  {formData.informedConsent === "yes" && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">知情同意过程</p>
                      <p className="whitespace-pre-line">{formData.consentProcess}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">数据保护措施</p>
                    <p className="whitespace-pre-line">{formData.dataProtection}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">保密措施</p>
                    <p className="whitespace-pre-line">{formData.confidentiality || "未提供"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">补偿详情</p>
                    <p className="whitespace-pre-line">{formData.compensationDetails || "未提供"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">是否存在利益冲突</p>
                    <p>{formData.conflictOfInterest === "yes" ? "是" : "否"}</p>
                  </div>
                  {formData.conflictOfInterest === "yes" && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">利益冲突详情</p>
                      <p className="whitespace-pre-line">{formData.conflictDetails}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">上传文件</h3>
                {uploadedFiles.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="text-sm">
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-muted-foreground">未上传文件</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">声明与确认</h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li className="text-sm flex items-start gap-2">
                    {formData.declarationAccuracy ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>我确认本申请中提供的所有信息真实准确</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    {formData.declarationCompliance ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>我承诺遵守相关伦理准则和法规</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    {formData.declarationReporting ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>我承诺及时报告研究过程中的任何不良事件或问题</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    {formData.declarationResponsibility ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>我理解并接受作为主要研究者的责任</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              返回编辑
            </Button>
            <Button onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-2" />
              提交申请
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 提交确认对话框 */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认提交</DialogTitle>
            <DialogDescription>提交后，您将无法再编辑此申请，直到伦理委员会审核完成。</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>重要提示</AlertTitle>
              <AlertDescription>
                请确保您已仔细检查所有信息，并上传了所有必要的文件。提交后将进入审核流程。
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              返回编辑
            </Button>
            <Button onClick={confirmSubmit}>确认提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
