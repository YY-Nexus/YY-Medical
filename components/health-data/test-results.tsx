"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  FlaskRoundIcon as Flask,
  Droplets,
  HeartPulse,
  Dna,
  Calendar,
  Download,
  Filter,
  AlertCircle,
} from "lucide-react"

export function TestResults() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">检验结果</h2>
          <p className="text-sm text-muted-foreground">查看和分析患者的实验室检验结果，包括血液检查、生化指标等</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年</SelectItem>
              <SelectItem value="all">所有记录</SelectItem>
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
            <FileText className="h-4 w-4" />
            <span>概览</span>
          </TabsTrigger>
          <TabsTrigger value="blood" className="flex items-center gap-1">
            <Droplets className="h-4 w-4" />
            <span>血液检查</span>
          </TabsTrigger>
          <TabsTrigger value="biochemical" className="flex items-center gap-1">
            <Flask className="h-4 w-4" />
            <span>生化指标</span>
          </TabsTrigger>
          <TabsTrigger value="cardiac" className="flex items-center gap-1">
            <HeartPulse className="h-4 w-4" />
            <span>心脏标志物</span>
          </TabsTrigger>
          <TabsTrigger value="genetic" className="flex items-center gap-1">
            <Dna className="h-4 w-4" />
            <span>基因检测</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">最近检验</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">血常规</div>
                    <div className="text-xs text-muted-foreground">2023-10-15</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">肝功能</div>
                    <div className="text-xs text-muted-foreground">2023-10-10</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">肾功能</div>
                    <div className="text-xs text-muted-foreground">2023-10-10</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">血脂</div>
                    <div className="text-xs text-muted-foreground">2023-09-28</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">异常指标</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-red-600">总胆固醇</div>
                    <div className="text-xs">
                      5.8 mmol/L <span className="text-muted-foreground">(参考: &lt;5.2)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-amber-600">低密度脂蛋白</div>
                    <div className="text-xs">
                      3.6 mmol/L <span className="text-muted-foreground">(参考: &lt;3.4)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-amber-600">谷丙转氨酶</div>
                    <div className="text-xs">
                      52 U/L <span className="text-muted-foreground">(参考: 7-40)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">检验统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">总检验次数</div>
                    <div className="text-sm">24</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">异常指标数</div>
                    <div className="text-sm text-amber-600">8</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">严重异常</div>
                    <div className="text-sm text-red-600">2</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">最近一次检验</div>
                    <div className="text-sm">2023-10-15</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>检验结果概览</CardTitle>
              <CardDescription>最近的检验结果和异常指标</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-3 font-medium border-b">
                  <div className="col-span-2">检验项目</div>
                  <div>结果</div>
                  <div>参考范围</div>
                  <div>状态</div>
                  <div>日期</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-6 p-3">
                    <div className="col-span-2">血红蛋白 (Hb)</div>
                    <div>145 g/L</div>
                    <div>130-175 g/L</div>
                    <div className="text-green-600">正常</div>
                    <div>2023-10-15</div>
                  </div>
                  <div className="grid grid-cols-6 p-3">
                    <div className="col-span-2">白细胞计数 (WBC)</div>
                    <div>6.8 × 10⁹/L</div>
                    <div>4.0-10.0 × 10⁹/L</div>
                    <div className="text-green-600">正常</div>
                    <div>2023-10-15</div>
                  </div>
                  <div className="grid grid-cols-6 p-3">
                    <div className="col-span-2">血小板计数 (PLT)</div>
                    <div>210 × 10⁹/L</div>
                    <div>100-300 × 10⁹/L</div>
                    <div className="text-green-600">正常</div>
                    <div>2023-10-15</div>
                  </div>
                  <div className="grid grid-cols-6 p-3 bg-amber-50">
                    <div className="col-span-2">总胆固醇 (TC)</div>
                    <div>5.8 mmol/L</div>
                    <div>&lt;5.2 mmol/L</div>
                    <div className="text-red-600">偏高</div>
                    <div>2023-09-28</div>
                  </div>
                  <div className="grid grid-cols-6 p-3 bg-amber-50">
                    <div className="col-span-2">低密度脂蛋白 (LDL-C)</div>
                    <div>3.6 mmol/L</div>
                    <div>&lt;3.4 mmol/L</div>
                    <div className="text-amber-600">偏高</div>
                    <div>2023-09-28</div>
                  </div>
                  <div className="grid grid-cols-6 p-3">
                    <div className="col-span-2">高密度脂蛋白 (HDL-C)</div>
                    <div>1.2 mmol/L</div>
                    <div>&gt;1.0 mmol/L</div>
                    <div className="text-green-600">正常</div>
                    <div>2023-09-28</div>
                  </div>
                  <div className="grid grid-cols-6 p-3 bg-amber-50">
                    <div className="col-span-2">谷丙转氨酶 (ALT)</div>
                    <div>52 U/L</div>
                    <div>7-40 U/L</div>
                    <div className="text-amber-600">偏高</div>
                    <div>2023-10-10</div>
                  </div>
                  <div className="grid grid-cols-6 p-3">
                    <div className="col-span-2">谷草转氨酶 (AST)</div>
                    <div>32 U/L</div>
                    <div>13-35 U/L</div>
                    <div className="text-green-600">正常</div>
                    <div>2023-10-10</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>异常指标分析</CardTitle>
                <CardDescription>异常检验指标的分析和建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-red-50 rounded-md">
                    <div className="mt-0.5">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">总胆固醇偏高</h4>
                      <p className="text-sm text-muted-foreground">当前值: 5.8 mmol/L (参考范围: &lt;5.2 mmol/L)</p>
                      <p className="text-sm mt-1">可能原因: 饮食中脂肪和胆固醇摄入过多，缺乏运动，遗传因素</p>
                      <p className="text-sm text-red-600 mt-1">建议: 调整饮食结构，增加运动，必要时考虑药物治疗</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-amber-50 rounded-md">
                    <div className="mt-0.5">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">谷丙转氨酶偏高</h4>
                      <p className="text-sm text-muted-foreground">当前值: 52 U/L (参考范围: 7-40 U/L)</p>
                      <p className="text-sm mt-1">可能原因: 轻度肝功能异常，药物影响，脂肪肝</p>
                      <p className="text-sm text-amber-600 mt-1">建议: 避免饮酒，减少高脂饮食，复查肝功能</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>检验趋势</CardTitle>
                <CardDescription>关键指标的变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <FileText className="h-10 w-10 text-medical-600 opacity-50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">此处将显示关键检验指标的变化趋势图表</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div>总胆固醇</div>
                    <div className="text-red-600">↑ 上升趋势</div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>谷丙转氨酶</div>
                    <div className="text-amber-600">↔ 波动</div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>血红蛋白</div>
                    <div className="text-green-600">→ 稳定</div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>血糖</div>
                    <div className="text-green-600">→ 稳定</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blood" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>血液检查</CardTitle>
              <CardDescription>详细的血液检查结果和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Droplets className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">血液检查详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细血液检查结果，包括血常规、血细胞分析和血液生化指标等。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biochemical" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>生化指标</CardTitle>
              <CardDescription>详细的生化指标检测结果和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Flask className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">生化指标详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细生化指标检测结果，包括肝功能、肾功能、血脂和电解质等。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cardiac" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>心脏标志物</CardTitle>
              <CardDescription>详细的心脏标志物检测结果和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <HeartPulse className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">心脏标志物详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细心脏标志物检测结果，包括肌钙蛋白、肌酸激酶和脑钠肽等。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genetic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>基因检测</CardTitle>
              <CardDescription>详细的基因检测结果和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <div className="text-center">
                  <Dna className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">基因检测详情</h3>
                  <p className="text-muted-foreground max-w-md">
                    此处将显示患者的详细基因检测结果，包括遗传风险评估、药物基因组学和疾病易感性分析等。
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
