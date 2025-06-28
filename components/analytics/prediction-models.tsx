"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

// 模拟预测数据
const admissionPredictionData = [
  { department: "心脏科", 预计入院: 120, 实际入院: 115 },
  { department: "神经科", 预计入院: 85, 实际入院: 90 },
  { department: "骨科", 预计入院: 95, 实际入院: 92 },
  { department: "儿科", 预计入院: 70, 实际入院: 68 },
  { department: "内科", 预计入院: 110, 实际入院: 105 },
  { department: "外科", 预计入院: 100, 实际入院: 98 },
]

const resourcePredictionData = [
  { resource: "医生", 预计需求: 45, 实际需求: 48 },
  { resource: "护士", 预计需求: 120, 实际需求: 125 },
  { resource: "病床", 预计需求: 200, 实际需求: 195 },
  { resource: "手术室", 预计需求: 15, 实际需求: 16 },
  { resource: "ICU床位", 预计需求: 25, 实际需求: 28 },
  { resource: "急诊室", 预计需求: 35, 实际需求: 32 },
]

export function PredictionModels() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>预测模型</CardTitle>
            <CardDescription>基于AI的医疗资源需求预测</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="week">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择预测范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">未来一周</SelectItem>
                <SelectItem value="month">未来一个月</SelectItem>
                <SelectItem value="quarter">未来三个月</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              导出预测
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="admissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="admissions">入院预测</TabsTrigger>
            <TabsTrigger value="resources">资源需求</TabsTrigger>
            <TabsTrigger value="accuracy">预测准确度</TabsTrigger>
          </TabsList>

          <TabsContent value="admissions">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  预计入院: {
                    label: "预计入院",
                    color: "hsl(var(--chart-1))",
                  },
                  实际入院: {
                    label: "实际入院",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={admissionPredictionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="预计入院" fill="var(--color-预计入院)" name="预计入院" />
                    <Bar dataKey="实际入院" fill="var(--color-实际入院)" name="实际入院" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-sm">预测准确率</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.4%</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">↑ 1.2%</span>
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-sm">需要关注的科室</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium">神经科</div>
                  <p className="text-xs text-muted-foreground">
                    实际入院比预测高出 <span className="text-amber-500">5.9%</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  预计需求: {
                    label: "预计需求",
                    color: "hsl(var(--chart-1))",
                  },
                  实际需求: {
                    label: "实际需求",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resourcePredictionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="resource" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="预计需求" fill="var(--color-预计需求)" name="预计需求" />
                    <Bar dataKey="实际需求" fill="var(--color-实际需求)" name="实际需求" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-sm">预测准确率</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.8%</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">↑ 0.8%</span>
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-sm">需要关注的资源</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium">ICU床位</div>
                  <p className="text-xs text-muted-foreground">
                    实际需求比预测高出 <span className="text-amber-500">12%</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accuracy">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">预测模型性能</CardTitle>
                  <CardDescription>各模型的准确率和误差分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">入院预测模型</div>
                        <div className="text-sm text-muted-foreground">基于历史数据和季节性分析</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">96.4%</div>
                        <div className="text-sm text-muted-foreground">准确率</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">资源需求预测</div>
                        <div className="text-sm text-muted-foreground">基于入院预测和资源使用率</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">94.8%</div>
                        <div className="text-sm text-muted-foreground">准确率</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">住院时长预测</div>
                        <div className="text-sm text-muted-foreground">基于疾病类型和患者特征</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-amber-600">92.1%</div>
                        <div className="text-sm text-muted-foreground">准确率</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">急诊流量预测</div>
                        <div className="text-sm text-muted-foreground">基于时间序列和外部因素</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-amber-600">91.5%</div>
                        <div className="text-sm text-muted-foreground">准确率</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">模型优化建议</CardTitle>
                  <CardDescription>基于误差分析的改进方向</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">急诊流量预测</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        建议纳入更多外部数据源，如天气预报、公共活动和流行病监测数据，以提高预测准确性。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">ICU床位需求</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        当前模型低估了ICU床位需求，建议调整算法权重，增加重症病例转化率的影响因子。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">神经科入院预测</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        近期数据显示神经科入院率上升，建议更新模型参数，反映这一趋势变化。
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        查看完整优化报告
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// 添加PredictionModels作为命名导出
