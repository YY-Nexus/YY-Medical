"use client"

import { useState } from "react"
import { CloudLogo } from "./cloud-logo"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Download, Copy, Check, Code } from "lucide-react"

export function LogoShowcase() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("lg")
  const [animated, setAnimated] = useState(true)
  const [bgColor, setBgColor] = useState("bg-white")
  const [copied, setCopied] = useState(false)

  const sizeOptions: Array<"sm" | "md" | "lg" | "xl"> = ["sm", "md", "lg", "xl"]
  const bgOptions = [
    { value: "bg-white", label: "白色" },
    { value: "bg-gray-100", label: "浅灰" },
    { value: "bg-gray-900", label: "深色" },
    { value: "bg-blue-50", label: "浅蓝" },
    { value: "bg-gradient-to-br from-blue-50 to-cyan-100", label: "渐变" },
  ]

  const handleCopyCode = () => {
    const code = `<CloudLogo size="${size}" animated={${animated}} />`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    // 这里可以实现下载功能
    alert("下载功能将在实际应用中实现")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>YY Cloud³ 标志展示</CardTitle>
        <CardDescription>查看不同尺寸和背景下的标志效果，并获取组件代码</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">预览</TabsTrigger>
            <TabsTrigger value="usage">使用方法</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            <div
              className={`flex items-center justify-center p-10 rounded-lg ${bgColor} transition-colors duration-300`}
            >
              <CloudLogo size={size} animated={animated} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">尺寸</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((option) => (
                      <Button
                        key={option}
                        variant={size === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSize(option)}
                      >
                        {option.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="animated" checked={animated} onCheckedChange={setAnimated} />
                  <Label htmlFor="animated">启用动画效果</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-2">背景</h3>
                <div className="grid grid-cols-2 gap-2">
                  {bgOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={bgColor === option.value ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setBgColor(option.value)}
                    >
                      <div className={`w-4 h-4 rounded mr-2 ${option.value}`}></div>
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">组件代码</h3>
                <Button variant="ghost" size="sm" onClick={handleCopyCode} className="h-8 gap-1">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "已复制" : "复制"}
                </Button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`import { CloudLogo } from "@/components/brand/cloud-logo"

// 在您的组件中使用
<CloudLogo size="${size}" animated={${animated}} />`}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">属性说明</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">size</code> - 标志尺寸，可选值: "sm", "md", "lg",
                  "xl"
                </li>
                <li>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">animated</code> - 是否启用悬停动画效果
                </li>
                <li>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">className</code> - 自定义CSS类名
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Button onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                下载SVG格式
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">YY Cloud³ 品牌标识 © 2023</p>
        <Button variant="outline" size="sm" className="gap-1">
          <Code className="h-4 w-4" />
          查看完整代码
        </Button>
      </CardFooter>
    </Card>
  )
}
