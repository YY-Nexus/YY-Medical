"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { ShieldCheck, Plus, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VerificationProvidersList } from "@/components/certifications/verification-providers-list"
import { VerificationProcessGuide } from "@/components/certifications/verification-process-guide"
import { VerificationProviderSettings } from "@/components/certifications/verification-provider-settings"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function VerificationProvidersClient() {
  const [activeTab, setActiveTab] = useState("providers")
  const [showAddProviderDialog, setShowAddProviderDialog] = useState(false)
  const { toast } = useToast()

  // 模拟添加验证机构
  const handleAddProvider = (data: any) => {
    console.log("添加验证机构:", data)
    setShowAddProviderDialog(false)
    toast({
      title: "验证机构已添加",
      description: "新的验证机构已成功添加到系统中。",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="验证机构管理"
        description="管理和配置资质验证服务提供商"
        icon={<ShieldCheck className="h-6 w-6" />}
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Input placeholder="搜索验证机构..." className="max-w-sm" />
          <Button variant="outline">搜索</Button>
        </div>

        <div className="flex space-x-2">
          <Dialog open={showAddProviderDialog} onOpenChange={setShowAddProviderDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                添加验证机构
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>添加新验证机构</DialogTitle>
                <DialogDescription>添加新的资质验证服务提供商</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider-name" className="text-right">
                    机构名称
                  </Label>
                  <Input id="provider-name" placeholder="输入机构名称" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider-type" className="text-right">
                    机构类型
                  </Label>
                  <Select>
                    <SelectTrigger id="provider-type" className="col-span-3">
                      <SelectValue placeholder="选择机构类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">政府机构</SelectItem>
                      <SelectItem value="medical">医疗机构</SelectItem>
                      <SelectItem value="education">教育机构</SelectItem>
                      <SelectItem value="third-party">第三方验证机构</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider-url" className="text-right">
                    API 地址
                  </Label>
                  <Input id="provider-url" placeholder="https://api.example.com/verify" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider-key" className="text-right">
                    API 密钥
                  </Label>
                  <Input id="provider-key" type="password" placeholder="输入API密钥" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider-desc" className="text-right">
                    描述
                  </Label>
                  <Textarea id="provider-desc" placeholder="输入机构描述" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider-active" className="text-right">
                    启用状态
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="provider-active" defaultChecked />
                    <Label htmlFor="provider-active">启用此验证机构</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddProviderDialog(false)}>
                  取消
                </Button>
                <Button onClick={() => handleAddProvider({})}>添加机构</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新状态
          </Button>
        </div>
      </div>

      <Tabs defaultValue="providers" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="providers">验证机构</TabsTrigger>
          <TabsTrigger value="process">验证流程</TabsTrigger>
          <TabsTrigger value="settings">配置设置</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>已连接的验证机构</CardTitle>
              <CardDescription>管理与系统集成的资质验证服务提供商</CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationProvidersList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>验证流程管理</CardTitle>
              <CardDescription>配置资质验证的工作流程和规则</CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationProcessGuide />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>验证设置</CardTitle>
              <CardDescription>配置验证机构的全局设置和默认行为</CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationProviderSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>验证机构文档</CardTitle>
            <CardDescription>了解如何集成和使用各种验证机构的API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">API 集成指南</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">了解如何将验证机构的API集成到您的系统中</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    查看文档
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">验证流程最佳实践</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">了解资质验证流程的最佳实践和推荐配置</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    查看文档
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">故障排除指南</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">解决验证机构集成和使用过程中的常见问题</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    查看文档
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
