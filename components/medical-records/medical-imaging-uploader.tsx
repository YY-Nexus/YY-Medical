"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Search, ZoomIn, RotateCw, Download, Trash2 } from "lucide-react"

// 模拟CT图像数据
const mockImages = [
  {
    id: "img-001",
    fileName: "胸部CT-张三-20230512.dcm",
    thumbnailUrl: "/placeholder.svg?key=pc9ej",
    fullImageUrl: "/placeholder.svg?key=89ehp",
    patientName: "张三",
    patientId: "P-10045",
    studyDate: "2023-05-12",
    modality: "CT",
    bodyPart: "胸部",
    description: "常规胸部CT扫描，无明显异常",
    uploadedBy: "李医生",
    uploadedAt: "2023-05-12 14:30",
    tags: ["常规检查", "年度体检"],
    size: "15.2 MB",
  },
  {
    id: "img-002",
    fileName: "头颅MRI-李四-20230510.dcm",
    thumbnailUrl: "/placeholder.svg?key=11r3y",
    fullImageUrl: "/placeholder.svg?key=g8qhe",
    patientName: "李四",
    patientId: "P-10078",
    studyDate: "2023-05-10",
    modality: "MRI",
    bodyPart: "头颅",
    description: "头颅MRI检查，发现小面积缺血性病变",
    uploadedBy: "王医生",
    uploadedAt: "2023-05-10 09:45",
    tags: ["神经科", "头痛诊断"],
    size: "22.8 MB",
  },
  {
    id: "img-003",
    fileName: "腹部超声-王五-20230508.dcm",
    thumbnailUrl: "/placeholder.svg?key=iqg8f",
    fullImageUrl: "/placeholder.svg?key=lv5x7",
    patientName: "王五",
    patientId: "P-10103",
    studyDate: "2023-05-08",
    modality: "超声",
    bodyPart: "腹部",
    description: "腹部超声检查，肝脏轻度脂肪浸润",
    uploadedBy: "张医生",
    uploadedAt: "2023-05-08 16:15",
    tags: ["消化科", "脂肪肝"],
    size: "8.5 MB",
  },
  {
    id: "img-004",
    fileName: "肺部X光-赵六-20230506.dcm",
    thumbnailUrl: "/placeholder.svg?key=ehuiu",
    fullImageUrl: "/placeholder.svg?height=800&width=800&query=肺部X光片高清图像",
    patientName: "赵六",
    patientId: "P-10156",
    studyDate: "2023-05-06",
    modality: "X光",
    bodyPart: "肺部",
    description: "肺部X光检查，右肺下叶见小结节影",
    uploadedBy: "刘医生",
    uploadedAt: "2023-05-06 11:20",
    tags: ["呼吸科", "随访检查"],
    size: "4.2 MB",
  },
]

export function MedicalImagingUploader() {
  const [images, setImages] = useState(mockImages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModality, setSelectedModality] = useState("全部")
  const [selectedImage, setSelectedImage] = useState<(typeof mockImages)[0] | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(100)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 过滤图像
  const filteredImages = images.filter((img) => {
    const matchesSearch =
      img.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesModality = selectedModality === "全部" || img.modality === selectedModality

    return matchesSearch && matchesModality
  })

  // 触发文件选择
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    // 模拟上传过程
    setTimeout(() => {
      const newImages = Array.from(files).map((file, index) => {
        const now = new Date()
        const dateStr = now.toISOString().split("T")[0]
        const timeStr = now.toTimeString().split(" ")[0]

        return {
          id: `img-new-${Date.now()}-${index}`,
          fileName: file.name,
          thumbnailUrl: "/placeholder.svg?height=100&width=100&query=新上传的医学影像",
          fullImageUrl: "/placeholder.svg?height=800&width=800&query=新上传的医学影像高清图像",
          patientName: "待关联",
          patientId: "待关联",
          studyDate: dateStr,
          modality: "待分类",
          bodyPart: "待标记",
          description: "新上传的医学影像，等待描述",
          uploadedBy: "当前用户",
          uploadedAt: `${dateStr} ${timeStr}`,
          tags: ["新上传"],
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }
      })

      setImages([...newImages, ...images])
      setIsUploading(false)

      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 1500)
  }

  // 查看图像
  const viewImage = (image: (typeof mockImages)[0]) => {
    setSelectedImage(image)
    setIsViewerOpen(true)
    setRotation(0)
    setZoom(100)
  }

  // 旋转图像
  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  // 缩放图像
  const handleZoomChange = (value: string) => {
    setZoom(Number.parseInt(value))
  }

  // 删除图像
  const deleteImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>医学影像管理</CardTitle>
          <CardDescription>上传、查看和管理CT、MRI、X光等医学影像</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">浏览影像</TabsTrigger>
              <TabsTrigger value="upload">上传新影像</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索患者姓名、文件名或描述..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedModality} onValueChange={setSelectedModality}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="影像类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部">全部类型</SelectItem>
                    <SelectItem value="CT">CT</SelectItem>
                    <SelectItem value="MRI">MRI</SelectItem>
                    <SelectItem value="X光">X光</SelectItem>
                    <SelectItem value="超声">超声</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div
                      className="h-40 bg-gray-100 flex items-center justify-center cursor-pointer"
                      onClick={() => viewImage(image)}
                    >
                      <img
                        src={image.thumbnailUrl || "/placeholder.svg"}
                        alt={image.fileName}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium truncate mr-2" title={image.fileName}>
                          {image.fileName}
                        </div>
                        <Badge variant="outline">{image.modality}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        患者: {image.patientName} ({image.patientId})
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">检查日期: {image.studyDate}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {image.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => viewImage(image)}>
                        <ZoomIn className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deleteImage(image.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        删除
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-10">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">没有找到匹配的影像</h3>
                  <p className="mt-1 text-gray-500">尝试调整搜索条件或上传新的影像</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>上传医学影像</CardTitle>
                  <CardDescription>支持DICOM、JPG、PNG等格式的医学影像文件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">拖放文件到此处或点击上传</h3>
                    <p className="text-sm text-gray-500 mb-4">支持单个文件最大50MB，可同时上传多个文件</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                      accept=".dcm,.jpg,.jpeg,.png"
                    />
                    <Button onClick={handleUploadClick} disabled={isUploading}>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 图像查看器对话框 */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>{selectedImage?.fileName}</DialogTitle>
            <DialogDescription>
              患者: {selectedImage?.patientName} | 检查日期: {selectedImage?.studyDate} | 类型:{" "}
              {selectedImage?.modality}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-black rounded-md overflow-hidden relative">
            <div className="flex justify-center items-center h-[60vh]">
              {selectedImage && (
                <img
                  src={selectedImage.fullImageUrl || "/placeholder.svg"}
                  alt={selectedImage.fileName}
                  className="max-h-full max-w-full object-contain transition-transform"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                  }}
                />
              )}
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button variant="secondary" size="sm" onClick={rotateImage}>
                <RotateCw className="h-4 w-4 mr-1" />
                旋转
              </Button>
              <div className="flex items-center bg-secondary rounded-md px-2">
                <span className="text-xs mr-2">缩放:</span>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={zoom}
                  onChange={(e) => handleZoomChange(e.target.value)}
                  className="w-24"
                />
                <span className="text-xs ml-1">{zoom}%</span>
              </div>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-1" />
                下载
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">影像信息</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">检查部位:</span>
                  <span>{selectedImage?.bodyPart}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">上传者:</span>
                  <span>{selectedImage?.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">上传时间:</span>
                  <span>{selectedImage?.uploadedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">文件大小:</span>
                  <span>{selectedImage?.size}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">检查描述</h4>
              <p className="text-sm">{selectedImage?.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedImage?.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
