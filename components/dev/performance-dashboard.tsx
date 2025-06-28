"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  usePerformanceMonitor,
  type PerformanceMetric,
  type CustomEvent,
} from "@/services/performance-monitoring-service"
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Play, Pause, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PerformanceDashboard() {
  const { report, trackEvent, clearData } = usePerformanceMonitor({
    collectInterval: 2000,
    trackResourceTiming: true,
    trackUserTiming: true,
    trackLongTasks: true,
    trackMemory: true,
  })

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [activeTab, setActiveTab] = useState("metrics")
  const [metricsData, setMetricsData] = useState<Record<string, any[]>>({})
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [eventsFiltered, setEventsFiltered] = useState<CustomEvent[]>([])
  const [filterText, setFilterText] = useState("")

  // 处理指标数据
  useEffect(() => {
    if (!report) return

    // 按指标名称分组
    const groupedMetrics: Record<string, PerformanceMetric[]> = {}
    report.metrics.forEach((metric) => {
      if (!groupedMetrics[metric.name]) {
        groupedMetrics[metric.name] = []
      }
      groupedMetrics[metric.name].push(metric)
    })

    // 转换为图表数据格式
    const chartData: Record<string, any[]> = {}
    Object.entries(groupedMetrics).forEach(([name, metrics]) => {
      chartData[name] = metrics.map((m) => ({
        timestamp: new Date(m.timestamp).toLocaleTimeString(),
        value: m.value,
        unit: m.unit,
      }))
    })

    setMetricsData(chartData)

    // 如果没有选择的指标，默认选择前5个
    if (selectedMetrics.length === 0 && Object.keys(chartData).length > 0) {
      setSelectedMetrics(Object.keys(chartData).slice(0, 5))
    }

    // 过滤事件
    if (report.events.length > 0) {
      const filtered = filterText
        ? report.events.filter(
            (e) =>
              e.name.toLowerCase().includes(filterText.toLowerCase()) ||
              JSON.stringify(e.data).toLowerCase().includes(filterText.toLowerCase()),
          )
        : report.events
      setEventsFiltered(filtered)
    }
  }, [report, filterText])

  // 切换监控状态
  const toggleMonitoring = () => {
    if (isMonitoring) {
      // 暂停监控
      setIsMonitoring(false)
      trackEvent("性能监控暂停", { timestamp: Date.now() })
    } else {
      // 恢复监控
      setIsMonitoring(true)
      trackEvent("性能监控恢复", { timestamp: Date.now() })
    }
  }

  // 清除数据
  const handleClearData = () => {
    clearData()
    trackEvent("性能数据已清除", { timestamp: Date.now() })
  }

  // 下载报告
  const downloadReport = () => {
    if (!report) return

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `performance-report-${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    trackEvent("性能报告下载", { timestamp: Date.now() })
  }

  // 切换指标选择
  const toggleMetric = (metricName: string) => {
    if (selectedMetrics.includes(metricName)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metricName))
    } else {
      setSelectedMetrics([...selectedMetrics, metricName])
    }
  }

  // 模拟长任务
  const simulateLongTask = () => {
    trackEvent("模拟长任务开始", { timestamp: Date.now() })
    const startTime = performance.now()

    // 执行耗时操作
    const arr = new Array(10000000).fill(0)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.sqrt(i)
    }

    const duration = performance.now() - startTime
    trackEvent("模拟长任务结束", {
      timestamp: Date.now(),
      duration: duration,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">性能监控仪表板</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={toggleMonitoring}>
            {isMonitoring ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isMonitoring ? "暂停" : "恢复"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearData}>
            <X className="h-4 w-4 mr-1" />
            清除数据
          </Button>
          <Button variant="outline" size="sm" onClick={downloadReport} disabled={!report}>
            <Download className="h-4 w-4 mr-1" />
            下载报告
          </Button>
          <Button variant="outline" size="sm" onClick={simulateLongTask}>
            <RefreshCw className="h-4 w-4 mr-1" />
            模拟长任务
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="metrics">性能指标</TabsTrigger>
          <TabsTrigger value="events">事件跟踪</TabsTrigger>
          <TabsTrigger value="resources">资源加载</TabsTrigger>
          <TabsTrigger value="navigation">导航计时</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>性能指标趋势</CardTitle>
              <CardDescription>监控关键性能指标随时间的变化</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(metricsData).length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(metricsData).map((metricName) => (
                      <Badge
                        key={metricName}
                        variant={selectedMetrics.includes(metricName) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleMetric(metricName)}
                      >
                        {metricName}
                      </Badge>
                    ))}
                  </div>

                  <div className="h-80">
                    <ChartContainer
                      config={selectedMetrics.reduce(
                        (acc, metric, index) => {
                          acc[metric] = {
                            label: metric,
                            color: `hsl(var(--chart-${(index % 9) + 1}))`,
                          }
                          return acc
                        },
                        {} as Record<string, { label: string; color: string }>,
                      )}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timestamp" allowDuplicatedCategory={false} type="category" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />

                          {selectedMetrics.map((metricName, index) => (
                            <Line
                              key={metricName}
                              type="monotone"
                              dataKey="value"
                              data={metricsData[metricName] || []}
                              name={metricName}
                              stroke={`var(--color-${metricName})`}
                              activeDot={{ r: 8 }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-80 text-muted-foreground">暂无性能指标数据</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>事件跟踪</CardTitle>
              <CardDescription>监控用户交互和系统事件</CardDescription>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索事件..."
                  className="w-full px-3 py-2 border rounded-md"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {eventsFiltered.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>时间</TableHead>
                        <TableHead>事件名称</TableHead>
                        <TableHead>数据</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventsFiltered.map((event, index) => (
                        <TableRow key={index}>
                          <TableCell>{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
                          <TableCell>{event.name}</TableCell>
                          <TableCell>
                            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(event.data, null, 2)}</pre>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex justify-center items-center h-40 text-muted-foreground">暂无事件数据</div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>资源加载</CardTitle>
              <CardDescription>监控页面资源加载性能</CardDescription>
            </CardHeader>
            <CardContent>
              {report && report.resourceTiming.length > 0 ? (
                <>
                  <div className="h-80 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={report.resourceTiming.slice(0, 20).map((r) => ({
                          name: r.name.split("/").pop()?.substring(0, 15) || r.name,
                          duration: r.duration,
                          size: r.transferSize / 1024,
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="duration" name="加载时间 (ms)" fill="#8884d8" />
                        <Bar dataKey="size" name="大小 (KB)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <ScrollArea className="h-[300px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>资源名称</TableHead>
                          <TableHead>类型</TableHead>
                          <TableHead>大小 (KB)</TableHead>
                          <TableHead>加载时间 (ms)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.resourceTiming.map((resource, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-mono text-xs">
                              {resource.name.length > 50
                                ? `...${resource.name.substring(resource.name.length - 50)}`
                                : resource.name}
                            </TableCell>
                            <TableCell>{resource.initiatorType}</TableCell>
                            <TableCell>{(resource.transferSize / 1024).toFixed(2)}</TableCell>
                            <TableCell>{resource.duration.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex justify-center items-center h-80 text-muted-foreground">暂无资源加载数据</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation">
          <Card>
            <CardHeader>
              <CardTitle>导航计时</CardTitle>
              <CardDescription>页面加载和渲染性能指标</CardDescription>
            </CardHeader>
            <CardContent>
              {report && Object.keys(report.navigationTiming).length > 0 ? (
                <>
                  <div className="h-80 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.entries(report.navigationTiming).map(([key, value]) => ({
                          name: key,
                          value: value,
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="时间 (ms)" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>指标名称</TableHead>
                        <TableHead>值 (ms)</TableHead>
                        <TableHead>说明</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(report.navigationTiming).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{value.toFixed(2)}</TableCell>
                          <TableCell>{getNavigationMetricDescription(key)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <div className="flex justify-center items-center h-80 text-muted-foreground">暂无导航计时数据</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 导航指标描述
function getNavigationMetricDescription(metricName: string): string {
  const descriptions: Record<string, string> = {
    loadTime: "页面完全加载时间",
    domContentLoaded: "DOM内容加载完成时间",
    firstByte: "首字节时间 (TTFB)",
    domInteractive: "DOM可交互时间",
    domComplete: "DOM完成时间",
    redirectTime: "重定向时间",
    dnsLookup: "DNS查询时间",
    tcpConnection: "TCP连接时间",
    requestTime: "请求响应时间",
  }

  return descriptions[metricName] || "未知指标"
}
