"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Download, ArrowUpRight, ArrowDownRight, HelpCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"

// 模拟数据 - 患者就诊数据对比
const patientVisitsData = [
  { month: "1月", 当前期间: 1250, 对比期间: 1100, 增长率: 13.6 },
  { month: "2月", 当前期间: 1380, 对比期间: 1150, 增长率: 20.0 },
  { month: "3月", 当前期间: 1420, 对比期间: 1300, 增长率: 9.2 },
  { month: "4月", 当前期间: 1550, 对比期间: 1380, 增长率: 12.3 },
  { month: "5月", 当前期间: 1680, 对比期间: 1450, 增长率: 15.9 },
  { month: "6月", 当前期间: 1820, 对比期间: 1520, 增长率: 19.7 },
]

// 模拟数据 - 治疗效果对比
const treatmentEffectivenessData = [
  { 疾病类型: "高血压", 当前期间: 85, 对比期间: 78, 变化: 7 },
  { 疾病类型: "糖尿病", 当前期间: 82, 对比期间: 75, 变化: 7 },
  { 疾病类型: "冠心病", 当前期间: 88, 对比期间: 80, 变化: 8 },
  { 疾病类型: "肺炎", 当前期间: 92, 对比期间: 85, 变化: 7 },
  { 疾病类型: "骨折", 当前期间: 95, 对比期间: 90, 变化: 5 },
]

// 模拟数据 - 医疗资源使用对比
const resourceUsageData = [
  { 资源类型: "病床使用率", 当前期间: 85, 对比期间: 78, 变化: 7 },
  { 资源类型: "手术室使用率", 当前期间: 75, 对比期间: 70, 变化: 5 },
  { 资源类型: "医生工作负荷", 当前期间: 82, 对比期间: 85, 变化: -3 },
  { 资源类型: "护士工作负荷", 当前期间: 88, 对比期间: 90, 变化: -2 },
  { 资源类型: "设备使用率", 当前期间: 72, 对比期间: 65, 变化: 7 },
]

// 模拟数据 - 患者满意度对比
const patientSatisfactionData = [
  { 指标: "医疗质量", 当前期间: 4.5, 对比期间: 4.2, 变化: 0.3 },
  { 指标: "服务态度", 当前期间: 4.7, 对比期间: 4.3, 变化: 0.4 },
  { 指标: "环境舒适度", 当前期间: 4.6, 对比期间: 4.4, 变化: 0.2 },
  { 指标: "等待时间", 当前期间: 4.0, 对比期间: 3.5, 变化: 0.5 },
  { 指标: "沟通效果", 当前期间: 4.4, 对比期间: 4.1, 变化: 0.3 },
  { 指标: "随访服务", 当前期间: 4.3, 对比期间: 3.9, 变化: 0.4 },
]

// 模拟数据 - 财务指标对比
const financialMetricsData = [
  { month: "1月", 当前收入: 1250000, 对比收入: 1100000, 当前支出: 950000, 对比支出: 880000 },
  { month: "2月", 当前收入: 1380000, 对比收入: 1150000, 当前支出: 1050000, 对比支出: 920000 },
  { month: "3月", 当前收入: 1420000, 对比收入: 1300000, 当前支出: 1080000, 对比支出: 1050000 },
  { month: "4月", 当前收入: 1550000, 对比收入: 1380000, 当前支出: 1150000, 对比支出: 1100000 },
  { month: "5月", 当前收入: 1680000, 对比收入: 1450000, 当前支出: 1250000, 对比支出: 1150000 },
  { month: "6月", 当前收入: 1820000, 对比收入: 1520000, 当前支出: 1350000, 对比支出: 1200000 },
]

// 自定义工具提示
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
        {payload[0].payload.增长率 !== undefined && (
          <p className={payload[0].payload.增长率 >= 0 ? "text-green-600" : "text-red-600"}>
            增长率: {payload[0].payload.增长率}%
          </p>
        )}
      </div>
    )
  }
  return null
}

interface DataComparisonProps {
  onBack: () => void
}

export default function DataComparison({ onBack }: DataComparisonProps) {
  const [activeTab, setActiveTab] = useState("patient-visits")
  const [currentPeriod, setCurrentPeriod] = useState("2023下半年")
  const [comparePeriod, setComparePeriod] = useState("2022下半年")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2023, 6, 1)) // 2023年7月1日
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2023, 11, 31)) // 2023年12月31日
  const [compareStartDate, setCompareStartDate] = useState<Date | undefined>(new Date(2022, 6, 1)) // 2022年7月1日
  const [compareEndDate, setCompareEndDate] = useState<Date | undefined>(new Date(2022, 11, 31)) // 2022年12月31日

  // 计算总体变化
  const calculateOverallChange = (data: any[], currentKey: string, compareKey: string) => {
    const currentTotal = data.reduce((sum, item) => sum + item[currentKey], 0)
    const compareTotal = data.reduce((sum, item) => sum + item[compareKey], 0)
    const change = ((currentTotal - compareTotal) / compareTotal) * 100
    return {
      currentTotal,
      compareTotal,
      change,
    }
  }

  const patientVisitsChange = calculateOverallChange(patientVisitsData, "当前期间", "对比期间")
  const treatmentChange = calculateOverallChange(treatmentEffectivenessData, "当前期间", "对比期间")
  const resourceChange = calculateOverallChange(resourceUsageData, "当前期间", "对比期间")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          返回
        </Button>
        <div className="text-xl font-bold">数据对比分析</div>
        <Button variant="outline" size="sm">
          <Download className="mr-1 h-4 w-4" />
          导出报告
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">时间段选择</CardTitle>
          <CardDescription>选择要对比的两个时间段</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="font-medium">当前时间段</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">开始日期</div>
                  <DatePicker value={startDate} onChange={setStartDate} className="w-full" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">结束日期</div>
                  <DatePicker value={endDate} onChange={setEndDate} className="w-full" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">预设时间段</div>
                <Select value={currentPeriod} onValueChange={setCurrentPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间段" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023上半年">2023年上半年</SelectItem>
                    <SelectItem value="2023下半年">2023年下半年</SelectItem>
                    <SelectItem value="2023全年">2023年全年</SelectItem>
                    <SelectItem value="2022下半年">2022年下半年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-medium">对比时间段</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">开始日期</div>
                  <DatePicker value={compareStartDate} onChange={setCompareStartDate} className="w-full" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">结束日期</div>
                  <DatePicker value={compareEndDate} onChange={setCompareEndDate} className="w-full" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">预设时间段</div>
                <Select value={comparePeriod} onValueChange={setComparePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间段" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022上半年">2022年上半年</SelectItem>
                    <SelectItem value="2022下半年">2022年下半年</SelectItem>
                    <SelectItem value="2022全年">2022年全年</SelectItem>
                    <SelectItem value="2021下半年">2021年下半年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">患者就诊总量</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold">{patientVisitsChange.currentTotal.toLocaleString()}</div>
              <div className="ml-2 flex items-center">
                <div
                  className={`text-sm font-medium ${
                    patientVisitsChange.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {patientVisitsChange.change >= 0 ? (
                    <ArrowUpRight className="inline h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="inline h-4 w-4 mr-1" />
                  )}
                  {Math.abs(patientVisitsChange.change).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              对比期间: {patientVisitsChange.compareTotal.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">平均治疗效果</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold">
                {treatmentChange.currentTotal / treatmentEffectivenessData.length}%
              </div>
              <div className="ml-2 flex items-center">
                <div
                  className={`text-sm font-medium ${treatmentChange.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {treatmentChange.change >= 0 ? (
                    <ArrowUpRight className="inline h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="inline h-4 w-4 mr-1" />
                  )}
                  {Math.abs(treatmentChange.change).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              对比期间: {(treatmentChange.compareTotal / treatmentEffectivenessData.length).toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">资源利用率</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold">
                {(resourceChange.currentTotal / resourceUsageData.length).toFixed(1)}%
              </div>
              <div className="ml-2 flex items-center">
                <div
                  className={`text-sm font-medium ${resourceChange.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {resourceChange.change >= 0 ? (
                    <ArrowUpRight className="inline h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="inline h-4 w-4 mr-1" />
                  )}
                  {Math.abs(resourceChange.change).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              对比期间: {(resourceChange.compareTotal / resourceUsageData.length).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="patient-visits">患者就诊</TabsTrigger>
          <TabsTrigger value="treatment">治疗效果</TabsTrigger>
          <TabsTrigger value="resources">资源使用</TabsTrigger>
          <TabsTrigger value="satisfaction">患者满意度</TabsTrigger>
          <TabsTrigger value="financial">财务指标</TabsTrigger>
        </TabsList>

        <TabsContent value="patient-visits" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                患者就诊数量对比
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                对比 {currentPeriod} 与 {comparePeriod} 的患者就诊数量变化
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={patientVisitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 30]} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="当前期间" name="当前期间" fill="#4f46e5" />
                    <Bar yAxisId="left" dataKey="对比期间" name="对比期间" fill="#94a3b8" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="增长率"
                      name="增长率"
                      stroke="#10b981"
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>与{comparePeriod}相比，{currentPeriod}
                  的患者就诊量整体呈上升趋势，平均增长率为{Math.round(patientVisitsChange.change)}
                  %。6月份增长最为显著，建议分析该月份的营销活动和服务改进措施，以复制成功经验。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                治疗效果对比
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                对比 {currentPeriod} 与 {comparePeriod} 的不同疾病治疗效果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={treatmentEffectivenessData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} unit="%" />
                    <YAxis dataKey="疾病类型" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="当前期间" name="当前期间" fill="#4f46e5" />
                    <Bar dataKey="对比期间" name="对比期间" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  所有疾病类型的治疗效果均有提升，其中冠心病治疗效果提升最为显著，提高了8个百分点。这可能与新引进的心脏介入治疗技术和专家团队有关。建议继续加强医疗技术创新和专业培训。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                医疗资源使用对比
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                对比 {currentPeriod} 与 {comparePeriod} 的医疗资源使用情况
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resourceUsageData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 120,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} unit="%" />
                    <YAxis dataKey="资源类型" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="当前期间" name="当前期间" fill="#4f46e5" />
                    <Bar dataKey="对比期间" name="对比期间" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  病床和设备使用率显著提高，而医生和护士的工作负荷有所下降，这表明资源配置更加合理，工作效率提升。建议继续优化排班系统和资源分配算法，进一步提高医疗资源利用效率。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                患者满意度对比
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                对比 {currentPeriod} 与 {comparePeriod} 的患者满意度评分（5分制）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={patientSatisfactionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="指标" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="当前期间" name="当前期间" fill="#4f46e5" />
                    <Bar dataKey="对比期间" name="对比期间" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  所有满意度指标均有提升，其中等待时间满意度提升最为显著，这与新引入的智能预约系统和分诊流程优化有关。服务态度满意度也有明显提升，反映出员工培训计划的成效。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                财务指标对比
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                对比 {currentPeriod} 与 {comparePeriod} 的收入和支出情况
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={financialMetricsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} 元`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="当前收入" name="当前收入" stroke="#4f46e5" strokeWidth={2} />
                    <Line type="monotone" dataKey="对比收入" name="对比收入" stroke="#94a3b8" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="当前支出"
                      name="当前支出"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="对比支出"
                      name="对比支出"
                      stroke="#f97316"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <span className="font-medium">数据洞察：</span>
                  与对比期间相比，当前期间的收入增长率（
                  {(
                    ((financialMetricsData.reduce((sum, item) => sum + item.当前收入, 0) -
                      financialMetricsData.reduce((sum, item) => sum + item.对比收入, 0)) /
                      financialMetricsData.reduce((sum, item) => sum + item.对比收入, 0)) *
                    100
                  ).toFixed(1)}
                  %）高于支出增长率（
                  {(
                    ((financialMetricsData.reduce((sum, item) => sum + item.当前支出, 0) -
                      financialMetricsData.reduce((sum, item) => sum + item.对比支出, 0)) /
                      financialMetricsData.reduce((sum, item) => sum + item.对比支出, 0)) *
                    100
                  ).toFixed(1)}
                  %），表明运营效率有所提高。建议继续优化成本控制措施，进一步提高利润率。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
