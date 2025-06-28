"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  FileText,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  VolumeIcon as Vial,
  Clipboard,
  Download,
  Share2,
  MessageSquare,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Droplets,
} from "lucide-react"

// 模拟研究项目数据
const projectData = {
  id: "PROJ-001",
  title: "2型糖尿病早期干预研究",
  type: "临床试验",
  status: "进行中",
  startDate: "2025-01-15",
  endDate: "2025-12-31",
  description:
    "本研究旨在评估生活方式干预对2型糖尿病高危人群的预防效果。通过随机对照试验，比较综合生活方式干预与常规健康教育在预防糖尿病发生方面的效果差异。",
  objectives: [
    "评估综合生活方式干预对糖尿病高危人群血糖水平的影响",
    "分析干预措施对胰岛素抵抗和胰岛β细胞功能的改善作用",
    "探讨生活方式改变与糖尿病发生风险降低的关系",
    "评价干预措施的长期依从性和可持续性",
  ],
  leadResearcher: {
    id: "R-001",
    name: "王教授",
    title: "首席研究员",
    department: "内分泌科",
    avatar: "/compassionate-doctor-consultation.png",
  },
  team: [
    {
      id: "R-002",
      name: "李医生",
      title: "研究员",
      department: "内分泌科",
      avatar: "/compassionate-doctor-consultation.png",
    },
    {
      id: "R-003",
      name: "张医生",
      title: "研究员",
      department: "营养科",
      avatar: "/compassionate-doctor-consultation.png",
    },
    {
      id: "R-004",
      name: "赵医生",
      title: "研究助理",
      department: "内分泌科",
      avatar: "/compassionate-doctor-consultation.png",
    },
    {
      id: "R-005",
      name: "钱医生",
      title: "数据分析师",
      department: "医学统计",
      avatar: "/compassionate-doctor-consultation.png",
    },
  ],
  progress: 65,
  budget: {
    total: 120,
    used: 78,
    remaining: 42,
    currency: "万元",
  },
  participants: {
    target: 120,
    enrolled: 78,
    completed: 45,
    dropped: 5,
  },
  timeline: [
    {
      phase: "准备阶段",
      startDate: "2025-01-15",
      endDate: "2025-02-28",
      status: "已完成",
      objectives: "完成研究方案设计、获取伦理批准、组建研究团队并准备所有研究材料",
      milestones: ["研究方案获得伦理委员���批准", "完成研究团队组建", "完成研究材料准备", "完成数据收集系统搭建"],
      challenges: [
        {
          issue: "伦理审批延迟",
          solution: "提前与伦理委员会沟通，明确要求并及时修改方案",
        },
      ],
      deliverables: ["最终研究方案", "伦理批准文件", "知情同意书", "病例报告表"],
      notes: "准备阶段按计划顺利完成，为后续研究实施奠定了良好基础",
    },
    {
      phase: "招募阶段",
      startDate: "2025-03-01",
      endDate: "2025-06-30",
      status: "进行中",
      objectives: "筛选并招募符合条件的受试者，完成基线评估和随机分组",
      milestones: ["启动多中心招募", "完成50%目标受试者招募", "完成所有受试者基线评估"],
      challenges: [
        {
          issue: "招募进度慢于预期",
          solution: "扩大招募渠道，增加社区宣传力度",
        },
        {
          issue: "部分受试者基线数据不完整",
          solution: "优化数据收集流程，加强研究助理培训",
        },
      ],
      deliverables: ["受试者招募报告", "基线数据集", "随机分组结果"],
      notes: "目前已完成65%的招募目标，预计可按期完成",
    },
    {
      phase: "干预阶段",
      startDate: "2025-03-15",
      endDate: "2025-12-15",
      status: "进行中",
      objectives: "实施生活方式干预措施，进行定期随访和数据收集",
      milestones: ["所有受试者完成干预启动", "完成3个月随访", "完成6个月随访", "完成9个月随访"],
      challenges: [
        {
          issue: "部分受试者依从性不佳",
          solution: "增加随访频率，提供个性化指导和激励措施",
        },
      ],
      deliverables: ["干预实施记录", "随访数据集", "中期分析报告"],
      notes: "干预措施实施顺利，受试者总体依从性良好",
    },
    {
      phase: "分析阶段",
      startDate: "2025-12-16",
      endDate: "2025-12-31",
      status: "未开始",
      objectives: "完成数据清理、统计分析和结果解读",
      milestones: ["完成数据清理和质量控制", "完成主要终点分析", "完成次要终点分析", "完成研究报告撰写"],
      challenges: [],
      deliverables: ["最终数据集", "统计分析报告", "研究总结报告", "发表论文初稿"],
      notes: "将根据预设的统计分析计划进行数据分析",
    },
  ],
  experiments: [
    {
      id: "EXP-001",
      title: "2型糖尿病患者生活方式干预随机对照试验",
      type: "随机对照试验",
      status: "进行中",
      progress: 45,
    },
  ],
  publications: [
    {
      id: "PUB-001",
      title: "生活方式干预对2型糖尿病高危人群的影响：研究方案",
      journal: "中华糖尿病杂志",
      date: "2025-02-15",
      authors: "王教授, 李医生, 张医生",
      type: "研究方案",
      url: "#",
    },
  ],
  samples: {
    total: 234,
    types: [
      { type: "血液", count: 156 },
      { type: "尿液", count: 78 },
    ],
  },
  documents: [
    {
      id: "DOC-001",
      title: "研究方案",
      type: "方案文档",
      updatedAt: "2025-01-20",
      updatedBy: "王教授",
    },
    {
      id: "DOC-002",
      title: "知情同意书",
      type: "伦理文档",
      updatedAt: "2025-01-25",
      updatedBy: "李医生",
    },
    {
      id: "DOC-003",
      title: "病例报告表",
      type: "数据收集",
      updatedAt: "2025-02-05",
      updatedBy: "张医生",
    },
    {
      id: "DOC-004",
      title: "标准操作规程",
      type: "操作文档",
      updatedAt: "2025-02-10",
      updatedBy: "王教授",
    },
  ],
  funding: {
    source: "国家自然科学基金",
    grantNumber: "NSFC-2025-12345",
    amount: 120,
    currency: "万元",
    period: "2025-01-01 至 2025-12-31",
  },
  collaborations: [
    {
      institution: "北京协和医院",
      department: "内分泌科",
      contactPerson: "孙教授",
      role: "协作中心",
    },
    {
      institution: "上海交通大学医学院",
      department: "代谢病研究所",
      contactPerson: "周教授",
      role: "技术支持",
    },
  ],
  ethics: {
    committee: "医学伦理委员会",
    approvalNumber: "EC-2024-089",
    approvalDate: "2024-12-20",
    status: "已批准",
  },
}

// 获取状态徽章
const getStatusBadge = (status: string) => {
  switch (status) {
    case "进行中":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> 进行中
        </Badge>
      )
    case "已完成":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> 已完成
        </Badge>
      )
    case "未开始":
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> 未开始
        </Badge>
      )
    case "已暂停":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> 已暂停
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function ProjectDetails() {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedPhase, setExpandedPhase] = useState<string | null>("招募阶段")

  // 切换展开/折叠
  const togglePhase = (phase: string) => {
    setExpandedPhase(expandedPhase === phase ? null : phase)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">{projectData.type}</Badge>
              {getStatusBadge(projectData.status)}
            </div>
            <CardTitle className="text-xl">{projectData.title}</CardTitle>
            <CardDescription className="mt-1">
              项目ID: {projectData.id} | 周期: {projectData.startDate} 至 {projectData.endDate}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              分享
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              导出
            </Button>
            <Button className="bg-medical-600 hover:bg-medical-700">编辑项目</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Clipboard className="h-4 w-4" />
              概览
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              团队
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              时间线
            </TabsTrigger>
            <TabsTrigger value="experiments" className="flex items-center gap-1">
              <FlaskConical className="h-4 w-4" />
              试验
            </TabsTrigger>
            <TabsTrigger value="samples" className="flex items-center gap-1">
              <Vial className="h-4 w-4" />
              样本
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              文档
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">项目概述</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">项目描述</h3>
                      <p className="text-sm text-muted-foreground">{projectData.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">研究目标</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {projectData.objectives.map((objective, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">项目进度</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={projectData.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{projectData.progress}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">伦理审批</h3>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">委员会:</span>
                            <span>{projectData.ethics.committee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">批准号:</span>
                            <span>{projectData.ethics.approvalNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">批准日期:</span>
                            <span>{projectData.ethics.approvalDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">状态:</span>
                            <Badge variant="success" className="text-xs">
                              {projectData.ethics.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">资金来源</h3>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">来源:</span>
                            <span>{projectData.funding.source}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">资助号:</span>
                            <span>{projectData.funding.grantNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">金额:</span>
                            <span>
                              {projectData.funding.amount} {projectData.funding.currency}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">资助期:</span>
                            <span>{projectData.funding.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">最新发布</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {projectData.publications.length > 0 ? (
                        <div className="space-y-3">
                          {projectData.publications.map((publication) => (
                            <div key={publication.id} className="border rounded-md p-3">
                              <div className="flex items-start gap-2">
                                <FileText className="h-5 w-5 text-medical-600 mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-sm">{publication.title}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {publication.journal} | {publication.date}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{publication.authors}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {publication.type}
                                    </Badge>
                                    <Button variant="link" size="sm" className="h-auto p-0">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      查看
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">暂无发布</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">合作机构</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {projectData.collaborations.length > 0 ? (
                        <div className="space-y-3">
                          {projectData.collaborations.map((collaboration, index) => (
                            <div key={index} className="border rounded-md p-3">
                              <h4 className="font-medium text-sm">{collaboration.institution}</h4>
                              <p className="text-xs text-muted-foreground">
                                {collaboration.department} | {collaboration.role}
                              </p>
                              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span>联系人: {collaboration.contactPerson}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">暂无合作机构</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">首席研究员</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={projectData.leadResearcher.avatar || "/placeholder.svg"}
                          alt={projectData.leadResearcher.name}
                        />
                        <AvatarFallback>{projectData.leadResearcher.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{projectData.leadResearcher.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {projectData.leadResearcher.title} | {projectData.leadResearcher.department}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">项目统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">预算使用</h4>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(projectData.budget.used / projectData.budget.total) * 100}
                            className="h-2 flex-1"
                          />
                          <span className="text-sm font-medium">
                            {Math.round((projectData.budget.used / projectData.budget.total) * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>
                            已用: {projectData.budget.used} {projectData.budget.currency}
                          </span>
                          <span>
                            剩余: {projectData.budget.remaining} {projectData.budget.currency}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">受试者招募</h4>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(projectData.participants.enrolled / projectData.participants.target) * 100}
                            className="h-2 flex-1"
                          />
                          <span className="text-sm font-medium">
                            {Math.round((projectData.participants.enrolled / projectData.participants.target) * 100)}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="border rounded-md p-2 text-center">
                            <div className="text-sm font-medium">{projectData.participants.enrolled}</div>
                            <div className="text-xs text-muted-foreground">已招募</div>
                          </div>
                          <div className="border rounded-md p-2 text-center">
                            <div className="text-sm font-medium">{projectData.participants.target}</div>
                            <div className="text-xs text-muted-foreground">目标</div>
                          </div>
                          <div className="border rounded-md p-2 text-center">
                            <div className="text-sm font-medium">{projectData.participants.completed}</div>
                            <div className="text-xs text-muted-foreground">已完成</div>
                          </div>
                          <div className="border rounded-md p-2 text-center">
                            <div className="text-sm font-medium">{projectData.participants.dropped}</div>
                            <div className="text-xs text-muted-foreground">退出</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">样本收集</h4>
                        <div className="border rounded-md p-3">
                          <div className="text-sm font-medium mb-1">总计: {projectData.samples.total} 份</div>
                          <div className="space-y-1">
                            {projectData.samples.types.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="flex-1 flex items-center gap-1 text-xs">
                                  {item.type === "血液" ? (
                                    <Droplets className="h-3 w-3 text-red-500" />
                                  ) : (
                                    <Vial className="h-3 w-3 text-yellow-500" />
                                  )}
                                  <span>{item.type}</span>
                                </div>
                                <div className="text-xs">{item.count} 份</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">最近活动</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">招募了5名新受试者</p>
                          <p className="text-xs text-muted-foreground">2025-04-25 由 李医生 完成</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">更新了研究方案</p>
                          <p className="text-xs text-muted-foreground">2025-04-22 由 王教授 完成</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">收集了12份血液样本</p>
                          <p className="text-xs text-muted-foreground">2025-04-20 由 张医生 完成</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">研究团队</CardTitle>
                  <CardDescription>项目团队成员和角色</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarImage
                        src={projectData.leadResearcher.avatar || "/placeholder.svg"}
                        alt={projectData.leadResearcher.name}
                      />
                      <AvatarFallback>{projectData.leadResearcher.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg">{projectData.leadResearcher.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {projectData.leadResearcher.title} | {projectData.leadResearcher.department}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      首席研究员
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="font-medium">团队成员</h3>
                    <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
                      {projectData.team.map((member) => (
                        <div key={member.id} className="flex flex-col items-center text-center">
                          <Avatar className="h-12 w-12 mb-2">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-medium text-sm">{member.name}</h4>
                          <p className="text-xs text-muted-foreground">{member.title}</p>
                          <p className="text-xs text-muted-foreground">{member.department}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      添加团队成员
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg">团队管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="members" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="members">成员列表</TabsTrigger>
                      <TabsTrigger value="roles">角色与权限</TabsTrigger>
                      <TabsTrigger value="tasks">任务分配</TabsTrigger>
                    </TabsList>

                    <TabsContent value="members" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">共 {projectData.team.length + 1} 名团队成员</div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          导出名单
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>姓名</TableHead>
                              <TableHead>职位</TableHead>
                              <TableHead>部门</TableHead>
                              <TableHead>角色</TableHead>
                              <TableHead>加入时间</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={projectData.leadResearcher.avatar || "/placeholder.svg"}
                                      alt={projectData.leadResearcher.name}
                                    />
                                    <AvatarFallback>{projectData.leadResearcher.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{projectData.leadResearcher.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      ID: {projectData.leadResearcher.id}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{projectData.leadResearcher.title}</TableCell>
                              <TableCell>{projectData.leadResearcher.department}</TableCell>
                              <TableCell>
                                <Badge>首席研究员</Badge>
                              </TableCell>
                              <TableCell>2025-01-15</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            {projectData.team.map((member) => (
                              <TableRow key={member.id}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{member.name}</div>
                                      <div className="text-xs text-muted-foreground">ID: {member.id}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{member.title}</TableCell>
                                <TableCell>{member.department}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">团队成员</Badge>
                                </TableCell>
                                <TableCell>2025-01-20</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    <TabsContent value="roles" className="space-y-4">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>角色名称</TableHead>
                              <TableHead>描述</TableHead>
                              <TableHead>权限</TableHead>
                              <TableHead>成员数量</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">首席研究员</TableCell>
                              <TableCell>负责整个研究项目的设计、实施和管理</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    全部权限
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>1</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">研究员</TableCell>
                              <TableCell>负责具体研究工作的实施和数据收集</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    数据录入
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    样本管理
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    受试者管理
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>2</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">研究助理</TableCell>
                              <TableCell>协助研究员完成日常研究工作</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    数据录入
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    文档管理
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>1</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">数据分析师</TableCell>
                              <TableCell>负责研究数据的整理、分析和解读</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    数据查看
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    数据分析
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    报告生成
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>1</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="outline" className="flex items-center gap-1">
                          <Plus className="h-4 w-4" />
                          添加角色
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="tasks" className="space-y-4">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>任务名称</TableHead>
                              <TableHead>负责人</TableHead>
                              <TableHead>开始日期</TableHead>
                              <TableHead>截止日期</TableHead>
                              <TableHead>状态</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">受试者招募</TableCell>
                              <TableCell>李医生</TableCell>
                              <TableCell>2025-03-01</TableCell>
                              <TableCell>2025-06-30</TableCell>
                              <TableCell>{getStatusBadge("进行中")}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">基线数据收集</TableCell>
                              <TableCell>张医生</TableCell>
                              <TableCell>2025-03-01</TableCell>
                              <TableCell>2025-06-30</TableCell>
                              <TableCell>{getStatusBadge("进行中")}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">干预实施</TableCell>
                              <TableCell>王教授</TableCell>
                              <TableCell>2025-03-15</TableCell>
                              <TableCell>2025-12-15</TableCell>
                              <TableCell>{getStatusBadge("进行中")}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">样本收集与处理</TableCell>
                              <TableCell>赵医生</TableCell>
                              <TableCell>2025-03-15</TableCell>
                              <TableCell>2025-12-15</TableCell>
                              <TableCell>{getStatusBadge("进行中")}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">数据分析</TableCell>
                              <TableCell>钱医生</TableCell>
                              <TableCell>2025-12-16</TableCell>
                              <TableCell>2025-12-31</TableCell>
                              <TableCell>{getStatusBadge("未开始")}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  查看详情
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="outline" className="flex items-center gap-1">
                          <Plus className="h-4 w-4" />
                          添加任务
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">项目时间线</CardTitle>
                <CardDescription>研究项目各阶段进展</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectData.timeline.map((phase, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div
                        className={`p-4 cursor-pointer hover:bg-muted/50 ${
                          expandedPhase === phase.phase ? "bg-muted/50" : ""
                        }`}
                        onClick={() => togglePhase(phase.phase)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg">{phase.phase}</h3>
                              {getStatusBadge(phase.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {phase.startDate} 至 {phase.endDate}
                            </p>
                          </div>
                          {expandedPhase === phase.phase ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      {expandedPhase === phase.phase && (
                        <div className="p-4 border-t bg-muted/20">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm">阶段目标</h4>
                              <p className="text-sm mt-1">{phase.objectives}</p>
                            </div>
                            {phase.milestones && phase.milestones.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm">关键里程碑</h4>
                                <ul className="mt-1 space-y-1">
                                  {phase.milestones.map((milestone, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>{milestone}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {phase.challenges && phase.challenges.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm">挑战与解决方案</h4>
                                <ul className="mt-1 space-y-2">
                                  {phase.challenges.map((challenge, idx) => (
                                    <li key={idx} className="text-sm">
                                      <div className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span className="font-medium">{challenge.issue}</span>
                                          <p className="text-muted-foreground">{challenge.solution}</p>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {phase.deliverables && phase.deliverables.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm">阶段成果</h4>
                                <ul className="mt-1 space-y-1">
                                  {phase.deliverables.map((deliverable, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                      <span>{deliverable}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {phase.notes && (
                              <div>
                                <h4 className="font-medium text-sm">备注</h4>
                                <p className="text-sm text-muted-foreground mt-1">{phase.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">实验管理</CardTitle>
                <CardDescription>管理研究项目中的实验</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <FlaskConical className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">实验管理</h3>
                  <p className="text-muted-foreground max-w-md">
                    在这里您可以管理研究项目中的实验，包括实验设计、数据收集和结果分析。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="samples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">样本管理</CardTitle>
                <CardDescription>管理研究项目中的生物样本</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Vial className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">样本管理</h3>
                  <p className="text-muted-foreground max-w-md">
                    在这里您可以管理研究项目中的生物样本，包括样本收集、处理、存储和分析。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">文档管理</CardTitle>
                <CardDescription>管理研究项目中的文档</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">文档管理</h3>
                  <p className="text-muted-foreground max-w-md">
                    在这里您可以管理研究项目中的文档，包括研究方案、知情同意书、病例报告表等。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
