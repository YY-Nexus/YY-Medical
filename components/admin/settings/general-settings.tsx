"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Settings, Save } from "lucide-react"

export function GeneralSettings() {
  const [siteName, setSiteName] = useState("言语云³医疗管理平台")
  const [siteDescription, setSiteDescription] = useState("智能医疗决策支持与管理平台")
  const [adminEmail, setAdminEmail] = useState("admin@medinexus.com")
  const [timezone, setTimezone] = useState("Asia/Shanghai")
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD")
  const [timeFormat, setTimeFormat] = useState("HH:mm:ss")
  const [maintenance, setMaintenance] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [defaultLanguage, setDefaultLanguage] = useState("zh-CN")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    // 模拟API调用
    setTimeout(() => {
      toast({
        title: "设置已保存",
        description: "系统基本设置已成功更新。",
      })

      setLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            基本系统设置
          </CardTitle>
          <CardDescription>配置系统基本参数和全局设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">系统名称</Label>
              <Input
                id="site-name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="输入系统名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-description">系统描述</Label>
              <Textarea
                id="site-description"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                placeholder="输入系统描述"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-email">管理员邮箱</Label>
              <Input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="输入管理员邮箱"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">本地化设置</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">时区</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="选择时区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Shanghai">亚洲/上海 (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Hong_Kong">亚洲/香港 (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Tokyo">亚洲/东京 (GMT+9)</SelectItem>
                    <SelectItem value="America/New_York">美国/纽约 (GMT-5)</SelectItem>
                    <SelectItem value="Europe/London">欧洲/伦敦 (GMT+0)</SelectItem>
                    <SelectItem value="Europe/Paris">欧洲/巴黎 (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-language">默认语言</Label>
                <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                  <SelectTrigger id="default-language">
                    <SelectValue placeholder="选择默认语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">中文（简体）</SelectItem>
                    <SelectItem value="en-US">英文（美国）</SelectItem>
                    <SelectItem value="ja-JP">日文</SelectItem>
                    <SelectItem value="ko-KR">韩文</SelectItem>
                    <SelectItem value="fr-FR">法文</SelectItem>
                    <SelectItem value="de-DE">德文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">日期格式</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="选择日期格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                    <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-format">时间格式</Label>
                <Select value={timeFormat} onValueChange={setTimeFormat}>
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="选择时间格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HH:mm:ss">24小时制 (HH:mm:ss)</SelectItem>
                    <SelectItem value="HH:mm">24小时制 (HH:mm)</SelectItem>
                    <SelectItem value="hh:mm:ss A">12小时制 (hh:mm:ss AM/PM)</SelectItem>
                    <SelectItem value="hh:mm A">12小时制 (hh:mm AM/PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">系统状态</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">维护模式</Label>
                  <p className="text-sm text-gray-500">启用后，非管理员用户将无法访问系统</p>
                </div>
                <Switch id="maintenance-mode" checked={maintenance} onCheckedChange={setMaintenance} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">调试模式</Label>
                  <p className="text-sm text-gray-500">启用后，系统将显示详细的错误信息和调试日志</p>
                </div>
                <Switch id="debug-mode" checked={debugMode} onCheckedChange={setDebugMode} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading} className="gap-1.5">
            <Save className="h-4 w-4" />
            {loading ? "保存中..." : "保存设置"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
