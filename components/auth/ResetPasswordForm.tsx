"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // 验证表单
    if (!password || !confirmPassword) {
      setError("请填写所有字段")
      return
    }

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }

    if (!token) {
      setError("无效的重置令牌")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "重置密码失败")
      }

      setSuccess("密码已成功重置")

      // 3秒后重定向到登录页
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "重置密码时发生错误")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">重置密码</h1>
        <p className="mt-2 text-gray-600">请设置您的新密码</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="border-green-500 bg-green-50">
          <AlertDescription className="text-green-700">
            {success}
            <div className="mt-2">
              <span className="text-sm">3秒后将自动跳转到登录页面...</span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">新密码</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={isLoading || !!success}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">确认新密码</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={isLoading || !!success}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !!success}>
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          {isLoading ? "重置中..." : "重置密码"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <a href="/login" className="text-blue-600 hover:underline">
          返回登录
        </a>
      </div>
    </div>
  )
}
