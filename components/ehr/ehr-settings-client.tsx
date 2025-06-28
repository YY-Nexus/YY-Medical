"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Save, RotateCcw, Clock, Shield, FileText, AlertTriangle } from "lucide-react"

export default function EHRSettingsClient() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    syncInterval: 4,
    retryAttempts: 3,
    timeout: 30,
    logLevel: "info",
    enableEncryption: true,
    encryptionMethod: "AES-256",
    enableCompression: true,
    maxBatchSize: 1000,
    enableNotifications: true,
    notifyOnError: true,
    notifyOnSuccess: false,
    enableAuditLog: true,
    retentionPeriod: 90,
    defaultDateFormat: "YYYY-MM-DD",
    defaultTimeFormat: "HH:mm:ss",
  })

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="settings" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" onClick={() => router.push("/ehr-integration")}>
            集成概览
          </TabsTrigger>
          <TabsTrigger value="mapping" onClick={() => router.push("/ehr-integration/mapping")}>
            数据映射
          </TabsTrigger>
          <TabsTrigger value="sync" onClick={() => router.push("/ehr-integration/sync")}>
            同步状态
          </TabsTrigger>
          <TabsTrigger value="connections" onClick={() => router.push("/ehr-integration/connections")}>
            系统连接
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">集成设置</h2>
          <p className="text-muted-foreground">配置电子病历集成的全局设置和参数</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            重置默认
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 同步设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              同步设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>同步间隔（小时）</Label>
                <span className="text-sm font-medium">{settings.syncInterval}小时</span>
              </div>
              <Slider
                value={[settings.syncInterval]}
                min={1}
                max={24}
                step={1}
                onValueChange={(value) => handleChange("syncInterval", value[0])}
              />
              <p className="text-sm text-muted-foreground">设置自动同步的时间间隔</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retryAttempts">重试次数</Label>
              <Select
                value={settings.retryAttempts.toString()}
                onValueChange={(value) => handleChange("retryAttempts", Number.parseInt(value))}
              >
                <SelectTrigger id="retryAttempts">
                  <SelectValue placeholder="选择重试次数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1次</SelectItem>
                  <SelectItem value="3">3次</SelectItem>
                  <SelectItem value="5">5次</SelectItem>
                  <SelectItem value="10">10次</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">同步失败时的重试次数</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeout">超时时间（秒）</Label>
              <Input
                id="timeout"
                type="number"
                value={settings.timeout}
                onChange={(e) => handleChange("timeout", Number.parseInt(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">API请求的超时时间</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBatchSize">最大批处理大小</Label>
              <Input
                id="maxBatchSize"
                type="number"
                value={settings.maxBatchSize}
                onChange={(e) => handleChange("maxBatchSize", Number.parseInt(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">单次同步的最大记录数</p>
            </div>
          </CardContent>
        </Card>

        {/* 安全设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              安全设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableEncryption">启用数据加密</Label>
                <p className="text-sm text-muted-foreground">传输和存储数据时使用加密</p>
              </div>
              <Switch
                id="enableEncryption"
                checked={settings.enableEncryption}
                onCheckedChange={(value) => handleChange("enableEncryption", value)}
              />
            </div>

            {settings.enableEncryption && (
              <div className="space-y-2">
                <Label htmlFor="encryptionMethod">加密方法</Label>
                <Select
                  value={settings.encryptionMethod}
                  onValueChange={(value) => handleChange("encryptionMethod", value)}
                >
                  <SelectTrigger id="encryptionMethod">
                    <SelectValue placeholder="选择加密方法" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AES-128">AES-128</SelectItem>
                    <SelectItem value="AES-256">AES-256</SelectItem>
                    <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">选择数据加密的算法</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableCompression">启用数据压缩</Label>
                <p className="text-sm text-muted-foreground">传输数据时使用压缩</p>
              </div>
              <Switch
                id="enableCompression"
                checked={settings.enableCompression}
                onCheckedChange={(value) => handleChange("enableCompression", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableAuditLog">启用审计日志</Label>
                <p className="text-sm text-muted-foreground">记录所有数据访问和修改操作</p>
              </div>
              <Switch
                id="enableAuditLog"
                checked={settings.enableAuditLog}
                onCheckedChange={(value) => handleChange("enableAuditLog", value)}
              />
            </div>

            {settings.enableAuditLog && (
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">日志保留期（天）</Label>
                <Input
                  id="retentionPeriod"
                  type="number"
                  value={settings.retentionPeriod}
                  onChange={(e) => handleChange("retentionPeriod", Number.parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">审计日志的保留时间</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 通知设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              通知设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableNotifications">启用通知</Label>
                <p className="text-sm text-muted-foreground">发送同步状态通知</p>
              </div>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(value) => handleChange("enableNotifications", value)}
              />
            </div>

            {settings.enableNotifications && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnError">错误时通知</Label>
                    <p className="text-sm text-muted-foreground">当同步失败时发送通知</p>
                  </div>
                  <Switch
                    id="notifyOnError"
                    checked={settings.notifyOnError}
                    onCheckedChange={(value) => handleChange("notifyOnError", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnSuccess">成功时通知</Label>
                    <p className="text-sm text-muted-foreground">当同步成功时发送通知</p>
                  </div>
                  <Switch
                    id="notifyOnSuccess"
                    checked={settings.notifyOnSuccess}
                    onCheckedChange={(value) => handleChange("notifyOnSuccess", value)}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* 日志设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              日志设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logLevel">日志级别</Label>
              <Select value={settings.logLevel} onValueChange={(value) => handleChange("logLevel", value)}>
                <SelectTrigger id="logLevel">
                  <SelectValue placeholder="选择日志级别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Warn</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">设置记录的详细程度</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultDateFormat">默认日期格式</Label>
              <Input
                id="defaultDateFormat"
                type="text"
                value={settings.defaultDateFormat}
                onChange={(e) => handleChange("defaultDateFormat", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">设置日期显示的默认格式</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultTimeFormat">默认时间格式</Label>
              <Input
                id="defaultTimeFormat"
                type="text"
                value={settings.defaultTimeFormat}
                onChange={(e) => handleChange("defaultTimeFormat", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">设置时间显示的默认格式</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
