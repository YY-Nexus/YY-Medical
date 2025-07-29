"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, FileText, Award, GraduationCap, Building } from "lucide-react"

interface CertificationStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "failed"
  progress: number
  required: boolean
}

interface CertificationStatusTrackerProps {
  steps: CertificationStep[]
  currentStep: number
  onStepClick: (stepIndex: number) => void
}

export function CertificationStatusTracker({ steps, currentStep, onStepClick }: CertificationStatusTrackerProps) {
  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case "basic-info":
        return FileText
      case "license-upload":
        return FileText
      case "specialty-cert":
        return Award
      case "continuing-education":
        return GraduationCap
      case "hospital-verification":
        return Building
      default:
        return FileText
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200"
      case "in-progress":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "failed":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const completedSteps = steps.filter((s) => s.status === "completed").length
  const totalSteps = steps.length
  const overallProgress = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className="h-full p-4 space-y-4">
      {/* 整体进度卡片 */}
      <Card className="border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-blue-900">认证总进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
            <div className="text-xs text-gray-600">
              {completedSteps}/{totalSteps} 已完成
            </div>
          </div>
          <Progress value={overallProgress} className="h-2 bg-blue-100" />
        </CardContent>
      </Card>

      {/* 步骤列表 */}
      <Card className="border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-blue-900">认证步骤</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {steps.map((step, index) => {
            const StepIcon = getStepIcon(step.id)
            const isActive = index === currentStep

            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isActive
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/50"
                }`}
                onClick={() => onStepClick(index)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${getStatusColor(step.status)}`}>
                    <StepIcon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-medium text-gray-900 truncate">{step.title}</h4>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{step.description}</p>

                    {step.required && (
                      <Badge variant="destructive" className="text-xs mb-2">
                        必需
                      </Badge>
                    )}

                    {step.status !== "completed" && step.progress > 0 && (
                      <div className="space-y-1">
                        <Progress value={step.progress} className="h-1 bg-gray-200" />
                        <div className="text-xs text-gray-500">{step.progress}% 完成</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* 快捷操作 */}
      <Card className="border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-blue-900">快捷操作</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <FileText className="h-3 w-3 mr-2" />
            下载认证指南
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <CheckCircle className="h-3 w-3 mr-2" />
            查看认证历史
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <AlertCircle className="h-3 w-3 mr-2" />
            联系客服
          </Button>
        </CardContent>
      </Card>

      {/* 认证提醒 */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-xs font-medium text-amber-900 mb-1">认证提醒</h4>
              <p className="text-xs text-amber-800">请在30天内完成所有必需的认证步骤，以确保账户正常使用。</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
