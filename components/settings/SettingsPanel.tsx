"use client"

import { useState } from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"

export function SettingsPanel() {
  const {
    theme,
    language,
    fontSize,
    highContrast,
    animations,
    notifications,
    autoSave,
    compactView,
    setTheme,
    setLanguage,
    setFontSize,
    toggleHighContrast,
    toggleAnimations,
    toggleNotifications,
    toggleAutoSave,
    toggleCompactView,
    resetSettings,
  } = useSettingsStore()

  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("appearance")

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{t("settings.title", "系统设置")}</CardTitle>
        <CardDescription>{t("settings.description", "自定义您的 MediNexus³ 体验")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="appearance">{t("settings.tabs.appearance", "外观")}</TabsTrigger>
            <TabsTrigger value="preferences">{t("settings.tabs.preferences", "偏好")}</TabsTrigger>
            <TabsTrigger value="accessibility">{t("settings.tabs.accessibility", "无障碍")}</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("settings.theme.title", "主题")}</h3>
              <RadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-8 w-8 rounded-md bg-blue-500" />
                    </div>
                    <span className="block w-full text-center">{t("settings.theme.light", "浅色")}</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-2 rounded-md bg-slate-950 p-2 shadow-sm">
                      <div className="h-8 w-8 rounded-md bg-blue-500" />
                    </div>
                    <span className="block w-full text-center">{t("settings.theme.dark", "深色")}</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                  <Label
                    htmlFor="theme-system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-2 rounded-md bg-slate-900 p-2 shadow-sm">
                      <div className="h-4 w-8 rounded-md bg-blue-500" />
                      <div className="mt-1 h-4 w-8 rounded-md bg-white" />
                    </div>
                    <span className="block w-full text-center">{t("settings.theme.system", "跟随系统")}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("settings.language.title", "语言")}</h3>
              <RadioGroup
                value={language}
                onValueChange={(value) => setLanguage(value as "zh-CN" | "en-US")}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="zh-CN" id="lang-zh" className="sr-only" />
                  <Label
                    htmlFor="lang-zh"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="block w-full text-center">中文</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="en-US" id="lang-en" className="sr-only" />
                  <Label
                    htmlFor="lang-en"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="block w-full text-center">English</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{t("settings.compactView.title", "紧凑视图")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.compactView.description", "减少界面间距，显示更多内容")}
                  </p>
                </div>
                <Switch checked={compactView} onCheckedChange={toggleCompactView} id="compact-view" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{t("settings.notifications.title", "通知")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.notifications.description", "启用系统通知")}
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={toggleNotifications} id="notifications" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{t("settings.autoSave.title", "自动保存")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.autoSave.description", "自动保存您的更改")}
                  </p>
                </div>
                <Switch checked={autoSave} onCheckedChange={toggleAutoSave} id="auto-save" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{t("settings.animations.title", "动画效果")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.animations.description", "启用界面动画效果")}
                  </p>
                </div>
                <Switch checked={animations} onCheckedChange={toggleAnimations} id="animations" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("settings.fontSize.title", "字体大小")}</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">A</span>
                  <span className="text-lg">A</span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                />
                <div className="text-center text-sm text-muted-foreground">{fontSize}px</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{t("settings.highContrast.title", "高对比度")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.highContrast.description", "增强文本和背景对比度")}
                  </p>
                </div>
                <Switch checked={highContrast} onCheckedChange={toggleHighContrast} id="high-contrast" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetSettings}>
          {t("settings.resetButton", "重置设置")}
        </Button>
        <Button>{t("settings.saveButton", "保存设置")}</Button>
      </CardFooter>
    </Card>
  )
}
