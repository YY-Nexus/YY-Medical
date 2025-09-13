import fs from "fs"
import path from "path"
import { RouteAnalyzer } from "./route-analyzer"

interface FixAction {
  type: "move" | "create" | "delete" | "modify"
  source?: string
  target?: string
  content?: string
  description: string
}

export class RouteFixer {
  private actions: FixAction[] = []

  constructor(private analyzer: RouteAnalyzer) {}

  generateFixes(): FixAction[] {
    this.actions = []
    const { conflicts } = this.analyzer.analyze()

    conflicts.forEach((conflict) => {
      switch (conflict.severity) {
        case "high":
          this.fixHighSeverityConflicts(conflict)
          break
        case "medium":
          this.fixMediumSeverityConflicts(conflict)
          break
        case "low":
          this.fixLowSeverityConflicts(conflict)
          break
      }
    })

    return this.actions
  }

  private fixHighSeverityConflicts(conflict: any) {
    // 处理多个page.tsx文件冲突
    if (conflict.description.includes("Multiple page.tsx files")) {
      const routes = conflict.conflicts

      // 保留第一个，移动其他的
      for (let i = 1; i < routes.length; i++) {
        const route = routes[i]
        const newPath = this.generateAlternativePath(route.fullPath)

        this.actions.push({
          type: "move",
          source: route.fullPath,
          target: newPath,
          description: `Move duplicate page.tsx to avoid conflict: ${route.fullPath} -> ${newPath}`,
        })
      }
    }
  }

  private fixMediumSeverityConflicts(conflict: any) {
    // 处理动态/静态路由冲突
    if (conflict.description.includes("dynamic/static route conflict")) {
      this.actions.push({
        type: "modify",
        source: conflict.conflicts[0].fullPath,
        description: `Review and resolve dynamic/static route conflict: ${conflict.route}`,
      })
    }
  }

  private fixLowSeverityConflicts(conflict: any) {
    // 创建缺失的layout文件
    if (conflict.description.includes("Missing layout.tsx")) {
      const route = conflict.conflicts[0]
      const segments = route.path.split("/").filter(Boolean)
      const parentPath = segments.slice(0, -1).join("/")
      const layoutPath = path.join("app", parentPath, "layout.tsx")

      this.actions.push({
        type: "create",
        target: layoutPath,
        content: this.generateLayoutContent(parentPath),
        description: `Create missing layout.tsx for: ${route.path}`,
      })
    }
  }

  private generateAlternativePath(originalPath: string): string {
    const dir = path.dirname(originalPath)
    const ext = path.extname(originalPath)
    const base = path.basename(originalPath, ext)

    // 尝试不同的命名策略
    const alternatives = [`${base}-alt${ext}`, `${base}-backup${ext}`, `${base}-v2${ext}`]

    for (const alt of alternatives) {
      const newPath = path.join(dir, alt)
      if (!fs.existsSync(newPath)) {
        return newPath
      }
    }

    // 如果都存在，使用时间戳
    return path.join(dir, `${base}-${Date.now()}${ext}`)
  }

  private generateLayoutContent(routePath: string): string {
    const componentName = this.pathToComponentName(routePath)

    return `import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "${this.pathToTitle(routePath)} | 言语云³",
  description: "${this.pathToDescription(routePath)}",
}

export default function ${componentName}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {children}
      </div>
    </div>
  )
}
`
  }

  private pathToComponentName(path: string): string {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join("")
  }

  private pathToTitle(path: string): string {
    const titleMap: Record<string, string> = {
      patients: "患者管理",
      "ai-diagnosis": "AI诊断",
      "clinical-decision": "临床决策",
      analytics: "数据分析",
      research: "科研管理",
      "medical-records": "医疗记录",
      "health-data": "健康数据",
      "ai-model": "AI模型",
      security: "安全管理",
      teleconsultation: "远程医疗",
      "ehr-integration": "EHR集成",
      admin: "管理平台",
      medications: "药物管理",
      "mobile-app": "移动应用",
      certifications: "认证管理",
    }

    const segments = path.split("/").filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    return titleMap[lastSegment] || lastSegment
  }

  private pathToDescription(path: string): string {
    const descMap: Record<string, string> = {
      patients: "患者信息管理和病历系统",
      "ai-diagnosis": "AI智能诊断和辅助决策",
      "clinical-decision": "临床决策支持系统",
      analytics: "医疗数据分析和统计",
      research: "医学研究和临床试验管理",
      "medical-records": "电子病历和医疗记录管理",
      "health-data": "健康数据监测和分析",
      "ai-model": "AI模型训练和部署",
      security: "系统安全和权限管理",
      teleconsultation: "远程医疗和在线咨询",
      "ehr-integration": "电子健康记录系统集成",
      admin: "系统管理和配置",
      medications: "药物信息和处方管理",
      "mobile-app": "移动端应用管理",
      certifications: "医师认证和资质管理",
    }

    const segments = path.split("/").filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    return descMap[lastSegment] || `${lastSegment}模块管理`
  }

  async applyFixes(): Promise<void> {
    const actions = this.generateFixes()

    console.log(`Applying ${actions.length} fixes...`)

    for (const action of actions) {
      try {
        await this.applyAction(action)
        console.log(`✅ ${action.description}`)
      } catch (error) {
        console.error(`❌ Failed to apply fix: ${action.description}`, error)
      }
    }

    console.log("All fixes applied!")
  }

  private async applyAction(action: FixAction): Promise<void> {
    switch (action.type) {
      case "move":
        if (action.source && action.target) {
          await this.moveFile(action.source, action.target)
        }
        break
      case "create":
        if (action.target && action.content) {
          await this.createFile(action.target, action.content)
        }
        break
      case "delete":
        if (action.source) {
          await this.deleteFile(action.source)
        }
        break
      case "modify":
        // 对于修改操作，只记录需要手动处理的项目
        console.log(`⚠️  Manual review required: ${action.description}`)
        break
    }
  }

  private async moveFile(source: string, target: string): Promise<void> {
    const targetDir = path.dirname(target)

    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // 移动文件
    fs.renameSync(source, target)
  }

  private async createFile(filePath: string, content: string): Promise<void> {
    const dir = path.dirname(filePath)

    // 确保目录存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // 创建文件
    fs.writeFileSync(filePath, content, "utf-8")
  }

  private async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
}

// 运行修复
if (require.main === module) {
  const analyzer = new RouteAnalyzer()
  const fixer = new RouteFixer(analyzer)

  console.log("Analyzing routes...")
  const report = analyzer.generateReport()
  console.log(report)

  console.log("\nGenerating fixes...")
  const actions = fixer.generateFixes()

  console.log(`\nFound ${actions.length} potential fixes:`)
  actions.forEach((action, index) => {
    console.log(`${index + 1}. ${action.description}`)
  })

  // 询问是否应用修复
  console.log("\nWould you like to apply these fixes? (This will modify your files)")
  console.log("Run with --apply flag to automatically apply fixes")

  if (process.argv.includes("--apply")) {
    fixer.applyFixes()
  }
}
