"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, RefreshCw } from "lucide-react"

const mockAnalysisData = [
  { category: "基因组学", projects: 15, completed: 12 },
  { category: "蛋白质组学", projects: 8, completed: 6 },
  { category: "代谢组学", projects: 12, completed: 10 },
  { category: "临床试验", projects: 20, completed: 18 },
]

export function ResearchAnalysisClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">研究分析</h1>
          <p className="text-muted-foreground">医学研究数据分析和统计</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>研究项目统计</CardTitle>
          <CardDescription>各类研究项目的进展情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer
              config={{
                projects: {
                  label: "总项目数",
                  color: "hsl(var(--chart-1))",
                },
                completed: {
                  label: "已完成",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="projects" fill="var(--color-projects)" name="总项目数" />
                  <Bar dataKey="completed" fill="var(--color-completed)" name="已完成" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
