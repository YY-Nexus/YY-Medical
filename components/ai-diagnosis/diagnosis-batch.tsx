"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  FileText,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Download,
  Eye,
  Trash2,
  Loader2,
} from "lucide-react"

// 模拟批量诊断任务
const mockBatchTasks = [
  {
    id: "batch-001",
    name: "呼吸科患者批量诊断",
    status: "completed",
    totalFiles: 24,
    processedFiles: 24,
    successFiles: 22,
    failedFiles: 2,
    createdAt: "2023-11-15 09:30",
    completedAt: "2023-11-15 09:45",
    createdBy: "张医生",
  },
  {
    id: "batch-002",
    name: "儿科患者批量诊断",
    status: "processing",
    totalFiles: 36,
    processedFiles: 18,
    successFiles: 17,
    failedFiles: 1,
    createdAt: "2023-11-15 10:15",
    completedAt: null,
    createdBy: "李医生",
  },
  {
    id: "batch-003",
    name: "老年科患者批量诊断",
    status: "failed",
    totalFiles: 12,
    processedFiles: 5,
    successFiles: 3,
    failedFiles: 2,
    createdAt: "2023-11-14 14:20",
    completedAt: "2023-11-14 14:25",
    createdBy: "王医生",
    error: "服务器连接错误，请稍后重试",
  },
  {
    id: "batch-004",
    name: "急诊患者批量诊断",
    status: "queued",
    totalFiles: 8,
    processedFiles: 0,
    successFiles: 0,
    failedFiles: 0,
    createdAt: "2023-11-15 11:05",
    completedAt: null,
    createdBy: "赵医生",
  },
]

// 模拟批量诊断结果
const mockBatchResults = [
  {
    id: "result-001",
    batchId: "batch-001",
    patientId: "P-20230501",
    patientName: "张三",
    fileName: "chest_xray_001.dcm",
    diagnosis: "肺结节",
    confidence: 0.92,
    status: "success",
    processingTime: "2.3秒",
  },
  {
    id: "result-002",
    batchId: "batch-001",
    patientId: "P-20230502",
    patientName: "李四",
    fileName: "chest_xray_002.dcm",
    diagnosis: "肺炎",
    confidence: 0.88,
    status: "success",
    processingTime: "1.8秒",
  },
  {
    id: "result-003",
    batchId: "batch-001",
    patientId: "P-20230503",
    patientName: "王五",
    fileName: "chest_xray_003.dcm",
    diagnosis: "正常",
    confidence: 0.95,
    status: "success",
    processingTime: "1.5秒",
  },
  {
    id: "result-004",
    batchId: "batch-001",
    patientId: "P-20230504",
    patientName: "赵六",
    fileName: "chest_xray_004.dcm",
    diagnosis: null,
    confidence: null,
    status: "failed",
    processingTime: "3.2秒",
    error: "文件格式不支持",
  },
]

export function DiagnosisBatch() {
  const { toast } = useToast()
  const [batchTasks, setBatchTasks] = useState(mockBatchTasks)
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newBatchName, setNewBatchName] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // 获取选中的批量任务
  const getSelectedBatch = () => {
    if (!selectedBatchId) return null
    return batchTasks.find((batch) => batch.id === selectedBatchId)
  }

  // 获取批量任务的结果
  const getBatchResults = (batchId: string) => {
    return mockBatchResults.filter((result) => result.batchId === batchId)
  }

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  // 处理批量任务创建
  const handleCreateBatch = () => {
    if (!newBatchName.trim() || selectedFiles.length === 0) return

    // 模拟上传进度
    setIsUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)

        // 创建新的批量任务
        const newBatch = {
          id: `batch-${Date.now()}`,
          name: newBatchName,
          status: "queued",
          totalFiles: selectedFiles.length,
          processedFiles: 0,
          successFiles: 0,
          failedFiles: 0,
          createdAt: new Date().toLocaleString(),
          completedAt: null,
          createdBy: "当前用户",
        }

        setBatchTasks([newBatch, ...batchTasks])
        setIsCreateDialogOpen(false)
        setNewBatchName("")
        setSelectedFiles([])
        setIsUploading(false)
        setUploadProgress(0)

        toast({
          title: "批量诊断任务已创建",
          description: `已成功创建批量诊断任务 "${newBatchName}"，共 ${selectedFiles.length} 个文件`,
        })

        // 模拟任务状态变化
        setTimeout(() => {
          setBatchTasks((prev) =>
            prev.map((batch) => (batch.id === newBatch.id ? { ...batch, status: "processing" } : batch)),
          )

          // 模拟任务完成
          setTimeout(() => {
            setBatchTasks((prev) =>
              prev.map((batch) =>
                batch.id === newBatch.id
                  ? {
                      ...batch,
                      status: "completed",
                      processedFiles: batch.totalFiles,
                      successFiles: Math.floor(batch.totalFiles * 0.9),
                      failedFiles: Math.ceil(batch.totalFiles * 0.1),
                      completedAt: new Date().toLocaleString(),
                    }
                  : batch,
              ),
            )
          }, 10000)
        }, 2000)
      }
    }, 500)
  }

  // 处理批量任务删除
  const handleDeleteBatch = (batchId: string) => {
    setBatchTasks((prev) => prev.filter((batch) => batch.id !== batchId))
    if (selectedBatchId === batchId) {
      setSelectedBatchId(null)
    }

    toast({
      title: "批量诊断任务已删除",
      description: "已成功删除批量诊断任务",
    })
  }

  // 处理批量任务重试
  const handleRetryBatch = (batchId: string) => {
    setBatchTasks((prev) =>
      prev.map((batch) =>
        batch.id === batchId
          ? {
              ...batch,
              status: "queued",
              error: undefined,
            }
          : batch,
      ),
    )

    toast({
      title: "批量诊断任务已重新排队",
      description: "任务将很快开始处理",
    })

    // 模拟任务状态变化
    setTimeout(() => {
      setBatchTasks((prev) => prev.map((batch) => (batch.id === batchId ? { ...batch, status: "processing" } : batch)))

      // 模拟任务完成
      setTimeout(() => {
        setBatchTasks((prev) =>
          prev.map((batch) =>
            batch.id === batchId
              ? {
                  ...batch,
                  status: "completed",
                  processedFiles: batch.totalFiles,
                  successFiles: Math.floor(batch.totalFiles * 0.95),
                  failedFiles: Math.ceil(batch.totalFiles * 0.05),
                  completedAt: new Date().toLocaleString(),
                }
              : batch,
          ),
        )
      }, 5000)
    }, 1000)
  }

  // 渲染状态徽章
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" /> 已完成
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="default" className="bg-blue-500">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" /> 处理中
          </Badge>
        )
      case "queued":
        return (
          <Badge variant="default" className="bg-amber-500">
            <Clock className="h-3 w-3 mr-1" /> 排队中
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" /> 失败
          </Badge>
        )
      case "success":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" /> 成功
          </Badge>
        )
      default:
        return null
    }
  }

  // 过滤批量任务
  const filteredBatchTasks = batchTasks.filter((batch) => {
    if (activeTab === "all") return true
    return batch.status === activeTab
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>批量诊断管理</CardTitle>
            <CardDescription>批量上传和处理医学影像，获取AI辅助诊断结果</CardDescription>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" /> 新建批量诊断
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="queued">排队中</TabsTrigger>
              <TabsTrigger value="processing">处理中</TabsTrigger>
              <TabsTrigger value="completed">已完成</TabsTrigger>
              <TabsTrigger value="failed">失败</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>任务名称</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>文件数量</TableHead>
                          <TableHead>创建时间</TableHead>
                          <TableHead>创建者</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBatchTasks.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                              没有找到匹配的批量诊断任务
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredBatchTasks.map((batch) => (
                            <TableRow
                              key={batch.id}
                              className={`cursor-pointer ${selectedBatchId === batch.id ? "bg-muted" : ""}`}
                              onClick={() => setSelectedBatchId(batch.id)}
                            >
                              <TableCell>
                                <div className="font-medium">{batch.name}</div>
                                <div className="text-xs text-muted-foreground">{batch.id}</div>
                              </TableCell>
                              <TableCell>
                                {renderStatusBadge(batch.status)}
                                {batch.status === "processing" && (
                                  <Progress
                                    value={(batch.processedFiles / batch.totalFiles) * 100}
                                    className="h-2 mt-2"
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">总计: {batch.totalFiles}</div>
                                {batch.processedFiles > 0 && (
                                  <div className="text-xs text-muted-foreground">
                                    成功: {batch.successFiles} | 失败: {batch.failedFiles}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{batch.createdAt}</div>
                                {batch.completedAt && (
                                  <div className="text-xs text-muted-foreground">完成: {batch.completedAt}</div>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{batch.createdBy}</div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSelectedBatchId(batch.id)}>
                                      <Eye className="h-4 w-4 mr-2" /> 查看详情
                                    </DropdownMenuItem>
                                    {batch.status === "completed" && (
                                      <DropdownMenuItem>
                                        <Download className="h-4 w-4 mr-2" /> 导出结果
                                      </DropdownMenuItem>
                                    )}
                                    {(batch.status === "failed" || batch.status === "queued") && (
                                      <DropdownMenuItem onClick={() => handleRetryBatch(batch.id)}>
                                        <Clock className="h-4 w-4 mr-2" /> 重新排队
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteBatch(batch.id)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" /> 删除任务
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div>
                {selectedBatchId ? (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">任务详情</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(() => {
                        const batch = getSelectedBatch()
                        if (!batch) return null

                        return (
                          <>
                            <div>
                              <h3 className="font-medium">基本信息</h3>
                              <div className="pl-4 mt-1 space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">任务名称:</span>
                                  <span className="font-medium">{batch.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">任务ID:</span>
                                  <span>{batch.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">状态:</span>
                                  <span>{renderStatusBadge(batch.status)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">创建时间:</span>
                                  <span>{batch.createdAt}</span>
                                </div>
                                {batch.completedAt && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">完成时间:</span>
                                    <span>{batch.completedAt}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">创建者:</span>
                                  <span>{batch.createdBy}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium">处理进度</h3>
                              <div className="pl-4 mt-1 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">总文件数:</span>
                                  <span className="font-medium">{batch.totalFiles}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">已处理:</span>
                                  <span>{batch.processedFiles}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">成功:</span>
                                  <span className="text-green-600">{batch.successFiles}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">失败:</span>
                                  <span className="text-red-600">{batch.failedFiles}</span>
                                </div>

                                {batch.status === "processing" && (
                                  <div className="pt-1">
                                    <Progress value={(batch.processedFiles / batch.totalFiles) * 100} className="h-2" />
                                    <div className="text-xs text-center mt-1 text-muted-foreground">
                                      {Math.round((batch.processedFiles / batch.totalFiles) * 100)}% 完成
                                    </div>
                                  </div>
                                )}

                                {batch.status === "failed" && batch.error && (
                                  <div className="pt-1">
                                    <div className="flex items-start gap-2 p-2 rounded bg-red-50 text-red-800 border border-red-200">
                                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <span>{batch.error}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {batch.processedFiles > 0 && (
                              <div>
                                <h3 className="font-medium">处理结果</h3>
                                <div className="mt-2 border rounded-md overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>患者</TableHead>
                                        <TableHead>诊断</TableHead>
                                        <TableHead>状态</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {getBatchResults(batch.id).map((result) => (
                                        <TableRow key={result.id}>
                                          <TableCell>
                                            <div className="font-medium">{result.patientName}</div>
                                            <div className="text-xs text-muted-foreground">{result.fileName}</div>
                                          </TableCell>
                                          <TableCell>
                                            {result.status === "success" ? (
                                              <>
                                                <div>{result.diagnosis}</div>
                                                <div className="text-xs text-muted-foreground">
                                                  置信度: {Math.round((result.confidence || 0) * 100)}%
                                                </div>
                                              </>
                                            ) : (
                                              <div className="text-red-600 text-sm">{result.error}</div>
                                            )}
                                          </TableCell>
                                          <TableCell>{renderStatusBadge(result.status)}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            )}
                          </>
                        )
                      })()}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setSelectedBatchId(null)}>
                        关闭
                      </Button>

                      <div className="flex gap-2">
                        {getSelectedBatch()?.status === "completed" && (
                          <Button>
                            <Download className="h-4 w-4 mr-2" /> 导出结果
                          </Button>
                        )}
                        {getSelectedBatch()?.status === "failed" && (
                          <Button onClick={() => handleRetryBatch(selectedBatchId!)}>
                            <Clock className="h-4 w-4 mr-2" /> 重新排队
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="rounded-full bg-muted p-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 font-medium">选择任务查看详情</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">
                        从左侧列表中选择一个批量诊断任务以查看详细信息
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* 创建批量诊断对话框 */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建批量诊断任务</DialogTitle>
            <DialogDescription>上传多个医学影像文件进行批量AI辅助诊断</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="batch-name">任务名称</Label>
              <Input
                id="batch-name"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                placeholder="输入批量诊断任务名称"
              />
            </div>

            <div className="space-y-2">
              <Label>上传文件</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Input
                  type="file"
                  multiple
                  accept=".dcm,.jpg,.png,.pdf"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileSelect}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">点击或拖拽文件到此处上传</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 DICOM, JPG, PNG, PDF 格式</p>
                  </div>
                </Label>

                {selectedFiles.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium">已选择 {selectedFiles.length} 个文件:</p>
                    <ul className="mt-2 text-sm text-muted-foreground max-h-32 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="truncate">
                          {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>上传进度</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isUploading}>
              取消
            </Button>
            <Button
              onClick={handleCreateBatch}
              disabled={isUploading || !newBatchName.trim() || selectedFiles.length === 0}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 上传中...
                </>
              ) : (
                "创建任务"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
