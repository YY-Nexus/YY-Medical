"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Search, MoreHorizontal, Edit, Trash, UserPlus, Download, Upload, Filter, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

// 模拟用户数据
const mockUsers = [
  {
    id: "user-001",
    name: "张医生",
    email: "zhang@example.com",
    role: "doctor",
    department: "内科",
    status: "active",
    lastActive: "2025-05-15 14:32:45",
    createdAt: "2023-10-12",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-002",
    name: "王研究员",
    email: "wang@example.com",
    role: "researcher",
    department: "医学研究部",
    status: "active",
    lastActive: "2025-05-15 08:30:15",
    createdAt: "2023-11-05",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-003",
    name: "李医生",
    email: "li@example.com",
    role: "doctor",
    department: "放射科",
    status: "active",
    lastActive: "2025-05-14 16:45:22",
    createdAt: "2024-01-20",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-004",
    name: "赵管理员",
    email: "zhao@example.com",
    role: "admin",
    department: "系统管理部",
    status: "active",
    lastActive: "2025-05-15 10:12:33",
    createdAt: "2023-09-08",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-005",
    name: "刘医生",
    email: "liu@example.com",
    role: "doctor",
    department: "外科",
    status: "inactive",
    lastActive: "2025-05-10 09:22:18",
    createdAt: "2024-02-15",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-006",
    name: "陈研究员",
    email: "chen@example.com",
    role: "researcher",
    department: "医学研究部",
    status: "active",
    lastActive: "2025-05-14 11:30:45",
    createdAt: "2023-12-10",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-007",
    name: "杨医生",
    email: "yang@example.com",
    role: "doctor",
    department: "儿科",
    status: "active",
    lastActive: "2025-05-15 13:25:10",
    createdAt: "2024-03-05",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-008",
    name: "黄医生",
    email: "huang@example.com",
    role: "doctor",
    department: "妇产科",
    status: "locked",
    lastActive: "2025-05-01 15:40:22",
    createdAt: "2023-11-22",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-009",
    name: "周研究员",
    email: "zhou@example.com",
    role: "researcher",
    department: "医学研究部",
    status: "active",
    lastActive: "2025-05-14 14:15:30",
    createdAt: "2024-01-08",
    avatar: "/doctor-avatar.png",
  },
  {
    id: "user-010",
    name: "吴超级管理员",
    email: "wu@example.com",
    role: "super_admin",
    department: "系统管理部",
    status: "active",
    lastActive: "2025-05-15 09:50:15",
    createdAt: "2023-08-15",
    avatar: "/doctor-avatar.png",
  },
]

// 角色映射
const roleMap: Record<string, string> = {
  doctor: "医生",
  researcher: "研究员",
  admin: "管理员",
  super_admin: "超级管理员",
}

// 状态映射
const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "活跃", color: "bg-green-100 text-green-800 border-green-200" },
  inactive: { label: "非活跃", color: "bg-gray-100 text-gray-800 border-gray-200" },
  locked: { label: "已锁定", color: "bg-red-100 text-red-800 border-red-200" },
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  // 过滤用户
  const filteredUsers = mockUsers.filter((user) => {
    // 搜索过滤
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())

    // 角色过滤
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    // 状态过滤
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  // 处理单选
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId])
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId))
    }
  }

  // 处理删除用户
  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId)
    setIsDeleteDialogOpen(true)
  }

  // 确认删除用户
  const confirmDeleteUser = () => {
    // 在实际应用中，这里会调用API删除用户
    console.log(`删除用户: ${userToDelete}`)
    setIsDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  // 批量删除用户
  const handleBulkDelete = () => {
    // 在实际应用中，这里会调用API批量删除用户
    console.log(`批量删除用户: ${selectedUsers.join(", ")}`)
    setSelectedUsers([])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索用户..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="font-medium">角色</span>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部角色</SelectItem>
                    <SelectItem value="doctor">医生</SelectItem>
                    <SelectItem value="researcher">研究员</SelectItem>
                    <SelectItem value="admin">管理员</SelectItem>
                    <SelectItem value="super_admin">超级管理员</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="font-medium">状态</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="inactive">非活跃</SelectItem>
                    <SelectItem value="locked">已锁定</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setRoleFilter("all")
                  setStatusFilter("all")
                  setSearchTerm("")
                }}
              >
                重置筛选
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            导入
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新用户</DialogTitle>
                <DialogDescription>创建新用户账号并设置基本信息</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    姓名
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    邮箱
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    角色
                  </Label>
                  <Select>
                    <SelectTrigger id="role" className="col-span-3">
                      <SelectValue placeholder="选择角色" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">医生</SelectItem>
                      <SelectItem value="researcher">研究员</SelectItem>
                      <SelectItem value="admin">管理员</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    部门
                  </Label>
                  <Input id="department" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    初始密码
                  </Label>
                  <Input id="password" type="password" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  取消
                </Button>
                <Button type="submit" onClick={() => setIsAddUserOpen(false)}>
                  创建用户
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-2">
          <span>已选择 {selectedUsers.length} 个用户</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedUsers([])}>
              取消选择
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash className="mr-2 h-4 w-4" />
              批量删除
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle>用户列表</CardTitle>
            <Button variant="ghost" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>用户</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>最近活动</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{roleMap[user.role]}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusMap[user.status].color}>
                      {statusMap[user.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">操作菜单</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑用户
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          重置密码
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          删除用户
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    没有找到匹配的用户
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between px-6 py-4">
          <div className="text-sm text-muted-foreground">
            显示 {filteredUsers.length} 个用户中的 {Math.min(10, filteredUsers.length)} 个
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <Button variant="outline" size="sm">
              下一页
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除用户</DialogTitle>
            <DialogDescription>此操作不可撤销。这将永久删除该用户账户及其所有相关数据。</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>您确定要删除此用户吗？</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
