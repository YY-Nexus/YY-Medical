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
import { Save, Download, Upload, Clock, Database, HardDrive } from "lucide-react"

export function BackupSettings() {
  const [autoBackupSettings, setAutoBackupSettings] = useState({
    enableAutoBackup: true,
    frequency: "daily",
    time: "02:00",
    retentionCount: 7,
    compressionLevel: "medium",
    includeAttachments: true,
    includeAuditLogs: true,
  })

  const [storageSettings, setStorageSettings] = useState({
    storageType: "local",
    localPath: "/var/backups/yanyu",
    s3Bucket: "yanyu-backups",
    s3Region: "ap-east-1",
    s3AccessKey: "AKIAXXXXXXXX",
    s3SecretKey: "********",
    ftpHost: "",
    ftpUsername: "",
    ftpPassword: "",
    ftpPath: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    notifyOnSuccess: true,
    notifyOnFailure: true,
    notifyEmail: "admin@example.com",
  })

  const handleSaveSettings = () => {
    // 在实际应用中，这里会调用API保存设置
    console.log("保存备份设置", {
      autoBackup: autoBackupSettings,
      storage: storageSettings,
      notification: notificationSettings,
    })
  }

  const handleManualBackup = () => {
    // 在实际应用中，这里会调用API执行手动备份
    console.log("执行手动备份")
  }

  const handleRestoreBackup = () => {
    // 在实际应用中，这里会打开一个对话框选择要恢复的备份
    console.log("恢复备份")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>备份设置</CardTitle>
          <CardDescription>配置系统数据的备份策略</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleManualBackup}>
            <Download className="mr-2 h-4 w-4" />
            手动备份
          </Button>
          <Button variant="outline" onClick={handleRestoreBackup}>
            <Upload className="mr-2 h-4 w-4" />
            恢复备份
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            保存设置
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="auto">
          <TabsList className="mb-4">
            <TabsTrigger value="auto">自动备份</TabsTrigger>
            <TabsTrigger value="storage">存储设置</TabsTrigger>
            <TabsTrigger value="notification">通知设置</TabsTrigger>
          </TabsList>

          <TabsContent value="auto" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">启用自动备份</h3>
                  <p className="text-sm text-muted-foreground">控制系统是否自动执行定期备份</p>
                </div>
                <Switch
                  checked={autoBackupSettings.enableAutoBackup}
                  onCheckedChange={(checked) =>
                    setAutoBackupSettings({
                      ...autoBackupSettings,
                      enableAutoBackup: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="frequency" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    备份频率
                  </Label>
                  <Select
                    value={autoBackupSettings.frequency}
                    onValueChange={(value) =>
                      setAutoBackupSettings({
                        ...autoBackupSettings,
                        frequency: value,
                      })
                    }
                  >
                    <SelectTrigger className="col-span-2">
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

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="time">备份时间</Label>
                  <Input
                    id="time"
                    type="time"
                    value={autoBackupSettings.time}
                    onChange={(e) =>
                      setAutoBackupSettings({
                        ...autoBackupSettings,
                        time: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="retentionCount" className="flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    保留备份数量
                  </Label>
                  <Input
                    id="retentionCount"
                    type="number"
                    value={autoBackupSettings.retentionCount}
                    onChange={(e) =>
                      setAutoBackupSettings({
                        ...autoBackupSettings,
                        retentionCount: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="compressionLevel">压缩级别</Label>
                  <Select
                    value={autoBackupSettings.compressionLevel}
                    onValueChange={(value) =>
                      setAutoBackupSettings({
                        ...autoBackupSettings,
                        compressionLevel: value,
                      })
                    }
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="选择压缩级别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">不压缩</SelectItem>
                      <SelectItem value="low">低压缩</SelectItem>
                      <SelectItem value="medium">中等压缩</SelectItem>
                      <SelectItem value="high">高压缩</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeAttachments">包含附件</Label>
                    <p className="text-sm text-muted-foreground">是否在备份中包含上传的附件</p>
                  </div>
                  <Switch
                    id="includeAttachments"
                    checked={autoBackupSettings.includeAttachments}
                    onCheckedChange={(checked) =>
                      setAutoBackupSettings({
                        ...autoBackupSettings,
                        includeAttachments: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeAuditLogs">包含审计日志</Label>
                    <p className="text-sm text-muted-foreground">是否在备份中包含系统审计日志</p>
                  </div>
                  <Switch
                    id="includeAuditLogs"
                    checked={autoBackupSettings.includeAuditLogs}
                    onCheckedChange={(checked) =>
                      setAutoBackupSettings({
                        ...autoBackupSettings,
                        includeAuditLogs: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="storageType" className="flex items-center">
                  <HardDrive className="mr-2 h-4 w-4" />
                  存储类型
                </Label>
                <Select
                  value={storageSettings.storageType}
                  onValueChange={(value) =>
                    setStorageSettings({
                      ...storageSettings,
                      storageType: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-2">
                    <SelectValue placeholder="选择存储类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">本地存储</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="ftp">FTP服务器</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {storageSettings.storageType === "local" && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="localPath">本地路径</Label>
                    <Input
                      id="localPath"
                      value={storageSettings.localPath}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          localPath: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>
                </div>
              )}

              {storageSettings.storageType === "s3" && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="s3Bucket">S3存储桶</Label>
                    <Input
                      id="s3Bucket"
                      value={storageSettings.s3Bucket}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          s3Bucket: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="s3Region">S3区域</Label>
                    <Input
                      id="s3Region"
                      value={storageSettings.s3Region}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          s3Region: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="s3AccessKey">访问密钥</Label>
                    <Input
                      id="s3AccessKey"
                      value={storageSettings.s3AccessKey}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          s3AccessKey: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="s3SecretKey">秘密密钥</Label>
                    <Input
                      id="s3SecretKey"
                      type="password"
                      value={storageSettings.s3SecretKey}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          s3SecretKey: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>
                </div>
              )}

              {storageSettings.storageType === "ftp" && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="ftpHost">FTP主机</Label>
                    <Input
                      id="ftpHost"
                      value={storageSettings.ftpHost}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          ftpHost: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="ftpUsername">FTP用户名</Label>
                    <Input
                      id="ftpUsername"
                      value={storageSettings.ftpUsername}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          ftpUsername: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="ftpPassword">FTP密码</Label>
                    <Input
                      id="ftpPassword"
                      type="password"
                      value={storageSettings.ftpPassword}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          ftpPassword: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="ftpPath">FTP路径</Label>
                    <Input
                      id="ftpPath"
                      value={storageSettings.ftpPath}
                      onChange={(e) =>
                        setStorageSettings({
                          ...storageSettings,
                          ftpPath: e.target.value,
                        })
                      }
                      className="col-span-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notification" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnSuccess">备份成功通知</Label>
                  <p className="text-sm text-muted-foreground">备份成功时是否发送通知</p>
                </div>
                <Switch
                  id="notifyOnSuccess"
                  checked={notificationSettings.notifyOnSuccess}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      notifyOnSuccess: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnFailure">备份失败通知</Label>
                  <p className="text-sm text-muted-foreground">备份失败时是否发送通知</p>
                </div>
                <Switch
                  id="notifyOnFailure"
                  checked={notificationSettings.notifyOnFailure}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      notifyOnFailure: checked,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="notifyEmail">通知邮箱</Label>
                <Input
                  id="notifyEmail"
                  type="email"
                  value={notificationSettings.notifyEmail}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      notifyEmail: e.target.value,
                    })
                  }
                  className="col-span-2"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
