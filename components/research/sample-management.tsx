"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Plus,
  FlaskConical,
  Thermometer,
  RefreshCw,
  Dna,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 模拟样本数据
const sampleData = [
  {
    id: "S-10001",
    type: "血清",
    patientId: "P-12345",
    patientName: "张伟",
    collectionDate: "2024-03-15 09:30",
    status: "已处理",
    storageLocation: "A-103-5",
    storageTemp: "-80°C",
    volume: "3.5 mL",
    projectName: "心血管疾病生物标志物研究",
    notes: "空腹采集",
    expiryDate: "2025-03-15",
    processedBy: "李医生",
  },
  {
    id: "S-10002",
    type: "全血",
    patientId: "P-12346",
    patientName: "李明",
    collectionDate: "2024-03-15 10:45",
    status: "已处理",
    storageLocation: "A-103-6",
    storageTemp: "-80°C",
    volume: "5 mL",
    projectName: "心血管疾病生物标志物研究",
    notes: "服药后采集",
    expiryDate: "2025-03-15",
    processedBy: "李医生",
  },
  {
    id: "S-10003",
    type: "血浆",
    patientId: "P-12347",
    patientName: "王芳",
    collectionDate: "2024-03-16 08:30",
    status: "待处理",
    storageLocation: "待分配",
    storageTemp: "4°C",
    volume: "4 mL",
    projectName: "肿瘤标志物筛查研究",
    notes: "急诊样本",
    expiryDate: "2024-03-18",
    processedBy: "未处理",
  },
  {
    id: "S-10004",
    type: "组织",
    patientId: "P-12348",
    patientName: "赵强",
    collectionDate: "2024-03-16 14:20",
    status: "已处理",
    storageLocation: "B-205-3",
    storageTemp: "-196°C",
    volume: "0.5 g",
    projectName: "肿瘤基因组学研究",
    notes: "手术样本",
    expiryDate: "2026-03-16",
    processedBy: "王医生",
  },
  {
    id: "S-10005",
    type: "尿液",
    patientId: "P-12349",
    patientName: "刘洋",
    collectionDate: "2024-03-17 09:15",
    status: "已处理",
    storageLocation: "C-301-2",
    storageTemp: "-20°C",
    volume: "50 mL",
    projectName: "肾脏疾病生物标志物研究",
    notes: "24小时尿样本",
    expiryDate: "2025-03-17",
    processedBy: "张医生",
  },
  {
    id: "S-10006",
    type: "脑脊液",
    patientId: "P-12350",
    patientName: "陈静",
    collectionDate: "2024-03-17 11:30",
    status: "已处理",
    storageLocation: "A-104-1",
    storageTemp: "-80°C",
    volume: "2 mL",
    projectName: "神经退行性疾病研究",
    notes: "腰椎穿刺获取",
    expiryDate: "2026-03-17",
    processedBy: "赵医生",
  },
  {
    id: "S-10007",
    type: "DNA",
    patientId: "P-12351",
    patientName: "周明",
    collectionDate: "2024-03-18 10:00",
    status: "进行中",
    storageLocation: "D-401-4",
    storageTemp: "-20°C",
    volume: "200 μg",
    projectName: "遗传易感性研究",
    notes: "高纯度提取",
    expiryDate: "2027-03-18",
    processedBy: "进行中",
  },
]

// 模拟研究项目数据
const projectsData = [
  { id: "P-001", name: "心血管疾病生物标志物研究" },
  { id: "P-002", name: "肿瘤标志物筛查研究" },
  { id: "P-003", name: "肿瘤基因组学研究" },
  { id: "P-004", name: "肾脏疾病生物标志物研究" },
  { id: "P-005", name: "神经退行性疾病研究" },
  { id: "P-006", name: "遗传易感性研究" },
]

// 样本类型
const sampleTypes = ["血清", "血浆", "全血", "尿液", "组织", "脑脊液", "DNA", "RNA", "蛋白质", "细胞", "其他"]

export function SampleManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([])
  const [showAddSampleDialog, setShowAddSampleDialog] = useState(false)
  const [showBatchProcessDialog, setShowBatchProcessDialog] = useState(false)

  // 新样本数据
  const [newSample, setNewSample] = useState({
    type: "",
    patientId: "",
    patientName: "",
    volume: "",
    projectName: "",
    notes: "",
  })

  // 批处理操作
  const [batchOperation, setBatchOperation] = useState<string | null>(null)
  const [batchStorageLocation, setBatchStorageLocation] = useState("")
  const [batchStorageTemp, setBatchStorageTemp] = useState("")

  // 过滤样本
  const filteredSamples = sampleData.filter(
    (sample) =>
      (searchTerm === "" ||
        sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedProject === null || sample.projectName === selectedProject) &&
      (activeTab === "all" ||
        (activeTab === "processed" && sample.status === "已处理") ||
        (activeTab === "unprocessed" && sample.status === "待处理") ||
        (activeTab === "in-progress" && sample.status === "进行中")),
  )

  // 处理样本选择
  const handleSelectSample = (sampleId: string) => {
    if (selectedSampleIds.includes(sampleId)) {
      setSelectedSampleIds(selectedSampleIds.filter((id) => id !== sampleId))
    } else {
      setSelectedSampleIds([...selectedSampleIds, sampleId])
    }
  }

  // 处理全选
  const handleSelectAll = () => {
    if (selectedSampleIds.length === filteredSamples.length) {
      setSelectedSampleIds([])
    } else {
      setSelectedSampleIds(filteredSamples.map((sample) => sample.id))
    }
  }

  // 添加样本
  const handleAddSample = () => {
    // 这里仅模拟添加样本操作
    alert("样本已添加!")
    setShowAddSampleDialog(false)
    // 重置表单
    setNewSample({
      type: "",
      patientId: "",
      patientName: "",
      volume: "",
      projectName: "",
      notes: "",
    })
  }

  // 处理批处理操作
  const handleBatchProcess = () => {
    // 这里仅模拟批处理操作
    alert(`已对${selectedSampleIds.length}个样本执行${batchOperation}操作`)
    setShowBatchProcessDialog(false)
    setSelectedSampleIds([])
    setBatchOperation(null)
  }

  // 获取样本状态徽章
  const getSampleStatusBadge = (status: string) => {
    switch (status) {
      case "已处理":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            已处理
          </Badge>
        )
      case "待处理":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            待处理
          </Badge>
        )
      case "进行中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <RefreshCw className="h-3 w-3 mr-1" />
            进行中
          </Badge>
        )
      case "已过期":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            已过期
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
          <div>
            <CardTitle>样本管理中心</CardTitle>
            <CardDescription>管理和追踪研究样本的收集、处理和存储</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowAddSampleDialog(true)}>
              <Plus className="mr-1 h-4 w-4" />
              添加样本
            </Button>
            <Button
              variant="outline"
              disabled={selectedSampleIds.length === 0}
              onClick={() => setShowBatchProcessDialog(true)}
            >
              <FlaskConical className="mr-1 h-4 w-4" />
              批量处理
            </Button>
            <Button variant="outline">
              <Download className="mr-1 h-4 w-4" />
              导出
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索样本ID、患者姓名或样本类型..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedProject || ""} onValueChange={(value) => setSelectedProject(value || null)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="选择研究项目" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全部项目</SelectItem>
              {projectsData.map((project) => (
                <SelectItem key={project.id} value={project.name}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            高级筛选
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">全部样本</TabsTrigger>
            <TabsTrigger value="processed">已处理</TabsTrigger>
            <TabsTrigger value="unprocessed">待处理</TabsTrigger>
            <TabsTrigger value="in-progress">进行中</TabsTrigger>
          </TabsList>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={filteredSamples.length > 0 && selectedSampleIds.length === filteredSamples.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>样本ID</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>患者信息</TableHead>
                  <TableHead>采集时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>存储位置</TableHead>
                  <TableHead>存储温度</TableHead>
                  <TableHead>研究项目</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSamples.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                      未找到匹配的样本记录
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSamples.map((sample) => (
                    <TableRow key={sample.id} className={selectedSampleIds.includes(sample.id) ? "bg-muted/30" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSampleIds.includes(sample.id)}
                          onCheckedChange={() => handleSelectSample(sample.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{sample.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {sample.type === "DNA" ? (
                            <Dna className="h-4 w-4 mr-1 text-blue-500" />
                          ) : sample.type === "血清" || sample.type === "血浆" || sample.type === "全血" ? (
                            <FlaskConical className="h-4 w-4 mr-1 text-red-500" />
                          ) : (
                            <FlaskConical className="h-4 w-4 mr-1 text-gray-500" />
                          )}
                          {sample.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{sample.patientName}</div>
                        <div className="text-xs text-muted-foreground">{sample.patientId}</div>
                      </TableCell>
                      <TableCell>{sample.collectionDate}</TableCell>
                      <TableCell>{getSampleStatusBadge(sample.status)}</TableCell>
                      <TableCell>{sample.storageLocation}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
                          {sample.storageTemp}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">{sample.projectName}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-1">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* 统计摘要 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">样本总数</div>
                    <div className="text-2xl font-bold">{sampleData.length}</div>
                  </div>
                  <FlaskConical className="h-8 w-8 text-medical-600 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">已处理样本</div>
                    <div className="text-2xl font-bold">{sampleData.filter((s) => s.status === "已处理").length}</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">待处理样本</div>
                    <div className="text-2xl font-bold">{sampleData.filter((s) => s.status === "待处理").length}</div>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">即将过期</div>
                    <div className="text-2xl font-bold">2</div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </CardContent>

      {/* 添加样本对话框 */}
      <Dialog open={showAddSampleDialog} onOpenChange={setShowAddSampleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新样本</DialogTitle>
            <DialogDescription>输入新样本的详细信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sample-type">样本类型</Label>
                <Select value={newSample.type} onValueChange={(value) => setNewSample({ ...newSample, type: value })}>
                  <SelectTrigger id="sample-type">
                    <SelectValue placeholder="选择样本类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">样本量</Label>
                <Input
                  id="volume"
                  placeholder="如: 5 mL"
                  value={newSample.volume}
                  onChange={(e) => setNewSample({ ...newSample, volume: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient-id">患者ID</Label>
                <Input
                  id="patient-id"
                  placeholder="输入患者ID"
                  value={newSample.patientId}
                  onChange={(e) => setNewSample({ ...newSample, patientId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-name">患者姓名</Label>
                <Input
                  id="patient-name"
                  placeholder="输入患者姓名"
                  value={newSample.patientName}
                  onChange={(e) => setNewSample({ ...newSample, patientName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">研究项目</Label>
              <Select
                value={newSample.projectName}
                onValueChange={(value) => setNewSample({ ...newSample, projectName: value })}
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="选择研究项目" />
                </SelectTrigger>
                <SelectContent>
                  {projectsData.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">备注</Label>
              <Input
                id="notes"
                placeholder="添加备注信息"
                value={newSample.notes}
                onChange={(e) => setNewSample({ ...newSample, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSampleDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddSample}>添加样本</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 批处理对话框 */}
      <Dialog open={showBatchProcessDialog} onOpenChange={setShowBatchProcessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>批量处理样本</DialogTitle>
            <DialogDescription>选择{selectedSampleIds.length}个样本的批量操作</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch-operation">选择操作</Label>
              <Select value={batchOperation || ""} onValueChange={setBatchOperation}>
                <SelectTrigger id="batch-operation">
                  <SelectValue placeholder="选择操作类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="process">标记为已处理</SelectItem>
                  <SelectItem value="move">移动存储位置</SelectItem>
                  <SelectItem value="export">导出样本数据</SelectItem>
                  <SelectItem value="delete">删除样本</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {batchOperation === "move" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="storage-location">存储位置</Label>
                  <Input
                    id="storage-location"
                    placeholder="如: A-103-5"
                    value={batchStorageLocation}
                    onChange={(e) => setBatchStorageLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage-temp">存储温度</Label>
                  <Select value={batchStorageTemp} onValueChange={setBatchStorageTemp}>
                    <SelectTrigger id="storage-temp">
                      <SelectValue placeholder="选择存储温度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="室温">室温</SelectItem>
                      <SelectItem value="4°C">4°C</SelectItem>
                      <SelectItem value="-20°C">-20°C</SelectItem>
                      <SelectItem value="-80°C">-80°C</SelectItem>
                      <SelectItem value="-196°C">-196°C (液氮)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {batchOperation === "delete" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">警告：此操作不可撤销</h4>
                    <p className="text-sm text-red-700 mt-1">
                      您即将删除{selectedSampleIds.length}个样本记录。此操作无法撤销，请确认您要继续。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBatchProcessDialog(false)}>
              取消
            </Button>
            <Button
              onClick={handleBatchProcess}
              disabled={!batchOperation}
              variant={batchOperation === "delete" ? "destructive" : "default"}
            >
              {batchOperation === "delete" && <Trash2 className="mr-1 h-4 w-4" />}
              确认
              {batchOperation === "process"
                ? "处理"
                : batchOperation === "move"
                  ? "移动"
                  : batchOperation === "export"
                    ? "导出"
                    : batchOperation === "delete"
                      ? "删除"
                      : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
