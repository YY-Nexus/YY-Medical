"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo, AnimatedLogo } from "@/components/brand/logo"
import { Brain, Stethoscope, Shield, Zap, Users, BarChart3, ArrowRight, Sparkles, Heart, Activity } from "lucide-react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* 导航栏 */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="sm" />
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Sparkles className="w-3 h-3 mr-1" />
                AI驱动
              </Badge>
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  管理后台
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <AnimatedLogo size="xl" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">言语云³</span>
              <br />
              <span className="text-2xl sm:text-4xl text-gray-600">医疗AI智能诊疗系统</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              融合前沿AI技术与医疗专业知识，为医疗机构提供智能化诊疗支持， 提升诊断准确性，优化医疗流程，守护生命健康。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-diagnosis">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  开始AI诊断
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能模块</h2>
            <p className="text-lg text-gray-600">全方位的医疗AI解决方案</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI智能诊断",
                description: "基于深度学习的医学影像分析和疾病诊断",
                href: "/ai-diagnosis",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Stethoscope,
                title: "临床决策支持",
                description: "智能化的临床路径推荐和治疗方案建议",
                href: "/clinical-decision",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Users,
                title: "患者管理",
                description: "全生命周期的患者健康数据管理",
                href: "/patients",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: BarChart3,
                title: "数据分析",
                description: "医疗大数据分析和预测性洞察",
                href: "/analytics",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Shield,
                title: "安全合规",
                description: "符合医疗行业标准的数据安全保护",
                href: "/security",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Zap,
                title: "远程医疗",
                description: "高效的远程诊疗和专家会诊平台",
                href: "/teleconsultation",
                color: "from-cyan-500 to-cyan-600",
              },
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                  <Link href={feature.href}>
                    <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      了解详情 <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { icon: Heart, number: "10,000+", label: "服务患者" },
              { icon: Users, number: "500+", label: "医疗机构" },
              { icon: Activity, number: "99.5%", label: "诊断准确率" },
              { icon: Zap, number: "24/7", label: "全天候服务" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="w-8 h-8 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo size="sm" variant="white" />
            </div>
            <div className="text-sm text-gray-400">© 2024 言语云³医疗AI系统. 保留所有权利.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
