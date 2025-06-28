"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, UserPlus, Settings, MoreHorizontal, Edit, Trash2, MessageSquare, Calendar } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// 模拟患者分组数据
const patientGroups = [
  {
    id: "G-001",
    name: "心血管患者",
    description: "所有心血管疾病相关患者",
    memberCount: 56,
    createdDate: "2024-01-15",
    lastUpdated: "2024-04-28",
    tags: ["高风险", "长期随访"],
    color: "red",
  },
  {
    id: "G-002",
    name: "糖尿病患者",
    description: "1型和2型糖尿病患者",
    memberCount: 42,
    createdDate: "2024-02-10",
    lastUpdated: "2024-04-25",
    tags: ["定期监测", "饮食管理"],
    color: "blue",
  },
  {
    id: "G-003",
    name: "孕期管理",
    description: "孕期及产后患者管理",
    memberCount: 28,
    createdDate: "2024-03-05",
    lastUpdated: "2024-04-26",
    tags: ["定期检查", "营养指导"],
    color: "pink",
  },
  {
    id: "G-004",
    name: "老年慢病",
    description: "65岁以上慢性病患者",
    memberCount: 73,
    createdDate: "2024-01-20",
    lastUpdated: "2024-04-22",
    tags: ["高龄", "多病共存"],
    color: "purple",
  },
  {
    id: "G-005",
    name: "儿科患者",
    description: "0-14岁儿科患者",
    memberCount: 35,
    createdDate: "2024-02-28",
    lastUpdated: "2024-04-20",
    tags: ["生长发育", "疫苗接种"],
    color: "green",
  },
  {
    id: "G-006",
    name: "术后康复",
    description: "各类手术后康复管理",
    memberCount: 19,
    createdDate: "2024-03-15",
    lastUpdated: "2024-04-27",
    tags: ["康复训练", "伤口护理"],
    color: "orange",
  },
  {
    id: "G-007",
    name: "精神心理",
    description: "心理和精神疾病患者",
    memberCount: 24,
    createdDate: "2024-02-05",
    lastUpdated: "2024-04-24",
    tags: ["心理咨询", "药物治疗"],
    color: "indigo",
  },
  {
    id: "G-008",
    name: "肿瘤随访",
    description: "肿瘤患者治疗后随访",
    memberCount: 31,
    createdDate: "2024-01-25",
    lastUpdated: "2024-04-23",
    tags: ["定期复查", "生活质量"],
    color: "yellow",
  },
]

// 获取颜色样式
const getColorStyle = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    red: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    blue: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    green: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
    purple: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
    pink: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
    orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  }

  return colorMap[color] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
}

export function PatientGroupsClient() {
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤分组
  const filteredGroups = patientGroups.filter((group) => {
    return (
      searchTerm === "" ||
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-500 h-4 w-4" />
          <Input
            placeholder="搜索分组名称、描述或标签..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            重置
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => {
            const colorStyle = getColorStyle(group.color)

            return (
              <Card key={group.id} className={`hover:shadow-md transition-shadow border-l-4 ${colorStyle.border}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-md ${colorStyle.bg}`}>
                          <Users className={`h-5 w-5 ${colorStyle.text}`} />
                        </div>
                        <h3 className="font-medium text-lg">{group.name}</h3>
                      </div>
                      <p className="text-sm text-medical-600 mt-1">{group.description}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          编辑分组
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="h-4 w-4 mr-2" />
                          添加成员
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          群发消息
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          批量随访
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          分组设置
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除分组
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>成员数量</span>
                      <span className="font-medium">{group.memberCount}</span>
                    </div>
                    <Progress value={group.memberCount} max={100} className="h-2" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${colorStyle.bg} ${colorStyle.text}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between text-xs text-medical-500">
                    <span>创建于: {group.createdDate}</span>
                    <span>最近更新: {group.lastUpdated}</span>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <MedicalButton variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-1" />
                      添加成员
                    </MedicalButton>
                    <MedicalButton className="bg-medical-gradient text-white" size="sm">
                      查看详情
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-2 text-center py-8 text-medical-500">未找到符合条件的患者分组</div>
        )}
      </div>
    </div>
  )
}
