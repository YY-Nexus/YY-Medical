"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, Clock, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ModelData {
  id: string
  name: string
  version: string
  metrics?: {
    responseTime: string
    throughput: string
    errorRate: string
    lastIncident: string
  }
  alerts?: Array<{
    id: string
    type: string
    message: string
    severity: string
    date: string
  }>
  [key: string]: any
}

interface ModelMonitoringProps {
  model: ModelData
  onClose: () => void
}

// 模拟性能数据
const performanceData = [
  { time: "00:00", responseTime: 1.2, throughput: 40, errorRate: 0.5 },
  { time: "02:00", responseTime: 1.1, throughput: 35, errorRate: 0.4 },
  { time: "04:00", responseTime: 1.0, throughput: 30, errorRate: 0.3 },
  { time: "06:00", responseTime: 1.3, throughput: 45, errorRate: 0.6 },
  { time: "08:00", responseTime: 1.5, throughput: 60, errorRate: 0.8 },
  { time: "10:00", responseTime: 1.8, throughput: 70, errorRate: 1.0 },
  { time: "12:00", responseTime: 1.6, throughput: 65, errorRate: 0.7 },
  { time: "14:00", responseTime: 1.4, throughput: 55, errorRate: 0.5 },
  { time: "16:00", responseTime: 1.3, throughput: 50, errorRate: 0.4 },
  { time: "18:00", responseTime: 1.2, throughput: 45, errorRate: 0.3 },
  { time: "20:00", responseTime: 1.1, throughput: 40, errorRate: 0.2 },
  { time: "22:00", responseTime: 1.0, throughput: 35, errorRate: 0.1 },
]

// 模拟告警规则
const alertRules = [
  { id: "rule-1", name: "响应时间过高", metric: "responseTime", threshold: 2.0, enabled: true },
  { id: "rule-2", name: "错误率过高", metric: "errorRate", threshold: 1.0, enabled: true },
  { id: "rule-3", name: "吞吐量过低", metric: "throughput", threshold: 20, enabled: false },
]

export function ModelMonitoring({ model, onClose }: ModelMonitoringProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [alerts, setAlerts] = useState(model.alerts || [])
  const [rules, setRules] = useState(alertRules)
  const [isAddingRule, setIsAddingRule] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    metric: "responseTime",
    threshold: 2.0,
    enabled: true,
  })

  // 获取告警严重性徽章
  const getAlertSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 严重
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 警告
          </Badge>
        )
      case "info":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="h-3 w-3" /> 信息
          </Badge>
        )
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  // 解决告警
  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
    toast({
      title: "告警已解决",
      description: "告警已被标记为已解决",
    })
  }

  // 添加新告警规则
  const addAlertRule = () => {
    if (!newRule.name.trim()) {
      toast({
        title: "错误",
        description: "规则名称不能为空",
        variant: "destructive",
      })
      return
    }

    const newRuleObj = {
      id: `rule-${Date.now()}`,
      name: newRule.name,
      metric: newRule.metric,
      threshold: newRule.threshold,
      enabled: newRule.enabled,
    }

    setRules([...rules, newRuleObj])
    setIsAddingRule(false)
    setNewRule({
      name: "",
      metric: "responseTime",
      threshold: 2.0,
      enabled: true,
    })

    toast({
      title: "规则添加成功",
      description: `已添加新告警规则: ${newRule.name}`,
    })
  }

  // 切换规则启用状态
  const toggleRuleEnabled = (ruleId: string) => {
    setRules(rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-xl">{model.name} - 监控与告警</CardTitle>
            <CardDescription>监控模型性能并管理告警规则</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="alerts">告警 ({alerts.length})</TabsTrigger>
            <TabsTrigger value="rules">告警规则</TabsTrigger>
            <TabsTrigger value="performance">性能监控</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">响应时间</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{model.metrics?.responseTime || "N/A"}</div>
                  <p className="text-xs text-gray-500">平均响应时间</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">吞吐量</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{model.metrics?.throughput || "N/A"}</div>
                  <p className="text-xs text-gray-500">每分钟请求数</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">错误率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{model.metrics?.errorRate || "N/A"}</div>
                  <p className="text-xs text-gray-500">请求错误百分比</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">最近事件</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{model.metrics?.lastIncident || "无"}</div>
                  <p className="text-xs text-gray-500">上次告警时间</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">性能趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" name="响应时间 (秒)" />
                      <Line type="monotone" dataKey="errorRate" stroke="#ef4444" name="错误率 (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {alerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">活跃告警</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {alerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-amber-500" />
                          <div>
                            <div className="font-medium">{alert.message}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {alert.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getAlertSeverityBadge(alert.severity)}
                          <Button variant="outline" size="sm" onClick={() => resolveAlert(alert.id)}>
                            解决
                          </Button>
                        </div>
                      </div>
                    ))}

                    {alerts.length > 3 && (
                      <Button variant="link" className="text-sm" onClick={() => setActiveTab("alerts")}>
                        查看全部 {alerts.length} 个告警
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="mt-4">
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-amber-500" />
                          <CardTitle className="text-base">{alert.message}</CardTitle>
                        </div>
                        {getAlertSeverityBadge(alert.severity)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>发生时间: {alert.date}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">类型:</span> {alert.type}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 ml-auto">
                        <Button variant="outline" size="sm">
                          忽略
                        </Button>
                        <Button
                          size="sm"
                          className="bg-medical-600 hover:bg-medical-700"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          标记为已解决
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">没有活跃告警</h3>
                <p className="text-gray-500">当前模型运行正常，没有需要处理的告警</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rules" className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">告警规则</h3>
              <Button onClick={() => setIsAddingRule(true)}>添加规则</Button>
            </div>

            {isAddingRule && (
              <Card className="mb-4 border-medical-500">
                <CardHeader>
                  <CardTitle className="text-base">添加新告警规则</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rule-name">规则名称</Label>
                      <Input
                        id="rule-name"
                        placeholder="例如: 响应时间过高"
                        value={newRule.name}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rule-metric">监控指标</Label>
                      <Select
                        value={newRule.metric}
                        onValueChange={(value) => setNewRule({ ...newRule, metric: value })}
                      >
                        <SelectTrigger id="rule-metric">
                          <SelectValue placeholder="选择指标" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="responseTime">响应时间</SelectItem>
                          <SelectItem value="errorRate">错误率</SelectItem>
                          <SelectItem value="throughput">吞吐量</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="rule-threshold">阈值: {newRule.threshold}</Label>
                        <Input
                          type="number"
                          id="rule-threshold"
                          className="w-24"
                          value={newRule.threshold}
                          onChange={(e) => setNewRule({ ...newRule, threshold: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                      <Slider
                        id="rule-threshold-slider"
                        min={0}
                        max={newRule.metric === "errorRate" ? 5 : newRule.metric === "responseTime" ? 5 : 100}
                        step={newRule.metric === "errorRate" ? 0.1 : newRule.metric === "responseTime" ? 0.1 : 1}
                        value={[newRule.threshold]}
                        onValueChange={(value) => setNewRule({ ...newRule, threshold: value[0] })}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="rule-enabled"
                        checked={newRule.enabled}
                        onCheckedChange={(checked) => setNewRule({ ...newRule, enabled: checked })}
                      />
                      <Label htmlFor="rule-enabled">启用规则</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 ml-auto">
                    <Button variant="outline" onClick={() => setIsAddingRule(false)}>
                      取消
                    </Button>
                    <Button onClick={addAlertRule}>添加规则</Button>
                  </div>
                </CardFooter>
              </Card>
            )}

            <div className="space-y-4">
              {rules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{rule.name}</CardTitle>
                      <Switch checked={rule.enabled} onCheckedChange={() => toggleRuleEnabled(rule.id)} />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-500">监控指标</Label>
                        <div className="font-medium">
                          {rule.metric === "responseTime"
                            ? "响应时间"
                            : rule.metric === "errorRate"
                              ? "错误率"
                              : "吞吐量"}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">阈值</Label>
                        <div className="font-medium">
                          {rule.threshold}
                          {rule.metric === "responseTime" ? " 秒" : rule.metric === "errorRate" ? "%" : " 请求/分钟"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        删除
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">性能监控</CardTitle>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    刷新数据
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">响应时间 (秒)</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" name="响应时间 (秒)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">吞吐量 (请求/分钟)</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="throughput" stroke="#10b981" name="吞吐量 (请求/分钟)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">错误率 (%)</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="errorRate" stroke="#ef4444" name="错误率 (%)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onClose}>
          返回
        </Button>
      </CardFooter>
    </Card>
  )
}
