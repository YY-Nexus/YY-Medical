"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Search, Star, Copy, Eye, Trash2, StarOff, Filter, Users, UserCircle, Calendar } from "lucide-react"

// 模拟伦理申请模板数据
const mockTemplates = [
  {
    id: "template-001",
    title: "临床研究伦理申请标准模板",
    type: "clinical",
    description: "适用于一般临床研究的伦理申请模板，包含完整的风险评估和数据保护措施",
    createdBy: "张教授",
    createdDate: "2023-05-15",
    lastUsed: "2023-09-20",
    usageCount: 42,
    isPublic: true,
    isFavorite: true,
    tags: ["临床研究", "标准模板", "人类受试者"],
  },
  {
    id: "template-002",
    title: "动物实验伦理申请模板",
    type: "animal",
    description: "适用于动物实验的伦理申请模板，符合国家实验动物伦理规范",
    createdBy: "李研究员",
    createdDate: "2023-06-10",
    lastUsed: "2023-08-15",
    usageCount: 28,
    isPublic: true,
    isFavorite: false,
    tags: ["动物实验", "3R原则", "福利保障"],
  },
  {
    id: "template-003",
    title: "弱势群体研究伦理申请模板",
    type: "clinical",
    description: "适用于涉及弱势群体(儿童、孕妇等)的研究伦理申请，包含额外保护措施",
    createdBy: "王主任",
    createdDate: "2023-07-22",
    lastUsed: "2023-10-05",
    usageCount: 15,
    isPublic: true,
    isFavorite: true,
    tags: ["弱势群体", "特殊保护", "临床研究"],
  },
  {
    id: "template-004",
    title: "流行病学调查伦理申请模板",
    type: "epidemiological",
    description: "适用于流行病学调查研究的伦理申请，重点关注数据隐私和知情同意",
    createdBy: "赵研究员",
    createdDate: "2023-04-30",
    lastUsed: "2023-09-12",
    usageCount: 23,
    isPublic: true,
    isFavorite: false,
    tags: ["流行病学", "数据隐私", "大样本"],
  },
  {
    id: "template-005",
    title: "我的药物试验伦理申请",
    type: "clinical",
    description: "个人定制的药物试验伦理申请模板，包含特定的安全监测计划",
    createdBy: "当前用户",
    createdDate: "2023-08-05",
    lastUsed: "2023-10-10",
    usageCount: 3,
    isPublic: false,
    isFavorite: true,
    tags: ["药物试验", "安全监测", "个人模板"],
  },
]

interface EthicsTemplateManagerProps {
  onSelectTemplate: (templateId: string) => void
  onClose: () => void
}

export function EthicsTemplateManager({ onSelectTemplate, onClose }: EthicsTemplateManagerProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof mockTemplates)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [templates, setTemplates] = useState(mockTemplates)

  // 过滤模板
  const filteredTemplates = templates.filter((template) => {
    // 搜索过滤
    if (
      searchTerm &&
      !template.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !template.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // 标签页过滤
    if (activeTab === "favorites" && !template.isFavorite) return false
    if (activeTab === "my" && template.createdBy !== "当前用户") return false
    if (activeTab === "clinical" && template.type !== "clinical") return false
    if (activeTab === "animal" && template.type !== "animal") return false

    return true
  })

  // 预览模板
  const handlePreview = (template: (typeof mockTemplates)[0]) => {
    setSelectedTemplate(template)
    setShowPreviewDialog(true)
  }

  // 应用模板
  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate.id)
      setShowPreviewDialog(false)
      onClose()
    }
  }

  // 切换收藏状态
  const toggleFavorite = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId ? { ...template, isFavorite: !template.isFavorite } : template,
      ),
    )
  }

  // 删除模板
  const handleDeleteTemplate = () => {
    if (selectedTemplate) {
      setTemplates((prev) => prev.filter((template) => template.id !== selectedTemplate.id))
      setShowDeleteDialog(false)
      setSelectedTemplate(null)
    }
  }

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "clinical":
        return <Users className="h-4 w-4 text-blue-500" />
      case "animal":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "epidemiological":
        return <Users className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>伦理申请模板</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索模板..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="favorites">收藏</TabsTrigger>
              <TabsTrigger value="my">我的模板</TabsTrigger>
              <TabsTrigger value="clinical">临床研究</TabsTrigger>
              <TabsTrigger value="animal">动物实验</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[400px] px-6 py-4">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(template.type)}
                          <CardTitle className="text-base">{template.title}</CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(template.id)}
                        className="h-8 w-8"
                      >
                        {template.isFavorite ? (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <UserCircle className="h-3.5 w-3.5" />
                          <span>{template.createdBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{template.createdDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Copy className="h-3.5 w-3.5" />
                          <span>使用 {template.usageCount} 次</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handlePreview(template)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        预览
                      </Button>
                      <Button
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          setSelectedTemplate(template)
                          handleApplyTemplate()
                        }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        应用
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                <Filter className="h-12 w-12 mb-4 opacity-20" />
                <p>未找到匹配的模板</p>
                <p className="text-sm">尝试使用不同的搜索词或筛选条件</p>
              </div>
            )}
          </ScrollArea>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="outline" onClick={onClose}>
          关闭
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          高级筛选
        </Button>
      </CardFooter>

      {/* 预览对话框 */}
      {selectedTemplate && (
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>模板预览</DialogTitle>
              <DialogDescription>查看模板详情并决定是否应用</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedTemplate.title}</h2>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTemplate.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedTemplate.id)}>
                    {selectedTemplate.isFavorite ? (
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <StarOff className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowPreviewDialog(false)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">创建者</Label>
                  <p>{selectedTemplate.createdBy}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">创建日期</Label>
                  <p>{selectedTemplate.createdDate}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">最后使用</Label>
                  <p>{selectedTemplate.lastUsed}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">使用次数</Label>
                  <p>{selectedTemplate.usageCount} 次</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">描述</Label>
                <p className="text-sm">{selectedTemplate.description}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">模板内容预览</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">研究目标</p>
                    <p className="text-sm">
                      该模板包含标准化的研究目标描述框架，帮助研究者清晰表达研究意图和预期成果。
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">潜在风险</p>
                    <p className="text-sm">
                      包含全面的风险评估框架，涵盖受试者可能面临的身体、心理和社会风险，以及相应的风险管理措施。
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">数据保护</p>
                    <p className="text-sm">
                      详细的数据保护方案，包括数据匿名化、安全存储和访问控制措施，符合最新的数据保护法规要求。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                取消
              </Button>
              <Button onClick={handleApplyTemplate}>应用此模板</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 删除确认对话框 */}
      {selectedTemplate && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认删除</DialogTitle>
              <DialogDescription>您确定要删除此模板吗？此操作无法撤销。</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="font-medium">{selectedTemplate.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedTemplate.description}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                取消
              </Button>
              <Button variant="destructive" onClick={handleDeleteTemplate}>
                确认删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
