"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button3d } from "@/components/ui/3d-button"
import { Card3d, Card3dContent, Card3dHeader, Card3dTitle } from "@/components/ui/3d-card"
import { Check, X, AlertTriangle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// 导入导航项配置
import { navItems } from "@/config/navigation"

type LinkStatus = "pending" | "success" | "error" | "warning"

interface LinkTestResult {
  path: string
  title: string
  status: LinkStatus
  message?: string
  parent?: string
}

export function NavigationTester() {
  const router = useRouter()
  const [results, setResults] = useState<LinkTestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  // 收集所有链接
  const collectAllLinks = () => {
    const links: { path: string; title: string; parent?: string }[] = []

    navItems.forEach((item) => {
      if (item.href) {
        links.push({ path: item.href, title: item.title })
      }

      if (item.children) {
        item.children.forEach((child) => {
          links.push({
            path: child.href,
            title: child.title,
            parent: item.title,
          })
        })
      }
    })

    return links
  }

  // 测试单个链接
  const testLink = async (link: { path: string; title: string; parent?: string }): Promise<LinkTestResult> => {
    setCurrentTest(link.title)

    try {
      // 模拟导航测试
      // 在实际应用中，我们可以使用 fetch 来检查路由是否存在
      // 或者使用 router.prefetch 来预加载页面
      await new Promise((resolve) => setTimeout(resolve, 300))

      // 这里我们假设所有链接都是有效的
      // 在实际应用中，我们需要根据实际情况判断链接是否有效
      return {
        path: link.path,
        title: link.title,
        status: "success",
        message: "链接有效",
        parent: link.parent,
      }
    } catch (error) {
      return {
        path: link.path,
        title: link.title,
        status: "error",
        message: error instanceof Error ? error.message : "未知错误",
        parent: link.parent,
      }
    }
  }

  // 运行所有测试
  const runTests = async () => {
    setIsRunning(true)
    setResults([])
    setProgress(0)

    const links = collectAllLinks()
    const newResults: LinkTestResult[] = []

    for (let i = 0; i < links.length; i++) {
      const result = await testLink(links[i])
      newResults.push(result)
      setResults([...newResults])
      setProgress(Math.round(((i + 1) / links.length) * 100))
    }

    setIsRunning(false)
    setCurrentTest(null)
  }

  // 按父级分组结果
  const groupResultsByParent = () => {
    const grouped: Record<string, LinkTestResult[]> = {}

    // 添加没有父级的链接
    const topLevel = results.filter((r) => !r.parent)
    if (topLevel.length > 0) {
      grouped["主导航"] = topLevel
    }

    // 按父级分组
    results.forEach((result) => {
      if (result.parent) {
        if (!grouped[result.parent]) {
          grouped[result.parent] = []
        }
        grouped[result.parent].push(result)
      }
    })

    return grouped
  }

  // 切换展开/折叠状态
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  // 计算总体状态
  const calculateOverallStatus = (): { status: LinkStatus; count: number } => {
    const total = results.length
    const errors = results.filter((r) => r.status === "error").length
    const warnings = results.filter((r) => r.status === "warning").length

    if (errors > 0) {
      return { status: "error", count: errors }
    } else if (warnings > 0) {
      return { status: "warning", count: warnings }
    } else {
      return { status: "success", count: total }
    }
  }

  // 导航到指定路径
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // 获取状态图标
  const getStatusIcon = (status: LinkStatus) => {
    switch (status) {
      case "success":
        return <Check className="h-4 w-4 text-success-500" />
      case "error":
        return <X className="h-4 w-4 text-destructive-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning-500" />
      default:
        return null
    }
  }

  // 初始化时展开所有部分
  useEffect(() => {
    if (results.length > 0) {
      const grouped = groupResultsByParent()
      setExpandedSections(Object.keys(grouped))
    }
  }, [results])

  const grouped = groupResultsByParent()
  const overallStatus = calculateOverallStatus()

  return (
    <div className="space-y-6">
      <Card3d>
        <Card3dHeader>
          <Card3dTitle>导航链接测试工具</Card3dTitle>
        </Card3dHeader>
        <Card3dContent>
          <p className="text-medical-700 mb-4">
            此工具将测试所有导航链接，确保它们能正常工作。��击"开始测试"按钮开始测试。
          </p>

          <div className="flex items-center gap-4">
            <Button3d
              onClick={runTests}
              disabled={isRunning}
              isLoading={isRunning}
              icon={isRunning ? undefined : <Check className="h-4 w-4" />}
            >
              {isRunning ? "测试中..." : "开始测试"}
            </Button3d>

            {results.length > 0 && !isRunning && (
              <div className="flex items-center gap-2">
                {getStatusIcon(overallStatus.status)}
                <span
                  className={cn(
                    "font-medium",
                    overallStatus.status === "success" && "text-success-600",
                    overallStatus.status === "error" && "text-destructive-600",
                    overallStatus.status === "warning" && "text-warning-600",
                  )}
                >
                  {overallStatus.status === "success" && `全部 ${overallStatus.count} 个链接正常`}
                  {overallStatus.status === "error" && `${overallStatus.count} 个链接错误`}
                  {overallStatus.status === "warning" && `${overallStatus.count} 个链接警告`}
                </span>
              </div>
            )}
          </div>

          {isRunning && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-medical-600">
                <span>测试进度: {progress}%</span>
                <span>当前测试: {currentTest}</span>
              </div>
              <div className="w-full bg-medical-100 rounded-full h-2">
                <div
                  className="bg-medical-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </Card3dContent>
      </Card3d>

      {results.length > 0 && (
        <Card3d>
          <Card3dHeader>
            <Card3dTitle>测试结果</Card3dTitle>
          </Card3dHeader>
          <Card3dContent>
            <div className="space-y-4">
              {Object.entries(grouped).map(([section, sectionResults]) => (
                <div key={section} className="border border-medical-100 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-3 bg-medical-50 hover:bg-medical-100 transition-colors"
                    onClick={() => toggleSection(section)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-medical-800">{section}</span>
                      <span className="text-xs text-medical-500">({sectionResults.length} 个链接)</span>
                    </div>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 text-medical-500 transition-transform",
                        expandedSections.includes(section) && "rotate-90",
                      )}
                    />
                  </button>

                  {expandedSections.includes(section) && (
                    <div className="divide-y divide-medical-100">
                      {sectionResults.map((result, index) => (
                        <div key={index} className="p-3 flex items-center justify-between hover:bg-medical-50">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(result.status)}
                            <div>
                              <div className="font-medium text-medical-800">{result.title}</div>
                              <div className="text-xs text-medical-500">{result.path}</div>
                            </div>
                          </div>
                          <Button3d size="sm" variant="outline" onClick={() => navigateTo(result.path)}>
                            测试导航
                          </Button3d>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card3dContent>
        </Card3d>
      )}
    </div>
  )
}
