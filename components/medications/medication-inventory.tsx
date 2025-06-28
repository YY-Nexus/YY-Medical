"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingDown, TrendingUp, Package } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// 模拟库存数据
const inventoryData = [
  { category: "口服降糖药", count: 3250, value: 125800, lowStock: 2 },
  { category: "调脂药", count: 1850, value: 165900, lowStock: 1 },
  { category: "降压药", count: 2100, value: 143200, lowStock: 3 },
  { category: "非甾体抗炎药", count: 4200, value: 65400, lowStock: 2 },
  { category: "抗生素", count: 1650, value: 81000, lowStock: 4 },
  { category: "抗抑郁药", count: 980, value: 72500, lowStock: 1 },
  { category: "抗过敏药", count: 1250, value: 43800, lowStock: 0 },
]

// 模拟过期风险数据
const expiryRiskData = [
  { name: "1个月内", count: 12, value: 5800 },
  { name: "3个月内", count: 28, value: 12400 },
  { name: "6个月内", count: 45, value: 24600 },
]

// 模拟库存趋势数据
const inventoryTrendData = [
  { month: "1月", inflow: 320, outflow: 240 },
  { month: "2月", inflow: 280, outflow: 310 },
  { month: "3月", inflow: 350, outflow: 290 },
  { month: "4月", inflow: 420, outflow: 380 },
  { month: "5月", inflow: 380, outflow: 350 },
  { month: "6月", inflow: 450, outflow: 410 },
]

export function MedicationInventory() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddStock, setShowAddStock] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [stockOperation, setStockOperation] = useState<{
    category: string
    quantity: number
    operation: "add" | "remove"
  } | null>(null)

  // 计算总库存和总价值
  const totalCount = inventoryData.reduce((sum, item) => sum + item.count, 0)
  const totalValue = inventoryData.reduce((sum, item) => sum + item.value, 0)
  const totalLowStock = inventoryData.reduce((sum, item) => sum + item.lowStock, 0)

  // 处理库存操作
  const handleStockOperation = () => {
    if (!stockOperation) return

    // 模拟API调用，实际应用中应调用后端API
    setTimeout(() => {
      // 更新库存数据
      const categoryIndex = inventoryData.findIndex((item) => item.category === stockOperation.category)
      if (categoryIndex !== -1) {
        const newInventoryData = [...inventoryData]
        if (stockOperation.operation === "add") {
          newInventoryData[categoryIndex].count += stockOperation.quantity
        } else {
          newInventoryData[categoryIndex].count = Math.max(
            0,
            newInventoryData[categoryIndex].count - stockOperation.quantity,
          )
        }
        // 在实际应用中，这里应该更新状态
      }

      setShowAddStock(false)
      setStockOperation(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总库存数量</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">包含所有药物单位</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存总价值</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">按当前零售价计算</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">低库存预警</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLowStock}</div>
            <p className="text-xs text-muted-foreground">需要补充库存的药物种类</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">近效期预警</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiryRiskData[0].count}</div>
            <p className="text-xs text-muted-foreground">1个月内到期的药物批次</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">库存概览</TabsTrigger>
          <TabsTrigger value="trends">库存趋势</TabsTrigger>
          <TabsTrigger value="expiry">效期管理</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>药物分类库存分布</CardTitle>
              <CardDescription>按药物分类统计的库存数量和价值</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  count: {
                    label: "库存数量",
                    color: "hsl(var(--chart-1))",
                  },
                  value: {
                    label: "库存价值 (¥)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-count)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-value)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" name="库存数量" />
                    <Bar yAxisId="right" dataKey="value" fill="var(--color-value)" name="库存价值 (¥)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>低库存药物</CardTitle>
                <CardDescription>需要及时补充库存的药物</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryData.map(
                    (item, index) =>
                      item.lowStock > 0 && (
                        <div key={index} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{item.category}</p>
                            <p className="text-sm text-muted-foreground">{item.lowStock} 种药物库存不足</p>
                          </div>
                          <Badge variant="outline" className="ml-auto">
                            需补充
                          </Badge>
                        </div>
                      ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>库存管理操作</CardTitle>
                <CardDescription>快速访库存管理功能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button className="w-full justify-start" onClick={() => setShowAddStock(true)}>
                    <Package className="mr-2 h-4 w-4" />
                    药物入库登记
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h10M7 12h10M7 17h10" />
                    </svg>
                    库存盘点
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    导出库存报表
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    效期预警设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>药物库存流动趋势</CardTitle>
              <CardDescription>近6个月药物入库和出库数量趋势</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  inflow: {
                    label: "入库数量",
                    color: "hsl(var(--chart-1))",
                  },
                  outflow: {
                    label: "出库数量",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryTrendData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="inflow" fill="var(--color-inflow)" name="入库数量" />
                    <Bar dataKey="outflow" fill="var(--color-outflow)" name="出库数量" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiry">
          <Card>
            <CardHeader>
              <CardTitle>药物效期管理</CardTitle>
              <CardDescription>按效期分类的药物数量和价值统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">近效期药物统计</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    {expiryRiskData.map((item, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{item.count}</div>
                          <p className="text-xs text-muted-foreground">价值: ¥{item.value.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">效期管理操作</h4>
                  <div className="grid gap-2">
                    <Button className="w-full justify-start">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      处理近效期药物
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      调整库存周转策略
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      导出效期报表
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 入库对话框 */}
      <Dialog open={showAddStock} onOpenChange={setShowAddStock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>药物入库登记</DialogTitle>
            <DialogDescription>登记新入库的药物数量</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="stock-category">药物分类</Label>
              <Select
                value={stockOperation?.category || ""}
                onValueChange={(value) =>
                  setStockOperation((prev) => ({ ...(prev || { quantity: 0, operation: "add" }), category: value }))
                }
              >
                <SelectTrigger id="stock-category">
                  <SelectValue placeholder="选择药物分类" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryData.map((item) => (
                    <SelectItem key={item.category} value={item.category}>
                      {item.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock-quantity">数量</Label>
              <Input
                id="stock-quantity"
                type="number"
                min="1"
                value={stockOperation?.quantity || ""}
                onChange={(e) =>
                  setStockOperation((prev) => ({
                    ...(prev || { category: "", operation: "add" }),
                    quantity: Number.parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock-operation">操作类型</Label>
              <Select
                value={stockOperation?.operation || "add"}
                onValueChange={(value: "add" | "remove") =>
                  setStockOperation((prev) => ({ ...(prev || { category: "", quantity: 0 }), operation: value }))
                }
              >
                <SelectTrigger id="stock-operation">
                  <SelectValue placeholder="选择操作类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">入库</SelectItem>
                  <SelectItem value="remove">出库</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddStock(false)}>
              取消
            </Button>
            <Button
              onClick={handleStockOperation}
              disabled={!stockOperation || !stockOperation.category || stockOperation.quantity <= 0}
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
