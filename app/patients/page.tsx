"use client"

import { useTranslation } from "@/hooks/use-translation"
import { PatientCard } from "@/components/patient-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function PatientsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  // 模拟患者数据
  const patients = [
    {
      id: "1",
      name: "张三",
      age: 45,
      gender: "male" as const,
      diagnosis: ["diabetes", "hypertension"],
      lastVisit: new Date(2023, 5, 15),
    },
    {
      id: "2",
      name: "李四",
      age: 32,
      gender: "female" as const,
      diagnosis: ["gastritis"],
      lastVisit: new Date(2023, 6, 22),
    },
    {
      id: "3",
      name: "王五",
      age: 58,
      gender: "male" as const,
      diagnosis: ["coronary_heart_disease", "hypertension"],
      lastVisit: new Date(2023, 7, 5),
    },
  ]

  // 处理查看患者详情
  const handleViewPatient = (id: string) => {
    console.log(`查看患者 ID: ${id}`)
  }

  // 处理编辑患者信息
  const handleEditPatient = (id: string) => {
    console.log(`编辑患者 ID: ${id}`)
  }

  // 处理删除患者
  const handleDeletePatient = (id: string) => {
    console.log(`删除患者 ID: ${id}`)
  }

  // 过滤患者
  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("patients.list")}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("patients.add")}
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder={t("patients.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            {...patient}
            onView={handleViewPatient}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />
        ))}

        {filteredPatients.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">{t("patients.no_results")}</div>
        )}
      </div>
    </div>
  )
}
