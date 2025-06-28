"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface AvatarCropperProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onCropComplete: (croppedImageUrl: string) => void
}

export function AvatarCropper({ isOpen, onClose, imageUrl, onCropComplete }: AvatarCropperProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // 加载图片
  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      drawImage()
    }
    img.src = imageUrl
  }, [imageUrl])

  // 当缩放或旋转变化时重绘
  useEffect(() => {
    drawImage()
  }, [scale, rotation])

  const drawImage = () => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    const size = 300
    canvas.width = size
    canvas.height = size

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 保存当前状态
    ctx.save()

    // 移动到画布中心
    ctx.translate(size / 2, size / 2)

    // 旋转
    ctx.rotate((rotation * Math.PI) / 180)

    // 缩放
    ctx.scale(scale, scale)

    // 绘制图像，居中
    const img = imageRef.current
    const imgWidth = img.width
    const imgHeight = img.height
    const aspectRatio = imgWidth / imgHeight

    let drawWidth, drawHeight
    if (aspectRatio >= 1) {
      // 宽图
      drawHeight = size
      drawWidth = drawHeight * aspectRatio
    } else {
      // 高图
      drawWidth = size
      drawHeight = drawWidth / aspectRatio
    }

    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)

    // 恢复状态
    ctx.restore()
  }

  const handleCrop = () => {
    if (!canvasRef.current) return

    const croppedImageUrl = canvasRef.current.toDataURL("image/png")
    onCropComplete(croppedImageUrl)
    onClose()
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>裁剪头像</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-[300px] h-[300px] border rounded-full overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" style={{ borderRadius: "50%" }} />
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <ZoomOut className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[scale]}
                min={0.5}
                max={2}
                step={0.01}
                onValueChange={(value) => setScale(value[0])}
                className="mx-2 flex-1"
              />
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm" onClick={handleRotate} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              旋转
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleCrop}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
