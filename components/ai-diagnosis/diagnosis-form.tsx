"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, FileText, ImageIcon, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DiagnosisForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState<null | {
    diagnosis: string
    confidence: number
    differentials: string[]
    recommendations: string[]
  }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      setDiagnosisResult({
        diagnosis: "2型糖尿病（T2DM）",
        confidence: 0.92,
        differentials: ["1型糖尿病", "妊娠糖尿病", "继发性糖尿病"],
        recommendations: [
          "口服降糖药物治疗",
          "生活方式干预（饮食控制、增加运动）",
          "定期监测血糖水平",
          "糖尿病教育和自我管理培训",
        ],
      })

      setIsLoading(false)
      toast({
        title: "诊断完成",
        description: "智能诊断已完成，请查看结果",
      })
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>患者信息与症状</CardTitle>
          <CardDescription>请输入患者信息和症状描述，或上传相关医疗数据</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">年龄</Label>
                <Input id="age" type="number" placeholder="请输入年龄" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">性别</Label>
                <Select defaultValue="male">
                  <SelectTrigger>
                    <SelectValue placeholder="选择性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">男</SelectItem>
                    <SelectItem value="female">女</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">症状描述</Label>
              <Textarea id="symptoms" placeholder="请详细描述患者症状、病史和当前状况..." className="min-h-[120px]" />
            </div>

            <div className="space-y-2">
              <Label>上传医疗数据</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="h-20 flex flex-col items-center justify-center gap-1"
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">上传检验报告</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="h-20 flex flex-col items-center justify-center gap-1"
                >
                  <ImageIcon className="h-5 w-5" />
                  <span className="text-xs">上传医学影像</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="consent" />
              <label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                我已获得患者同意使用AI辅助诊断
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  正在诊断...
                </>
              ) : (
                "开始智能诊断"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>诊断结果</CardTitle>
          <CardDescription>AI辅助诊断结果及建议</CardDescription>
        </CardHeader>
        <CardContent>
          {diagnosisResult ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">主要诊断</h3>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-blue-800">{diagnosisResult.diagnosis}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    置信度: {(diagnosisResult.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">鉴别诊断</h3>
                <ul className="space-y-2">
                  {diagnosisResult.differentials.map((diff, index) => (
                    <li key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <span>
                        {index + 1}. {diff}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">治疗建议</h3>
                <ul className="space-y-2">
                  {diagnosisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center p-2 bg-green-50 rounded">
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center p-4 bg-amber-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-sm text-amber-700">此诊断仅供参考，最终诊断和治疗方案应由医生决定。</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">等待诊断</h3>
              <p className="text-gray-500 mb-4">请在左侧填写患者信息并提交，AI将为您提供诊断建议</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {diagnosisResult && (
            <>
              <Button variant="outline">保存诊断结果</Button>
              <Button variant="outline">导出报告</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
