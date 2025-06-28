"use client"

import { useState } from "react"
import { TranslationLoader } from "@/components/translation/translation-loader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TranslationLoaderDemo() {
  const [showLoader, setShowLoader] = useState(false)
  const [size, setSize] = useState<"sm" | "md" | "lg">("md")
  const [message, setMessage] = useState("正在加载翻译资源...")
  const [completed, setCompleted] = useState(false)

  const handleComplete = () => {
    setCompleted(true)
    setShowLoader(false)
  }

  const startLoader = (selectedSize: "sm" | "md" | "lg") => {
    setSize(selectedSize)
    setCompleted(false)
    setShowLoader(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-medical-700">翻译加载器演示</CardTitle>
          <CardDescription>测试不同大小和消息的翻译加载组件</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          {showLoader ? (
            <TranslationLoader size={size} message={message} duration={3000} onComplete={handleComplete} />
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 w-full mb-4">
                <Button variant="outline" onClick={() => startLoader("sm")} className="w-full">
                  小尺寸
                </Button>
                <Button variant="outline" onClick={() => startLoader("md")} className="w-full">
                  中尺寸
                </Button>
                <Button variant="outline" onClick={() => startLoader("lg")} className="w-full">
                  大尺寸
                </Button>
              </div>

              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">自定义消息</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {completed && <div className="text-green-600 font-medium mt-2">加载完成！</div>}
            </>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={() => setShowLoader(false)} variant="outline" className="w-full" disabled={!showLoader}>
            取消
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
