"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { CalendarIcon, Download, Loader2 } from "lucide-react"
import { verificationStatisticsService } from "@/services/verification-statistics-service"
import type { VerificationStatistics } from "@/types/verification-statistics"
import { OverviewStats } from "./overview-stats"
import { ProviderComparisonChart } from "./provider-comparison-chart"
import { ResultDistributionChart } from "./result-distribution-chart"
import { FailureReasonsChart } from "./failure-reasons-chart"
import { CertificationTypesChart } from "./certification-types-chart"
import { TimeRangeStatsChart } from "./time-range-stats-chart"
import { ApiUsageChart } from "./api-usage-chart"

export function VerificationStatisticsClient() {
  const [loading, setLoading] = useState(true)
  const [statistics, setStatistics] = useState<VerificationStatistics | null>(null)
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "custom">("30days")
  const [providerId, setProviderId] = useState<string>("")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  useEffect(() => {
    loadStatistics()
  }, [timeRange, providerId])

  const loadStatistics = async () => {
    setLoading(true)
    try {
      let start: string
      let end = new Date().toISOString()

      switch (timeRange) {
        case "7days":
          start = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
          break
        case "90days":
          start = new Date(new Date().setDate(new Date().getDate() - 90)).toISOString()
          break
        case "custom":
          start = dateRange.from.toISOString()
          end = dateRange.to.toISOString()
          break
        default: // 30days
          start = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
      }

      const stats = await verificationStatisticsService.getStatistics({ start, end }, providerId || undefined)
      setStatistics(stats)
    } catch (error) {
      console.error("加载统计数据失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    if (!statistics) return

    // 创建CSV内容
    let csv = "数据类别,指标,值\n"

    // 添加概览数据
    csv += `概览,总验证次数,${statistics.overview.totalVerifications}\n`
    csv += `概览,成功率,${(statistics.overview.successRate * 100).toFixed(2)}%\n`
    csv += `概览,平均响应时间,${statistics.overview.averageResponseTime.toFixed(2)}秒\n`
    csv += `概览,总费用,${statistics.overview.totalCost.toFixed(2)}元\n`
    csv += `概览,活跃验证机构数,${statistics.overview.activeProviders}\n\n`

    // 添加验证机构数据
    csv += "验证机构,总验证次数,成功次数,失败次数,待处理次数,成功率,平均响应时间,总费用,最后使用时间\n"
    statistics.providerStats.forEach((provider) => {
      csv += `${provider.providerName},${provider.totalVerifications},${provider.successCount},${provider.failedCount},${provider.pendingCount},${(provider.successRate * 100).toFixed(2)}%,${provider.averageResponseTime.toFixed(2)}秒,${provider.costTotal.toFixed(2)}元,${new Date(provider.lastUsed).toLocaleString("zh-CN")}\n`
    })
    csv += "\n"

    // 添加结果分布
    csv += "结果分布,数量,百分比\n"
    statistics.resultDistribution.forEach((result) => {
      csv += `${result.label},${result.value},${(result.percentage * 100).toFixed(2)}%\n`
    })
    csv += "\n"

    // 添加失败原因
    csv += "失败原因,数量,百分比\n"
    statistics.failureReasons.forEach((reason) => {
      csv += `${reason.reason},${reason.count},${(reason.percentage * 100).toFixed(2)}%\n`
    })

    // 创建Blob并下载
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `验证统计数据_${format(new Date(), "yyyy-MM-dd")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>验证统计数据</CardTitle>
              <CardDescription>
                {timeRange === "custom"
                  ? `${format(dateRange.from, "yyyy年MM月dd日", { locale: zhCN })} 至 ${format(dateRange.to, "yyyy年MM月dd日", { locale: zhCN })}`
                  : timeRange === "7days"
                    ? "最近7天"
                    : timeRange === "90days"
                      ? "最近90天"
                      : "最近30天"}
                {providerId && " · 已筛选验证机构"}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={timeRange}
                onValueChange={(value: "7days" | "30days" | "90days" | "custom") => setTimeRange(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">最近7天</SelectItem>
                  <SelectItem value="30days">最近30天</SelectItem>
                  <SelectItem value="90days">最近90天</SelectItem>
                  <SelectItem value="custom">自定义范围</SelectItem>
                </SelectContent>
              </Select>

              {timeRange === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "yyyy年MM月dd日", { locale: zhCN })} -{" "}
                            {format(dateRange.to, "yyyy年MM月dd日", { locale: zhCN })}
                          </>
                        ) : (
                          format(dateRange.from, "yyyy年MM月dd日", { locale: zhCN })
                        )
                      ) : (
                        <span>选择日期范围</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange(range as { from: Date; to: Date })
                          loadStatistics()
                        }
                      }}
                      locale={zhCN}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              )}

              <Select value={providerId} onValueChange={setProviderId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="所有验证机构" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">所有验证机构</SelectItem>
                  {statistics?.providerStats.map((provider) => (
                    <SelectItem key={provider.providerId} value={provider.providerId}>
                      {provider.providerName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleExport} disabled={!statistics || loading}>
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : statistics ? (
            <div className="space-y-8">
              <OverviewStats statistics={statistics} />

              <Tabs defaultValue="comparison" className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                  <TabsTrigger value="comparison">验证机构对比</TabsTrigger>
                  <TabsTrigger value="results">结果分布</TabsTrigger>
                  <TabsTrigger value="failures">失败原因</TabsTrigger>
                  <TabsTrigger value="types">证书类型</TabsTrigger>
                  <TabsTrigger value="trends">时间趋势</TabsTrigger>
                  <TabsTrigger value="api-usage">API使用量</TabsTrigger>
                </TabsList>

                <TabsContent value="comparison" className="space-y-4">
                  <ProviderComparisonChart providerStats={statistics.providerStats} />
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                  <ResultDistributionChart resultDistribution={statistics.resultDistribution} />
                </TabsContent>

                <TabsContent value="failures" className="space-y-4">
                  <FailureReasonsChart failureReasons={statistics.failureReasons} />
                </TabsContent>

                <TabsContent value="types" className="space-y-4">
                  <CertificationTypesChart certificationTypes={statistics.certificationTypes} />
                </TabsContent>

                <TabsContent value="trends" className="space-y-4">
                  <TimeRangeStatsChart timeRangeStats={statistics.timeRangeStats} />
                </TabsContent>

                <TabsContent value="api-usage" className="space-y-4">
                  <ApiUsageChart apiUsageData={statistics.apiUsageTrend} />
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">无法加载统计数据</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
