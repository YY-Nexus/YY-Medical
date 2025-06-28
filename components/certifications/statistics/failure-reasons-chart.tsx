"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function FailureReasonsChart() {
  const [timeRange, setTimeRange] = useState("month")

  // 模拟数据
  const failureReasons = [
    { reason: "文档不完整", percentage: 35 },
    { reason: "信息不匹配", percentage: 28 },
    { reason: "过期证书", percentage: 18 },
    { reason: "图像质量差", percentage: 12 },
    { reason: "其他原因", percentage: 7 },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>认证失败原因分析</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">本周</SelectItem>
            <SelectItem value="month">本月</SelectItem>
            <SelectItem value="quarter">本季度</SelectItem>
            <SelectItem value="year">本年度</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {failureReasons.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.reason}</span>
                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>图表说明：此图表显示认证失败的主要原因及其分布情况，帮助您了解需要改进的方面。</p>
        </div>
      </CardContent>
    </Card>
  )
}
