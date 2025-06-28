"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StorageSettings() {
  const [localStorageEnabled, setLocalStorageEnabled] = useState(true)
  const [cloudStorageEnabled, setCloudStorageEnabled] = useState(true)
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true)
  const [compressionLevel, setCompressionLevel] = useState(50)
  const [retentionPeriod, setRetentionPeriod] = useState("30")
  const [storageType, setStorageType] = useState("hybrid")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>存储设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">基本设置</TabsTrigger>
            <TabsTrigger value="advanced">高级设置</TabsTrigger>
            <TabsTrigger value="backup">备份设置</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="local-storage">本地存储</Label>
                  <div className="text-sm text-muted-foreground">启用本地存储功能</div>
                </div>
                <Switch id="local-storage" checked={localStorageEnabled} onCheckedChange={setLocalStorageEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cloud-storage">云存储</Label>
                  <div className="text-sm text-muted-foreground">启用云存储功能</div>
                </div>
                <Switch id="cloud-storage" checked={cloudStorageEnabled} onCheckedChange={setCloudStorageEnabled} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage-type">存储类型</Label>
                <Select value={storageType} onValueChange={setStorageType}>
                  <SelectTrigger id="storage-type">
                    <SelectValue placeholder="选择存储类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">仅本地存储</SelectItem>
                    <SelectItem value="cloud">仅云存储</SelectItem>
                    <SelectItem value="hybrid">混合存储</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compression-level">压缩级别: {compressionLevel}%</Label>
                </div>
                <Slider
                  id="compression-level"
                  min={0}
                  max={100}
                  step={10}
                  value={[compressionLevel]}
                  onValueChange={(value) => setCompressionLevel(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="encryption-type">加密类型</Label>
                <Select defaultValue="aes256">
                  <SelectTrigger id="encryption-type">
                    <SelectValue placeholder="选择加密类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes128">AES-128</SelectItem>
                    <SelectItem value="aes256">AES-256</SelectItem>
                    <SelectItem value="rsa2048">RSA-2048</SelectItem>
                    <SelectItem value="none">不加密</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cache-size">缓存大小 (MB)</Label>
                <Input id="cache-size" type="number" defaultValue="512" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="backup">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">自动备份</Label>
                  <div className="text-sm text-muted-foreground">启用自动备份功能</div>
                </div>
                <Switch id="auto-backup" checked={autoBackupEnabled} onCheckedChange={setAutoBackupEnabled} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">备份频率</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="选择备份频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">每小时</SelectItem>
                    <SelectItem value="daily">每天</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention-period">保留期限 (天)</Label>
                <Input
                  id="retention-period"
                  type="number"
                  value={retentionPeriod}
                  onChange={(e) => setRetentionPeriod(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline">取消</Button>
          <Button>保存设置</Button>
        </div>
      </CardContent>
    </Card>
  )
}
