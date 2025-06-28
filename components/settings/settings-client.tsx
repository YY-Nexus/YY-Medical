"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun, Eye, Zap, Clock, Laptop } from "lucide-react"

export function SettingsClient() {
  const [settings, setSettings] = useState({
    theme: "system",
    language: "zh-CN",
    fontSize: 16,
    colorScheme: "blue",
    animations: true,
    autoSave: true,
    compactMode: false,
    highContrastMode: false,
    sessionTimeout: 30,
    dataRefreshInterval: 60,
  })

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Tabs defaultValue="appearance" className="space-y-4">
      <TabsList>
        <TabsTrigger value="appearance">外观</TabsTrigger>
        <TabsTrigger value="language">语言与区域</TabsTrigger>
        <TabsTrigger value="performance">性能</TabsTrigger>
        <TabsTrigger value="advanced">高级设置</TabsTrigger>
      </TabsList>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>外观设置</CardTitle>
            <CardDescription>自定义系统的视觉外观</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">主题</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.theme === "light" ? "border-medical-500 bg-medical-50" : "border-gray-200"}`}
                    onClick={() => handleChange("theme", "light")}
                  >
                    <Sun className="h-8 w-8 mb-2 text-medical-500" />
                    <span>浅色</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.theme === "dark" ? "border-medical-500 bg-medical-50" : "border-gray-200"}`}
                    onClick={() => handleChange("theme", "dark")}
                  >
                    <Moon className="h-8 w-8 mb-2 text-medical-500" />
                    <span>深色</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.theme === "system" ? "border-medical-500 bg-medical-50" : "border-gray-200"}`}
                    onClick={() => handleChange("theme", "system")}
                  >
                    <Laptop className="h-8 w-8 mb-2 text-medical-500" />
                    <span>跟随系统</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">颜色方案</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.colorScheme === "blue" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                    onClick={() => handleChange("colorScheme", "blue")}
                  >
                    <div className="h-8 w-8 mb-2 bg-blue-500 rounded-full"></div>
                    <span>蓝色</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.colorScheme === "green" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                    onClick={() => handleChange("colorScheme", "green")}
                  >
                    <div className="h-8 w-8 mb-2 bg-green-500 rounded-full"></div>
                    <span>绿色</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.colorScheme === "purple" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                    onClick={() => handleChange("colorScheme", "purple")}
                  >
                    <div className="h-8 w-8 mb-2 bg-purple-500 rounded-full"></div>
                    <span>紫色</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${settings.colorScheme === "orange" ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
                    onClick={() => handleChange("colorScheme", "orange")}
                  >
                    <div className="h-8 w-8 mb-2 bg-orange-500 rounded-full"></div>
                    <span>橙色</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-3 text-medical-500" />
                    <div>
                      <Label htmlFor="font-size">字体大小</Label>
                      <p className="text-sm text-muted-foreground">调整系统字体大小</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-1/3">
                    <span className="text-sm">A</span>
                    <Slider
                      id="font-size"
                      value={[settings.fontSize]}
                      min={12}
                      max={20}
                      step={1}
                      onValueChange={(value) => handleChange("fontSize", value[0])}
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-3 text-medical-500" />
                    <div>
                      <Label htmlFor="animations">动画效果</Label>
                      <p className="text-sm text-muted-foreground">启用界面动画效果</p>
                    </div>
                  </div>
                  <Switch
                    id="animations"
                    checked={settings.animations}
                    onCheckedChange={(checked) => handleChange("animations", checked)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-3 text-medical-500" />
                    <div>
                      <Label htmlFor="high-contrast">高对比度模式</Label>
                      <p className="text-sm text-muted-foreground">提高界面对比度，增强可读性</p>
                    </div>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrastMode}
                    onCheckedChange={(checked) => handleChange("highContrastMode", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>保存设置</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="language">
        <Card>
          <CardHeader>
            <CardTitle>语言与区域</CardTitle>
            <CardDescription>设置系统语言和区域偏好</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">系统语言</Label>
                <Select value={settings.language} onValueChange={(value) => handleChange("language", value)}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="选择语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="zh-TW">繁體中文</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="ja-JP">日本語</SelectItem>
                    <SelectItem value="ko-KR">한국어</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">日期格式</Label>
                <Select defaultValue="yyyy-mm-dd">
                  <SelectTrigger id="date-format" className="w-full">
                    <SelectValue placeholder="选择日期格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy年mm月dd日">YYYY年MM月DD日</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-format">时间格式</Label>
                <Select defaultValue="24h">
                  <SelectTrigger id="time-format" className="w-full">
                    <SelectValue placeholder="选择时间格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24小时制 (14:30)</SelectItem>
                    <SelectItem value="12h">12小时制 (2:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">时区</Label>
                <Select defaultValue="asia-shanghai">
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="选择时区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-shanghai">(GMT+8:00) 北京，上海</SelectItem>
                    <SelectItem value="asia-hongkong">(GMT+8:00) 香港</SelectItem>
                    <SelectItem value="asia-taipei">(GMT+8:00) 台北</SelectItem>
                    <SelectItem value="asia-tokyo">(GMT+9:00) 东京</SelectItem>
                    <SelectItem value="america-newyork">(GMT-5:00) 纽约</SelectItem>
                    <SelectItem value="europe-london">(GMT+0:00) 伦敦</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>保存设置</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="performance">
        <Card>
          <CardHeader>
            <CardTitle>性能设置</CardTitle>
            <CardDescription>优化系统性能和资源使用</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <Label htmlFor="compact-mode">紧凑模式</Label>
                    <p className="text-sm text-muted-foreground">减少界面间距，显示更多内容</p>
                  </div>
                </div>
                <Switch
                  id="compact-mode"
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => handleChange("compactMode", checked)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <Label htmlFor="data-refresh">数据刷新间隔</Label>
                    <p className="text-sm text-muted-foreground">设置自动刷新数据的时间间隔</p>
                  </div>
                </div>
                <Select
                  value={settings.dataRefreshInterval.toString()}
                  onValueChange={(value) => handleChange("dataRefreshInterval", Number.parseInt(value))}
                >
                  <SelectTrigger id="data-refresh" className="w-40">
                    <SelectValue placeholder="选择间隔" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30秒</SelectItem>
                    <SelectItem value="60">1分钟</SelectItem>
                    <SelectItem value="300">5分钟</SelectItem>
                    <SelectItem value="600">10分钟</SelectItem>
                    <SelectItem value="0">手动刷新</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <Label htmlFor="auto-save">自动保存</Label>
                    <p className="text-sm text-muted-foreground">自动保存表单和编辑内容</p>
                  </div>
                </div>
                <Switch
                  id="auto-save"
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => handleChange("autoSave", checked)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>保存设置</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="advanced">
        <Card>
          <CardHeader>
            <CardTitle>高级设置</CardTitle>
            <CardDescription>配置系统高级选项</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <Label htmlFor="session-timeout">会话超时</Label>
                    <p className="text-sm text-muted-foreground">设置无操作自动退出的时间</p>
                  </div>
                </div>
                <Select
                  value={settings.sessionTimeout.toString()}
                  onValueChange={(value) => handleChange("sessionTimeout", Number.parseInt(value))}
                >
                  <SelectTrigger id="session-timeout" className="w-40">
                    <SelectValue placeholder="选择时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15分钟</SelectItem>
                    <SelectItem value="30">30分钟</SelectItem>
                    <SelectItem value="60">1小时</SelectItem>
                    <SelectItem value="120">2小时</SelectItem>
                    <SelectItem value="0">永不超时</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  导出系统设置
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  导入系统设置
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  重置所有设置
                </Button>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">数据管理</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    清除缓存数据
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    下载个人数据
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    删除账号数据
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>保存设置</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
