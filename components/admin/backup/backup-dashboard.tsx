"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackupList } from "./backup-list"
import { BackupSchedule } from "./backup-schedule"
import { RestorePanel } from "./restore-panel"

export function BackupDashboard() {
  const [activeTab, setActiveTab] = useState("backups")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="backups">备份列表</TabsTrigger>
        <TabsTrigger value="schedule">备份计划</TabsTrigger>
        <TabsTrigger value="restore">数据恢复</TabsTrigger>
      </TabsList>

      <TabsContent value="backups">
        <BackupList />
      </TabsContent>

      <TabsContent value="schedule">
        <BackupSchedule />
      </TabsContent>

      <TabsContent value="restore">
        <RestorePanel />
      </TabsContent>
    </Tabs>
  )
}
