"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Network,
  Code,
  Server,
  Database,
  Globe,
  CheckCircle,
  AlertCircle,
  Copy,
  RefreshCw,
  Settings,
  Lock,
  Plus,
  Clock,
} from "lucide-react"

export function ModelIntegration() {
  const [activeTab, setActiveTab] = useState("api")
  const [apiKey, setApiKey] = useState("sk_medai_28f7a9c1d5e3b2a0")
  const [showApiKey, setShowApiKey] = useState(false)

  // 模拟集成状态
  const integrations = [
    { name: "电子病历系统", status: "connected", lastSync: "10分钟前" },
    { name: "放射科PACS系统", status: "connected", lastSync: "25分钟前" },
    { name: "检验信息系统", status: "connected", lastSync: "1小时前" },
    { name: "医院信息系统", status: "error", lastSync: "连接失败" },
    { name: "远程会诊平台", status: "pending", lastSync: "等待授权" },
  ]

  // 复制API密钥
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    // 这里可以添加复制成功的提示
  }

  // 重新生成API密钥
  const regenerateApiKey = () => {
    setApiKey(`sk_medai_${Math.random().toString(36).substring(2, 15)}`)
    // 这里可以添加重新生成成功的提示
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">系统集成</CardTitle>
          <CardDescription>管理AI诊断系统与其他医疗系统的集成</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="api" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                API接入
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-1">
                <Network className="h-4 w-4" />
                系统集成
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Webhooks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api" className="space-y-6">
              {/* API密钥管理 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>API密钥</CardTitle>
                      <CardDescription>用于访问AI诊断API的密钥</CardDescription>
                    </div>
                    <Button variant="outline" onClick={regenerateApiKey}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重新生成
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API密钥</Label>
                    <div className="flex">
                      <Input
                        id="api-key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="flex-1 rounded-r-none border-r-0"
                      />
                      <Button variant="outline" className="rounded-l-none border-l-0" onClick={copyApiKey}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="show-api-key" checked={showApiKey} onCheckedChange={setShowApiKey} />
                      <Label htmlFor="show-api-key">显示密钥</Label>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">安全提示</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          请妥善保管您的API密钥，不要在客户端代码中暴露它。如果您怀疑密钥已泄露，请立即重新生成。
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API使用示例 */}
              <Card>
                <CardHeader>
                  <CardTitle>API使用示例</CardTitle>
                  <CardDescription>如何在您的应用中集成AI诊断API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">HTTP请求示例</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        {`curl -X POST https://api.medinexus.com/v1/diagnose \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "lung-ct",
    "image_url": "https://example.com/image.dcm"
  }'`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">JavaScript示例</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        {`async function diagnoseImage(imageUrl) {
  const response = await fetch('https://api.medinexus.com/v1/diagnose', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ${apiKey}',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'lung-ct',
      image_url: imageUrl
    })
  });
  
  return await response.json();
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    查看完整API文档
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              {/* 集成状态 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>集成状态</CardTitle>
                      <CardDescription>已连接系统的状态</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      添加新集成
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.map((integration, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {integration.status === "connected" ? (
                            <div className="bg-green-100 p-2 rounded-full">
                              <Server className="h-5 w-5 text-green-600" />
                            </div>
                          ) : integration.status === "error" ? (
                            <div className="bg-red-100 p-2 rounded-full">
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            </div>
                          ) : (
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium">{integration.name}</h4>
                            <p className="text-sm text-gray-500">上次同步: {integration.lastSync}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {integration.status === "connected" ? (
                            <Badge variant="success" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              已连接
                            </Badge>
                          ) : integration.status === "error" ? (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              连接错误
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              等待中
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 数据同步设置 */}
              <Card>
                <CardHeader>
                  <CardTitle>数据同步设置</CardTitle>
                  <CardDescription>配置系统间的数据同步</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">自动同步</h4>
                        <p className="text-sm text-gray-500">定期从其他系统同步数据</p>
                      </div>
                    </div>
                    <Switch id="auto-sync" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">同步频率</h4>
                        <p className="text-sm text-gray-500">设置数据同步的频率</p>
                      </div>
                    </div>
                    <Select defaultValue="15m">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="选择频率" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5m">每5分钟</SelectItem>
                        <SelectItem value="15m">每15分钟</SelectItem>
                        <SelectItem value="30m">每30分钟</SelectItem>
                        <SelectItem value="1h">每小时</SelectItem>
                        <SelectItem value="6h">每6小时</SelectItem>
                        <SelectItem value="12h">每12小时</SelectItem>
                        <SelectItem value="24h">每天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">安全传输</h4>
                      </div>
                    </div>
                    <Switch id="secure-transfer" defaultChecked />
                  </div>

                  <Button variant="primary" className="w-full">
                    保存设置
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              {/* Webhooks设置 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Webhooks</CardTitle>
                      <CardDescription>配置Webhooks以接收实时更新</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      添加Webhook
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Webhooks功能正在开发中，敬请期待！</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
