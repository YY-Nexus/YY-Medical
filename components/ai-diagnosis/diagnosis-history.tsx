"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Filter, FileText, ArrowRight } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"

// 模拟诊断历史数据
const MOCK_HISTORY = [
  {
    id: "1",
    patientId: "P-20230501",
    patientName: "张三",
    date: "2023-05-01",
    diagnosis: "2型糖尿病",
    confidence: 0.92,
    status: "confirmed",
  },
  {
    id: "2",
    patientId: "P-20230502",
    patientName: "李四",
    date: "2023-05-02",
    diagnosis: "高血压",
    confidence: 0.88,
    status: "pending",
  },
  {
    id: "3",
    patientId: "P-20230503",
    patientName: "王五",
    date: "2023-05-03",
    diagnosis: "冠心病",
    confidence: 0.85,
    status: "revised",
  },
  {
    id: "4",
    patientId: "P-20230504",
    patientName: "赵六",
    date: "2023-05-04",
    diagnosis: "肺炎",
    confidence: 0.94,
    status: "confirmed",
  },
  {
    id: "5",
    patientId: "P-20230505",
    patientName: "钱七",
    date: "2023-05-05",
    diagnosis: "胃溃疡",
    confidence: 0.79,
    status: "pending",
  },
]

export function DiagnosisHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // 过滤诊断历史
  const filteredHistory = MOCK_HISTORY.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  // 状态徽章颜色
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">已确认</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">待确认</Badge>
      case "revised":
        return <Badge className="bg-blue-500">已修正</Badge>
      default:
        return <Badge>未知</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>诊断历史记录</CardTitle>
        <CardDescription>查看和管理过去的AI辅助诊断记录</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索患者姓名、ID或诊断..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DatePicker placeholder="开始日期" value={startDate} onChange={setStartDate} />
              <DatePicker placeholder="结束日期" value={endDate} onChange={setEndDate} />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-7 bg-slate-50 p-3 text-sm font-medium">
              <div>患者ID</div>
              <div>患者姓名</div>
              <div>诊断日期</div>
              <div className="col-span-2">诊断结果</div>
              <div>状态</div>
              <div className="text-right">操作</div>
            </div>
            <div className="divide-y">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <div key={item.id} className="grid grid-cols-7 p-3 text-sm">
                    <div className="font-medium">{item.patientId}</div>
                    <div>{item.patientName}</div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                      {item.date}
                    </div>
                    <div className="col-span-2">
                      <div>{item.diagnosis}</div>
                      <div className="text-xs text-gray-500">置信度: {(item.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div>{getStatusBadge(item.status)}</div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">未找到匹配的诊断记录</div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              显示 {filteredHistory.length} 条记录（共 {MOCK_HISTORY.length} 条）
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
