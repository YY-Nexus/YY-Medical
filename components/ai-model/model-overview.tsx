"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Activity, BarChart, Clock, CheckCircle, FileText, Users, Calendar } from "lucide-react"

export function ModelOverview() {
  return (
    <div className="space-y-6">
      {/* 状态概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">活跃模型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-medical-700">12</div>
              <Badge variant="success" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                全部在线
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">本月诊断次数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-medical-700">2,847</div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                +12.5%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">平均准确率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-medical-700">92.7%</div>
              <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                <Activity className="h-3 w-3" />
                +1.2%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-medical-700">1.8s</div>
              <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                <Clock className="h-3 w-3" />
                -0.3s
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 性能图表 */}
      <Card>
        <CardHeader>
          <CardTitle>系统性能</CardTitle>
          <CardDescription>过去30天的系统性能指标</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">性能图表将在此处显示</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 最近活动 */}
      <Card>
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
          <CardDescription>系统最近的诊断和更新活动</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diagnoses">
            <TabsList className="mb-4">
              <TabsTrigger value="diagnoses" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                诊断活动
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                系统更新
              </TabsTrigger>
            </TabsList>

            <TabsContent value="diagnoses" className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="bg-medical-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-medical-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">肺部CT影像分析</h4>
                      <Badge variant="outline">92% 置信度</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">检测到右肺上叶可疑结节，建议进一步检查</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>患者 #12458</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>今天 {10 - i}:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center mt-4">
                <Button variant="outline">查看更多活动</Button>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">模型更新完成</h4>
                      <Badge variant="outline">v2.{4 - i}.0</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">肺部CT分析模型已更新至最新版本，准确率提升2.3%</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{i}天前</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center mt-4">
                <Button variant="outline">查看更多更新</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
