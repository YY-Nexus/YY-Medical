"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Copy, Edit, Plus, Search, Trash2, Variable } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 模拟通知模板数据
const templateData = [
  {
    id: "tpl-001",
    name: "预约提醒",
    type: "短信",
    subject: "您的医疗预约提醒",
    content:
      "尊敬的{{患者姓名}}，提醒您与{{医生姓名}}的预约将于{{预约时间}}在{{预约地点}}进行。如需取消或改期，请提前联系我们。",
    variables: ["患者姓名", "医生姓名", "预约时间", "预约地点"],
    lastUpdated: "2025-05-10",
  },
  {
    id: "tpl-002",
    name: "检查结果通知",
    type: "电子邮件",
    subject: "您的医疗检查结果已出",
    content:
      "尊敬的{{患者姓名}}，您于{{检查日期}}进行的{{检查类型}}检查结果已出，请登录患者门户查看或前往医院领取纸质报告。如有疑问，请联系您的主治医生{{医生姓名}}。",
    variables: ["患者姓名", "检查日期", "检查类型", "医生姓名"],
    lastUpdated: "2025-05-08",
  },
  {
    id: "tpl-003",
    name: "药物提醒",
    type: "应用推送",
    subject: "用药提醒",
    content: "请记得按时服用{{药物名称}}，剂量：{{剂量}}，每日{{服用次数}}次。",
    variables: ["药物名称", "剂量", "服用次数"],
    lastUpdated: "2025-05-05",
  },
  {
    id: "tpl-004",
    name: "随访提醒",
    type: "短信",
    subject: "随访提醒",
    content:
      "尊敬的{{患者姓名}}，根据您的治疗计划，请于{{随访日期}}前往{{随访地点}}进行随访。如有疑问，请联系{{联系电话}}。",
    variables: ["患者姓名", "随访日期", "随访地点", "联系电话"],
    lastUpdated: "2025-05-01",
  },
]

// 可用变量列表
const availableVariables = [
  "患者姓名",
  "患者ID",
  "医生姓名",
  "医生ID",
  "预约时间",
  "预约地点",
  "检查日期",
  "检查类型",
  "检查结果",
  "药物名称",
  "剂量",
  "服用次数",
  "随访日期",
  "随访地点",
  "联系电话",
  "医院名称",
  "科室名称",
  "账单金额",
  "支付截止日期",
]

export function NotificationTemplates() {
  const { toast } = useToast()
  const [templates, setTemplates] = useState(templateData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<any>(null)
  const [isNewTemplate, setIsNewTemplate] = useState(false)
  const [newVariable, setNewVariable] = useState("")
  const [previewData, setPreviewData] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState("edit")

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleOpenDialog = (template?: any) => {
    if (template) {
      setCurrentTemplate({ ...template })
      setIsNewTemplate(false)
    } else {
      setCurrentTemplate({
        id: `tpl-${Math.floor(Math.random() * 1000)}`,
        name: "",
        type: "短信",
        subject: "",
        content: "",
        variables: [],
        lastUpdated: new Date().toISOString().split("T")[0],
      })
      setIsNewTemplate(true)
    }

    // 初始化预览数据
    const previewObj: Record<string, string> = {}
    if (template) {
      template.variables.forEach((variable: string) => {
        previewObj[variable] = `[${variable}示例]`
      })
    }
    setPreviewData(previewObj)

    setActiveTab("edit")
    setIsDialogOpen(true)
  }

  const handleSaveTemplate = () => {
    // 验证必填字段
    if (!currentTemplate.name || !currentTemplate.subject || !currentTemplate.content) {
      toast({
        title: "无法保存模板",
        description: "请填写所有必填字段（名称、主题和内容）。",
        variant: "destructive",
      })
      return
    }

    if (isNewTemplate) {
      setTemplates([...templates, currentTemplate])
      toast({
        title: "模板已创建",
        description: `通知模板 "${currentTemplate.name}" 已成功创建。`,
      })
    } else {
      setTemplates(templates.map((template) => (template.id === currentTemplate.id ? currentTemplate : template)))
      toast({
        title: "模板已更新",
        description: `通知模板 "${currentTemplate.name}" 已成功更新。`,
      })
    }
    setIsDialogOpen(false)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
    toast({
      title: "模板已删除",
      description: "所选通知模板已成功删除。",
    })
  }

  const handleDuplicateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: `tpl-${Math.floor(Math.random() * 1000)}`,
      name: `${template.name} (副本)`,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setTemplates([...templates, newTemplate])
    toast({
      title: "模板已复制",
      description: `通知模板 "${template.name}" 的副本已创建。`,
    })
  }

  const handleAddVariable = (variable: string) => {
    if (!variable) return

    if (!currentTemplate.variables.includes(variable)) {
      const updatedTemplate = {
        ...currentTemplate,
        variables: [...currentTemplate.variables, variable],
        content: currentTemplate.content + ` {{${variable}}}`,
      }
      setCurrentTemplate(updatedTemplate)

      // 更新预览数据
      setPreviewData({
        ...previewData,
        [variable]: `[${variable}示例]`,
      })

      setNewVariable("")
    } else {
      toast({
        title: "变量已存在",
        description: `变量 "${variable}" 已在模板中使用。`,
        variant: "destructive",
      })
    }
  }

  const handleRemoveVariable = (variable: string) => {
    const updatedVariables = currentTemplate.variables.filter((v: string) => v !== variable)
    const updatedContent = currentTemplate.content.replace(new RegExp(`{{${variable}}}`, "g"), "")

    setCurrentTemplate({
      ...currentTemplate,
      variables: updatedVariables,
      content: updatedContent,
    })

    // 更新预览数据
    const newPreviewData = { ...previewData }
    delete newPreviewData[variable]
    setPreviewData(newPreviewData)
  }

  const handlePreviewDataChange = (variable: string, value: string) => {
    setPreviewData({
      ...previewData,
      [variable]: value,
    })
  }

  const getPreviewContent = () => {
    let previewContent = currentTemplate.content
    Object.entries(previewData).forEach(([variable, value]) => {
      previewContent = previewContent.replace(new RegExp(`{{${variable}}}`, "g"), value)
    })
    return previewContent
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "短信":
        return "bg-blue-100 text-blue-800"
      case "电子邮件":
        return "bg-green-100 text-green-800"
      case "应用推送":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>通知模板</CardTitle>
            <CardDescription>管理系统中使用的各类通知模板</CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            创建模板
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索模板..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>模板名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>主题</TableHead>
                <TableHead>变量</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    没有找到匹配的模板
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(template.type)}>
                        {template.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.subject}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable: string) => (
                          <Badge key={variable} variant="outline" className="bg-gray-100">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{template.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(template)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">编辑</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDuplicateTemplate(template)}>
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">复制</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">删除</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* 模板编辑对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{isNewTemplate ? "创建通知模板" : "编辑通知模板"}</DialogTitle>
            <DialogDescription>
              {isNewTemplate ? "创建新的通知模板，用于系统自动发送的通知消息。" : "修改现有通知模板的内容和配置。"}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">编辑模板</TabsTrigger>
              <TabsTrigger value="preview">预览效果</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      模板名称 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={currentTemplate?.name || ""}
                      onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      通知类型
                    </Label>
                    <Select
                      value={currentTemplate?.type || "短信"}
                      onValueChange={(value) => setCurrentTemplate({ ...currentTemplate, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="选择通知类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="短信">短信</SelectItem>
                        <SelectItem value="电子邮件">电子邮件</SelectItem>
                        <SelectItem value="应用推送">应用推送</SelectItem>
                        <SelectItem value="微信">微信</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      通知主题 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      value={currentTemplate?.subject || ""}
                      onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right pt-2">
                      通知内容 <span className="text-red-500">*</span>
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <Textarea
                        id="content"
                        value={currentTemplate?.content || ""}
                        onChange={(e) => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                        rows={6}
                      />
                      <p className="text-sm text-muted-foreground">
                        使用 {"{{变量名}}"} 格式插入变量，例如 {"{{患者姓名}}"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">变量管理</Label>
                    <div className="col-span-3 space-y-4">
                      <div className="flex gap-2">
                        <Select value={newVariable} onValueChange={setNewVariable}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="选择变量" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableVariables.map((variable) => (
                              <SelectItem key={variable} value={variable}>
                                {variable}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" onClick={() => handleAddVariable(newVariable)} disabled={!newVariable}>
                          <Plus className="h-4 w-4 mr-2" />
                          添加变量
                        </Button>
                      </div>

                      {currentTemplate?.variables?.length > 0 ? (
                        <div className="border rounded-md p-3 bg-gray-50">
                          <div className="text-sm font-medium mb-2">已使用的变量：</div>
                          <div className="flex flex-wrap gap-2">
                            {currentTemplate.variables.map((variable: string) => (
                              <Badge key={variable} className="flex items-center gap-1 bg-white">
                                <Variable className="h-3 w-3" />
                                {variable}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 ml-1 hover:bg-red-100 hover:text-red-600 rounded-full"
                                  onClick={() => handleRemoveVariable(variable)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">移除</span>
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            尚未添加任何变量。变量可以使模板更加灵活，根据不同情况显示不同内容。
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">预览效果</h3>
                    <p className="text-sm text-muted-foreground">以下是根据当前模板和变量值生成的预览效果</p>
                  </div>

                  <div className="border rounded-md p-4 bg-white">
                    <div className="font-medium mb-1">主题：{currentTemplate?.subject}</div>
                    <div className="whitespace-pre-line">{getPreviewContent()}</div>
                  </div>

                  {currentTemplate?.variables?.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">变量值设置（仅用于预览）</h4>
                      <div className="grid gap-3">
                        {currentTemplate.variables.map((variable: string) => (
                          <div key={variable} className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">{variable}</Label>
                            <Input
                              value={previewData[variable] || ""}
                              onChange={(e) => handlePreviewDataChange(variable, e.target.value)}
                              placeholder={`输入${variable}的示例值`}
                              className="col-span-3"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveTemplate}>
              <Check className="mr-2 h-4 w-4" />
              {isNewTemplate ? "创建模板" : "保存更改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
