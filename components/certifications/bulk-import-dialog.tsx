"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "../profile/certifications/file-upload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Download, Upload, AlertCircle, CheckCircle, FileSpreadsheet, RefreshCw, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BulkImportDialogProps {
  onClose: () => void
}

export function BulkImportDialog({ onClose }: BulkImportDialogProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upload")
  const [file, setFile] = useState<File | null>(null)
  const [templateFile, setTemplateFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<any | null>(null)
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  // 处理文件上传
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)

    if (selectedFile && (selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".csv"))) {
      // 模拟文件解析
      setTimeout(() => {
        // 这里应该是真实的Excel/CSV解析逻辑
        setPreviewData([
          {
            type: "doctor-license",
            licenseNumber: "1102023001001",
            name: "张三",
            institution: "北京协和医院",
            issueDate: "2023-01-15",
            expiryDate: "2028-01-14",
          },
          {
            type: "specialist-certificate",
            licenseNumber: "2202023002002",
            name: "李四",
            specialty: "心血管内科",
            institution: "卫生部",
            issueDate: "2022-09-15",
            expiryDate: "2027-09-14",
          },
          {
            type: "doctor-license",
            licenseNumber: "1102023003003",
            name: "王五",
            institution: "上海交通大学医学院附属瑞金医院",
            issueDate: "2021-05-20",
            expiryDate: "2026-05-19",
          },
        ])
      }, 1000)
    } else {
      setPreviewData(null)
    }
  }

  // 下载模板
  const downloadTemplate = () => {
    toast({
      title: "模板下载成功",
      description: "资质批量导入模板已下载",
    })
  }

  // 开始上传
  const startUpload = async () => {
    if (!file) {
      toast({
        title: "请选择文件",
        description: "请先上传Excel或CSV文件",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // 模拟上传完成
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)

      // 模拟上传结果
      setUploadResult({
        success: true,
        total: 3,
        successful: 2,
        failed: 1,
        details: [
          {
            licenseNumber: "1102023001001",
            name: "张三",
            status: "success",
          },
          {
            licenseNumber: "2202023002002",
            name: "李四",
            status: "success",
          },
          {
            licenseNumber: "1102023003003",
            name: "王五",
            status: "failed",
            reason: "证书编号无效",
          },
        ],
      })

      setActiveTab("result")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" disabled={isUploading}>
            上传文件
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!previewData || isUploading}>
            数据预览
          </TabsTrigger>
          <TabsTrigger value="result" disabled={!uploadResult}>
            导入结果
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">批量导入资质</h3>
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                下载导入模板
              </Button>
            </div>

            <Alert>
              <FileSpreadsheet className="h-4 w-4" />
              <AlertTitle>导入说明</AlertTitle>
              <AlertDescription>
                <p>请使用Excel或CSV格式文件进行批量导入，文件大小不超过10MB。</p>
                <p className="mt-2">文件必须包含以下列：资质类型、证书编号、姓名、发证机构、发证日期、有效期至。</p>
              </AlertDescription>
            </Alert>

            <FileUpload
              onFileChange={handleFileChange}
              accept=".xlsx,.csv"
              maxSize={10}
              label="上传资质数据文件"
              description="支持Excel(.xlsx)和CSV(.csv)格式，最大10MB"
            />

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>上传中...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4 mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">数据预览</h3>
            <p className="text-sm text-muted-foreground">请检查以下数据是否正确，确认无误后点击"开始导入"按钮。</p>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>资质类型</TableHead>
                    <TableHead>证书编号</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>发证机构</TableHead>
                    <TableHead>发证日期</TableHead>
                    <TableHead>有效期至</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {item.type === "doctor-license" && "执业医师资格证"}
                        {item.type === "specialist-certificate" && "专科医师资格证"}
                        {item.type === "practice-permit" && "医疗机构执业许可证"}
                        {item.type === "continuing-education" && "继续教育证书"}
                      </TableCell>
                      <TableCell>{item.licenseNumber}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.institution}</TableCell>
                      <TableCell>{item.issueDate}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="result" className="space-y-4 mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">导入结果</h3>

            {uploadResult && (
              <>
                {uploadResult.success ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>导入完成</AlertTitle>
                    <AlertDescription>
                      共导入 {uploadResult.total} 条记录，成功 {uploadResult.successful} 条，失败 {uploadResult.failed}{" "}
                      条。
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>导入失败</AlertTitle>
                    <AlertDescription>导入过程中发生错误，请检查文件格式后重试。</AlertDescription>
                  </Alert>
                )}

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>证书编号</TableHead>
                        <TableHead>姓名</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>原因</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadResult.details.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.licenseNumber}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            {item.status === "success" ? (
                              <span className="text-green-500 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1" /> 成功
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center">
                                <X className="h-4 w-4 mr-1" /> 失败
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{item.reason || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose} disabled={isUploading}>
          {uploadResult ? "关闭" : "取消"}
        </Button>

        {activeTab === "upload" && (
          <Button onClick={startUpload} disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                上传中...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                上传文件
              </>
            )}
          </Button>
        )}

        {activeTab === "preview" && (
          <Button onClick={startUpload} disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            开始导入
          </Button>
        )}

        {activeTab === "result" && uploadResult && <Button onClick={onClose}>完成</Button>}
      </div>
    </div>
  )
}
