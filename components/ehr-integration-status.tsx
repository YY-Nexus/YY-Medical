"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, Plus, RefreshCw, Settings, Link, Link2OffIcon as LinkOff } from "lucide-react"

// 模拟系统连接配置
const systemConnections = [
  {
    id: "conn-001",
    name: "中心医院HIS系统",
    type: "HL7",
    endpoint: "https://his.central-hospital.com/api/v2",
    status: "connected",
    autoSync: true,
  },
  {
    id: "conn-002",
    name: "社区医疗中心EMR",
    type: "FHIR",
    endpoint: "https://emr.community-health.org/fhir",
    status: "connected",
    autoSync: true,
  },
  {
    id: "conn-003",
    name: "专科医院LIS系统",
    type: "API",
    endpoint: "https://lis.specialty-hospital.net/integration",
    status: "connected",
    autoSync: false,
  },
  {
    id: "conn-004",
    name: "区域医疗平台",
    type: "FHIR",
    endpoint: "https://regional-health-platform.org/fhir/r4",
    status: "connected",
    autoSync: true,
  },
  {
    id: "conn-005",
    name: "医学影像PACS系统",
    type: "DICOM",
    endpoint: "https://pacs.medical-imaging.com/dicom",
    status: "disconnected",
    autoSync: false,
  },
]

export function EHRIntegrationStatus() {
  const [connections, setConnections] = useState(systemConnections)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newConnection, setNewConnection] = useState({
    name: "",
    type: "FHIR",
    endpoint: "",
  })

  // 切换连接状态
  const toggleConnectionStatus = (id) => {
    setConnections(
      connections.map((conn) => {
        if (conn.id === id) {
          return {
            ...conn,
            status: conn.status === "connected" ? "disconnected" : "connected",
          }
        }
        return conn
      }),
    )
  }

  // 切换自动同步
  const toggleAutoSync = (id) => {
    setConnections(
      connections.map((conn) => {
        if (conn.id === id) {
          return {
            ...conn,
            autoSync: !conn.autoSync,
          }
        }
        return conn
      }),
    )
  }

  // 添加新连接
  const addNewConnection = () => {
    if (newConnection.name && newConnection.endpoint) {
      const newId = `conn-${String(connections.length + 1).padStart(3, "0")}`
      setConnections([
        ...connections,
        {
          id: newId,
          ...newConnection,
          status: "disconnected",
          autoSync: false,
        },
      ])
      setNewConnection({
        name: "",
        type: "FHIR",
        endpoint: "",
      })
      setIsAddingNew(false)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>系统连接</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAddingNew(true)}>
            <Plus className="w-4 h-4 mr-2" />
            添加连接
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingNew ? (
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium mb-3">添加新连接</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">系统名称</label>
                <Input
                  value={newConnection.name}
                  onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
                  placeholder="输入系统名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">连接类型</label>
                <Select
                  value={newConnection.type}
                  onValueChange={(value) => setNewConnection({ ...newConnection, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择连接类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FHIR">FHIR</SelectItem>
                    <SelectItem value="HL7">HL7</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="DICOM">DICOM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">端点URL</label>
                <Input
                  value={newConnection.endpoint}
                  onChange={(e) => setNewConnection({ ...newConnection, endpoint: e.target.value })}
                  placeholder="https://example.com/api"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={addNewConnection}>保存</Button>
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  取消
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          {connections.map((connection) => (
            <div key={connection.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">{connection.name}</div>
                    <div className="text-xs text-muted-foreground">{connection.type}</div>
                  </div>
                </div>
                <Badge
                  variant={connection.status === "connected" ? "default" : "outline"}
                  className={connection.status === "connected" ? "bg-emerald-500" : "text-red-500 border-red-500"}
                >
                  {connection.status === "connected" ? "已连接" : "未连接"}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground mt-1 truncate">{connection.endpoint}</div>

              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm">自动同步</span>
                  <Switch
                    checked={connection.autoSync}
                    onCheckedChange={() => toggleAutoSync(connection.id)}
                    disabled={connection.status !== "connected"}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleConnectionStatus(connection.id)}>
                    {connection.status === "connected" ? (
                      <LinkOff className="w-4 h-4 mr-1" />
                    ) : (
                      <Link className="w-4 h-4 mr-1" />
                    )}
                    {connection.status === "connected" ? "断开" : "连接"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    配置
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    同步
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          查看连接日志
        </Button>
      </CardFooter>
    </Card>
  )
}
