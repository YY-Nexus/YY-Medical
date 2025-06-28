"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  TreesIcon as Lungs,
  LineChart,
  Calendar,
  Download,
  Filter,
} from "lucide-react"

export function VitalSigns() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">生命体征数据</h2>
          <p className="text-sm text-muted-foreground">查看和分析患者的生命体征数据，包括血压、心率、体温等</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">今天</SelectItem>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年</SelectItem>
              <SelectItem value="custom">自定义范围</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>概览</span>
          </TabsTrigger>
          <TabsTrigger value="blood-pressure" className="flex items-center gap-1">
            <Droplets className="h-4 w-4" />
            <span>血压</span>
          </TabsTrigger>
          <TabsTrigger value="heart-rate" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>心率</span>
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center gap-1">
            <Thermometer className="h-4 w-4" />
            <span>体温</span>
          </TabsTrigger>
          <TabsTrigger value="respiratory" className="flex items-center gap-1">
            <Lungs className="h-4 w-4" />
            <span>呼吸</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>趋势</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">血压</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">120/80</div>
                  <div className="text-xs text-green-600">正常</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">最近测量: 今天 08:30</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">心率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    72 <span className="text-sm font-normal">bpm</span>
                  </div>
                  <div className="text-xs text-green-600">正常</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">最近测量: 今天 08:30</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">体温</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    36.5 <span className="text-sm font-normal">°C</span>
                  </div>
                  <div className="text-xs text-green-600">正常</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">最近测量: 今天 08:30</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">呼吸频率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    16 <span className="text-sm font-normal">次/分</span>
                  </div>
                  <div className="text-xs text-green-600">正常</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">最近测量: 今天 08:30</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>生命体征趋势</CardTitle>
              <CardDescription>过去7天的生命体征变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">生命体征趋势图</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者生命体征的趋势图表，包括血压、心率、体温和呼吸频率的变化。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>异常记录</CardTitle>
                <CardDescription>最近检测到的异常生命体征</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-red-50 rounded-md">
                    <div className="mt-0.5">
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">心率异常</h4>
                      <p className="text-sm text-muted-foreground">2023-10-12 23:15 - 心率达到112 bpm</p>
                      <p className="text-sm text-red-600 mt-1">高于正常范围 (60-100 bpm)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-amber-50 rounded-md">
                    <div className="mt-0.5">
                      <Droplets className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">血压偏高</h4>
                      <p className="text-sm text-muted-foreground">2023-10-10 08:45 - 血压为135/88 mmHg</p>
                      <p className="text-sm text-amber-600 mt-1">轻度高于正常范围 (90-120/60-80 mmHg)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>测量记录</CardTitle>
                <CardDescription>最近的生命体征测量记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">今天 08:30</div>
                    <div className="flex gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">血压:</span> 120/80
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">心率:</span> 72
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">昨天 19:15</div>
                    <div className="flex gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">血压:</span> 118/78
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">心率:</span> 68
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">昨天 08:45</div>
                    <div className="flex gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">血压:</span> 122/82
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">心率:</span> 74
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">2023-10-13 09:00</div>
                    <div className="flex gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">血压:</span> 124/84
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">心率:</span> 76
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium">2023-10-12 23:15</div>
                    <div className="flex gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">血压:</span> 130/85
                      </div>
                      <div className="text-sm text-red-600">
                        <span className="text-muted-foreground">心率:</span> 112
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blood-pressure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>血压数据</CardTitle>
              <CardDescription>详细的血压测量数据和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Droplets className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">血压数据详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细血压数据，包括收缩压和舒张压的趋势图、统计分析和异常记录。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heart-rate" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>心率数据</CardTitle>
              <CardDescription>详细的心率测量数据和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">心率数据详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细心率数据，包括静息心率、活动心率的趋势图、统计分析和异常记录。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temperature" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>体温数据</CardTitle>
              <CardDescription>详细的体温测量数据和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Thermometer className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">体温数据详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细体温数据，包括体温变化趋势图、统计分析和异常记录。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="respiratory" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>呼吸数据</CardTitle>
              <CardDescription>详细的呼吸频率测量数据和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Lungs className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">呼吸数据详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细呼吸数据，包括呼吸频率变化趋势图、统计分析和异常记录。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>生命体征趋势分析</CardTitle>
              <CardDescription>综合分析生命体征的长期变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">趋势分析</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者生命体征的综合趋势分析，包括各项指标的相关性分析、长期变化趋势和预测模型。
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
