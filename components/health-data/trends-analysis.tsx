"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart2, LineChart, PieChart, Activity, Calendar, Download, Filter, Share2 } from "lucide-react"

export function TrendsAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">健康数据趋势分析</h2>
          <p className="text-sm text-muted-foreground">分析患者健康数据的长期变化趋势和模式</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">近1个月</SelectItem>
              <SelectItem value="quarter">近3个月</SelectItem>
              <SelectItem value="halfyear">近6个月</SelectItem>
              <SelectItem value="year">近1年</SelectItem>
              <SelectItem value="all">所有数据</SelectItem>
              <SelectItem value="custom">自定义范围</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>综合趋势</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>生命体征</span>
          </TabsTrigger>
          <TabsTrigger value="lab" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            <span>检验结果</span>
          </TabsTrigger>
          <TabsTrigger value="correlation" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            <span>相关性分析</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>健康状况综合趋势</CardTitle>
              <CardDescription>患者健康状况的整体变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Activity className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">健康状况综合趋势图</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者健康状况的综合趋势图表，包括关键健康指标的变化趋势和健康评分。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">健康评分趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 text-medical-600 opacity-50 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">健康评分趋势图</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>当前评分</span>
                    <span className="font-medium">85/100</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>变化趋势</span>
                    <span>↑ 上升 (+5)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">异常指标趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <BarChart2 className="h-10 w-10 text-medical-600 opacity-50 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">异常指标趋势图</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>当前异常指标</span>
                    <span className="font-medium text-amber-600">3项</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>变化趋势</span>
                    <span>↓ 下降 (-2)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">健康风险趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 text-medical-600 opacity-50 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">健康风险趋势图</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>当前风险等级</span>
                    <span className="font-medium text-amber-600">中等</span>
                  </div>
                  <div className="flex justify-between text-amber-600">
                    <span>变化趋势</span>
                    <span>→ 稳定</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>关键健康指标变化</CardTitle>
              <CardDescription>重要健康指标的长期变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">血压</div>
                    <div className="text-green-600">稳定在正常范围</div>
                  </div>
                  <div className="h-10 bg-slate-100 rounded-md"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">总胆固醇</div>
                    <div className="text-amber-600">轻度波动，整体偏高</div>
                  </div>
                  <div className="h-10 bg-slate-100 rounded-md"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">血糖</div>
                    <div className="text-green-600">稳定在正常范围</div>
                  </div>
                  <div className="h-10 bg-slate-100 rounded-md"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">体重指数 (BMI)</div>
                    <div className="text-amber-600">轻度超重，近期有改善</div>
                  </div>
                  <div className="h-10 bg-slate-100 rounded-md"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>生命体征趋势分析</CardTitle>
              <CardDescription>详细的生命体征长期变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">生命体征趋势分析</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者生命体征的详细趋势分析，包括血压、心率、体温和呼吸频率的长期变化趋势。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>检验结果趋势分析</CardTitle>
              <CardDescription>详细的检验结果长期变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <BarChart2 className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">检验结果趋势分析</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者检验结果的详细趋势分析，包括血液检查、生化指标和心脏标志物等的长期变化趋势。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>健康指标相关性分析</CardTitle>
              <CardDescription>不同健康指标之间的相关性分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">相关性分析</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者不同健康指标之间的相关性分析，帮助发现潜在的健康问题和风险因素。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
