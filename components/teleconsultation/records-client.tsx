"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Download, Calendar, Clock, FileText, Video, FileDown, Printer } from "lucide-react"

// 模拟会诊记录数据
const consultationRecords = [
  {
    id: 1,
    title: "心脏病例远程会诊",
    date: "2025-04-25",
    time: "14:30-15:30",
    department: "心脏科",
    status: "已完成",
    result: "诊断确认",
    participants: [
      {
        id: 1,
        name: "王医生",
        role: "心脏科主任",
        hospital: "中心医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
      {
        id: 2,
        name: "李医生",
        role: "心脏外科医生",
        hospital: "中心医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
      {
        id: 3,
        name: "张医生",
        role: "放射科医生",
        hospital: "区域医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
    ],
    patient: { id: 101, name: "张明", age: 58, diagnosis: "冠心病，心肌缺血" },
    summary:
      "患者张明，58岁，男性，主诉胸痛、气短2周。心电图显示ST段压低，超声心动图显示左室前壁运动减弱。CT扫描显示左前降支有约70%的狭窄。诊断为冠心病，心肌缺血。建议考虑冠状动脉介入治疗（PCI）。",
    documents: [
      { id: 1, name: "患者病历摘要.pdf", type: "pdf", size: "2.4MB", date: "2025-04-25" },
      { id: 2, name: "心电图报告.pdf", type: "pdf", size: "1.8MB", date: "2025-04-26" },
      { id: 3, name: "超声心动图.pdf", type: "pdf", size: "3.2MB", date: "2025-04-26" },
      { id: 4, name: "CT扫描报告.pdf", type: "pdf", size: "4.5MB", date: "2025-04-27" },
    ],
    recording: true,
  },
  {
    id: 2,
    title: "脑卒中病例讨论",
    date: "2025-04-21",
    time: "10:00-11:00",
    department: "神经科",
    status: "已完成",
    result: "诊断修改",
    participants: [
      {
        id: 3,
        name: "张医生",
        role: "神经科主任",
        hospital: "区域医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
      {
        id: 4,
        name: "赵医生",
        role: "神经内科医生",
        hospital: "社区医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
    ],
    patient: { id: 102, name: "李强", age: 65, diagnosis: "缺血性脑卒中" },
    summary:
      "患者李强，65岁，男性，突发左侧肢体无力4小时。头颅CT未见明显异常，头颅MRI显示右侧大脑中动脉供血区新鲜梗死灶。初步诊断为急性缺血性脑卒中。经过讨论，建议立即进行静脉溶栓治疗，并考虑机械取栓。",
    documents: [
      { id: 5, name: "患者病历摘要.pdf", type: "pdf", size: "2.1MB", date: "2025-04-21" },
      { id: 6, name: "头颅CT报告.pdf", type: "pdf", size: "3.5MB", date: "2025-04-21" },
      { id: 7, name: "头颅MRI报告.pdf", type: "pdf", size: "5.2MB", date: "2025-04-21" },
    ],
    recording: true,
  },
  {
    id: 3,
    title: "骨折术后康复讨论",
    date: "2025-04-18",
    time: "15:00-16:00",
    department: "骨科",
    status: "已完成",
    result: "治疗方案优化",
    participants: [
      {
        id: 5,
        name: "刘医生",
        role: "骨科主任",
        hospital: "中心医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
      {
        id: 6,
        name: "陈医生",
        role: "康复科医生",
        hospital: "区域医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
    ],
    patient: { id: 103, name: "王丽", age: 42, diagnosis: "股骨颈骨折术后" },
    summary:
      "患者王丽，42岁，女性，股骨颈骨折术后2周。目前伤口愈合良好，但存在明显的疼痛和活动受限。经过讨论，建议调整康复方案，增加物理治疗频次，并优化疼痛管理策略。",
    documents: [
      { id: 8, name: "手术记录.pdf", type: "pdf", size: "1.9MB", date: "2025-04-04" },
      { id: 9, name: "术后X光片.jpg", type: "image", size: "2.8MB", date: "2025-04-11" },
      { id: 10, name: "康复评估报告.pdf", type: "pdf", size: "1.5MB", date: "2025-04-18" },
    ],
    recording: false,
  },
  {
    id: 4,
    title: "糖尿病并发症讨论",
    date: "2025-04-15",
    time: "09:30-10:30",
    department: "内分泌科",
    status: "已完成",
    result: "需进一步检查",
    participants: [
      {
        id: 7,
        name: "黄医生",
        role: "内分泌科主任",
        hospital: "中心医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
      {
        id: 8,
        name: "吴医生",
        role: "肾内科医生",
        hospital: "区域医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
    ],
    patient: { id: 104, name: "赵刚", age: 55, diagnosis: "2型糖尿病，糖尿病肾病" },
    summary:
      "患者赵刚，55岁，男性，2型糖尿病病史10年，近期出现蛋白尿和轻度肾功能不全。经过讨论，建议进行肾活检以明确诊断，并调整降糖方案，加强肾脏保护。",
    documents: [
      { id: 11, name: "血糖监测记录.pdf", type: "pdf", size: "1.2MB", date: "2025-04-10" },
      { id: 12, name: "肾功能检查报告.pdf", type: "pdf", size: "1.6MB", date: "2025-04-14" },
      { id: 13, name: "尿常规分析.pdf", type: "pdf", size: "0.9MB", date: "2025-04-14" },
    ],
    recording: true,
  },
  {
    id: 5,
    title: "肺部感染病例讨论",
    date: "2025-04-10",
    time: "13:00-14:00",
    department: "呼吸科",
    status: "已完成",
    result: "诊断确认",
    participants: [
      {
        id: 9,
        name: "郑医生",
        role: "呼吸科主任",
        hospital: "中心医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
      {
        id: 10,
        name: "孙医生",
        role: "感染科医生",
        hospital: "社区医院",
        avatar: "/compassionate-doctor-consultation.png",
      },
    ],
    patient: { id: 105, name: "张华", age: 70, diagnosis: "社区获得性肺炎" },
    summary:
      "患者张华，70岁，男性，发热、咳嗽、咳痰5天。胸部CT显示右肺下叶炎症。痰培养示肺炎链球菌。诊断为社区获得性肺炎。建议继续抗生素治疗，并加强支持治疗。",
    documents: [
      { id: 14, name: "胸部CT报告.pdf", type: "pdf", size: "3.8MB", date: "2025-04-09" },
      { id: 15, name: "痰培养结果.pdf", type: "pdf", size: "1.1MB", date: "2025-04-10" },
      { id: 16, name: "血常规检查.pdf", type: "pdf", size: "0.8MB", date: "2025-04-10" },
    ],
    recording: true,
  },
]

// 获取状态对应的样式
const getStatusStyle = (status) => {
  switch (status) {
    case "已完成":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "进行中":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "已取消":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

// 获取结果对应的样式
const getResultStyle = (result) => {
  switch (result) {
    case "诊断确认":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
    case "诊断修改":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "需进一步检查":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    case "治疗方案优化":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "转诊":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function RecordsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedResult, setSelectedResult] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  // 过滤会诊记录
  const filteredRecords = consultationRecords.filter((record) => {
    // 搜索过滤
    if (
      searchQuery &&
      !record.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !record.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !record.patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    // 科室过滤
    if (selectedDepartment && record.department !== selectedDepartment) {
      return false
    }
    // 结果过滤
    if (selectedResult && record.result !== selectedResult) {
      return false
    }
    // 日期范围过滤
    if (dateRange !== "all") {
      const recordDate = new Date(record.date)
      const today = new Date()
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(today.getDate() - 7)
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(today.getMonth() - 1)

      if (dateRange === "week" && recordDate < oneWeekAgo) {
        return false
      } else if (dateRange === "month" && recordDate < oneMonthAgo) {
        return false
      }
    }
    return true
  })

  // 打开记录详情
  const openRecordDetails = (record) => {
    setSelectedRecord(record)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>会诊记录</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索会诊记录..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="所有科室" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有科室</SelectItem>
                  <SelectItem value="心脏科">心脏科</SelectItem>
                  <SelectItem value="神经科">神经科</SelectItem>
                  <SelectItem value="骨科">骨科</SelectItem>
                  <SelectItem value="内分泌科">内分泌科</SelectItem>
                  <SelectItem value="呼吸科">呼吸科</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedResult} onValueChange={setSelectedResult}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="所有结果" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有结果</SelectItem>
                  <SelectItem value="诊断确认">诊断确认</SelectItem>
                  <SelectItem value="诊断修改">诊断修改</SelectItem>
                  <SelectItem value="需进一步检查">需进一步检查</SelectItem>
                  <SelectItem value="治疗方案优化">治疗方案优化</SelectItem>
                  <SelectItem value="转诊">转诊</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有时间</SelectItem>
                  <SelectItem value="week">最近一周</SelectItem>
                  <SelectItem value="month">最近一个月</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">全部记录</TabsTrigger>
              <TabsTrigger value="recordings">有录像记录</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    会诊信息
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    时间
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    科室
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    参与医生
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    结果
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords
                  .filter((record) => activeTab === "all" || (activeTab === "recordings" && record.recording))
                  .map((record) => (
                    <tr key={record.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium">{record.title}</div>
                        <div className="text-sm text-muted-foreground">
                          患者: {record.patient.name} ({record.patient.age}岁)
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {new Date(record.date).toLocaleDateString("zh-CN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">{record.time}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{record.department}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {record.participants.slice(0, 3).map((participant) => (
                            <Avatar key={participant.id} className="border-2 border-background h-8 w-8">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback>{participant.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {record.participants.length > 3 && (
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                              +{record.participants.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge className={getResultStyle(record.result)}>{record.result}</Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openRecordDetails(record)}>
                            查看详情
                          </Button>
                          {record.recording && (
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-1" />
                              查看录像
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {filteredRecords.filter((record) => activeTab === "all" || (activeTab === "recordings" && record.recording))
              .length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>没有找到符合条件的会诊记录</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDepartment("")
                    setSelectedResult("")
                    setDateRange("all")
                    setActiveTab("all")
                  }}
                >
                  清除筛选条件
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 会诊记录详情对话框 */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>会诊记录详情</DialogTitle>
              <DialogDescription>
                {new Date(selectedRecord.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {selectedRecord.time}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-medium">{selectedRecord.title}</h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(selectedRecord.date).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{selectedRecord.time}</span>
                    <span className="text-xs">•</span>
                    <span>{selectedRecord.department}</span>
                  </div>
                </div>
                <Badge className={getResultStyle(selectedRecord.result)}>{selectedRecord.result}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="font-medium mb-2">患者信息</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">姓名：</span>
                      <span className="font-medium">{selectedRecord.patient.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">年龄：</span>
                      <span>{selectedRecord.patient.age}岁</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">诊断：</span>
                      <span>{selectedRecord.patient.diagnosis}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">参与医生</h3>
                  <div className="space-y-2">
                    {selectedRecord.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <span className="font-medium">{participant.name}</span>
                          <span className="text-muted-foreground text-xs ml-1">
                            ({participant.role}, {participant.hospital})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-medium mb-2">会诊总结</h3>
                <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">
                  {selectedRecord.summary}
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-medium mb-2">相关文档</h3>
                <div className="border rounded-md divide-y">
                  {selectedRecord.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-sm">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {doc.size} · {doc.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setSelectedRecord(null)}>
                关闭
              </Button>
              <div className="flex gap-2">
                {selectedRecord.recording && (
                  <Button variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    查看录像
                  </Button>
                )}
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  打印
                </Button>
                <Button>
                  <FileDown className="h-4 w-4 mr-2" />
                  导出报告
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
