"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Users,
  FileText,
  Settings,
  Stethoscope,
  Pill,
  Activity,
  Database,
  Smartphone,
  Network,
  Shield,
  BookOpen,
  Brain,
  Microscope,
  Crosshair,
} from "lucide-react"

// 删除导入AnimatedLogo组件
// import { AnimatedLogo } from "@/components/brand/animated-logo"
import { ShieldLogo } from "@/components/brand/shield-logo"

export function GlobalNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      name: "首页",
      href: "/",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "患者管理",
      href: "/patients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "医疗记录",
      href: "/medical-records",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "临床决策",
      href: "/clinical-decision",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      name: "药物管理",
      href: "/medications",
      icon: <Pill className="h-5 w-5" />,
    },
    {
      name: "健康数据",
      href: "/health-data",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "数据分析",
      href: "/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "EHR集成",
      href: "/ehr-integration",
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: "移动应用",
      href: "/mobile-app",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      name: "远程会诊",
      href: "/teleconsultation",
      icon: <Network className="h-5 w-5" />,
    },
    {
      name: "AI模型",
      href: "/ai-model",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "安全管理",
      href: "/security",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      name: "研究项目",
      href: "/research",
      icon: <Microscope className="h-5 w-5" />,
    },
    {
      name: "品牌资产",
      href: "/brand",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "医学知识库",
      href: "/knowledge-base",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "知识图谱",
      href: "/knowledge-graph",
      icon: <Network className="h-5 w-5" />,
    },
    {
      name: "影像特征库",
      href: "/imaging-features",
      icon: <Crosshair className="h-5 w-5" />,
    },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <ShieldLogo size="md" showText={true} />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.slice(0, 7).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="relative inline-block text-left group">
                <button className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  更多
                </button>
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {navItems.slice(7).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-sm ${
                          pathname === item.href
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center p-2">
              <span className="sr-only">打开主菜单</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
          {/* 删除了此处可能存在的语言切换器 */}
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === item.href
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
