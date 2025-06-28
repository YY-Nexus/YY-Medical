"use client"

import { useState } from "react"
import { Search, Filter, FileText, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import React from "react"

// 模拟处方据
const prescriptions = [
  {
    id: "RX-2023-0001",
    patientName: "张三",
    patientId: "P-10045",
    doctorName: "李医生",
    department: "内科",
    date: "2023-05-15",
    status: "已完成",
    medications: [
      { name: "二甲双胍", dosage: "0.5g", frequency: "每日三次", duration: "30天" },
      { name: "阿托伐他汀", dosage: "20mg", frequency: "每晚一次", duration: "30天" },
    ],
    diagnosis: "2型糖尿病，高脂血症",
    notes: "饭后服用二甲双胍，睡前服用阿托伐他汀",
  },
  {
    id: "RX-2023-0002",
    patientName: "李四",
    patientId: "P-10078",
    doctorName: "王医生",
    department: "心内科",
    date: "2023-05-16",
    status: "待审核",
    medications: [
      { name: "氯沙坦", dosage: "50mg", frequency: "每日一次", duration: "30天" },
      { name: "阿司匹林", dosage: "100mg", frequency: "每日一次", duration: "30天" },
    ],
    diagnosis: "高血压，冠心病",
    notes: "监测血压，如收缩压低于100mmHg，停用氯沙坦",
  },
  {
    id: "RX-2023-0003",
    patientName: "王五",
    patientId: "P-10103",
    doctorName: "张医生",
    department: "呼吸科",
    date: "2023-05-17",
    status: "已发药",
    medications: [
      { name: "左氧氟沙星", dosage: "0.5g", frequency: "每日一次", duration: "7天" },
      { name: "布洛芬", dosage: "0.4g", frequency: "需要时", duration: "按需" },
    ],
    diagnosis: "社区获得性肺炎",
    notes: "完成抗生素疗程，即使症状改善也不要提前停药",
  },
  {
    id: "RX-2023-0004",
    patientName: "赵六",
    patientId: "P-10156",
    doctorName: "刘医生",
    department: "消化科",
    date: "2023-05-18",
    status: "已拒绝",
    medications: [
      { name: "奥美拉唑", dosage: "20mg", frequency: "每日两次", duration: "14天" },
      { name: "枸橼酸铋钾", dosage: "0.6g", frequency: "每日四次", duration: "14天" },
    ],
    diagnosis: "消化性溃疡",
    notes: "药物相互作用风险，需调整用药方案",
  },
  {
    id: "RX-2023-0005",
    patientName: "孙七",
    patientId: "P-10189",
    doctorName: "陈医生",
    department: "神经内科",
    date: "2023-05-19",
    status: "待审核",
    medications: [
      { name: "卡马西平", dosage: "200mg", frequency: "每日两次", duration: "30天" },
      { name: "维生素B1", dosage: "10mg", frequency: "每日一次", duration: "30天" },
    ],
    diagnosis: "三叉神经痛",
    notes: "逐渐增加剂量，观察不良反应",
  },
]

// 处方状态映射
const statusMap = {
  已完成: { color: "default", icon: CheckCircle },
  待审核: { color: "warning", icon: Clock },
  已发药: { color: "success", icon: CheckCircle },
  已拒绝: { color: "destructive", icon: XCircle },
}

export function PrescriptionManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [selectedPrescription, setSelectedPrescription] = useState<(typeof prescriptions)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [processingPrescription, setProcessingPrescription] = useState(false)
  const [processingResult, setProcessingResult] = useState<"approved" | "rejected" | null>(null)

  // 过滤处方
  const filteredPrescriptions = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.doctorName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "全部" || rx.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // 查看处方详情
  const viewPrescriptionDetail = (prescription: (typeof prescriptions)[0]) => {
    setSelectedPrescription(prescription)
    setIsDetailOpen(true)
  }

  // 处理处方（批准或拒绝）
  const processPrescription = (action: "approved" | "rejected") => {
    setProcessingPrescription(true)

    // 模拟API调用
    setTimeout(() => {
      if (selectedPrescription) {
        // 更新处方状态
        const index = prescriptions.findIndex((rx) => rx.id === selectedPrescription.id)
        if (index !== -1) {
          prescriptions[index].status = action === "approved" ? "已完成" : "已拒绝"
          setSelectedPrescription({
            ...selectedPrescription,
            status: action === "approved" ? "已完成" : "已拒绝",
          })
        }
      }

      setProcessingResult(action)
      setProcessingPrescription(false)

      // 3秒后重置结果状态
      setTimeout(() => {
        setProcessingResult(null)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>处方管理</CardTitle>
          <CardDescription>管理和审核医生开具的处方</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索处方号、患者姓名或医生..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  状态: {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>选择处方状态</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedStatus("全部")}>全部</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("待审核")}>待审核</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("已完成")}>已完成</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("已发药")}>已发药</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("已拒绝")}>已拒绝</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="w-full md:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              新建处方
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>处方号</TableHead>
                  <TableHead>患者</TableHead>
                  <TableHead className="hidden md:table-cell">医生</TableHead>
                  <TableHead className="hidden md:table-cell">科室</TableHead>
                  <TableHead className="hidden md:table-cell">日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => {
                  const StatusIcon = statusMap[prescription.status as keyof typeof statusMap]?.icon
                  return (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{prescription.patientName[0]}</AvatarFallback>
                          </Avatar>
                          <span>{prescription.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{prescription.doctorName}</TableCell>
                      <TableCell className="hidden md:table-cell">{prescription.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{prescription.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={statusMap[prescription.status as keyof typeof statusMap]?.color as any}
                          className="flex w-fit items-center gap-1"
                        >
                          {StatusIcon && React.createElement(StatusIcon, { className: "h-3 w-3" })}
                          <span>{prescription.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewPrescriptionDetail(prescription)}>
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            显示 {filteredPrescriptions.length} 个处方（共 {prescriptions.length} 个）
          </div>
        </CardFooter>
      </Card>

      {/* 处方详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>处方详情</DialogTitle>
            <DialogDescription>查看处方的详细信息和药物清单</DialogDescription>
          </DialogHeader>

          {selectedPrescription && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">基本信息</TabsTrigger>
                <TabsTrigger value="medications">药物清单</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">处方号</h4>
                    <p>{selectedPrescription.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">日期</h4>
                    <p>{selectedPrescription.date}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">患者姓名</h4>
                    <p>{selectedPrescription.patientName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">患者ID</h4>
                    <p>{selectedPrescription.patientId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">医生</h4>
                    <p>{selectedPrescription.doctorName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">科室</h4>
                    <p>{selectedPrescription.department}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-muted-foreground">诊断</h4>
                    <p>{selectedPrescription.diagnosis}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-muted-foreground">备注</h4>
                    <p>{selectedPrescription.notes}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-muted-foreground">状态</h4>
                    <Badge
                      variant={statusMap[selectedPrescription.status as keyof typeof statusMap]?.color as any}
                      className="mt-1 flex w-fit items-center gap-1"
                    >
                      {statusMap[selectedPrescription.status as keyof typeof statusMap]?.icon &&
                        React.createElement(statusMap[selectedPrescription.status as keyof typeof statusMap]?.icon, {
                          className: "h-3 w-3",
                        })}
                      <span>{selectedPrescription.status}</span>
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="medications">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>药品名称</TableHead>
                        <TableHead>剂量</TableHead>
                        <TableHead>频次</TableHead>
                        <TableHead>疗程</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPrescription.medications.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                          <TableCell>{med.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  {selectedPrescription?.status === "待审核" && (
                    <>
                      {processingPrescription ? (
                        <Button disabled className="gap-1">
                          <span className="animate-spin">⏳</span>
                          处理中...
                        </Button>
                      ) : (
                        <>
                          {processingResult === "approved" ? (
                            <Button variant="success" className="gap-1">
                              <CheckCircle className="h-4 w-4" />
                              已批准
                            </Button>
                          ) : processingResult === "rejected" ? (
                            <Button variant="destructive" className="gap-1">
                              <XCircle className="h-4 w-4" />
                              已拒绝
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="outline"
                                className="gap-1"
                                onClick={() => processPrescription("rejected")}
                              >
                                <XCircle className="h-4 w-4" />
                                拒绝
                              </Button>
                              <Button className="gap-1" onClick={() => processPrescription("approved")}>
                                <CheckCircle className="h-4 w-4" />
                                批准
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {selectedPrescription?.status === "已完成" && (
                    <Button className="gap-1">
                      <FileText className="h-4 w-4" />
                      打印处方
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
