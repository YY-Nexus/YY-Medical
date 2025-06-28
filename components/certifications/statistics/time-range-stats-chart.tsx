"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function TimeRangeStatsChart() {
  const [metricType, setMetricType] = useState("volume")
  const [chartType, setChartType] = useState("line")

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>时间趋势分析</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={metricType} onValueChange={setMetricType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="选择指标" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume">认证量</SelectItem>
              <SelectItem value="success-rate">成功率</SelectItem>
              <SelectItem value="processing-time">处理时间</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="图表类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">折线图</SelectItem>
              <SelectItem value="bar">柱状图</SelectItem>
              <SelectItem value="area">面积图</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">时间趋势分析图表</p>
            <p className="text-xs text-muted-foreground mt-1">
              {metricType === "volume" && "显示不同时间段的认证请求量"}
              {metricType === "success-rate" && "显示不同时间段的认证成功率"}
              {metricType === "processing-time" && "显示不同时间段的平均处理时间"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              图表类型: {chartType === "line" ? "折线图" : chartType === "bar" ? "柱状图" : "面积图"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              日
            </Button>
            <Button variant="outline" size="sm">
              周
            </Button>
            <Button variant="secondary" size="sm">
              月
            </Button>
            <Button variant="outline" size="sm">
              季
            </Button>
            <Button variant="outline" size="sm">
              年
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <span>当前显示: 最近12个月</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>图表说明：此图表显示认证相关指标随时间的变化趋势，帮助您了解系统性能和使用情况的变化。</p>
        </div>
      </CardContent>
    </Card>
  )
}
