"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarClock, Clock, Users, Video, Plus, Filter, Search, ChevronLeft, ChevronRight, X } from "lucide-react"

// 模拟会诊数据
const consultations = [
  {
    id: 1,
    title: "心脏病例远程会诊",
    date: "2025-05-20",
    time: "14:30-15:30",
    department: "心脏科",
    status: "已确认",
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
  },
  {
    id: 2,
    title: "脑卒中病例讨论",
    date: "2025-05-21",
    time: "10:00-11:00",
    department: "神经科",
    status: "待确认",
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
  },
  {
    id: 3,
    title: "骨折术后康复讨论",
    date: "2025-05-22",
    time: "15:00-16:00",
    department: "骨科",
    status: "已确认",
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
  },
  {
    id: 4,
    title: "糖尿病并发症讨论",
    date: "2025-05-23",
    time: "09:30-10:30",
    department: "内分泌科",
    status: "已取消",
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
  },
  {
    id: 5,
    title: "肺部感染病例讨论",
    date: "2025-05-24",
    time: "13:00-14:00",
    department: "呼吸科",
    status: "待确认",
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
  },
]

// 获取状态对应的样式
const getStatusStyle = (status) => {
  switch (status) {
    case "已确认":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "待确认":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "已取消":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function ScheduleClient() {
  const [date, setDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("calendar")
  const [showNewConsultation, setShowNewConsultation] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // 过滤会诊列表
  const filteredConsultations = consultations.filter((consultation) => {
    // 搜索过滤
    if (searchQuery && !consultation.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    // 科室过滤
    if (selectedDepartment && consultation.department !== selectedDepartment) {
      return false
    }
    // 状态过滤
    if (selectedStatus && consultation.status !== selectedStatus) {
      return false
    }
    return true
  })

  // 根据日期获取当天的会诊
  const getDayConsultations = (day) => {
    const formattedDate = day.toISOString().split("T")[0]
    return consultations.filter((consultation) => consultation.date === formattedDate)
  }

  // 自定义日期渲染
  const renderDay = (day) => {
    const dayConsultations = getDayConsultations(day)
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {dayConsultations.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setActiveTab("calendar")}>
            <CalendarClock className="w-4 h-4 mr-2" />
            日历视图
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveTab("list")}>
            <Users className="w-4 h-4 mr-2" />
            列表视图
          </Button>
        </div>
        <Dialog open={showNewConsultation} onOpenChange={setShowNewConsultation}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建会诊
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>安排新的远程会诊</DialogTitle>
              <DialogDescription>填写以下信息创建新的远程会诊预约。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consultation-title">会诊标题</Label>
                  <Input id="consultation-title" placeholder="输入会诊标题" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">科室</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="选择科室" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xinzk">心脏科</SelectItem>
                      <SelectItem value="shenjk">神经科</SelectItem>
                      <SelectItem value="guke">骨科</SelectItem>
                      <SelectItem value="nfmk">内分泌科</SelectItem>
                      <SelectItem value="hxke">呼吸科</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">日期</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">时间</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="time-start" type="time" />
                    <Input id="time-end" type="time" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient">患者信息</Label>
                <Select>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="选择患者" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zm58">张明 (58岁) - 冠心病</SelectItem>
                    <SelectItem value="lq65">李强 (65岁) - 脑卒中</SelectItem>
                    <SelectItem value="wl42">王丽 (42岁) - 骨折</SelectItem>
                    <SelectItem value="zg55">赵刚 (55岁) - 糖尿病</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">参与医生</Label>
                <div className="border rounded-md p-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      王医生 <X className="h-3 w-3 cursor-pointer" />
                    </Badge>
                    <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      李医生 <X className="h-3 w-3 cursor-pointer" />
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="搜索医生..." className="flex-1" />
                    <Button variant="outline" size="sm">
                      添加
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">会诊说明</Label>
                <Textarea id="description" placeholder="输入会诊目的和要点..." />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify" />
                <Label htmlFor="notify">通知所有参与者</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewConsultation(false)}>
                取消
              </Button>
              <Button onClick={() => setShowNewConsultation(false)}>创建会诊</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {activeTab === "calendar" ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>会诊日历</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {date.toLocaleDateString("zh-CN", { year: "numeric", month: "long" })}
                </span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              renderDay={renderDay}
            />

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                {date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })} 的会诊
              </h3>
              <div className="space-y-4">
                {getDayConsultations(date).length > 0 ? (
                  getDayConsultations(date).map((consultation) => (
                    <Card key={consultation.id} className="overflow-hidden">
                      <div
                        className={`h-1.5 w-full ${
                          consultation.status === "已确认"
                            ? "bg-green-500"
                            : consultation.status === "待确认"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{consultation.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{consultation.time}</span>
                              <span className="text-xs">•</span>
                              <span>{consultation.department}</span>
                            </div>
                          </div>
                          <Badge className={getStatusStyle(consultation.status)}>{consultation.status}</Badge>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-muted-foreground mb-1">参与医生</div>
                          <div className="flex -space-x-2">
                            {consultation.participants.map((participant) => (
                              <Avatar key={participant.id} className="border-2 border-background h-8 w-8">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                                <AvatarFallback>{participant.name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">患者：</span>
                            <span>
                              {consultation.patient.name} ({consultation.patient.age}岁)
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              详情
                            </Button>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-1" />
                              进入会诊
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarClock className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>当天没有安排会诊</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => setShowNewConsultation(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      安排会诊
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>会诊列表</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索会诊..."
                    className="pl-8 w-[200px]"
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="所有状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有状态</SelectItem>
                    <SelectItem value="已确认">已确认</SelectItem>
                    <SelectItem value="待确认">待确认</SelectItem>
                    <SelectItem value="已取消">已取消</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                      状态
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredConsultations.map((consultation) => (
                    <tr key={consultation.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium">{consultation.title}</div>
                        <div className="text-sm text-muted-foreground">
                          患者: {consultation.patient.name} ({consultation.patient.age}岁)
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {new Date(consultation.date).toLocaleDateString("zh-CN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">{consultation.time}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{consultation.department}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {consultation.participants.slice(0, 3).map((participant) => (
                            <Avatar key={participant.id} className="border-2 border-background h-8 w-8">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback>{participant.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {consultation.participants.length > 3 && (
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                              +{consultation.participants.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge className={getStatusStyle(consultation.status)}>{consultation.status}</Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            详情
                          </Button>
                          {consultation.status !== "已取消" && (
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-1" />
                              进入会诊
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredConsultations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>没有找到符合条件的会诊</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setSelectedDepartment("")
                      setSelectedStatus("")
                      setSearchQuery("")
                    }}
                  >
                    清除筛选条件
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
