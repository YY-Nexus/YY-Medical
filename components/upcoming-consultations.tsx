"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, Video, FileText, MoreVertical } from "lucide-react"

// 模拟即将到来的会诊
const upcomingConsultations = [
  {
    id: "cons-001",
    title: "心脏病例远程会诊",
    patient: "张明",
    patientId: "P12345",
    date: "2025-04-29",
    time: "10:00-11:00",
    department: "心脏科",
    doctors: [
      { name: "王医生", hospital: "中心医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "李医生", hospital: "中心医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "张医生", hospital: "区域医院", avatar: "/compassionate-doctor-consultation.png" },
    ],
    status: "scheduled",
  },
  {
    id: "cons-002",
    title: "脑梗塞病例讨论",
    patient: "李华",
    patientId: "P12346",
    date: "2025-04-29",
    time: "14:30-15:30",
    department: "神经科",
    doctors: [
      { name: "赵医生", hospital: "中心医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "钱医生", hospital: "专科医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "孙医生", hospital: "区域医院", avatar: "/compassionate-doctor-consultation.png" },
    ],
    status: "scheduled",
  },
  {
    id: "cons-003",
    title: "骨折复杂病例讨论",
    patient: "刘强",
    patientId: "P12347",
    date: "2025-04-30",
    time: "09:00-10:00",
    department: "骨科",
    doctors: [
      { name: "周医生", hospital: "中心医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "吴医生", hospital: "社区医院", avatar: "/compassionate-doctor-consultation.png" },
    ],
    status: "scheduled",
  },
  {
    id: "cons-004",
    title: "糖尿病并发症讨论",
    patient: "王丽",
    patientId: "P12348",
    date: "2025-04-30",
    time: "15:00-16:00",
    department: "内科",
    doctors: [
      { name: "郑医生", hospital: "中心医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "王医生", hospital: "社区医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "李医生", hospital: "区域医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "李医生", hospital: "区域医院", avatar: "/compassionate-doctor-consultation.png" },
    ],
    status: "scheduled",
  },
  {
    id: "cons-005",
    title: "皮肤病疑难病例讨论",
    patient: "张伟",
    patientId: "P12349",
    date: "2025-05-02",
    time: "11:00-12:00",
    department: "皮肤科",
    doctors: [
      { name: "陈医生", hospital: "专科医院", avatar: "/compassionate-doctor-consultation.png" },
      { name: "林医生", hospital: "中心医院", avatar: "/compassionate-doctor-consultation.png" },
    ],
    status: "scheduled",
  },
]

export function UpcomingConsultations() {
  const [consultations, setConsultations] = useState(upcomingConsultations)

  // 加入会诊
  const joinConsultation = (id) => {
    // 实际应用中，这里会导航到会诊室
    console.log(`加入会诊: ${id}`)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>即将到来的会诊</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="border rounded-lg overflow-hidden">
              <div className="p-3 bg-muted">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{consultation.title}</div>
                  <Badge>{consultation.department}</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">患者: {consultation.patient}</div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{consultation.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{consultation.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {consultation.doctors.map((doctor, index) => (
                      <Avatar key={index} className="border-2 border-white w-6 h-6">
                        <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span>{consultation.doctors.length} 位医生</span>
                </div>
              </div>
              <div className="p-3 border-t flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    查看病��
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" onClick={() => joinConsultation(consultation.id)}>
                  <Video className="w-4 h-4 mr-1" />
                  加入会诊
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          查看所有会诊
        </Button>
      </CardFooter>
    </Card>
  )
}
