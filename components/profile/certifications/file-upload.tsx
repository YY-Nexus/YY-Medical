"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText, ImageIcon, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileChange: (file: File | null) => void
  accept?: string
  maxSize?: number // 单位：MB
  label?: string
  description?: string
}

export function FileUpload({
  onFileChange,
  accept = "image/*,application/pdf",
  maxSize = 5, // 默认5MB
  label = "上传文件",
  description = "支持JPG、PNG和PDF格式，最大5MB",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selectedFile: File | null) => {
    setError(null)

    if (!selectedFile) {
      setFile(null)
      setPreview(null)
      onFileChange(null)
      return
    }

    // 检查文件类型
    const fileType = selectedFile.type
    const isAccepted = accept
      .split(",")
      .some((type) => fileType.match(type.trim()) || (type.includes("image/") && fileType.includes("image/")))

    if (!isAccepted) {
      setError(`不支持的文件类型: ${fileType}`)
      return
    }

    // 检查文件大小
    const fileSizeMB = selectedFile.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`文件过大，最大支持 ${maxSize}MB`)
      return
    }

    setFile(selectedFile)
    onFileChange(selectedFile)

    // 创建预览
    if (fileType.includes("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    onFileChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const getFileIcon = () => {
    if (!file) return <Upload className="h-8 w-8 text-muted-foreground" />

    const fileType = file.type
    if (fileType.includes("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          error && "border-red-500 bg-red-50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {file ? (
            <div className="flex flex-col items-center">
              {getFileIcon()}
              <div className="mt-2 text-sm font-medium">{file.name}</div>
              <div className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
              >
                <X className="h-4 w-4 mr-1" />
                移除
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                {getFileIcon()}
                <div className="mt-2 text-sm font-medium">拖放文件到此处或点击上传</div>
                <div className="text-xs text-muted-foreground mt-1">{description}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      {preview && (
        <div className="mt-4">
          <Label>预览</Label>
          <div className="mt-1 border rounded-md overflow-hidden">
            <img src={preview || "/placeholder.svg"} alt="文件预览" className="max-h-48 mx-auto" />
          </div>
        </div>
      )}
    </div>
  )
}
