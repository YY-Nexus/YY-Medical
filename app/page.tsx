import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Brain, Users, Activity, Stethoscope, Database, ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/brand/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* 顶部导航栏 */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="md" animated={true} />
              <div>
                <h1 className="text-xl font-bold text-blue-800">言语云³</h1>
                <p className="text-sm text-blue-600">YanYu Cloud</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                  登录
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">注册</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-16">
        {/* 英雄区域 */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Logo size="xl" animated={true} />
              <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-blue-800 mb-6">言语云³医疗AI系统</h1>

          <p className="text-xl text-blue-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            融合人工智能与医疗专业知识，为医疗机构提供智能化、安全可靠的诊疗管理解决方案
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg"
              >
                立即开始
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
              >
                了解更多
              </Button>
            </Link>
          </div>
        </div>

        {/* 核心功能展示 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">AI智能诊断</h3>
              <p className="text-sm text-blue-600">基于深度学习的医疗影像分析和辅助诊断</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">患者管理</h3>
              <p className="text-sm text-blue-600">全面的患者信息管理和病历电子化</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">实时监控</h3>
              <p className="text-sm text-blue-600">生命体征监测和预警系统</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">数据安全</h3>
              <p className="text-sm text-blue-600">符合医疗行业标准的数据加密和隐私保护</p>
            </CardContent>
          </Card>
        </div>

        {/* 系统优势 */}
        <div className="bg-white rounded-2xl border border-blue-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">系统优势</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">专业医疗</h3>
              <p className="text-blue-600">基于医疗行业深度定制，符合临床工作流程</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">数据驱动</h3>
              <p className="text-blue-600">大数据分析和机器学习提供决策支持</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">质量保证</h3>
              <p className="text-blue-600">通过医疗器械认证，确保系统可靠性</p>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="sm" />
                <div>
                  <h3 className="font-bold">言语云³</h3>
                  <p className="text-sm text-blue-200">YanYu Cloud</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">专业的医疗AI管理系统，为医疗机构提供智能化解决方案。</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">产品功能</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>AI智能诊断</li>
                <li>患者管理系统</li>
                <li>医疗数据分析</li>
                <li>远程医疗服务</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">解决方案</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>医院信息化</li>
                <li>诊所管理</li>
                <li>健康监测</li>
                <li>医疗研究</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>技术支持</li>
                <li>商务合作</li>
                <li>用户反馈</li>
                <li>帮助中心</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>© 2024 言语云³医疗AI系统. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
