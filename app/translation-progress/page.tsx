"use client"

import { useState } from "react"
import { TranslationProgress } from "@/components/translation/translation-progress"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function TranslationProgressPage() {
  const [showProgress, setShowProgress] = useState(false)
  const router = useRouter()

  const handleComplete = () => {
    // 完成后可以跳转到其他页面
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100">
      {showProgress ? (
        <TranslationProgress
          onComplete={handleComplete}
          totalItems={120}
          translatedItems={0}
          autoComplete={true}
          completionTime={5000}
        />
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-medical-700">翻译进度演示</h1>
          <p className="mb-8 text-gray-600 max-w-md">
            点击下方按钮查看翻译进度加载动画。这个动画会显示翻译资源的加载进度，并在完成后自动跳转。
          </p>
          <Button size="lg" onClick={() => setShowProgress(true)} className="bg-medical-600 hover:bg-medical-700">
            显示翻译进度
          </Button>
        </div>
      )}
    </div>
  )
}
