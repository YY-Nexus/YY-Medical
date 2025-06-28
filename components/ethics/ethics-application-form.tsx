"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Upload, Save, Send, AlertCircle, CheckCircle, Info, Download, Eye, Printer } from "lucide-react"

interface EthicsApplicationFormProps {
  experimentId: string
  onSubmit: (data: any) => void
  onSaveDraft: (data: any) => void
}

export function EthicsApplicationForm({ experimentId, onSubmit, onSaveDraft }: EthicsApplicationFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  // 模拟表单数据
  const [formData, setFormData] = useState({
    title: "糖尿病患者血清生物标志物分析",
    principalInvestigator: "张教授",
    department: "内分泌���",
    startDate: "2023-10-01",
    endDate: "2024-03-31",
    fundingSource: "国家自然科学基金",
    fundingAmount: "150000",
    researchType: "clinical",
    involveHumans: true,
    involveAnimals: false,
    sampleSize: "200",
    objective: "识别2型糖尿病患者特异性血清生物标志物，评估其在疾病早期诊断中的价值",
    background: "2型糖尿病是一种常见的代谢性疾病，早期诊断对于预防并发症至关重要。目前缺乏特异性高的早期诊断标志物。",
    methods: "采集糖尿病患者和健康对照者的血清样本，使用液相色谱-质谱联用技术进行蛋白质组学分析，筛选差异表达蛋白。",
    risks: "采血可能导致轻微疼痛、瘀血或感染，但风险极低。",
    benefits: "参与者将获得免费的血液检查结果。研究可能有助于发现糖尿病早期诊断的新方法。",
    dataProtection:
      "所有样本和数据将被匿名化处理，仅用于研究目的。数据将存储在加密服务器上，只有研究团队成员可以访问。",
    informedConsent: true,
    vulnerableGroups: false,
    conflictOfInterest: false,
    attachments: [
      { name: "研究方案.pdf", size: "2.4 MB", uploaded: "2023-09-15" },
      { name: "知情同意书.docx", size: "1.1 MB", uploaded: "2023-09-15" },
      { name: "调查问卷.pdf", size: "0.8 MB", uploaded: "2023-09-15" },
    ],
  })

  // 处理表单变更
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理表单提交
  const handleSubmit = () => {
    onSubmit(formData)
    setShowSubmitDialog(false)
  }

  // 处理保存草稿
  const handleSaveDraft = () => {
    onSaveDraft(formData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>伦理审查申请</CardTitle>
          <CardDescription>填写研究项目的伦理审查申请表</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">基本信息</TabsTrigger>
                <TabsTrigger value="research">研究设计</TabsTrigger>
                <TabsTrigger value="ethics">伦理考虑</TabsTrigger>
                <TabsTrigger value="documents">文件上传</TabsTrigger>
                <TabsTrigger value="declaration">声明与确认</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-350px)]">
              <TabsContent value="basic" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">研究项目标题</Label>
                    <Input id="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="principalInvestigator">主要研究者</Label>
                    <Input
                      id="principalInvestigator"
                      value={formData.principalInvestigator}
                      onChange={(e) => handleChange("principalInvestigator", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">所属部门</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleChange("department", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="researchType">研究类型</Label>
                    <Select
                      value={formData.researchType}
                      onValueChange={(value) => handleChange("researchType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择研究类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clinical">临床研究</SelectItem>
                        <SelectItem value="animal">动物实验</SelectItem>
                        <SelectItem value="invitro">体外研究</SelectItem>
                        <SelectItem value="epidemiological">流行病学研究</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">开始日期</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">结束日期</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fundingSource">资金来源</Label>
                    <Input
                      id="fundingSource"
                      value={formData.fundingSource}
                      onChange={(e) => handleChange("fundingSource", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fundingAmount">资金金额 (元)</Label>
                    <Input
                      id="fundingAmount"
                      type="number"
                      value={formData.fundingAmount}
                      onChange={(e) => handleChange("fundingAmount", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>研究对象</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="involveHumans"
                          checked={formData.involveHumans}
                          onCheckedChange={(checked) => handleChange("involveHumans", checked)}
                        />
                        <Label htmlFor="involveHumans">涉及人类受试者</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="involveAnimals"
                          checked={formData.involveAnimals}
                          onCheckedChange={(checked) => handleChange("involveAnimals", checked)}
                        />
                        <Label htmlFor="involveAnimals">涉及动物实验</Label>
                      </div>
                    </div>
                  </div>

                  {formData.involveHumans && (
                    <div className="space-y-2">
                      <Label htmlFor="sampleSize">样本量</Label>
                      <Input
                        id="sampleSize"
                        type="number"
                        value={formData.sampleSize}
                        onChange={(e) => handleChange("sampleSize", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="research" className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="objective">研究目标</Label>
                  <Textarea
                    id="objective"
                    rows={3}
                    value={formData.objective}
                    onChange={(e) => handleChange("objective", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">研究背景</Label>
                  <Textarea
                    id="background"
                    rows={5}
                    value={formData.background}
                    onChange={(e) => handleChange("background", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="methods">研究方法</Label>
                  <Textarea
                    id="methods"
                    rows={5}
                    value={formData.methods}
                    onChange={(e) => handleChange("methods", e.target.value)}
                  />
                </div>

                <div className="p-4 border rounded-md bg-blue-50">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">提示</p>
                      <p className="text-sm text-blue-600">
                        请详细描述研究方法，包括受试者招募、数据收集、干预措施和随访计划等。如果涉及侵入性操作，请详细说明操作流程和安全措施。
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ethics" className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="risks">潜在风险</Label>
                  <Textarea
                    id="risks"
                    rows={3}
                    value={formData.risks}
                    onChange={(e) => handleChange("risks", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">预期收益</Label>
                  <Textarea
                    id="benefits"
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) => handleChange("benefits", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataProtection">数据保护措施</Label>
                  <Textarea
                    id="dataProtection"
                    rows={3}
                    value={formData.dataProtection}
                    onChange={(e) => handleChange("dataProtection", e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="informedConsent"
                      checked={formData.informedConsent}
                      onCheckedChange={(checked) => handleChange("informedConsent", checked)}
                    />
                    <Label htmlFor="informedConsent">我确认将获取所有参与者的知情同意</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vulnerableGroups"
                      checked={formData.vulnerableGroups}
                      onCheckedChange={(checked) => handleChange("vulnerableGroups", checked)}
                    />
                    <Label htmlFor="vulnerableGroups">研究涉及弱势群体(儿童、孕妇、囚犯、认知障碍者等)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="conflictOfInterest"
                      checked={formData.conflictOfInterest}
                      onCheckedChange={(checked) => handleChange("conflictOfInterest", checked)}
                    />
                    <Label htmlFor="conflictOfInterest">存在潜在利益冲突</Label>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-yellow-50">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-700">注意</p>
                      <p className="text-sm text-yellow-600">
                        如果您的研究涉及弱势群体或存在利益冲突，请在上传文件部分提供额外的说明文件。
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>必要文件</Label>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Upload className="h-4 w-4" />
                      上传文件
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">已上传文件</div>
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="font-medium">{file.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {file.size} · 上传于 {file.uploaded}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="required-documents">
                    <AccordionTrigger>必要文件清单</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>详细研究方案</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>知情同意书模板</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>调查问卷或数据收集表格</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>招募广告或材料(如适用)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>研究者履历(CV)</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="p-4 border rounded-md bg-blue-50">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">文件要求</p>
                      <p className="text-sm text-blue-600">
                        请上传所有必要文件。文件格式支持PDF、DOC、DOCX、XLS、XLSX，单个文件大小不超过10MB。
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="declaration" className="p-6 space-y-6">
                <div className="p-4 border rounded-md">
                  <div className="font-medium mb-4">申请人声明</div>
                  <div className="space-y-4 text-sm">
                    <p>本人声明：</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>本申请表中提供的所有信息真实、准确、完整。</li>
                      <li>研究将按照伦理委员会批准的方案进行，任何实质性变更将重新提交审批。</li>
                      <li>研究将遵守《赫尔辛基宣言》和相关伦理准则的原则。</li>
                      <li>研究将确保参与者的权益、安全和福祉。</li>
                      <li>研究数据将按照数据保护法规和机构政策进行管理。</li>
                      <li>研究完成后将向伦理委员会提交总结报告。</li>
                    </ol>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="declaration" />
                  <Label htmlFor="declaration">我已阅读并同意上述声明，确认申请中提供的信息真实准确。</Label>
                </div>

                <div className="p-4 border rounded-md bg-yellow-50">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-700">提交前检查</p>
                      <p className="text-sm text-yellow-600">
                        提交前请确保所有必填字段已完成，所有必要文件已上传。提交后将无法修改申请内容，直到伦理委员会审查完成。
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1" onClick={handleSaveDraft}>
              <Save className="h-4 w-4" />
              保存草稿
            </Button>
            <Button variant="outline" className="flex items-center gap-1" onClick={() => setShowPreviewDialog(true)}>
              <Eye className="h-4 w-4" />
              预览
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">取消</Button>
            <Button onClick={() => setShowSubmitDialog(true)}>
              <Send className="h-4 w-4 mr-2" />
              提交申请
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* 预览对话框 */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>申请预览</DialogTitle>
            <DialogDescription>预览您的伦理审查申请</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{formData.title}</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                打印
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">主要研究者</div>
                <div className="font-medium">{formData.principalInvestigator}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">所属部门</div>
                <div className="font-medium">{formData.department}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">研究类型</div>
                <div className="font-medium">
                  {formData.researchType === "clinical"
                    ? "临床研究"
                    : formData.researchType === "animal"
                      ? "动物实验"
                      : formData.researchType === "invitro"
                        ? "体外研究"
                        : formData.researchType === "epidemiological"
                          ? "流行病学研究"
                          : "其他"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">研究周期</div>
                <div className="font-medium">
                  {formData.startDate} 至 {formData.endDate}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-medium mb-1">研究目标</div>
                <p className="text-sm">{formData.objective}</p>
              </div>
              <div>
                <div className="font-medium mb-1">研究背景</div>
                <p className="text-sm">{formData.background}</p>
              </div>
              <div>
                <div className="font-medium mb-1">研究方法</div>
                <p className="text-sm">{formData.methods}</p>
              </div>
              <div>
                <div className="font-medium mb-1">潜在风险</div>
                <p className="text-sm">{formData.risks}</p>
              </div>
              <div>
                <div className="font-medium mb-1">预期收益</div>
                <p className="text-sm">{formData.benefits}</p>
              </div>
              <div>
                <div className="font-medium mb-1">数据保护措施</div>
                <p className="text-sm">{formData.dataProtection}</p>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">已上传文件</div>
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span>{file.name}</span>
                    <span className="text-muted-foreground">({file.size})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 提交确认对话框 */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认提交</DialogTitle>
            <DialogDescription>提交后将无法修改申请内容，直到伦理委员会审查完成。</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>您确定要提交此伦理审查申请吗？</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit}>确认提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
