"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // 密码强度检测
  const passwordStrength = calculatePasswordStrength(newPassword)

  // 密码要求检查
  const hasMinLength = newPassword.length >= 8
  const hasUpperCase = /[A-Z]/.test(newPassword)
  const hasLowerCase = /[a-z]/.test(newPassword)
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword)

  // 密码匹配检查
  const passwordsMatch = newPassword === confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 重置状态
    setError(null)
    setSuccess(null)

    // 表单验证
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("请填写所有字段")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("新密码与确认密码不匹配")
      return
    }

    if (passwordStrength < 2) {
      setError("新密码强度不足，请参考密码要求")
      return
    }

    // 开始提交
    setIsLoading(true)

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 模拟成功响应
      setSuccess("密码修改成功！")

      // 清空表单
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError("密码修改失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>修改密码</CardTitle>
        <CardDescription>定期更新您的密码可以提高账号安全性</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">当前密码</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="请输入当前密码"
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">新密码</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="请输入新密码"
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* 密码强度指示器 */}
            {newPassword && (
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">密码强度</span>
                  <span className="text-sm font-medium">
                    {passwordStrength === 0 && "弱"}
                    {passwordStrength === 1 && "中"}
                    {passwordStrength === 2 && "强"}
                    {passwordStrength === 3 && "非常强"}
                  </span>
                </div>
                <Progress
                  value={((passwordStrength + 1) / 4) * 100}
                  className="h-2"
                  style={
                    {
                      backgroundColor: "#f3f4f6",
                      "--progress-background":
                        passwordStrength === 0
                          ? "#ef4444"
                          : passwordStrength === 1
                            ? "#f59e0b"
                            : passwordStrength === 2
                              ? "#10b981"
                              : "#0ea5e9",
                    } as React.CSSProperties
                  }
                />
              </div>
            )}

            {/* 密码要求列表 */}
            <div className="space-y-1 mt-2">
              <p className="text-sm text-gray-500">密码要求：</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  {hasMinLength ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  至少8个字符
                </li>
                <li className="flex items-center">
                  {hasUpperCase ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  至少一个大写字母
                </li>
                <li className="flex items-center">
                  {hasLowerCase ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  至少一个小写字母
                </li>
                <li className="flex items-center">
                  {hasNumber ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  至少一个数字
                </li>
                <li className="flex items-center">
                  {hasSpecialChar ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  至少一个特殊字符
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认新密码</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入新密码"
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* 密码匹配提示 */}
            {confirmPassword && (
              <div className="flex items-center mt-1">
                {passwordsMatch ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                )}
                <span className={`text-sm ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                  {passwordsMatch ? "密码匹配" : "密码不匹配"}
                </span>
              </div>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button type="button" variant="outline" className="mr-2" disabled={isLoading}>
          取消
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          {isLoading ? "提交中..." : "修改密码"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// 计算密码强度（0-3）
function calculatePasswordStrength(password: string): number {
  if (!password) return 0

  let score = 0

  // 长度检查
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1

  // 复杂度检查
  const patterns = [
    /[A-Z]/, // 大写字母
    /[a-z]/, // 小写字母
    /[0-9]/, // 数字
    /[^A-Za-z0-9]/, // 特殊字符
  ]

  const complexity = patterns.reduce((count, pattern) => count + (pattern.test(password) ? 1 : 0), 0)

  score += Math.min(2, complexity - 1)

  return Math.min(3, score)
}
