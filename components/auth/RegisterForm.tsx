"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, Phone, UserPlus } from "lucide-react"
import Link from "next/link"

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // 验证密码
    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("密码强度不够，请包含大小写字母、数字和特殊字符")
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError("请同意服务条款和隐私政策")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // 注册成功，跳转到登录页面
        onSuccess?.()
        router.push("/login?message=注册成功，请登录")
      } else {
        setError(data.message || "注册失败，请稍后重试")
      }
    } catch (err) {
      setError("网络错误，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "弱"
      case 2:
      case 3:
        return "中等"
      case 4:
      case 5:
        return "强"
      default:
        return ""
    }
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "text-red-500"
      case 2:
      case 3:
        return "text-yellow-500"
      case 4:
      case 5:
        return "text-green-500"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-blue-200 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg border-b border-blue-100">
        <div className="flex items-center justify-center mb-2">
          <UserPlus className="h-6 w-6 text-blue-600 mr-2" />
          <CardTitle className="text-2xl font-bold text-center text-blue-800">创建账户</CardTitle>
        </div>
        <CardDescription className="text-center text-blue-600">填写以下信息来创建您的医疗管理账户</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-6">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-700 font-medium">
              姓名
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700 font-medium">
              邮箱地址
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="请输入您的邮箱"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-blue-700 font-medium">
              手机号码
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="请输入您的手机号码"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-700 font-medium">
              密码
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="请输入密码"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-blue-50 text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {formData.password && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-blue-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      passwordStrength <= 1 ? "bg-red-500" : passwordStrength <= 3 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getPasswordStrengthColor()}`}>{getPasswordStrengthText()}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-blue-700 font-medium">
              确认密码
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="请再次输入密码"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 pr-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-blue-50 text-blue-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
              className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="agreeToTerms" className="text-sm text-blue-700">
              我同意{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                服务条款
              </Link>{" "}
              和{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                隐私政策
              </Link>
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium shadow-lg medical-pulse"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                注册中...
              </div>
            ) : (
              "创建账户"
            )}
          </Button>

          <div className="text-center text-sm text-blue-600">
            已有账户？{" "}
            <Link href="/login" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
              立即登录
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
