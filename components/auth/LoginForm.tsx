"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Shield, Heart, Activity } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 模拟登录过程
    setTimeout(() => {
      setIsLoading(false)
      // 这里可以添加实际的登录逻辑
      console.log("登录信息:", formData)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 medical-bg-animated">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 medical-card border-0 shadow-2xl">
        <CardHeader className="space-y-6 text-center pb-8">
          {/* Logo区域 */}
          <div className="flex justify-center">
            <Logo size="xl" showText={true} />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold medical-text-gradient">欢迎回来</CardTitle>
            <CardDescription className="text-slate-600">登录您的医疗AI智能诊疗系统</CardDescription>
          </div>

          {/* 医疗图标装饰 */}
          <div className="flex justify-center space-x-4 opacity-60">
            <div className="p-2 bg-blue-50 rounded-full">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div className="p-2 bg-cyan-50 rounded-full">
              <Heart className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 邮箱输入 */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                邮箱地址
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="medical-input pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                密码
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入您的密码"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="medical-input pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 记住我和忘记密码 */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-slate-600">记住我</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                忘记密码？
              </Link>
            </div>

            {/* 登录按钮 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full medical-btn-primary h-12 text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 medical-loading"></div>
                  <span>登录中...</span>
                </div>
              ) : (
                "立即登录"
              )}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* 注册链接 */}
          <div className="text-center text-sm text-slate-600">
            还没有账户？{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
            >
              立即注册
            </Link>
          </div>

          {/* 安全提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-700 text-sm">
              <Shield className="w-4 h-4" />
              <span>您的数据安全受到最高级别保护</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
