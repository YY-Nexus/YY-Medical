"use client"

import { useState } from "react"
import type { ApiKeyConfig } from "@/types/api-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus, Eye, EyeOff, Copy, Key } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

interface ApiKeyManagerProps {
  providerId: string
  apiKeys: ApiKeyConfig[]
  onAddKey: (key: Omit<ApiKeyConfig, "id">) => Promise<void>
  onDeleteKey: (keyId: string) => Promise<void>
  onUpdateKey: (key: ApiKeyConfig) => Promise<void>
}

export function ApiKeyManager({ providerId, apiKeys, onAddKey, onDeleteKey, onUpdateKey }: ApiKeyManagerProps) {
  const { toast } = useToast()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [newKey, setNewKey] = useState<Omit<ApiKeyConfig, "id">>({
    name: "",
    key: "",
    secret: "",
    isActive: true,
    createdAt: new Date().toISOString(),
    environment: "production",
  })

  const toggleSecretVisibility = (keyId: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "已复制到剪贴板",
        description: `${label}已复制到剪贴板`,
      })
    })
  }

  const handleAddKey = async () => {
    if (!newKey.name || !newKey.key) {
      toast({
        title: "无法添加密钥",
        description: "请填写必要的密钥信息",
        variant: "destructive",
      })
      return
    }

    try {
      await onAddKey(newKey)
      setNewKey({
        name: "",
        key: "",
        secret: "",
        isActive: true,
        createdAt: new Date().toISOString(),
        environment: "production",
      })
      setShowAddDialog(false)
      toast({
        title: "添加成功",
        description: "API密钥已成功添加",
      })
    } catch (error) {
      toast({
        title: "添加失败",
        description: "无法添加API密钥，请重试",
        variant: "destructive",
      })
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    if (confirm("确定要删除此API密钥吗？此操作无法撤销。")) {
      try {
        await onDeleteKey(keyId)
        toast({
          title: "删除成功",
          description: "API密钥已成功删除",
        })
      } catch (error) {
        toast({
          title: "删除失败",
          description: "无法删除API密钥，请重试",
          variant: "destructive",
        })
      }
    }
  }

  const handleToggleActive = async (key: ApiKeyConfig) => {
    try {
      await onUpdateKey({
        ...key,
        isActive: !key.isActive,
      })
      toast({
        title: key.isActive ? "密钥已禁用" : "密钥已启用",
        description: `API密钥 "${key.name}" 已${key.isActive ? "禁用" : "启用"}`,
      })
    } catch (error) {
      toast({
        title: "更新失败",
        description: "无法更新API密钥状态，请重试",
        variant: "destructive",
      })
    }
  }

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "testing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "development":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">API密钥管理</h3>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加密钥
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新API密钥</DialogTitle>
              <DialogDescription>为验证机构添加新的API密钥。请确保密钥信息安全保存。</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">密钥名称</Label>
                <Input
                  id="key-name"
                  placeholder="例如：生产环境密钥"
                  value={newKey.name}
                  onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-value">API密钥</Label>
                <Input
                  id="key-value"
                  placeholder="例如：api_key_xxxxxxxxxxxxx"
                  value={newKey.key}
                  onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-secret">API密钥秘钥（可选）</Label>
                <Input
                  id="key-secret"
                  placeholder="例如：sk_xxxxxxxxxxxxx"
                  value={newKey.secret || ""}
                  onChange={(e) => setNewKey({ ...newKey, secret: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-environment">环境</Label>
                <Select
                  value={newKey.environment}
                  onValueChange={(value: "production" | "testing" | "development") =>
                    setNewKey({ ...newKey, environment: value })
                  }
                >
                  <SelectTrigger id="key-environment">
                    <SelectValue placeholder="选择环境" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">生产环境</SelectItem>
                    <SelectItem value="testing">测试环境</SelectItem>
                    <SelectItem value="development">开发环境</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="key-active"
                  checked={newKey.isActive}
                  onCheckedChange={(checked) => setNewKey({ ...newKey, isActive: checked })}
                />
                <Label htmlFor="key-active">启用密钥</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                取消
              </Button>
              <Button onClick={handleAddKey}>添加密钥</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {apiKeys.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <Key className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>尚未添加API密钥</p>
            <p className="text-sm">点击"添加密钥"按钮创建新的API密钥</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <Card key={key.id} className={!key.isActive ? "opacity-70" : undefined}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{key.name}</CardTitle>
                    <CardDescription>
                      创建于 {new Date(key.createdAt).toLocaleDateString("zh-CN")}
                      {key.expiresAt && ` · 过期于 ${new Date(key.expiresAt).toLocaleDateString("zh-CN")}`}
                    </CardDescription>
                  </div>
                  <Badge className={getEnvironmentColor(key.environment)}>
                    {key.environment === "production"
                      ? "生产环境"
                      : key.environment === "testing"
                        ? "测试环境"
                        : "开发环境"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">API密钥</Label>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(key.key, "API密钥")}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="font-mono text-sm bg-muted p-2 rounded-md">{key.key}</div>

                  {key.secret && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-muted-foreground">API密钥秘钥</Label>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleSecretVisibility(key.id)}
                          >
                            {showSecrets[key.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(key.secret!, "API密钥秘钥")}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-mono text-sm bg-muted p-2 rounded-md">
                        {showSecrets[key.id] ? key.secret : "••••••••••••••••••••••••••"}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`active-${key.id}`}
                    checked={key.isActive}
                    onCheckedChange={() => handleToggleActive(key)}
                  />
                  <Label htmlFor={`active-${key.id}`} className="text-sm">
                    {key.isActive ? "已启用" : "已禁用"}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteKey(key.id)}
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
