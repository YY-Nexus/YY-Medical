"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  History,
  MoreHorizontal,
  RotateCcw,
  Eye,
  Copy,
  ArrowDownToLine,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Diff,
} from "lucide-react"

// 模拟版本历史数据
const versionHistory = [
  {
    id: "v1.0.0",
    name: "初始版本",
    timestamp: "2023-09-10 10:30",
    user: "张医生",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
    changes: [
      { type: "add", section: "研究目标", description: "添加了研究目标和假设" },
      { type: "add", section: "研究组", description: "设置了干预组和对照组" },
      { type: "add", section: "样本量", description: "初步计算样本量" },
    ],
    status: "stable",
    comment: "初始设计版本",
  },
  {
    id: "v1.1.0",
    name: "更新统计方法",
    timestamp: "2023-09-12 15:45",
    user: "李教授",
    avatar: "/placeholder.svg?height=40&width=40&query=李",
    changes: [
      { type: "modify", section: "统计分析", description: "更新了统计分析方法" },
      { type: "modify", section: "样本量", description: "根据新的统计方法调整样本量" },
    ],
    status: "stable",
    comment: "根据研究目标优化统计分析方法",
  },
  {
    id: "v1.2.0",
    name: "添加研究组",
    timestamp: "2023-09-15 09:20",
    user: "王研究员",
    avatar: "/placeholder.svg?height=40&width=40&query=王",
    changes: [
      { type: "add", section: "研究组", description: "添加了高剂量组" },
      { type: "modify", section: "样本量", description: "调整总样本量" },
      { type: "modify", section: "随机化", description: "更新随机化方案为分层随机化" },
    ],
    status: "stable",
    comment: "增加高剂量组以评估剂量效应关系",
  },
  {
    id: "v1.3.0",
    name: "更新伦理考虑",
    timestamp: "2023-09-18 14:10",
    user: "张医生",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
    changes: [
      { type: "add", section: "伦理考虑", description: "添加详细的伦理考虑和知情同意流程" },
      { type: "add", section: "附件", description: "上传知情同意书模板" },
    ],
    status: "stable",
    comment: "完善伦理相关内容，准备伦理申请",
  },
  {
    id: "v1.4.0",
    name: "修改纳入标准",
    timestamp: "2023-09-20 11:30",
    user: "张医生",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
    changes: [
      { type: "modify", section: "纳入标准", description: "扩大年龄范围至65岁以上" },
      { type: "modify", section: "排除标准", description: "调整合并症排除标准" },
    ],
    status: "current",
    comment: "根据讨论调整入排标准，提高受试者招募可行性",
  },
]

interface VersionHistoryProps {
  experimentId: string
}

export function VersionHistory({ experimentId }: VersionHistoryProps) {
  const [showVersionDialog, setShowVersionDialog] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<(typeof versionHistory)[0] | null>(null)
  const [showDiffDialog, setShowDiffDialog] = useState(false)

  // 查看版本详情
  const viewVersion = (version: (typeof versionHistory)[0]) => {
    setSelectedVersion(version)
    setShowVersionDialog(true)
  }

  // 查看版本差异
  const viewDiff = (version: (typeof versionHistory)[0]) => {
    setSelectedVersion(version)
    setShowDiffDialog(true)
  }

  // 获取变更类型徽章
  const getChangeTypeBadge = (type: string) => {
    switch (type) {
      case "add":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            添加
          </Badge>
        )
      case "modify":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            修改
          </Badge>
        )
      case "remove":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            删除
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // 获取版本状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            当前版本
          </Badge>
        )
      case "stable":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            稳定版本
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            草稿版本
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>版本历史</CardTitle>
            <CardDescription>查看和管理研究设计的历史版本</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            创建版本快照
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-4">
            {versionHistory.map((version) => (
              <div
                key={version.id}
                className={`p-4 border rounded-md ${
                  version.status === "current" ? "border-green-200 bg-green-50" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={version.avatar || "/placeholder.svg"} alt={version.user} />
                      <AvatarFallback>{version.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {version.name}
                        <span className="text-xs text-muted-foreground">{version.id}</span>
                        {version.status === "current" && getStatusBadge(version.status)}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {version.timestamp} · {version.user}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => viewVersion(version)}>
                        <Eye className="h-4 w-4 mr-2" />
                        查看此版本
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => viewDiff(version)}>
                        <Diff className="h-4 w-4 mr-2" />
                        查看变更
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        恢复到此版本
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        复制为新版本
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        导出此版本
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="text-sm mb-3">{version.comment}</div>

                <div className="space-y-2">
                  {version.changes.map((change, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      {getChangeTypeBadge(change.type)}
                      <div>
                        <span className="font-medium">{change.section}:</span> {change.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* 版本详情对话框 */}
      <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedVersion?.name} <span className="text-sm font-normal">({selectedVersion?.id})</span>
            </DialogTitle>
            <DialogDescription>
              由 {selectedVersion?.user} 创建于 {selectedVersion?.timestamp}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedVersion?.avatar || "/placeholder.svg"} alt={selectedVersion?.user} />
                  <AvatarFallback>{selectedVersion?.user.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedVersion?.user}</div>
                  <div className="text-xs text-muted-foreground">{selectedVersion?.timestamp}</div>
                </div>
              </div>
              {selectedVersion?.status && getStatusBadge(selectedVersion.status)}
            </div>

            <div className="p-3 border rounded-md">
              <div className="font-medium mb-1">版本说明</div>
              <p className="text-sm">{selectedVersion?.comment}</p>
            </div>

            <div>
              <div className="font-medium mb-2">变更内容</div>
              <div className="space-y-3">
                {selectedVersion?.changes.map((change, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      {getChangeTypeBadge(change.type)}
                      <span className="font-medium">{change.section}</span>
                    </div>
                    <p className="text-sm">{change.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVersionDialog(false)}>
              关闭
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <RotateCcw className="h-4 w-4" />
              恢复到此版本
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 版本差异对话框 */}
      <Dialog open={showDiffDialog} onOpenChange={setShowDiffDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Diff className="h-5 w-5" />
              版本变更: {selectedVersion?.name} <span className="text-sm font-normal">({selectedVersion?.id})</span>
            </DialogTitle>
            <DialogDescription>与上一版本相比的变更内容</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md bg-gray-50">
                <div className="font-medium mb-1">上一版本</div>
                <div className="text-sm">
                  {versionHistory.findIndex((v) => v.id === selectedVersion?.id) > 0
                    ? versionHistory[versionHistory.findIndex((v) => v.id === selectedVersion?.id) - 1].id
                    : "无"}
                </div>
              </div>
              <div className="p-3 border rounded-md bg-green-50">
                <div className="font-medium mb-1">当前版本</div>
                <div className="text-sm">{selectedVersion?.id}</div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedVersion?.changes.map((change, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      {change.section}
                      {getChangeTypeBadge(change.type)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {change.type === "add" && (
                      <div className="p-3 border rounded-md bg-green-50 border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium">新增内容</span>
                        </div>
                        <p className="text-sm">{change.description}</p>
                      </div>
                    )}

                    {change.type === "modify" && (
                      <div className="space-y-3">
                        <div className="p-3 border rounded-md bg-red-50 border-red-200">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="font-medium">移除内容</span>
                          </div>
                          <p className="text-sm">原有内容已被修改</p>
                        </div>
                        <div className="p-3 border rounded-md bg-green-50 border-green-200">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="font-medium">新增内容</span>
                          </div>
                          <p className="text-sm">{change.description}</p>
                        </div>
                      </div>
                    )}

                    {change.type === "remove" && (
                      <div className="p-3 border rounded-md bg-red-50 border-red-200">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="font-medium">移除内容</span>
                        </div>
                        <p className="text-sm">{change.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiffDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
