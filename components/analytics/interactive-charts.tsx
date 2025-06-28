"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { ChevronLeft, Download, Share2 } from "lucide-react"

// 模拟详细数据
const detailedData = [
  { month: "1月", 患者满意度: 85, 医疗质量: 88, 医护比例: 92, 等待时间: 78, 复诊率: 76 },
  { month: "2月", 患者满意度: 83, 医疗质量: 87, 医护比例: 91, 等待时间: 75, 复诊率: 78 },
  { month: "3月", 患者满意度: 86, 医疗质量: 89, 医护比例: 90, 等待时间: 79, 复诊率: 77 },
  { month: "4月", 患者满意度: 88, 医疗质量: 90, 医护比例: 93, 等待时间: 82, 复诊率: 80 },
  { month: "5月", 患者满意度: 87, 医疗质量: 91, 医护比例: 94, 等待时间: 84, 复诊率: 82 },
  { month: "6月", 患者满意度: 90, 医疗质量: 92, 医护比例: 95, 等待时间: 86, 复诊率: 85 },
]

// 图表颜色
const colors = {
  患者满意度: "#4f46e5",
  医疗质量: "#06b6d4",
  医护比例: "#10b981",
  等待时间: "#f59e0b",
  复诊率: "#ef4444",
}

// 指标选项
const metrics = [
  { id: "患者满意度", label: "患者满意度" },
  { id: "医疗质量", label: "医疗质量" },
  { id: "医护比例", label: "医护比例" },
  { id: "等待时间", label: "等待时间" },
  { id: "复诊率", label: "复诊率" },
]

interface InteractiveChartsProps {
  onBack: () => void
}

export function InteractiveCharts({ onBack }: InteractiveChartsProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["患者满意度", "医疗质量"])

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((current) =>
      current.includes(metric) ? current.filter((m) => m !== metric) : [...current, metric],
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          返回
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" />
            导出数据
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            分享
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 mb-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center space-x-2">
                <Checkbox
                  id={metric.id}
                  checked={selectedMetrics.includes(metric.id)}
                  onCheckedChange={() => toggleMetric(metric.id)}
                />
                <label
                  htmlFor={metric.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {metric.label}
                </label>
              </div>
            ))}
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={detailedData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                {selectedMetrics.map((metric) => (
                  <Line
                    key={metric}
                    type="monotone"
                    dataKey={metric}
                    stroke={colors[metric as keyof typeof colors]}
                    name={metric}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">数据分析洞察</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>患者满意度与医疗质量呈正相关，相关系数为0.87</li>
          <li>等待时间的改善对患者满意度提升贡献最大</li>
          <li>医护比例提高后，医疗质量评分平均提升了3.2%</li>
          <li>复诊率与患者满意度存在滞后相关性，约1-2个月的延迟效应</li>
        </ul>
      </div>
    </div>
  )
}

export default InteractiveCharts
