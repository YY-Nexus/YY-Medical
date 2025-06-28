"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Filter, X, CalendarIcon, ChevronDown, Search, RefreshCw } from "lucide-react"

// 研究类型数据
const researchTypes = [
  { id: "type-001", name: "临床研究", description: "涉及人类受试者的研究" },
  { id: "type-002", name: "动物实验", description: "使用动物模型的研究" },
  { id: "type-003", name: "体外研究", description: "在实验室条件下使用细胞或组织的研究" },
  { id: "type-004", name: "方法学研究", description: "开发或评估研究方法的研究" },
  { id: "type-005", name: "流行病学研究", description: "研究疾病在人群中的分布和决定因素" },
  { id: "type-006", name: "系统评价", description: "系统地收集和评估现有研究的研究" },
]

// 研究设计类型数据
const designTypes = [
  { id: "design-001", name: "随机对照试验", description: "将受试者随机分配到不同干预组的实验性研究" },
  { id: "design-002", name: "病例对照研究", description: "比较有特定结局的病例组和没有该结局的对照组的观察性研究" },
  { id: "design-003", name: "队列研究", description: "随时间跟踪一组受试者的观察性研究" },
  { id: "design-004", name: "横断面研究", description: "在特定时间点收集数据的观察性研究" },
  { id: "design-005", name: "方法比较研究", description: "比较不同方法或技术的研究" },
  { id: "design-006", name: "剂量递增研究", description: "评估不同剂量效应的研究" },
]

// 常用标签
const commonTags = [
  "糖尿病",
  "高血压",
  "肿瘤",
  "心血管",
  "神经系统",
  "免疫学",
  "感染",
  "代谢",
  "基因组学",
  "蛋白质组学",
  "生物标志物",
  "药物研发",
  "临床试验",
  "动物模型",
  "细胞培养",
  "影像学",
  "人工智能",
  "生物信息学",
  "精准医疗",
  "转化医学",
]

// 部门列表
const departments = [
  "内分泌科",
  "心血管科",
  "神经内科",
  "肿瘤科",
  "感染科",
  "免疫科",
  "消化科",
  "呼吸科",
  "肾内科",
  "血液科",
  "药理学系",
  "病理学系",
  "生物化学系",
  "分子生物学系",
  "医学统计系",
  "检验医学科",
  "影像医学科",
  "公共卫生系",
  "生物信息学系",
  "转化医学中心",
]

// 样本类型
const sampleTypes = [
  "血液",
  "尿液",
  "组织",
  "细胞",
  "DNA",
  "RNA",
  "蛋白质",
  "代谢物",
  "脑脊液",
  "唾液",
  "粪便",
  "骨髓",
  "皮肤",
  "肌肉",
  "脂肪",
]

// 筛选器接口
export interface ExperimentFilters {
  searchTerm: string
  types: string[]
  designTypes: string[]
  statuses: string[]
  departments: string[]
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  tags: string[]
  budgetRange: [number, number]
  sampleTypes: string[]
  hasEthicalApproval: boolean | null
  createdByMe: boolean
  collaborators: string[]
}

// 默认筛选器
const defaultFilters: ExperimentFilters = {
  searchTerm: "",
  types: [],
  designTypes: [],
  statuses: [],
  departments: [],
  dateRange: {
    from: undefined,
    to: undefined,
  },
  tags: [],
  budgetRange: [0, 1000000],
  sampleTypes: [],
  hasEthicalApproval: null,
  createdByMe: false,
  collaborators: [],
}

interface ExperimentFilterDrawerProps {
  filters: ExperimentFilters
  onFiltersChange: (filters: ExperimentFilters) => void
  onClearFilters: () => void
}

export function ExperimentFilterDrawer({ filters, onFiltersChange, onClearFilters }: ExperimentFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<ExperimentFilters>(filters)
  const [searchValue, setSearchValue] = useState("")

  // 计算活跃筛选器数量
  const getActiveFilterCount = () => {
    let count = 0
    if (filters.types.length > 0) count++
    if (filters.designTypes.length > 0) count++
    if (filters.statuses.length > 0) count++
    if (filters.departments.length > 0) count++
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.tags.length > 0) count++
    if (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 1000000) count++
    if (filters.sampleTypes.length > 0) count++
    if (filters.hasEthicalApproval !== null) count++
    if (filters.createdByMe) count++
    if (filters.collaborators.length > 0) count++
    if (filters.searchTerm) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  // 更新本地筛选器
  const updateLocalFilters = (partialFilters: Partial<ExperimentFilters>) => {
    setLocalFilters((prev) => ({
      ...prev,
      ...partialFilters,
    }))
  }

  // 应用筛选器
  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  // 重置筛选器
  const resetFilters = () => {
    setLocalFilters(defaultFilters)
    onClearFilters()
  }

  // 切换选择项
  const toggleSelection = (array: string[], item: string) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
  }

  // 搜索标签
  const searchTags = (tags: string[], query: string) => {
    if (!query) return tags
    return tags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          高级筛选
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg">
        <SheetHeader>
          <SheetTitle>高级筛选</SheetTitle>
          <SheetDescription>设置筛选条件以查找特定的试验设计</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] pr-4 mt-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="basic">基本筛选</TabsTrigger>
              <TabsTrigger value="research">研究特性</TabsTrigger>
              <TabsTrigger value="advanced">高级选项</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              {/* 研究类型 */}
              <div className="space-y-2">
                <Label className="text-base">研究类型</Label>
                <div className="grid grid-cols-2 gap-2">
                  {researchTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={localFilters.types.includes(type.name)}
                        onCheckedChange={(checked) => {
                          updateLocalFilters({
                            types: checked
                              ? [...localFilters.types, type.name]
                              : localFilters.types.filter((t) => t !== type.name),
                          })
                        }}
                      />
                      <Label htmlFor={type.id} className="cursor-pointer">
                        {type.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 研究状态 */}
              <div className="space-y-2">
                <Label className="text-base">研究状态</Label>
                <div className="flex flex-wrap gap-2">
                  {["计划中", "已批准", "进行中", "已完成", "已暂停"].map((status) => (
                    <Badge
                      key={status}
                      variant={localFilters.statuses.includes(status) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        updateLocalFilters({
                          statuses: toggleSelection(localFilters.statuses, status),
                        })
                      }}
                    >
                      {status}
                      {localFilters.statuses.includes(status) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 日期范围 */}
              <div className="space-y-2">
                <Label className="text-base">日期范围</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {localFilters.dateRange.from
                          ? format(localFilters.dateRange.from, "yyyy-MM-dd", { locale: zhCN })
                          : "开始日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={localFilters.dateRange.from}
                        onSelect={(date) =>
                          updateLocalFilters({
                            dateRange: {
                              ...localFilters.dateRange,
                              from: date,
                            },
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {localFilters.dateRange.to
                          ? format(localFilters.dateRange.to, "yyyy-MM-dd", { locale: zhCN })
                          : "结束日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={localFilters.dateRange.to}
                        onSelect={(date) =>
                          updateLocalFilters({
                            dateRange: {
                              ...localFilters.dateRange,
                              to: date,
                            },
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Separator />

              {/* 部门 */}
              <div className="space-y-2">
                <Label className="text-base">所属部门</Label>
                <Select
                  value={localFilters.departments[0] || ""}
                  onValueChange={(value) => {
                    updateLocalFilters({
                      departments: value ? [value] : [],
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部部门</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="research" className="space-y-6">
              {/* 研究设计类型 */}
              <div className="space-y-2">
                <Label className="text-base">研究设计类型</Label>
                <div className="space-y-2">
                  {designTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`design-${type.id}`}
                        checked={localFilters.designTypes.includes(type.name)}
                        onCheckedChange={(checked) => {
                          updateLocalFilters({
                            designTypes: checked
                              ? [...localFilters.designTypes, type.name]
                              : localFilters.designTypes.filter((t) => t !== type.name),
                          })
                        }}
                      />
                      <div>
                        <Label htmlFor={`design-${type.id}`} className="cursor-pointer">
                          {type.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 标签 */}
              <div className="space-y-2">
                <Label className="text-base">研究标签</Label>
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索标签..."
                    className="pl-8"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {searchTags(commonTags, searchValue).map((tag) => (
                    <Badge
                      key={tag}
                      variant={localFilters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        updateLocalFilters({
                          tags: toggleSelection(localFilters.tags, tag),
                        })
                      }}
                    >
                      {tag}
                      {localFilters.tags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 样本类型 */}
              <div className="space-y-2">
                <Label className="text-base">样本类型</Label>
                <div className="grid grid-cols-3 gap-2">
                  {sampleTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sample-${type}`}
                        checked={localFilters.sampleTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          updateLocalFilters({
                            sampleTypes: checked
                              ? [...localFilters.sampleTypes, type]
                              : localFilters.sampleTypes.filter((t) => t !== type),
                          })
                        }}
                      />
                      <Label htmlFor={`sample-${type}`} className="cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 预算范围 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base">预算范围</Label>
                  <span className="text-sm">
                    {localFilters.budgetRange[0].toLocaleString()} - {localFilters.budgetRange[1].toLocaleString()} 元
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 1000000]}
                  min={0}
                  max={1000000}
                  step={10000}
                  value={localFilters.budgetRange}
                  onValueChange={(value) => {
                    updateLocalFilters({
                      budgetRange: value as [number, number],
                    })
                  }}
                  className="my-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0元</span>
                  <span>50万元</span>
                  <span>100万元</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              {/* 伦理审批 */}
              <div className="space-y-2">
                <Label className="text-base">伦理审批状态</Label>
                <RadioGroup
                  value={
                    localFilters.hasEthicalApproval === null
                      ? "all"
                      : localFilters.hasEthicalApproval
                        ? "approved"
                        : "pending"
                  }
                  onValueChange={(value) => {
                    updateLocalFilters({
                      hasEthicalApproval: value === "all" ? null : value === "approved",
                    })
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-ethics" />
                    <Label htmlFor="all-ethics">全部</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="approved" id="approved-ethics" />
                    <Label htmlFor="approved-ethics">已获伦理批准</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending-ethics" />
                    <Label htmlFor="pending-ethics">未获伦理批准</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* 创建者 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="created-by-me"
                    checked={localFilters.createdByMe}
                    onCheckedChange={(checked) => {
                      updateLocalFilters({
                        createdByMe: checked,
                      })
                    }}
                  />
                  <Label htmlFor="created-by-me">仅显示我创建的设计</Label>
                </div>
              </div>

              <Separator />

              {/* 其他选项 */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <Label className="text-base">更多筛选选项</Label>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>排序方式</Label>
                    <Select defaultValue="created-desc">
                      <SelectTrigger>
                        <SelectValue placeholder="选择排序方式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created-desc">创建日期 (最新)</SelectItem>
                        <SelectItem value="created-asc">创建日期 (最早)</SelectItem>
                        <SelectItem value="updated-desc">更新日期 (最新)</SelectItem>
                        <SelectItem value="updated-asc">更新日期 (最早)</SelectItem>
                        <SelectItem value="title-asc">标题 (A-Z)</SelectItem>
                        <SelectItem value="title-desc">标题 (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="has-attachments" />
                      <Label htmlFor="has-attachments">有附件的设计</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="has-collaborators" />
                      <Label htmlFor="has-collaborators">有合作者的设计</Label>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <SheetFooter className="pt-4 border-t mt-4">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={resetFilters}>
              <RefreshCw className="h-4 w-4 mr-2" />
              重置
            </Button>
            <Button onClick={applyFilters}>
              <Filter className="h-4 w-4 mr-2" />
              应用筛选
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
