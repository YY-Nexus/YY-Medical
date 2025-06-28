"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelTrainingDashboard } from "@/components/model-training-dashboard"
import { ModelTrainingJobs } from "./model-training-jobs"
import { ModelEvaluation } from "./model-evaluation"
import { ModelDeployment } from "./model-deployment"

export function ModelTrainingClient() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">训练概览</TabsTrigger>
          <TabsTrigger value="jobs">训练任务</TabsTrigger>
          <TabsTrigger value="evaluation">模型评估</TabsTrigger>
          <TabsTrigger value="deployment">模型部署</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <ModelTrainingDashboard />
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <ModelTrainingJobs />
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <ModelEvaluation />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <ModelDeployment />
        </TabsContent>
      </Tabs>
    </div>
  )
}
