import { Logo } from "@/components/brand/logo"
import { Slogan } from "@/components/brand/slogan"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Shield, Zap, Users, Globe, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="lg" showText animated />
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
                控制台
              </Link>
              <Link href="/patients" className="text-sm font-medium hover:text-blue-600 transition-colors">
                患者管理
              </Link>
              <Link href="/ai-diagnosis" className="text-sm font-medium hover:text-blue-600 transition-colors">
                AI诊断
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
                关于我们
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">登录</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">注册</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Logo size="xl" className="mx-auto mb-8" animated />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">言语云³</span>
              <br />
              <span className="text-2xl md:text-3xl font-medium text-gray-600">
                AI-Powered Intelligent Medical System
              </span>
            </h1>
            <Slogan size="lg" className="mb-8 max-w-3xl mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/dashboard">
                  开始使用 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/demo">观看演示</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="text-sm">
                AI诊断辅助
              </Badge>
              <Badge variant="secondary" className="text-sm">
                病例分析
              </Badge>
              <Badge variant="secondary" className="text-sm">
                知识图谱
              </Badge>
              <Badge variant="secondary" className="text-sm">
                智能问诊
              </Badge>
              <Badge variant="secondary" className="text-sm">
                多模态分析
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">核心功能特性</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              基于先进AI技术，为医疗行业提供全方位的智能化解决方案
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI智能诊断</CardTitle>
                <CardDescription>基于深度学习的医学影像分析和诊断辅助系统</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 多模态医学影像分析</li>
                  <li>• 智能病理识别</li>
                  <li>• 诊断建议生成</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>安全可靠</CardTitle>
                <CardDescription>符合医疗行业标准的数据安全和隐私保护</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• HIPAA合规认证</li>
                  <li>• 端到端加密</li>
                  <li>• 访问权限控制</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>高效处理</CardTitle>
                <CardDescription>快速响应的云端计算和实时数据处理能力</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 毫秒级响应时间</li>
                  <li>• 批量数据处理</li>
                  <li>• 自动化工作流</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>协作平台</CardTitle>
                <CardDescription>支持多科室协作的医疗团队管理系统</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 多用户协作</li>
                  <li>• 权限分级管理</li>
                  <li>• 实时沟通工具</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-cyan-600 mb-4" />
                <CardTitle>全球部署</CardTitle>
                <CardDescription>支持多语言和多地区的全球化医疗服务</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 多语言界面</li>
                  <li>• 本地化适配</li>
                  <li>• 全球CDN加速</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>患者关怀</CardTitle>
                <CardDescription>以患者为中心的个性化医疗服务体验</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 个性化治疗方案</li>
                  <li>• 健康数据追踪</li>
                  <li>• 智能提醒服务</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备开始您的智能医疗之旅？</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            加入我们，体验AI驱动的医疗创新，为患者提供更好的医疗服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/register">免费注册</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">联系我们</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" showText className="mb-4" />
              <Slogan className="text-gray-400 mb-4" />
              <p className="text-sm text-gray-400">致力于通过AI技术推动医疗行业的数字化转型</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">产品功能</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/ai-diagnosis" className="hover:text-white transition-colors">
                    AI诊断
                  </Link>
                </li>
                <li>
                  <Link href="/patients" className="hover:text-white transition-colors">
                    患者管理
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white transition-colors">
                    数据分析
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:text-white transition-colors">
                    科研工具
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">解决方案</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/solutions/hospital" className="hover:text-white transition-colors">
                    医院解决方案
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/clinic" className="hover:text-white transition-colors">
                    诊所解决方案
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/research" className="hover:text-white transition-colors">
                    科研机构
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/enterprise" className="hover:text-white transition-colors">
                    企业服务
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">支持与服务</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    帮助中心
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    开发文档
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    隐私政策
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 言语云³ (YYC³-Med). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
