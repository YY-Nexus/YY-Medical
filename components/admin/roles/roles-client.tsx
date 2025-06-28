"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RolesList } from "./roles-list"
import { PermissionsList } from "./permissions-list"
import { RolePermissionMatrix } from "./role-permission-matrix"
import { CreateRoleDialog } from "./create-role-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function RolesClient() {
  const [activeTab, setActiveTab] = useState("roles")
  const [openCreateDialog, setOpenCreateDialog] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roles">角色管理</TabsTrigger>
            <TabsTrigger value="permissions">权限管理</TabsTrigger>
            <TabsTrigger value="matrix">权限矩阵</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button onClick={() => setOpenCreateDialog(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          创建角色
        </Button>
      </div>

      <TabsContent value="roles" className="mt-0">
        <RolesList />
      </TabsContent>

      <TabsContent value="permissions" className="mt-0">
        <PermissionsList />
      </TabsContent>

      <TabsContent value="matrix" className="mt-0">
        <RolePermissionMatrix />
      </TabsContent>

      <CreateRoleDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
    </div>
  )
}
