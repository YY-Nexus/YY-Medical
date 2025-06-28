"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Database,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3,
  RefreshCw,
} from "lucide-react"
import {
  systemMonitoringService,
  type SystemMetrics,
  type SystemAlert,
  type AlertRule,
} from "@/services/enhanced-system-monitoring"

export function EnhancedSystemMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [alertRules, setAlertRules] = useState<AlertRule[]>([])
  const [healthReport, setHealthReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    loadData()

    if (autoRefresh) {
      const interval = setInterval(loadData, 30000) // 30秒刷新
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const loadData = async () => {
    try {
      const [metricsData, alertsData, rulesData, reportData] = await Promise.all([
        systemMonitoringService.getSystemMetrics(),
        systemMonitoringService.getSystemAlerts("active"),
        systemMonitoringService.getAlertRules(),
        systemMonitoringService.generateSystemHealthReport(),
      ])

      setMetrics(metricsData)
      setAlerts(alertsData)
      setAlertRules(rulesData)
      setHealthReport(reportData)
    } catch (error) {
      console.error("加载监控数据失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      await systemMonitoringService.acknowledgeAlert(alertId, "current-user")
      loadData()
    } catch (error) {
      console.error("确认告警失败:", error)
    }
  }

  const handleResolveAlert = async (alertId: string) => {
    try {
      await systemMonitoringService.resolveAlert(alertId)
      loadData()
    } catch (error) {
      console.error("解决告警失败:", error)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      case "critical":
        return "destructive"
      default:
        return "default"
    }
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (isLoading || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>加载监控数据中...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">系统监控</h1>
          <p className="text-muted-foreground">实时系统性能监控和告警管理</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={autoRefresh ? "default" : "outline"} size="sm" onClick={() => setAutoRefresh(!autoRefresh)}>
            <Activity className="h-4 w-4 mr-2" />
            {autoRefresh ? "自动刷新" : "手动刷新"}
          </Button>
          <Button size="sm" onClick={loadData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            立即刷新
          </Button>
        </div>
      </div>

      {/* 系统健康概览 */}
      {healthReport && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              系统健康状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getHealthStatusColor(healthReport.overallHealth)}`}>
                  {healthReport.overallHealth === "good" && "良好"}
                  {healthReport.overallHealth === "warning" && "警告"}
                  {healthReport.overallHealth === "critical" && "严重"}
                </div>
                <p className="text-sm text-muted-foreground">整体状态</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">{healthReport.activeAlerts.length}</div>
                <p className="text-sm text-muted-foreground">活跃告警</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{healthReport.metrics.application.activeUsers}</div>
                <p className="text-sm text-muted-foreground">在线用户</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">
                  {healthReport.metrics.application.requestsPerSecond}
                </div>
                <p className="text-sm text-muted-foreground">请求/秒</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">系统指标</TabsTrigger>
          <TabsTrigger value="alerts">告警管理</TabsTrigger>
          <TabsTrigger value="rules">告警规则</TabsTrigger>
          <TabsTrigger value="performance">性能分析</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* CPU 监控 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Cpu className="h-4 w-4" />
                  CPU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>使用率</span>
                    <span>{metrics.cpu.usage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.cpu.usage} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">核心数</span>
                    <p className="font-medium">{metrics.cpu.cores}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">温度</span>
                    <p className="font-medium">{metrics.cpu.temperature?.toFixed(1)}°C</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 内存监控 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MemoryStick className="h-4 w-4" />
                  内存
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>使用率</span>
                    <span>{metrics.memory.usage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.memory.usage} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">已用</span>
                    <p className="font-medium">{metrics.memory.used.toFixed(1)} GB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">总计</span>
                    <p className="font-medium">{metrics.memory.total} GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 磁盘监控 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HardDrive className="h-4 w-4" />
                  磁盘
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>使用率</span>
                    <span>{metrics.disk.usage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.disk.usage} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">已用</span>
                    <p className="font-medium">{metrics.disk.used} GB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">IOPS</span>
                    <p className="font-medium">{metrics.disk.iops}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 网络监控 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Network className="h-4 w-4" />
                  网络
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">入站</span>
                    <p className="font-medium">{formatBytes(metrics.network.bytesIn)}/s</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">出站</span>
                    <p className="font-medium">{formatBytes(metrics.network.bytesOut)}/s</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">延迟</span>
                    <p className="font-medium">{metrics.network.latency?.toFixed(1)}ms</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">包数</span>
                    <p className="font-medium">{metrics.network.packetsIn + metrics.network.packetsOut}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 数据库监控 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4" />
                  数据库
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>连接数</span>
                    <span>
                      {metrics.database.connections}/{metrics.database.maxConnections}
                    </span>
                  </div>
                  <Progress value={(metrics.database.connections / metrics.database.maxConnections) * 100} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">查询时间</span>
                    <p className="font-medium">{metrics.database.queryTime.toFixed(1)}ms</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">锁等待</span>
                    <p className="font-medium">{metrics.database.lockWaits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 应用监控 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  应用
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">活跃用户</span>
                    <p className="font-medium">{metrics.application.activeUsers}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">请求/秒</span>
                    <p className="font-medium">{metrics.application.requestsPerSecond}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">错误率</span>
                    <p className="font-medium">{metrics.application.errorRate.toFixed(2)}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">响应时间</span>
                    <p className="font-medium">{metrics.application.responseTime.toFixed(1)}ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">活跃告警</h3>
            <Badge variant="destructive">{alerts.length} 个告警</Badge>
          </div>

          {alerts.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">系统运行正常</h3>
                  <p className="text-muted-foreground">当前没有活跃的告警</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">{alert.ruleName}</h4>
                          <Badge variant={getSeverityColor(alert.severity)}>
                            {alert.severity === "low" && "低"}
                            {alert.severity === "medium" && "中"}
                            {alert.severity === "high" && "高"}
                            {alert.severity === "critical" && "严重"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>当前值: {alert.value.toFixed(2)}</span>
                          <span>阈值: {alert.threshold}</span>
                          <span>时间: {new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {alert.status === "active" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleAcknowledgeAlert(alert.id)}>
                              确认
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                              解决
                            </Button>
                          </>
                        )}
                        <Badge variant="outline">
                          {alert.status === "active" && "活跃"}
                          {alert.status === "acknowledged" && "已确认"}
                          {alert.status === "resolved" && "已解决"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">告警规则</h3>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              新建规则
            </Button>
          </div>

          <div className="space-y-4">
            {alertRules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant={rule.enabled ? "default" : "secondary"}>{rule.enabled ? "启用" : "禁用"}</Badge>
                        <Badge variant={getSeverityColor(rule.severity)}>
                          {rule.severity === "low" && "低"}
                          {rule.severity === "medium" && "中"}
                          {rule.severity === "high" && "高"}
                          {rule.severity === "critical" && "严重"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>指标: {rule.metric}</span>
                        <span>
                          条件: {rule.condition} {rule.threshold}
                        </span>
                        <span>冷却期: {rule.cooldown}分钟</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {rule.notifications.email.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            邮件({rule.notifications.email.length})
                          </Badge>
                        )}
                        {rule.notifications.sms.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            短信({rule.notifications.sms.length})
                          </Badge>
                        )}
                        {rule.notifications.webhook && (
                          <Badge variant="outline" className="text-xs">
                            Webhook
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        编辑
                      </Button>
                      <Button size="sm" variant="outline">
                        {rule.enabled ? "禁用" : "启用"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {healthReport && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    性能分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthReport.performanceSummary.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.metric}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">当前: {item.current.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">基线: {item.baseline.toFixed(2)}</span>
                          <Badge variant={Math.abs(item.deviation) > 30 ? "destructive" : "default"}>
                            {item.deviation > 0 ? "+" : ""}
                            {item.deviation.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={Math.min(100, (item.current / (item.baseline * 2)) * 100)} className="mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {Math.abs(item.deviation) > 30 ? "性能偏离基线较大，建议关注" : "性能表现正常"}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
