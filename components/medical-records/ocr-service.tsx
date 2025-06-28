"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertTriangle } from "lucide-react"

interface OcrServiceProps {
  imageUrl: string
  onComplete: (result: any) => void
  onCancel: () => void
}

// 原始组件保持不变
export function OcrService({ imageUrl, onComplete, onCancel }: OcrServiceProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStartOcr = () => {
    setIsProcessing(true)

    // 模拟OCR处理
    setTimeout(() => {
      const mockResult = {
        patientInfo: {
          name: "张三",
          id: "P-10045",
        },
        prescriptionInfo: {
          date: "2024-01-01",
          doctor: "李医生",
        },
        medications: [
          { name: "二甲双胍", dosage: "500mg", frequency: "每日三次", duration: "30天" },
          { name: "阿托伐他汀", dosage: "20mg", frequency: "每晚一次", duration: "30天" },
        ],
        warnings: [],
        rawText: "模拟OCR文本",
      }
      onComplete(mockResult)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OCR 服务</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner />
            <p className="mt-2">正在识别处方信息...</p>
          </div>
        ) : (
          <>
            {imageUrl ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Prescription"
                className="max-w-full max-h-80 mb-4 rounded-md"
              />
            ) : (
              <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
            )}
            <Button onClick={handleStartOcr} disabled={isProcessing}>
              开始识别
            </Button>
            <Button variant="outline" onClick={onCancel} className="mt-2">
              取消
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// 添加别名导出，以匹配所需的 OCRService 命名
export const OCRService = OcrService
