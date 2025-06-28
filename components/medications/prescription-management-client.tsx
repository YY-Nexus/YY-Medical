"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalButton } from "@/components/ui/medical-button"
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Pill,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PrescriptionManagementClient() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        heading="处方管理"
        subheading="创建、审核和管理患者处方"
        icon={<ClipboardList className="h-6 w-6 text-medical-600" />}
      />

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索处方或患者..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="处方状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有状态</SelectItem>
              <SelectItem value="active">有效</SelectItem>
              <SelectItem value="pending">待审核</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="cancelled">已取消</SelectItem>
            </SelectContent>
          </Select>

          <MedicalButton variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            高级筛选
          </MedicalButton>
          <MedicalButton variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出
          </MedicalButton>
          <MedicalButton size="sm">
            <Plus className="mr-2 h-4 w-4" />
            新建处方
          </MedicalButton>
        </div>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">最近处方</TabsTrigger>
          <TabsTrigger value="pending">待审核</TabsTrigger>
          <TabsTrigger value="active">有效处方</TabsTrigger>
          <TabsTrigger value="templates">处方模板</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {prescriptions.map((prescription) => (
              <PrescriptionCard key={prescription.id} prescription={prescription} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {prescriptions
              .filter((p) => p.status === "pending")
              .map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {prescriptions
              .filter((p) => p.status === "active")
              .map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescriptionTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Prescription {
  id: string
  patientName: string
  patientId: string
  patientAvatar?: string
  doctor: string
  department: string
  createdAt: string
  expiresAt: string
  medications: { name: string; dosage: string; frequency: string }[]
  status: "active" | "pending" | "completed" | "cancelled"
  urgency?: "normal" | "urgent"
  notes?: string
}

function PrescriptionCard({ prescription }: { prescription: Prescription }) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          text: "有效",
          color: "text-green-500 bg-green-50",
        }
      case "pending":
        return {
          icon: <Clock className="h-4 w-4 text-amber-500" />,
          text: "待审核",
          color: "text-amber-500 bg-amber-50",
        }
      case "completed":
        return {
          icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
          text: "已完成",
          color: "text-blue-500 bg-blue-50",
        }
      case "cancelled":
        return {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          text: "已取消",
          color: "text-red-500 bg-red-50",
        }
      default:
        return { icon: <Clock className="h-4 w-4" />, text: status, color: "text-gray-500 bg-gray-50" }
    }
  }

  const statusInfo = getStatusInfo(prescription.status)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={prescription.patientAvatar || "/placeholder.svg"} alt={prescription.patientName} />
              <AvatarFallback>{prescription.patientName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-medium">{prescription.patientName}</CardTitle>
              <CardDescription>患者ID: {prescription.patientId}</CardDescription>
            </div>
          </div>
          <Badge className={statusInfo.color}>
            <div className="flex items-center gap-1">
              {statusInfo.icon}
              <span>{statusInfo.text}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>开方医生:</span>
          </div>
          <div>{prescription.doctor}</div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>开方日期:</span>
          </div>
          <div>{prescription.createdAt}</div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>有效期至:</span>
          </div>
          <div>{prescription.expiresAt}</div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="font-medium flex items-center gap-1">
            <Pill className="h-4 w-4" />
            <span>药品明细</span>
          </div>
          <div className="space-y-1">
            {prescription.medications.map((med, index) => (
              <div key={index} className="text-sm border-b pb-1 last:border-0">
                <div className="font-medium">{med.name}</div>
                <div className="text-muted-foreground text-xs">
                  {med.dosage} · {med.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>

        {prescription.notes && (
          <div className="text-sm text-muted-foreground border-t pt-2">
            <span className="font-medium">备注: </span>
            {prescription.notes}
          </div>
        )}

        <div className="flex justify-end mt-4 gap-2">
          <MedicalButton variant="outline" size="sm">
            查看详情
          </MedicalButton>
          {prescription.status === "pending" && (
            <>
              <MedicalButton variant="outline" size="sm">
                拒绝
              </MedicalButton>
              <MedicalButton size="sm">审核通过</MedicalButton>
            </>
          )}
          {prescription.status === "active" && <MedicalButton size="sm">打印处方</MedicalButton>}
        </div>
      </CardContent>
    </Card>
  )
}

interface PrescriptionTemplate {
  id: string
  title: string
  description: string
  category: string
  medications: { name: string; dosage: string; frequency: string }[]
  createdBy: string
  lastUpdated: string
}

function TemplateCard({ template }: { template: PrescriptionTemplate }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-3">
          <div className="font-medium mb-1">药品明细</div>
          <div className="space-y-1">
            {template.medications.map((med, index) => (
              <div key={index} className="text-sm">
                {med.name} ({med.dosage}, {med.frequency})
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">类别:</div>
          <div>{template.category}</div>
          <div className="text-muted-foreground">创建者:</div>
          <div>{template.createdBy}</div>
          <div className="text-muted-foreground">更新时间:</div>
          <div>{template.lastUpdated}</div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <MedicalButton variant="outline" size="sm">
            编辑
          </MedicalButton>
          <MedicalButton size="sm">使用模板</MedicalButton>
        </div>
      </CardContent>
    </Card>
  )
}

// 示例数据
const prescriptions: Prescription[] = [
  {
    id: "rx1001",
    patientName: "张明",
    patientId: "P10045678",
    doctor: "李医生",
    department: "内科",
    createdAt: "2023-12-01",
    expiresAt: "2023-12-31",
    medications: [
      { name: "阿司匹林", dosage: "100mg", frequency: "每日一次" },
      { name: "氯雷他定", dosage: "10mg", frequency: "每日一次" },
    ],
    status: "active",
  },
  {
    id: "rx1002",
    patientName: "王丽",
    patientId: "P10045679",
    doctor: "陈医生",
    department: "心血管科",
    createdAt: "2023-12-02",
    expiresAt: "2023-12-16",
    medications: [
      { name: "美托洛尔", dosage: "25mg", frequency: "每日两次" },
      { name: "氢氯噻嗪", dosage: "12.5mg", frequency: "每日一次" },
    ],
    status: "pending",
    urgency: "urgent",
    notes: "患者有高血压病史，需密切监测血压变化",
  },
  {
    id: "rx1003",
    patientName: "刘强",
    patientId: "P10045680",
    doctor: "张医生",
    department: "呼吸科",
    createdAt: "2023-11-25",
    expiresAt: "2023-12-10",
    medications: [
      { name: "布地奈德", dosage: "200μg", frequency: "每日两次" },
      { name: "沙丁胺醇", dosage: "100μg", frequency: "需要时使用" },
    ],
    status: "completed",
  },
  {
    id: "rx1004",
    patientName: "赵芳",
    patientId: "P10045681",
    doctor: "王医生",
    department: "内分泌科",
    createdAt: "2023-12-03",
    expiresAt: "2024-01-03",
    medications: [
      { name: "二甲双胍", dosage: "500mg", frequency: "每日三次" },
      { name: "格列美脲", dosage: "2mg", frequency: "每日一次" },
    ],
    status: "active",
    notes: "餐前30分钟服用",
  },
]

const prescriptionTemplates: PrescriptionTemplate[] = [
  {
    id: "tpl1",
    title: "高血压标准处方",
    description: "适用于轻中度高血压患者的标准处方模板",
    category: "心血管科",
    medications: [
      { name: "氨氯地平", dosage: "5mg", frequency: "每日一次" },
      { name: "缬沙坦", dosage: "80mg", frequency: "每日一次" },
    ],
    createdBy: "陈医生",
    lastUpdated: "2023-10-15",
  },
  {
    id: "tpl2",
    title: "2型糖尿病处方",
    description: "适用于2型糖尿病患者的标准处方模板",
    category: "内分泌科",
    medications: [
      { name: "二甲双胍", dosage: "500mg", frequency: "每日两次" },
      { name: "格列美脲", dosage: "2mg", frequency: "每日一次" },
    ],
    createdBy: "王医生",
    lastUpdated: "2023-11-05",
  },
  {
    id: "tpl3",
    title: "支气管哮喘处方",
    description: "适用于轻中度支气管哮喘患者的处方模板",
    category: "呼吸科",
    medications: [
      { name: "布地奈德", dosage: "200μg", frequency: "每日两次" },
      { name: "沙丁胺醇", dosage: "100μg", frequency: "需要时使用" },
    ],
    createdBy: "张医生",
    lastUpdated: "2023-09-20",
  },
]
