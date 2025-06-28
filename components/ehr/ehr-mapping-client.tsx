"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { EHRDataMapping } from "@/components/ehr-data-mapping"
import { Database, FileText, User, Stethoscope, Pill, Activity, Download, Upload, Save, History } from "lucide-react"

export default function EHRMappingClient() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("patient")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="mapping" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" onClick={() => router.push("/ehr-integration")}>
            集成概览
          </TabsTrigger>
          <TabsTrigger value="mapping" onClick={() => router.push("/ehr-integration/mapping")}>
            数据映射
          </TabsTrigger>
          <TabsTrigger value="sync" onClick={() => router.push("/ehr-integration/sync")}>
            同步状态
          </TabsTrigger>
          <TabsTrigger value="connections" onClick={() => router.push("/ehr-integration/connections")}>
            系统连接
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">数据映射配置</h2>
          <p className="text-muted-foreground">配置电子病历系统与平台之间的数据字段映射关系</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出映射
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            导入映射
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            保存配置
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>数据类型选择</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button
              variant={activeTab === "patient" ? "default" : "outline"}
              className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveTab("patient")}
            >
              <User className="w-6 h-6" />
              <span>患者信息</span>
            </Button>
            <Button
              variant={activeTab === "diagnosis" ? "default" : "outline"}
              className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveTab("diagnosis")}
            >
              <Stethoscope className="w-6 h-6" />
              <span>诊断信息</span>
            </Button>
            <Button
              variant={activeTab === "medication" ? "default" : "outline"}
              className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveTab("medication")}
            >
              <Pill className="w-6 h-6" />
              <span>用药信息</span>
            </Button>
            <Button
              variant={activeTab === "labResult" ? "default" : "outline"}
              className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveTab("labResult")}
            >
              <Activity className="w-6 h-6" />
              <span>检查结果</span>
            </Button>
            <Button
              variant={activeTab === "document" ? "default" : "outline"}
              className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveTab("document")}
            >
              <FileText className="w-6 h-6" />
              <span>文档记录</span>
            </Button>
            <Button
              variant={activeTab === "other" ? "default" : "outline"}
              className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveTab("other")}
            >
              <Database className="w-6 h-6" />
              <span>其他数据</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <EHRDataMapping />

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.push("/ehr-integration")}>
          返回概览
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            恢复默认
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            保存映射
          </Button>
        </div>
      </div>
    </div>
  )
}
