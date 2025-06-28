"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, FileText, Clock, ChevronRight } from "lucide-react"

// 模拟活跃项目数据
const activeProjects = [
  {
    id: "proj-001",
    title: "2型糖尿病早期干预研究",
    type: "临床试验",
    status: "进行中",
    progress: 65,
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    participants: 120,
    leadResearcher: {
      name: "王教授",
      avatar: "/compassionate-doctor-consultation.png",
    },
    team: [
      { name: "李医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "张医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "赵医生", avatar: "/compassionate-doctor-consultation.png" },
    ],
  },
  {
    id: "proj-002",
    title: "高血压患者生活方式干预效果研究",
    type: "观察性研究",
    status: "进行中",
    progress: 42,
    startDate: "2025-02-10",
    endDate: "2025-10-15",
    participants: 85,
    leadResearcher: {
      name: "李教授",
      avatar: "/compassionate-doctor-consultation.png",
    },
    team: [
      { name: "王医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "刘医生", avatar: "/compassionate-doctor-consultation.png" },
    ],
  },
  {
    id: "proj-003",
    title: "AI辅助诊断系统在心血管疾病中的应用",
    type: "转化医学",
    status: "进行中",
    progress: 78,
    startDate: "2024-11-05",
    endDate: "2025-08-20",
    participants: 150,
    leadResearcher: {
      name: "张教授",
      avatar: "/compassionate-doctor-consultation.png",
    },
    team: [
      { name: "王医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "李医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "钱医生", avatar: "/compassionate-doctor-consultation.png" },
    ],
  },
  {
    id: "proj-004",
    title: "慢性肾病患者生物标志物研究",
    type: "基础研究",
    status: "进行中",
    progress: 35,
    startDate: "2025-03-01",
    endDate: "2026-02-28",
    participants: 60,
    leadResearcher: {
      name: "刘教授",
      avatar: "/compassionate-doctor-consultation.png",
    },
    team: [
      { name: "张医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "孙医生", avatar: "/compassionate-doctor-consultation.png" },
    ],
  },
  {
    id: "proj-005",
    title: "老年人群跌倒风险预测模型研究",
    type: "流行病学",
    status: "进行中",
    progress: 22,
    startDate: "2025-03-15",
    endDate: "2026-03-14",
    participants: 200,
    leadResearcher: {
      name: "赵教授",
      avatar: "/compassionate-doctor-consultation.png",
    },
    team: [
      { name: "王医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "钱医生", avatar: "/compassionate-doctor-consultation.png" },
      { name: "孙医生", avatar: "/compassionate-doctor-consultation.png" },
    ],
  },
]

export function ActiveProjects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  // 切换展开/折叠
  const toggleExpand = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>活跃研究项目</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeProjects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden">
              <div className="p-3 cursor-pointer hover:bg-muted/50" onClick={() => toggleExpand(project.id)}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground">{project.type}</div>
                  </div>
                  <Badge className="bg-medical-500">{project.status}</Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>项目进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{project.startDate}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {expandedProject === project.id && (
                <div className="p-3 bg-muted border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-white rounded-md border">
                      <Calendar className="w-4 h-4 text-medical-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">项目周期</div>
                        <div className="text-sm">
                          {project.startDate} 至 {project.endDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-md border">
                      <Users className="w-4 h-4 text-medical-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">参与人数</div>
                        <div className="text-sm">{project.participants} 人</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-medium mb-2">研究团队</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-medical-500">
                        <AvatarImage
                          src={project.leadResearcher.avatar || "/placeholder.svg"}
                          alt={project.leadResearcher.name}
                        />
                        <AvatarFallback>{project.leadResearcher.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{project.leadResearcher.name}</div>
                        <div className="text-xs text-muted-foreground">首席研究员</div>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      {project.team.map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border border-white -ml-1 first:ml-0">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="ml-2 text-xs text-muted-foreground flex items-center">
                        +{project.team.length} 名团队成员
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      查看详情
                    </Button>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {Math.round(
                          (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        天剩余
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          查看所有项目
        </Button>
      </CardFooter>
    </Card>
  )
}
