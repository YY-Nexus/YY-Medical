"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TwoFactorAuth() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>两步验证</CardTitle>
        <CardDescription>设置两步验证以增强账号安全性</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">两步验证功能即将推出，敬请期待。</p>
      </CardContent>
    </Card>
  )
}
