"use client"

import { useState } from "react"
import { Search, Filter, Download, Plus, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 模拟药物数据
const medications = [
  {
    id: "med-001",
    name: "二甲双胍",
    genericName: "盐酸二甲双胍片",
    category: "口服降糖药",
    manufacturer: "正大天晴药业集团",
    stock: 1250,
    unit: "盒",
    specification: "0.5g*30片/盒",
    price: 35.8,
    status: "正常",
    expiryDate: "2026-05-15",
    description: "用于2型糖尿病的一线用药，可单独使用或与其他降糖药联合使用。",
    sideEffects: "常见不良反应包括胃肠道反应、乏力、头痛等。",
    interactions: "与某些造影剂同时使用可能增加肾病风险。",
    contraindications: "肾功能不全、急性或慢性代谢性酸中毒患者禁用。",
  },
  {
    id: "med-002",
    name: "阿托伐他汀",
    genericName: "阿托伐他汀钙片",
    category: "调脂药",
    manufacturer: "辉瑞制药",
    stock: 850,
    unit: "盒",
    specification: "20mg*7片/盒",
    price: 89.5,
    status: "正常",
    expiryDate: "2026-08-20",
    description: "用于高胆固醇血症和混合型高脂血症的治疗，可降低总胆固醇、LDL-C、甘油三酯水平。",
    sideEffects: "可能出现肌肉疼痛、肝功能异常、消化不良等不良反应。",
    interactions: "与环孢素、红霉素等药物同时使用可增加肌病风险。",
    contraindications: "活动性肝病患者、孕妇及哺乳期妇女禁用。",
  },
  {
    id: "med-003",
    name: "氯沙坦",
    genericName: "氯沙坦钾片",
    category: "降压药",
    manufacturer: "默沙东制药",
    stock: 620,
    unit: "盒",
    specification: "50mg*7片/盒",
    price: 68.2,
    status: "正常",
    expiryDate: "2025-12-10",
    description: "血管紧张素II受体拮抗剂，用于高血压和糖尿病肾病的治疗。",
    sideEffects: "可能出现头晕、头痛、上呼吸道感染等不良反应。",
    interactions: "与利尿剂合用可能增强降压效果，与非甾体抗炎药合用可能降低降压效果。",
    contraindications: "对氯沙坦过敏者禁用，妊娠期妇女禁用。",
  },
  {
    id: "med-004",
    name: "布洛芬",
    genericName: "布洛芬片",
    category: "非甾体抗炎药",
    manufacturer: "国药集团",
    stock: 1800,
    unit: "盒",
    specification: "0.2g*24片/盒",
    price: 15.6,
    status: "低库存",
    expiryDate: "2025-09-05",
    description: "用于缓解轻至中度疼痛，如头痛、牙痛、肌肉痛、关节痛等，也可用于退热。",
    sideEffects: "可能出现胃肠道不适、恶心、呕吐等不良反应。",
    interactions: "与阿司匹林、华法林等药物同时使用可能增加出血风险。",
    contraindications: "消化性溃疡活动期、严重心功能不全患者禁用。",
  },
  {
    id: "med-005",
    name: "左氧氟沙星",
    genericName: "左氧氟沙星片",
    category: "抗生素",
    manufacturer: "第一三共制药",
    stock: 450,
    unit: "盒",
    specification: "0.5g*5片/盒",
    price: 48.9,
    status: "正常",
    expiryDate: "2026-03-18",
    description: "广谱抗菌药，用于敏感菌所致的呼吸道、泌尿道、皮肤软组织感染等。",
    sideEffects: "可能出现恶心、腹泻、头晕、光敏反应等不良反应。",
    interactions: "与含铝、镁、钙、铁的制剂同时服用可能降低吸收。",
    contraindications: "对喹诺酮类药物过敏者、癫痫患者、儿童及青少年禁用。",
  },
]

// 药物分类列表
const categories = ["全部", "口服降糖药", "调脂药", "降压药", "非甾体抗炎药", "抗生素"]

export function MedicationCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedMedication, setSelectedMedication] = useState<(typeof medications)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingMedication, setEditingMedication] = useState<(typeof medications)[0] | null>(null)

  // 过滤药物
  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "全部" || med.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 查看药物详情
  const viewMedicationDetail = (medication: (typeof medications)[0]) => {
    setSelectedMedication(medication)
    setIsDetailOpen(true)
  }

  // 编辑药物
  const editMedication = (medication: (typeof medications)[0]) => {
    setEditingMedication({ ...medication })
    setIsEditMode(true)
    setIsDetailOpen(true)
  }

  // 保存药物编辑
  const saveMedicationEdit = () => {
    // 在实际应用中，这里应该调用API保存更改
    // 这里仅作为演示，更新本地状态
    if (!editingMedication) return

    // 找到并更新药物
    const index = medications.findIndex((med) => med.id === editingMedication.id)
    if (index !== -1) {
      medications[index] = editingMedication
    }

    setIsEditMode(false)
    setSelectedMedication(editingMedication)
    setEditingMedication(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>药物目录管理</CardTitle>
          <CardDescription>管理系统中的所有药物信息，包括库存、价格和详细说明</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索药物名称、通用名或厂商..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  分类: {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>选择药物分类</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              添加新药物
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" />
              导出数据
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>药品名称</TableHead>
                  <TableHead>通用名</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead className="hidden md:table-cell">生产厂商</TableHead>
                  <TableHead className="text-right">库存</TableHead>
                  <TableHead className="text-right">单价 (¥)</TableHead>
                  <TableHead className="text-right">状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell className="font-medium">{medication.name}</TableCell>
                    <TableCell>{medication.genericName}</TableCell>
                    <TableCell>{medication.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{medication.manufacturer}</TableCell>
                    <TableCell className="text-right">
                      {medication.stock} {medication.unit}
                    </TableCell>
                    <TableCell className="text-right">{medication.price}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={medication.status === "正常" ? "default" : "destructive"}>
                        {medication.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => viewMedicationDetail(medication)}>
                          查看
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => editMedication(medication)}>
                          编辑
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            显示 {filteredMedications.length} 个药物（共 {medications.length} 个）
          </div>
        </CardFooter>
      </Card>

      {/* 药物详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>药物详情</DialogTitle>
            <DialogDescription>查看药物的详细信息和使用说明</DialogDescription>
          </DialogHeader>

          {isEditMode ? (
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-amber-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                您正在编辑药物信息
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  取消
                </Button>
                <Button onClick={saveMedicationEdit}>保存更改</Button>
              </div>
            </div>
          ) : (
            <div className="mb-4 flex justify-end">
              <Button variant="outline" onClick={() => editMedication(selectedMedication!)}>
                编辑药物
              </Button>
            </div>
          )}

          {selectedMedication && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">基本信息</TabsTrigger>
                <TabsTrigger value="usage">用法用量</TabsTrigger>
                <TabsTrigger value="warnings">注意事项</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">药品名称</h4>
                    <p>{selectedMedication.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">通用名</h4>
                    <p>{selectedMedication.genericName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">分类</h4>
                    <p>{selectedMedication.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">生产厂商</h4>
                    <p>{selectedMedication.manufacturer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">规格</h4>
                    <p>{selectedMedication.specification}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">单价</h4>
                    <p>¥{selectedMedication.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">库存</h4>
                    <p>
                      {selectedMedication.stock} {selectedMedication.unit}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">有效期至</h4>
                    <p>{selectedMedication.expiryDate}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">药品说明</h4>
                    <p className="mt-1">{selectedMedication.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="warnings" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">不良反应</h4>
                  <p className="mt-1">{selectedMedication.sideEffects}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">药物相互作用</h4>
                  <p className="mt-1">{selectedMedication.interactions}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">禁忌症</h4>
                  <p className="mt-1">{selectedMedication.contraindications}</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
