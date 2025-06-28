"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  LineChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Line,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react"

// 模拟诊断统计数据
const diagnosisData = {
  byMonth: [
    { month: "1月", count: 45, accuracy: 0.92 },
    { month: "2月", count: 52, accuracy: 0.89 },
    { month: "3月", count: 68, accuracy: 0.91 },
    { month: "4月", count: 75, accuracy: 0.93 },
    { month: "5月", count: 92, accuracy: 0.94 },
    { month: "6月", count: 105, accuracy: 0.95 },
  ],
  byDiagnosis: [
    { name: "2型糖尿病", value: 124 },
    { name: "高血压", value: 85 },
    { name: "冠心病", value: 67 },
    { name: "肺炎", value: 45 },
    { name: "胃溃疡", value: 32 },
    { name: "其他", value: 84 },
  ],
  byAccuracy: [
    { range: "90-100%", count: 245 },
    { range: "80-90%", count: 132 },
    { range: "70-80%", count: 64 },
    { range: "60-70%", count: 28 },
    { range: "<60%", count: 12 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function DiagnosisStatistics() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <div className="w-48">
          <Label htmlFor="time-range">时间范围</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger id="time-range">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">近3个月</SelectItem>
              <SelectItem value="6months">近6个月</SelectItem>
              <SelectItem value="1year">近1年</SelectItem>
              <SelectItem value="all">全部时间</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">诊断数量与准确率趋势</h3>
            <ChartContainer
              config={{
                count: {
                  label: "诊断数量",
                  color: "hsl(var(--chart-1))",
                },
                accuracy: {
                  label: "准确率",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={diagnosisData.byMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" name="诊断数量" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="var(--color-accuracy)"
                    name="准确率"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">诊断类型分布</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diagnosisData.byDiagnosis}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {diagnosisData.byDiagnosis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}例`, "数量"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">诊断准确率分布</h3>
            <ChartContainer
              config={{
                count: {
                  label: "诊断数量",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diagnosisData.byAccuracy}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="count" fill="var(--color-count)" name="诊断数量" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
