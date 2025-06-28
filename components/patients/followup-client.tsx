"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Calendar, Search, Phone, Mail, MessageSquare, CheckCircle, Clock, AlertCircle, User } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { cn } from "@/lib/utils"

// 模拟随访数据
const followupData = [
  {
    id: "F-20240505-001",
    patientId: "P-20240428-001",
    patientName: "张伟",
    scheduledDate: "2024-05-05",
    purpose: "冠心病复诊",
    method: "电话随访",
    status: "upcoming",
    doctor: "李医生",
    notes: "检查用药情况，评估症状改善情况",
    priority: "高",
  },
  {
    id: "F-20240503-002",
    patientId: "P-20240427-015",
    patientName: "李敏",
    scheduledDate: "2024-05-03",
    purpose: "甲状腺功能复查",
    method: "门诊随访",
    status: "upcoming",
    doctor: "王医生",
    notes: "复查甲状腺功能，调整药物剂量",
    priority: "中",
  },
  {
    id: "F-20240428-003",
    patientId: "P-20240426-042",
    patientName: "王强",
    scheduledDate: "2024-04-28",
    purpose: "心律失常复诊",
    method: "视频随访",
    status: "overdue",
    doctor: "赵医生",
    notes: "评估心律失常控制情况，检查药物副作用",
    priority: "高",
  },
  {
    id: "F-20240425-004",
    patientId: "P-20240425-083",
    patientName: "赵红",
    scheduledDate: "2024-04-25",
    purpose: "妊娠期糖尿病管理",
    method: "电话随访",
    status: "completed",
    doctor: "张医生",
    notes: "检查血糖监测记录，评估饮食控制情况",
    priority: "中",
  },
  {
    id: "F-20240420-005",
    patientId: "P-20240424-027",
    patientName: "陈明",
    scheduledDate: "2024-04-20",
    purpose: "肺功能复查",
    method: "门诊随访",
    status: "completed",
    doctor: "刘医生",
    notes: "复查肺功能，评估用药效果",
    priority: "中",
  },
]

// 根据状态过滤数据
const filterFollowupsByStatus = (followups: any[], status: string) => {
  if (status === "all") return followups
  return followups.filter((followup) => followup.status === status)
}

// 获取状态标签样式
const getStatusBadge = (status: string) => {
  switch (status) {
    case "upcoming":
      return {
        icon: <Clock className="h-4 w-4" />,
        text: "即将到期",
        className: "bg-blue-100 text-blue-800",
      }
    case "overdue":
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        text: "已逾期",
        className: "bg-red-100 text-red-800",
      }
    case "completed":
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        text: "已完成",
        className: "bg-green-100 text-green-800",
      }
    default:
      return {
        icon: <Clock className="h-4 w-4" />,
        text: "未知状态",
        className: "bg-gray-100 text-gray-800",
      }
  }
}

// 获取方法图标
const getMethodIcon = (method: string) => {
  switch (method) {
    case "电话随访":
      return <Phone className="h-4 w-4 text-medical-600" />
    case "视频随访":
      return <MessageSquare className="h-4 w-4 text-medical-600" />
    case "门诊随访":
      return <User className="h-4 w-4 text-medical-600" />
    case "邮件随访":
      return <Mail className="h-4 w-4 text-medical-600" />
    default:
      return <Calendar className="h-4 w-4 text-medical-600" />
  }
}

export function FollowupClient({ status = "all" }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // 过滤随访计划
  const filteredFollowups = filterFollowupsByStatus(followupData, status).filter((followup) => {
    // 搜索过滤
    const matchesSearch =
      searchTerm === "" ||
      followup.patientName.includes(searchTerm) ||
      followup.purpose.includes(searchTerm) ||
      followup.doctor.includes(searchTerm)

    // 方法过滤
    const matchesMethod = selectedMethod === "all" || followup.method === selectedMethod

    // 日期过滤
    const matchesDate = !selectedDate || followup.scheduledDate === selectedDate.toISOString().split("T")[0]

    return matchesSearch && matchesMethod && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-500 h-4 w-4" />
          <Input
            placeholder="搜索患者姓名、随访目的或医生..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <div className="w-40">
            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
              <option value="all">所有方式</option>
              <option value="电话随访">电话随访</option>
              <option value="视频随访">视频随访</option>
              <option value="门诊随访">门诊随访</option>
              <option value="邮件随访">邮件随访</option>
            </Select>
          </div>

          <DatePicker date={selectedDate} setDate={setSelectedDate} placeholder="选择日期" />

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedDate(undefined)
              setSelectedMethod("all")
            }}
          >
            重置
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFollowups.length > 0 ? (
          filteredFollowups.map((followup) => {
            const statusBadge = getStatusBadge(followup.status)
            const methodIcon = getMethodIcon(followup.method)

            return (
              <Card key={followup.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-medical-100 p-3 rounded-lg">{methodIcon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{followup.patientName}</h3>
                          <span className="text-xs bg-medical-100 text-medical-800 px-2 py-0.5 rounded-full">
                            {followup.patientId}
                          </span>
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                              statusBadge.className,
                            )}
                          >
                            {statusBadge.icon}
                            {statusBadge.text}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-medical-800 mt-1">{followup.purpose}</p>
                        <p className="text-sm text-medical-600 mt-1">{followup.notes}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-medical-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {followup.scheduledDate}
                          </div>
                          <div>{followup.method}</div>
                          <div>{followup.doctor}</div>
                          <div className="flex items-center">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full mr-1",
                                followup.priority === "高"
                                  ? "bg-red-500"
                                  : followup.priority === "中"
                                    ? "bg-yellow-500"
                                    : "bg-green-500",
                              )}
                            ></span>
                            {followup.priority}优先级
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      {followup.status !== "completed" && (
                        <MedicalButton variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          标记完成
                        </MedicalButton>
                      )}

                      {followup.method === "电话随访" && (
                        <MedicalButton variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          拨打电话
                        </MedicalButton>
                      )}

                      {followup.method === "视频随访" && (
                        <MedicalButton variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          发起视频
                        </MedicalButton>
                      )}

                      <MedicalButton className="bg-medical-gradient text-white" size="sm">
                        查看详情
                      </MedicalButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="text-center py-8 text-medical-500">未找到符合条件的随访计划</div>
        )}
      </div>
    </div>
  )
}
