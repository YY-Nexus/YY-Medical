"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Settings, Shield, Clock, AlertTriangle, Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export function VerificationProviderSettings() {
  const { toast } = useToast()
  const [defaultProvider, setDefaultProvider] = useState("nhc")
  const [settings, setSettings] = useState({
    autoVerify: true,
    notifyOnExpiry: true,
    useExpressVerification: false,
    storeVerificationHistory: true,
  })

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const handleSaveSettings = () => {
    console.log("保存设置:", { defaultProvider, ...settings })
    toast({
      title: "设置已保存",
      description: "您的资质验证设置已成功更新",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2 text-blue-500" />
          验证机构设置
        </CardTitle>
        <CardDescription>配置默认验证机构和验证选项</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">默认验证机构</h3>
          <RadioGroup value={defaultProvider} onValueChange={setDefaultProvider} className="space-y-3">
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="nhc" id="nhc" />
              <Label htmlFor="nhc" className="flex-1 cursor-pointer">
                <div className="font-medium">国家卫健委医师资格认证中心</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  官方认证 · 1-2个工作日
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="cmda" id="cmda" />
              <Label htmlFor="cmda" className="flex-1 cursor-pointer">
                <div className="font-medium">中国医师协会认证中心</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  官方认证 · 2-3个工作日
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="medverify" id="medverify" />
              <Label htmlFor="medverify" className="flex-1 cursor-pointer">
                <div className="font-medium">医证通快速验证服务</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  快速验证 · 4小时内
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="healthcert" id="healthcert" />
              <Label htmlFor="healthcert" className="flex-1 cursor-pointer">
                <div className="font-medium">健康证书验证联盟</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  快速验证 · 1个工作日
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">验证选项</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-verify" className="font-medium">
                  自动验证
                </Label>
                <p className="text-sm text-muted-foreground">上传资质后自动发送验证请求</p>
              </div>
              <Switch
                id="auto-verify"
                checked={settings.autoVerify}
                onCheckedChange={(checked) => handleSettingChange("autoVerify", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notify-expiry" className="font-medium">
                  过期提醒
                </Label>
                <p className="text-sm text-muted-foreground">资质即将过期时发送提醒通知</p>
              </div>
              <Switch
                id="notify-expiry"
                checked={settings.notifyOnExpiry}
                onCheckedChange={(checked) => handleSettingChange("notifyOnExpiry", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="express-verification" className="font-medium">
                  使用快速验证
                </Label>
                <p className="text-sm text-muted-foreground">优先使用快速验证服务（可能产生额外费用）</p>
              </div>
              <Switch
                id="express-verification"
                checked={settings.useExpressVerification}
                onCheckedChange={(checked) => handleSettingChange("useExpressVerification", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="store-history" className="font-medium">
                  保存验证历史
                </Label>
                <p className="text-sm text-muted-foreground">保存所有验证记录和详细信息</p>
              </div>
              <Switch
                id="store-history"
                checked={settings.storeVerificationHistory}
                onCheckedChange={(checked) => handleSettingChange("storeVerificationHistory", checked)}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSaveSettings} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            保存设置
          </Button>
        </div>

        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-yellow-800">重要提示</h4>
              <p className="text-sm text-yellow-700 mt-1">
                更改默认验证机构不会影响已提交的验证请求。新的设置将应用于之后提交的所有资质验证。
                某些验证机构可能收取额外费用，请在选择前查看各机构的收费标准。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
