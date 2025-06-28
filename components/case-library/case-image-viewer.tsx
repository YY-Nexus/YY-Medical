"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { InteractiveImageAnnotation } from "../medical-records/interactive-image-annotation"
import type { CaseImage } from "../../types/case-library"
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Maximize,
  Contrast,
  Move,
  Ruler,
  Pencil,
  Download,
  Info,
  Layers,
  Plus,
  Edit,
  Save,
  Eye,
  EyeOff,
  ImageIcon,
  Lightbulb,
} from "lucide-react"

interface CaseImageViewerProps {
  images: CaseImage[]
}

export function CaseImageViewer({ images }: CaseImageViewerProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [activeTool, setActiveTool] = useState<"pan" | "zoom" | "window" | "measure" | "annotate">("pan")
  const [viewMode, setViewMode] = useState<"single" | "grid" | "compare">("single")
  const [compareImageIndex, setCompareImageIndex] = useState<number | null>(null)
  const [newFinding, setNewFinding] = useState("")

  const selectedImage = images[selectedImageIndex]

  // 处理缩放
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  // 处理旋转
  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleRotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360)
  }

  // 处理亮度调整
  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0])
  }

  // 处理对比度调整
  const handleContrastChange = (value: number[]) => {
    setContrast(value[0])
  }

  // 处理添加发现
  const handleAddFinding = () => {
    if (newFinding.trim() === "") return
    // 在实际应用中，这里应该调用API来保存新的发现
    console.log("添加新发现:", newFinding)
    setNewFinding("")
  }

  // 渲染图像网格
  const renderImageGrid = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
              index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={image.url || "/placeholder.svg"} alt={image.description} className="w-full h-40 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
              {image.type} - {new Date(image.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 渲染比较视图
  const renderCompareView = () => {
    if (compareImageIndex === null) return null

    const compareImage = images[compareImageIndex]

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-800 text-white text-sm p-2">
            当前图像: {selectedImage.type} - {new Date(selectedImage.date).toLocaleDateString()}
          </div>
          <div className="relative">
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.description}
              className="w-full object-contain"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
              }}
            />
            {showAnnotations && <InteractiveImageAnnotation imageId={selectedImage.id} readOnly={!editMode} />}
          </div>
        </div>
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-800 text-white text-sm p-2">
            比较图像: {compareImage.type} - {new Date(compareImage.date).toLocaleDateString()}
          </div>
          <div className="relative">
            <img
              src={compareImage.url || "/placeholder.svg"}
              alt={compareImage.description}
              className="w-full object-contain"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
              }}
            />
            {showAnnotations && <InteractiveImageAnnotation imageId={compareImage.id} readOnly={!editMode} />}
          </div>
        </div>
      </div>
    )
  }

  // 渲染单图像视图
  const renderSingleView = () => {
    return (
      <div className="relative border rounded-md overflow-hidden bg-black">
        <img
          src={selectedImage.url || "/placeholder.svg"}
          alt={selectedImage.description}
          className="w-full object-contain max-h-[500px] mx-auto"
          style={{
            transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
          }}
        />
        {showAnnotations && <InteractiveImageAnnotation imageId={selectedImage.id} readOnly={!editMode} />}
      </div>
    )
  }

  // 如果没有图像
  if (images.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">医学影像</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <ImageIcon className="h-12 w-12 mx-auto mb-4" />
            <p>该病例没有相关影像资料</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">医学影像 ({images.length})</CardTitle>
          <div className="flex gap-2">
            <Select value={viewMode} onValueChange={(value) => setViewMode(value as "single" | "grid" | "compare")}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="查看模式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">单图像</SelectItem>
                <SelectItem value="grid">网格视图</SelectItem>
                <SelectItem value="compare">对比视图</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setFullscreen(!fullscreen)}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 图像缩略图选择器 */}
        {viewMode !== "grid" && (
          <ScrollArea className="whitespace-nowrap pb-4 mb-4">
            <div className="flex gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                    index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    if (viewMode === "compare" && index !== selectedImageIndex) {
                      setCompareImageIndex(index)
                    } else {
                      setSelectedImageIndex(index)
                      if (viewMode === "compare") {
                        setCompareImageIndex(null)
                      }
                    }
                  }}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.description}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs truncate">
                    {image.type}
                  </div>
                  {viewMode === "compare" && index === compareImageIndex && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white p-1 text-xs">比较</div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* 工具栏 */}
        {viewMode !== "grid" && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="px-2 text-sm">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button variant="ghost" size="sm" onClick={handleRotateCounterClockwise}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRotateClockwise}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            <Select value={activeTool} onValueChange={(value) => setActiveTool(value as any)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="选择工具" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pan">
                  <div className="flex items-center">
                    <Move className="h-4 w-4 mr-2" />
                    <span>平移</span>
                  </div>
                </SelectItem>
                <SelectItem value="zoom">
                  <div className="flex items-center">
                    <ZoomIn className="h-4 w-4 mr-2" />
                    <span>缩放</span>
                  </div>
                </SelectItem>
                <SelectItem value="window">
                  <div className="flex items-center">
                    <Contrast className="h-4 w-4 mr-2" />
                    <span>窗宽窗位</span>
                  </div>
                </SelectItem>
                <SelectItem value="measure">
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span>测量</span>
                  </div>
                </SelectItem>
                <SelectItem value="annotate">
                  <div className="flex items-center">
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>标注</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setShowAnnotations(!showAnnotations)}>
              {showAnnotations ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  隐藏标注
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  显示标注
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  保存标注
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  编辑标注
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              下载
            </Button>
          </div>
        )}

        {/* 亮度和对比度控制 */}
        {viewMode !== "grid" && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>亮度: {brightness}%</span>
              </div>
              <Slider value={[brightness]} min={50} max={150} step={1} onValueChange={handleBrightnessChange} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>对比度: {contrast}%</span>
              </div>
              <Slider value={[contrast]} min={50} max={150} step={1} onValueChange={handleContrastChange} />
            </div>
          </div>
        )}

        {/* 主要图像显示区域 */}
        <div className="mb-4">
          {viewMode === "single" && renderSingleView()}
          {viewMode === "grid" && renderImageGrid()}
          {viewMode === "compare" && compareImageIndex !== null && renderCompareView()}
          {viewMode === "compare" && compareImageIndex === null && (
            <div className="flex items-center justify-center h-64 border rounded-md">
              <div className="text-center text-gray-500">
                <Layers className="h-12 w-12 mx-auto mb-4" />
                <p>请从上方缩略图中选择一个图像进行比较</p>
              </div>
            </div>
          )}
        </div>

        {/* 图像信息和发现 */}
        {viewMode !== "grid" && selectedImage && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                图像信息
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">类型</p>
                  <p>{selectedImage.type}</p>
                </div>
                <div>
                  <p className="text-gray-500">日期</p>
                  <p>{new Date(selectedImage.date).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">描述</p>
                  <p>{selectedImage.description}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  影像发现
                </h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      添加发现
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>添加影像发现</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea
                        placeholder="描述您的影像发现..."
                        value={newFinding}
                        onChange={(e) => setNewFinding(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleAddFinding}>保存</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {selectedImage.findings && selectedImage.findings.length > 0 ? (
                <ul className="space-y-2">
                  {selectedImage.findings.map((finding, index) => (
                    <li key={index} className="bg-blue-50 p-3 rounded-md">
                      {finding}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">暂无影像发现记录</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
