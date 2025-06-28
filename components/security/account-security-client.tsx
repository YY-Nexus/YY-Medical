"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PasswordChangeForm } from "./password-change-form"
import { TwoFactorAuth } from "./two-factor-auth"
import { LoginDevices } from "./login-devices"
import { LoginHistory } from "./login-history"

export function AccountSecurityClient() {
  return (
    <Tabs defaultValue="history" className="space-y-4">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="password">密码修改</TabsTrigger>
        <TabsTrigger value="2fa">两步验证</TabsTrigger>
        <TabsTrigger value="devices">登录设备</TabsTrigger>
        <TabsTrigger value="history">登录历史</TabsTrigger>
      </TabsList>

      <TabsContent value="password">
        <PasswordChangeForm />
      </TabsContent>

      <TabsContent value="2fa">
        <TwoFactorAuth />
      </TabsContent>

      <TabsContent value="devices">
        <LoginDevices />
      </TabsContent>

      <TabsContent value="history">
        <LoginHistory />
      </TabsContent>
    </Tabs>
  )
}
