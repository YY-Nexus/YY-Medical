"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Activity, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AIModelClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-medical-600" />
        <div>
          <h1 className="text-2xl font-bold">智能诊断系统</h1>
          <p className="text-gray-500">基于深度学习的医疗影像分析和诊断辅助系统</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="models">模型管理</TabsTrigger>
          <TabsTrigger value="performance">性能分析</TabsTrigger>
          <TabsTrigger value="deployment">模型部署</TabsTrigger>
          <TabsTrigger value="integration">系统集成</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>系统概览</CardTitle>
              <CardDescription>AI诊断系统的整体状态和性能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-medical-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-medical-600" />
                    <h3 className="font-medium">活跃模型</h3>
                  </div>
                  <p className="text-2xl font-bold text-medical-700">12</p>
                </div>

                <div className="bg-medical-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-medical-600" />
                    <h3 className="font-medium">本月诊断次数</h3>
                  </div>
                  <p className="text-2xl font-bold text-medical-700">2,847</p>
                </div>

                <div className="bg-medical-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart className="h-5 w-5 text-medical-600" />
                    <h3 className="font-medium">平均准确率</h3>
                  </div>
                  <p className="text-2xl font-bold text-medical-700">92.7%</p>
                </div>

                <div className="bg-medical-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-medical-600" />
                    <h3 className="font-medium">平均响应时间</h3>
                  </div>
                  <p className="text-2xl font-bold text-medical-700">1.8s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>模型管理</CardTitle>
              <CardDescription>管理和部署AI诊断模型</CardDescription>
            </CardHeader>
            <CardContent>
              <p>模型管理功能正在加载中...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>性能分析</CardTitle>
              <CardDescription>分析AI诊断模型的性能指标</CardDescription>
            </CardHeader>
            <CardContent>
              <p>性能分析功能正在加载中...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>模型部署</CardTitle>
              <CardDescription>管理AI诊断模型的部署环境和版本</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Button asChild className="bg-medical-600 hover:bg-medical-700">
                  <a href="/ai-model/deployment">进入模型部署管理</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>系统集成</CardTitle>
              <CardDescription>管理AI诊断系统与其他医疗系统的集成</CardDescription>
            </CardHeader>
            <CardContent>
              <p>系统集成功能正在加载中...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
