"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { TrendReports } from "@/components/analytics/trend-reports"
import { DateRangePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, Share } from "lucide-react"

export default function TrendReportsClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("patients")
  const [dateRange, setDateRange] = useState({ from: new Date(2025, 0, 1), to: new Date() })
  const [interval, setInterval] = useState("monthly")

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="patients">患者数据</TabsTrigger>
            <TabsTrigger value="diagnoses">诊断结果</TabsTrigger>
            <TabsTrigger value="treatments">治疗方案</TabsTrigger>
            <TabsTrigger value="outcomes">治疗效果</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />

          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="时间间隔" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">每日</SelectItem>
              <SelectItem value="weekly">每周</SelectItem>
              <SelectItem value="monthly">每月</SelectItem>
              <SelectItem value="quarterly">每季度</SelectItem>
              <SelectItem value="yearly">每年</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>趋势分析报告</CardTitle>
            <CardDescription>
              {activeTab === "patients" && "患者数量、分布和增长趋势"}
              {activeTab === "diagnoses" && "诊断类型和准确率趋势"}
              {activeTab === "treatments" && "治疗方案采用率和效果趋势"}
              {activeTab === "outcomes" && "治疗结果和患者恢复趋势"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TrendReports category={activeTab} dateRange={dateRange} interval={interval} />
        </CardContent>
      </Card>
    </div>
  )
}
