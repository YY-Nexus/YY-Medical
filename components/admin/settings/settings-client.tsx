"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "./general-settings"
import { SecuritySettings } from "./security-settings"
import { IntegrationSettings } from "./integration-settings"
import { NotificationSettings } from "./notification-settings"
import { BackupSettings } from "./backup-settings"
import { ApiSettings } from "./api-settings"
import { StorageSettings } from "./storage-settings"
import { PerformanceSettings } from "./performance-settings"

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="integration">集成设置</TabsTrigger>
          <TabsTrigger value="notification">通知设置</TabsTrigger>
          <TabsTrigger value="backup">备份设置</TabsTrigger>
          <TabsTrigger value="api">API设置</TabsTrigger>
          <TabsTrigger value="storage">存储设置</TabsTrigger>
          <TabsTrigger value="performance">性能设置</TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="general" className="mt-0">
        <GeneralSettings />
      </TabsContent>

      <TabsContent value="security" className="mt-0">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="integration" className="mt-0">
        <IntegrationSettings />
      </TabsContent>

      <TabsContent value="notification" className="mt-0">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="backup" className="mt-0">
        <BackupSettings />
      </TabsContent>

      <TabsContent value="api" className="mt-0">
        <ApiSettings />
      </TabsContent>

      <TabsContent value="storage" className="mt-0">
        <StorageSettings />
      </TabsContent>

      <TabsContent value="performance" className="mt-0">
        <PerformanceSettings />
      </TabsContent>
    </div>
  )
}
