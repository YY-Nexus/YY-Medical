"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { FileText, Download, Eye, Search, Calendar } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"

// 模拟病历数据
const medicalRecords = [
  {
    id: "MR-20240428-001",
    patientId: "P-20240428-001",
    patientName: "张伟",
    recordType: "门诊病历",
    department: "心内科",
    doctor: "李医生",
    date: "2024-04-28",
    description: "患者因胸闷、气短来诊，诊断为冠心病急性发作",
    fileType: "pdf",
  },
  {
    id: "MR-20240428-002",
    patientId: "P-20240427-015",
    patientName: "李敏",
    recordType: "检验报告",
    department: "检验科",
    doctor: "王医生",
    date: "2024-04-26",
    description: "甲状腺功能检查，TSH、T3、T4均异常",
    fileType: "pdf",
  },
  {
    id: "MR-20240427-003",
    patientId: "P-20240426-042",
    patientName: "王强",
    recordType: "影像报告",
    department: "放射科",
    doctor: "赵医生",
    date: "2024-04-20",
    description: "冠状动脉CT检查，显示左前降支狭窄约70%",
    fileType: "dicom",
  },
  {
    id: "MR-20240426-004",
    patientId: "P-20240425-083",
    patientName: "赵红",
    recordType: "检验报告",
    department: "检验科",
    doctor: "张医生",
    date: "2024-04-22",
    description: "血糖监测，空腹血糖6.8mmol/L，餐后2小时血糖9.2mmol/L",
    fileType: "pdf",
  },
  {
    id: "MR-20240425-005",
    patientId: "P-20240424-027",
    patientName: "陈明",
    recordType: "影像报告",
    department: "放射科",
    doctor: "刘医生",
    date: "2024-04-18",
    description: "胸部CT检查，显示双肺弥漫性病变",
    fileType: "dicom",
  },
]

// 根据记录类型过滤数据
const filterRecordsByType = (records: any[], type: string) => {
  if (type === "all") return records
  if (type === "images") return records.filter((record) => record.recordType.includes("影像"))
  if (type === "lab") return records.filter((record) => record.recordType.includes("检验"))
  return records
}

export function MedicalRecordsClient({ recordType = "all" }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // 过滤记录
  const filteredRecords = filterRecordsByType(medicalRecords, recordType).filter((record) => {
    // 搜索过滤
    const matchesSearch =
      searchTerm === "" ||
      record.patientName.includes(searchTerm) ||
      record.description.includes(searchTerm) ||
      record.doctor.includes(searchTerm)

    // 部门过滤
    const matchesDepartment = selectedDepartment === "all" || record.department === selectedDepartment

    // 日期过滤
    const matchesDate = !selectedDate || record.date === selectedDate.toISOString().split("T")[0]

    return matchesSearch && matchesDepartment && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-500 h-4 w-4" />
          <Input
            placeholder="搜索患者姓名、医生或描述..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <div className="w-40">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <option value="all">所有科室</option>
              <option value="心内科">心内科</option>
              <option value="检验科">检验科</option>
              <option value="放射科">放射科</option>
            </Select>
          </div>

          <DatePicker date={selectedDate} setDate={setSelectedDate} placeholder="选择日期" />

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedDate(undefined)
              setSelectedDepartment("all")
            }}
          >
            重置
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-medical-100 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-medical-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{record.recordType}</h3>
                        <span className="text-xs bg-medical-100 text-medical-800 px-2 py-0.5 rounded-full">
                          {record.fileType.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-medical-600 mt-1">{record.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-medical-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {record.date}
                        </div>
                        <div>{record.department}</div>
                        <div>{record.doctor}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <MedicalButton variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      查看
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </MedicalButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-medical-500">未找到符合条件的病历记录</div>
        )}
      </div>
    </div>
  )
}
