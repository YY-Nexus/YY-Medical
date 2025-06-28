"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Download,
  Calendar,
  RefreshCw,
  Filter,
  ChevronDown,
} from "lucide-react"

export function ModelPerformance() {
  const [selectedModel, setSelectedModel] = useState("all")
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("accuracy")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">模型性能分析</CardTitle>
              <CardDescription>分析AI诊断模型的性能指标</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有模型</SelectItem>
                  <SelectItem value="lung-ct">肺部CT分析模型</SelectItem>
                  <SelectItem value="ecg">心电图异常检测</SelectItem>
                  <SelectItem value="skin">皮肤病变分类</SelectItem>
                  <SelectItem value="pathology">病理切片分析</SelectItem>
                  <SelectItem value="nlp">医学文本分析</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">过去7天</SelectItem>
                  <SelectItem value="30d">过去30天</SelectItem>
                  <SelectItem value="90d">过去90天</SelectItem>
                  <SelectItem value="1y">过去1年</SelectItem>
                  <SelectItem value="custom">自定义范围</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="accuracy" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                准确率
              </TabsTrigger>
              <TabsTrigger value="response" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                响应时间
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                使用情况
              </TabsTrigger>
              <TabsTrigger value="errors" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                错误分析
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accuracy" className="space-y-6">
              {/* 准确率概览卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <CardTitle className="text-sm font-medium text-gray-500">最高准确率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">96.5%</div>
                      <div className="text-sm text-gray-500">肺部CT分析模型</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">最低准确率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">87.2%</div>
                      <div className="text-sm text-gray-500">医学文本分析</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 准确率图表 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>准确率趋势</CardTitle>
                      <CardDescription>模型准确率随时间的变化</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        筛选
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        导出
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">准确率趋势图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 模型比较 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>模型准确率比较</CardTitle>
                      <CardDescription>各模型准确率对比</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                      详细比较
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">模型比较图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="response" className="space-y-6">
              {/* 响应时间概览卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">平均响应时间</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">1.8s</div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        -0.3s
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">最快响应时间</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">0.9s</div>
                      <div className="text-sm text-gray-500">医学文本分析</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">最慢响应时间</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">3.2s</div>
                      <div className="text-sm text-gray-500">病理切片分析</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 响应时间图表 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>响应时间趋势</CardTitle>
                      <CardDescription>模型响应时间随时间的变化</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        日期范围
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        刷新
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">响应时间趋势图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              {/* 使用情况概览卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">总调用次数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">28,547</div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        +12.5%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">日均调用</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">952</div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        +8.3%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">最常用模型</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-bold text-medical-700">肺部CT分析模型</div>
                      <Badge variant="outline">42% 使用率</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 使用情况图表 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>使用情况趋势</CardTitle>
                      <CardDescription>模型调用次数随时间的变化</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        筛选
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        导出
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">使用情况趋势图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 模型使用分布 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>模型使用分布</CardTitle>
                      <CardDescription>各模型使用情况对比</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                      详细分析
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">模型使用分布图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-6">
              {/* 错误分析概览卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">错误率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">2.3%</div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        -0.5%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">总错误次数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">657</div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        -12%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">最常见错误类型</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-bold text-medical-700">假阴性</div>
                      <Badge variant="outline">38% 占比</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 错误分析图表 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>错误趋势</CardTitle>
                      <CardDescription>模型错误率随时间的变化</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        筛选
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        导出
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">错误趋势图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 错误类型分布 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>错误类型分布</CardTitle>
                      <CardDescription>各类型错误占比</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                      详细分析
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">错误类型分布图表将在此处显示</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
