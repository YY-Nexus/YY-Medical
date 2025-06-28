"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Trash2,
  Download,
  Play,
  Pause,
  Filter,
  Settings,
  Save,
  Eye,
  Layers,
  Clock,
} from "lucide-react"

// 模拟批处理任务
const mockBatchTasks = [
  {
    id: "batch-001",
    name: "4月门诊处方批量处理",
    type: "处方OCR",
    status: "已完成",
    createdAt: "2024-04-25 10:30",
    completedAt: "2024-04-25 10:45",
    totalFiles: 24,
    processedFiles: 24,
    successFiles: 22,
    failedFiles: 2,
    creator: "李医生",
  },
  {
    id: "batch-002",
    name: "3月住院病历扫描件处理",
    type: "病历OCR",
    status: "处理中",
    createdAt: "2024-04-28 09:15",
    completedAt: null,
    totalFiles: 56,
    processedFiles: 32,
    successFiles: 30,
    failedFiles: 2,
    creator: "王医生",
  },
]

// 模拟批处理文件
const mockBatchFiles = [
  {
    id: "file-001",
    name: "处方-张三-20240415.jpg",
    type: "处方",
    size: "1.2 MB",
    uploadedAt: "2024-04-28 09:15",
    status: "已处理",
    result: "成功",
    thumbnailUrl: "/placeholder.svg?height=100&width=100&query=处方缩略图1",
    patientName: "张三",
    patientId: "P-10045",
    isSelected: false,
  },
  {
    id: "file-002",
    name: "处方-李四-20240416.jpg",
    type: "处方",
    size: "0.9 MB",
    uploadedAt: "2024-04-28 09:15",
    status: "已处理",
    result: "成功",
    thumbnailUrl: "/placeholder.svg?height=100&width=100&query=处方缩略图2",
    patientName: "李四",
    patientId: "P-10078",
    isSelected: false,
  },
  {
    id: "file-003",
    name: "处方-王五-20240417.jpg",
    type: "处方",
    size: "1.0 MB",
    uploadedAt: "2024-04-28 09:15",
    status: "处理中",
    result: null,
    thumbnailUrl: "/placeholder.svg?height=100&width=100&query=处方缩略图3",
    patientName: null,
    patientId: null,
    isSelected: false,
  },
  {
    id: "file-004",
    name: "处方-赵六-20240418.jpg",
    type: "处方",
    size: "1.1 MB",
    uploadedAt: "2024-04-28 09:15",
    status: "等待处理",
    result: null,
    thumbnailUrl: "/placeholder.svg?height=100&width=100&query=处方缩略图4",
    patientName: null,
    patientId: null,
    isSelected: false,
  },
  {
    id: "file-005",
    name: "处方-钱七-20240419.jpg",
    type: "处方",
    size: "0.8 MB",
    uploadedAt: "2024-04-28 09:15",
    status: "已处理",
    result: "失败",
    thumbnailUrl: "/placeholder.svg?height=100&width=100&query=处方缩略图5",
    patientName: null,
    patientId: null,
    isSelected: false,
  },
]

export function BatchProcessor() {
  const [activeTab, setActiveTab] = useState("upload")
  const [files, setFiles] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [batchName, setBatchName] = useState("")
  const [batchType, setBatchType] = useState("处方OCR")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState<(typeof mockBatchTasks)[0] | null>(null)
  const [batchFiles, setBatchFiles] = useState<typeof mockBatchFiles>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            const newFiles = Array.from(fileList).map((file) => ({
              id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: file.name,
              type: file.type.includes("image") ? "图片" : "文档",
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadedAt: new Date().toLocaleString(),
              preview: URL.createObjectURL(file),
            }))
            setFiles((prev) => [...prev, ...newFiles])
            setIsUploading(false)
          }, 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)
  }

  // 开始批处理
  const startBatchProcessing = () => {
    if (files.length === 0 || !batchName) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // 创建新任务
    const newTask = {
      id: `batch-${Date.now()}`,
      name: batchName,
      type: batchType,
      status: "处理中",
      createdAt: new Date().toLocaleString(),
      completedAt: null,
      totalFiles: files.length,
      processedFiles: 0,
      successFiles: 0,
      failedFiles: 0,
      creator: "当前用户",
    }

    setCurrentTask(newTask)

    // 创建批处理文件
    const newBatchFiles = files.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      type: "处方",
      size: file.size,
      uploadedAt: new Date().toLocaleString(),
      status: "等待处理",
      result: null,
      thumbnailUrl: file.preview || "/placeholder.svg?key=o1gqc",
      patientName: null,
      patientId: null,
      isSelected: false,
    }))

    setBatchFiles(newBatchFiles)

    // 模拟处理进度
    let processed = 0
    const totalFiles = files.length
    const processInterval = setInterval(() => {
      if (processed >= totalFiles) {
        clearInterval(processInterval)

        // 更新任务状态
        setCurrentTask((prev) => {
          if (!prev) return null
          return {
            ...prev,
            status: "已完成",
            completedAt: new Date().toLocaleString(),
            processedFiles: totalFiles,
            successFiles: Math.floor(totalFiles * 0.9),
            failedFiles: Math.ceil(totalFiles * 0.1),
          }
        })

        // 更新文件状态
        setBatchFiles((prev) =>
          prev.map((file, i) => ({
            ...file,
            status: "已处理",
            result: i % 10 === 9 ? "失败" : "成功",
            patientName: i % 10 === 9 ? null : `患者${i + 1}`,
            patientId: i % 10 === 9 ? null : `P-${10000 + i}`,
          })),
        )

        setIsProcessing(false)
        setFiles([])
        setActiveTab("results")
        return
      }

      processed += 1
      setProcessingProgress((processed / totalFiles) * 100)

      // 更新任务状态
      setCurrentTask((prev) => {
        if (!prev) return null
        return {
          ...prev,
          processedFiles: processed,
          successFiles: Math.floor(processed * 0.9),
          failedFiles: Math.ceil(processed * 0.1),
        }
      })

      // 更新文件状态
      setBatchFiles((prev) => {
        const newFiles = [...prev]
        if (newFiles[processed - 1]) {
          newFiles[processed - 1] = {
            ...newFiles[processed - 1],
            status: "已处理",
            result: (processed - 1) % 10 === 9 ? "失败" : "成功",
            patientName: (processed - 1) % 10 === 9 ? null : `患者${processed}`,
            patientId: (processed - 1) % 10 === 9 ? null : `P-${10000 + processed - 1}`,
          }
        }
        return newFiles
      })
    }, 500)
  }

  // 处理文件选择
  const handleFileSelect = (id: string, checked: boolean) => {
    setBatchFiles((prev) => prev.map((file) => (file.id === id ? { ...file, isSelected: checked } : file)))

    setSelectedCount((prev) => (checked ? prev + 1 : prev - 1))
  }

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    setBatchFiles((prev) => prev.map((file) => ({ ...file, isSelected: checked })))
    setSelectedCount(checked ? batchFiles.length : 0)
  }

  // 删除选中文件
  const deleteSelectedFiles = () => {
    setBatchFiles((prev) => prev.filter((file) => !file.isSelected))
    setSelectAll(false)
    setSelectedCount(0)
    setIsDeleteDialogOpen(false)
  }

  // 渲染上传区域
  const renderUploadArea = () => (
    <Card>
      <CardHeader>
        <CardTitle>批量上传文件</CardTitle>
        <CardDescription>上传多个处方或医疗记录文件进行批量处理</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">拖放文件到此处或点击上传</h3>
            <p className="text-sm text-gray-500 mb-4">支持JPG、PNG、PDF等格式，可同时上传多个文件</p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileUpload}
            />
            <Button onClick={() => document.getElementById("file-upload")?.click()} disabled={isUploading}>
              {isUploading ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  选择文件
                </>
              )}
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>上传进度</span>
                <span>{uploadProgress.toFixed(0)}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">已上传文件 ({files.length})</h3>
                <Button variant="outline" size="sm" onClick={() => setFiles([])}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  清空
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="border rounded-md overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {file.preview ? (
                        <img
                          src={file.preview || "/placeholder.svg"}
                          alt={file.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <FileText className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div className="p-2">
                      <div className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{file.type}</span>
                        <span>{file.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="batch-name" className="mb-2 block">
                      批处理名称
                    </Label>
                    <input
                      id="batch-name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="输入批处理任务名称"
                      value={batchName}
                      onChange={(e) => setBatchName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="batch-type" className="mb-2 block">
                      处理类型
                    </Label>
                    <Select value={batchType} onValueChange={setBatchType}>
                      <SelectTrigger id="batch-type">
                        <SelectValue placeholder="选择处理类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="处方OCR">处方OCR识别</SelectItem>
                        <SelectItem value="病历OCR">病历OCR识别</SelectItem>
                        <SelectItem value="影像处理">医学影像处理</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="h-4 w-4 mr-1" />
                    处理设置
                  </Button>
                  <Button onClick={startBatchProcessing} disabled={isProcessing || files.length === 0 || !batchName}>
                    {isProcessing ? (
                      <>
                        <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
                        处理中...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        开始批处理
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  // 渲染处理中状态
  const renderProcessing = () => (
    <Card>
      <CardHeader>
        <CardTitle>批处理进行中</CardTitle>
        <CardDescription>
          正在处理 {currentTask?.name} ({currentTask?.totalFiles} 个文件)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>总体进度</span>
            <span>
              {currentTask?.processedFiles}/{currentTask?.totalFiles} ({processingProgress.toFixed(0)}%)
            </span>
          </div>
          <Progress value={processingProgress} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold">{currentTask?.totalFiles}</div>
              <div className="text-sm text-gray-500">总文件数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{currentTask?.successFiles}</div>
              <div className="text-sm text-gray-500">成功处理</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{currentTask?.failedFiles}</div>
              <div className="text-sm text-gray-500">处理失败</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">处理详情</h3>
          <div className="max-h-[300px] overflow-y-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文件名</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>结果</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>
                      {file.status === "等待处理" && <Badge variant="outline">等待处理</Badge>}
                      {file.status === "处理中" && (
                        <Badge variant="secondary">
                          <LoadingSpinner className="h-3 w-3 mr-1" />
                          处理中
                        </Badge>
                      )}
                      {file.status === "已处理" && <Badge variant="default">已处理</Badge>}
                    </TableCell>
                    <TableCell>
                      {file.result === "成功" && <Badge variant="success">成功</Badge>}
                      {file.result === "失败" && <Badge variant="destructive">失败</Badge>}
                      {!file.result && "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" disabled={true}>
            <Pause className="h-4 w-4 mr-1" />
            暂停处理
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // 渲染结果
  const renderResults = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{currentTask?.name || "批处理结果"}</CardTitle>
            <CardDescription>
              {currentTask?.type} | 创建于 {currentTask?.createdAt}
            </CardDescription>
          </div>
          <Badge variant={currentTask?.status === "已完成" ? "success" : "secondary"}>{currentTask?.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold">{currentTask?.totalFiles}</div>
              <div className="text-sm text-gray-500">总文件数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold">{currentTask?.processedFiles}</div>
              <div className="text-sm text-gray-500">已处理</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{currentTask?.successFiles}</div>
              <div className="text-sm text-gray-500">成功</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{currentTask?.failedFiles}</div>
              <div className="text-sm text-gray-500">失败</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">处理结果</h3>
            <div className="flex items-center space-x-2">
              {selectedCount > 0 && (
                <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  删除所选 ({selectedCount})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                筛选
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                导出结果
              </Button>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                  </TableHead>
                  <TableHead>文件</TableHead>
                  <TableHead>患者信息</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>结果</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox
                        checked={file.isSelected}
                        onCheckedChange={(checked) => handleFileSelect(file.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img
                            src={file.thumbnailUrl || "/placeholder.svg"}
                            alt={file.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-medium truncate max-w-[200px]" title={file.name}>
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {file.size} | {file.uploadedAt}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {file.patientName ? (
                        <div>
                          <div>{file.patientName}</div>
                          <div className="text-xs text-gray-500">{file.patientId}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {file.status === "等待处理" && <Badge variant="outline">等待处理</Badge>}
                      {file.status === "处理中" && <Badge variant="secondary">处理中</Badge>}
                      {file.status === "已处理" && <Badge variant="default">已处理</Badge>}
                    </TableCell>
                    <TableCell>
                      {file.result === "成功" && (
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                          <span>成功</span>
                        </div>
                      )}
                      {file.result === "失败" && (
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span>失败</span>
                        </div>
                      )}
                      {!file.result && "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("upload")}>
            <Upload className="h-4 w-4 mr-1" />
            新建批处理
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-1" />
            保存结果
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // 渲染历史记录
  const renderHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle>批处理历史</CardTitle>
        <CardDescription>查看和管理历史批处理任务</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>任务名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>文件数</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBatchTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>{task.type}</TableCell>
                    <TableCell>{task.createdAt}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.status === "已完成" ? "success" : task.status === "处理中" ? "secondary" : "outline"
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.processedFiles}/{task.totalFiles}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload" disabled={isProcessing}>
            <Upload className="h-4 w-4 mr-1" />
            上传文件
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!currentTask && !isProcessing}>
            <Layers className="h-4 w-4 mr-1" />
            处理结果
          </TabsTrigger>
          <TabsTrigger value="history" disabled={isProcessing}>
            <Clock className="h-4 w-4 mr-1" />
            历史记录
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">{isProcessing ? renderProcessing() : renderUploadArea()}</TabsContent>

        <TabsContent value="results">{isProcessing ? renderProcessing() : renderResults()}</TabsContent>

        <TabsContent value="history">{renderHistory()}</TabsContent>
      </Tabs>

      {/* 处理设置对话框 */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>批处理设置</DialogTitle>
            <DialogDescription>配置OCR识别和处理参数</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>OCR引擎选择</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="选择OCR引擎" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">标准OCR引擎</SelectItem>
                  <SelectItem value="medical">医疗专用OCR引擎</SelectItem>
                  <SelectItem value="advanced">高级OCR引擎（更高精度）</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>处理优先级</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="选择处理优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">低（节省资源）</SelectItem>
                  <SelectItem value="normal">正常</SelectItem>
                  <SelectItem value="high">高（优先处理）</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-associate">自动关联患者</Label>
                <Checkbox id="auto-associate" defaultChecked />
              </div>
              <p className="text-sm text-gray-500">尝试自动将识别的处方关联到对应的患者电子病历</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-verify">需要人工审核</Label>
                <Checkbox id="auto-verify" defaultChecked />
              </div>
              <p className="text-sm text-gray-500">OCR识别结果需要经过人工审核后才能保存到系统</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>保存设置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>您确定要删除选中的 {selectedCount} 个文件吗？此操作无法撤销。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={deleteSelectedFiles}>
              <Trash2 className="h-4 w-4 mr-1" />
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
