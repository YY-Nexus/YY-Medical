"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DiagnosisHistory } from "./diagnosis-history"
import { DiagnosisStatistics } from "./diagnosis-statistics"
import { DiagnosisExport } from "./diagnosis-export"

export function DiagnosisRecordsClient() {
  const [activeTab, setActiveTab] = useState("history")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>诊断记录管理</CardTitle>
          <CardDescription>查看、分析和导出AI辅助诊断的历史记录</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="history">诊断历史</TabsTrigger>
              <TabsTrigger value="statistics">统计分析</TabsTrigger>
              <TabsTrigger value="export">数据导出</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-4">
              <DiagnosisHistory />
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <DiagnosisStatistics />
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <DiagnosisExport />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
