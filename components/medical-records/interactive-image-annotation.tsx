"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import {
  ImageIcon,
  Crosshair,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Square,
  Circle,
  Pencil,
  Trash2,
  Plus,
  Layers,
  Info,
} from "lucide-react"
import { imagingFeatureService } from "../../services/imaging-feature-service"
import type { ImagingFeature, ModalityType, AnatomicalRegion, ImageMarker } from "../../types/imaging-features"

interface InteractiveImageAnnotationProps {
  selectedImage: string
  modality: ModalityType
  anatomicalRegion: AnatomicalRegion
  onAnnotationComplete?: (markers: ImageMarker[]) => void
}

export function InteractiveImageAnnotation({
  selectedImage,
  modality,
  anatomicalRegion,
  onAnnotationComplete,
}: InteractiveImageAnnotationProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [activeTab, setActiveTab] = useState("annotation")
  const [selectedTool, setSelectedTool] = useState<"rectangle" | "circle" | "freehand" | "point">("rectangle")
  const [isDrawing, setIsDrawing] = useState(false)
  const [markers, setMarkers] = useState<ImageMarker[]>([])
  const [currentMarker, setCurrentMarker] = useState<Partial<ImageMarker> | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const [availableFeatures, setAvailableFeatures] = useState<ImagingFeature[]>([])
  const [selectedFeature, setSelectedFeature] = useState<ImagingFeature | null>(null)
  const [markerDescription, setMarkerDescription] = useState("")
  const [showFeaturePanel, setShowFeaturePanel] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 加载可用特征
  useEffect(() => {
    const features = imagingFeatureService.getFeaturesByModalityAndRegion(modality, anatomicalRegion)
    setAvailableFeatures(features)
    if (features.length > 0) {
      setSelectedFeature(features[0])
    }
  }, [modality, anatomicalRegion])

  // 加载图像
  useEffect(() => {
    if (!selectedImage) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = selectedImage
    img.onload = () => {
      imageRef.current = img
      drawImage()
    }
  }, [selectedImage])

  // 重绘画布
  useEffect(() => {
    drawImage()
  }, [zoomLevel, brightness, contrast, markers, selectedMarker])

  // 绘制图像和标记
  const drawImage = () => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current
    const container = containerRef.current

    if (!container) return

    // 设置画布大小
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 计算图像绘制尺寸和位置
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * zoomLevel
    const x = (canvas.width - img.width * scale) / 2
    const y = (canvas.height - img.height * scale) / 2

    // 应用亮度和对比度
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`

    // 绘制图像
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

    // 重置滤镜
    ctx.filter = "none"

    // 绘制标记
    markers.forEach((marker) => {
      const isSelected = marker.id === selectedMarker

      ctx.strokeStyle = isSelected ? "#3b82f6" : "#ef4444"
      ctx.lineWidth = isSelected ? 3 : 2

      const { x: markerX, y: markerY, width = 50, height = 50 } = marker.coordinates

      // 转换坐标到当前缩放和平移
      const drawX = x + markerX * scale
      const drawY = y + markerY * scale
      const drawWidth = width * scale
      const drawHeight = height * scale

      // 绘制矩形
      ctx.strokeRect(drawX, drawY, drawWidth, drawHeight)

      // 绘制标记ID
      ctx.fillStyle = isSelected ? "#3b82f6" : "#ef4444"
      ctx.font = "14px Arial"
      ctx.fillText(marker.id.slice(0, 4), drawX, drawY - 5)
    })

    // 绘制当前正在创建的标记
    if (currentMarker && isDrawing) {
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2

      const {
        x: markerX,
        y: markerY,
        width = 50,
        height = 50,
      } = currentMarker.coordinates || {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }

      // 转换坐标到当前缩放和平移
      const drawX = x + markerX * scale
      const drawY = y + markerY * scale
      const drawWidth = width * scale
      const drawHeight = height * scale

      // 绘制矩形
      ctx.strokeRect(drawX, drawY, drawWidth, drawHeight)
    }
  }

  // 处理鼠标按下事件
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 转换坐标到图像空间
    const img = imageRef.current
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * zoomLevel
    const imgX = (canvas.width - img.width * scale) / 2
    const imgY = (canvas.height - img.height * scale) / 2

    // 检查是否点击了现有标记
    const clickedMarker = markers.find((marker) => {
      const { x: markerX, y: markerY, width = 50, height = 50 } = marker.coordinates
      const drawX = imgX + markerX * scale
      const drawY = imgY + markerY * scale
      const drawWidth = width * scale
      const drawHeight = height * scale

      return x >= drawX && x <= drawX + drawWidth && y >= drawY && y <= drawY + drawHeight
    })

    if (clickedMarker) {
      setSelectedMarker(clickedMarker.id)
      return
    }

    // 开始创建新标记
    setIsDrawing(true)
    setCurrentMarker({
      coordinates: {
        x: (x - imgX) / scale,
        y: (y - imgY) / scale,
        width: 0,
        height: 0,
      },
    })
  }

  // 处理鼠标移动事件
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentMarker || !canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 转换坐标到图像空间
    const img = imageRef.current
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * zoomLevel
    const imgX = (canvas.width - img.width * scale) / 2
    const imgY = (canvas.height - img.height * scale) / 2

    // 更新当前标记的尺寸
    const startX = currentMarker.coordinates?.x || 0
    const startY = currentMarker.coordinates?.y || 0
    const currentX = (x - imgX) / scale
    const currentY = (y - imgY) / scale

    setCurrentMarker({
      ...currentMarker,
      coordinates: {
        x: Math.min(startX, currentX),
        y: Math.min(startY, currentY),
        width: Math.abs(currentX - startX),
        height: Math.abs(currentY - startY),
      },
    })
  }

  // 处理鼠标释放事件
  const handleMouseUp = () => {
    if (!isDrawing || !currentMarker || !selectedFeature) return

    // 创建新标记
    const newMarker: ImageMarker = {
      id: `marker-${Date.now()}`,
      imageId: selectedImage,
      featureId: selectedFeature.id,
      coordinates: currentMarker.coordinates || { x: 0, y: 0 },
      description: markerDescription || selectedFeature.name,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
    }

    setMarkers([...markers, newMarker])
    setIsDrawing(false)
    setCurrentMarker(null)
    setMarkerDescription("")

    // 回调
    if (onAnnotationComplete) {
      onAnnotationComplete([...markers, newMarker])
    }
  }

  // 删除选中的标记
  const deleteSelectedMarker = () => {
    if (!selectedMarker) return

    const updatedMarkers = markers.filter((marker) => marker.id !== selectedMarker)
    setMarkers(updatedMarkers)
    setSelectedMarker(null)

    // 回调
    if (onAnnotationComplete) {
      onAnnotationComplete(updatedMarkers)
    }
  }

  // 清除所有标记
  const clearAllMarkers = () => {
    setMarkers([])
    setSelectedMarker(null)

    // 回调
    if (onAnnotationComplete) {
      onAnnotationComplete([])
    }
  }

  // 处理特征选择
  const handleFeatureSelect = (feature: ImagingFeature) => {
    setSelectedFeature(feature)
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-blue-600" />
          交互式影像标注
        </CardTitle>
        <CardDescription>标注影像特征并关联医学知识库</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* 左侧特征列表 */}
          {showFeaturePanel && (
            <div className="border-r border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">可用特征</h3>
                <p className="text-sm text-gray-500 mb-4">
                  选择要标注的{modality}影像{anatomicalRegion}特征
                </p>
              </div>

              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <div className="space-y-2">
                  {availableFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedFeature?.id === feature.id
                          ? "bg-blue-100 border-l-4 border-blue-500"
                          : "hover:bg-gray-100 border-l-4 border-transparent"
                      }`}
                      onClick={() => handleFeatureSelect(feature)}
                    >
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* 右侧标注区域 */}
          <div className={showFeaturePanel ? "col-span-3" : "col-span-4"}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b">
                <TabsList className="p-0 bg-transparent h-12">
                  <TabsTrigger
                    value="annotation"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    <Crosshair className="h-4 w-4 mr-2" />
                    标注工具
                  </TabsTrigger>
                  <TabsTrigger
                    value="adjustment"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    图像调整
                  </TabsTrigger>
                  <TabsTrigger
                    value="markers"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    标记列表
                    {markers.length > 0 && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">{markers.length}</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4">
                {/* 工具栏 */}
                <div className="flex justify-between mb-4">
                  <div className="flex gap-2">
                    {activeTab === "annotation" && (
                      <>
                        <Button
                          variant={selectedTool === "rectangle" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTool("rectangle")}
                        >
                          <Square className="h-4 w-4 mr-2" />
                          矩形
                        </Button>
                        <Button
                          variant={selectedTool === "circle" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTool("circle")}
                        >
                          <Circle className="h-4 w-4 mr-2" />
                          圆形
                        </Button>
                        <Button
                          variant={selectedTool === "freehand" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTool("freehand")}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          自由绘制
                        </Button>
                        <Button
                          variant={selectedTool === "point" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTool("point")}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          点标记
                        </Button>
                      </>
                    )}

                    {activeTab === "adjustment" && (
                      <>
                        <div className="flex items-center gap-2">
                          <ZoomOut className="h-4 w-4 text-gray-500" />
                          <Slider
                            value={[zoomLevel]}
                            min={0.5}
                            max={3}
                            step={0.1}
                            className="w-32"
                            onValueChange={(value) => setZoomLevel(value[0])}
                          />
                          <ZoomIn className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500 ml-2">{Math.round(zoomLevel * 100)}%</span>
                        </div>
                      </>
                    )}

                    {activeTab === "markers" && selectedMarker && (
                      <Button variant="destructive" size="sm" onClick={deleteSelectedMarker}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        删除标记
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFeaturePanel(!showFeaturePanel)}
                      title={showFeaturePanel ? "隐藏特征面板" : "显示特征面板"}
                    >
                      {showFeaturePanel ? <ImageIcon className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setZoomLevel(1)} title="重置缩放">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    {markers.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearAllMarkers} title="清除所有标记">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* 亮度和对比度控制 (仅在调整选项卡中显示) */}
                {activeTab === "adjustment" && (
                  <div className="mb-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-16">亮度:</span>
                      <Slider
                        value={[brightness]}
                        min={50}
                        max={150}
                        step={1}
                        className="flex-1"
                        onValueChange={(value) => setBrightness(value[0])}
                      />
                      <span className="text-sm text-gray-500 w-12">{brightness}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-16">对比度:</span>
                      <Slider
                        value={[contrast]}
                        min={50}
                        max={150}
                        step={1}
                        className="flex-1"
                        onValueChange={(value) => setContrast(value[0])}
                      />
                      <span className="text-sm text-gray-500 w-12">{contrast}%</span>
                    </div>
                  </div>
                )}

                {/* 标记列表 (仅在标记选项卡中显示) */}
                {activeTab === "markers" && (
                  <div className="mb-4">
                    {markers.length > 0 ? (
                      <div className="space-y-2">
                        {markers.map((marker) => {
                          const feature = availableFeatures.find((f) => f.id === marker.featureId)
                          return (
                            <div
                              key={marker.id}
                              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedMarker === marker.id
                                  ? "bg-blue-100 border-l-4 border-blue-500"
                                  : "hover:bg-gray-100 border-l-4 border-transparent"
                              }`}
                              onClick={() => setSelectedMarker(marker.id)}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{feature?.name || "未知特征"}</h4>
                                <Badge variant="outline" className="text-xs">
                                  ID: {marker.id.slice(0, 8)}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{marker.description}</p>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>暂无标记</p>
                        <p className="text-sm mt-2">使用标注工具在图像上创建标记</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 画布容器 */}
                <div
                  ref={containerRef}
                  className="relative border rounded-md overflow-hidden"
                  style={{ height: "500px" }}
                >
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                </div>

                {/* 标记描述输入 (仅在标注选项卡中显示) */}
                {activeTab === "annotation" && selectedFeature && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">当前选择: {selectedFeature.name}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {selectedFeature.modalities.join(", ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{selectedFeature.description}</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="标记描述（可选）"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={markerDescription}
                        onChange={(e) => setMarkerDescription(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
