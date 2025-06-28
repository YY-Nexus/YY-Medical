"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 验证表单
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError("请填写所有必填字段")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department: formData.department,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "注册失败")
      }

      // 使用返回的令牌自动登录
      await login(formData.email, formData.password)

      // 注册成功，跳转到首页
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册过程中发生错误")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">注册 MediNexus³ 账号</h1>
        <p className="mt-2 text-gray-600">创建您的账号以访问所有功能</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="请输入您的姓名"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">角色</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange("role", value)}
            disabled={isLoading}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="选择您的角色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doctor">医生</SelectItem>
              <SelectItem value="researcher">研究员</SelectItem>
              <SelectItem value="admin">管理员</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.role === "doctor" && (
          <div className="space-y-2">
            <Label htmlFor="department">科室</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
              disabled={isLoading}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="选择您的科室" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="内科">内科</SelectItem>
                <SelectItem value="外科">外科</SelectItem>
                <SelectItem value="儿科">儿科</SelectItem>
                <SelectItem value="妇产科">妇产科</SelectItem>
                <SelectItem value="神经科">神经科</SelectItem>
                <SelectItem value="心脏科">心脏科</SelectItem>
                <SelectItem value="肿瘤科">肿瘤科</SelectItem>
                <SelectItem value="急诊科">急诊科</SelectItem>
                <SelectItem value="放射科">放射科</SelectItem>
                <SelectItem value="麻醉科">麻醉科</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          {isLoading ? "注册中..." : "注册"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">已有账号? </span>
        <a href="/login" className="text-blue-600 hover:underline">
          登录
        </a>
      </div>
    </div>
  )
}
