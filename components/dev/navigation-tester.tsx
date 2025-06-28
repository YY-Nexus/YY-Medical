"use client"

import { useState, useEffect } from "react"
import {
  testNavigationLinks,
  testSidebarFunctions,
  type NavLinkTestResult,
  type SidebarFunctionTestResult,
} from "@/utils/navigation-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalButton } from "@/components/ui/medical-button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export function NavigationTester() {
  const [linkResults, setLinkResults] = useState<NavLinkTestResult[]>([])
  const [sidebarResults, setSidebarResults] = useState<SidebarFunctionTestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("links")

  // 运行测试
  const runTests = async () => {
    setIsLoading(true)

    try {
      // 测试导航链接
      const links = await testNavigationLinks()
      setLinkResults(links)

      // 测试侧边栏功能
      const sidebar = testSidebarFunctions()
      setSidebarResults(sidebar)
    } catch (error) {
      console.error("测试执行失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 组件加载时自动运行测试
  useEffect(() => {
    runTests()
  }, [])

  // 计算测试结果统计
  const linkStats = {
    total: linkResults.length,
    passed: linkResults.filter((r) => r.isValid).length,
    failed: linkResults.filter((r) => !r.isValid).length,
  }

  const sidebarStats = {
    total: sidebarResults.length,
    passed: sidebarResults.filter((r) => r.isWorking).length,
    failed: sidebarResults.filter((r) => !r.isWorking).length,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>导航系统测试</span>
          <MedicalButton onClick={runTests} disabled={isLoading} size="sm">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                测试中...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                重新测试
              </>
            )}
          </MedicalButton>
        </CardTitle>
        <CardDescription>验证医枢³系统的导航链接和侧边栏功能是否正常工作</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="links">
              导航链接
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-medical-100">
                {linkStats.passed}/{linkStats.total}
              </span>
            </TabsTrigger>
            <TabsTrigger value="sidebar">
              侧边栏功能
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-medical-100">
                {sidebarStats.passed}/{sidebarStats.total}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="mt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-medical-50 p-3 text-sm font-medium">
                <div className="col-span-1">状态</div>
                <div className="col-span-3">标题</div>
                <div className="col-span-6">链接</div>
                <div className="col-span-2">操作</div>
              </div>
              <div className="divide-y">
                {linkResults.map((result, index) => (
                  <div key={index} className="grid grid-cols-12 p-3 text-sm items-center">
                    <div className="col-span-1">
                      {result.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="col-span-3 font-medium">{result.title}</div>
                    <div className="col-span-6 font-mono text-xs truncate">
                      {result.href}
                      {result.error && <span className="ml-2 text-red-500">({result.error})</span>}
                    </div>
                    <div className="col-span-2">
                      <Link href={result.href} target="_blank">
                        <MedicalButton size="sm" variant="outline">
                          访问
                        </MedicalButton>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sidebar" className="mt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-medical-50 p-3 text-sm font-medium">
                <div className="col-span-1">状态</div>
                <div className="col-span-5">功能</div>
                <div className="col-span-6">详情</div>
              </div>
              <div className="divide-y">
                {sidebarResults.map((result, index) => (
                  <div key={index} className="grid grid-cols-12 p-3 text-sm items-center">
                    <div className="col-span-1">
                      {result.isWorking ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="col-span-5 font-medium">{result.name}</div>
                    <div className="col-span-6">
                      {result.isWorking ? (
                        <span className="text-green-600">功能正常</span>
                      ) : (
                        <span className="text-red-500">{result.error || "功能异常"}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-medical-50 p-4 rounded-md">
              <h3 className="font-medium flex items-center mb-2">
                <AlertCircle className="h-4 w-4 mr-2 text-medical-600" />
                手动测试说明
              </h3>
              <p className="text-sm text-medical-700 mb-3">以下功能需要手动测试，请按照步骤操作并验证：</p>
              <ol className="list-decimal pl-5 text-sm space-y-2 text-medical-700">
                <li>点击顶部导航栏中的折叠按钮，确认侧边栏可以折叠</li>
                <li>再次点击折叠按钮，确认侧边栏可以展开</li>
                <li>点击带有子菜单的导航项，确认子菜单可以展开</li>
                <li>调整浏览器窗口大小至移动设备宽度，确认侧边栏自动折叠</li>
                <li>在移动设备宽度下，确认可以通过点击按钮展开侧边栏</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
