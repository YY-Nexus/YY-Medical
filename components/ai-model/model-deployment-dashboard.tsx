"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Server, Globe, Clock, CheckCircle, AlertCircle, Settings, RotateCcw, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface ModelData {
  id: string
  name: string
  version: string
  status: string
  versions: Array<{
    version: string
    date: string
    status: string
    accuracy: number
  }>
  [key: string]: any
}

interface ModelDeploymentProps {
  model?: ModelData
  onClose?: () => void
}

// 模拟模型数据
const mockModelData: ModelData = {
  id: "model-001",
  name: "肺部CT分析模型",
  version: "2.3.0",
  status: "active",
  versions: [
    { version: "2.3.0", date: "2023-11-01", status: "active", accuracy: 0.94 },
    { version: "2.2.1", date: "2023-10-15", status: "archived", accuracy: 0.92 },
    { version: "2.1.0", date: "2023-09-20", status: "archived", accuracy: 0.89 },
    { version: "2.0.5", date: "2023-08-10", status: "archived", accuracy: 0.87 },
  ],
}

// 模拟部署环境数据
const deploymentEnvironments = [
  { id: "env-1", name: "开发环境", status: "active", version: "2.3.0", lastDeployed: "2023-11-10" },
  { id: "env-2", name: "测试环境", status: "active", version: "2.3.0", lastDeployed: "2023-11-12" },
  { id: "env-3", name: "预生产环境", status: "active", version: "2.2.1", lastDeployed: "2023-10-20" },
  { id: "env-4", name: "生产环境", status: "active", version: "2.2.1", lastDeployed: "2023-10-25" },
]

// 模拟部署历史
const deploymentHistory = [
  { id: "dep-1", environment: "生产环境", version: "2.2.1", date: "2023-10-25", status: "success", user: "张医生" },
  { id: "dep-2", environment: "预生产环境", version: "2.2.1", date: "2023-10-20", status: "success", user: "李工程师" },
  { id: "dep-3", environment: "生产环境", version: "2.1.0", date: "2023-09-15", status: "success", user: "张医生" },
  { id: "dep-4", environment: "生产环境", version: "2.0.5", date: "2023-08-10", status: "failed", user: "王管理员" },
]

export function ModelDeployment({ model = mockModelData, onClose = () => {} }: ModelDeploymentProps) {
  const { toast } = useToast()
  const [deployingTo, setDeployingTo] = useState<string | null>(null)
  const [deployProgress, setDeployProgress] = useState(0)
  const [selectedVersion, setSelectedVersion] = useState(model.version)
  const [environments, setEnvironments] = useState(deploymentEnvironments)
  const [deployHistory, setDeployHistory] = useState(deploymentHistory)
  const [activeTab, setActiveTab] = useState("environments")

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "success":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> {status === "active" ? "活跃" : "成功"}
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Settings className="h-3 w-3" /> 维护中
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 失败
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 部署模型
  const deployModel = (environmentId: string) => {
    setDeployingTo(environmentId)
    setDeployProgress(0)

    // 模拟部署进度
    const interval = setInterval(() => {
      setDeployProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // 更新环境版本
          setEnvironments(
            environments.map((env) =>
              env.id === environmentId
                ? { ...env, version: selectedVersion, lastDeployed: new Date().toISOString().split("T")[0] }
                : env,
            ),
          )

          // 添加部署历史
          const environment = environments.find((env) => env.id === environmentId)
          if (environment) {
            const newDeployment = {
              id: `dep-${Date.now()}`,
              environment: environment.name,
              version: selectedVersion,
              date: new Date().toISOString().split("T")[0],
              status: "success",
              user: "当前用户",
            }
            setDeployHistory([newDeployment, ...deployHistory])
          }

          setDeployingTo(null)

          toast({
            title: "部署成功",
            description: `模型已成功部署到${environments.find((env) => env.id === environmentId)?.name}`,
          })

          return 0
        }
        return prev + 10
      })
    }, 300)

    return () => clearInterval(interval)
  }

  // 回滚部署
  const rollbackDeployment = (environmentId: string, version: string) => {
    const environment = environments.find((env) => env.id === environmentId)
    if (environment) {
      setEnvironments(
        environments.map((env) =>
          env.id === environmentId
            ? { ...env, version: version, lastDeployed: new Date().toISOString().split("T")[0] }
            : env,
        ),
      )

      const newDeployment = {
        id: `dep-${Date.now()}`,
        environment: environment.name,
        version: version,
        date: new Date().toISOString().split("T")[0],
        status: "success",
        user: "当前用户 (回滚)",
      }
      setDeployHistory([newDeployment, ...deployHistory])

      toast({
        title: "回滚成功",
        description: `已将${environment.name}回滚到版本 ${version}`,
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-xl">{model.name} - 部署管理</CardTitle>
            <CardDescription>管理模型在各环境中的部署</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="environments">部署环境</TabsTrigger>
            <TabsTrigger value="history">部署历史</TabsTrigger>
          </TabsList>

          <TabsContent value="environments" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                当前版本: <span className="font-medium">{model.version}</span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="version-select" className="text-sm">
                  部署版本:
                </Label>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger id="version-select" className="w-32">
                    <SelectValue placeholder="选择版本" />
                  </SelectTrigger>
                  <SelectContent>
                    {model.versions.map((version) => (
                      <SelectItem key={version.version} value={version.version}>
                        {version.version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {environments.map((env) => (
                <Card key={env.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-medical-600" />
                        <h3 className="font-medium">{env.name}</h3>
                        {getStatusBadge(env.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">当前版本:</span>
                        <Badge variant="outline">{env.version}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-gray-500">上次部署: {env.lastDeployed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`auto-deploy-${env.id}`} className="text-sm cursor-pointer">
                          自动部署
                        </Label>
                        <Switch id={`auto-deploy-${env.id}`} />
                      </div>
                    </div>

                    {deployingTo === env.id && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">正在部署版本 {selectedVersion}...</span>
                          <span className="text-sm font-medium">{deployProgress}%</span>
                        </div>
                        <Progress value={deployProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex gap-2 ml-auto">
                      {env.version !== model.versions[0].version && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => rollbackDeployment(env.id, model.versions[0].version)}
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1" />
                          回滚到最新版本
                        </Button>
                      )}

                      {deployingTo === env.id ? (
                        <Button size="sm" disabled>
                          <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                          部署中...
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-medical-600 hover:bg-medical-700"
                          onClick={() => deployModel(env.id)}
                          disabled={env.version === selectedVersion}
                        >
                          <Globe className="h-3.5 w-3.5 mr-1" />
                          部署版本 {selectedVersion}
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-5 bg-slate-50 p-3 text-sm font-medium">
                <div>环境</div>
                <div>版本</div>
                <div>部署日期</div>
                <div>状态</div>
                <div>操作人</div>
              </div>
              <div className="divide-y">
                {deployHistory.map((deployment) => (
                  <div key={deployment.id} className="grid grid-cols-5 p-3 text-sm">
                    <div>{deployment.environment}</div>
                    <div>{deployment.version}</div>
                    <div>{deployment.date}</div>
                    <div>{getStatusBadge(deployment.status)}</div>
                    <div>{deployment.user}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onClose}>
          返回
        </Button>
      </CardFooter>
    </Card>
  )
}

// 这是页面级组件，用于独立页面展示
export function ModelDeploymentDashboard() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">模型部署管理</h1>
      <ModelDeployment />
    </div>
  )
}
