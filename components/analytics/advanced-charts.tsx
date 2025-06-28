"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, HelpCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"

// 饼图数据 - 患者来源分布
const patientSourceData = [
  { name: "门诊转诊", value: 35, color: "#4f46e5" },
  { name: "网络预约", value: 30, color: "#06b6d4" },
  { name: "急诊入院", value: 20, color: "#ef4444" },
  { name: "健康筛查", value: 10, color: "#10b981" },
  { name: "其他渠道", value: 5, color: "#f59e0b" },
]

// 雷达图数据 - 医院各科室评分
const departmentRatingsData = [
  { subject: "内科", A: 90, B: 85, fullMark: 100 },
  { subject: "外科", A: 88, B: 80, fullMark: 100 },
  { subject: "儿科", A: 86, B: 90, fullMark: 100 },
  { subject: "妇产科", A: 92, B: 88, fullMark: 100 },
  { subject: "神经科", A: 85, B: 82, fullMark: 100 },
  { subject: "心脏科", A: 95, B: 90, fullMark: 100 },
]

// 堆叠面积图数据 - 不���年龄段患者趋势
const patientAgeData = [
  { month: "1月", "0-18岁": 120, "19-35岁": 220, "36-50岁": 280, "51-65岁": 250, "65岁以上": 180 },
  { month: "2月", "0-18岁": 132, "19-35岁": 210, "36-50岁": 290, "51-65岁": 260, "65岁以上": 190 },
  { month: "3月", "0-18岁": 125, "19-35岁": 230, "36-50岁": 270, "51-65岁": 240, "65岁以上": 195 },
  { month: "4月", "0-18岁": 145, "19-35岁": 245, "36-50岁": 260, "51-65岁": 245, "65岁以上": 210 },
  { month: "5月", "0-18岁": 150, "19-35岁": 260, "36-50岁": 280, "51-65岁": 260, "65岁以上": 220 },
  { month: "6月", "0-18岁": 170, "19-35岁": 270, "36-50岁": 300, "51-65岁": 270, "65岁以上": 230 },
]

// 树形图数据 - 医疗资源分配
const resourceAllocationData = [
  {
    name: "人力资源",
    children: [
      { name: "医生", size: 3500, color: "#4f46e5" },
      { name: "护士", size: 5000, color: "#06b6d4" },
      { name: "技术人员", size: 2000, color: "#10b981" },
      { name: "行政人员", size: 1500, color: "#f59e0b" },
    ],
  },
  {
    name: "设备资源",
    children: [
      { name: "诊断设备", size: 4000, color: "#ef4444" },
      { name: "治疗设备", size: 3800, color: "#ec4899" },
      { name: "监测设备", size: 2800, color: "#8b5cf6" },
      { name: "实验室设备", size: 2200, color: "#14b8a6" },
    ],
  },
  {
    name: "财务资源",
    children: [
      { name: "研发投入", size: 3000, color: "#f97316" },
      { name: "运营成本", size: 4500, color: "#84cc16" },
      { name: "基础设施", size: 3200, color: "#6366f1" },
      { name: "人员薪资", size: 5500, color: "#0ea5e9" },
    ],
  },
]

// 堆叠柱状图数据 - 不同疾病类型的治疗成本
const treatmentCostData = [
  { name: "心血管疾病", 药物: 2500, 手术: 15000, 康复: 3500, 随访: 1200 },
  { name: "呼吸系统疾病", 药物: 1800, 手术: 9000, 康复: 2200, 随访: 900 },
  { name: "消化系统疾病", 药物: 2000, 手术: 12000, 康复: 1800, 随访: 800 },
  { name: "神经系统疾病", 药物: 3200, 手术: 18000, 康复: 5000, 随访: 1500 },
  { name: "内分泌疾病", 药物: 2800, 手术: 8000, 康复: 1500, 随访: 1100 },
]

// 自定义树形图内容
const CustomTreemapContent = ({ root, depth, x, y, width, height, index, colors, name, value }: any) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : "#ffffff",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={12}>
          {name}
        </text>
      )}
      {depth === 1 && (
        <text x={x + width / 2} y={y + height / 2 - 7} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">
          {value}
        </text>
      )}
    </g>
  )
}

interface AdvancedChartsProps {
  onBack: () => void
}

export default function AdvancedCharts({ onBack }: AdvancedChartsProps) {
  const [chartType, setChartType] = useState("pie")
  const [timeRange, setTimeRange] = useState("半年")

  const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          返回
        </Button>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="一个月">一个月</SelectItem>
              <SelectItem value="季度">季度</SelectItem>
              <SelectItem value="半年">半年</SelectItem>
              <SelectItem value="一年">一年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" />
            导出图表
          </Button>
        </div>
      </div>

      <Tabs value={chartType} onValueChange={setChartType}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="pie">饼图分析</TabsTrigger>
          <TabsTrigger value="radar">雷达图分析</TabsTrigger>
          <TabsTrigger value="stacked">堆叠面积图</TabsTrigger>
          <TabsTrigger value="treemap">树形图分析</TabsTrigger>
          <TabsTrigger value="stackedBar">堆叠柱状图</TabsTrigger>
        </TabsList>

        <TabsContent value="pie" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                患者来源分布
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {patientSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}人`, "患者数量"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  门诊转诊和网络预约是主要患者来源，占比达65%。建议加强网络预约系统建设，提高用户体验。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                医院各科室评分对比
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={departmentRatingsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="本院评分" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                    <Radar name="行业平均" dataKey="B" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  心脏科和妇产科评分显著高于行业平均水平，而神经科评分相对较低，建议加强神经科医疗团队建设。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stacked" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                不同年龄段患者趋势
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={patientAgeData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="0-18岁" stackId="1" stroke="#4f46e5" fill="#4f46e5" />
                    <Area type="monotone" dataKey="19-35岁" stackId="1" stroke="#06b6d4" fill="#06b6d4" />
                    <Area type="monotone" dataKey="36-50岁" stackId="1" stroke="#10b981" fill="#10b981" />
                    <Area type="monotone" dataKey="51-65岁" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="65岁以上" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  36-50岁年龄段患者数量最多，且呈上升趋势。65岁以上患者增长率最高，反映人口老龄化趋势。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treemap" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                医疗资源分配分析
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={resourceAllocationData}
                    dataKey="size"
                    ratio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomTreemapContent colors={COLORS} />}
                  >
                    <Tooltip formatter={(value, name) => [`${value.toLocaleString()} 万元`, name]} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  人力资源中护士占比最高，设备资源中诊断设备投入最大。建议增加研发投入，提高医疗技术创新能力。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stackedBar" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                不同疾病类型的治疗成本构成
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={treatmentCostData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} 元`, ""]} />
                    <Legend />
                    <Bar dataKey="药物" stackId="a" fill="#4f46e5" />
                    <Bar dataKey="手术" stackId="a" fill="#ef4444" />
                    <Bar dataKey="康复" stackId="a" fill="#10b981" />
                    <Bar dataKey="随访" stackId="a" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  神经系统疾病总治疗成本最高，手术费用在各类疾病中占比最大。心血管疾病康复费用较高，建议优化康复方案降低成本。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
