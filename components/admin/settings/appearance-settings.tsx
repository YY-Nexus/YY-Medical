"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

export function AppearanceSettings() {
  const { toast } = useToast()
  const [theme, setTheme] = useState("系统默认")
  const [primaryColor, setPrimaryColor] = useState("蓝色")
  const [fontSize, setFontSize] = useState(16)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [compactMode, setCompactMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSave = () => {
    toast({
      title: "外观设置已保存",
      description: "您的外观偏好设置已成功更新。",
    })
  }

  const handleReset = () => {
    setTheme("系统默认")
    setPrimaryColor("蓝色")
    setFontSize(16)
    setAnimationsEnabled(true)
    setHighContrastMode(false)
    setCompactMode(false)
    setSidebarCollapsed(false)

    toast({
      title: "外观设置已重置",
      description: "您的外观偏好设置已恢复默认值。",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>外观设置</CardTitle>
        <CardDescription>自定义系统界面外观，包括主题、颜色和布局等选项</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="theme">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme">主题</TabsTrigger>
            <TabsTrigger value="colors">颜色</TabsTrigger>
            <TabsTrigger value="layout">布局</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="theme-select">主题模式</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme-select">
                  <SelectValue placeholder="选择主题" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="系统默认">系统默认</SelectItem>
                  <SelectItem value="浅色">浅色</SelectItem>
                  <SelectItem value="深色">深色</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations-toggle">界面动画</Label>
                <p className="text-sm text-muted-foreground">启用或禁用界面过渡动画效果</p>
              </div>
              <Switch id="animations-toggle" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast-toggle">高对比度模式</Label>
                <p className="text-sm text-muted-foreground">增强文本和界面元素的对比度，提高可读性</p>
              </div>
              <Switch id="high-contrast-toggle" checked={highContrastMode} onCheckedChange={setHighContrastMode} />
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">主题色</Label>
              <Select value={primaryColor} onValueChange={setPrimaryColor}>
                <SelectTrigger id="primary-color">
                  <SelectValue placeholder="选择主题色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="蓝色">蓝色</SelectItem>
                  <SelectItem value="绿色">绿色</SelectItem>
                  <SelectItem value="紫色">紫色</SelectItem>
                  <SelectItem value="橙色">橙色</SelectItem>
                  <SelectItem value="红色">红色</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size">字体大小 ({fontSize}px)</Label>
              </div>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-mode-toggle">紧凑模式</Label>
                <p className="text-sm text-muted-foreground">减小界面元素间距，在屏幕上显示更多内容</p>
              </div>
              <Switch id="compact-mode-toggle" checked={compactMode} onCheckedChange={setCompactMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sidebar-toggle">默认折叠侧边栏</Label>
                <p className="text-sm text-muted-foreground">页面加载时自动折叠侧边导航栏</p>
              </div>
              <Switch id="sidebar-toggle" checked={sidebarCollapsed} onCheckedChange={setSidebarCollapsed} />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleReset}>
            恢复默认
          </Button>
          <Button onClick={handleSave}>保存设置</Button>
        </div>
      </CardContent>
    </Card>
  )
}
