"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PredictionModels } from "@/components/analytics/prediction-models"
import { PredictionTool } from "@/components/analytics/prediction-tool"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, Play, Save, Share } from "lucide-react"

export default function PredictionModelsClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("disease")
  const [modelType, setModelType] = useState("regression")
  const [showPredictionTool, setShowPredictionTool] = useState(false)

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

  if (showPredictionTool) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">预测工具</h2>
          <Button variant="outline" onClick={() => setShowPredictionTool(false)}>
            返回模型列表
          </Button>
        </div>
        <PredictionTool category={activeTab} modelType={modelType} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="disease">疾病预测</TabsTrigger>
            <TabsTrigger value="readmission">再入院预测</TabsTrigger>
            <TabsTrigger value="outcome">结果预测</TabsTrigger>
            <TabsTrigger value="resource">资源预测</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="模型类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regression">回归模型</SelectItem>
              <SelectItem value="classification">分类模型</SelectItem>
              <SelectItem value="timeseries">时间序列</SelectItem>
              <SelectItem value="deeplearning">深度学习</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => setShowPredictionTool(true)}>
            <Play className="mr-2 h-4 w-4" />
            运行预测
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>预测模型</CardTitle>
            <CardDescription>
              {activeTab === "disease" && "疾病风险和发展趋势预测"}
              {activeTab === "readmission" && "患者再入院风险预测"}
              {activeTab === "outcome" && "治疗结果和效果预测"}
              {activeTab === "resource" && "医疗资源需求预测"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Save className="h-4 w-4" />
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
          <PredictionModels category={activeTab} modelType={modelType} />
        </CardContent>
      </Card>
    </div>
  )
}
