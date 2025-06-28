"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ChevronDown } from "lucide-react"

// 模拟最近病例数据
const recentCases = [
  {
    id: "CASE-001",
    patientName: "张三",
    patientId: "P-10045",
    age: 45,
    gender: "男",
    chiefComplaint: "持续性头痛，伴有视力模糊",
    diagnosis: "偏头痛",
    aiDiagnosis: "偏头痛",
    doctorAction: "采纳",
    date: "2023-05-15",
    time: "09:30",
    doctor: "李医生",
    department: "神经内科",
  },
  {
    id: "CASE-002",
    patientName: "李四",
    patientId: "P-10078",
    age: 62,
    gender: "男",
    chiefComplaint: "胸痛，呼吸急促",
    diagnosis: "心绞痛",
    aiDiagnosis: "心绞痛",
    doctorAction: "采纳",
    date: "2023-05-16",
    time: "14:15",
    doctor: "王医生",
    department: "心内科",
  },
  {
    id: "CASE-003",
    patientName: "王五",
    patientId: "P-10103",
    age: 35,
    gender: "男",
    chiefComplaint: "咳嗽，发热，胸痛",
    diagnosis: "支气管炎",
    aiDiagnosis: "社区获得性肺炎",
    doctorAction: "修改",
    date: "2023-05-17",
    time: "11:45",
    doctor: "张医生",
    department: "呼吸科",
  },
  {
    id: "CASE-004",
    patientName: "赵六",
    patientId: "P-10156",
    age: 50,
    gender: "男",
    chiefComplaint: "上腹部疼痛，恶心",
    diagnosis: "消化性溃疡",
    aiDiagnosis: "胃炎",
    doctorAction: "修改",
    date: "2023-05-18",
    time: "16:30",
    doctor: "刘医生",
    department: "消化内科",
  },
  {
    id: "CASE-005",
    patientName: "钱七",
    patientId: "P-10189",
    age: 28,
    gender: "女",
    chiefComplaint: "关节疼痛，皮疹",
    diagnosis: "系统性红斑狼疮",
    aiDiagnosis: "系统性红斑狼疮",
    doctorAction: "采纳",
    date: "2023-05-19",
    time: "10:00",
    doctor: "陈医生",
    department: "风湿免疫科",
  },
]

export function RecentCases() {
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤病例数据
  const filteredCases = recentCases.filter(
    (caseItem) =>
      caseItem.patientName.includes(searchTerm) ||
      caseItem.patientId.includes(searchTerm) ||
      caseItem.diagnosis.includes(searchTerm) ||
      caseItem.department.includes(searchTerm),
  )

  // 根据医生行动返回对应的徽章颜色
  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "采纳":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "修改":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "拒绝":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>最近病例</CardTitle>
        <CardDescription>查看最近处理的病例及AI辅助诊断情况</CardDescription>

        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索病例、患者或诊断..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            筛选
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>病例ID</TableHead>
                <TableHead>患者信息</TableHead>
                <TableHead>主诉</TableHead>
                <TableHead>诊断结果</TableHead>
                <TableHead>AI辅助诊断</TableHead>
                <TableHead>医生操作</TableHead>
                <TableHead>就诊时间</TableHead>
                <TableHead>科室/医生</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    未找到匹配的病例记录
                  </TableCell>
                </TableRow>
              ) : (
                filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{caseItem.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {caseItem.patientId} · {caseItem.age}岁 · {caseItem.gender}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={caseItem.chiefComplaint}>
                      {caseItem.chiefComplaint}
                    </TableCell>
                    <TableCell>{caseItem.diagnosis}</TableCell>
                    <TableCell>{caseItem.aiDiagnosis}</TableCell>
                    <TableCell>
                      <Badge className={getActionBadgeColor(caseItem.doctorAction)} variant="outline">
                        {caseItem.doctorAction}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>{caseItem.date}</div>
                      <div className="text-sm text-muted-foreground">{caseItem.time}</div>
                    </TableCell>
                    <TableCell>
                      <div>{caseItem.department}</div>
                      <div className="text-sm text-muted-foreground">{caseItem.doctor}</div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
