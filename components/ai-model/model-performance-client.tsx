"use client"

import { useState } from "react"
import { ModelPerformance } from "./model-performance"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function ModelPerformanceClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">AI模型性能分析</CardTitle>
              <CardDescription>全面分析和评估AI诊断模型的性能指标</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">导出报告</Button>
              <Button>刷新数据</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">性能概览</TabsTrigger>
              <TabsTrigger value="detailed">详细分析</TabsTrigger>
              <TabsTrigger value="comparison">模型比较</TabsTrigger>
              <TabsTrigger value="history">历史趋势</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ModelPerformance />
            </TabsContent>

            <TabsContent value="detailed">
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">详细分析内容将在此处显示</p>
              </div>
            </TabsContent>

            <TabsContent value="comparison">
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">模型比较内容将在此处显示</p>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">历史趋势内容将在此处显示</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
