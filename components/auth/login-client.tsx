"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function LoginClient() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 模拟登录请求
    setTimeout(() => {
      setLoading(false)
      // 登录成功后跳转到首页
      router.push("/")
    }, 1500)
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">欢迎回来</CardTitle>
          <CardDescription className="text-center">请输入您的账号和密码登录</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">密码</Label>
                <Link href="/forgot-password" className="text-sm text-medical-600 hover:underline">
                  忘记密码?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => handleChange("remember", checked)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                记住我
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              还没有账号?{" "}
              <Link href="/register" className="text-medical-600 hover:underline">
                注册
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
