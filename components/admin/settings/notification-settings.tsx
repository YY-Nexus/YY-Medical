"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export function NotificationSettings() {
  const [emailSettings, setEmailSettings] = useState({
    enableEmail: true,
    defaultSender: "YanYu MediNexus <notifications@example.com>",
    replyTo: "support@example.com",
    batchSize: 50,
    retryAttempts: 3,
    retryDelay: 5,
    includeFooter: true,
    footerText: "此邮件由言语医枢³系统自动发送，请勿直接回复。如有问题，请联系系统管理员。",
  })

  const [smsSettings, setSmsSettings] = useState({
    enableSms: true,
    defaultSignature: "【言语医枢】",
    maxLength: 70,
    retryAttempts: 2,
    retryDelay: 3,
    includeOptOut: true,
    optOutText: "回复TD退订",
  })

  const [pushSettings, setPushSettings] = useState({
    enablePush: true,
    defaultIcon: "/logo.png",
    defaultSound: "default",
    ttl: 86400,
    retryAttempts: 2,
    retryDelay: 3,
    badgeCount: true,
  })

  const [generalSettings, setGeneralSettings] = useState({
    enableNotifications: true,
    defaultPriority: "normal",
    throttleRate: 100,
    throttlePeriod: "minute",
    logNotifications: true,
    logRetention: 30,
    notifyAdminOnFailure: true,
    adminEmail: "admin@example.com",
  })

  const handleSaveSettings = () => {
    // 在实际应用中，这里会调用API保存设置
    console.log("保存设置", {
      email: emailSettings,
      sms: smsSettings,
      push: pushSettings,
      general: generalSettings,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>通知设置</CardTitle>
          <CardDescription>配置系统通知的全局设置</CardDescription>
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
            <TabsTrigger value="email">邮件设置</TabsTrigger>
            <TabsTrigger value="sms">短信设置</TabsTrigger>
            <TabsTrigger value="push">推送设置</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">启用通知</h3>
                  <p className="text-sm text-muted-foreground">控制系统是否发送通知</p>
                </div>
                <Switch
                  checked={generalSettings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setGeneralSettings({
                      ...generalSettings,
                      enableNotifications: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="defaultPriority">默认优先级</Label>
                  <Select
                    value={generalSettings.defaultPriority}
                    onValueChange={(value) =>
                      setGeneralSettings({
                        ...generalSettings,
                        defaultPriority: value,
                      })
                    }
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="选择默认优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="normal">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="throttleRate">限流速率</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Input
                      id="throttleRate"
                      type="number"
                      value={generalSettings.throttleRate}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          throttleRate: Number.parseInt(e.target.value),
                        })
                      }
                      className="w-24"
                    />
                    <span>每</span>
                    <Select
                      value={generalSettings.throttlePeriod}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          throttlePeriod: value,
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
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="logRetention">日志保留天数</Label>
                  <Input
                    id="logRetention"
                    type="number"
                    value={generalSettings.logRetention}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        logRetention: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="logNotifications">记录通知日志</Label>
                    <p className="text-sm text-muted-foreground">是否记录所有通知的发送日志</p>
                  </div>
                  <Switch
                    id="logNotifications"
                    checked={generalSettings.logNotifications}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        logNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifyAdminOnFailure">通知失败时通知管理员</Label>
                    <p className="text-sm text-muted-foreground">当通知发送失败时，是否通知系统管理员</p>
                  </div>
                  <Switch
                    id="notifyAdminOnFailure"
                    checked={generalSettings.notifyAdminOnFailure}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        notifyAdminOnFailure: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="adminEmail">管理员邮箱</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={generalSettings.adminEmail}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        adminEmail: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">启用邮件通知</h3>
                  <p className="text-sm text-muted-foreground">控制系统是否发送邮件通知</p>
                </div>
                <Switch
                  checked={emailSettings.enableEmail}
                  onCheckedChange={(checked) =>
                    setEmailSettings({
                      ...emailSettings,
                      enableEmail: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="defaultSender">默认发件人</Label>
                  <Input
                    id="defaultSender"
                    value={emailSettings.defaultSender}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        defaultSender: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="replyTo">回复地址</Label>
                  <Input
                    id="replyTo"
                    value={emailSettings.replyTo}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        replyTo: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="batchSize">批量发送大小</Label>
                  <Input
                    id="batchSize"
                    type="number"
                    value={emailSettings.batchSize}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        batchSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="retryAttempts">重试次数</Label>
                  <Input
                    id="retryAttempts"
                    type="number"
                    value={emailSettings.retryAttempts}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        retryAttempts: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="retryDelay">重试延迟（分钟）</Label>
                  <Input
                    id="retryDelay"
                    type="number"
                    value={emailSettings.retryDelay}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        retryDelay: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeFooter">包含页脚</Label>
                    <p className="text-sm text-muted-foreground">是否在所有邮件中包含页脚文本</p>
                  </div>
                  <Switch
                    id="includeFooter"
                    checked={emailSettings.includeFooter}
                    onCheckedChange={(checked) =>
                      setEmailSettings({
                        ...emailSettings,
                        includeFooter: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 items-start gap-4">
                  <Label htmlFor="footerText" className="mt-2">
                    页脚文本
                  </Label>
                  <Textarea
                    id="footerText"
                    value={emailSettings.footerText}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        footerText: e.target.value,
                      })
                    }
                    className="col-span-2"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">启用短信通知</h3>
                  <p className="text-sm text-muted-foreground">控制系统是否发送短信通知</p>
                </div>
                <Switch
                  checked={smsSettings.enableSms}
                  onCheckedChange={(checked) =>
                    setSmsSettings({
                      ...smsSettings,
                      enableSms: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="defaultSignature">默认签名</Label>
                  <Input
                    id="defaultSignature"
                    value={smsSettings.defaultSignature}
                    onChange={(e) =>
                      setSmsSettings({
                        ...smsSettings,
                        defaultSignature: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxLength">最大长度</Label>
                  <Input
                    id="maxLength"
                    type="number"
                    value={smsSettings.maxLength}
                    onChange={(e) =>
                      setSmsSettings({
                        ...smsSettings,
                        maxLength: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="smsRetryAttempts">重试次数</Label>
                  <Input
                    id="smsRetryAttempts"
                    type="number"
                    value={smsSettings.retryAttempts}
                    onChange={(e) =>
                      setSmsSettings({
                        ...smsSettings,
                        retryAttempts: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="smsRetryDelay">重试延迟（分钟）</Label>
                  <Input
                    id="smsRetryDelay"
                    type="number"
                    value={smsSettings.retryDelay}
                    onChange={(e) =>
                      setSmsSettings({
                        ...smsSettings,
                        retryDelay: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeOptOut">包含退订信息</Label>
                    <p className="text-sm text-muted-foreground">是否在所有短信中包含退订信息</p>
                  </div>
                  <Switch
                    id="includeOptOut"
                    checked={smsSettings.includeOptOut}
                    onCheckedChange={(checked) =>
                      setSmsSettings({
                        ...smsSettings,
                        includeOptOut: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="optOutText">退订文本</Label>
                  <Input
                    id="optOutText"
                    value={smsSettings.optOutText}
                    onChange={(e) =>
                      setSmsSettings({
                        ...smsSettings,
                        optOutText: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="push" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">启用推送通知</h3>
                  <p className="text-sm text-muted-foreground">控制系统是否发送推送通知</p>
                </div>
                <Switch
                  checked={pushSettings.enablePush}
                  onCheckedChange={(checked) =>
                    setPushSettings({
                      ...pushSettings,
                      enablePush: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="defaultIcon">默认图标</Label>
                  <Input
                    id="defaultIcon"
                    value={pushSettings.defaultIcon}
                    onChange={(e) =>
                      setPushSettings({
                        ...pushSettings,
                        defaultIcon: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="defaultSound">默认声音</Label>
                  <Input
                    id="defaultSound"
                    value={pushSettings.defaultSound}
                    onChange={(e) =>
                      setPushSettings({
                        ...pushSettings,
                        defaultSound: e.target.value,
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="ttl">生存时间（秒）</Label>
                  <Input
                    id="ttl"
                    type="number"
                    value={pushSettings.ttl}
                    onChange={(e) =>
                      setPushSettings({
                        ...pushSettings,
                        ttl: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="pushRetryAttempts">重试次数</Label>
                  <Input
                    id="pushRetryAttempts"
                    type="number"
                    value={pushSettings.retryAttempts}
                    onChange={(e) =>
                      setPushSettings({
                        ...pushSettings,
                        retryAttempts: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="pushRetryDelay">重试延迟（分钟）</Label>
                  <Input
                    id="pushRetryDelay"
                    type="number"
                    value={pushSettings.retryDelay}
                    onChange={(e) =>
                      setPushSettings({
                        ...pushSettings,
                        retryDelay: Number.parseInt(e.target.value),
                      })
                    }
                    className="col-span-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="badgeCount">启用徽章计数</Label>
                    <p className="text-sm text-muted-foreground">是否在推送通知中包含徽章计数</p>
                  </div>
                  <Switch
                    id="badgeCount"
                    checked={pushSettings.badgeCount}
                    onCheckedChange={(checked) =>
                      setPushSettings({
                        ...pushSettings,
                        badgeCount: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
