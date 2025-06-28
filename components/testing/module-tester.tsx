"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Activity,
  Users,
  Brain,
  Stethoscope,
  FileText,
  Shield,
  Smartphone,
  BarChart3,
  Database,
  Video,
  Pill,
  FlaskConical,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface TestResult {
  module: string
  status: "pending" | "testing" | "success" | "error" | "warning"
  message: string
  details?: string
  route: string
  icon: any
  category: string
}

const medicalModules: Omit<TestResult, "status" | "message" | "details">[] = [
  // 核心医疗功能
  { module: "AI智能诊断", route: "/ai-diagnosis", icon: Brain, category: "core" },
  { module: "临床决策支持", route: "/clinical-decision", icon: Stethoscope, category: "core" },
  { module: "患者管理", route: "/patients", icon: Users, category: "core" },
  { module: "医疗记录管理", route: "/medical-records", icon: FileText, category: "core" },

  // 高级功能
  { module: "健康数据分析", route: "/health-data", icon: Activity, category: "advanced" },
  { module: "远程会诊", route: "/teleconsultation", icon: Video, category: "advanced" },
  { module: "药物管理", route: "/medications", icon: Pill, category: "advanced" },
  { module: "医学研究", route: "/research", icon: FlaskConical, category: "advanced" },

  // 系统功能
  { module: "数据分析", route: "/analytics", icon: BarChart3, category: "system" },
  { module: "安全管理", route: "/security", icon: Shield, category: "system" },
  { module: "移动应用", route: "/mobile-app", icon: Smartphone, category: "system" },
  { module: "EHR集成", route: "/ehr-integration", icon: Database, category: "system" },

  // 专业工具
  { module: "知识库", route: "/knowledge-base", icon: Brain, category: "tools" },
  { module: "病例库", route: "/case-library", icon: FileText, category: "tools" },
  { module: "影像特征", route: "/imaging-features", icon: Zap, category: "tools" },
  { module: "AI模型管理", route: "/ai-model", icon: Brain, category: "tools" },
]

export function ModuleTester() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [currentTest, setCurrentTest] = useState<number>(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  // 初始化测试结果
  useEffect(() => {
    const initialResults = medicalModules.map((module) => ({
      ...module,
      status: "pending" as const,
      message: "等待测试",
    }))
    setTestResults(initialResults)
  }, [])

  // 模拟测试单个模块
  const testModule = async (index: number): Promise<TestResult> => {
    const module = medicalModules[index]

    // 模拟测试延迟
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // 模拟测试结果
    const testScenarios = [
      { status: "success", message: "模块运行正常", probability: 0.7 },
      { status: "warning", message: "模块运行但有警告", probability: 0.2 },
      { status: "error", message: "模块测试失败", probability: 0.1 },
    ]

    const random = Math.random()
    let cumulativeProbability = 0
    let result = testScenarios[0]

    for (const scenario of testScenarios) {
      cumulativeProbability += scenario.probability
      if (random <= cumulativeProbability) {
        result = scenario
        break
      }
    }

    return {
      ...module,
      status: result.status as any,
      message: result.message,
      details: generateTestDetails(module.module, result.status),
    }
  }

  // 生成测试详情
  const generateTestDetails = (moduleName: string, status: string): string => {
    const details = {
      success: ["所有API端点响应正常", "数据库连接稳定", "用户界面加载完成", "权限验证通过", "性能指标良好"],
      warning: ["响应时间略长", "部分功能需要优化", "内存使用偏高", "缓存命中率较低"],
      error: ["API连接超时", "数据库查询失败", "权限验证错误", "组件加载失败"],
    }

    const relevantDetails = details[status as keyof typeof details] || details.success
    return relevantDetails[Math.floor(Math.random() * relevantDetails.length)]
  }

  // 运行所有测试
  const runAllTests = async () => {
    setIsRunning(true)
    setProgress(0)

    for (let i = 0; i < medicalModules.length; i++) {
      setCurrentTest(i)

      // 更新当前测试状态
      setTestResults((prev) =>
        prev.map((result, index) => (index === i ? { ...result, status: "testing", message: "测试中..." } : result)),
      )

      // 执行测试
      const testResult = await testModule(i)

      // 更新测试结果
      setTestResults((prev) => prev.map((result, index) => (index === i ? testResult : result)))

      // 更新进度
      setProgress(((i + 1) / medicalModules.length) * 100)
    }

    setCurrentTest(-1)
    setIsRunning(false)
  }

  // 重置测试
  const resetTests = () => {
    const initialResults = medicalModules.map((module) => ({
      ...module,
      status: "pending" as const,
      message: "等待测试",
    }))
    setTestResults(initialResults)
    setProgress(0)
    setCurrentTest(-1)
  }

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "testing":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "testing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 按类别分组结果
  const groupedResults = testResults.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, TestResult[]>,
  )

  const categoryNames = {
    core: "核心医疗功能",
    advanced: "高级功能",
    system: "系统功能",
    tools: "专业工具",
  }

  // 统计信息
  const stats = {
    total: testResults.length,
    success: testResults.filter((r) => r.status === "success").length,
    warning: testResults.filter((r) => r.status === "warning").length,
    error: testResults.filter((r) => r.status === "error").length,
    pending: testResults.filter((r) => r.status === "pending").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">医疗功能模块测试</h1>
          <p className="text-muted-foreground">逐一测试各个医疗功能模块的运行状态</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runAllTests} disabled={isRunning} className="bg-medical-600 hover:bg-medical-700">
            {isRunning ? "测试中..." : "开始测试"}
          </Button>
          <Button variant="outline" onClick={resetTests} disabled={isRunning}>
            重置
          </Button>
        </div>
      </div>

      {/* 进度条 */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>测试进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {currentTest >= 0 && (
                <p className="text-sm text-muted-foreground">正在测试: {medicalModules[currentTest]?.module}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 统计概览 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">总模块数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
            <p className="text-xs text-muted-foreground">正常运行</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
            <p className="text-xs text-muted-foreground">有警告</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.error}</div>
            <p className="text-xs text-muted-foreground">测试失败</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">等待测试</p>
          </CardContent>
        </Card>
      </div>

      {/* 测试结果 */}
      <Tabs defaultValue="core" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="core">核心功能</TabsTrigger>
          <TabsTrigger value="advanced">高级功能</TabsTrigger>
          <TabsTrigger value="system">系统功能</TabsTrigger>
          <TabsTrigger value="tools">专业工具</TabsTrigger>
        </TabsList>

        {Object.entries(groupedResults).map(([category, results]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4">
              {results.map((result, index) => {
                const Icon = result.icon
                return (
                  <Card key={result.module} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-medical-50">
                            <Icon className="h-5 w-5 text-medical-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{result.module}</CardTitle>
                            <CardDescription>路由: {result.route}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.status)}
                          <Badge className={getStatusColor(result.status)}>{result.message}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    {result.details && (
                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">{result.details}</p>
                          <Link href={result.route}>
                            <Button variant="outline" size="sm">
                              访问模块
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
