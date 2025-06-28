"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalButton } from "@/components/ui/medical-button"
import {
  Clipboard,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  ArrowUpDown,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MedicationInventoryClient() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        heading="药品库存管理"
        subheading="管理和监控药品库存"
        icon={<Clipboard className="h-6 w-6 text-medical-600" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">库存概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <div className="text-sm text-muted-foreground">总药品数量</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm font-medium">库存充足</div>
                <div className="text-2xl font-bold text-green-600">876</div>
              </div>
              <div>
                <div className="text-sm font-medium">库存不足</div>
                <div className="text-2xl font-bold text-amber-600">245</div>
              </div>
              <div>
                <div className="text-sm font-medium">即将过期</div>
                <div className="text-2xl font-bold text-red-600">78</div>
              </div>
              <div>
                <div className="text-sm font-medium">已订购</div>
                <div className="text-2xl font-bold text-blue-600">49</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">库存预警</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium">12种药品库存紧急</div>
                <div className="text-sm text-muted-foreground">库存低于安全水平</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-amber-500" />
              <div>
                <div className="font-medium">28种药品需要补货</div>
                <div className="text-sm text-muted-foreground">库存低于30%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium">8种药品一周内过期</div>
                <div className="text-sm text-muted-foreground">需要立即处理</div>
              </div>
            </div>
            <MedicalButton className="w-full" variant="outline">
              查看所有预警
            </MedicalButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <MedicalButton className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              新增药品入库
            </MedicalButton>
            <MedicalButton className="w-full justify-start" variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              药品出库
            </MedicalButton>
            <MedicalButton className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              库存盘点
            </MedicalButton>
            <MedicalButton className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出库存报告
            </MedicalButton>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索药品..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="药品类别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有类别</SelectItem>
              <SelectItem value="antibiotics">抗生素</SelectItem>
              <SelectItem value="analgesics">镇痛药</SelectItem>
              <SelectItem value="antihypertensives">降压药</SelectItem>
              <SelectItem value="antidiabetics">降糖药</SelectItem>
            </SelectContent>
          </Select>

          <MedicalButton variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            高级筛选
          </MedicalButton>
          <MedicalButton size="sm">
            <Plus className="mr-2 h-4 w-4" />
            添加药品
          </MedicalButton>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">所有药品</TabsTrigger>
          <TabsTrigger value="low">库存不足</TabsTrigger>
          <TabsTrigger value="expiring">即将过期</TabsTrigger>
          <TabsTrigger value="ordered">已订购</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>药品名称</TableHead>
                    <TableHead>规格</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>库存量</TableHead>
                    <TableHead>库存状态</TableHead>
                    <TableHead>有效期至</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>{medication.specification}</TableCell>
                      <TableCell>{medication.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24">
                            <Progress value={medication.stockPercentage} className="h-2" />
                          </div>
                          <span>
                            {medication.currentStock}/{medication.maxStock}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StockStatusBadge status={medication.status} />
                      </TableCell>
                      <TableCell>{medication.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <MedicalButton variant="outline" size="sm">
                            详情
                          </MedicalButton>
                          <MedicalButton variant="outline" size="sm">
                            补货
                          </MedicalButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>药品名称</TableHead>
                    <TableHead>规格</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>库存量</TableHead>
                    <TableHead>库存状态</TableHead>
                    <TableHead>有效期至</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications
                    .filter((med) => med.status === "low" || med.status === "critical")
                    .map((medication) => (
                      <TableRow key={medication.id}>
                        <TableCell className="font-medium">{medication.name}</TableCell>
                        <TableCell>{medication.specification}</TableCell>
                        <TableCell>{medication.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24">
                              <Progress value={medication.stockPercentage} className="h-2" />
                            </div>
                            <span>
                              {medication.currentStock}/{medication.maxStock}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StockStatusBadge status={medication.status} />
                        </TableCell>
                        <TableCell>{medication.expiryDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <MedicalButton variant="outline" size="sm">
                              详情
                            </MedicalButton>
                            <MedicalButton size="sm">补货</MedicalButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>药品名称</TableHead>
                    <TableHead>规格</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>库存量</TableHead>
                    <TableHead>库存状态</TableHead>
                    <TableHead>有效期至</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications
                    .filter((med) => med.status === "expiring")
                    .map((medication) => (
                      <TableRow key={medication.id}>
                        <TableCell className="font-medium">{medication.name}</TableCell>
                        <TableCell>{medication.specification}</TableCell>
                        <TableCell>{medication.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24">
                              <Progress value={medication.stockPercentage} className="h-2" />
                            </div>
                            <span>
                              {medication.currentStock}/{medication.maxStock}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StockStatusBadge status={medication.status} />
                        </TableCell>
                        <TableCell>{medication.expiryDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <MedicalButton variant="outline" size="sm">
                              详情
                            </MedicalButton>
                            <MedicalButton variant="outline" size="sm">
                              处理
                            </MedicalButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ordered" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>药品名称</TableHead>
                    <TableHead>规格</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>订购数量</TableHead>
                    <TableHead>订购日期</TableHead>
                    <TableHead>预计到货</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderedMedications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>{medication.specification}</TableCell>
                      <TableCell>{medication.category}</TableCell>
                      <TableCell>{medication.orderedQuantity}</TableCell>
                      <TableCell>{medication.orderDate}</TableCell>
                      <TableCell>{medication.expectedArrival}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <MedicalButton variant="outline" size="sm">
                            详情
                          </MedicalButton>
                          <MedicalButton variant="outline" size="sm">
                            入库
                          </MedicalButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StockStatusBadge({ status }: { status: string }) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "normal":
        return { text: "库存正常", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
      case "low":
        return { text: "库存不足", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" }
      case "critical":
        return { text: "库存紧急", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" }
      case "expiring":
        return { text: "即将过期", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" }
      case "ordered":
        return { text: "已订购", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" }
      default:
        return { text: status, color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" }
    }
  }

  const statusInfo = getStatusInfo(status)

  return <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
}

// 示例数据
const medications = [
  {
    id: "med1",
    name: "阿莫西林胶囊",
    specification: "0.25g*24粒",
    category: "抗生素",
    currentStock: 120,
    maxStock: 200,
    stockPercentage: 60,
    status: "normal",
    expiryDate: "2024-06-30",
  },
  {
    id: "med2",
    name: "布洛芬片",
    specification: "0.2g*24片",
    category: "镇痛药",
    currentStock: 45,
    maxStock: 150,
    stockPercentage: 30,
    status: "low",
    expiryDate: "2024-08-15",
  },
  {
    id: "med3",
    name: "氨氯地平片",
    specification: "5mg*14片",
    category: "降压药",
    currentStock: 8,
    maxStock: 100,
    stockPercentage: 8,
    status: "critical",
    expiryDate: "2024-10-20",
  },
  {
    id: "med4",
    name: "格列美脲片",
    specification: "2mg*30片",
    category: "降糖药",
    currentStock: 65,
    maxStock: 120,
    stockPercentage: 54,
    status: "expiring",
    expiryDate: "2023-12-25",
  },
  {
    id: "med5",
    name: "辛伐他汀片",
    specification: "20mg*7片",
    category: "调脂药",
    currentStock: 85,
    maxStock: 100,
    stockPercentage: 85,
    status: "normal",
    expiryDate: "2024-05-10",
  },
  {
    id: "med6",
    name: "盐酸二甲双胍片",
    specification: "0.5g*60片",
    category: "降糖药",
    currentStock: 110,
    maxStock: 150,
    stockPercentage: 73,
    status: "normal",
    expiryDate: "2024-07-18",
  },
  {
    id: "med7",
    name: "头孢克洛胶囊",
    specification: "0.25g*6粒",
    category: "抗生素",
    currentStock: 15,
    maxStock: 80,
    stockPercentage: 19,
    status: "low",
    expiryDate: "2024-03-22",
  },
  {
    id: "med8",
    name: "复方感冒灵颗粒",
    specification: "10g*9袋",
    category: "感冒药",
    currentStock: 5,
    maxStock: 100,
    stockPercentage: 5,
    status: "critical",
    expiryDate: "2024-04-30",
  },
]

const orderedMedications = [
  {
    id: "order1",
    name: "阿莫西林胶囊",
    specification: "0.25g*24粒",
    category: "抗生素",
    orderedQuantity: 200,
    orderDate: "2023-12-01",
    expectedArrival: "2023-12-10",
  },
  {
    id: "order2",
    name: "布洛芬片",
    specification: "0.2g*24片",
    category: "镇痛药",
    orderedQuantity: 150,
    orderDate: "2023-12-02",
    expectedArrival: "2023-12-12",
  },
  {
    id: "order3",
    name: "头孢克洛胶囊",
    specification: "0.25g*6粒",
    category: "抗生素",
    orderedQuantity: 100,
    orderDate: "2023-12-03",
    expectedArrival: "2023-12-15",
  },
  {
    id: "order4",
    name: "复方感冒灵颗粒",
    specification: "10g*9袋",
    category: "感冒药",
    orderedQuantity: 120,
    orderDate: "2023-12-05",
    expectedArrival: "2023-12-18",
  },
]
