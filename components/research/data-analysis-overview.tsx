"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { LineChartIcon, BarChartIcon, Download, Filter } from "lucide-react"

// 模拟相关性数据
const correlationData = [
  { x: 65, y: 120, z: 20, name: "患者A" },
  { x: 75, y: 135, z: 25, name: "患者B" },
  { x: 68, y: 115, z: 15, name: "患者C" },
  { x: 90, y: 160, z: 30, name: "患者D" },
  { x: 85, y: 150, z: 28, name: "患者E" },
  { x: 73, y: 130, z: 22, name: "患者F" },
  { x: 78, y: 145, z: 24, name: "患者G" },
  { x: 82, y: 155, z: 26, name: "患者H" },
  { x: 70, y: 125, z: 18, name: "患者I" },
  { x: 88, y: 158, z: 29, name: "患者J" },
]

// 模拟时间序列数据
const timeSeriesData = [
  { month: "1月", 血糖值: 145, 血压值: 135, 胆固醇: 210 },
  { month: "2月", 血糖值: 139, 血压值: 132, 胆固醇: 205 },
  { month: "3月", 血糖值: 136, 血压值: 130, 胆固醇: 200 },
  { month: "4月", 血糖值: 132, 血压值: 128, 胆固醇: 195 },
  { month: "5月", 血糖值: 128, 血压值: 125, 胆固醇: 190 },
  { month: "6月", 血糖值: 125, 血压值: 122, 胆固醇: 185 },
]

// 模拟分组比较数据
const groupComparisonData = [
  { group: "对照组", 治疗前: 85, 治疗后: 85 },
  { group: "实验组A", 治疗前: 84, 治疗后: 75 },
  { group: "实验组B", 治疗前: 86, 治疗后: 70 },
  { group: "实验组C", 治疗前: 83, 治疗后: 65 },
]

export function DataAnalysisOverview() {
  const [activeTab, setActiveTab] = useState("correlation")
  const [selectedDataset, setSelectedDataset] = useState("diabetes")

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>数据分析</CardTitle>
          <div className="flex gap-2">
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="选择数据集" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diabetes">糖尿病研究数据集</SelectItem>
                <SelectItem value="hypertension">高血压研究数据集</SelectItem>
                <SelectItem value="cardio">心血管疾病数据集</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="correlation">相关性分析</TabsTrigger>
            <TabsTrigger value="timeseries">时间序列</TabsTrigger>
            <TabsTrigger value="comparison">分组比较</TabsTrigger>
          </TabsList>

          <TabsContent value="correlation" className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">变量相关性分析</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-medical-500 rounded-full"></div>
                  <span className="text-xs">X轴: 血糖值</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-medical-500 rounded-full"></div>
                  <span className="text-xs">Y轴: 血压值</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-medical-500 rounded-full"></div>
                  <span className="text-xs">气泡大小: 胆固醇</span>
                </div>
              </div>
            </div>

            <div className="h-80 border rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="血糖值" unit="mg/dL" />
                  <YAxis type="number" dataKey="y" name="血压值" unit="mmHg" />
                  <ZAxis type="number" dataKey="z" range={[60, 400]} name="胆固醇" unit="mg/dL" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter name="患者数据" data={correlationData} fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">相关性分析结果</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">皮尔逊相关系数:</span> 0.85 (血糖值与血压值之间存在强相关性)
                </p>
                <p>
                  <span className="font-medium">显著性水平:</span> p &lt; 0.001 (相关性具有统计学意义)
                </p>
                <p>
                  <span className="font-medium">结论:</span>{" "}
                  数据表明血糖值与血压值之间存在显著正相关，即血糖值越高，血压值也倾向于越高。这支持了糖尿病与高血压之间可能存在的病理生理学联系。
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeseries" className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">时间序列分析</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <LineChartIcon className="h-4 w-4 mr-2" />
                  线性趋势
                </Button>
                <Button variant="outline" size="sm">
                  <BarChartIcon className="h-4 w-4 mr-2" />
                  季节性分析
                </Button>
              </div>
            </div>

            <div className="h-80 border rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="血糖值" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="血压值" stroke="#10b981" />
                  <Line type="monotone" dataKey="胆固醇" stroke="#f59e0b" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">时间序列分析结果</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">趋势分析:</span>{" "}
                  所有三个指标（血糖值、血压值、胆固醇）在6个月内均呈下降趋势。
                </p>
                <p>
                  <span className="font-medium">平均下降率:</span> 血糖值 (-13.8%)，血压值 (-9.6%)，胆固醇 (-11.9%)
                </p>
                <p>
                  <span className="font-medium">结论:</span>{" "}
                  数据显示治疗干预��6个月内对所有三个关键健康指标均产生了积极影响，其中血糖值的改善最为显著。
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">治疗效果分组比较</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <BarChartIcon className="h-4 w-4 mr-2" />
                  统计检验
                </Button>
              </div>
            </div>

            <div className="h-80 border rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={groupComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="治疗前" fill="#3b82f6" />
                  <Bar dataKey="治疗后" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">分组比较分析结果</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">对照组:</span> 无显著变化 (p = 0.92)
                </p>
                <p>
                  <span className="font-medium">实验组A:</span> 显著下降 10.7% (p &lt; 0.05)
                </p>
                <p>
                  <span className="font-medium">实验组B:</span> 显著下降 18.6% (p &lt; 0.01)
                </p>
                <p>
                  <span className="font-medium">实验组C:</span> 显著下降 21.7% (p &lt; 0.001)
                </p>
                <p>
                  <span className="font-medium">结论:</span>{" "}
                  所有三个实验组相比对照组均显示出统计学显著的改善，其中实验组C的治疗方案效果最佳。建议进一步扩大实验组C的样本量进行验证性研究。
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
