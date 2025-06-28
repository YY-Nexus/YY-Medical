"use client"

import { useState } from "react"
import { Search, AlertCircle, Info, CheckCircle, XCircle, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { medicationInteractionService } from "@/services/medication-interaction-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function MedicationInteractions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedications, setSelectedMedications] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [interactions, setInteractions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("checker")
  const [selectedInteraction, setSelectedInteraction] = useState<any | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // 搜索药物
  const handleSearch = () => {
    if (searchTerm.trim().length < 2) return
    const results = medicationInteractionService.searchMedicationsByName(searchTerm)
    setSearchResults(results)
  }

  // 添加药物到检查列表
  const addMedication = (medicationId: string) => {
    if (selectedMedications.includes(medicationId)) return
    setSelectedMedications([...selectedMedications, medicationId])
    setSearchTerm("")
    setSearchResults([])
  }

  // 移除药物
  const removeMedication = (medicationId: string) => {
    setSelectedMedications(selectedMedications.filter((id) => id !== medicationId))
  }

  // 检查药物相互作用
  const checkInteractions = () => {
    if (selectedMedications.length < 2) return
    const results = medicationInteractionService.checkInteractionsAmongMultiple(selectedMedications)
    setInteractions(results)
  }

  // 查看相互作用详情
  const viewInteractionDetail = (interaction: any) => {
    setSelectedInteraction(interaction)
    setIsDetailOpen(true)
  }

  // 获取严重程度标识
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "严重":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 严重
          </Badge>
        )
      case "中度":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Info className="h-3 w-3" /> 中度
          </Badge>
        )
      case "轻微":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Info className="h-3 w-3" /> 轻微
          </Badge>
        )
      case "禁忌":
        return (
          <Badge variant="destructive" className="flex items-center gap-1 bg-purple-600">
            <XCircle className="h-3 w-3" /> 禁忌
          </Badge>
        )
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  // 获取所有药物
  const allMedications = medicationInteractionService.getAllMedications()

  // 获取选中的药物详情
  const selectedMedicationDetails = selectedMedications
    .map((id) => allMedications.find((med) => med.id === id))
    .filter(Boolean)

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="checker">药物相互作用检查</TabsTrigger>
          <TabsTrigger value="database">药物相互作用数据库</TabsTrigger>
        </TabsList>

        <TabsContent value="checker" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>药物相互作用检查器</CardTitle>
              <CardDescription>检查多种药物之间可能存在的相互作用</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索药物名称、通用名或品牌名..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleSearch()
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleSearch} className="w-full md:w-auto">
                    搜索药物
                  </Button>
                </div>

                {searchResults.length > 0 && (
                  <Card className="border border-dashed">
                    <CardHeader className="py-2 px-4">
                      <CardTitle className="text-sm">搜索结果</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <ScrollArea className="h-48">
                        <div className="space-y-2">
                          {searchResults.map((medication) => (
                            <div
                              key={medication.id}
                              className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md"
                            >
                              <div>
                                <div className="font-medium">{medication.name}</div>
                                <div className="text-sm text-muted-foreground">{medication.genericName}</div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addMedication(medication.id)}
                                disabled={selectedMedications.includes(medication.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                <div>
                  <h3 className="text-sm font-medium mb-2">已选择的药物</h3>
                  {selectedMedicationDetails.length > 0 ? (
                    <div className="space-y-2">
                      {selectedMedicationDetails.map((medication: any) => (
                        <div
                          key={medication.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-md"
                        >
                          <div>
                            <div className="font-medium">{medication.name}</div>
                            <div className="text-sm text-muted-foreground">{medication.genericName}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMedication(medication.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 border border-dashed rounded-md">
                      <p className="text-muted-foreground">请搜索并添加药物以检查相互作用</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={checkInteractions}
                    className="bg-medical-600 hover:bg-medical-700"
                    disabled={selectedMedications.length < 2}
                  >
                    检查药物相互作用
                  </Button>
                </div>

                {interactions.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">检查结果</h3>
                    {interactions.length > 0 ? (
                      <div className="space-y-4">
                        {interactions.map((interaction, index) => (
                          <Alert
                            key={index}
                            variant={
                              interaction.interaction.severity === "严重" || interaction.interaction.severity === "禁忌"
                                ? "destructive"
                                : interaction.interaction.severity === "中度"
                                  ? "warning"
                                  : "default"
                            }
                          >
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle className="flex items-center justify-between">
                              <span>
                                {interaction.medication1.name} 与 {interaction.medication2.name} 存在相互作用
                              </span>
                              {getSeverityBadge(interaction.interaction.severity)}
                            </AlertTitle>
                            <AlertDescription className="mt-2">
                              <p>{interaction.interaction.interactionEffect}</p>
                              <Button
                                variant="link"
                                className="p-0 h-auto mt-1"
                                onClick={() => viewInteractionDetail(interaction)}
                              >
                                查看详情
                              </Button>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    ) : (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>未发现相互作用</AlertTitle>
                        <AlertDescription>所选药物之间未发现已知的相互作用</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>药物相互作用数据库</CardTitle>
              <CardDescription>浏览所有已知的药物相互作用信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="搜索药物名称..." className="pl-8" />
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>药物名称</TableHead>
                        <TableHead>通用名</TableHead>
                        <TableHead>药物分类</TableHead>
                        <TableHead>已知相互作用</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allMedications.map((medication) => (
                        <TableRow key={medication.id}>
                          <TableCell className="font-medium">{medication.name}</TableCell>
                          <TableCell>{medication.genericName}</TableCell>
                          <TableCell>{medication.drugClass}</TableCell>
                          <TableCell>
                            {medication.interactions.drugInteractions.length > 0 ? (
                              <Badge>{medication.interactions.drugInteractions.length}</Badge>
                            ) : (
                              <span className="text-muted-foreground">无</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              查看详情
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 相互作用详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>药物相互作用详情</DialogTitle>
            <DialogDescription>查看药物相互作用的详细信息和处理建议</DialogDescription>
          </DialogHeader>

          {selectedInteraction && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-lg">
                    {selectedInteraction.medication1.name} + {selectedInteraction.medication2.name}
                  </div>
                </div>
                {getSeverityBadge(selectedInteraction.interaction.severity)}
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">药物1</h4>
                  <p className="font-medium">{selectedInteraction.medication1.name}</p>
                  <p className="text-sm">{selectedInteraction.medication1.genericName}</p>
                  <p className="text-sm text-muted-foreground">{selectedInteraction.medication1.drugClass}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">药物2</h4>
                  <p className="font-medium">{selectedInteraction.medication2.name}</p>
                  <p className="text-sm">{selectedInteraction.medication2.genericName}</p>
                  <p className="text-sm text-muted-foreground">{selectedInteraction.medication2.drugClass}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">相互作用效果</h4>
                <p className="mt-1">{selectedInteraction.interaction.interactionEffect}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">作用机制</h4>
                <p className="mt-1">{selectedInteraction.interaction.mechanism}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">处理建议</h4>
                <p className="mt-1">{selectedInteraction.interaction.managementRecommendations}</p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>临床注意事项</AlertTitle>
                <AlertDescription>
                  此信息仅供参考，具体用药方案请根据患者个体情况由专业医师判断。严重相互作用可能需要调整给药方案或密切监测。
                </AlertDescription>
              </Alert>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
