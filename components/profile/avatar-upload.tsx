"use client"

import { useState, useCallback, type ChangeEvent, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { AvatarCropper } from "./avatar-cropper"
import { AvatarEditor } from "./avatar-editor"
import { useUserAvatar } from "@/contexts/user-avatar-context"
import { AvatarPresetSelector } from "./avatar-preset-selector"
import { AIAvatarGenerator } from "./ai-avatar-generator"
import { DEFAULT_AVATAR } from "@/types/avatar-presets"
import { Upload, ImageIcon, Pencil } from "lucide-react"

interface AvatarUploadProps {
  currentAvatar?: string | null
  onAvatarChange: (file: File | null, previewUrl: string | null) => void
  className?: string
  size?: "small" | "medium" | "large"
}

export function AvatarUpload({ currentAvatar, onAvatarChange, className, size = "large" }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null | undefined>(currentAvatar || DEFAULT_AVATAR)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { updateAvatar } = useUserAvatar()

  const [showCropper, setShowCropper] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const sizeClasses = {
    small: "h-16 w-16",
    medium: "h-20 w-20",
    large: "h-24 w-24",
  }

  useEffect(() => {
    setPreview(currentAvatar || DEFAULT_AVATAR)
  }, [currentAvatar])

  const handleFileChange = useCallback(
    (file: File | null) => {
      setError(null)

      if (!file) {
        setPreview(currentAvatar || DEFAULT_AVATAR)
        onAvatarChange(null, currentAvatar || DEFAULT_AVATAR)
        return
      }

      // 检查文件类型
      const fileType = file.type
      if (!fileType.startsWith("image/")) {
        setError("请上传图片文件")
        return
      }

      // 检查文件大小 (最大 2MB)
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > 2) {
        setError("图片过大，请上传小于 2MB 的图片")
        return
      }

      // 创建预览并打开裁剪器
      const reader = new FileReader()
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string
        setCropImageUrl(previewUrl)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    },
    [currentAvatar, onAvatarChange],
  )

  const handleCropComplete = useCallback(
    (croppedImageUrl: string) => {
      setPreview(croppedImageUrl)

      // 更新全局头像状态
      updateAvatar(croppedImageUrl)

      // 将 base64 转换为文件对象
      fetch(croppedImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "avatar.png", { type: "image/png" })
          onAvatarChange(file, croppedImageUrl)
        })
        .catch((err) => {
          console.error("转换裁剪图片失败:", err)
          setError("处理图片失败，请重试")
        })
    },
    [onAvatarChange, updateAvatar],
  )

  const handleEditComplete = useCallback(
    (editedImageUrl: string) => {
      setPreview(editedImageUrl)

      // 更新全局头像状态
      updateAvatar(editedImageUrl)

      // 将 base64 转换为文件对象
      fetch(editedImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "edited-avatar.png", { type: "image/png" })
          onAvatarChange(file, editedImageUrl)
        })
        .catch((err) => {
          console.error("转换编辑图片失败:", err)
          setError("处理图片失败，请重试")
        })
    },
    [onAvatarChange, updateAvatar],
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleRemoveAvatar = () => {
    setPreview(DEFAULT_AVATAR)
    updateAvatar(DEFAULT_AVATAR)
    onAvatarChange(null, DEFAULT_AVATAR)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePresetSelect = (avatarPath: string) => {
    setPreview(avatarPath)
    updateAvatar(avatarPath)
    onAvatarChange(null, avatarPath)
  }

  const handleAIAvatarSelect = (avatarUrl: string) => {
    setPreview(avatarUrl)
    updateAvatar(avatarUrl)

    // 从URL获取图像并转换为File对象
    fetch(avatarUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "ai-avatar.png", { type: "image/png" })
        onAvatarChange(file, avatarUrl)
      })
      .catch((err) => {
        console.error("AI头像处理失败:", err)
        setError("AI头像处理失败，请重试")
      })
  }

  const handleEditAvatar = () => {
    if (preview && preview !== DEFAULT_AVATAR) {
      setEditImageUrl(preview)
      setShowEditor(true)
    } else {
      toast({
        title: "无法编辑",
        description: "请先上传或选择头像后再进行编辑",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative group">
        <Avatar className={sizeClasses[size]}>
          {preview ? (
            <AvatarImage src={preview || "/placeholder.svg"} alt="头像" />
          ) : (
            <AvatarFallback>
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>

        {preview && preview !== DEFAULT_AVATAR && (
          <button
            onClick={handleEditAvatar}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="编辑头像"
          >
            <Pencil className="h-6 w-6 text-white" />
          </button>
        )}
      </div>

      <div className="space-y-3 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          <Label
            htmlFor="avatar-upload"
            className="cursor-pointer inline-flex items-center justify-center text-xs h-8 px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Upload className="mr-1 h-3 w-3" />
            上传头像
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
              ref={fileInputRef}
            />
          </Label>
          <AvatarPresetSelector onSelect={handlePresetSelect} currentAvatar={preview || undefined} />
          <AIAvatarGenerator onSelect={handleAIAvatarSelect} />

          {preview && preview !== DEFAULT_AVATAR && (
            <Button variant="outline" size="sm" onClick={handleEditAvatar} className="h-8 text-xs">
              <Pencil className="mr-1 h-3 w-3" />
              编辑头像
            </Button>
          )}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        {preview && preview !== DEFAULT_AVATAR && (
          <Button variant="outline" size="sm" onClick={handleRemoveAvatar} className="h-7 text-xs">
            恢复默认头像
          </Button>
        )}
      </div>

      {cropImageUrl && (
        <AvatarCropper
          isOpen={showCropper}
          onClose={() => setShowCropper(false)}
          imageUrl={cropImageUrl}
          onCropComplete={handleCropComplete}
        />
      )}

      {editImageUrl && (
        <AvatarEditor
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          imageUrl={editImageUrl}
          onEditComplete={handleEditComplete}
        />
      )}
    </div>
  )
}
