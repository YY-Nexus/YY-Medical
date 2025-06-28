"use client"

import { useState } from "react"
import { HealthDataImport } from "./data-import"
import { VitalSigns } from "./vital-signs"
import { TestResults } from "./test-results"
import { TrendsAnalysis } from "./trends-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Activity, FileText, BarChart, Users, Calendar } from "lucide-react"

export function HealthDataClient() {
  const [activeTab, setActiveTab] = useState("import")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">健康数据管理</h1>
      <p className="text-muted-foreground">
        在这里您可以导入、查看和分析患者的健康数据，包括生命体征、检验结果和健康趋势。
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="import" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span className="hidden md:inline">数据导入</span>
            <span className="inline md:hidden">导入</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span className="hidden md:inline">生命体征</span>
            <span className="inline md:hidden">体征</span>
          </TabsTrigger>
          <TabsTrigger value="lab" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">检验结果</span>
            <span className="inline md:hidden">检验</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span className="hidden md:inline">趋势分析</span>
            <span className="inline md:hidden">趋势</span>
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">患者数据</span>
            <span className="inline md:hidden">患者</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">数据计划</span>
            <span className="inline md:hidden">计划</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import">
          <HealthDataImport />
        </TabsContent>

        <TabsContent value="vitals">
          <VitalSigns />
        </TabsContent>

        <TabsContent value="lab">
          <TestResults />
        </TabsContent>

        <TabsContent value="trends">
          <TrendsAnalysis />
        </TabsContent>

        <TabsContent value="patients">
          <div className="h-[500px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
            <div className="text-center">
              <Users className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">患者数据管理</h3>
              <p className="text-muted-foreground max-w-md">
                在这里您可以按患者查看和管理健康数据，包括患者的所有健康记录和数据趋势。
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="h-[500px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">数据采集计划管理</h3>
              <p className="text-muted-foreground max-w-md">
                在这里您可以设置和管理自动化数据采集计划，包括定时导入、数据同步和报告生成等任务。
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
