"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, FileArchive, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// 模拟备份数据
const backupData = [
  {
    id: "bkp-001",
    name: "每日自动备份",
    date: "2025-05-15 00:00:00",
    size: "1.2 GB",
    type: "自动",
    status: "完成",
  },
  {
    id: "bkp-002",
    name: "每周自动备份",
    date: "2025-05-10 00:00:00",
    size: "1.5 GB",
    type: "自动",
    status: "完成",
  },
  {
    id: "bkp-003",
    name: "系统升级前备份",
    date: "2025-05-05 10:30:00",
    size: "1.3 GB",
    type: "手动",
    status: "完成",
  },
  {
    id: "bkp-004",
    name: "数据迁移前备份",
    date: "2025-04-28 14:15:00",
    size: "1.4 GB",
    type: "手动",
    status: "完成",
  },
  {
    id: "bkp-005",
    name: "每月自动备份",
    date: "2025-04-01 00:00:00",
    size: "1.6 GB",
    type: "自动",
    status: "完成",
  },
]

export function RestorePanel() {
  const { toast } = useToast()
  const [selectedBackup, setSelectedBackup] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isRestoring, setIsRestoring] = useState(false)
  const [restoreProgress, setRestoreProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("existing")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleRestore = () => {
    if ((activeTab === "existing" && !selectedBackup) || (activeTab === "upload" && !uploadedFile)) {
      toast({
        title: "无法开始恢复",
        description: "请先选择备份文件。",
        variant: "destructive",
      })
      return
    }

    setIsRestoring(true)
    setRestoreProgress(0)

    // 模拟恢复进度
    const interval = setInterval(() => {
      setRestoreProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)

          setTimeout(() => {
            setIsRestoring(false)
            setRestoreProgress(0)

            toast({
              title: "数据恢复成功",
              description: "系统数据已成功恢复。",
            })
          }, 500)

          return 100
        }
        return newProgress
      })
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>数据恢复</CardTitle>
        <CardDescription>从现有备份或上传的备份文件中恢复系统数据</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>
            数据恢复操作将覆盖当前系统中的数据。请确保在开始恢复前已创建当前数据的备份。
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">从现有备份恢复</TabsTrigger>
            <TabsTrigger value="upload">从上传文件恢复</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="backup-select">选择备份</Label>
              <Select value={selectedBackup} onValueChange={setSelectedBackup}>
                <SelectTrigger id="backup-select">
                  <SelectValue placeholder="选择要恢复的备份" />
                </SelectTrigger>
                <SelectContent>
                  {backupData.map((backup) => (
                    <SelectItem key={backup.id} value={backup.id}>
                      {backup.name} ({backup.date}) - {backup.size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="backup-file">上传备份文件</Label>
              <div className="grid w-full items-center gap-1.5">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="backup-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">点击上传</span> 或拖放文件
                      </p>
                      <p className="text-xs text-gray-500">支持 .bak, .zip 或 .sql 文件</p>
                    </div>
                    <Input
                      id="backup-file"
                      type="file"
                      className="hidden"
                      accept=".bak,.zip,.sql"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {uploadedFile && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileArchive className="h-4 w-4 text-blue-500" />
                    <span>{uploadedFile.name}</span>
                    <span className="text-muted-foreground">({(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isRestoring && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>恢复进度</Label>
              <span className="text-sm">{restoreProgress}%</span>
            </div>
            <Progress value={restoreProgress} />
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" disabled={isRestoring}>
            取消
          </Button>
          <Button
            onClick={handleRestore}
            disabled={
              isRestoring || (activeTab === "existing" && !selectedBackup) || (activeTab === "upload" && !uploadedFile)
            }
          >
            {isRestoring ? "恢复中..." : "开始恢复"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
