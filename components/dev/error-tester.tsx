"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalButton } from "@/components/ui/medical-button"
import { AlertTriangle, WifiOff, ShieldAlert, Clock, FileX, AlertCircle } from "lucide-react"
import { ErrorType, simulateError } from "@/utils/error-simulator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ErrorTester() {
  const [activeTab, setActiveTab] = useState("javascript")
  const [errorMessage, setErrorMessage] = useState("")
  const [errorDelay, setErrorDelay] = useState(0)
  const [errorStatus, setErrorStatus] = useState(500)
  const [errorCode, setErrorCode] = useState("ERR_UNKNOWN")
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
    error?: Error
  } | null>(null)

  // 处理错误测试
  const handleTestError = async (type: ErrorType) => {
    setIsLoading(true)
    setTestResult(null)

    try {
      // 准备错误选项
      const options = {
        message: errorMessage || undefined,
        delay: errorDelay || undefined,
        status: errorStatus || undefined,
        code: errorCode || undefined,
      }

      // 模拟错误
      const result = simulateError(type, options)

      // 如果是Promise，等待它被拒绝
      if (result instanceof Promise) {
        try {
          await result
          // 如果Promise成功解决，这是不应该发生的
          setTestResult({
            success: false,
            message: "错误: 预期的错误没有发生",
          })
        } catch (error) {
          // 这是预期的行为 - Promise被拒绝
          setTestResult({
            success: true,
            message: "成功: 错误被正确抛出",
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      } else {
        // 对于同步错误，这段代码不会执行，因为错误已经被抛出
        setTestResult({
          success: false,
          message: "错误: 预期的错误没有发生",
        })
      }
    } catch (error) {
      // 捕获同步错误
      setTestResult({
        success: true,
        message: "成功: 错误被正确抛出",
        error: error instanceof Error ? error : new Error(String(error)),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 测试网络离线状态
  const testOfflineMode = () => {
    // 保存原始的navigator.onLine值
    const originalOnlineStatus = navigator.onLine

    // 模拟离线状态
    // @ts-ignore - 我们知道这不是标准做法，但这是测试目的
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      get: () => false,
    })

    // 触发offline事件
    window.dispatchEvent(new Event("offline"))

    // 5秒后恢复在线状态
    setTimeout(() => {
      // @ts-ignore - 恢复原始状态
      Object.defineProperty(navigator, "onLine", {
        configurable: true,
        get: () => originalOnlineStatus,
      })

      // 触发online事件
      window.dispatchEvent(new Event("online"))
    }, 5000)

    setTestResult({
      success: true,
      message: "已模拟离线状态，5秒后将恢复",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>错误处理测试</CardTitle>
        <CardDescription>测试医枢³系统的错误处理机制，模拟各种类型的错误</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="javascript">JavaScript错误</TabsTrigger>
            <TabsTrigger value="network">网络错误</TabsTrigger>
            <TabsTrigger value="auth">认证与授权错误</TabsTrigger>
          </TabsList>

          {/* 错误配置表单 */}
          <div className="mt-6 mb-6 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="errorMessage">错误消息</Label>
                <Input
                  id="errorMessage"
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                  placeholder="自定义错误消息"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="errorDelay">延迟 (毫秒)</Label>
                <Input
                  id="errorDelay"
                  type="number"
                  value={errorDelay}
                  onChange={(e) => setErrorDelay(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="errorStatus">HTTP状态码</Label>
                <Select value={String(errorStatus)} onValueChange={(value) => setErrorStatus(Number(value))}>
                  <SelectTrigger id="errorStatus">
                    <SelectValue placeholder="选择状态码" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">400 Bad Request</SelectItem>
                    <SelectItem value="401">401 Unauthorized</SelectItem>
                    <SelectItem value="403">403 Forbidden</SelectItem>
                    <SelectItem value="404">404 Not Found</SelectItem>
                    <SelectItem value="500">500 Internal Server Error</SelectItem>
                    <SelectItem value="503">503 Service Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="errorCode">错误代码</Label>
                <Input
                  id="errorCode"
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  placeholder="ERR_UNKNOWN"
                />
              </div>
            </div>
          </div>

          <TabsContent value="javascript" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    JavaScript错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟JavaScript运行时错误，测试全局错误处理</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.JAVASCRIPT)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试JavaScript错误
                  </MedicalButton>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Promise错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟未处理的Promise拒绝，测试异步错误处理</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.PROMISE)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试Promise错误
                  </MedicalButton>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                    渲染错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟React组件渲染错误，测试错误边界</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.RENDERING)}
                    disabled={isLoading}
                    variant="destructive"
                    className="w-full"
                  >
                    测试渲染错误
                  </MedicalButton>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-orange-500" />
                    超时错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟操作超时，测试超时处理机制</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.TIMEOUT)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试超时错误
                  </MedicalButton>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <WifiOff className="h-5 w-5 mr-2 text-red-500" />
                    网络错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟网络连接失败，测试网络错误处理</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.NETWORK)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试网络错误
                  </MedicalButton>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    API错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟API请求失败，测试API错误处理</p>
                  <MedicalButton onClick={() => handleTestError(ErrorType.API)} disabled={isLoading} className="w-full">
                    测试API错误
                  </MedicalButton>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <FileX className="h-5 w-5 mr-2 text-gray-500" />
                    资源未找到
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟404错误，测试资源未找到处理</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.NOT_FOUND)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试404错误
                  </MedicalButton>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <WifiOff className="h-5 w-5 mr-2 text-blue-500" />
                    离线状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟设备离线状态，测试离线处理机制</p>
                  <MedicalButton onClick={testOfflineMode} disabled={isLoading} className="w-full">
                    测试离线状态
                  </MedicalButton>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="auth" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <ShieldAlert className="h-5 w-5 mr-2 text-red-500" />
                    认证错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟认证失败，测试未授权处理</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.AUTHENTICATION)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试认证错误
                  </MedicalButton>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center">
                    <ShieldAlert className="h-5 w-5 mr-2 text-amber-500" />
                    授权错误
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">模拟权限不足，测试禁止访问处理</p>
                  <MedicalButton
                    onClick={() => handleTestError(ErrorType.AUTHORIZATION)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    测试授权错误
                  </MedicalButton>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 测试结果 */}
        {testResult && (
          <div
            className={`mt-6 p-4 rounded-md ${
              testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            <h3 className={`font-medium mb-2 ${testResult.success ? "text-green-700" : "text-red-700"}`}>测试结果</h3>
            <p className="text-sm mb-2">{testResult.message}</p>

            {testResult.error && (
              <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-32">
                <p className="font-bold">
                  {testResult.error.name}: {testResult.error.message}
                </p>
                {testResult.error.stack && <pre className="mt-1 text-gray-700">{testResult.error.stack}</pre>}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
