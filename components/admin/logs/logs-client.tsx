"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogsList } from "./logs-list"
import { LogsFilter } from "./logs-filter"
import { LogsChart } from "./logs-chart"
import { LogsExport } from "./logs-export"

export function LogsClient() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [logLevel, setLogLevel] = useState<string[]>([])
  const [userFilter, setUserFilter] = useState<string[]>([])
  const [moduleFilter, setModuleFilter] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">所有日志</TabsTrigger>
            <TabsTrigger value="system">系统日志</TabsTrigger>
            <TabsTrigger value="security">安全日志</TabsTrigger>
            <TabsTrigger value="user">用户操作</TabsTrigger>
            <TabsTrigger value="api">API调用</TabsTrigger>
            <TabsTrigger value="error">错误日志</TabsTrigger>
          </TabsList>
        </Tabs>
        <LogsExport />
      </div>

      <LogsFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateRange={dateRange}
        setDateRange={setDateRange}
        logLevel={logLevel}
        setLogLevel={setLogLevel}
        userFilter={userFilter}
        setUserFilter={setUserFilter}
        moduleFilter={moduleFilter}
        setModuleFilter={setModuleFilter}
      />

      <TabsContent value="all" className="mt-0">
        <LogsList
          type="all"
          searchQuery={searchQuery}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </TabsContent>
      <TabsContent value="system" className="mt-0">
        <LogsList
          type="system"
          searchQuery={searchQuery}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </TabsContent>
      <TabsContent value="security" className="mt-0">
        <LogsList
          type="security"
          searchQuery={searchQuery}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </TabsContent>
      <TabsContent value="user" className="mt-0">
        <LogsList
          type="user"
          searchQuery={searchQuery}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </TabsContent>
      <TabsContent value="api" className="mt-0">
        <LogsList
          type="api"
          searchQuery={searchQuery}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </TabsContent>
      <TabsContent value="error" className="mt-0">
        <LogsList
          type="error"
          searchQuery={searchQuery}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </TabsContent>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">日志统计</h3>
        <LogsChart
          type={activeTab}
          dateRange={dateRange}
          logLevel={logLevel}
          userFilter={userFilter}
          moduleFilter={moduleFilter}
        />
      </div>
    </div>
  )
}
