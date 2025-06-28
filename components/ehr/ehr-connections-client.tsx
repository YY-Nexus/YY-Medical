"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Database,
  Plus,
  RefreshCw,
  Settings,
  Link,
  Link2OffIcon as LinkOff,
  CheckCircle,
  XCircle,
  Trash2,
  Copy,
  Key,
  Globe,
  Clock,
  Calendar,
} from "lucide-react"

// 模拟系统连接配置
const systemConnections = [
  {
    id: "conn-001",
    name: "中心医院HIS系统",
    type: "HL7",
    endpoint: "https://his.central-hospital.com/api/v2",
    status: "connected",
    autoSync: true,
    lastSync: "2025-05-19 08:15:23",
    nextSync: "2025-05-19 12:00:00",
    description: "中心医院的主要HIS系统，包含患者基本信息、诊断记录和医嘱信息。",
  },
  {
    id: "conn-002",
    name: "社区医疗中心EMR",
    type: "FHIR",
    endpoint: "https://emr.community-health.org/fhir",
    status: "connected",
    autoSync: true,
    lastSync: "2025-05-19 06:30:45",
    nextSync: "2025-05-19 14:30:00",
    description: "社区医疗中心的电子病历系统，主要包含基层医疗服务记录。",
  },
  {
    id: "conn-003",
    name: "专科医院LIS系统",
    type: "API",
    endpoint: "https://lis.specialty-hospital.net/integration",
    status: "warning",
    autoSync: false,
    lastSync: "2025-05-18 22:15:12",
    nextSync: null,
    description: "专科医院的实验室信息系统，包含各类检验结果数据。",
  },
  {
    id: "conn-004",
    name: "区域医疗平台",
    type: "FHIR",
    endpoint: "https://regional-health-platform.org/fhir/r4",
    status: "connected",
    autoSync: true,
    lastSync: "2025-05-19 04:45:33",
    nextSync: "2025-05-19 16:45:00",
    description: "区域医疗信息平台，整合多家医疗机构的患者数据。",
  },
  {
    id: "conn-005",
    name: "医学影像PACS系统",
    type: "DICOM",
    endpoint: "https://pacs.medical-imaging.com/dicom",
    status: "error",
    autoSync: false,
    lastSync: "2025-05-18 14:20:05",
    nextSync: null,
    description: "医学影像存档和通信系统，包含各类影像学检查数据。",
  },
]

export default function EHRConnectionsClient() {
  const router = useRouter()
  const [connections, setConnections] = useState(systemConnections)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newConnection, setNewConnection] = useState({
    name: "",
    type: "FHIR",
    endpoint: "",
    description: "",
  })
  const [showTestResult, setShowTestResult] = useState(false)
  const [testResult, setTestResult] = useState({ success: true, message: "连接测试成功！服务器响应时间: 230ms" })

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
          lastSync: null,
          nextSync: null,
        },
      ])
      setNewConnection({
        name: "",
        type: "FHIR",
        endpoint: "",
        description: "",
      })
      setIsAddingNew(false)
    }
  }

  // 测试连接
  const testConnection = () => {
    setShowTestResult(true)
    // 模拟测试结果
    setTimeout(() => {
      setTestResult({
        success: Math.random() > 0.3,
        message:
          Math.random() > 0.3
            ? "连接测试成功！服务器响应时间: 230ms"
            : "连接测试失败：无法连接到服务器，请检查URL和凭证。",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="connections" className="mb-8">
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
          <h2 className="text-2xl font-bold">系统连接管理</h2>
          <p className="text-muted-foreground">管理与外部电子病历系统的连接配置和状态</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加连接
        </Button>
      </div>

      {/* 添加新连接表单 */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>添加新连接</DialogTitle>
            <DialogDescription>添加新的电子病历系统连接。请提供必要的连接信息。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                系统名称
              </Label>
              <Input
                id="name"
                value={newConnection.name}
                onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
                className="col-span-3"
                placeholder="输入系统名称"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                连接类型
              </Label>
              <Select
                value={newConnection.type}
                onValueChange={(value) => setNewConnection({ ...newConnection, type: value })}
              >
                <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endpoint" className="text-right">
                端点URL
              </Label>
              <Input
                id="endpoint"
                value={newConnection.endpoint}
                onChange={(e) => setNewConnection({ ...newConnection, endpoint: e.target.value })}
                className="col-span-3"
                placeholder="https://example.com/api"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                描述
              </Label>
              <Textarea
                id="description"
                value={newConnection.description}
                onChange={(e) => setNewConnection({ ...newConnection, description: e.target.value })}
                className="col-span-3"
                placeholder="输入系统描述"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label htmlFor="test">测试连接</Label>
              </div>
              <div className="col-span-3">
                <Button variant="outline" type="button" onClick={testConnection}>
                  测试连接
                </Button>
                {showTestResult && (
                  <div className={`mt-2 text-sm ${testResult.success ? "text-green-500" : "text-red-500"}`}>
                    {testResult.success ? (
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {testResult.message}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {testResult.message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              取消
            </Button>
            <Button onClick={addNewConnection}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 系统连接列表 */}
      <div className="space-y-4">
        {connections.map((connection) => (
          <Card key={connection.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        connection.status === "connected"
                          ? "bg-green-100"
                          : connection.status === "warning"
                            ? "bg-amber-100"
                            : connection.status === "error"
                              ? "bg-red-100"
                              : "bg-gray-100"
                      }`}
                    >
                      <Database
                        className={`w-6 h-6 ${
                          connection.status === "connected"
                            ? "text-green-600"
                            : connection.status === "warning"
                              ? "text-amber-600"
                              : connection.status === "error"
                                ? "text-red-600"
                                : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{connection.name}</h3>
                        <Badge variant="outline" className="ml-2">
                          {connection.type}
                        </Badge>
                        {connection.status === "connected" ? (
                          <Badge className="bg-green-500">已连接</Badge>
                        ) : connection.status === "warning" ? (
                          <Badge variant="outline" className="text-amber-500 border-amber-500">
                            警告
                          </Badge>
                        ) : connection.status === "error" ? (
                          <Badge variant="outline" className="text-red-500 border-red-500">
                            错误
                          </Badge>
                        ) : (
                          <Badge variant="outline">未连接</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{connection.description}</p>
                      <div className="text-sm text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          <span className="truncate max-w-[300px]">{connection.endpoint}</span>
                        </div>
                        {connection.lastSync && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>上次同步: {connection.lastSync}</span>
                          </div>
                        )}
                        {connection.nextSync && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>下次同步: {connection.nextSync}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Key className="w-4 h-4 mr-1" />
                      凭证
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

              <div className="border-t p-4 bg-muted/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">自动同步</span>
                  <Switch
                    checked={connection.autoSync}
                    onCheckedChange={() => toggleAutoSync(connection.id)}
                    disabled={connection.status !== "connected"}
                  />
                  <span className="text-sm text-muted-foreground">{connection.autoSync ? "已启用" : "已禁用"}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleConnectionStatus(connection.id)}>
                    {connection.status === "connected" ? (
                      <>
                        <LinkOff className="w-4 h-4 mr-1" />
                        断开
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4 mr-1" />
                        连接
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    复制
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4 mr-1" />
                    删除
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.push("/ehr-integration")}>
          返回概览
        </Button>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新状态
        </Button>
      </div>
    </div>
  )
}
