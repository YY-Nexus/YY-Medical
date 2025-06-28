"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ApiKeyManager } from "./api-key-manager"
import { EndpointConfig } from "./endpoint-config"
import { apiConfigService } from "@/services/api-config-service"
import type { ProviderApiConfig, ApiKeyConfig, ApiEndpointConfig } from "@/types/api-config"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { certificationVerificationService } from "@/services/certification-verification-service"

export function ApiConfigClient() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [providers, setProviders] = useState<ProviderApiConfig[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState<string>("")
  const [selectedProvider, setSelectedProvider] = useState<ProviderApiConfig | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [availableProviders, setAvailableProviders] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // 获取所有验证机构
        const allProviders = certificationVerificationService.getAvailableProviders()
        setAvailableProviders(allProviders.map((p) => ({ id: p.id, name: p.name })))

        // 获取API配置
        const configs = await apiConfigService.getAllApiConfigs()
        setProviders(configs)

        if (configs.length > 0) {
          setSelectedProviderId(configs[0].providerId)
          setSelectedProvider(configs[0])
        }
      } catch (error) {
        console.error("加载API配置失败:", error)
        toast({
          title: "加载失败",
          description: "无法加载API配置信息",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  useEffect(() => {
    if (selectedProviderId && providers.length > 0) {
      const provider = providers.find((p) => p.providerId === selectedProviderId)
      setSelectedProvider(provider || null)
    } else {
      setSelectedProvider(null)
    }
  }, [selectedProviderId, providers])

  const handleProviderChange = (value: string) => {
    setSelectedProviderId(value)
  }

  const handleUpdateProvider = async (updatedProvider: ProviderApiConfig) => {
    try {
      const updated = await apiConfigService.updateApiConfig(updatedProvider)
      setProviders((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      setSelectedProvider(updated)
      toast({
        title: "更新成功",
        description: "API配置已成功更新",
      })
    } catch (error) {
      toast({
        title: "更新失败",
        description: "无法更新API配置",
        variant: "destructive",
      })
    }
  }

  const handleAddApiKey = async (apiKey: Omit<ApiKeyConfig, "id">) => {
    if (!selectedProvider) return

    try {
      const newKey = await apiConfigService.addApiKey(selectedProvider.providerId, apiKey)
      const updatedProvider = {
        ...selectedProvider,
        apiKeys: [...selectedProvider.apiKeys, newKey],
      }

      await handleUpdateProvider(updatedProvider)
    } catch (error) {
      throw error
    }
  }

  const handleDeleteApiKey = async (keyId: string) => {
    if (!selectedProvider) return

    try {
      await apiConfigService.deleteApiKey(selectedProvider.providerId, keyId)
      const updatedProvider = {
        ...selectedProvider,
        apiKeys: selectedProvider.apiKeys.filter((key) => key.id !== keyId),
      }

      await handleUpdateProvider(updatedProvider)
    } catch (error) {
      throw error
    }
  }

  const handleUpdateApiKey = async (apiKey: ApiKeyConfig) => {
    if (!selectedProvider) return

    try {
      const updatedProvider = {
        ...selectedProvider,
        apiKeys: selectedProvider.apiKeys.map((key) => (key.id === apiKey.id ? apiKey : key)),
      }

      await handleUpdateProvider(updatedProvider)
    } catch (error) {
      throw error
    }
  }

  const handleAddEndpoint = async (endpoint: Omit<ApiEndpointConfig, "id">) => {
    if (!selectedProvider) return

    try {
      // 生成新ID
      const newEndpoint: ApiEndpointConfig = {
        ...endpoint,
        id: `endpoint-${Date.now()}`,
      }

      const updatedProvider = {
        ...selectedProvider,
        endpoints: [...selectedProvider.endpoints, newEndpoint],
      }

      await handleUpdateProvider(updatedProvider)
    } catch (error) {
      throw error
    }
  }

  const handleDeleteEndpoint = async (endpointId: string) => {
    if (!selectedProvider) return

    try {
      const updatedProvider = {
        ...selectedProvider,
        endpoints: selectedProvider.endpoints.filter((endpoint) => endpoint.id !== endpointId),
      }

      await handleUpdateProvider(updatedProvider)
    } catch (error) {
      throw error
    }
  }

  const handleUpdateEndpoint = async (endpoint: ApiEndpointConfig) => {
    if (!selectedProvider) return

    try {
      const updatedProvider = {
        ...selectedProvider,
        endpoints: selectedProvider.endpoints.map((ep) => (ep.id === endpoint.id ? endpoint : ep)),
      }

      await handleUpdateProvider(updatedProvider)
    } catch (error) {
      throw error
    }
  }

  const handleTestConnection = async () => {
    if (!selectedProvider) return

    setIsTesting(true)
    try {
      const result = await apiConfigService.testApiConnection(selectedProvider.providerId)

      const updatedProvider = {
        ...selectedProvider,
        lastTested: result.timestamp,
        testStatus: result.success ? "success" : "failed",
        testMessage: result.message,
      }

      await handleUpdateProvider(updatedProvider)

      toast({
        title: result.success ? "连接测试成功" : "连接测试失败",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: "测试失败",
        description: "无法完成API连接测试",
        variant: "destructive",
      })
    } finally {
      setIsTesting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>验证机构API配置</CardTitle>
          <CardDescription>配置与第三方资质验证机构的API集成</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Label htmlFor="provider-select" className="mb-2 block">
                  选择验证机构
                </Label>
                <Select value={selectedProviderId} onValueChange={handleProviderChange}>
                  <SelectTrigger id="provider-select">
                    <SelectValue placeholder="选择验证机构" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.providerId} value={provider.providerId}>
                        {provider.providerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={handleTestConnection} disabled={!selectedProvider || isTesting}>
                {isTesting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    测试中...
                  </>
                ) : (
                  <>测试连接</>
                )}
              </Button>
            </div>

            {selectedProvider && (
              <>
                {selectedProvider.testStatus && (
                  <div
                    className={`flex items-center p-3 rounded-md ${
                      selectedProvider.testStatus === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {selectedProvider.testStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">
                        {selectedProvider.testStatus === "success" ? "连接正常" : "连接失败"}
                      </div>
                      <div className="text-sm">
                        {selectedProvider.testMessage}
                        {selectedProvider.lastTested && (
                          <> · 最后测试时间: {new Date(selectedProvider.lastTested).toLocaleString("zh-CN")}</>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="base-url">基础URL</Label>
                    <Input
                      id="base-url"
                      value={selectedProvider.baseUrl}
                      onChange={(e) =>
                        setSelectedProvider({
                          ...selectedProvider,
                          baseUrl: e.target.value,
                        })
                      }
                      placeholder="例如：https://api.example.com"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="api-version">API版本</Label>
                    <Input
                      id="api-version"
                      value={selectedProvider.apiVersion}
                      onChange={(e) =>
                        setSelectedProvider({
                          ...selectedProvider,
                          apiVersion: e.target.value,
                        })
                      }
                      placeholder="例如：v1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="description">描述</Label>
                  <Input
                    id="description"
                    value={selectedProvider.description}
                    onChange={(e) =>
                      setSelectedProvider({
                        ...selectedProvider,
                        description: e.target.value,
                      })
                    }
                    placeholder="API配置描述"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is-active"
                    checked={selectedProvider.isActive}
                    onCheckedChange={(checked) =>
                      setSelectedProvider({
                        ...selectedProvider,
                        isActive: checked,
                      })
                    }
                  />
                  <Label htmlFor="is-active">启用此API配置</Label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleUpdateProvider(selectedProvider)}>保存基本配置</Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedProvider && (
        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList>
            <TabsTrigger value="keys">API密钥</TabsTrigger>
            <TabsTrigger value="endpoints">端点配置</TabsTrigger>
          </TabsList>

          <TabsContent value="keys">
            <ApiKeyManager
              providerId={selectedProvider.providerId}
              apiKeys={selectedProvider.apiKeys}
              onAddKey={handleAddApiKey}
              onDeleteKey={handleDeleteApiKey}
              onUpdateKey={handleUpdateApiKey}
            />
          </TabsContent>

          <TabsContent value="endpoints">
            <EndpointConfig
              endpoints={selectedProvider.endpoints}
              onAddEndpoint={handleAddEndpoint}
              onDeleteEndpoint={handleDeleteEndpoint}
              onUpdateEndpoint={handleUpdateEndpoint}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
