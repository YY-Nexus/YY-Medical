"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, TrendingUp, Clock, AlertCircle } from "lucide-react"

// 模拟常用药物数据
const popularMedications = [
  {
    id: "med-001",
    name: "二甲双胍",
    genericName: "盐酸二甲双胍片",
    category: "口服降糖药",
    usageCount: 1250,
    trend: "上升",
    price: 35.8,
    stock: "充足",
  },
  {
    id: "med-002",
    name: "阿托伐他汀",
    genericName: "阿托伐他汀钙片",
    category: "调脂药",
    usageCount: 980,
    trend: "稳定",
    price: 89.5,
    stock: "充足",
  },
  {
    id: "med-003",
    name: "氯沙坦",
    genericName: "氯沙坦钾片",
    category: "降压药",
    usageCount: 850,
    trend: "上升",
    price: 68.2,
    stock: "充足",
  },
  {
    id: "med-004",
    name: "布洛芬",
    genericName: "布洛芬片",
    category: "非甾体抗炎药",
    usageCount: 720,
    trend: "下降",
    price: 15.6,
    stock: "低",
  },
  {
    id: "med-005",
    name: "左氧氟沙星",
    genericName: "左氧氟沙星片",
    category: "抗生素",
    usageCount: 680,
    trend: "稳定",
    price: 48.9,
    stock: "充足",
  },
]

// 模拟最近处方药物数据
const recentPrescriptions = [
  {
    id: "rx-001",
    medication: "二甲双胍",
    doctor: "李医生",
    department: "内科",
    date: "2023-05-15",
    patient: "张三",
  },
  {
    id: "rx-002",
    medication: "阿托伐他汀",
    doctor: "王医生",
    department: "心内科",
    date: "2023-05-16",
    patient: "李四",
  },
  {
    id: "rx-003",
    medication: "氯沙坦",
    doctor: "张医生",
    department: "心内科",
    date: "2023-05-17",
    patient: "王五",
  },
]

export function PopularMedications() {
  const [activeTab, setActiveTab] = useState("popular")

  // 获取趋势对应的图标和颜色
  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "上升":
        return { icon: <TrendingUp className="h-3 w-3" />, color: "bg-green-100 text-green-800 hover:bg-green-100" }
      case "下降":
        return {
          icon: <TrendingUp className="h-3 w-3 rotate-180" />,
          color: "bg-red-100 text-red-800 hover:bg-red-100",
        }
      default:
        return { icon: <Clock className="h-3 w-3" />, color: "bg-blue-100 text-blue-800 hover:bg-blue-100" }
    }
  }

  // 获取库存状态对应的图标和颜色
  const getStockBadge = (stock: string) => {
    switch (stock) {
      case "充足":
        return { color: "bg-green-100 text-green-800 hover:bg-green-100" }
      case "低":
        return { color: "bg-amber-100 text-amber-800 hover:bg-amber-100" }
      default:
        return { color: "bg-red-100 text-red-800 hover:bg-red-100" }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>药物使用情况</CardTitle>
        <CardDescription>查看常用药物和最近处方</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popular">常用药物</TabsTrigger>
            <TabsTrigger value="recent">最近处方</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-4">
            {popularMedications.map((med) => {
              const trendBadge = getTrendBadge(med.trend)
              const stockBadge = getStockBadge(med.stock)

              return (
                <div key={med.id} className="flex flex-col space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-medical-500" />
                      <span className="font-medium">{med.name}</span>
                    </div>
                    <Badge variant="outline" className={trendBadge.color}>
                      <div className="flex items-center gap-1">
                        {trendBadge.icon}
                        <span>{med.trend}</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{med.genericName}</div>
                  <div className="flex items-center justify-between text-sm">
                    <span>使用次数: {med.usageCount}</span>
                    <span>¥{med.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{med.category}</Badge>
                    <Badge variant="outline" className={stockBadge.color}>
                      库存: {med.stock}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {recentPrescriptions.map((rx) => (
              <div key={rx.id} className="flex flex-col space-y-2 rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-medical-500" />
                    <span className="font-medium">{rx.medication}</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {rx.date}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>医生: {rx.doctor}</span>
                  </div>
                  <span>{rx.department}</span>
                </div>
                <div className="text-sm text-muted-foreground">患者: {rx.patient}</div>
              </div>
            ))}

            <Button variant="outline" className="w-full">
              查看所有处方
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
