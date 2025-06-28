"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Edit, Save, X, Plus } from "lucide-react"

// 模拟数据映射配置
const dataMappings = {
  patient: [
    { id: 1, source: "MRN", target: "patientId", description: "患者医疗记录号", status: "active" },
    { id: 2, source: "FirstName", target: "firstName", description: "患者名", status: "active" },
    { id: 3, source: "LastName", target: "lastName", description: "患者姓", status: "active" },
    { id: 4, source: "DOB", target: "birthDate", description: "出生日期", status: "active" },
    { id: 5, source: "Gender", target: "gender", description: "性别", status: "active" },
    { id: 6, source: "Address", target: "address", description: "地址", status: "active" },
    { id: 7, source: "Phone", target: "phoneNumber", description: "电话号码", status: "active" },
    { id: 8, source: "Email", target: "emailAddress", description: "电子邮件", status: "inactive" },
  ],
  diagnosis: [
    { id: 1, source: "DiagnosisCode", target: "code", description: "诊断代码", status: "active" },
    { id: 2, source: "DiagnosisName", target: "name", description: "诊断名称", status: "active" },
    { id: 3, source: "DiagnosisDate", target: "date", description: "诊断日期", status: "active" },
    { id: 4, source: "DiagnosisDoctor", target: "physician", description: "诊断医生", status: "active" },
    { id: 5, source: "DiagnosisNotes", target: "notes", description: "诊断备注", status: "active" },
    { id: 6, source: "Severity", target: "severity", description: "严重程度", status: "active" },
  ],
  medication: [
    { id: 1, source: "MedicationCode", target: "code", description: "药品代码", status: "active" },
    { id: 2, source: "MedicationName", target: "name", description: "药品名称", status: "active" },
    { id: 3, source: "Dosage", target: "dosage", description: "剂量", status: "active" },
    { id: 4, source: "Frequency", target: "frequency", description: "频率", status: "active" },
    { id: 5, source: "StartDate", target: "startDate", description: "开始日期", status: "active" },
    { id: 6, source: "EndDate", target: "endDate", description: "结束日期", status: "active" },
    { id: 7, source: "Prescriber", target: "physician", description: "处方医生", status: "active" },
  ],
  labResult: [
    { id: 1, source: "TestCode", target: "code", description: "检查代码", status: "active" },
    { id: 2, source: "TestName", target: "name", description: "检查名称", status: "active" },
    { id: 3, source: "TestDate", target: "date", description: "检查日期", status: "active" },
    { id: 4, source: "TestResult", target: "result", description: "检查结果", status: "active" },
    { id: 5, source: "ReferenceRange", target: "range", description: "参考范围", status: "active" },
    { id: 6, source: "Units", target: "units", description: "单位", status: "active" },
    { id: 7, source: "Performer", target: "performer", description: "执行人", status: "inactive" },
  ],
}

export function EHRDataMapping() {
  const [activeTab, setActiveTab] = useState("patient")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingMapping, setEditingMapping] = useState(null)
  const [mappings, setMappings] = useState(dataMappings)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newMapping, setNewMapping] = useState({
    source: "",
    target: "",
    description: "",
  })

  // 过滤映射
  const filteredMappings = mappings[activeTab].filter(
    (mapping) =>
      mapping.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapping.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapping.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 开始编辑
  const startEditing = (mapping) => {
    setEditingMapping({ ...mapping })
  }

  // 保存编辑
  const saveEditing = () => {
    if (editingMapping) {
      setMappings({
        ...mappings,
        [activeTab]: mappings[activeTab].map((mapping) =>
          mapping.id === editingMapping.id ? editingMapping : mapping,
        ),
      })
      setEditingMapping(null)
    }
  }

  // 取消编辑
  const cancelEditing = () => {
    setEditingMapping(null)
  }

  // 切换映射状态
  const toggleMappingStatus = (id) => {
    setMappings({
      ...mappings,
      [activeTab]: mappings[activeTab].map((mapping) => {
        if (mapping.id === id) {
          return {
            ...mapping,
            status: mapping.status === "active" ? "inactive" : "active",
          }
        }
        return mapping
      }),
    })
  }

  // 添加新映射
  const addNewMapping = () => {
    if (newMapping.source && newMapping.target) {
      const newId = Math.max(...mappings[activeTab].map((m) => m.id)) + 1
      setMappings({
        ...mappings,
        [activeTab]: [
          ...mappings[activeTab],
          {
            id: newId,
            ...newMapping,
            status: "active",
          },
        ],
      })
      setNewMapping({
        source: "",
        target: "",
        description: "",
      })
      setIsAddingNew(false)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>数������射配置</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAddingNew(true)}>
            <Plus className="w-4 h-4 mr-2" />
            添加映射
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patient">患者信息</TabsTrigger>
            <TabsTrigger value="diagnosis">诊断信息</TabsTrigger>
            <TabsTrigger value="medication">用药信息</TabsTrigger>
            <TabsTrigger value="labResult">检查结果</TabsTrigger>
          </TabsList>

          <div className="relative my-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索映射..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isAddingNew && (
            <div className="border rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium mb-3">添加新映射</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">源字段</label>
                  <Input
                    value={newMapping.source}
                    onChange={(e) => setNewMapping({ ...newMapping, source: e.target.value })}
                    placeholder="输入源字段名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">目标字段</label>
                  <Input
                    value={newMapping.target}
                    onChange={(e) => setNewMapping({ ...newMapping, target: e.target.value })}
                    placeholder="输入目标字段名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">描述</label>
                  <Input
                    value={newMapping.description}
                    onChange={(e) => setNewMapping({ ...newMapping, description: e.target.value })}
                    placeholder="输入字段描述"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={addNewMapping}>保存</Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    取消
                  </Button>
                </div>
              </div>
            </div>
          )}

          <TabsContent value={activeTab} className="pt-0">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      源字段
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      映射
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      目标字段
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      描述
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMappings.map((mapping) => (
                    <tr key={mapping.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingMapping && editingMapping.id === mapping.id ? (
                          <Input
                            value={editingMapping.source}
                            onChange={(e) => setEditingMapping({ ...editingMapping, source: e.target.value })}
                            className="w-full"
                          />
                        ) : (
                          <div className="font-medium">{mapping.source}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ArrowRight className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingMapping && editingMapping.id === mapping.id ? (
                          <Input
                            value={editingMapping.target}
                            onChange={(e) => setEditingMapping({ ...editingMapping, target: e.target.value })}
                            className="w-full"
                          />
                        ) : (
                          <div className="font-medium">{mapping.target}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingMapping && editingMapping.id === mapping.id ? (
                          <Input
                            value={editingMapping.description}
                            onChange={(e) => setEditingMapping({ ...editingMapping, description: e.target.value })}
                            className="w-full"
                          />
                        ) : (
                          <div className="text-sm text-muted-foreground">{mapping.description}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <Badge
                          variant={mapping.status === "active" ? "default" : "outline"}
                          className={mapping.status === "active" ? "bg-emerald-500" : "text-gray-500 border-gray-500"}
                          onClick={() => toggleMappingStatus(mapping.id)}
                        >
                          {mapping.status === "active" ? "启用" : "禁用"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        {editingMapping && editingMapping.id === mapping.id ? (
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={saveEditing}>
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={cancelEditing}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="icon" onClick={() => startEditing(mapping)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
