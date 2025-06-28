"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// 确保导入路径正确
import { DiagnosisForm } from "./diagnosis-form"
import { DiagnosisHistory } from "./diagnosis-history"
import { DiagnosisExplainer } from "./diagnosis-explainer"
import { DiagnosisComparison } from "./diagnosis-comparison"
import Link from "next/link"
import { FileText, Brain, Activity, BarChart } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AIDiagnosisClient() {
  const [activeTab, setActiveTab] = useState("new-diagnosis")

  const diagnosisLinks = [
    { title: "诊断记录", href: "/ai-diagnosis/records", icon: "FileText" },
    { title: "模型管理", href: "/ai-model", icon: "Brain" },
    { title: "模型训练", href: "/ai-model/training", icon: "Activity" },
    { title: "性能分析", href: "/ai-model/performance", icon: "BarChart" },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="new-diagnosis" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="new-diagnosis">新建诊断</TabsTrigger>
          <TabsTrigger value="history">诊断历史</TabsTrigger>
          <TabsTrigger value="explainer">诊断解释器</TabsTrigger>
          <TabsTrigger value="comparison">诊断比较</TabsTrigger>
        </TabsList>

        <TabsContent value="new-diagnosis" className="space-y-4">
          <DiagnosisForm />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <DiagnosisHistory />
        </TabsContent>

        <TabsContent value="explainer" className="space-y-4">
          <DiagnosisExplainer />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <DiagnosisComparison />
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {diagnosisLinks.map((link) => {
          const Icon =
            link.icon === "FileText"
              ? FileText
              : link.icon === "Brain"
                ? Brain
                : link.icon === "Activity"
                  ? Activity
                  : BarChart

          return (
            <Card key={link.href} className="hover:shadow-md transition-shadow">
              <Link href={link.href} className="block p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">查看详情</p>
                </div>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
