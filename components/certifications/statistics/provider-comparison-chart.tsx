"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProviderComparisonChart() {
  const [timeRange, setTimeRange] = useState("month")
  const [metricType, setMetricType] = useState("success-rate")

  // 这里应该使用实际的图表库，如 recharts 或 Chart.js
  // 为了简化，我们使用模拟的图表展示

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>认证提供商比较</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={metricType} onValueChange={setMetricType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择指标" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="success-rate">成功率</SelectItem>
              <SelectItem value="processing-time">处理时间</SelectItem>
              <SelectItem value="cost-efficiency">成本效率</SelectItem>
              <SelectItem value="reliability">可靠性</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="week">周</TabsTrigger>
            <TabsTrigger value="month">月</TabsTrigger>
            <TabsTrigger value="quarter">季度</TabsTrigger>
            <TabsTrigger value="year">年</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">提供商比较图表 - 周数据</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metricType === "success-rate" && "显示各提供商的认证成功率"}
                  {metricType === "processing-time" && "显示各提供商的平均处理时间"}
                  {metricType === "cost-efficiency" && "显示各提供商的成本效率比较"}
                  {metricType === "reliability" && "显示各提供商的系统可靠性"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="month" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">提供商比较图表 - 月数据</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metricType === "success-rate" && "显示各提供商的认证成功率"}
                  {metricType === "processing-time" && "显示各提供商的平均处理时间"}
                  {metricType === "cost-efficiency" && "显示各提供商的成本效率比较"}
                  {metricType === "reliability" && "显示各提供商的系统可靠性"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quarter" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">提供商比较图表 - 季度数据</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metricType === "success-rate" && "显示各提供商的认证成功率"}
                  {metricType === "processing-time" && "显示各提供商的平均处理时间"}
                  {metricType === "cost-efficiency" && "显示各提供商的成本效率比较"}
                  {metricType === "reliability" && "显示各提供商的系统可靠性"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="year" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">提供商比较图表 - 年度数据</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metricType === "success-rate" && "显示各提供商的认证成功率"}
                  {metricType === "processing-time" && "显示各提供商的平均处理时间"}
                  {metricType === "cost-efficiency" && "显示各提供商的成本效率比较"}
                  {metricType === "reliability" && "显示各提供商的系统可靠性"}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>图表说明：此图表比较不同认证提供商的性能指标，帮助您选择最适合的服务提供商。</p>
        </div>
      </CardContent>
    </Card>
  )
}
