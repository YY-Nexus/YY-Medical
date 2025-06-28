"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { aiProviderService } from "@/services/ai-provider-service"
import type { AIProvider, AIProviderConfig, AIModel, AIUsageStats } from "@/types/ai-models"
import {
  Bot,
  Settings,
  TestTube,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Activity,
  Zap,
  Globe,
  Key,
  Loader2,
} from "lucide-react"

export function AIProviderManager() {
  const { toast } = useToast()
  const [providers, setProviders] = useState<AIProvider[]>([])
  const [models, setModels] = useState<AIModel[]>([])
  const [configs, setConfigs] = useState<AIProviderConfig[]>([])
  const [usageStats, setUsageStats] = useState<AIUsageStats[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider | null>(null)
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [testingProvider, setTestingProvider] = useState<string | null>(null)

  // 新配置表单状态
  const [newConfig, setNewConfig] = useState<Partial<AIProviderConfig>>({
    name: "",
    credentials: {},
    settings: {},
    isActive: true,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [providersData, modelsData, statsData] = await Promise.all([
        aiProviderService.getAllProviders(),
        aiProviderService.getAllModels(),
        aiProviderService.getUsageStats(),
      ])

      setProviders(providersData)
      setModels(modelsData)
      setUsageStats(statsData)
    } catch (error) {
      console.error("加载数据失败:", error)
      toast({
        title: "加载失败",
        description: "无法加载AI提供商数据",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConfigProvider = (provider: AIProvider) => {
    setSelectedProvider(provider)
    setNewConfig({
      providerId: provider.id,
      name: `${provider.displayName} 配置`,
      credentials: {},
      settings: {},
      isActive: true,
    })
    setShowConfigDialog(true)
  }

  const handleSaveConfig = async () => {
    if (!selectedProvider || !newConfig.name) {
      toast({
        title: "配置无效",
        description: "请填写必要的配置信息",
        variant: "destructive",
      })
      return
    }

    try {
      const savedConfig = await aiProviderService.saveProviderConfig(
        newConfig as Omit<AIProviderConfig, "id" | "createdAt" | "updatedAt">,
      )
      setConfigs((prev) => [...prev, savedConfig])
      setShowConfigDialog(false)
      setNewConfig({})
      setSelectedProvider(null)

      toast({
        title: "配置成功",
        description: `${selectedProvider.displayName} 配置已保存`,
      })
    } catch (error) {
      toast({
        title: "配置失败",
        description: "无法保存提供商配置",
        variant: "destructive",
      })
    }
  }

  const handleTestConnection = async (config: AIProviderConfig) => {
    setTestingProvider(config.id)
    try {
      const result = await aiProviderService.testProviderConnection(config)

      toast({
        title: result.success ? "连接成功" : "连接失败",
        description: result.message + (result.latency ? ` (延迟: ${result.latency}ms)` : ""),
        variant: result.success ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: "测试失败",
        description: "无法测试连接",
        variant: "destructive",
      })
    } finally {
      setTestingProvider(null)
    }
  }

  const getProviderStats = (providerId: string) => {
    return usageStats.find((stat) => stat.providerId === providerId)
  }

  const getProviderModels = (providerId: string) => {
    return models.filter((model) => model.provider === providerId)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI模型提供商管理</h2>
          <p className="text-muted-foreground">配置和管理多个AI模型提供商</p>
        </div>
        <Button onClick={() => setShowConfigDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          添加配置
        </Button>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">提供商</TabsTrigger>
          <TabsTrigger value="models">模型</TabsTrigger>
          <TabsTrigger value="usage">使用统计</TabsTrigger>
          <TabsTrigger value="configs">配置管理</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => {
              const stats = getProviderStats(provider.id)
              const providerModels = getProviderModels(provider.id)

              return (
                <Card key={provider.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {provider.logo && (
                          <img
                            src={provider.logo || "/placeholder.svg"}
                            alt={provider.displayName}
                            className="w-6 h-6"
                          />
                        )}
                        <CardTitle className="text-lg">{provider.displayName}</CardTitle>
                      </div>
                      <Badge variant={provider.isActive ? "default" : "secondary"}>
                        {provider.isActive ? "可用" : "不可用"}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{provider.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                        <span>{providerModels.length} 个模型</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.authType}</span>
                      </div>
                    </div>

                    {stats && (
                      <div className="space-y-2">
                        <Separator />
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">请求数:</span>
                            <span className="font-medium">{stats.totalRequests}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">成功率:</span>
                            <span className="font-medium">
                              {((stats.successfulRequests / stats.totalRequests) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">总费用:</span>
                            <span className="font-medium">${stats.totalCost.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">响应时间:</span>
                            <span className="font-medium">{stats.averageResponseTime}ms</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => handleConfigProvider(provider)}>
                        <Settings className="h-4 w-4 mr-1" />
                        配置
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => window.open(provider.website, "_blank")}>
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant={model.status === "active" ? "default" : "secondary"}>
                      {model.status === "active" ? "活跃" : "维护中"}
                    </Badge>
                  </div>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span>最大令牌: {model.maxTokens.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>上下文: {model.contextWindow.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>输入: ${model.pricing.inputTokenPrice}/1K</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>输出: ${model.pricing.outputTokenPrice}/1K</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">支持的功能</Label>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities
                        .filter((cap) => cap.supported)
                        .map((capability) => (
                          <Badge key={capability.type} variant="outline" className="text-xs">
                            {capability.description}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">支持语言</Label>
                    <div className="flex flex-wrap gap-1">
                      {model.supportedLanguages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {usageStats.map((stat) => {
              const provider = providers.find((p) => p.id === stat.providerId)
              return (
                <Card key={`${stat.providerId}-${stat.modelId}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {provider?.displayName} - {stat.modelId}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">总请求</span>
                        <span className="font-medium">{stat.totalRequests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">成功率</span>
                        <span className="font-medium text-green-600">
                          {((stat.successfulRequests / stat.totalRequests) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">总令牌</span>
                        <span className="font-medium">{stat.totalTokens.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">总费用</span>
                        <span className="font-medium">${stat.totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">平均响应</span>
                        <span className="font-medium">{stat.averageResponseTime}ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="configs" className="space-y-4">
          <div className="space-y-4">
            {configs.map((config) => {
              const provider = providers.find((p) => p.id === config.providerId)
              return (
                <Card key={config.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{config.name}</CardTitle>
                        <Badge variant={config.isActive ? "default" : "secondary"}>
                          {config.isActive ? "启用" : "禁用"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTestConnection(config)}
                          disabled={testingProvider === config.id}
                        >
                          {testingProvider === config.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <TestTube className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {provider?.displayName} - 创建于 {new Date(config.createdAt).toLocaleDateString("zh-CN")}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span>已配置 {Object.keys(config.credentials).length} 个凭据</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {config.testStatus === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : config.testStatus === "failed" ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <span>
                          {config.testStatus === "success"
                            ? "连接正常"
                            : config.testStatus === "failed"
                              ? "连接失败"
                              : "未测试"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* 配置对话框 */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>配置 {selectedProvider?.displayName}</DialogTitle>
            <DialogDescription>请填写必要的API凭据和配置信息</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="config-name">配置名称</Label>
              <Input
                id="config-name"
                placeholder="例如：生产环境配置"
                value={newConfig.name || ""}
                onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
              />
            </div>

            {selectedProvider?.requiredFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={newConfig.credentials?.[field.key] || ""}
                    onValueChange={(value) =>
                      setNewConfig({
                        ...newConfig,
                        credentials: { ...newConfig.credentials, [field.key]: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={newConfig.credentials?.[field.key] || ""}
                    onChange={(e) =>
                      setNewConfig({
                        ...newConfig,
                        credentials: { ...newConfig.credentials, [field.key]: e.target.value },
                      })
                    }
                  />
                )}
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <Switch
                id="config-active"
                checked={newConfig.isActive}
                onCheckedChange={(checked) => setNewConfig({ ...newConfig, isActive: checked })}
              />
              <Label htmlFor="config-active">启用此配置</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSaveConfig}>保存配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
