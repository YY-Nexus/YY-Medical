"use client"

import { useState } from "react"
import type { ApiEndpointConfig } from "@/types/api-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus, Globe, Clock, RefreshCw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface EndpointConfigProps {
  endpoints: ApiEndpointConfig[]
  onAddEndpoint: (endpoint: Omit<ApiEndpointConfig, "id">) => Promise<void>
  onDeleteEndpoint: (endpointId: string) => Promise<void>
  onUpdateEndpoint: (endpoint: ApiEndpointConfig) => Promise<void>
}

export function EndpointConfig({ endpoints, onAddEndpoint, onDeleteEndpoint, onUpdateEndpoint }: EndpointConfigProps) {
  const { toast } = useToast()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newEndpoint, setNewEndpoint] = useState<Omit<ApiEndpointConfig, "id">>({
    name: "",
    url: "",
    method: "GET",
    requiresAuth: true,
    timeout: 30000,
    retryCount: 2,
  })
  const [editingHeaders, setEditingHeaders] = useState<Record<string, string>>({})
  const [editingParameters, setEditingParameters] = useState<Record<string, string>>({})
  const [newHeaderKey, setNewHeaderKey] = useState("")
  const [newHeaderValue, setNewHeaderValue] = useState("")
  const [newParamKey, setNewParamKey] = useState("")
  const [newParamValue, setNewParamValue] = useState("")

  const handleAddEndpoint = async () => {
    if (!newEndpoint.name || !newEndpoint.url) {
      toast({
        title: "无法添加端点",
        description: "请填写必要的端点信息",
        variant: "destructive",
      })
      return
    }

    try {
      const endpointToAdd = {
        ...newEndpoint,
        headers: Object.keys(editingHeaders).length > 0 ? { ...editingHeaders } : undefined,
        parameters: Object.keys(editingParameters).length > 0 ? { ...editingParameters } : undefined,
      }

      await onAddEndpoint(endpointToAdd)
      setNewEndpoint({
        name: "",
        url: "",
        method: "GET",
        requiresAuth: true,
        timeout: 30000,
        retryCount: 2,
      })
      setEditingHeaders({})
      setEditingParameters({})
      setShowAddDialog(false)
      toast({
        title: "添加成功",
        description: "API端点已成功添加",
      })
    } catch (error) {
      toast({
        title: "添加失败",
        description: "无法添加API端点，请重试",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEndpoint = async (endpointId: string) => {
    if (confirm("确定要删除此API端点吗？此操作无法撤销。")) {
      try {
        await onDeleteEndpoint(endpointId)
        toast({
          title: "删除成功",
          description: "API端点已成功删除",
        })
      } catch (error) {
        toast({
          title: "删除失败",
          description: "无法删除API端点，请重试",
          variant: "destructive",
        })
      }
    }
  }

  const addHeader = () => {
    if (!newHeaderKey.trim()) return

    setEditingHeaders((prev) => ({
      ...prev,
      [newHeaderKey]: newHeaderValue,
    }))

    setNewHeaderKey("")
    setNewHeaderValue("")
  }

  const removeHeader = (key: string) => {
    const newHeaders = { ...editingHeaders }
    delete newHeaders[key]
    setEditingHeaders(newHeaders)
  }

  const addParameter = () => {
    if (!newParamKey.trim()) return

    setEditingParameters((prev) => ({
      ...prev,
      [newParamKey]: newParamValue,
    }))

    setNewParamKey("")
    setNewParamValue("")
  }

  const removeParameter = (key: string) => {
    const newParams = { ...editingParameters }
    delete newParams[key]
    setEditingParameters(newParams)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">API端点配置</h3>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加端点
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>添加新API端点</DialogTitle>
              <DialogDescription>配置与验证机构交互的API端点</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endpoint-name">端点名称</Label>
                  <Input
                    id="endpoint-name"
                    placeholder="例如：资质验证"
                    value={newEndpoint.name}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint-method">请求方法</Label>
                  <Select
                    value={newEndpoint.method}
                    onValueChange={(value: "GET" | "POST" | "PUT" | "DELETE") =>
                      setNewEndpoint({ ...newEndpoint, method: value })
                    }
                  >
                    <SelectTrigger id="endpoint-method">
                      <SelectValue placeholder="选择方法" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint-url">端点URL</Label>
                <Input
                  id="endpoint-url"
                  placeholder="例如：/api/v1/certifications/verify"
                  value={newEndpoint.url}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endpoint-timeout">超时时间 (毫秒)</Label>
                  <Input
                    id="endpoint-timeout"
                    type="number"
                    placeholder="30000"
                    value={newEndpoint.timeout}
                    onChange={(e) =>
                      setNewEndpoint({ ...newEndpoint, timeout: Number.parseInt(e.target.value) || 30000 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint-retry">重试次数</Label>
                  <Input
                    id="endpoint-retry"
                    type="number"
                    placeholder="2"
                    value={newEndpoint.retryCount}
                    onChange={(e) =>
                      setNewEndpoint({ ...newEndpoint, retryCount: Number.parseInt(e.target.value) || 2 })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="endpoint-auth"
                  checked={newEndpoint.requiresAuth}
                  onCheckedChange={(checked) => setNewEndpoint({ ...newEndpoint, requiresAuth: checked })}
                />
                <Label htmlFor="endpoint-auth">需要认证</Label>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="headers">
                  <AccordionTrigger>HTTP头部</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-2">
                        <Input
                          className="col-span-2"
                          placeholder="头部名称"
                          value={newHeaderKey}
                          onChange={(e) => setNewHeaderKey(e.target.value)}
                        />
                        <Input
                          className="col-span-2"
                          placeholder="头部值"
                          value={newHeaderValue}
                          onChange={(e) => setNewHeaderValue(e.target.value)}
                        />
                        <Button onClick={addHeader} className="col-span-1">
                          添加
                        </Button>
                      </div>

                      {Object.keys(editingHeaders).length > 0 && (
                        <div className="border rounded-md p-2">
                          <div className="text-sm font-medium mb-2">已配置的头部</div>
                          <div className="space-y-2">
                            {Object.entries(editingHeaders).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center bg-muted p-2 rounded-md">
                                <div>
                                  <span className="font-medium">{key}</span>
                                  <span className="mx-2">:</span>
                                  <span className="text-muted-foreground">{value}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeHeader(key)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="parameters">
                  <AccordionTrigger>请求参数</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-2">
                        <Input
                          className="col-span-2"
                          placeholder="参数名称"
                          value={newParamKey}
                          onChange={(e) => setNewParamKey(e.target.value)}
                        />
                        <Input
                          className="col-span-2"
                          placeholder="参数值"
                          value={newParamValue}
                          onChange={(e) => setNewParamValue(e.target.value)}
                        />
                        <Button onClick={addParameter} className="col-span-1">
                          添加
                        </Button>
                      </div>

                      {Object.keys(editingParameters).length > 0 && (
                        <div className="border rounded-md p-2">
                          <div className="text-sm font-medium mb-2">已配置的参数</div>
                          <div className="space-y-2">
                            {Object.entries(editingParameters).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center bg-muted p-2 rounded-md">
                                <div>
                                  <span className="font-medium">{key}</span>
                                  <span className="mx-2">=</span>
                                  <span className="text-muted-foreground">{value}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeParameter(key)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                取消
              </Button>
              <Button onClick={handleAddEndpoint}>添加端点</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {endpoints.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <Globe className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>尚未添加API端点</p>
            <p className="text-sm">点击"添加端点"按钮创建新的API端点</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {endpoints.map((endpoint) => (
            <Card key={endpoint.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{endpoint.name}</CardTitle>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        endpoint.method === "GET"
                          ? "bg-blue-100 text-blue-800"
                          : endpoint.method === "POST"
                            ? "bg-green-100 text-green-800"
                            : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                  </div>
                </div>
                <CardDescription className="font-mono text-xs">{endpoint.url}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>超时: {endpoint.timeout / 1000}秒</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    <span>重试: {endpoint.retryCount}次</span>
                  </div>
                </div>

                {(endpoint.headers || endpoint.parameters) && (
                  <div className="mt-4 space-y-3">
                    {endpoint.headers && Object.keys(endpoint.headers).length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">HTTP头部</div>
                        <div className="bg-muted p-2 rounded-md text-xs font-mono">
                          {Object.entries(endpoint.headers).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-blue-600">{key}</span>
                              <span className="text-gray-500">: </span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {endpoint.parameters && Object.keys(endpoint.parameters).length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">请求参数</div>
                        <div className="bg-muted p-2 rounded-md text-xs font-mono">
                          {Object.entries(endpoint.parameters).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-green-600">{key}</span>
                              <span className="text-gray-500"> = </span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`auth-${endpoint.id}`}
                    checked={endpoint.requiresAuth}
                    onCheckedChange={(checked) => onUpdateEndpoint({ ...endpoint, requiresAuth: checked })}
                  />
                  <Label htmlFor={`auth-${endpoint.id}`} className="text-sm">
                    需要认证
                  </Label>
                </div>
                <div className="flex-1"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteEndpoint(endpoint.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  删除
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
