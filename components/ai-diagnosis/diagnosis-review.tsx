"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Clock, User, Search, Tag, Calendar, FileText } from "lucide-react"

// 模拟待审核诊断数据
const mockPendingDiagnoses = [
  {
    id: "diag-001",
    patientId: "P-20230501",
    patientName: "张三",
    diagnosis: "肺结节",
    confidence: 0.92,
    status: "pending",
    date: "2023-11-15",
    assignedTo: "doctor-001",
    priority: "high",
    tags: ["肺结节", "需要复查"],
  },
  {
    id: "diag-002",
    patientId: "P-20230502",
    patientName: "李四",
    diagnosis: "肺炎",
    confidence: 0.88,
    status: "pending",
    date: "2023-11-14",
    assignedTo: null,
    priority: "medium",
    tags: ["肺炎"],
  },
  {
    id: "diag-003",
    patientId: "P-20230503",
    patientName: "王五",
    diagnosis: "正常",
    confidence: 0.95,
    status: "pending",
    date: "2023-11-13",
    assignedTo: "doctor-002",
    priority: "low",
    tags: ["正常"],
  },
  {
    id: "diag-004",
    patientId: "P-20230504",
    patientName: "赵六",
    diagnosis: "肺气肿",
    confidence: 0.85,
    status: "pending",
    date: "2023-11-12",
    assignedTo: null,
    priority: "high",
    tags: ["肺气肿", "紧急"],
  },
]

// 模拟已审核诊断数据
const mockReviewedDiagnoses = [
  {
    id: "diag-005",
    patientId: "P-20230505",
    patientName: "钱七",
    diagnosis: "肺结节",
    aiDiagnosis: "肺结节",
    confidence: 0.92,
    status: "confirmed",
    date: "2023-11-10",
    reviewedBy: "doctor-001",
    reviewDate: "2023-11-11",
    reviewComment: "AI诊断准确，确认为肺结节，建议进一步检查",
    tags: ["肺结节", "已确认"],
  },
  {
    id: "diag-006",
    patientId: "P-20230506",
    patientName: "孙八",
    diagnosis: "支气管炎",
    aiDiagnosis: "肺炎",
    confidence: 0.78,
    status: "corrected",
    date: "2023-11-09",
    reviewedBy: "doctor-002",
    reviewDate: "2023-11-10",
    reviewComment: "AI诊断不准确，实际为支气管炎，已修正",
    tags: ["支气管炎", "已修正"],
  },
  {
    id: "diag-007",
    patientId: "P-20230507",
    patientName: "周九",
    diagnosis: "正常",
    aiDiagnosis: "正常",
    confidence: 0.96,
    status: "confirmed",
    date: "2023-11-08",
    reviewedBy: "doctor-001",
    reviewDate: "2023-11-09",
    reviewComment: "确认正常，无异常发现",
    tags: ["正常", "已确认"],
  },
  {
    id: "diag-008",
    patientId: "P-20230508",
    patientName: "吴十",
    diagnosis: "肺癌",
    aiDiagnosis: "肺结节",
    confidence: 0.89,
    status: "corrected",
    date: "2023-11-07",
    reviewedBy: "doctor-003",
    reviewDate: "2023-11-08",
    reviewComment: "AI诊断为肺结节，但进一步检查发现为肺癌，已修正并安排治疗",
    tags: ["肺癌", "已修正", "紧急"],
  },
]

// 模拟医生数据
const mockDoctors = [
  { id: "doctor-001", name: "张医生", department: "呼吸科", avatar: "/caring-doctor.png" },
  { id: "doctor-002", name: "李医生", department: "放射科", avatar: "/caring-doctor.png" },
  { id: "doctor-003", name: "王医生", department: "肿瘤科", avatar: "/caring-doctor.png" },
]

export function DiagnosisReview() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterAssigned, setFilterAssigned] = useState("all")
  const [pendingDiagnoses, setPendingDiagnoses] = useState(mockPendingDiagnoses)
  const [reviewedDiagnoses, setReviewedDiagnoses] = useState(mockReviewedDiagnoses)
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null)
  const [reviewComment, setReviewComment] = useState("")
  const [correctedDiagnosis, setCorrectedDiagnosis] = useState("")
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewAction, setReviewAction] = useState<"confirm" | "correct" | null>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)

  // 过滤待审核诊断
  const filteredPendingDiagnoses = pendingDiagnoses.filter((diagnosis) => {
    const matchesSearch =
      diagnosis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = filterPriority === "all" || diagnosis.priority === filterPriority

    const matchesAssigned =
      filterAssigned === "all" ||
      (filterAssigned === "assigned" && diagnosis.assignedTo) ||
      (filterAssigned === "unassigned" && !diagnosis.assignedTo)

    return matchesSearch && matchesPriority && matchesAssigned
  })

  // 过滤已审核诊断
  const filteredReviewedDiagnoses = reviewedDiagnoses.filter(
    (diagnosis) =>
      diagnosis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 获取选中的诊断
  const getSelectedDiagnosis = () => {
    if (!selectedDiagnosis) return null

    if (activeTab === "pending") {
      return pendingDiagnoses.find((d) => d.id === selectedDiagnosis)
    } else {
      return reviewedDiagnoses.find((d) => d.id === selectedDiagnosis)
    }
  }

  // 获取医生信息
  const getDoctorInfo = (doctorId: string | null) => {
    if (!doctorId) return null
    return mockDoctors.find((d) => d.id === doctorId)
  }

  // 处理诊断审核
  const handleReview = () => {
    if (!selectedDiagnosis || !reviewAction) return

    const diagnosis = pendingDiagnoses.find((d) => d.id === selectedDiagnosis)
    if (!diagnosis) return

    const now = new Date().toISOString().split("T")[0]
    const currentUser = "doctor-001" // 模拟当前用户

    const reviewedDiagnosis = {
      ...diagnosis,
      aiDiagnosis: diagnosis.diagnosis,
      diagnosis: reviewAction === "correct" ? correctedDiagnosis : diagnosis.diagnosis,
      status: reviewAction === "confirm" ? "confirmed" : "corrected",
      reviewedBy: currentUser,
      reviewDate: now,
      reviewComment: reviewComment,
      tags:
        reviewAction === "confirm"
          ? [...diagnosis.tags.filter((t) => t !== "需要复查" && t !== "紧急"), "已确认"]
          : [...diagnosis.tags.filter((t) => t !== "需要复查" && t !== "紧急"), "已修正"],
    }

    // 更新状态
    setPendingDiagnoses((prev) => prev.filter((d) => d.id !== selectedDiagnosis))
    setReviewedDiagnoses((prev) => [reviewedDiagnosis, ...prev])

    // 重置表单
    setSelectedDiagnosis(null)
    setReviewComment("")
    setCorrectedDiagnosis("")
    setReviewAction(null)
    setIsReviewDialogOpen(false)

    toast({
      title: "诊断审核完成",
      description: `已${reviewAction === "confirm" ? "确认" : "修正"}患者 ${diagnosis.patientName} 的诊断结果`,
    })
  }

  // 处理分配医生
  const handleAssign = () => {
    if (!selectedDiagnosis || !selectedDoctor) return

    setPendingDiagnoses((prev) =>
      prev.map((d) => (d.id === selectedDiagnosis ? { ...d, assignedTo: selectedDoctor } : d)),
    )

    const diagnosis = pendingDiagnoses.find((d) => d.id === selectedDiagnosis)
    const doctor = mockDoctors.find((d) => d.id === selectedDoctor)

    setAssignDialogOpen(false)
    setSelectedDoctor(null)

    toast({
      title: "已分配医生",
      description: `已将患者 ${diagnosis?.patientName} 的诊断分配给 ${doctor?.name}`,
    })
  }

  // 处理更改优先级
  const handleChangePriority = (diagnosisId: string, priority: string) => {
    setPendingDiagnoses((prev) => prev.map((d) => (d.id === diagnosisId ? { ...d, priority } : d)))

    const diagnosis = pendingDiagnoses.find((d) => d.id === diagnosisId)

    toast({
      title: "已更改优先级",
      description: `已将患者 ${diagnosis?.patientName} 的诊断优先级更改为 ${
        priority === "high" ? "高" : priority === "medium" ? "中" : "低"
      }`,
    })
  }

  // 渲染优先级徽章
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">高</Badge>
      case "medium":
        return <Badge variant="default">中</Badge>
      case "low":
        return <Badge variant="outline">低</Badge>
      default:
        return null
    }
  }

  // 渲染状态徽章
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-500">
            已确认
          </Badge>
        )
      case "corrected":
        return (
          <Badge variant="default" className="bg-orange-500">
            已修正
          </Badge>
        )
      case "pending":
        return <Badge variant="outline">待审核</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>诊断结果审核</CardTitle>
          <CardDescription>审核AI诊断结果，确认或修正诊断，并分配给相关医生进行处理</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  待审核
                </TabsTrigger>
                <TabsTrigger value="reviewed" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  已审核
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="搜索患者或诊断..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[200px]"
                  />
                </div>

                {activeTab === "pending" && (
                  <>
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterAssigned} onValueChange={setFilterAssigned}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="分配状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="assigned">已分配</SelectItem>
                        <SelectItem value="unassigned">未分配</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <TabsContent value="pending" className="m-0">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>患者信息</TableHead>
                            <TableHead>诊断结果</TableHead>
                            <TableHead>置信度</TableHead>
                            <TableHead>优先级</TableHead>
                            <TableHead>分配状态</TableHead>
                            <TableHead>日期</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPendingDiagnoses.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-4">
                                没有找到匹配的诊断结果
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredPendingDiagnoses.map((diagnosis) => (
                              <TableRow
                                key={diagnosis.id}
                                className={`cursor-pointer ${selectedDiagnosis === diagnosis.id ? "bg-muted" : ""}`}
                                onClick={() => setSelectedDiagnosis(diagnosis.id)}
                              >
                                <TableCell>
                                  <div className="font-medium">{diagnosis.patientName}</div>
                                  <div className="text-sm text-muted-foreground">{diagnosis.patientId}</div>
                                </TableCell>
                                <TableCell>
                                  <div>{diagnosis.diagnosis}</div>
                                  <div className="flex gap-1 mt-1">
                                    {diagnosis.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div
                                    className={`font-medium ${
                                      diagnosis.confidence > 0.9
                                        ? "text-green-600"
                                        : diagnosis.confidence > 0.8
                                          ? "text-amber-600"
                                          : "text-red-600"
                                    }`}
                                  >
                                    {Math.round(diagnosis.confidence * 100)}%
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    defaultValue={diagnosis.priority}
                                    onValueChange={(value) => handleChangePriority(diagnosis.id, value)}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <SelectTrigger className="w-[80px]">
                                      <SelectValue>{renderPriorityBadge(diagnosis.priority)}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">
                                        <Badge variant="destructive">高</Badge>
                                      </SelectItem>
                                      <SelectItem value="medium">
                                        <Badge variant="default">中</Badge>
                                      </SelectItem>
                                      <SelectItem value="low">
                                        <Badge variant="outline">低</Badge>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  {diagnosis.assignedTo ? (
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage
                                          src={getDoctorInfo(diagnosis.assignedTo)?.avatar || "/placeholder.svg"}
                                        />
                                        <AvatarFallback>{getDoctorInfo(diagnosis.assignedTo)?.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm">{getDoctorInfo(diagnosis.assignedTo)?.name}</span>
                                    </div>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedDiagnosis(diagnosis.id)
                                        setAssignDialogOpen(true)
                                      }}
                                    >
                                      未分配
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">{diagnosis.date}</div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviewed" className="m-0">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>患者信息</TableHead>
                            <TableHead>诊断结果</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead>审核医生</TableHead>
                            <TableHead>审核日期</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReviewedDiagnoses.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4">
                                没有找到匹配的诊断结果
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredReviewedDiagnoses.map((diagnosis) => (
                              <TableRow
                                key={diagnosis.id}
                                className={`cursor-pointer ${selectedDiagnosis === diagnosis.id ? "bg-muted" : ""}`}
                                onClick={() => setSelectedDiagnosis(diagnosis.id)}
                              >
                                <TableCell>
                                  <div className="font-medium">{diagnosis.patientName}</div>
                                  <div className="text-sm text-muted-foreground">{diagnosis.patientId}</div>
                                </TableCell>
                                <TableCell>
                                  <div>{diagnosis.diagnosis}</div>
                                  {diagnosis.status === "corrected" && (
                                    <div className="text-sm text-muted-foreground">
                                      原AI诊断: {diagnosis.aiDiagnosis}
                                    </div>
                                  )}
                                  <div className="flex gap-1 mt-1">
                                    {diagnosis.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>{renderStatusBadge(diagnosis.status)}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={getDoctorInfo(diagnosis.reviewedBy)?.avatar || "/placeholder.svg"}
                                      />
                                      <AvatarFallback>{getDoctorInfo(diagnosis.reviewedBy)?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{getDoctorInfo(diagnosis.reviewedBy)?.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">{diagnosis.reviewDate}</div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              <div>
                {selectedDiagnosis ? (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">诊断详情</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(() => {
                        const diagnosis = getSelectedDiagnosis()
                        if (!diagnosis) return null

                        return (
                          <>
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <User className="h-4 w-4" /> 患者信息
                              </h3>
                              <div className="pl-6 mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">姓名:</span>
                                  <span className="font-medium">{diagnosis.patientName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">ID:</span>
                                  <span>{diagnosis.patientId}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4" /> 诊断结果
                              </h3>
                              <div className="pl-6 mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">诊断:</span>
                                  <span className="font-medium">{diagnosis.diagnosis}</span>
                                </div>
                                {"aiDiagnosis" in diagnosis && diagnosis.aiDiagnosis !== diagnosis.diagnosis && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">原AI诊断:</span>
                                    <span>{diagnosis.aiDiagnosis}</span>
                                  </div>
                                )}
                                {"confidence" in diagnosis && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">置信度:</span>
                                    <span
                                      className={`font-medium ${
                                        diagnosis.confidence > 0.9
                                          ? "text-green-600"
                                          : diagnosis.confidence > 0.8
                                            ? "text-amber-600"
                                            : "text-red-600"
                                      }`}
                                    >
                                      {Math.round(diagnosis.confidence * 100)}%
                                    </span>
                                  </div>
                                )}
                                {"status" in diagnosis && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">状态:</span>
                                    <span>{renderStatusBadge(diagnosis.status)}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> 时间信息
                              </h3>
                              <div className="pl-6 mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">诊断日期:</span>
                                  <span>{diagnosis.date}</span>
                                </div>
                                {"reviewDate" in diagnosis && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">审核日期:</span>
                                    <span>{diagnosis.reviewDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {"reviewedBy" in diagnosis && (
                              <div>
                                <h3 className="font-medium">审核医生</h3>
                                <div className="pl-6 mt-1">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={getDoctorInfo(diagnosis.reviewedBy)?.avatar || "/placeholder.svg"}
                                      />
                                      <AvatarFallback>{getDoctorInfo(diagnosis.reviewedBy)?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span>{getDoctorInfo(diagnosis.reviewedBy)?.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                      ({getDoctorInfo(diagnosis.reviewedBy)?.department})
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {"assignedTo" in diagnosis && diagnosis.assignedTo && (
                              <div>
                                <h3 className="font-medium">分配医生</h3>
                                <div className="pl-6 mt-1">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={getDoctorInfo(diagnosis.assignedTo)?.avatar || "/placeholder.svg"}
                                      />
                                      <AvatarFallback>{getDoctorInfo(diagnosis.assignedTo)?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span>{getDoctorInfo(diagnosis.assignedTo)?.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                      ({getDoctorInfo(diagnosis.assignedTo)?.department})
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <Tag className="h-4 w-4" /> 标签
                              </h3>
                              <div className="pl-6 mt-1">
                                <div className="flex flex-wrap gap-1">
                                  {diagnosis.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {"reviewComment" in diagnosis && (
                              <div>
                                <h3 className="font-medium">审核意见</h3>
                                <div className="pl-6 mt-1">
                                  <p className="text-sm border rounded p-2 bg-muted/50">{diagnosis.reviewComment}</p>
                                </div>
                              </div>
                            )}
                          </>
                        )
                      })()}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setSelectedDiagnosis(null)}>
                        关闭
                      </Button>

                      {activeTab === "pending" && (
                        <div className="flex gap-2">
                          {!getSelectedDiagnosis()?.assignedTo && (
                            <Button variant="outline" onClick={() => setAssignDialogOpen(true)}>
                              分配医生
                            </Button>
                          )}
                          <Button
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setReviewAction("confirm")
                              setIsReviewDialogOpen(true)
                            }}
                          >
                            确认诊断
                          </Button>
                          <Button
                            variant="default"
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => {
                              setReviewAction("correct")
                              setCorrectedDiagnosis(getSelectedDiagnosis()?.diagnosis || "")
                              setIsReviewDialogOpen(true)
                            }}
                          >
                            修正诊断
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="rounded-full bg-muted p-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 font-medium">选择诊断查看详情</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">
                        从左侧列表中选择一个诊断结果以查看详细信息
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* 审核对话框 */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{reviewAction === "confirm" ? "确认诊断" : "修正诊断"}</DialogTitle>
            <DialogDescription>
              {reviewAction === "confirm" ? "确认AI诊断结果准确无误" : "修正AI诊断结果并提供正确的诊断"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <h4 className="font-medium">患者信息</h4>
              <div className="text-sm">
                <p>
                  <span className="text-muted-foreground">姓名:</span> {getSelectedDiagnosis()?.patientName}
                </p>
                <p>
                  <span className="text-muted-foreground">ID:</span> {getSelectedDiagnosis()?.patientId}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">AI诊断结果</h4>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{getSelectedDiagnosis()?.diagnosis}</span>
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    (getSelectedDiagnosis()?.confidence || 0) > 0.9
                      ? "bg-green-100 text-green-800"
                      : (getSelectedDiagnosis()?.confidence || 0) > 0.8
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {Math.round((getSelectedDiagnosis()?.confidence || 0) * 100)}%
                </span>
              </div>
            </div>

            {reviewAction === "correct" && (
              <div className="space-y-2">
                <label htmlFor="corrected-diagnosis" className="font-medium">
                  修正后的诊断
                </label>
                <Input
                  id="corrected-diagnosis"
                  value={correctedDiagnosis}
                  onChange={(e) => setCorrectedDiagnosis(e.target.value)}
                  placeholder="输入正确的诊断结果"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="review-comment" className="font-medium">
                审核意见
              </label>
              <Textarea
                id="review-comment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="请输入您的审核意见和建议..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              取消
            </Button>
            <Button
              onClick={handleReview}
              disabled={reviewAction === "correct" && !correctedDiagnosis.trim()}
              className={
                reviewAction === "confirm" ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
              }
            >
              {reviewAction === "confirm" ? "确认诊断" : "提交修正"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 分配医生对话框 */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>分配医生</DialogTitle>
            <DialogDescription>为患者 {getSelectedDiagnosis()?.patientName} 的诊断结果分配负责医生</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="doctor-select" className="font-medium">
                选择医生
              </label>
              <Select value={selectedDoctor || ""} onValueChange={setSelectedDoctor}>
                <SelectTrigger id="doctor-select">
                  <SelectValue placeholder="选择医生" />
                </SelectTrigger>
                <SelectContent>
                  {mockDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{doctor.name}</span>
                        <span className="text-sm text-muted-foreground">({doctor.department})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAssign} disabled={!selectedDoctor}>
              确认分配
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
