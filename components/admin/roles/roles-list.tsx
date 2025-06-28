"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { EditRoleDialog } from "./edit-role-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Shield, Users, User, Lock, Eye, PenSquare, Trash2, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// 模拟角色数据
const mockRoles = [
  {
    id: "role_1",
    name: "超级管理员",
    description: "拥有系统所有权限",
    users: 3,
    permissions: 128,
    isSystem: true,
    createdAt: new Date(2022, 0, 15),
  },
  {
    id: "role_2",
    name: "系统管理员",
    description: "管理系统设置和用户",
    users: 5,
    permissions: 64,
    isSystem: true,
    createdAt: new Date(2022, 0, 20),
  },
  {
    id: "role_3",
    name: "医生",
    description: "医疗专业人员权限",
    users: 42,
    permissions: 32,
    isSystem: true,
    createdAt: new Date(2022, 1, 5),
  },
  {
    id: "role_4",
    name: "护士",
    description: "医护人员权限",
    users: 38,
    permissions: 24,
    isSystem: true,
    createdAt: new Date(2022, 1, 10),
  },
  {
    id: "role_5",
    name: "数据分析师",
    description: "数据访问和分析权限",
    users: 12,
    permissions: 18,
    isSystem: false,
    createdAt: new Date(2022, 2, 15),
  },
  {
    id: "role_6",
    name: "研究人员",
    description: "研究数据访问权限",
    users: 8,
    permissions: 16,
    isSystem: false,
    createdAt: new Date(2022, 3, 20),
  },
  {
    id: "role_7",
    name: "前台",
    description: "患者管理和预约权限",
    users: 10,
    permissions: 12,
    isSystem: false,
    createdAt: new Date(2022, 4, 10),
  },
  {
    id: "role_8",
    name: "医技人员",
    description: "检验和医技权限",
    users: 15,
    permissions: 14,
    isSystem: false,
    createdAt: new Date(2022, 5, 5),
  },
]

export function RolesList() {
  const [roles, setRoles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingRole, setEditingRole] = useState<any>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingRole, setDeletingRole] = useState<any>(null)

  // 模拟加载角色数据
  useEffect(() => {
    setLoading(true)

    // 模拟API调用延迟
    const timer = setTimeout(() => {
      // 筛选角色
      let filteredRoles = [...mockRoles]

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredRoles = filteredRoles.filter(
          (role) => role.name.toLowerCase().includes(query) || role.description.toLowerCase().includes(query),
        )
      }

      setRoles(filteredRoles)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleEdit = (role: any) => {
    setEditingRole(role)
    setEditDialogOpen(true)
  }

  const handleDelete = (role: any) => {
    setDeletingRole(role)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!deletingRole) return

    // 模拟删除操作
    setRoles((prev) => prev.filter((role) => role.id !== deletingRole.id))

    toast({
      title: "角色已删除",
      description: `角色 "${deletingRole.name}" 已成功删除。`,
    })

    setDeleteDialogOpen(false)
    setDeletingRole(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>角色列表</CardTitle>
          <CardDescription>管理系统中的用户角色</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>角色列表</CardTitle>
        <CardDescription>管理系统中的用户角色</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索角色..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>角色名称</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead className="text-center">用户数</TableHead>
                  <TableHead className="text-center">权限数</TableHead>
                  <TableHead className="text-center">类型</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      {role.name}
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Users className="h-4 w-4 text-gray-500" />
                        {role.users}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Lock className="h-4 w-4 text-gray-500" />
                        {role.permissions}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {role.isSystem ? (
                        <Badge variant="secondary">系统内置</Badge>
                      ) : (
                        <Badge variant="outline">自定义</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(role.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">操作</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(role)}>
                            <PenSquare className="h-4 w-4 mr-2" />
                            编辑角色
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            <Eye className="h-4 w-4 mr-2" />
                            查看权限
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            <User className="h-4 w-4 mr-2" />
                            管理用户
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            <FileText className="h-4 w-4 mr-2" />
                            导出详情
                          </DropdownMenuItem>
                          {!role.isSystem && (
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(role)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除角色
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {roles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      未找到符合条件的角色
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 编辑角色对话框 */}
        <EditRoleDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} role={editingRole} />

        {/* 删除确认对话框 */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除角色</AlertDialogTitle>
              <AlertDialogDescription>
                {deletingRole && (
                  <>您确定要删除角色 "{deletingRole.name}" 吗？该操作无法撤销， 且将移除所有用户的该角色权限。</>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
