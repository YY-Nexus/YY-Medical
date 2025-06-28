"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash, UserPlus, ShieldCheck, Eye, EyeOff, Lock } from "lucide-react"

// 模拟角色数据
const roles = [
  {
    id: "role-001",
    name: "系统管理员",
    description: "拥有系统的完全访问权限",
    userCount: 3,
    permissions: [
      { id: "perm-001", name: "用户管理", granted: true },
      { id: "perm-002", name: "角色管理", granted: true },
      { id: "perm-003", name: "患者数据访问", granted: true },
      { id: "perm-004", name: "诊断数据访问", granted: true },
      { id: "perm-005", name: "系统配置", granted: true },
      { id: "perm-006", name: "审计日志查看", granted: true },
    ],
  },
  {
    id: "role-002",
    name: "医生",
    description: "可以访问患者数据和诊断功能",
    userCount: 25,
    permissions: [
      { id: "perm-001", name: "用户管理", granted: false },
      { id: "perm-002", name: "角色管理", granted: false },
      { id: "perm-003", name: "患者数据访问", granted: true },
      { id: "perm-004", name: "诊断数据访问", granted: true },
      { id: "perm-005", name: "系统配置", granted: false },
      { id: "perm-006", name: "审计日志查看", granted: false },
    ],
  },
  {
    id: "role-003",
    name: "护士",
    description: "可以查看患者基本信息",
    userCount: 42,
    permissions: [
      { id: "perm-001", name: "用户管理", granted: false },
      { id: "perm-002", name: "角色管理", granted: false },
      { id: "perm-003", name: "患者数据访问", granted: true },
      { id: "perm-004", name: "诊断数据访问", granted: false },
      { id: "perm-005", name: "系统配置", granted: false },
      { id: "perm-006", name: "审计日志查看", granted: false },
    ],
  },
  {
    id: "role-004",
    name: "患者",
    description: "只能访问自己的数据",
    userCount: 1250,
    permissions: [
      { id: "perm-001", name: "用户管理", granted: false },
      { id: "perm-002", name: "角色管理", granted: false },
      { id: "perm-003", name: "患者数据访问", granted: false },
      { id: "perm-004", name: "诊断数据访问", granted: false },
      { id: "perm-005", name: "系统配置", granted: false },
      { id: "perm-006", name: "审计日志查看", granted: false },
    ],
  },
]

// 模拟用户数据
const users = [
  {
    id: "user-001",
    name: "张医生",
    email: "zhang@hospital.com",
    role: "医生",
    status: "active",
    lastLogin: "2025-04-28 09:15",
  },
  {
    id: "user-002",
    name: "李护士",
    email: "li@hospital.com",
    role: "护士",
    status: "active",
    lastLogin: "2025-04-28 08:30",
  },
  {
    id: "user-003",
    name: "王管理",
    email: "wang@hospital.com",
    role: "系统管理员",
    status: "active",
    lastLogin: "2025-04-27 17:45",
  },
  {
    id: "user-004",
    name: "赵患者",
    email: "zhao@example.com",
    role: "患者",
    status: "inactive",
    lastLogin: "2025-04-25 14:20",
  },
]

export function AccessControlPanel() {
  const [activeTab, setActiveTab] = useState("roles")
  const [selectedRole, setSelectedRole] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // 处理角色选择
  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  // 过滤用户
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>访问控制</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roles">角色管理</TabsTrigger>
            <TabsTrigger value="users">用户管理</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="pt-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">角色列表</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                添加角色
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:border-emerald-500 transition-colors ${
                    selectedRole?.id === role.id ? "border-emerald-500 bg-emerald-50" : ""
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{role.name}</div>
                    <Badge variant="outline">{role.userCount} 用户</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{role.description}</div>
                </div>
              ))}
            </div>

            {selectedRole && (
              <div className="mt-6 border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">权限设置: {selectedRole.name}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      编辑
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash className="w-4 h-4 mr-2" />
                      删除
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedRole.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div className="flex items-center">
                        {permission.granted ? (
                          <Eye className="w-4 h-4 text-emerald-500 mr-2" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400 mr-2" />
                        )}
                        <span>{permission.name}</span>
                      </div>
                      <Switch checked={permission.granted} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="users" className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索用户..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="sm" className="ml-2">
                <UserPlus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {user.role}
                      </Badge>
                      <Badge
                        variant={user.status === "active" ? "default" : "outline"}
                        className={user.status === "active" ? "bg-emerald-500" : "text-gray-500 border-gray-500"}
                      >
                        {user.status === "active" ? "活跃" : "非活跃"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-muted-foreground">上次登录: {user.lastLogin}</div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          导出访问控制配置
        </Button>
      </CardFooter>
    </Card>
  )
}
