import fs from "fs"
import path from "path"

interface RouteStructure {
  path: string
  type: "layout" | "page" | "loading" | "error"
  children?: RouteStructure[]
  metadata?: {
    title: string
    description: string
  }
}

export class RouteStructureGenerator {
  private structure: RouteStructure[] = []

  generateOptimalStructure(): RouteStructure[] {
    this.structure = [
      {
        path: "/",
        type: "layout",
        metadata: {
          title: "言语云³医疗AI系统",
          description: "智能医疗诊断平台",
        },
        children: [
          {
            path: "/",
            type: "page",
            metadata: {
              title: "首页",
              description: "言语云³医疗AI系统首页",
            },
          },
          {
            path: "/dashboard",
            type: "page",
            metadata: {
              title: "控制台",
              description: "系统控制台和概览",
            },
          },
          // 认证路由组
          {
            path: "/(auth)",
            type: "layout",
            metadata: {
              title: "用户认证",
              description: "用户登录和注册",
            },
            children: [
              {
                path: "/login",
                type: "page",
                metadata: {
                  title: "登录",
                  description: "用户登录页面",
                },
              },
              {
                path: "/register",
                type: "page",
                metadata: {
                  title: "注册",
                  description: "用户注册页面",
                },
              },
              {
                path: "/forgot-password",
                type: "page",
                metadata: {
                  title: "忘记密码",
                  description: "密码重置页面",
                },
              },
              {
                path: "/reset-password",
                type: "page",
                metadata: {
                  title: "重置密码",
                  description: "密码重置确认页面",
                },
              },
            ],
          },
          // 患者管理
          {
            path: "/patients",
            type: "layout",
            metadata: {
              title: "患者管理",
              description: "患者信息管理系统",
            },
            children: [
              {
                path: "/patients",
                type: "page",
                metadata: {
                  title: "患者列表",
                  description: "患者信息列表",
                },
              },
              {
                path: "/patients/[id]",
                type: "page",
                metadata: {
                  title: "患者详情",
                  description: "患者详细信息",
                },
              },
              {
                path: "/patients/records",
                type: "page",
                metadata: {
                  title: "病历记录",
                  description: "患者病历记录管理",
                },
              },
              {
                path: "/patients/followup",
                type: "page",
                metadata: {
                  title: "随访管理",
                  description: "患者随访记录",
                },
              },
              {
                path: "/patients/groups",
                type: "page",
                metadata: {
                  title: "患者分组",
                  description: "患者分组管理",
                },
              },
            ],
          },
          // AI诊断
          {
            path: "/ai-diagnosis",
            type: "layout",
            metadata: {
              title: "AI诊断",
              description: "AI智能诊断系统",
            },
            children: [
              {
                path: "/ai-diagnosis",
                type: "page",
                metadata: {
                  title: "AI诊断",
                  description: "AI智能诊断主页",
                },
              },
              {
                path: "/ai-diagnosis/records",
                type: "page",
                metadata: {
                  title: "诊断记录",
                  description: "AI诊断历史记录",
                },
              },
            ],
          },
          // 临床决策
          {
            path: "/clinical-decision",
            type: "layout",
            metadata: {
              title: "临床决策",
              description: "临床决策支持系统",
            },
            children: [
              {
                path: "/clinical-decision",
                type: "page",
                metadata: {
                  title: "临床决策",
                  description: "临床决策支持主页",
                },
              },
              {
                path: "/clinical-decision/clinical-pathways",
                type: "page",
                metadata: {
                  title: "临床路径",
                  description: "临床路径管理",
                },
              },
              {
                path: "/clinical-decision/diagnostic-tools",
                type: "page",
                metadata: {
                  title: "诊断工具",
                  description: "临床诊断工具",
                },
              },
              {
                path: "/clinical-decision/guidelines",
                type: "page",
                metadata: {
                  title: "临床指南",
                  description: "临床指南和规范",
                },
              },
              {
                path: "/clinical-decision/treatments",
                type: "page",
                metadata: {
                  title: "治疗方案",
                  description: "治疗方案管理",
                },
              },
              {
                path: "/clinical-decision/medications",
                type: "page",
                metadata: {
                  title: "用药指导",
                  description: "临床用药指导",
                },
              },
            ],
          },
          // 管理平台
          {
            path: "/admin",
            type: "layout",
            metadata: {
              title: "管理平台",
              description: "系统管理平台",
            },
            children: [
              {
                path: "/admin",
                type: "page",
                metadata: {
                  title: "管理首页",
                  description: "管理平台概览",
                },
              },
              {
                path: "/admin/users",
                type: "page",
                metadata: {
                  title: "用户管理",
                  description: "系统用户管理",
                },
              },
              {
                path: "/admin/roles",
                type: "page",
                metadata: {
                  title: "角色权限",
                  description: "角色和权限管理",
                },
              },
              {
                path: "/admin/settings",
                type: "page",
                metadata: {
                  title: "系统设置",
                  description: "系统配置和设置",
                },
              },
              {
                path: "/admin/logs",
                type: "page",
                metadata: {
                  title: "系统日志",
                  description: "系统操作日志",
                },
              },
              {
                path: "/admin/backup",
                type: "page",
                metadata: {
                  title: "数据备份",
                  description: "数据备份和恢复",
                },
              },
              {
                path: "/admin/monitoring",
                type: "page",
                metadata: {
                  title: "系统监控",
                  description: "系统性能监控",
                },
              },
            ],
          },
        ],
      },
    ]

    return this.structure
  }

  generateFiles(): void {
    const structure = this.generateOptimalStructure()
    this.createStructureFiles(structure)
  }

  private createStructureFiles(structure: RouteStructure[], basePath = "app"): void {
    structure.forEach((route) => {
      const routePath = this.getRoutePath(route.path, basePath)

      // 创建目录
      if (!fs.existsSync(routePath)) {
        fs.mkdirSync(routePath, { recursive: true })
      }

      // 创建文件
      if (route.type === "layout") {
        this.createLayoutFile(routePath, route)
      } else if (route.type === "page") {
        this.createPageFile(routePath, route)
      }

      // 递归创建子路由
      if (route.children) {
        this.createStructureFiles(route.children, basePath)
      }
    })
  }

  private getRoutePath(routePath: string, basePath: string): string {
    // 处理路由组和动态路由
    const segments = routePath.split("/").filter(Boolean)
    const pathSegments = segments.map((segment) => {
      if (segment.startsWith("(") && segment.endsWith(")")) {
        // 路由组
        return segment
      } else if (segment.startsWith("[") && segment.endsWith("]")) {
        // 动态路由
        return segment
      } else {
        return segment
      }
    })

    return path.join(basePath, ...pathSegments)
  }

  private createLayoutFile(routePath: string, route: RouteStructure): void {
    const layoutPath = path.join(routePath, "layout.tsx")

    if (fs.existsSync(layoutPath)) {
      console.log(`Layout already exists: ${layoutPath}`)
      return
    }

    const componentName = this.pathToComponentName(route.path)
    const content = `import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "${route.metadata?.title || "页面"} | 言语云³",
  description: "${route.metadata?.description || "言语云³医疗AI系统"}",
}

export default function ${componentName}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
`

    fs.writeFileSync(layoutPath, content, "utf-8")
    console.log(`Created layout: ${layoutPath}`)
  }

  private createPageFile(routePath: string, route: RouteStructure): void {
    const pagePath = path.join(routePath, "page.tsx")

    if (fs.existsSync(pagePath)) {
      console.log(`Page already exists: ${pagePath}`)
      return
    }

    const componentName = this.pathToComponentName(route.path)
    const content = `import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "${route.metadata?.title || "页面"} | 言语云³",
  description: "${route.metadata?.description || "言语云³医疗AI系统"}",
}

export default function ${componentName}Page() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">${route.metadata?.title || "页面"}</h1>
      <p className="text-muted-foreground">${route.metadata?.description || "页面内容"}</p>
    </div>
  )
}
`

    fs.writeFileSync(pagePath, content, "utf-8")
    console.log(`Created page: ${pagePath}`)
  }

  private pathToComponentName(path: string): string {
    return (
      path
        .replace(/[()[\]]/g, "") // 移除特殊字符
        .split("/")
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join("") || "Root"
    )
  }

  generateStructureReport(): string {
    const structure = this.generateOptimalStructure()

    let report = "# Optimal Route Structure\n\n"
    report += "This is the recommended route structure for the medical AI system:\n\n"

    report += this.structureToMarkdown(structure)

    report += "\n## Benefits\n\n"
    report += "- ✅ No route conflicts\n"
    report += "- ✅ Proper nesting with layouts\n"
    report += "- ✅ Clear separation of concerns\n"
    report += "- ✅ SEO-friendly metadata\n"
    report += "- ✅ Consistent naming conventions\n"
    report += "- ✅ Route groups for logical organization\n"

    return report
  }

  private structureToMarkdown(structure: RouteStructure[], level = 0): string {
    let markdown = ""

    structure.forEach((route) => {
      const indent = "  ".repeat(level)
      const icon = route.type === "layout" ? "📁" : "📄"

      markdown += `${indent}- ${icon} **${route.path}** (${route.type})`

      if (route.metadata) {
        markdown += ` - ${route.metadata.title}`
      }

      markdown += "\n"

      if (route.children) {
        markdown += this.structureToMarkdown(route.children, level + 1)
      }
    })

    return markdown
  }
}

// 运行生成器
if (require.main === module) {
  const generator = new RouteStructureGenerator()

  console.log("Generating optimal route structure...")
  const report = generator.generateStructureReport()
  console.log(report)

  // 保存报告
  fs.writeFileSync("optimal-route-structure.md", report)
  console.log("\nStructure report saved to optimal-route-structure.md")

  // 询问是否生成文件
  if (process.argv.includes("--generate")) {
    console.log("\nGenerating route files...")
    generator.generateFiles()
    console.log("Route files generated!")
  } else {
    console.log("\nRun with --generate flag to create the route files")
  }
}
