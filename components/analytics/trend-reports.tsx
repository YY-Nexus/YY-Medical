"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Calendar } from "lucide-react"

// 模拟趋势数据
const trendData = [
  { date: "2023-01", 患者满意度: 85, 医生效率: 72, 治疗成功率: 78 },
  { date: "2023-02", 患者满意度: 83, 医生效率: 74, 治疗成功率: 76 },
  { date: "2023-03", 患者满意度: 86, 医生效率: 76, 治疗成功率: 79 },
  { date: "2023-04", 患者满意度: 88, 医生效率: 78, 治疗成功率: 81 },
  { date: "2023-05", 患者满意度: 87, 医生效率: 80, 治疗成功率: 82 },
  { date: "2023-06", 患者满意度: 90, 医生效率: 82, 治疗成功率: 84 },
  { date: "2023-07", 患者满意度: 92, 医生效率: 83, 治疗成功率: 85 },
  { date: "2023-08", 患者满意度: 91, 医生效率: 85, 治疗成功率: 86 },
  { date: "2023-09", 患者满意度: 93, 医生效率: 86, 治疗成功率: 87 },
  { date: "2023-10", 患者满意度: 94, 医生效率: 87, 治疗成功率: 88 },
  { date: "2023-11", 患者满意度: 95, 医生效率: 88, 治疗成功率: 89 },
  { date: "2023-12", 患者满意度: 96, 医生效率: 90, 治疗成功率: 91 },
]

export function TrendReports() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>趋势报告</CardTitle>
            <CardDescription>关键指标的长期趋势分析</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="year">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">过去30天</SelectItem>
                <SelectItem value="quarter">过去3个月</SelectItem>
                <SelectItem value="half">过去6个月</SelectItem>
                <SelectItem value="year">过去12个月</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              患者满意度: {
                label: "患者满意度",
                color: "hsl(var(--chart-1))",
              },
              医生效率: {
                label: "医生效率",
                color: "hsl(var(--chart-2))",
              },
              治疗成功率: {
                label: "治疗成功率",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[60, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="患者满意度"
                  stroke="var(--color-患者满意度)"
                  name="患者满意度"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="医生效率" stroke="var(--color-医生效率)" name="医生效率" />
                <Line type="monotone" dataKey="治疗成功率" stroke="var(--color-治疗成功率)" name="治疗成功率" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">患者满意度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">
                较上年 <span className="text-green-500">↑ 8%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">医生效率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90%</div>
              <p className="text-xs text-muted-foreground">
                较上年 <span className="text-green-500">↑ 12%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">治疗成功率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">
                较上年 <span className="text-green-500">↑ 10%</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

// 添加TrendReports作为命名导出
export { TrendReports as default }
