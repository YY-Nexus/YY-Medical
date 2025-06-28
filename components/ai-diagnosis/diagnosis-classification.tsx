"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, CheckCircle, AlertCircle, Clock, FileText, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

// 模拟分类标签数据
const mockTags = [
  { id: "tag-001", name: "肺结节", color: "blue", count: 45, autoApply: true },
  { id: "tag-002", name: "肺炎", color: "red", count: 32, autoApply: true },
  { id: "tag-003", name: "肺气肿", color: "purple", count: 18, autoApply: true },
  { id: "tag-004", name: "胸腔积液", color: "green", count: 24, autoApply: true },
  { id: "tag-005", name: "正常", color: "gray", count: 120, autoApply: true },
  { id: "tag-006", name: "需要复查", color: "amber", count: 15, autoApply: false },
  { id: "tag-007", name: "紧急", color: "red", count: 8, autoApply: false },
  { id: "tag-008", name: "已确认", color: "green", count: 95, autoApply: false },
]

// 模拟诊断结果数据
const mockDiagnoses = [
  {
    id: "diag-001",
    patientId: "P-20230501",
    patientName: "张三",
    diagnosis: "肺结节",
    confidence: 0.92,
    status: "confirmed",
    date: "2023-10-15",
    tags: ["tag-001", "tag-008"],
  },
  {
    id: "diag-002",
    patientId: "P-20230502",
    patientName: "李四",
    diagnosis: "肺炎",
    confidence: 0.88,
    status: "pending",
    date: "2023-10-16",
    tags: ["tag-002", "tag-006"],
  },
  {
    id: "diag-003",
    patientId: "P-20230503",
    patientName: "王五",
    diagnosis: "正常",
    confidence: 0.95,
    status: "confirmed",
    date: "2023-10-17",
    tags: ["tag-005", "tag-008"],
  },
  {
    id: "diag-004",
    patientId: "P-20230504",
    patientName: "赵六",
    diagnosis: "肺气肿",
    confidence: 0.85,
    status: "pending",
    date: "2023-10-18",
    tags: ["tag-003", "tag-007"],
  },
]

// 标签颜色映射
const tagColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  amber: "bg-amber-100 text-amber-800",
  gray: "bg-gray-100 text-gray-800",
}

export function DiagnosisClassification() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("diagnoses")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTag, setFilterTag] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [tags, setTags] = useState(mockTags)
  const [diagnoses, setDiagnoses] = useState(mockDiagnoses)
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTag, setNewTag] = useState({
    name: "",
    color: "blue",
    autoApply: true,
  })
  const [editingTag, setEditingTag] = useState<string | null>(null)

  // 过滤诊断结果
  const filteredDiagnoses = diagnoses.filter((diagnosis) => {
    const matchesSearch =
      diagnosis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = filterTag === "all" || diagnosis.tags.includes(filterTag)
    const matchesStatus = filterStatus === "all" || diagnosis.status === filterStatus

    return matchesSearch && matchesTag && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 已确认
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> 待确认
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 已拒绝
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 获取标签徽章
  const getTagBadge = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId)
    if (!tag) return null

    return (
      <Badge key={tagId} className={`${tagColorMap[tag.color]} mr-1`}>
        {tag.name}
      </Badge>
    )
  }

  // 添加新标签
  const handleAddTag = () => {
    if (!newTag.name.trim()) {
      toast({
        title: "错误",
        description: "标签名称不能为空",
        variant: "destructive",
      })
      return
    }

    const newTagObj = {
      id: `tag-${Date.now()}`,
      name: newTag.name,
      color: newTag.color,
      count: 0,
      autoApply: newTag.autoApply,
    }

    setTags([...tags, newTagObj])
    setIsAddingTag(false)
    setNewTag({
      name: "",
      color: "blue",
      autoApply: true,
    })

    toast({
      title: "标签添加成功",
      description: `已添加新标签: ${newTag.name}`,
    })
  }

  // 更新标签
  const handleUpdateTag = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId)
    if (!tag) return

    setTags(
      tags.map((t) =>
        t.id === tagId ? { ...t, name: newTag.name || t.name, color: newTag.color, autoApply: newTag.autoApply } : t,
      ),
    )

    setEditingTag(null)
    setNewTag({
      name: "",
      color: "blue",
      autoApply: true,
    })

    toast({
      title: "标签更新成功",
      description: `已更新标签: ${tag.name}`,
    })
  }

  // 删除标签
  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId))

    // 从诊断结果中移除该标签
    setDiagnoses(
      diagnoses.map((diagnosis) => ({
        ...diagnosis,
        tags: diagnosis.tags.filter((id) => id !== tagId),
      })),
    )

    toast({
      title: "标签删除成功",
      description: "已删除标签",
    })
  }

  // 开始编辑标签
  const startEditTag = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId)
    if (!tag) return

    setNewTag({
      name: tag.name,
      color: tag.color,
      autoApply: tag.autoApply,
    })
    setEditingTag(tagId)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="diagnoses">诊断结果分类</TabsTrigger>
          <TabsTrigger value="tags">标签管理</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnoses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>诊断结果分类</CardTitle>
              <CardDescription>查看和管理已分类的诊断结果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索患者姓名、ID或诊断..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-40">
                    <Select value={filterTag} onValueChange={setFilterTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="标签" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有标签</SelectItem>
                        {tags.map((tag) => (
                          <SelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-40">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有状态</SelectItem>
                        <SelectItem value="confirmed">已确认</SelectItem>
                        <SelectItem value="pending">待确认</SelectItem>
                        <SelectItem value="rejected">已拒绝</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-slate-50 p-3 text-sm font-medium">
                  <div>患者ID</div>
                  <div>患者姓名</div>
                  <div>诊断结果</div>
                  <div>置信度</div>
                  <div>标签</div>
                  <div>状态</div>
                  <div className="text-right">操作</div>
                </div>
                <div className="divide-y">
                  {filteredDiagnoses.length > 0 ? (
                    filteredDiagnoses.map((diagnosis) => (
                      <div key={diagnosis.id} className="grid grid-cols-7 p-3 text-sm">
                        <div className="font-medium">{diagnosis.patientId}</div>
                        <div>{diagnosis.patientName}</div>
                        <div>{diagnosis.diagnosis}</div>
                        <div>{(diagnosis.confidence * 100).toFixed(1)}%</div>
                        <div className="flex flex-wrap gap-1">{diagnosis.tags.map((tagId) => getTagBadge(tagId))}</div>
                        <div>{getStatusBadge(diagnosis.status)}</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">未找到匹配的诊断记录</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>标签管理</CardTitle>
                  <CardDescription>创建和管理用于分类诊断结果的标签</CardDescription>
                </div>
                <Dialog open={isAddingTag} onOpenChange={setIsAddingTag}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      添加标签
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>添加新标签</DialogTitle>
                      <DialogDescription>创建新标签用于分类诊断结果</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="tag-name">标签名称</Label>
                        <Input
                          id="tag-name"
                          placeholder="例如: 肺结节"
                          value={newTag.name}
                          onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tag-color">标签颜色</Label>
                        <Select value={newTag.color} onValueChange={(value) => setNewTag({ ...newTag, color: value })}>
                          <SelectTrigger id="tag-color">
                            <SelectValue placeholder="选择颜色" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">蓝色</SelectItem>
                            <SelectItem value="red">红色</SelectItem>
                            <SelectItem value="green">绿色</SelectItem>
                            <SelectItem value="purple">紫色</SelectItem>
                            <SelectItem value="amber">琥珀色</SelectItem>
                            <SelectItem value="gray">灰色</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="auto-apply"
                          checked={newTag.autoApply}
                          onCheckedChange={(checked) => setNewTag({ ...newTag, autoApply: checked })}
                        />
                        <Label htmlFor="auto-apply">自动应用</Label>
                      </div>
                      <p className="text-xs text-gray-500">启用自动应用后，系统将根据诊断结果自动添加此标签</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingTag(false)}>
                        取消
                      </Button>
                      <Button onClick={handleAddTag}>添加标签</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tags.map((tag) => (
                  <Card key={tag.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className={tagColorMap[tag.color]}>{tag.name}</Badge>
                          <span className="text-sm text-gray-500">{tag.count} 个诊断结果</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => startEditTag(tag.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteTag(tag.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 mr-2">自动应用:</span>
                        {tag.autoApply ? (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> 已启用
                          </span>
                        ) : (
                          <span className="text-gray-600 flex items-center">
                            <AlertCircle className="h-3.5 w-3.5 mr-1" /> 已禁用
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 编辑标签对话框 */}
              {editingTag && (
                <Dialog open={!!editingTag} onOpenChange={(open) => !open && setEditingTag(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>编辑标签</DialogTitle>
                      <DialogDescription>修改标签属性</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-tag-name">标签名称</Label>
                        <Input
                          id="edit-tag-name"
                          placeholder="例如: 肺结节"
                          value={newTag.name}
                          onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-tag-color">标签颜色</Label>
                        <Select value={newTag.color} onValueChange={(value) => setNewTag({ ...newTag, color: value })}>
                          <SelectTrigger id="edit-tag-color">
                            <SelectValue placeholder="选择颜色" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">蓝色</SelectItem>
                            <SelectItem value="red">红色</SelectItem>
                            <SelectItem value="green">绿色</SelectItem>
                            <SelectItem value="purple">紫色</SelectItem>
                            <SelectItem value="amber">琥珀色</SelectItem>
                            <SelectItem value="gray">灰色</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="edit-auto-apply"
                          checked={newTag.autoApply}
                          onCheckedChange={(checked) => setNewTag({ ...newTag, autoApply: checked })}
                        />
                        <Label htmlFor="edit-auto-apply">自动应用</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditingTag(null)}>
                        取消
                      </Button>
                      <Button onClick={() => handleUpdateTag(editingTag)}>保存更改</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
