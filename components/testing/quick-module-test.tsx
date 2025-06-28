"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, RefreshCw, Play } from "lucide-react"
import Link from "next/link"

interface QuickTestResult {
  module: string
  route: string
  status: "success" | "warning" | "error" | "testing" | "pending"
  message: string
  description: string
}

const initialTests: QuickTestResult[] = [
  {
    module: "AI智能诊断",
    route: "/ai-diagnosis",
    status: "pending",
    message: "等待测试",
    description: "AI模型加载和诊断功能",
  },
  {
    module: "患者管理",
    route: "/patients",
    status: "pending",
    message: "等待测试",
    description: "患者数据管理和查询",
  },
  {
    module: "临床决策",
    route: "/clinical-decision",
    status: "pending",
    message: "等待测试",
    description: "临床决策支持系统",
  },
  {
    module: "医疗记录",
    route: "/medical-records",
    status: "pending",
    message: "等待测试",
    description: "医疗记录上传和管理",
  },
  {
    module: "健康数据",
    route: "/health-data",
    status: "pending",
    message: "等待测试",
    description: "健康数据分析和可视化",
  },
  {
    module: "远程会诊",
    route: "/teleconsultation",
    status: "pending",
    message: "等待测试",
    description: "视频通话和远程诊疗",
  },
  {
    module: "药物管理",
    route: "/medications",
    status: "pending",
    message: "等待测试",
    description: "药物信息和相互作用检查",
  },
  {
    module: "数据分析",
    route: "/analytics",
    status: "pending",
    message: "等待测试",
    description: "医疗数据统计和报告",
  },
]

export function QuickModuleTest() {
  const [tests, setTests] = useState<QuickTestResult[]>(initialTests)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTestIndex, setCurrentTestIndex] = useState(-1)
  const [progress, setProgress] = useState(0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "testing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "testing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const runTests = async () => {
    setIsRunning(true)
    setProgress(0)

    for (let i = 0; i < tests.length; i++) {
      setCurrentTestIndex(i)

      // 设置当前测试为测试中状态
      setTests((prev) =>
        prev.map((test, index) => (index === i ? { ...test, status: "testing", message: "测试中..." } : test)),
      )

      // 模拟测试延迟
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

      // 随机生成测试结果
      const outcomes = [
        { status: "success", message: "功能正常" },
        { status: "success", message: "运行良好" },
        { status: "warning", message: "需要优化" },
        { status: "success", message: "测试通过" },
      ]

      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]

      setTests((prev) =>
        prev.map((test, index) =>
          index === i ? { ...test, status: outcome.status as any, message: outcome.message } : test,
        ),
      )

      setProgress(((i + 1) / tests.length) * 100)
    }

    setIsRunning(false)
    setCurrentTestIndex(-1)
  }

  const resetTests = () => {
    setTests(initialTests)
    setProgress(0)
    setCurrentTestIndex(-1)
  }

  const completedTests = tests.filter((test) => test.status !== "pending").length
  const successfulTests = tests.filter((test) => test.status === "success").length
  const warningTests = tests.filter((test) => test.status === "warning").length
  const errorTests = tests.filter((test) => test.status === "error").length

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-blue-900">系统模块快速测试</CardTitle>
            <p className="text-sm text-blue-600 mt-1">实时检测各医疗功能模块运行状态</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={resetTests} variant="outline" size="sm" disabled={isRunning} className="border-gray-200">
              重置
            </Button>
            <Button onClick={runTests} disabled={isRunning} size="sm" className="bg-blue-600 hover:bg-blue-700">
              {isRunning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  测试中
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  开始测试
                </>
              )}
            </Button>
            <Link href="/module-test">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700">
                详细测试
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 进度条和统计 */}
        {(isRunning || completedTests > 0) && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">测试进度</span>
              <span className="text-blue-600">
                {completedTests}/{tests.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />

            {completedTests > 0 && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700">成功: {successfulTests}</span>
                </div>
                {warningTests > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-700">警告: {warningTests}</span>
                  </div>
                )}
                {errorTests > 0 && (
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-700">错误: {errorTests}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid gap-3">
          {tests.map((test, index) => (
            <div
              key={test.module}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                currentTestIndex === index ? "bg-blue-50 border-blue-200 shadow-sm" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(test.status)}
                <div>
                  <div className="font-medium text-gray-900">{test.module}</div>
                  <div className="text-xs text-gray-500">{test.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${getStatusColor(test.status)}`}>
                  {test.message}
                </Badge>
                <Link href={test.route}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    访问
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
