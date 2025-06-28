"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiUsageChart() {
  const [timeRange, setTimeRange] = useState("week")

  // 模拟数据
  const endpoints = [
    { name: "/api/certifications/verify", calls: 12450, percentage: 42 },
    { name: "/api/certifications/status", calls: 8320, percentage: 28 },
    { name: "/api/certifications/list", calls: 4680, percentage: 16 },
    { name: "/api/certifications/update", calls: 2340, percentage: 8 },
    { name: "/api/certifications/delete", calls: 1170, percentage: 4 },
    { name: "其他API端点", calls: 590, percentage: 2 },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>API使用统计</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">今日</SelectItem>
            <SelectItem value="week">本周</SelectItem>
            <SelectItem value="month">本月</SelectItem>
            <SelectItem value="year">本年</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="endpoints">端点使用</TabsTrigger>
            <TabsTrigger value="traffic">流量分析</TabsTrigger>
            <TabsTrigger value="errors">错误率</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="pt-4">
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate max-w-[70%]" title={endpoint.name}>
                      {endpoint.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {endpoint.calls.toLocaleString()} 调用 ({endpoint.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${endpoint.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">API流量分析图表</p>
                <p className="text-xs text-muted-foreground mt-1">显示API调用流量随时间的变化</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="errors" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">API错误率图表</p>
                <p className="text-xs text-muted-foreground mt-1">显示各API端点的错误率统计</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>图表说明：此图表显示API使用情况，包括各端点的调用次数、流量分析和错误率统计。</p>
        </div>
      </CardContent>
    </Card>
  )
}
