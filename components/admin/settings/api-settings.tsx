"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Clock, Shield, Copy, RefreshCw, AlertTriangle, Plus, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export function ApiSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    enableApi: true,
    apiVersion: "v1",
    baseUrl: "https://api.example.com",
    rateLimit: 100,
    rateLimitPeriod: "minute",
    timeout: 30,
    maxPageSize: 100,
    defaultPageSize: 20,
    enableCaching: true,
    cacheTtl: 300,
    enableCompression: true,
    enableCors: true,
    allowedOrigins: "*",
    enableDocumentation: true,
    documentationUrl: "/api/docs",
  })

  const [securitySettings, setSecuritySettings] = useState({
    authMethod: "jwt",
    tokenExpiration: 3600,
    refreshTokenExpiration: 86400,
    enableIpWhitelist: false,
    ipWhitelist: "",
    enableRateLimiting: true,
    enableRequestLogging: true,
    logSensitiveData: false,
    enableTls: true,
    tlsVersion: "1.2",
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "开发环境",
      key: "dev_api_key_xxxxxxxxxxxxx",
      created: "2023-01-15",
      lastUsed: "2023-05-14",
      status: "active",
    },
    {
      id: 2,
      name: "测试环境",
      key: "test_api_key_xxxxxxxxxxxx",
      created: "2023-02-20",
      lastUsed: "2023-05-10",
      status: "active",
    },
    {
      id: 3,
      name: "生产环境",
      key: "prod_api_key_xxxxxxxxxxxx",
      created: "2023-03-01",
      lastUsed: "2023-05-15",
      status: "active",
    },
    {
      id: 4,
      name: "旧生产密钥",
      key: "old_api_key_xxxxxxxxxxxxx",
      created: "2022-10-15",
      lastUsed: "2023-03-01",
      status: "revoked",
    },
  ])

  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [generatedKey, setGeneratedKey] = useState("")

  const handleSaveSettings = () => {
    // 在实际应用中，这里会调用API保存设置
    console.log("保存API设置", {
      general: generalSettings,
      security: securitySettings,
    })
    toast({
      title: "设置已保存",
      description: "API设置已成功更新",
    })
  }

  const handleAddKey = () => {
    // 生成一个模拟的API密钥
    const mockKey = `api_key_${Math.random().toString(36).substring(2, 15)}`
    setGeneratedKey(mockKey)

    // 添加新密钥到列表
    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: mockKey,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "-",
      status: "active",
    }
    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
  }

  const handleRevokeKey = (id) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, status: "revoked" } : key
      )
    )
    toast({
      title: "API密钥已撤销",
      description: "该API密钥已被成功撤销",
    })
  }

  const handleRegenerateKey = (id) => {
    const mockKey = `api_key_${Math.random().toString(36).substring(2, 15)}`
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, key: mockKey, created: new Date().toISOString().split("T")[0] } : key
      )
    )
    toast({
      title: "API密钥已重新生成",
      description: "新的API密钥已生成成功",
    })
  }

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "已复制到剪贴板",
      description: "API密钥已复制到剪贴板",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>API设置</CardTitle>
          <CardDescription>
            配置系统API的访问和安全设置
          </CardDescription>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          保存设置
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">通用设置</TabsTrigger>
            <TabsTrigger value="security">安全设置</TabsTrigger>
            <TabsTrigger value="keys">API密钥</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">启用API</h3>
                  <p className="text-sm text-muted-foreground">
                    控制系统API是否可访问
                  </p>
                </div>
                <Switch
                  checked={generalSettings.enableApi}
                  onCheckedChange={(checked) =>
                    setGeneralSettings({
                      ...generalSettings,
                      enableApi: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="apiVersion">API版本</Label>
                  <Input
                    id="apiVersion"
                    value={generalSettings.apiVersion}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        apiVersion: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="baseUrl">基础URL</Label>
                  <Input
                    id="baseUrl"
                    value={generalSettings.baseUrl}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        baseUrl: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="rateLimit" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    速率限制
                  </Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Input
                      id="rateLimit"
                      type="number"
                      value={generalSettings.rateLimit}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          rateLimit: Number.parseInt(e.target.value),
                        })
                      }
                      className="w-24"
                    />
                    <span>每</span>
                    <Select
                      value={generalSettings.rateLimitPeriod}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          rateLimitPeriod: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="选择时间单位" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="second">秒</SelectItem>
                        <SelectItem value="minute">分钟</SelectItem>
                        <SelectItem value="hour">小时</SelectItem>
                        <SelectItem value="day">天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="timeout">超时时间（秒）</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={generalSettings.timeout}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        timeout: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxPageSize">最大分页大小</Label>
                  <Input
                    id="maxPageSize"
                    type="number"
                    value={generalSettings.maxPageSize}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        maxPageSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="defaultPageSize">默认分页大小</Label>
                  <Input
                    id="defaultPageSize"
                    type="number"
                    value={generalSettings.defaultPageSize}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        defaultPageSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCaching">启用缓存</Label>
                    <p className="text-sm text-muted-foreground">
                      是否缓存API响应以提高性能
                    </p>
                  </div>
                  <Switch
                    id="enableCaching"
                    checked={generalSettings.enableCaching}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        enableCaching: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="cacheTtl">缓存TTL（秒）</Label>
                  <Input
                    id="cacheTtl"
                    type="number"
                    value={generalSettings.cacheTtl}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        cacheTtl: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCompression">启用压缩</Label>
                    <p className="text-sm text-muted-foreground">
                      是否压缩API响应以减少带宽使用
                    </p>
                  </div>
                  <Switch
                    id="enableCompression"
                    checked={generalSettings.enableCompression}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        enableCompression: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCors">启用CORS</Label>
                    <p className="text-sm text-muted-foreground">
                      是否允许跨域资源共享
                    </p>
                  </div>
                  <Switch
                    id="enableCors"
                    checked={generalSettings.enableCors}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        enableCors: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="allowedOrigins">允许的源</Label>
                  <Input
                    id="allowedOrigins"
                    value={generalSettings.allowedOrigins}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        allowedOrigins: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableDocumentation">启用API文档</Label>
                    <p className="text-sm text-muted-foreground">
                      是否提供API文档
                    </p>
                  </div>
                  <Switch
                    id="enableDocumentation"
                    checked={generalSettings.enableDocumentation}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        enableDocumentation: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="documentationUrl">文档URL</Label>
                  <Input
                    id="documentationUrl"
                    value={generalSettings.documentationUrl}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        documentationUrl: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="authMethod" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  认证方法
                </Label>
                <Select
                  value={securitySettings.authMethod}
                  onValueChange={(value) =>
                    setSecuritySettings({
                      ...securitySettings,
                      authMethod: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-2">
                    <SelectValue placeholder="选择认证方法" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jwt">JWT令牌</SelectItem>
                    <SelectItem value="api_key">API密钥</SelectItem>
                    <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                    <SelectItem value="basic">基本认证</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="tokenExpiration">令牌过期时间（秒）</Label>
                <Input
                  id="tokenExpiration"
                  type="number"
                  value={securitySettings.tokenExpiration}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      tokenExpiration: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-2"
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="refreshTokenExpiration">
                  刷新令牌过期时间（秒）
                </Label>
                <Input
                  id="refreshTokenExpiration"
                  type="number"
                  value={securitySettings.refreshTokenExpiration}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      refreshTokenExpiration: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableIpWhitelist">启用IP白名单</Label>
                  <p className="text-sm text-muted-foreground">
                    是否限制API访问到特定IP地址
                  </p>
                </div>
                <Switch
                  id="enableIpWhitelist"
                  checked={securitySettings.enableIpWhitelist}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      enableIpWhitelist: checked,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-3 items-start gap-4">
                <Label htmlFor="ipWhitelist" className="mt-2">
                  IP白名单
                </Label>
                <Input
                  id="ipWhitelist"
                  value={securitySettings.ipWhitelist}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      ipWhitelist: e.target.value,
                    })
                  }
                  placeholder="以逗号分隔的IP地址列表"
                  className="col-span-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableRateLimiting">启用速率限制</Label>
                  <p className="text-sm text-muted-foreground">
                    是否限制API请求频率
                  </p>
                </div>
                <Switch
                  id="enableRateLimiting"
                  checked={securitySettings.enableRateLimiting}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      enableRateLimiting: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableRequestLogging">启用请求日志</Label>
                  <p className="text-sm text-muted-foreground">
                    是否记录所有API请求
                  </p>
                </div>
                <Switch
                  id="enableRequestLogging"
                  checked={securitySettings.enableRequestLogging}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      enableRequestLogging: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="logSensitiveData">记录敏感数据</Label>
                  <p className="text-sm text-muted-foreground">
                    是否在日志中包含敏感数据
                  </p>
                </div>
                <Switch
                  id="logSensitiveData"
                  checked={securitySettings.logSensitiveData}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      logSensitiveData: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableTls">启用TLS</Label>
                  <p className="text-sm text-muted-foreground">
                    是否要求HTTPS连接
                  </p>
                </div>
                <Switch
                  id="enableTls"
                  checked={securitySettings.enableTls}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      enableTls: checked,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="tlsVersion">TLS版本</Label>
                <Select
                  value={securitySettings.tlsVersion}
                  onValueChange={(value) =>
                    setSecuritySettings({
                      ...securitySettings,
                      tlsVersion: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-2">
                    <SelectValue placeholder="选择TLS版本" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.0">TLS 1.0</SelectItem>
                    <SelectItem value="1.1">TLS 1.1</SelectItem>
                    <SelectItem value="1.2">TLS 1.2</SelectItem>
                    <SelectItem value="1.3">TLS 1.3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">API密钥管理</h3>
              <Button onClick={() => setIsAddKeyDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                添加新密钥
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>密钥</TableHead>
                  <TableHead>创建日期</TableHead>
                  <TableHead>最后使用</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-mono">
                          {key.key.substring(0, 10)}...
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyKey(key.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell>
                      <Badge
                        variant={key.status === "active" ? "default" : "destructive"}
                      >
                        {key.status === "active" ? "活跃" : "已撤销"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {key.status === "active" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRegenerateKey(key.id)}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            重新生成
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRevokeKey(key.id)}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            撤销
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          已撤销
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* 添加API密钥对话框 */}
      <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新API密钥</DialogTitle>
            <DialogDescription>
              创建一个新的API密钥以访问系统API。请妥善保管您的密钥。
            </DialogDescription>
          </DialogHeader>
          
          {!generatedKey ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">密钥名称</Label>
                <Input
                  id="keyName"
                  placeholder="例如：开发环境、测试服务器等"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>您的新API密钥</Label>
                <div className="flex items-center">
                  <Input
                    readOnly
                    value={generatedKey}
                    className="font-mono"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleCopyKey(generatedKey)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  请立即复制此密钥。出于安全原因，我们不会再次显示它。
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            {!generatedKey ? (
              <>
                <Button variant="outline" onClick={() => setIsAddKeyDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddKey} disabled={!newKeyName.trim()}>
                  生成密钥
                </Button>
              </>
            ) : (
              <Button onClick={() => {
                setIsAddKeyDialogOpen(false);
                setGeneratedKey("");
              }}>
                完成
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
