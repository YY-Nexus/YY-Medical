"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  SunMedium,
  Contrast,
  Droplets,
  Palette,
  RotateCcw,
  Undo2,
  Redo2,
  Save,
  Sparkles,
  Layers,
  Sliders,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface AvatarEditorProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onEditComplete: (editedImageUrl: string) => void
}

// 滤镜预设
const FILTERS = [
  { id: "none", name: "原始", class: "" },
  { id: "clinical", name: "临床", class: "brightness-105 contrast-110 saturate-90" },
  { id: "professional", name: "专业", class: "brightness-100 contrast-120 saturate-80 hue-rotate-355" },
  { id: "warm", name: "温暖", class: "brightness-105 contrast-105 saturate-110 sepia-20" },
  { id: "cool", name: "冷静", class: "brightness-100 contrast-110 saturate-90 hue-rotate-180" },
  { id: "sharp", name: "锐利", class: "brightness-110 contrast-130 saturate-100" },
  { id: "soft", name: "柔和", class: "brightness-105 contrast-95 saturate-95 blur-[0.5px]" },
  { id: "vintage", name: "复古", class: "brightness-100 contrast-105 saturate-85 sepia-30" },
  { id: "bw", name: "黑白", class: "grayscale-100" },
]

// 编辑历史记录类型
type EditHistoryEntry = {
  brightness: number
  contrast: number
  saturation: number
  blur: number
  hueRotate: number
  sepia: number
  filterId: string
}

export function AvatarEditor({ isOpen, onClose, imageUrl, onEditComplete }: AvatarEditorProps) {
  // 编辑参数
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [hueRotate, setHueRotate] = useState(0)
  const [sepia, setSepia] = useState(0)
  const [filterId, setFilterId] = useState("none")

  // 编辑历史
  const [history, setHistory] = useState<EditHistoryEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeTab, setActiveTab] = useState("adjust")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { toast } = useToast()

  // 初始化
  useEffect(() => {
    if (isOpen && imageUrl) {
      resetEditor()
      loadImage()
    }
  }, [isOpen, imageUrl])

  // 加载图像
  const loadImage = useCallback(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      renderImage()

      // 初始化历史记录
      const initialState: EditHistoryEntry = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hueRotate: 0,
        sepia: 0,
        filterId: "none",
      }
      setHistory([initialState])
      setHistoryIndex(0)
    }
    img.src = imageUrl
  }, [imageUrl])

  // 重置编辑器
  const resetEditor = useCallback(() => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setBlur(0)
    setHueRotate(0)
    setSepia(0)
    setFilterId("none")
    setHistory([])
    setHistoryIndex(-1)
  }, [])

  // 渲染图像
  const renderImage = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current

    // 设置画布尺寸
    const size = 400
    canvas.width = size
    canvas.height = size

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制图像，居中并裁剪为正方形
    const imgWidth = img.width
    const imgHeight = img.height
    const aspectRatio = imgWidth / imgHeight

    let drawWidth,
      drawHeight,
      offsetX = 0,
      offsetY = 0

    if (aspectRatio >= 1) {
      // 宽图
      drawHeight = size
      drawWidth = drawHeight * aspectRatio
      offsetX = (drawWidth - size) / 2
    } else {
      // 高图
      drawWidth = size
      drawHeight = drawWidth / aspectRatio
      offsetY = (drawHeight - size) / 2
    }

    // 应用滤镜效果
    const filter = []
    if (brightness !== 100) filter.push(`brightness(${brightness}%)`)
    if (contrast !== 100) filter.push(`contrast(${contrast}%)`)
    if (saturation !== 100) filter.push(`saturate(${saturation}%)`)
    if (blur > 0) filter.push(`blur(${blur}px)`)
    if (hueRotate !== 0) filter.push(`hue-rotate(${hueRotate}deg)`)
    if (sepia > 0) filter.push(`sepia(${sepia}%)`)

    if (filter.length > 0) {
      ctx.filter = filter.join(" ")
    } else {
      ctx.filter = "none"
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth - offsetX * 2, drawHeight - offsetY * 2, 0, 0, size, size)

    // 重置滤镜
    ctx.filter = "none"
  }, [brightness, contrast, saturation, blur, hueRotate, sepia])

  // 当编辑参数变化时重新渲染
  useEffect(() => {
    renderImage()
  }, [renderImage])

  // 添加历史记录
  const addHistory = useCallback(() => {
    const currentState: EditHistoryEntry = {
      brightness,
      contrast,
      saturation,
      blur,
      hueRotate,
      sepia,
      filterId,
    }

    // 如果在历史中间进行了编辑，则删除后面的历史
    const newHistory = history.slice(0, historyIndex + 1)
    setHistory([...newHistory, currentState])
    setHistoryIndex(newHistory.length)
  }, [brightness, contrast, saturation, blur, hueRotate, sepia, filterId, history, historyIndex])

  // 撤销
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1]
      setBrightness(prevState.brightness)
      setContrast(prevState.contrast)
      setSaturation(prevState.saturation)
      setBlur(prevState.blur)
      setHueRotate(prevState.hueRotate)
      setSepia(prevState.sepia)
      setFilterId(prevState.filterId)
      setHistoryIndex(historyIndex - 1)
    }
  }, [history, historyIndex])

  // 重做
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      setBrightness(nextState.brightness)
      setContrast(nextState.contrast)
      setSaturation(nextState.saturation)
      setBlur(nextState.blur)
      setHueRotate(nextState.hueRotate)
      setSepia(nextState.sepia)
      setFilterId(nextState.filterId)
      setHistoryIndex(historyIndex + 1)
    }
  }, [history, historyIndex])

  // 重置
  const handleReset = useCallback(() => {
    resetEditor()
    loadImage()
  }, [resetEditor, loadImage])

  // 应用滤镜预设
  const applyFilter = useCallback(
    (id: string) => {
      setFilterId(id)

      if (id === "none") {
        setBrightness(100)
        setContrast(100)
        setSaturation(100)
        setBlur(0)
        setHueRotate(0)
        setSepia(0)
      } else {
        // 根据预设ID设置参数
        switch (id) {
          case "clinical":
            setBrightness(105)
            setContrast(110)
            setSaturation(90)
            setBlur(0)
            setHueRotate(0)
            setSepia(0)
            break
          case "professional":
            setBrightness(100)
            setContrast(120)
            setSaturation(80)
            setBlur(0)
            setHueRotate(355)
            setSepia(0)
            break
          case "warm":
            setBrightness(105)
            setContrast(105)
            setSaturation(110)
            setBlur(0)
            setHueRotate(0)
            setSepia(20)
            break
          case "cool":
            setBrightness(100)
            setContrast(110)
            setSaturation(90)
            setBlur(0)
            setHueRotate(180)
            setSepia(0)
            break
          case "sharp":
            setBrightness(110)
            setContrast(130)
            setSaturation(100)
            setBlur(0)
            setHueRotate(0)
            setSepia(0)
            break
          case "soft":
            setBrightness(105)
            setContrast(95)
            setSaturation(95)
            setBlur(0.5)
            setHueRotate(0)
            setSepia(0)
            break
          case "vintage":
            setBrightness(100)
            setContrast(105)
            setSaturation(85)
            setBlur(0)
            setHueRotate(0)
            setSepia(30)
            break
          case "bw":
            setBrightness(100)
            setContrast(100)
            setSaturation(0)
            setBlur(0)
            setHueRotate(0)
            setSepia(0)
            break
        }
      }

      addHistory()
    },
    [addHistory],
  )

  // 参数调整后添加历史记录
  const handleAdjustmentChange = useCallback(() => {
    addHistory()
  }, [addHistory])

  // 完成编辑
  const handleComplete = useCallback(() => {
    if (!canvasRef.current) return

    try {
      const editedImageUrl = canvasRef.current.toDataURL("image/png")
      onEditComplete(editedImageUrl)
      onClose()

      toast({
        title: "编辑成功",
        description: "头像已成功编辑并应用",
      })
    } catch (error) {
      console.error("保存编辑头像失败:", error)
      toast({
        title: "保存失败",
        description: "无法保存编辑后的头像，请重试",
        variant: "destructive",
      })
    }
  }, [onEditComplete, onClose, toast])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sliders className="mr-2 h-5 w-5 text-primary" />
            头像编辑器
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* 预览区域 */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-primary/20">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex <= 0}>
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
                <Redo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-1 h-4 w-4" />
                重置
              </Button>
            </div>
          </div>

          {/* 编辑控制区域 */}
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="adjust" className="flex items-center">
                  <Sliders className="mr-2 h-4 w-4" />
                  调整参数
                </TabsTrigger>
                <TabsTrigger value="filters" className="flex items-center">
                  <Layers className="mr-2 h-4 w-4" />
                  滤镜预设
                </TabsTrigger>
              </TabsList>

              <TabsContent value="adjust" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <SunMedium className="mr-2 h-4 w-4 text-muted-foreground" />
                      亮度
                    </Label>
                    <span className="text-xs text-muted-foreground">{brightness}%</span>
                  </div>
                  <Slider
                    value={[brightness]}
                    min={50}
                    max={150}
                    step={1}
                    onValueChange={(value) => setBrightness(value[0])}
                    onValueCommit={handleAdjustmentChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <Contrast className="mr-2 h-4 w-4 text-muted-foreground" />
                      对比度
                    </Label>
                    <span className="text-xs text-muted-foreground">{contrast}%</span>
                  </div>
                  <Slider
                    value={[contrast]}
                    min={50}
                    max={150}
                    step={1}
                    onValueChange={(value) => setContrast(value[0])}
                    onValueCommit={handleAdjustmentChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <Palette className="mr-2 h-4 w-4 text-muted-foreground" />
                      饱和度
                    </Label>
                    <span className="text-xs text-muted-foreground">{saturation}%</span>
                  </div>
                  <Slider
                    value={[saturation]}
                    min={0}
                    max={200}
                    step={1}
                    onValueChange={(value) => setSaturation(value[0])}
                    onValueCommit={handleAdjustmentChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <Droplets className="mr-2 h-4 w-4 text-muted-foreground" />
                      模糊
                    </Label>
                    <span className="text-xs text-muted-foreground">{blur}px</span>
                  </div>
                  <Slider
                    value={[blur]}
                    min={0}
                    max={5}
                    step={0.1}
                    onValueChange={(value) => setBlur(value[0])}
                    onValueCommit={handleAdjustmentChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <Palette className="mr-2 h-4 w-4 text-muted-foreground" />
                      色相旋转
                    </Label>
                    <span className="text-xs text-muted-foreground">{hueRotate}°</span>
                  </div>
                  <Slider
                    value={[hueRotate]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value) => setHueRotate(value[0])}
                    onValueCommit={handleAdjustmentChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      复古效果
                    </Label>
                    <span className="text-xs text-muted-foreground">{sepia}%</span>
                  </div>
                  <Slider
                    value={[sepia]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setSepia(value[0])}
                    onValueCommit={handleAdjustmentChange}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="filters" className="mt-4">
                <RadioGroup value={filterId} onValueChange={applyFilter} className="grid grid-cols-3 gap-4">
                  {FILTERS.map((filter) => (
                    <div key={filter.id} className="space-y-2">
                      <div className="relative w-full aspect-square overflow-hidden rounded-md border">
                        <RadioGroupItem value={filter.id} id={`filter-${filter.id}`} className="sr-only" />
                        {imageUrl && (
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={filter.name}
                            className={cn("w-full h-full object-cover", filter.class)}
                          />
                        )}
                        {filterId === filter.id && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-primary" />
                          </div>
                        )}
                      </div>
                      <Label htmlFor={`filter-${filter.id}`} className="text-center block text-xs cursor-pointer">
                        {filter.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleComplete} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            应用编辑
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
