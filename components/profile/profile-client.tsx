"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, Building, Award, Shield, Bell } from "lucide-react"
import { AvatarUpload } from "./avatar-upload"
import { DEFAULT_AVATAR, getAvatarByRole } from "@/types/avatar-presets"
import { useToast } from "@/components/ui/use-toast"

export function ProfileClient() {
  const { toast } = useToast()

  // 模拟用户数据
  const [user, setUser] = useState({
    name: "张医生",
    role: "主治医师",
    email: "zhang.doctor@medinexus.com",
    phone: "138****5678",
    department: "内科",
    title: "主治医师",
    hospital: "协和医院",
    bio: "从事内科临床工作10年，专注于心血管疾病的诊断与治疗。",
    avatar: getAvatarByRole("医生"), // 使用基于角色的默认头像
    specialties: ["心血管疾病", "高血压", "冠心病"],
    certifications: [
      { name: "医师资格证", status: "已验证", expiry: "2030-12-31" },
      { name: "专科医师证书", status: "已验证", expiry: "2028-06-30" },
    ],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...user })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvatarChange = (file: File | null, preview: string | null) => {
    setAvatarFile(file)
    if (preview) {
      setFormData((prev) => ({ ...prev, avatar: preview }))
    } else {
      setFormData((prev) => ({ ...prev, avatar: DEFAULT_AVATAR }))
    }
  }

  const handleSave = () => {
    // 如果有新头像文件，这里会处理上传
    if (avatarFile) {
      // 实际项目中，这里会调用API上传头像
      console.log("上传头像文件:", avatarFile)
      // 模拟上传成功
      setTimeout(() => {
        console.log("头像上传成功")
      }, 1000)
    }

    setUser(formData)
    setIsEditing(false)
    setAvatarFile(null)

    toast({
      title: "保存成功",
      description: "您的个人资料已更新",
    })
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

  return (
    <Tabs defaultValue="basic" className="space-y-4">
      <TabsList>
        <TabsTrigger value="basic">基本信息</TabsTrigger>
        <TabsTrigger value="professional">专业资质</TabsTrigger>
        <TabsTrigger value="security">账号安全</TabsTrigger>
        <TabsTrigger value="notifications">通知设置</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>查看和更新您的个人基本信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <AvatarUpload currentAvatar={formData.avatar} onAvatarChange={handleAvatarChange} size="large" />
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">电话</Label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">科室</Label>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">职称</Label>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">医院</Label>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        id="hospital"
                        value={formData.hospital}
                        onChange={(e) => handleChange("hospital", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  取消
                </Button>
                <Button onClick={handleSave}>保存</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>编辑</Button>
            )}
          </CardFooter>
        </Card>
      </TabsContent>

      {/* 其他标签页内容保持不变 */}
      <TabsContent value="professional">
        {/* 专业资质内容 */}
        <Card>
          <CardHeader>
            <CardTitle>专业资质</CardTitle>
            <CardDescription>管理您的专业资质和证书</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">专业特长</h3>
                <Button variant="outline" size="sm">
                  添加特长
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.specialties.map((specialty, index) => (
                  <div key={index} className="bg-medical-50 text-medical-700 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">资质证书</h3>
                <Button variant="outline" size="sm">
                  添加证书
                </Button>
              </div>
              <div className="space-y-3">
                {user.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-medical-500" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">有效期至: {cert.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full mr-2">
                        {cert.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        查看
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        {/* 账号安全内容 */}
        <Card>
          <CardHeader>
            <CardTitle>账号安全</CardTitle>
            <CardDescription>管理您的账号安全设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">密码</h3>
                  <p className="text-sm text-muted-foreground">上次更新: 3个月前</p>
                </div>
                <Button>修改密码</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">两步验证</h3>
                  <p className="text-sm text-muted-foreground">使用手机验证码增强账号安全</p>
                </div>
                <Button variant="outline">启用</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">登录设备</h3>
                  <p className="text-sm text-muted-foreground">查看和管理已登录的设备</p>
                </div>
                <Button variant="outline">查看设备</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">登录历史</h3>
                  <p className="text-sm text-muted-foreground">查看您的账号登录历史</p>
                </div>
                <Button variant="outline">查看历史</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        {/* 通知设置内容 */}
        <Card>
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
            <CardDescription>管理您接收通知的方式和频率</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <p className="font-medium">系统通知</p>
                    <p className="text-sm text-muted-foreground">关于系统更新和维护的通知</p>
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="选择接收方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="email">仅邮件</SelectItem>
                    <SelectItem value="app">仅应用内</SelectItem>
                    <SelectItem value="none">不接收</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <p className="font-medium">资质提醒</p>
                    <p className="text-sm text-muted-foreground">关于资质即将过期的提醒</p>
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="选择接收方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="email">仅邮件</SelectItem>
                    <SelectItem value="app">仅应用内</SelectItem>
                    <SelectItem value="none">不接收</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-medical-500" />
                  <div>
                    <p className="font-medium">安全提醒</p>
                    <p className="text-sm text-muted-foreground">关于账号安全的重要提醒</p>
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="选择接收方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="email">仅邮件</SelectItem>
                    <SelectItem value="app">仅应用内</SelectItem>
                    <SelectItem value="none">不接收</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>保存设置</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
