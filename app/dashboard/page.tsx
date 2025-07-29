"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, Calendar, FileText, LogOut, Heart, Brain, Stethoscope } from "lucide-react"
import { Logo } from "@/components/brand/logo"

interface User {
  id: number
  email: string
  name: string
  role: string
  loginTime: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!userData || !isLoggedIn) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "doctor":
        return "bg-blue-100 text-blue-800"
      case "nurse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "系统管理员"
      case "doctor":
        return "医生"
      case "nurse":
        return "护士"
      default:
        return "用户"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* 顶部导航栏 */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="md" animated={true} />
              <div>
                <h1 className="text-xl font-bold text-blue-800">言语云³医疗AI系统</h1>
                <p className="text-sm text-blue-600">智能医疗管理平台</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getRoleColor(user.role)}>{getRoleName(user.role)}</Badge>
              <span className="text-blue-700 font-medium">{user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">欢迎回来，{user.name}！</h2>
          <p className="text-blue-600">登录时间：{new Date(user.loginTime).toLocaleString("zh-CN")}</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">今日患者</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">24</div>
              <p className="text-xs text-blue-600">比昨天增加 +12%</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">预约数量</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">18</div>
              <p className="text-xs text-blue-600">今日待处理</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">AI诊断</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">7</div>
              <p className="text-xs text-blue-600">今日完成</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">系统状态</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">正常</div>
              <p className="text-xs text-blue-600">所有服务运行正常</p>
            </CardContent>
          </Card>
        </div>

        {/* 功能模块 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">患者管理</CardTitle>
                  <CardDescription>管理患者信息和病历</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">AI诊断</CardTitle>
                  <CardDescription>智能辅助诊断系统</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">预约管理</CardTitle>
                  <CardDescription>管理患者预约和排班</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">病历管理</CardTitle>
                  <CardDescription>电子病历和档案管理</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">健康监测</CardTitle>
                  <CardDescription>生命体征实时监控</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">远程医疗</CardTitle>
                  <CardDescription>在线咨询和远程诊疗</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  )
}
