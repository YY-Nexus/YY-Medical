"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationTemplates } from "./notification-templates"
import { NotificationRules } from "./notification-rules"
import { NotificationHistory } from "./notification-history"
import { NotificationChannels } from "./notification-channels"

export function NotificationsDashboard() {
  const [activeTab, setActiveTab] = useState("templates")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="templates">通知模板</TabsTrigger>
        <TabsTrigger value="rules">发送规则</TabsTrigger>
        <TabsTrigger value="channels">通知渠道</TabsTrigger>
        <TabsTrigger value="history">通知历史</TabsTrigger>
      </TabsList>

      <TabsContent value="templates">
        <NotificationTemplates />
      </TabsContent>

      <TabsContent value="rules">
        <NotificationRules />
      </TabsContent>

      <TabsContent value="channels">
        <NotificationChannels />
      </TabsContent>

      <TabsContent value="history">
        <NotificationHistory />
      </TabsContent>
    </Tabs>
  )
}
