"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Star,
  MapPin,
  Building,
  Phone,
  Mail,
  Calendar,
  Clock,
  Filter,
  Users,
  UserPlus,
  ExternalLink,
} from "lucide-react"

// 模拟专家数据
const experts = [
  {
    id: 1,
    name: "王建国",
    avatar: "/compassionate-doctor-consultation.png",
    title: "主任医师",
    department: "心脏科",
    hospital: "北京中心医院",
    city: "北京",
    rating: 4.9,
    consultations: 128,
    specialties: ["冠心病", "心律失常", "心力衰竭"],
    availability: "周一至周五 9:00-17:00",
    bio: "王建国医师拥有30年心脏病学临床经验，专注于复杂心脏病例的诊断和治疗。曾在美国哈佛医学院进修，发表学术论文50余篇。",
    contact: {
      email: "wang.jianguo@hospital.com",
      phone: "010-12345678",
    },
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "李明",
    avatar: "/compassionate-doctor-consultation.png",
    title: "副主任医师",
    department: "神经科",
    hospital: "上海第一人民医院",
    city: "上海",
    rating: 4.8,
    consultations: 95,
    specialties: ["脑卒中", "癫痫", "帕金森病"],
    availability: "周一、周三、周五 8:30-16:30",
    bio: "李明医师是神经科领域的知名专家，擅长神经系统疾病的诊断和治疗，尤其在脑卒中急救和康复方面有丰富经验。",
    contact: {
      email: "li.ming@hospital.com",
      phone: "021-87654321",
    },
    isVerified: true,
    isFeatured: false,
  },
  {
    id: 3,
    name: "张华",
    avatar: "/compassionate-doctor-consultation.png",
    title: "主任医师",
    department: "骨科",
    hospital: "广州医科大学附属医院",
    city: "广州",
    rating: 4.7,
    consultations: 112,
    specialties: ["关节置换", "脊柱外科", "运动损伤"],
    availability: "周二、周四、周六 9:00-17:00",
    bio: "张华医师是骨科领域的资深专家，擅长复杂关节置换手术和脊柱疾病治疗，曾主持多项国家级研究项目。",
    contact: {
      email: "zhang.hua@hospital.com",
      phone: "020-98765432",
    },
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "赵敏",
    avatar: "/compassionate-caregiver.png",
    title: "主任医师",
    department: "内分泌科",
    hospital: "武汉协和医院",
    city: "武汉",
    rating: 4.6,
    consultations: 87,
    specialties: ["糖尿病", "甲状腺疾病", "肾上腺疾病"],
    availability: "周一至周五 8:00-16:00",
    bio: "赵敏医师专注于内分泌系统疾病的诊断和治疗，尤其在糖尿病和甲状腺疾病方面有深入研究，是国内知名的内分泌专家。",
    contact: {
      email: "zhao.min@hospital.com",
      phone: "027-23456789",
    },
    isVerified: true,
    isFeatured: false,
  },
  {
    id: 5,
    name: "陈刚",
    avatar: "/compassionate-doctor-consultation.png",
    title: "副主任医师",
    department: "呼吸科",
    hospital: "成都市第三人民医院",
    city: "成都",
    rating: 4.5,
    consultations: 76,
    specialties: ["慢性阻塞性肺疾病", "肺炎", "哮喘"],
    availability: "周一、周三、周五 9:00-17:00",
    bio: "陈刚医师在呼吸系统疾病诊治方面有丰富经验，尤其擅长慢性呼吸系统疾病的长期管理和急性呼吸系统感染的治疗。",
    contact: {
      email: "chen.gang@hospital.com",
      phone: "028-34567890",
    },
    isVerified: false,
    isFeatured: false,
  },
  {
    id: 6,
    name: "刘芳",
    avatar: "/compassionate-caregiver.png",
    title: "主任医师",
    department: "妇产科",
    hospital: "天津市妇女儿童医院",
    city: "天津",
    rating: 4.9,
    consultations: 135,
    specialties: ["高危妊娠", "妇科肿瘤", "不孕症"],
    availability: "周一至周五 8:30-16:30",
    bio: "刘芳医师是妇产科领域的知名专家，在高危妊娠管理和妇科肿瘤治疗方面有卓越成就，曾获国家科技进步奖。",
    contact: {
      email: "liu.fang@hospital.com",
      phone: "022-45678901",
    },
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 7,
    name: "吴强",
    avatar: "/compassionate-doctor-consultation.png",
    title: "主任医师",
    department: "肿瘤科",
    hospital: "南京医科大学附属医院",
    city: "南京",
    rating: 4.8,
    consultations: 108,
    specialties: ["肺癌", "胃癌", "结直肠癌"],
    availability: "周二、周四、周六 9:00-17:00",
    bio: "吴强医师在肿瘤诊断和治疗方面有深厚造诣，尤其在肺癌和消化道肿瘤的综合治疗方面经验丰富，是国内知名的肿瘤专家。",
    contact: {
      email: "wu.qiang@hospital.com",
      phone: "025-56789012",
    },
    isVerified: true,
    isFeatured: false,
  },
  {
    id: 8,
    name: "郑伟",
    avatar: "/compassionate-doctor-consultation.png",
    title: "副主任医师",
    department: "肝胆外科",
    hospital: "杭州市第一人民医院",
    city: "杭州",
    rating: 4.7,
    consultations: 92,
    specialties: ["肝癌", "胆道疾病", "肝移植"],
    availability: "周一、周三、周五 8:00-16:00",
    bio: "郑伟医师在肝胆疾病的诊断和治疗方面有丰富经验，尤其擅长肝癌的微创治疗和复杂肝胆手术，是肝胆外科领域的知名专家。",
    contact: {
      email: "zheng.wei@hospital.com",
      phone: "0571-67890123",
    },
    isVerified: true,
    isFeatured: false,
  },
]

// 模拟医院数据
const hospitals = [
  { id: 1, name: "北京中心医院", city: "北京", experts: 15 },
  { id: 2, name: "上海第一人民医院", city: "上海", experts: 12 },
  { id: 3, name: "广州医科大学附属医院", city: "广州", experts: 10 },
  { id: 4, name: "武汉协和医院", city: "武汉", experts: 8 },
  { id: 5, name: "成都市第三人民医院", city: "成都", experts: 6 },
  { id: 6, name: "天津市妇女儿童医院", city: "天津", experts: 9 },
  { id: 7, name: "南京医科大学附属医院", city: "南京", experts: 7 },
  { id: 8, name: "杭州市第一人民医院", city: "杭州", experts: 5 },
]

export default function ExpertsClient() {
  const [activeTab, setActiveTab] = useState("experts")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState(null)

  // 过滤专家列表
  const filteredExperts = experts.filter((expert) => {
    // 搜索过滤
    if (
      searchQuery &&
      !expert.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !expert.department.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !expert.hospital.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !expert.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }
    // 科室过滤
    if (selectedDepartment && selectedDepartment !== "all" && expert.department !== selectedDepartment) {
      return false
    }
    // 城市过滤
    if (selectedCity && selectedCity !== "all" && expert.city !== selectedCity) {
      return false
    }
    return true
  })

  // 打开专家详情
  const openExpertDetails = (expert) => {
    setSelectedExpert(expert)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="experts">专家医生</TabsTrigger>
            <TabsTrigger value="hospitals">合作医院</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  邀请专家
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>邀请专家加入网络</DialogTitle>
                  <DialogDescription>发送邀请给医疗专家加入远程会诊网络。</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="expert-name">专家姓名</Label>
                    <Input id="expert-name" placeholder="输入专家姓名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expert-email">电子邮箱</Label>
                    <Input id="expert-email" type="email" placeholder="输入专家电子邮箱" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expert-department">所属科室</Label>
                      <Select>
                        <SelectTrigger id="expert-department">
                          <SelectValue placeholder="选择科室" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="心脏科">心脏科</SelectItem>
                          <SelectItem value="神经科">神经科</SelectItem>
                          <SelectItem value="骨科">骨科</SelectItem>
                          <SelectItem value="内分泌科">内分泌科</SelectItem>
                          <SelectItem value="呼吸科">呼吸科</SelectItem>
                          <SelectItem value="妇产科">妇产科</SelectItem>
                          <SelectItem value="肿瘤科">肿瘤科</SelectItem>
                          <SelectItem value="肝胆外科">肝胆外科</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expert-title">职称</Label>
                      <Select>
                        <SelectTrigger id="expert-title">
                          <SelectValue placeholder="选择职称" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="主任医师">主任医师</SelectItem>
                          <SelectItem value="副主任医师">副主任医师</SelectItem>
                          <SelectItem value="主治医师">主治医师</SelectItem>
                          <SelectItem value="住院医师">住院医师</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expert-hospital">所属医院</Label>
                    <Input id="expert-hospital" placeholder="输入医院名称" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invite-message">邀请信息</Label>
                    <Textarea
                      id="invite-message"
                      placeholder="输入邀请信息..."
                      defaultValue="诚挚邀请您加入我们的远程会诊专家网络，共同为患者提供高质量的医疗服务。"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setShowInviteDialog(false)}>发送邀请</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="experts">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>筛选条件</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search-experts">搜索专家</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-experts"
                        placeholder="姓名、专长或医院..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-department">科室</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger id="filter-department">
                        <SelectValue placeholder="所有科室" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有科室</SelectItem>
                        <SelectItem value="心脏科">心脏科</SelectItem>
                        <SelectItem value="神经科">神经科</SelectItem>
                        <SelectItem value="骨科">骨科</SelectItem>
                        <SelectItem value="内分泌科">内分泌科</SelectItem>
                        <SelectItem value="呼吸科">呼吸科</SelectItem>
                        <SelectItem value="妇产科">妇产科</SelectItem>
                        <SelectItem value="肿瘤科">肿瘤科</SelectItem>
                        <SelectItem value="肝胆外科">肝胆外科</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-city">城市</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger id="filter-city">
                        <SelectValue placeholder="所有城市" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有城市</SelectItem>
                        <SelectItem value="北京">北京</SelectItem>
                        <SelectItem value="上海">上海</SelectItem>
                        <SelectItem value="广州">广州</SelectItem>
                        <SelectItem value="武汉">武汉</SelectItem>
                        <SelectItem value="成都">成都</SelectItem>
                        <SelectItem value="天津">天津</SelectItem>
                        <SelectItem value="南京">南京</SelectItem>
                        <SelectItem value="杭州">杭州</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedDepartment("all")
                        setSelectedCity("all")
                      }}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      清除筛选
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              {filteredExperts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredExperts.map((expert) => (
                    <Card key={expert.id} className="overflow-hidden">
                      {expert.isFeatured && (
                        <div className="bg-yellow-500 text-white text-xs font-medium px-2 py-0.5 text-center">
                          特邀专家
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 border">
                            <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
                            <AvatarFallback>{expert.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg">{expert.name}</h3>
                              {expert.isVerified && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  已认证
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {expert.title} · {expert.department}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                              <Building className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{expert.hospital}</span>
                              <span className="text-xs">•</span>
                              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{expert.city}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 text-sm font-medium">{expert.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">•</span>
                              <div className="text-sm text-muted-foreground">{expert.consultations} 次会诊</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium mb-1">专长领域</div>
                          <div className="flex flex-wrap gap-1">
                            {expert.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="font-normal">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>可用时间: {expert.availability}</span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <Button variant="outline" size="sm" onClick={() => openExpertDetails(expert)}>
                            查看详情
                          </Button>
                          <Button size="sm">邀请会诊</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的专家</h3>
                  <p className="text-muted-foreground mb-4">尝试调整筛选条件或搜索关键词</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedDepartment("all")
                      setSelectedCity("all")
                    }}
                  >
                    查看所有专家
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hospitals">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hospitals.map((hospital) => (
              <Card key={hospital.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{hospital.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{hospital.city}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      合作医院
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <strong>{hospital.experts}</strong> 位专家医生
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      查看专家
                    </Button>
                    <Button variant="outline" size="sm">
                      医院详情
                      <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 专家详情对话框 */}
      {selectedExpert && (
        <Dialog open={!!selectedExpert} onOpenChange={() => setSelectedExpert(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>专家详情</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border">
                  <AvatarImage src={selectedExpert.avatar || "/placeholder.svg"} alt={selectedExpert.name} />
                  <AvatarFallback>{selectedExpert.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">{selectedExpert.name}</h2>
                    {selectedExpert.isVerified && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        已认证
                      </Badge>
                    )}
                    {selectedExpert.isFeatured && <Badge className="bg-yellow-500">特邀专家</Badge>}
                  </div>
                  <div className="text-muted-foreground">
                    {selectedExpert.title} · {selectedExpert.department}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedExpert.hospital}</span>
                    <span className="text-xs">•</span>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedExpert.city}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{selectedExpert.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{selectedExpert.consultations} 次会诊</div>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-medium mb-2">专业背景</h3>
                <p className="text-sm text-muted-foreground">{selectedExpert.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="font-medium mb-2">专长领域</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedExpert.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">可用时间</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{selectedExpert.availability}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="font-medium mb-2">联系方式</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedExpert.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedExpert.contact.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setSelectedExpert(null)}>
                关闭
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">查看历史会诊</Button>
                <Button>邀请会诊</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
