"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemCheck } from "./system-check"
import { PerformanceCheck } from "./performance-check"
import { SecurityCheck } from "./security-check"
import { CompatibilityCheck } from "./compatibility-check"
import { ConfigurationCheck } from "./configuration-check"
import { DatabaseCheck } from "./database-check"
import { ApiCheck } from "./api-check"
import { UiCheck } from "./ui-check"
import { DeploymentReport } from "./deployment-report"
import { MedicalButton } from "@/components/ui/medical-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"

export function DeploymentCheckClient() {
  const [activeTab, setActiveTab] = useState("system")
  const [isRunningCheck, setIsRunningCheck] = useState(false)
  const [checkResults, setCheckResults] = useState<Record<string, any>>({})
  const [overallStatus, setOverallStatus] = useState<"idle" | "running" | "success" | "warning" | "error">("idle")
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  // 运行全面检查
  const runFullCheck = async () => {
    setIsRunningCheck(true)
    setOverallStatus("running")
    setStartTime(new Date())
    setEndTime(null)

    // 清空之前的结果
    setCheckResults({})

    try {
      // 模拟各个检查模块的执行
      // 实际实现中，这里应该调用各个检查模块的API

      // 系统检查
      await simulateCheck("system", 2000)

      // 性能检查
      await simulateCheck("performance", 3000)

      // 安全检查
      await simulateCheck("security", 4000)

      // 兼容性检查
      await simulateCheck("compatibility", 2500)

      // 配置检查
      await simulateCheck("configuration", 1500)

      // 数据库检查
      await simulateCheck("database", 3500)

      // API检查
      await simulateCheck("api", 2800)

      // UI检查
      await simulateCheck("ui", 2200)

      // 分析结果，确定整体状态
      const finalStatus = determineOverallStatus(checkResults)
      setOverallStatus(finalStatus)

      // 显示完成通知
      toast({
        title: "检查完成",
        description: `系统深度检查已完成，状态: ${getStatusText(finalStatus)}`,
        variant: finalStatus === "error" ? "destructive" : finalStatus === "warning" ? "warning" : "default",
      })
    } catch (error) {
      console.error("检查过程中发生错误:", error)
      setOverallStatus("error")

      toast({
        title: "检查失败",
        description: "系统检查过程中发生错误，请查看控制台获取详细信息",
        variant: "destructive",
      })
    } finally {
      setIsRunningCheck(false)
      setEndTime(new Date())
    }
  }

  // 模拟单个检查过程
  const simulateCheck = async (checkType: string, duration: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 生成模拟检查结果
        const result = generateMockResult(checkType)
        setCheckResults((prev) => ({
          ...prev,
          [checkType]: result,
        }))
        resolve()
      }, duration)
    })
  }

  // 生成模拟检查结果
  const generateMockResult = (checkType: string) => {
    // 这里只是示例，实际应该根据真实检查结果生成
    const statuses = ["success", "warning", "error"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const baseResult = {
      status: randomStatus,
      timestamp: new Date().toISOString(),
      items: [],
    }

    // 根据不同检查类型生成不同的检查项
    switch (checkType) {
      case "system":
        return {
          ...baseResult,
          items: [
            { name: "操作系统兼容性", status: "success", message: "系统兼容性良好" },
            {
              name: "内存使用情况",
              status: randomStatus,
              message: randomStatus === "success" ? "内存使用正常" : "内存使用率过高 (85%)",
            },
            { name: "磁盘空间", status: "success", message: "磁盘空间充足" },
            {
              name: "CPU使用率",
              status: randomStatus,
              message: randomStatus === "success" ? "CPU使用率正常" : "CPU使用率峰值过高",
            },
            { name: "网络连接", status: "success", message: "网络连接正常" },
          ],
        }
      case "performance":
        return {
          ...baseResult,
          items: [
            {
              name: "页面加载时间",
              status: randomStatus,
              message: randomStatus === "success" ? "页面加载时间正常" : "页面加载时间过长 (>3s)",
            },
            { name: "API响应时间", status: "success", message: "API响应时间正常" },
            {
              name: "数据库查询性能",
              status: randomStatus,
              message: randomStatus === "success" ? "数据库查询性能良好" : "发现5个慢查询",
            },
            { name: "资源加载优化", status: "success", message: "资源加载已优化" },
            {
              name: "缓存配置",
              status: randomStatus,
              message: randomStatus === "success" ? "缓存配置正确" : "缓存配置不完整",
            },
          ],
        }
      case "security":
        return {
          ...baseResult,
          items: [
            {
              name: "依赖项安全检查",
              status: randomStatus,
              message: randomStatus === "success" ? "无安全漏洞" : "发现3个依赖项存在安全漏洞",
            },
            { name: "API安全检查", status: "success", message: "API安全配置正确" },
            { name: "认证机制", status: "success", message: "认证机制安全" },
            {
              name: "CSRF保护",
              status: randomStatus,
              message: randomStatus === "success" ? "CSRF保护已启用" : "CSRF保护未完全配置",
            },
            { name: "XSS防护", status: "success", message: "XSS防护已启用" },
          ],
        }
      case "compatibility":
        return {
          ...baseResult,
          items: [
            { name: "浏览器兼容性", status: "success", message: "兼容主流浏览器" },
            {
              name: "移动设备兼容性",
              status: randomStatus,
              message: randomStatus === "success" ? "移动设备兼容性良好" : "在某些iOS设备上存在显示问题",
            },
            { name: "屏幕分辨率适配", status: "success", message: "屏幕分辨率适配良好" },
            {
              name: "辅助功能支持",
              status: randomStatus,
              message: randomStatus === "success" ? "辅助功能支持良好" : "部分组件缺少ARIA属性",
            },
            { name: "打印兼容性", status: "success", message: "打印兼容性良好" },
          ],
        }
      case "configuration":
        return {
          ...baseResult,
          items: [
            {
              name: "环境变量配置",
              status: randomStatus,
              message: randomStatus === "success" ? "环境变量配置正确" : "缺少2个必要的环境变量",
            },
            { name: "服务器配置", status: "success", message: "服务器配置正确" },
            { name: "缓存配置", status: "success", message: "缓存配置正确" },
            {
              name: "日志配置",
              status: randomStatus,
              message: randomStatus === "success" ? "日志配置正确" : "日志级别配置不当",
            },
            { name: "构建配置", status: "success", message: "构建配置正确" },
          ],
        }
      case "database":
        return {
          ...baseResult,
          items: [
            { name: "数据库连接", status: "success", message: "数据库连接正常" },
            {
              name: "数据库索引",
              status: randomStatus,
              message: randomStatus === "success" ? "数据库索引优化良好" : "发现3个缺失的索引",
            },
            { name: "数据库备份", status: "success", message: "数据库备份配置正确" },
            {
              name: "数据库迁移",
              status: randomStatus,
              message: randomStatus === "success" ? "数据库迁移脚本正确" : "发现2个迁移脚本冲突",
            },
            { name: "数据完整性", status: "success", message: "数据完整性良好" },
          ],
        }
      case "api":
        return {
          ...baseResult,
          items: [
            { name: "API端点可用性", status: "success", message: "所有API端点可用" },
            {
              name: "API响应格式",
              status: randomStatus,
              message: randomStatus === "success" ? "API响应格式正确" : "3个API端点响应格式不一致",
            },
            { name: "API文档", status: "success", message: "API文档完整" },
            {
              name: "API版本控制",
              status: randomStatus,
              message: randomStatus === "success" ? "API版本控制正确" : "API版本控制不完整",
            },
            { name: "API限流", status: "success", message: "API限流配置正确" },
          ],
        }
      case "ui":
        return {
          ...baseResult,
          items: [
            {
              name: "UI组件一致性",
              status: randomStatus,
              message: randomStatus === "success" ? "UI组件一致性良好" : "发现4个不一致的UI组件",
            },
            { name: "响应式设计", status: "success", message: "响应式设计良好" },
            { name: "主题一致性", status: "success", message: "主题一致性良好" },
            {
              name: "图标一致性",
              status: randomStatus,
              message: randomStatus === "success" ? "图标一致性良好" : "发现混用的图标样式",
            },
            { name: "表单验证", status: "success", message: "表单验证正确" },
          ],
        }
      default:
        return baseResult
    }
  }

  // 确定整体状态
  const determineOverallStatus = (results: Record<string, any>) => {
    const statuses = Object.values(results).map((result) => result.status)

    if (statuses.includes("error")) {
      return "error"
    } else if (statuses.includes("warning")) {
      return "warning"
    } else if (statuses.length > 0) {
      return "success"
    }

    return "idle"
  }

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "通过"
      case "warning":
        return "警告"
      case "error":
        return "错误"
      case "running":
        return "检查中"
      default:
        return "未检查"
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-amber-500"
      case "error":
        return "text-red-500"
      case "running":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  // 计算检查持续时间
  const getCheckDuration = () => {
    if (!startTime) return "0秒"
    const end = endTime || new Date()
    const durationMs = end.getTime() - startTime.getTime()

    if (durationMs < 1000) {
      return `${durationMs}毫秒`
    } else if (durationMs < 60000) {
      return `${Math.round(durationMs / 1000)}秒`
    } else {
      const minutes = Math.floor(durationMs / 60000)
      const seconds = Math.round((durationMs % 60000) / 1000)
      return `${minutes}分${seconds}秒`
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">系统深度检查</CardTitle>
          <CardDescription>在部署前全面检查系统配置、性能、安全性和兼容性，确保系统可以安全部署</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  overallStatus === "success"
                    ? "bg-green-500"
                    : overallStatus === "warning"
                      ? "bg-amber-500"
                      : overallStatus === "error"
                        ? "bg-red-500"
                        : overallStatus === "running"
                          ? "bg-blue-500 animate-pulse"
                          : "bg-gray-300"
                }`}
              />
              <span className="font-medium">
                状态:{" "}
                {overallStatus === "success"
                  ? "检查通过"
                  : overallStatus === "warning"
                    ? "检查完成，有警告"
                    : overallStatus === "error"
                      ? "检查完成，有错误"
                      : overallStatus === "running"
                        ? "检查中..."
                        : "未检查"}
              </span>
              {startTime && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>耗时: {getCheckDuration()}</span>
                </div>
              )}
            </div>
            <MedicalButton onClick={runFullCheck} disabled={isRunningCheck} className="w-32">
              {isRunningCheck ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  检查中...
                </>
              ) : (
                "开始检查"
              )}
            </MedicalButton>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
              <TabsTrigger value="system" className="relative">
                系统
                {checkResults.system && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.system.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="performance" className="relative">
                性能
                {checkResults.performance && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.performance.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="security" className="relative">
                安全
                {checkResults.security && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.security.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="compatibility" className="relative">
                兼容性
                {checkResults.compatibility && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.compatibility.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="configuration" className="relative">
                配置
                {checkResults.configuration && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.configuration.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="database" className="relative">
                数据库
                {checkResults.database && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.database.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="api" className="relative">
                API
                {checkResults.api && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.api.status)}`}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger value="ui" className="relative">
                UI
                {checkResults.ui && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(checkResults.ui.status)}`}
                  />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="system">
              <SystemCheck result={checkResults.system} isRunning={isRunningCheck && !checkResults.system} />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceCheck
                result={checkResults.performance}
                isRunning={isRunningCheck && !checkResults.performance}
              />
            </TabsContent>

            <TabsContent value="security">
              <SecurityCheck result={checkResults.security} isRunning={isRunningCheck && !checkResults.security} />
            </TabsContent>

            <TabsContent value="compatibility">
              <CompatibilityCheck
                result={checkResults.compatibility}
                isRunning={isRunningCheck && !checkResults.compatibility}
              />
            </TabsContent>

            <TabsContent value="configuration">
              <ConfigurationCheck
                result={checkResults.configuration}
                isRunning={isRunningCheck && !checkResults.configuration}
              />
            </TabsContent>

            <TabsContent value="database">
              <DatabaseCheck result={checkResults.database} isRunning={isRunningCheck && !checkResults.database} />
            </TabsContent>

            <TabsContent value="api">
              <ApiCheck result={checkResults.api} isRunning={isRunningCheck && !checkResults.api} />
            </TabsContent>

            <TabsContent value="ui">
              <UiCheck result={checkResults.ui} isRunning={isRunningCheck && !checkResults.ui} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {Object.keys(checkResults).length > 0 && (
        <DeploymentReport results={checkResults} overallStatus={overallStatus} />
      )}
    </div>
  )
}
