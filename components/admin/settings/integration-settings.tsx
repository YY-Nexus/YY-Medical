"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle2, Database, FileText, MessageSquare } from "lucide-react"

export function IntegrationSettings() {
  const { toast } = useToast()

  const [ehrIntegration, setEhrIntegration] = useState(true)
  const [ehrApiKey, setEhrApiKey] = useState("••••••••••••••••")
  const [ehrEndpoint, setEhrEndpoint] = useState("https://api.ehrsystem.com/v2")

  const [labIntegration, setLabIntegration] = useState(true)
  const [labApiKey, setLabApiKey] = useState("••••••••••••••••")
  const [labEndpoint, setLabEndpoint] = useState("https://api.labsystem.com/v1")

  const [messagingIntegration, setMessagingIntegration] = useState(false)
  const [messagingApiKey, setMessagingApiKey] = useState("")
  const [messagingEndpoint, setMessagingEndpoint] = useState("")

  const [reportingIntegration, setReportingIntegration] = useState(true)
  const [reportingApiKey, setReportingApiKey] = useState("••••••••••••••••")
  const [reportingEndpoint, setReportingEndpoint] = useState("https://api.reporting.com/v3")

  const handleSave = () => {
    toast({
      title: "集成设置已保存",
      description: "您的系统集成设置已成功更新。",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>集成设置</CardTitle>
        <CardDescription>配置与外部系统的集成，包括电子健康记录、实验室系统等</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ehr">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                <span>电子健康记录 (EHR) 系统</span>
                {ehrIntegration ? (
                  <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="ml-2 h-4 w-4 text-amber-500" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ehr-toggle">启用集成</Label>
                  <p className="text-sm text-muted-foreground">与电子健康记录系统建立连接</p>
                </div>
                <Switch id="ehr-toggle" checked={ehrIntegration} onCheckedChange={setEhrIntegration} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ehr-api-key">API 密钥</Label>
                <Input
                  id="ehr-api-key"
                  value={ehrApiKey}
                  onChange={(e) => setEhrApiKey(e.target.value)}
                  type="password"
                  disabled={!ehrIntegration}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ehr-endpoint">API 端点</Label>
                <Input
                  id="ehr-endpoint"
                  value={ehrEndpoint}
                  onChange={(e) => setEhrEndpoint(e.target.value)}
                  disabled={!ehrIntegration}
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline" disabled={!ehrIntegration}>
                  测试连接
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="lab">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <span>实验室系统</span>
                {labIntegration ? (
                  <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="ml-2 h-4 w-4 text-amber-500" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lab-toggle">启用集成</Label>
                  <p className="text-sm text-muted-foreground">与实验室信息系统建立连接</p>
                </div>
                <Switch id="lab-toggle" checked={labIntegration} onCheckedChange={setLabIntegration} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lab-api-key">API 密钥</Label>
                <Input
                  id="lab-api-key"
                  value={labApiKey}
                  onChange={(e) => setLabApiKey(e.target.value)}
                  type="password"
                  disabled={!labIntegration}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lab-endpoint">API 端点</Label>
                <Input
                  id="lab-endpoint"
                  value={labEndpoint}
                  onChange={(e) => setLabEndpoint(e.target.value)}
                  disabled={!labIntegration}
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline" disabled={!labIntegration}>
                  测试连接
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="messaging">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                <span>消息通知系统</span>
                {messagingIntegration ? (
                  <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="ml-2 h-4 w-4 text-amber-500" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="messaging-toggle">启用集成</Label>
                  <p className="text-sm text-muted-foreground">与短信、电子邮件等通知系统建立连接</p>
                </div>
                <Switch
                  id="messaging-toggle"
                  checked={messagingIntegration}
                  onCheckedChange={setMessagingIntegration}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="messaging-api-key">API 密钥</Label>
                <Input
                  id="messaging-api-key"
                  value={messagingApiKey}
                  onChange={(e) => setMessagingApiKey(e.target.value)}
                  type="password"
                  disabled={!messagingIntegration}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="messaging-endpoint">API 端点</Label>
                <Input
                  id="messaging-endpoint"
                  value={messagingEndpoint}
                  onChange={(e) => setMessagingEndpoint(e.target.value)}
                  disabled={!messagingIntegration}
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline" disabled={!messagingIntegration}>
                  测试连接
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reporting">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                <span>报告系统</span>
                {reportingIntegration ? (
                  <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="ml-2 h-4 w-4 text-amber-500" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reporting-toggle">启用集成</Label>
                  <p className="text-sm text-muted-foreground">与医疗报告和分析系统建立连接</p>
                </div>
                <Switch
                  id="reporting-toggle"
                  checked={reportingIntegration}
                  onCheckedChange={setReportingIntegration}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporting-api-key">API 密钥</Label>
                <Input
                  id="reporting-api-key"
                  value={reportingApiKey}
                  onChange={(e) => setReportingApiKey(e.target.value)}
                  type="password"
                  disabled={!reportingIntegration}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporting-endpoint">API 端点</Label>
                <Input
                  id="reporting-endpoint"
                  value={reportingEndpoint}
                  onChange={(e) => setReportingEndpoint(e.target.value)}
                  disabled={!reportingIntegration}
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline" disabled={!reportingIntegration}>
                  测试连接
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>保存所有集成设置</Button>
        </div>
      </CardContent>
    </Card>
  )
}
