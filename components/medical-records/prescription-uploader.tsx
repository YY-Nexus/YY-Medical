"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, Search, Download, Trash2, FilePlus2, Eye, Printer, ScanText } from "lucide-react"
import { OcrService } from "./ocr-service"

// 模拟药方数据
const mockPrescriptions = [
  {
    id: "rx-001",
    fileName: "处方-张三-20230512.pdf",
    thumbnailUrl: "/placeholder.svg?key=qa6un",
    fileUrl: "/placeholder.svg?key=8wa81",
    patientName: "张三",
    patientId: "P-10045",
    issueDate: "2023-05-12",
    doctor: "李医生",
    department: "内科",
    diagnosis: "2型糖尿病，高脂血症",
    medications: [
      { name: "二甲双胍", dosage: "0.5g", frequency: "每日三次", duration: "30天" },
      { name: "阿托伐他汀", dosage: "20mg", frequency: "每晚一次", duration: "30天" },
    ],
    notes: "饭后服用二甲双胍，睡前服用阿托伐他汀",
    status: "已发药",
    uploadedBy: "李医生",
    uploadedAt: "2023-05-12 14:30",
    tags: ["慢性病", "长期用药"],
    size: "1.2 MB",
  },
  {
    id: "rx-002",
    fileName: "处方-李四-20230510.pdf",
    thumbnailUrl: "/placeholder.svg?key=xanon",
    fileUrl: "/placeholder.svg?key=bstu6",
    patientName: "李四",
    patientId: "P-10078",
    issueDate: "2023-05-10",
    doctor: "王医生",
    department: "心内科",
    diagnosis: "高血压，冠心病",
    medications: [
      { name: "氯沙坦", dosage: "50mg", frequency: "每日一次", duration: "30天" },
      { name: "阿司匹林", dosage: "100mg", frequency: "每日一次", duration: "30天" },
    ],
    notes: "监测血压，如收缩压低于100mmHg，停用氯沙坦",
    status: "已完成",
    uploadedBy: "王医生",
    uploadedAt: "2023-05-10 09:45",
    tags: ["心血管", "长期用药"],
    size: "0.9 MB",
  },
  {
    id: "rx-003",
    fileName: "处方-王五-20230508.pdf",
    thumbnailUrl: "/placeholder.svg?key=5gqho",
    fileUrl: "/placeholder.svg?key=t86qe",
    patientName: "王五",
    patientId: "P-10103",
    issueDate: "2023-05-08",
    doctor: "张医生",
    department: "呼吸科",
    diagnosis: "社区获得性肺炎",
    medications: [
      { name: "左氧氟沙星", dosage: "0.5g", frequency: "每日一次", duration: "7天" },
      { name: "布洛芬", dosage: "0.4g", frequency: "需要时", duration: "按需" },
    ],
    notes: "完成抗生素疗程，即使症状改善也不要提前停药",
    status: "已发药",
    uploadedBy: "张医生",
    uploadedAt: "2023-05-08 16:15",
    tags: ["抗生素", "急性感染"],
    size: "1.0 MB",
  },
]

// 处方状态映射
const statusMap = {
  已完成: { color: "default" },
  待审核: { color: "warning" },
  已发药: { color: "success" },
  已拒绝: { color: "destructive" },
}

export function PrescriptionUploader() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [selectedPrescription, setSelectedPrescription] = useState<(typeof mockPrescriptions)[0] | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isOcrDialogOpen, setIsOcrDialogOpen] = useState(false)
  const [ocrImageUrl, setOcrImageUrl] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const ocrFileInputRef = useRef<HTMLInputElement>(null)

  // 过滤处方
  const filteredPrescriptions = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "全部" || rx.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // 触发文件选择
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 触发OCR文件选择
  const handleOcrUploadClick = () => {
    if (ocrFileInputRef.current) {
      ocrFileInputRef.current.click()
    }
  }

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    // 模拟上传过程
    setTimeout(() => {
      const newPrescriptions = Array.from(files).map((file, index) => {
        const now = new Date()
        const dateStr = now.toISOString().split("T")[0]
        const timeStr = now.toTimeString().split(" ")[0]

        return {
          id: `rx-new-${Date.now()}-${index}`,
          fileName: file.name,
          thumbnailUrl: "/placeholder.svg?key=522uw",
          fileUrl: "/placeholder.svg?key=kxhzd",
          patientName: "待关联",
          patientId: "待关联",
          issueDate: dateStr,
          doctor: "当前用户",
          department: "待填写",
          diagnosis: "待填写",
          medications: [],
          notes: "新上传的处方，等待描述",
          status: "待审核",
          uploadedBy: "当前用户",
          uploadedAt: `${dateStr} ${timeStr}`,
          tags: ["新上传"],
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }
      })

      setPrescriptions([...newPrescriptions, ...prescriptions])
      setIsUploading(false)

      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 1500)
  }

  // 处理OCR文件上传
  const handleOcrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        setOcrImageUrl(event.target.result)
        setIsOcrDialogOpen(true)
      }
    }

    reader.readAsDataURL(file)

    // 重置文件输入
    if (ocrFileInputRef.current) {
      ocrFileInputRef.current.value = ""
    }
  }

  // 处理OCR结果
  const handleOcrComplete = (result: any) => {
    const now = new Date()
    const dateStr = now.toISOString().split("T")[0]
    const timeStr = now.toTimeString().split(" ")[0]

    const newPrescription = {
      id: `rx-ocr-${Date.now()}`,
      fileName: `处方-${result.patientInfo.name}-${result.prescriptionInfo.date}.pdf`,
      thumbnailUrl: "/placeholder.svg?key=ce9uh",
      fileUrl: ocrImageUrl,
      patientName: result.patientInfo.name,
      patientId: result.patientInfo.id,
      issueDate: result.prescriptionInfo.date,
      doctor: result.prescriptionInfo.doctor,
      department: result.prescriptionInfo.department,
      diagnosis: result.prescriptionInfo.diagnosis,
      medications: result.medications.map((med: any) => ({
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
      })),
      notes: result.additionalNotes,
      status: "待审核",
      uploadedBy: "当前用户(OCR)",
      uploadedAt: `${dateStr} ${timeStr}`,
      tags: ["OCR识别", "待审核"],
      size: "1.0 MB",
    }

    setPrescriptions([newPrescription, ...prescriptions])
    setIsOcrDialogOpen(false)
  }

  // 查看处方
  const viewPrescription = (prescription: (typeof mockPrescriptions)[0]) => {
    setSelectedPrescription(prescription)
    setIsViewerOpen(true)
  }

  // 删除处方
  const deletePrescription = (id: string) => {
    setPrescriptions(prescriptions.filter((rx) => rx.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>处方管理</CardTitle>
          <CardDescription>上传、查看和管理患者处方</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">浏览处方</TabsTrigger>
              <TabsTrigger value="upload">上传新处方</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索患者姓名、文件名或诊断..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="处方状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部">全部状态</SelectItem>
                    <SelectItem value="已完成">已完成</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                    <SelectItem value="已发药">已发药</SelectItem>
                    <SelectItem value="已拒绝">已拒绝</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>处方文件</TableHead>
                      <TableHead>患者</TableHead>
                      <TableHead className="hidden md:table-cell">医生</TableHead>
                      <TableHead className="hidden md:table-cell">日期</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div className="font-medium truncate max-w-[200px]" title={prescription.fileName}>
                              {prescription.fileName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {prescription.patientName}
                          <div className="text-xs text-muted-foreground">{prescription.patientId}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{prescription.doctor}</TableCell>
                        <TableCell className="hidden md:table-cell">{prescription.issueDate}</TableCell>
                        <TableCell>
                          <Badge variant={statusMap[prescription.status as keyof typeof statusMap]?.color as any}>
                            {prescription.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => viewPrescription(prescription)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">查看</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">下载</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => deletePrescription(prescription.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">删除</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredPrescriptions.length === 0 && (
                <div className="text-center py-10">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">没有找到匹配的处方</h3>
                  <p className="mt-1 text-gray-500">尝试调整搜索条件或上传新的处方</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>上传处方</CardTitle>
                  <CardDescription>支持PDF、图片等格式的处方文件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">标准上传</CardTitle>
                        <CardDescription>上传处方文件，手动填写信息</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-4" />
                        <h3 className="text-base font-medium mb-2">拖放文件到此处或点击上传</h3>
                        <p className="text-xs text-gray-500 mb-4">支持PDF、JPG、PNG等格式，单个文件最大10MB</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Button onClick={handleUploadClick} disabled={isUploading} size="sm">
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
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">OCR智能识别</CardTitle>
                        <CardDescription>上传处方图片，自动识别内容</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <ScanText className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-base font-medium mb-2">OCR处方识别</h3>
                        <p className="text-xs text-gray-500 mb-4">上传处方图片，系统将自动识别文字内容并提取关键信息</p>
                        <input
                          type="file"
                          ref={ocrFileInputRef}
                          onChange={handleOcrFileChange}
                          className="hidden"
                          accept=".jpg,.jpeg,.png"
                        />
                        <Button onClick={handleOcrUploadClick} variant="default" size="sm">
                          <ScanText className="mr-2 h-4 w-4" />
                          上传图片进行OCR识别
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline">
                      <FilePlus2 className="mr-2 h-4 w-4" />
                      创建新处方
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 处方查看器对话框 */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>{selectedPrescription?.fileName}</DialogTitle>
            <DialogDescription>
              患者: {selectedPrescription?.patientName} | 开具日期: {selectedPrescription?.issueDate} | 医生:{" "}
              {selectedPrescription?.doctor}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">处方文件</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-4">
                  <img
                    src={selectedPrescription?.fileUrl || "/placeholder.svg"}
                    alt="处方预览"
                    className="max-w-full border rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex justify-center gap-2 pt-0">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    下载
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-1" />
                    打印
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">处方详情</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">患者姓名</Label>
                      <div className="font-medium">{selectedPrescription?.patientName}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">患者ID</Label>
                      <div className="font-medium">{selectedPrescription?.patientId}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">开具医生</Label>
                      <div className="font-medium">{selectedPrescription?.doctor}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">科室</Label>
                      <div className="font-medium">{selectedPrescription?.department}</div>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-muted-foreground">诊断</Label>
                      <div className="font-medium">{selectedPrescription?.diagnosis}</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">药物清单</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>药品名称</TableHead>
                          <TableHead>剂量</TableHead>
                          <TableHead>频次</TableHead>
                          <TableHead>疗程</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPrescription?.medications.map((med, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{med.name}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.duration}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">医嘱</Label>
                    <div className="p-2 border rounded-md text-sm">{selectedPrescription?.notes}</div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {selectedPrescription?.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OCR处理对话框 */}
      <Dialog open={isOcrDialogOpen} onOpenChange={setIsOcrDialogOpen}>
        <DialogContent className="max-w-5xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>处方OCR识别</DialogTitle>
            <DialogDescription>系统将自动识别处方图片中的文字内容并提取关键信息</DialogDescription>
          </DialogHeader>

          <OcrService
            imageUrl={ocrImageUrl}
            onComplete={handleOcrComplete}
            onCancel={() => setIsOcrDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
