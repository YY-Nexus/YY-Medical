"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MedicalButton } from "@/components/ui/medical-button"
import { ChevronDown, ChevronUp, MoreHorizontal, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { FixedSizeList as List } from "react-window"
import { useIsMobile } from "@/hooks/use-mobile"

// 虚拟患者数据
const patients = [
  {
    id: "P-20240428-001",
    name: "张伟",
    age: 45,
    gender: "男",
    phone: "138****1234",
    diagnosis: "高血压，2型糖尿病",
    lastVisit: "2024-04-25",
    status: "跟踪中",
    statusColor: "bg-green-500",
    risk: "中",
    riskColor: "bg-yellow-500",
  },
  {
    id: "P-20240427-015",
    name: "李敏",
    age: 32,
    gender: "女",
    phone: "139****5678",
    diagnosis: "甲状腺功能亢进",
    lastVisit: "2024-04-26",
    status: "待复诊",
    statusColor: "bg-blue-500",
    risk: "低",
    riskColor: "bg-green-500",
  },
  {
    id: "P-20240426-042",
    name: "王强",
    age: 62,
    gender: "男",
    phone: "137****9012",
    diagnosis: "冠心病，心律失常",
    lastVisit: "2024-04-20",
    status: "紧急",
    statusColor: "bg-red-500",
    risk: "高",
    riskColor: "bg-red-500",
  },
  {
    id: "P-20240425-083",
    name: "赵红",
    age: 28,
    gender: "女",
    phone: "135****3456",
    diagnosis: "妊娠期糖尿病",
    lastVisit: "2024-04-22",
    status: "跟踪中",
    statusColor: "bg-green-500",
    risk: "中",
    riskColor: "bg-yellow-500",
  },
  {
    id: "P-20240424-027",
    name: "陈明",
    age: 50,
    gender: "男",
    phone: "136****7890",
    diagnosis: "慢性阻塞性肺疾病",
    lastVisit: "2024-04-18",
    status: "稳定",
    statusColor: "bg-green-500",
    risk: "中",
    riskColor: "bg-yellow-500",
  },
  {
    id: "P-20240423-056",
    name: "刘芳",
    age: 35,
    gender: "女",
    phone: "138****2345",
    diagnosis: "抑郁障碍",
    lastVisit: "2024-04-15",
    status: "跟踪中",
    statusColor: "bg-green-500",
    risk: "中",
    riskColor: "bg-yellow-500",
  },
  // 为了演示虚拟列表效果，添加更多模拟数据
  ...Array.from({ length: 94 }, (_, i) => ({
    id: `P-2024042${i % 10}-${String(i + 100).padStart(3, "0")}`,
    name: `患者${i + 7}`,
    age: 20 + Math.floor(Math.random() * 60),
    gender: Math.random() > 0.5 ? "男" : "女",
    phone: `13${Math.floor(Math.random() * 10)}****${Math.floor(1000 + Math.random() * 9000)}`,
    diagnosis: ["高血压", "糖尿病", "冠心病", "肺炎", "胃炎"][Math.floor(Math.random() * 5)],
    lastVisit: `2024-04-${String(Math.floor(1 + Math.random() * 28)).padStart(2, "0")}`,
    status: ["跟踪中", "待复诊", "紧急", "稳定"][Math.floor(Math.random() * 4)],
    statusColor: ["bg-green-500", "bg-blue-500", "bg-red-500", "bg-green-500"][Math.floor(Math.random() * 4)],
    risk: ["低", "中", "高"][Math.floor(Math.random() * 3)],
    riskColor: ["bg-green-500", "bg-yellow-500", "bg-red-500"][Math.floor(Math.random() * 3)],
  })),
]

export function PatientList() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const router = useRouter()
  const isMobile = useIsMobile()

  // 监听窗口大小变化
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // 初始化
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handlePatientClick = (patientId: string) => {
    // 在实际应用中，这里会导航到患者详情页面
    router.push(`/patients/${patientId}`)
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <ChevronDown className="h-4 w-4 opacity-50" />
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-medical-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-medical-600" />
    )
  }

  // 表头组件
  const TableHeader = () => (
    <div className="sticky top-0 z-10 bg-medical-50 text-medical-700 grid grid-cols-9 text-left text-sm">
      <div className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("name")}>
        <div className="flex items-center">
          患者姓名
          <SortIcon column="name" />
        </div>
      </div>
      <div className="px-4 py-3 font-medium">患者ID</div>
      <div className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("age")}>
        <div className="flex items-center">
          年龄
          <SortIcon column="age" />
        </div>
      </div>
      <div className="px-4 py-3 font-medium">性别</div>
      <div className="px-4 py-3 font-medium">主要诊断</div>
      <div className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("lastVisit")}>
        <div className="flex items-center">
          最近就诊
          <SortIcon column="lastVisit" />
        </div>
      </div>
      <div className="px-4 py-3 font-medium">状态</div>
      <div className="px-4 py-3 font-medium">风险等级</div>
      <div className="px-4 py-3 font-medium">操作</div>
    </div>
  )

  // 行渲染器
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const patient = sortedPatients[index]

    return (
      <div
        style={style}
        className="grid grid-cols-9 hover:bg-medical-50 cursor-pointer transition-colors border-b border-medical-100"
        onClick={() => handlePatientClick(patient.id)}
      >
        <div className="px-4 py-3 font-medium text-medical-900 whitespace-nowrap">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {patient.name}
          </div>
        </div>
        <div className="px-4 py-3 text-medical-700">{patient.id}</div>
        <div className="px-4 py-3 text-medical-700">{patient.age}</div>
        <div className="px-4 py-3 text-medical-700">{patient.gender}</div>
        <div className="px-4 py-3 text-medical-700 max-w-[200px] truncate">{patient.diagnosis}</div>
        <div className="px-4 py-3 text-medical-700">{patient.lastVisit}</div>
        <div className="px-4 py-3">
          <div className="flex items-center">
            <div className={cn("h-2 w-2 rounded-full mr-2", patient.statusColor)}></div>
            <span className="text-medical-700">{patient.status}</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center">
            <div className={cn("h-2 w-2 rounded-full mr-2", patient.riskColor)}></div>
            <span className="text-medical-700">{patient.risk}</span>
          </div>
        </div>
        <div className="px-4 py-3 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <MedicalButton variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </MedicalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>查看详情</DropdownMenuItem>
              <DropdownMenuItem>编辑信息</DropdownMenuItem>
              <DropdownMenuItem>创建就诊记录</DropdownMenuItem>
              <DropdownMenuItem>发送随访提醒</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <TableHeader />

        {/* 虚拟化列表 */}
        <List
          height={600}
          width={windowSize.width > 1024 ? windowSize.width * 0.8 : windowSize.width - 40}
          itemCount={sortedPatients.length}
          itemSize={56} // 每行高度
        >
          {Row}
        </List>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-medical-100">
        <div className="text-sm text-medical-600">
          显示 1 - {patients.length} 共 {patients.length} 条记录
        </div>
        <div className="flex items-center gap-1">
          <MedicalButton variant="outline" size="sm" disabled>
            上一页
          </MedicalButton>
          <MedicalButton variant="outline" size="sm" className="bg-medical-50">
            1
          </MedicalButton>
          <MedicalButton variant="outline" size="sm" disabled>
            下一页
          </MedicalButton>
        </div>
      </div>
    </div>
  )
}
