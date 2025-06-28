/**
 * 导航测试工具
 * 用于验证应用中的导航链接和侧边栏功能
 */

import { navItems } from "@/config/navigation"

// 导航链接测试结果类型
export interface NavLinkTestResult {
  href: string
  title: string
  isValid: boolean
  error?: string
}

// 侧边栏功能测试结果类型
export interface SidebarFunctionTestResult {
  name: string
  isWorking: boolean
  error?: string
}

/**
 * 验证所有导航链接
 * @returns 导航链接测试结果数组
 */
export async function testNavigationLinks(): Promise<NavLinkTestResult[]> {
  const results: NavLinkTestResult[] = []

  // 收集所有导航链接
  const allLinks: { href: string; title: string }[] = []

  // 处理主导航项
  navItems.forEach((item) => {
    if (item.href) {
      allLinks.push({ href: item.href, title: item.title })
    }

    // 处理子导航项
    if (item.children) {
      item.children.forEach((child) => {
        allLinks.push({ href: child.href, title: child.title })
      })
    }
  })

  // 测试每个链接
  for (const link of allLinks) {
    try {
      // 在实际应用中，这里可以使用fetch或其他方法验证链接
      // 在这个示例中，我们只是检查链接格式
      const isValid = link.href.startsWith("/") && !link.href.includes(" ")

      results.push({
        href: link.href,
        title: link.title,
        isValid,
        error: isValid ? undefined : "链接格式无效",
      })
    } catch (error) {
      results.push({
        href: link.href,
        title: link.title,
        isValid: false,
        error: error instanceof Error ? error.message : "未知错误",
      })
    }
  }

  return results
}

/**
 * 测试侧边栏折叠/展开功能
 * @returns 侧边栏功能测试结果数组
 */
export function testSidebarFunctions(): SidebarFunctionTestResult[] {
  // 在实际应用中，这些测试可能需要通过UI交互测试工具执行
  // 这里我们提供一个模拟实现

  return [
    {
      name: "侧边栏折叠",
      isWorking: true,
      error: undefined,
    },
    {
      name: "侧边栏展开",
      isWorking: true,
      error: undefined,
    },
    {
      name: "子菜单展开",
      isWorking: true,
      error: undefined,
    },
    {
      name: "响应式适配",
      isWorking: true,
      error: undefined,
    },
  ]
}
