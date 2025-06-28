"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize, Contrast, Grid2X2 } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

// 模拟DICOM图像数据
const mockDicomImages = [
  "/placeholder.svg?key=ebaec",
  "/placeholder.svg?key=oc8yq",
  "/placeholder.svg?key=f8stk",
  "/placeholder.svg?key=fkv9b",
  "/placeholder.svg?key=7x522",
  "/placeholder.svg?key=h8lkb",
  "/placeholder.svg?key=57hqf",
  "/placeholder.svg?height=512&width=512&query=CT%20Scan%20Slice%208",
  "/placeholder.svg?height=512&width=512&query=CT%20Scan%20Slice%209",
  "/placeholder.svg?height=512&width=512&query=CT%20Scan%20Slice%2010",
]

interface DicomViewerProps {
  studyId?: string
  seriesId?: string
  className?: string
}

export function DicomViewer({ studyId, seriesId, className = "" }: DicomViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"single" | "grid">("single")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { t } = useTranslation()

  // 加载图像
  useEffect(() => {
    setIsLoading(true)

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = mockDicomImages[currentImageIndex]

    img.onload = () => {
      imageRef.current = img
      drawImage()
      setIsLoading(false)
    }

    img.onerror = () => {
      console.error("图像加载失败")
      setIsLoading(false)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [currentImageIndex])

  // 绘制图像
  const drawImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const img = imageRef.current

    if (!canvas || !ctx || !img) return

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 保存当前状态
    ctx.save()

    // 设置画布中心为旋转中心
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // 旋转
    ctx.rotate((rotation * Math.PI) / 180)

    // 缩放
    const scale = zoom / 100
    ctx.scale(scale, scale)

    // 调整亮度和对比度
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`

    // 绘制图像，居中
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)

    // 恢复状态
    ctx.restore()
  }

  // 当参数变化时重新绘制
  useEffect(() => {
    if (!isLoading) {
      drawImage()
    }
  }, [zoom, rotation, brightness, contrast, isLoading])

  // 处理滑块变化
  const handleSliceChange = (value: number[]) => {
    setCurrentImageIndex(Math.min(Math.floor(value[0]), mockDicomImages.length - 1))
  }

  // 缩放控制
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50))
  const handleZoomReset = () => setZoom(100)

  // 旋转控制
  const handleRotateClockwise = () => setRotation((prev) => (prev + 90) % 360)
  const handleRotateCounterClockwise = () => setRotation((prev) => (prev - 90 + 360) % 360)

  // 亮度对比度控制
  const handleBrightnessChange = (value: number[]) => setBrightness(value[0])
  const handleContrastChange = (value: number[]) => setContrast(value[0])
  const handleResetAdjustments = () => {
    setBrightness(100)
    setContrast(100)
  }

  // 切换视图模式
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "single" ? "grid" : "single"))
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>{t("dicomViewer")}</CardTitle>
        <CardDescription>
          {studyId && seriesId
            ? `${t("viewing")} ${t("study")} ${studyId}, ${t("series")} ${seriesId}`
            : t("dicomViewerDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="viewer" className="space-y-4">
          <TabsList>
            <TabsTrigger value="viewer">{t("viewer")}</TabsTrigger>
            <TabsTrigger value="adjustments">{t("adjustments")}</TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="space-y-4">
            <div className="relative aspect-square w-full bg-black rounded-md overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : viewMode === "single" ? (
                <canvas ref={canvasRef} width={512} height={512} className="w-full h-full object-contain" />
              ) : (
                <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full w-full">
                  {[0, 1, 2, 3].map((offset) => {
                    const index = (currentImageIndex + offset) % mockDicomImages.length
                    return (
                      <div key={index} className="relative bg-black">
                        <img
                          src={mockDicomImages[index] || "/placeholder.svg"}
                          alt={`DICOM Slice ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {index + 1}/{mockDicomImages.length}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {!isLoading && viewMode === "single" && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1}/{mockDicomImages.length}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("slice")}</span>
                <span className="text-sm font-medium">
                  {currentImageIndex + 1}/{mockDicomImages.length}
                </span>
              </div>
              <Slider
                value={[currentImageIndex]}
                max={mockDicomImages.length - 1}
                step={1}
                onValueChange={handleSliceChange}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4 mr-1" />
                {t("zoomIn")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4 mr-1" />
                {t("zoomOut")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomReset}>
                {zoom}%
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotateClockwise}>
                <RotateCw className="h-4 w-4 mr-1" />
                90°
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotateCounterClockwise}>
                <RotateCcw className="h-4 w-4 mr-1" />
                -90°
              </Button>
              <Button variant="outline" size="sm" onClick={toggleViewMode}>
                {viewMode === "single" ? (
                  <>
                    <Grid2X2 className="h-4 w-4 mr-1" />
                    {t("gridView")}
                  </>
                ) : (
                  <>
                    <Maximize className="h-4 w-4 mr-1" />
                    {t("singleView")}
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="adjustments" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("brightness")}</span>
                  <span className="text-sm font-medium">{brightness}%</span>
                </div>
                <Slider value={[brightness]} min={0} max={200} step={1} onValueChange={handleBrightnessChange} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("contrast")}</span>
                  <span className="text-sm font-medium">{contrast}%</span>
                </div>
                <Slider value={[contrast]} min={0} max={200} step={1} onValueChange={handleContrastChange} />
              </div>

              <Button variant="outline" onClick={handleResetAdjustments}>
                <Contrast className="h-4 w-4 mr-1" />
                {t("resetAdjustments")}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentImageIndex === 0}
          onClick={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          disabled={currentImageIndex === mockDicomImages.length - 1}
          onClick={() => setCurrentImageIndex((prev) => Math.min(prev + 1, mockDicomImages.length - 1))}
        >
          {t("next")}
        </Button>
      </CardFooter>
    </Card>
  )
}
