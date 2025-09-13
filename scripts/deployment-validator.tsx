import fs from "fs"
import path from "path"
import { MissingModulesAnalyzer } from "./missing-modules-analyzer"
import { SkeletonGenerator } from "./skeleton-generator"
import { ImportOptimizer } from "./import-optimizer"

interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
  fixes: string[]
}

export class DeploymentValidator {
  private projectRoot: string

  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot
  }

  async validate(): Promise<ValidationResult> {
    const result: ValidationResult = {
      passed: true,
      errors: [],
      warnings: [],
      fixes: [],
    }

    console.log("🔍 开始部署验证...")

    // 1. 检查缺失模块
    await this.checkMissingModules(result)

    // 2. 检查TypeScript配置
    await this.checkTypeScriptConfig(result)

    // 3. 检查Next.js配置
    await this.checkNextJsConfig(result)

    // 4. 检查关键文件
    await this.checkCriticalFiles(result)

    // 5. 检查路由冲突
    await this.checkRouteConflicts(result)

    result.passed = result.errors.length === 0

    return result
  }

  private async checkMissingModules(result: ValidationResult): Promise<void> {
    console.log("📦 检查缺失模块...")

    const analyzer = new MissingModulesAnalyzer()
    const { missingModules, criticalMissing } = await analyzer.analyze()

    if (criticalMissing > 0) {
      result.errors.push(`发现 ${criticalMissing} 个关键缺失模块`)
      result.fixes.push("运行 npm run generate-skeletons 生成骨架文件")
    }

    if (missingModules.length > criticalMissing) {
      result.warnings.push(`发现 ${missingModules.length - criticalMissing} 个非关键缺失模块`)
    }
  }

  private async checkTypeScriptConfig(result: ValidationResult): Promise<void> {
    console.log("📝 检查TypeScript配置...")

    const tsconfigPath = path.join(this.projectRoot, "tsconfig.json")
    if (!fs.existsSync(tsconfigPath)) {
      result.errors.push("缺少 tsconfig.json 文件")
      return
    }

    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"))

      // 检查关键配置
      if (!tsconfig.compilerOptions) {
        result.errors.push("tsconfig.json 缺少 compilerOptions")
      }

      if (!tsconfig.compilerOptions?.baseUrl) {
        result.warnings.push("建议设置 baseUrl 以支持绝对路径导入")
      }

      if (!tsconfig.compilerOptions?.paths) {
        result.warnings.push("建议设置 paths 别名以简化导入")
      }
    } catch (error) {
      result.errors.push("tsconfig.json 格式错误")
    }
  }

  private async checkNextJsConfig(result: ValidationResult): Promise<void> {
    console.log("⚡ 检查Next.js配置...")

    const nextConfigPath = path.join(this.projectRoot, "next.config.mjs")
    if (!fs.existsSync(nextConfigPath)) {
      result.warnings.push("缺少 next.config.mjs 文件")
      return
    }

    // 检查package.json中的Next.js版本
    const packageJsonPath = path.join(this.projectRoot, "package.json")
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
        const nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next

        if (!nextVersion) {
          result.errors.push("package.json 中未找到 Next.js 依赖")
        } else if (!nextVersion.includes("14") && !nextVersion.includes("15")) {
          result.warnings.push("建议使用 Next.js 14+ 版本以获得最佳性能")
        }
      } catch (error) {
        result.errors.push("package.json 格式错误")
      }
    }
  }

  private async checkCriticalFiles(result: ValidationResult): Promise<void> {
    console.log("📄 检查关键文件...")

    const criticalFiles = ["app/layout.tsx", "app/page.tsx", "package.json", "tailwind.config.ts"]

    for (const file of criticalFiles) {
      const filePath = path.join(this.projectRoot, file)
      if (!fs.existsSync(filePath)) {
        result.errors.push(`缺少关键文件: ${file}`)
      }
    }

    // 检查组件库文件
    const uiComponentsPath = path.join(this.projectRoot, "components/ui")
    if (!fs.existsSync(uiComponentsPath)) {
      result.warnings.push("缺少 components/ui 目录，可能影响UI组件")
    }
  }

  private async checkRouteConflicts(result: ValidationResult): Promise<void> {
    console.log("🛣️ 检查路由冲突...")

    // 检查是否存在重复的page.tsx文件
    const pageFiles: string[] = []
    const checkDirectory = (dir: string, basePath = "") => {
      if (!fs.existsSync(dir)) return

      const items = fs.readdirSync(dir)
      for (const item of items) {
        const itemPath = path.join(dir, item)
        const stat = fs.statSync(itemPath)

        if (stat.isDirectory() && !item.startsWith(".")) {
          checkDirectory(itemPath, path.join(basePath, item))
        } else if (item === "page.tsx") {
          pageFiles.push(basePath || "/")
        }
      }
    }

    checkDirectory(path.join(this.projectRoot, "app"))

    // 检查路由冲突
    const routeMap = new Map<string, number>()
    pageFiles.forEach((route) => {
      const normalizedRoute = route.replace(/$$[^)]+$$/g, "") // 移除路由组
      routeMap.set(normalizedRoute, (routeMap.get(normalizedRoute) || 0) + 1)
    })

    routeMap.forEach((count, route) => {
      if (count > 1) {
        result.errors.push(`路由冲突: ${route} 有 ${count} 个page.tsx文件`)
      }
    })
  }

  async autoFix(): Promise<void> {
    console.log("🔧 开始自动修复...")

    // 1. 生成缺失模块的骨架文件
    const skeletonGenerator = new SkeletonGenerator()
    await skeletonGenerator.generateSkeletons()

    // 2. 优化导入语句
    const importOptimizer = new ImportOptimizer()
    await importOptimizer.optimize()

    // 3. 创建缺失的关键文件
    await this.createMissingCriticalFiles()

    console.log("✅ 自动修复完成！")
  }

  private async createMissingCriticalFiles(): Promise<void> {
    // 创建缺失的layout.tsx
    const layoutPath = path.join(this.projectRoot, "app/layout.tsx")
    if (!fs.existsSync(layoutPath)) {
      const layoutContent = `import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "言语云³医疗AI系统",
  description: "智能医疗诊断平台",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`
      fs.writeFileSync(layoutPath, layoutContent, "utf-8")
      console.log("✅ 创建 app/layout.tsx")
    }

    // 创建缺失的page.tsx
    const pagePath = path.join(this.projectRoot, "app/page.tsx")
    if (!fs.existsSync(pagePath)) {
      const pageContent = `export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">言语云³医疗AI系统</h1>
        <p className="text-xl text-muted-foreground">智能医疗诊断平台</p>
      </div>
    </div>
  )
}
`
      fs.writeFileSync(pagePath, pageContent, "utf-8")
      console.log("✅ 创建 app/page.tsx")
    }
  }

  generateReport(result: ValidationResult): string {
    let report = "# 部署验证报告\n\n"

    if (result.passed) {
      report += "✅ **验证通过！项目可以安全部署。**\n\n"
    } else {
      report += "❌ **验证失败！需要修复以下问题才能部署。**\n\n"
    }

    if (result.errors.length > 0) {
      report += "## 🚨 错误 (必须修复)\n\n"
      result.errors.forEach((error, index) => {
        report += `${index + 1}. ${error}\n`
      })
      report += "\n"
    }

    if (result.warnings.length > 0) {
      report += "## ⚠️ 警告 (建议修复)\n\n"
      result.warnings.forEach((warning, index) => {
        report += `${index + 1}. ${warning}\n`
      })
      report += "\n"
    }

    if (result.fixes.length > 0) {
      report += "## 🔧 建议修复方案\n\n"
      result.fixes.forEach((fix, index) => {
        report += `${index + 1}. ${fix}\n`
      })
      report += "\n"
    }

    report += "## 📋 检查清单\n\n"
    report += "- [x] 缺失模块检查\n"
    report += "- [x] TypeScript配置检查\n"
    report += "- [x] Next.js配置检查\n"
    report += "- [x] 关键文件检查\n"
    report += "- [x] 路由冲突检查\n\n"

    report += "## 🚀 部署建议\n\n"
    report += "1. 运行 `npm run build` 确保构建成功\n"
    report += "2. 运行 `npm run type-check` 检查类型错误\n"
    report += "3. 运行 `npm run lint` 检查代码质量\n"
    report += "4. 在预发布环境测试所有功能\n"

    return report
  }
}
