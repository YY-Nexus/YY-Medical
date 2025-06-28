"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, RotateCcw, CheckCircle, AlertCircle, Settings, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ModelVersion {
  version: string
  date: string
  status: string
  accuracy: number
  notes?: string
  changes?: string[]
}

interface ModelData {
  id: string
  name: string
  version: string
  versions: ModelVersion[]
  [key: string]: any
}

interface ModelVersionHistoryProps {
  model: ModelData
  onClose: () => void
}

export function ModelVersionHistory({ model, onClose }: ModelVersionHistoryProps) {
  const { toast } = useToast()
  const [versions, setVersions] = useState<ModelVersion[]>(model.versions)
  const [isAddingVersion, setIsAddingVersion] = useState(false)
  const [newVersion, setNewVersion] = useState({
    version: "",
    notes: "",
    changes: "",
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 活跃
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Settings className="h-3 w-3" /> 维护中
          </Badge>
        )
      case "inactive":
      case "archived":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {status === "inactive" ? "未激活" : "已归档"}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 回滚到指定版本
  const handleRollback = (version: string) => {
    toast({
      title: "版本回滚",
      description: `已将模型 ${model.name} 回滚到版本 ${version}`,
    })
  }

  // 添加新版本
  const handleAddVersion = () => {
    if (!newVersion.version.trim()) {
      toast({
        title: "错误",
        description: "版本号不能为空",
        variant: "destructive",
      })
      return
    }

    const newVersionObj: ModelVersion = {
      version: newVersion.version,
      date: new Date().toISOString().split("T")[0],
      status: "inactive",
      accuracy: 0.9,
      notes: newVersion.notes,
      changes: newVersion.changes.split("\n").filter((line) => line.trim()),
    }

    setVersions([newVersionObj, ...versions])
    setIsAddingVersion(false)
    setNewVersion({ version: "", notes: "", changes: "" })

    toast({
      title: "版本添加成功",
      description: `已添加新版本 ${newVersion.version}`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-xl">{model.name} - 版本历史</CardTitle>
            <CardDescription>管理模型的所有版本</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            当前版本: <span className="font-medium">{model.version}</span>
          </div>
          <Dialog open={isAddingVersion} onOpenChange={setIsAddingVersion}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                添加新版本
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新版本</DialogTitle>
                <DialogDescription>为 {model.name} 添加新版本信息</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="version">版本号</Label>
                  <Input
                    id="version"
                    placeholder="例如: 2.4.0"
                    value={newVersion.version}
                    onChange={(e) => setNewVersion({ ...newVersion, version: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">版本说明</Label>
                  <Textarea
                    id="notes"
                    placeholder="版本的主要改进和目的"
                    value={newVersion.notes}
                    onChange={(e) => setNewVersion({ ...newVersion, notes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="changes">变更列表</Label>
                  <Textarea
                    id="changes"
                    placeholder="每行一个变更项"
                    value={newVersion.changes}
                    onChange={(e) => setNewVersion({ ...newVersion, changes: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingVersion(false)}>
                  取消
                </Button>
                <Button onClick={handleAddVersion}>添加版本</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {versions.map((version, index) => (
            <Card key={version.version} className={version.status === "active" ? "border-medical-500" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">版本 {version.version}</h3>
                    {getStatusBadge(version.status)}
                  </div>
                  <div className="text-sm text-gray-500">{version.date}</div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  {version.notes && <p className="text-sm">{version.notes}</p>}

                  {version.changes && version.changes.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">变更内容:</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {version.changes.map((change, i) => (
                          <li key={i}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 mr-2">准确率:</span>
                    <span className="text-sm font-medium text-medical-600">{(version.accuracy * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    下载
                  </Button>
                  {version.status !== "active" && (
                    <Button
                      size="sm"
                      className="bg-medical-600 hover:bg-medical-700"
                      onClick={() => handleRollback(version.version)}
                    >
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      回滚到此版本
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onClose}>
          返回
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          导出版本历史
        </Button>
      </CardFooter>
    </Card>
  )
}
