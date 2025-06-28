"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Search, Check, Save } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

// 复用模拟角色和权限数据
const mockRoles = [
  {
    id: "role_1",
    name: "超级管理员",
    description: "拥有系统所有权限",
    isSystem: true,
  },
  {
    id: "role_2",
    name: "系统管理员",
    description: "管理系统设置和用户",
    isSystem: true,
  },
  {
    id: "role_3",
    name: "医生",
    description: "医疗专业人员权限",
    isSystem: true,
  },
  {
    id: "role_4",
    name: "护士",
    description: "医护人员权限",
    isSystem: true,
  },
  {
    id: "role_5",
    name: "数据分析师",
    description: "数据访问和分析权限",
    isSystem: false,
  },
  {
    id: "role_6",
    name: "研究人员",
    description: "研究数据访问权限",
    isSystem: false,
  },
]

// 模拟权限数据（简化版）
const mockPermissions = [
  {
    id: "perm_1",
    code: "admin:system:view",
    name: "查看系统状态",
    module: "系统",
  },
  {
    id: "perm_2",
    code: "admin:system:manage",
    name: "管理系统设置",
    module: "系统",
  },
  {
    id: "perm_3",
    code: "admin:users:view",
    name: "查看用户",
    module: "用户",
  },
  {
    id: "perm_4",
    code: "admin:users:create",
    name: "创建用户",
    module: "用户",
  },
  {
    id: "perm_5",
    code: "admin:users:update",
    name: "更新用户",
    module: "用户",
  },
  {
    id: "perm_6",
    code: "admin:users:delete",
    name: "删除用户",
    module: "用户",
  },
  {
    id: "perm_7",
    code: "admin:roles:manage",
    name: "管理角色",
    module: "权限",
  },
  {
    id: "perm_8",
    code: "patient:records:view",
    name: "查看患者记录",
    module: "患者",
  },
  {
    id: "perm_9",
    code: "patient:records:create",
    name: "创建患者记录",
    module: "患者",
  },
  {
    id: "perm_10",
    code: "patient:records:update",
    name: "更新患者记录",
    module: "患者",
  },
]

// 模拟权限矩阵数据
const generateMockMatrix = () => {
  const matrix: Record<string, string[]> = {}

  mockRoles.forEach((role) => {
    matrix[role.id] = []

    mockPermissions.forEach((perm) => {
      // 超级管理员拥有所有权限
      if (role.id === "role_1") {
        matrix[role.id].push(perm.id)
      }
      // 系统管理员拥有大部分权限
      else if (role.id === "role_2") {
        if (!perm.code.includes("delete")) {
          matrix[role.id].push(perm.id)
        }
      }
      // 医生拥有患者相关权限
      else if (role.id === "role_3") {
        if (perm.module === "患者" || perm.code === "admin:users:view") {
          matrix[role.id].push(perm.id)
        }
      }
      // 护士拥有部分患者权限
      else if (role.id === "role_4") {
        if (perm.code === "patient:records:view" || perm.code === "admin:users:view") {
          matrix[role.id].push(perm.id)
        }
      }
      // 数据分析师拥有查看权限
      else if (role.id === "role_5") {
        if (perm.code.includes("view")) {
          matrix[role.id].push(perm.id)
        }
      }
      // 研究人员拥有患者记录查看权限
      else if (role.id === "role_6") {
        if (perm.code === "patient:records:view") {
          matrix[role.id].push(perm.id)
        }
      }
    })
  })

  return matrix
}

// 模块分组颜色
const moduleColors: Record<string, string> = {
  系统: "bg-blue-100 text-blue-800",
  用户: "bg-green-100 text-green-800",
  权限: "bg-purple-100 text-purple-800",
  患者: "bg-rose-100 text-rose-800",
}

export function RolePermissionMatrix() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState<string[]>([])
  const [matrix, setMatrix] = useState<Record<string, string[]>>({})
  const [filteredPermissions, setFilteredPermissions] = useState<any[]>([])
  const [changed, setChanged] = useState(false)

  // 提取所有可用模块
  const availableModules = Array.from(new Set(mockPermissions.map((p) => p.module)))

  // 模拟加载权限矩阵数据
  useEffect(() => {
    setLoading(true)

    // 模拟API调用延迟
    const timer = setTimeout(() => {
      const mockMatrix = generateMockMatrix()
      setMatrix(mockMatrix)

      // 筛选权限
      let filtered = [...mockPermissions]

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (perm) => perm.name.toLowerCase().includes(query) || perm.code.toLowerCase().includes(query),
        )
      }

      if (moduleFilter.length > 0) {
        filtered = filtered.filter((perm) => moduleFilter.includes(perm.module))
      }

      setFilteredPermissions(filtered)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchQuery, moduleFilter])

  const toggleModuleFilter = (module: string) => {
    setModuleFilter((prev) => (prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]))
  }

  const clearModuleFilter = () => {
    setModuleFilter([])
  }

  const togglePermission = (roleId: string, permId: string) => {
    setMatrix((prev) => {
      const newMatrix = { ...prev }

      if (newMatrix[roleId].includes(permId)) {
        newMatrix[roleId] = newMatrix[roleId].filter((id) => id !== permId)
      } else {
        newMatrix[roleId] = [...newMatrix[roleId], permId]
      }

      return newMatrix
    })

    setChanged(true)
  }

  const saveChanges = () => {
    // 模拟保存操作
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setChanged(false)

      toast({
        title: "权限已更新",
        description: "角色权限矩阵已成功保存。",
      })
    }, 1000)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>权限矩阵</CardTitle>
          <CardDescription>管理角色和权限关系</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="overflow-x-auto">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>权限矩阵</CardTitle>
        <CardDescription>管理角色和权限关系，分配和撤销权限</CardDescription>
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

          {changed && (
            <div className="flex justify-end">
              <Button onClick={saveChanges} className="gap-1.5">
                <Save className="h-4 w-4" />
                保存更改
              </Button>
            </div>
          )}

          <div className="overflow-x-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-white w-[280px]">权限名称</TableHead>
                  {mockRoles.map((role) => (
                    <TableHead key={role.id} className="text-center min-w-[120px]">
                      {role.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="sticky left-0 bg-white font-medium whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={moduleColors[permission.module] || "bg-gray-100"}>
                            {permission.module}
                          </Badge>
                          <span>{permission.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono mt-1">{permission.code}</div>
                      </div>
                    </TableCell>
                    {mockRoles.map((role) => (
                      <TableCell key={role.id} className="text-center">
                        {role.id === "role_1" ? (
                          // 超级管理员固定拥有所有权限
                          <div className="flex justify-center">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                        ) : (
                          <Checkbox
                            checked={matrix[role.id]?.includes(permission.id)}
                            onCheckedChange={() => togglePermission(role.id, permission.id)}
                            aria-label={`${role.name} 权限 ${permission.name}`}
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {filteredPermissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={mockRoles.length + 1} className="h-24 text-center">
                      未找到符合条件的权限
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {changed && (
            <div className="flex justify-end mt-4">
              <Button onClick={saveChanges} className="gap-1.5">
                <Save className="h-4 w-4" />
                保存更改
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
