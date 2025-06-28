"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Shield, Check, X, Eye, FileText } from "lucide-react"
import { CreatePermissionDialog } from "./create-permission-dialog"
import { EditPermissionDialog } from "./edit-permission-dialog"

// 模拟权限数据
const mockPermissions = [
  {
    id: "perm_1",
    code: "admin:system:view",
    name: "查看系统状态",
    description: "允许查看系统状态和性能指标",
    module: "系统",
    isActive: true,
    createdAt: new Date(2022, 0, 15),
  },
  {
    id: "perm_2",
    code: "admin:system:manage",
    name: "管理系统设置",
    description: "允许管理系统参数和配置",
    module: "系统",
    isActive: true,
    createdAt: new Date(2022, 0, 20),
  },
  {
    id: "perm_3",
    code: "admin:users:view",
    name: "查看用户",
    description: "允许查看用户列表和详情",
    module: "用户",
    isActive: true,
    createdAt: new Date(2022, 1, 5),
  },
  {
    id: "perm_4",
    code: "admin:users:create",
    name: "创建用户",
    description: "允许创建新用户",
    module: "用户",
    isActive: true,
    createdAt: new Date(2022, 1, 10),
  },
  {
    id: "perm_5",
    code: "admin:users:update",
    name: "更新用户",
    description: "允许编辑用户信息",
    module: "用户",
    isActive: true,
    createdAt: new Date(2022, 2, 15),
  },
  {
    id: "perm_6",
    code: "admin:users:delete",
    name: "删除用户",
    description: "允许删除用户",
    module: "用户",
    isActive: true,
    createdAt: new Date(2022, 3, 20),
  },
  {
    id: "perm_7",
    code: "admin:roles:manage",
    name: "管理角色",
    description: "允许管理角色和权限",
    module: "权限",
    isActive: true,
    createdAt: new Date(2022, 4, 10),
  },
  {
    id: "perm_8",
    code: "patient:records:view",
    name: "查看患者记录",
    description: "允许查看患者医疗记录",
    module: "患者",
    isActive: true,
    createdAt: new Date(2022, 5, 5),
  },
  {
    id: "perm_9",
    code: "patient:records:create",
    name: "创建患者记录",
    description: "允许创建患者医疗记录",
    module: "患者",
    isActive: true,
    createdAt: new Date(2022, 5, 15),
  },
  {
    id: "perm_10",
    code: "patient:records:update",
    name: "更新患者记录",
    description: "允许更新患者医疗记录",
    module: "患者",
    isActive: true,
    createdAt: new Date(2022, 6, 20),
  },
  {
    id: "perm_11",
    code: "reports:view",
    name: "查看报告",
    description: "允许查看分析报告",
    module: "报告",
    isActive: true,
    createdAt: new Date(2022, 7, 5),
  },
  {
    id: "perm_12",
    code: "reports:generate",
    name: "生成报告",
    description: "允许生成分析报告",
    module: "报告",
    isActive: true,
    createdAt: new Date(2022, 7, 15),
  },
  {
    id: "perm_13",
    code: "settings:view",
    name: "查看设置",
    description: "允许查看应用设置",
    module: "设置",
    isActive: true,
    createdAt: new Date(2022, 8, 10),
  },
  {
    id: "perm_14",
    code: "settings:update",
    name: "更新设置",
    description: "允许更新应用设置",
    module: "设置",
    isActive: true,
    createdAt: new Date(2022, 8, 20),
  },
  {
    id: "perm_15",
    code: "logs:view",
    name: "查看日志",
    description: "允许查看系统日志",
    module: "日志",
    isActive: true,
    createdAt: new Date(2022, 9, 5),
  },
  {
    id: "perm_16",
    code: "logs:export",
    name: "导出日志",
    description: "允许导出系统日志",
    module: "日志",
    isActive: false,
    createdAt: new Date(2022, 9, 15),
  },
]

// 模块分组颜色
const moduleColors: Record<string, string> = {
  系统: "bg-blue-100 text-blue-800",
  用户: "bg-green-100 text-green-800",
  权限: "bg-purple-100 text-purple-800",
  患者: "bg-rose-100 text-rose-800",
  报告: "bg-amber-100 text-amber-800",
  设置: "bg-gray-100 text-gray-800",
  日志: "bg-teal-100 text-teal-800",
}

export function PermissionsList() {
  const [permissions, setPermissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState<string[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<any>(null)

  // 提取所有可用模块
  const availableModules = Array.from(new Set(mockPermissions.map((p) => p.module)))

  // 模拟加载权限数据
  useEffect(() => {
    setLoading(true)

    // 模拟API调用延迟
    const timer = setTimeout(() => {
      // 筛选权限
      let filteredPermissions = [...mockPermissions]

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredPermissions = filteredPermissions.filter(
          (perm) =>
            perm.name.toLowerCase().includes(query) ||
            perm.description.toLowerCase().includes(query) ||
            perm.code.toLowerCase().includes(query),
        )
      }

      if (moduleFilter.length > 0) {
        filteredPermissions = filteredPermissions.filter((perm) => moduleFilter.includes(perm.module))
      }

      setPermissions(filteredPermissions)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, moduleFilter])

  const toggleModuleFilter = (module: string) => {
    setModuleFilter((prev) => (prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]))
  }

  const clearModuleFilter = () => {
    setModuleFilter([])
  }

  const handleEdit = (permission: any) => {
    setEditingPermission(permission)
    setEditDialogOpen(true)
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
          <CardTitle>权限列表</CardTitle>
          <CardDescription>管理系统权限</CardDescription>
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
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>权限列表</CardTitle>
          <CardDescription>管理系统权限</CardDescription>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>创建权限</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索权限..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {availableModules.map((module) => (
                <Badge
                  key={module}
                  variant={moduleFilter.includes(module) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleModuleFilter(module)}
                >
                  {module}
                </Badge>
              ))}
              {moduleFilter.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearModuleFilter} className="h-6 px-2 text-xs">
                  清除筛选
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>权限名称</TableHead>
                  <TableHead>权限代码</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>模块</TableHead>
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">{permission.name}</TableCell>
                    <TableCell className="font-mono text-xs">{permission.code}</TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell>
                      <Badge className={moduleColors[permission.module] || "bg-gray-100"}>{permission.module}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {permission.isActive ? (
                        <div className="flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <X className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(permission.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">操作</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(permission)}>编辑权限</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            查看角色
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            导出
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {permissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      未找到符合条件的权限
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 创建权限对话框 */}
        <CreatePermissionDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          availableModules={availableModules}
        />

        {/* 编辑权限对话框 */}
        <EditPermissionDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          permission={editingPermission}
          availableModules={availableModules}
        />
      </CardContent>
    </Card>
  )
}
