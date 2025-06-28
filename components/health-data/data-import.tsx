"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Database } from "lucide-react"

export function HealthDataImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dataSource, setDataSource] = useState("manual")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)

    // 模拟上传过程
    setTimeout(() => {
      setIsUploading(false)
      setSelectedFile(null)
      // 这里可以添加成功提示
    }, 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>文件导入</CardTitle>
          <CardDescription>上传CSV、Excel或JSON格式的健康数据文件</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">拖放文件到此处或点击下方按钮选择文件</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.json"
                onChange={handleFileChange}
              />
              <Label
                htmlFor="file-upload"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
              >
                选择文件
              </Label>
            </div>

            {selectedFile && (
              <div className="flex items-center p-2 bg-muted rounded">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-sm truncate flex-1">{selectedFile.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                  移除
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="data-type">数据类型</Label>
              <Select defaultValue="vitals">
                <SelectTrigger id="data-type">
                  <SelectValue placeholder="选择数据类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vitals">生命体征</SelectItem>
                  <SelectItem value="lab">检验结果</SelectItem>
                  <SelectItem value="medication">用药记录</SelectItem>
                  <SelectItem value="activity">活动数据</SelectItem>
                  <SelectItem value="sleep">睡眠数据</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? "上传中..." : "上传数据"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>数据源连接</CardTitle>
          <CardDescription>连接到外部数据源或手动输入数据</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data-source">数据来源</Label>
              <Select value={dataSource} onValueChange={setDataSource}>
                <SelectTrigger id="data-source">
                  <SelectValue placeholder="选择数据来源" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">手动输入</SelectItem>
                  <SelectItem value="api">API连接</SelectItem>
                  <SelectItem value="device">设备同步</SelectItem>
                  <SelectItem value="ehr">电子病历系统</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dataSource === "manual" && (
              <div className="space-y-2">
                <Label htmlFor="patient-id">患者ID</Label>
                <Input id="patient-id" placeholder="输入患者ID" />
              </div>
            )}

            {dataSource === "api" && (
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API端点</Label>
                <Input id="api-endpoint" placeholder="https://api.example.com/health-data" />
                <Label htmlFor="api-key">API密钥</Label>
                <Input id="api-key" type="password" placeholder="输入API密钥" />
              </div>
            )}

            {dataSource === "device" && (
              <div className="space-y-2">
                <Label>可用设备</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    智能手表
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    血压计
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    血糖仪
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    体重秤
                  </Button>
                </div>
              </div>
            )}

            {dataSource === "ehr" && (
              <div className="space-y-2">
                <Label htmlFor="ehr-system">电子病历系统</Label>
                <Select defaultValue="system1">
                  <SelectTrigger id="ehr-system">
                    <SelectValue placeholder="选择EHR系统" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system1">系统 A</SelectItem>
                    <SelectItem value="system2">系统 B</SelectItem>
                    <SelectItem value="system3">系统 C</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="ehr-credentials">凭证</Label>
                <Input id="ehr-credentials" type="password" placeholder="输入连接凭证" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{dataSource === "manual" ? "进入数据表单" : "连接数据源"}</Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>数据导入历史</CardTitle>
          <CardDescription>查看最近的数据导入记录和状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-3 font-medium border-b">
              <div>导入时间</div>
              <div>数据类型</div>
              <div>来源</div>
              <div>记录数</div>
              <div>状态</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-5 p-3">
                <div>2023-10-15 14:30</div>
                <div>生命体征</div>
                <div>CSV文件</div>
                <div>128</div>
                <div className="text-green-600">成功</div>
              </div>
              <div className="grid grid-cols-5 p-3">
                <div>2023-10-14 09:15</div>
                <div>检验结果</div>
                <div>API</div>
                <div>56</div>
                <div className="text-green-600">成功</div>
              </div>
              <div className="grid grid-cols-5 p-3">
                <div>2023-10-12 16:45</div>
                <div>用药记录</div>
                <div>手动输入</div>
                <div>12</div>
                <div className="text-green-600">成功</div>
              </div>
              <div className="grid grid-cols-5 p-3">
                <div>2023-10-10 11:20</div>
                <div>活动数据</div>
                <div>智能手表</div>
                <div>340</div>
                <div className="text-amber-600">部分成功</div>
              </div>
              <div className="grid grid-cols-5 p-3">
                <div>2023-10-08 08:05</div>
                <div>睡眠数据</div>
                <div>智能手表</div>
                <div>0</div>
                <div className="text-red-600">失败</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline">导出记录</Button>
          <Button variant="outline">查看全部</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
