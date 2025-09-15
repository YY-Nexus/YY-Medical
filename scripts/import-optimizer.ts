import fs from "fs"
import path from "path"
import { glob } from "glob"

interface ImportOptimization {
  file: string
  originalImports: string[]
  optimizedImports: string[]
  savings: number
}

export class ImportOptimizer {
  private projectRoot: string
  private optimizations: ImportOptimization[] = []

  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot
  }

  async optimize(): Promise<{
    optimizations: ImportOptimization[]
    totalFiles: number
    totalSavings: number
  }> {
    console.log("🔧 优化导入语句...")

    const files = await glob("**/*.{ts,tsx}", {
      cwd: this.projectRoot,
      ignore: ["node_modules/**", ".next/**", "dist/**", "build/**"],
    })

    for (const file of files) {
      await this.optimizeFile(file)
    }

    const totalSavings = this.optimizations.reduce((sum, opt) => sum + opt.savings, 0)

    return {
      optimizations: this.optimizations,
      totalFiles: files.length,
      totalSavings,
    }
  }

  private async optimizeFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.projectRoot, filePath)
    const content = fs.readFileSync(fullPath, "utf-8")
    const lines = content.split("\n")

    const originalImports: string[] = []
    const optimizedImports: string[] = []
    const nonImportLines: string[] = []

    let inImportSection = true

    for (const line of lines) {
      if (this.isImportLine(line)) {
        originalImports.push(line)
      } else if (line.trim() === "" && inImportSection) {
        // 空行，继续在导入部分
        continue
      } else {
        inImportSection = false
        nonImportLines.push(line)
      }
    }

    if (originalImports.length === 0) return

    // 优化导入语句
    const optimized = this.optimizeImports(originalImports)

    if (
      optimized.length !== originalImports.length ||
      !optimized.every((line, index) => line === originalImports[index])
    ) {
      this.optimizations.push({
        file: filePath,
        originalImports,
        optimizedImports: optimized,
        savings: originalImports.length - optimized.length,
      })

      // 写入优化后的文件
      const newContent = [...optimized, "", ...nonImportLines].join("\n")
      fs.writeFileSync(fullPath, newContent, "utf-8")
    }
  }

  private isImportLine(line: string): boolean {
    return line.trim().startsWith("import ") && !line.trim().startsWith("// import")
  }

  private optimizeImports(imports: string[]): string[] {
    // 1. 移除重复导入
    const uniqueImports = [...new Set(imports)]

    // 2. 按类型分组
    const groups = {
      react: [] as string[],
      nextjs: [] as string[],
      external: [] as string[],
      internal: [] as string[],
      relative: [] as string[],
    }

    uniqueImports.forEach((imp) => {
      if (imp.includes('from "react"') || imp.includes("from 'react'")) {
        groups.react.push(imp)
      } else if (imp.includes('from "next/') || imp.includes("from 'next/")) {
        groups.nextjs.push(imp)
      } else if (imp.includes('from "@/') || imp.includes("from '@/")) {
        groups.internal.push(imp)
      } else if (
        imp.includes('from "./') ||
        imp.includes("from '../") ||
        imp.includes("from './") ||
        imp.includes("from '../")
      ) {
        groups.relative.push(imp)
      } else {
        groups.external.push(imp)
      }
    })

    // 3. 合并同源导入
    const mergedGroups = {
      react: this.mergeImportsFromSameSource(groups.react),
      nextjs: this.mergeImportsFromSameSource(groups.nextjs),
      external: this.mergeImportsFromSameSource(groups.external),
      internal: this.mergeImportsFromSameSource(groups.internal),
      relative: this.mergeImportsFromSameSource(groups.relative),
    }

    // 4. 排序并组合
    const result: string[] = []

    if (mergedGroups.react.length > 0) {
      result.push(...mergedGroups.react.sort())
      result.push("")
    }

    if (mergedGroups.nextjs.length > 0) {
      result.push(...mergedGroups.nextjs.sort())
      result.push("")
    }

    if (mergedGroups.external.length > 0) {
      result.push(...mergedGroups.external.sort())
      result.push("")
    }

    if (mergedGroups.internal.length > 0) {
      result.push(...mergedGroups.internal.sort())
      result.push("")
    }

    if (mergedGroups.relative.length > 0) {
      result.push(...mergedGroups.relative.sort())
    }

    // 移除末尾的空行
    while (result.length > 0 && result[result.length - 1] === "") {
      result.pop()
    }

    return result
  }

  private mergeImportsFromSameSource(imports: string[]): string[] {
    const sourceMap = new Map<string, Set<string>>()
    const defaultImports = new Map<string, string>()
    const sideEffectImports: string[] = []

    imports.forEach((imp) => {
      const match = imp.match(/import\s+(.+?)\s+from\s+["']([^"']+)["']/)
      if (!match) {
        // 副作用导入
        sideEffectImports.push(imp)
        return
      }

      const [, importClause, source] = match

      if (importClause.includes("{")) {
        // 命名导入
        const namedMatch = importClause.match(/\{([^}]+)\}/)
        if (namedMatch) {
          if (!sourceMap.has(source)) {
            sourceMap.set(source, new Set())
          }
          const names = namedMatch[1].split(",").map((name) => name.trim())
          names.forEach((name) => sourceMap.get(source)!.add(name))
        }
      } else {
        // 默认导入
        defaultImports.set(source, importClause.trim())
      }
    })

    const result: string[] = []

    // 合并导入
    sourceMap.forEach((names, source) => {
      const defaultImport = defaultImports.get(source)
      const namedImports = Array.from(names).sort().join(", ")

      if (defaultImport && namedImports) {
        result.push(`import ${defaultImport}, { ${namedImports} } from "${source}"`)
      } else if (defaultImport) {
        result.push(`import ${defaultImport} from "${source}"`)
      } else if (namedImports) {
        result.push(`import { ${namedImports} } from "${source}"`)
      }
    })

    // 添加只有默认导入的
    defaultImports.forEach((defaultImport, source) => {
      if (!sourceMap.has(source)) {
        result.push(`import ${defaultImport} from "${source}"`)
      }
    })

    // 添加副作用导入
    result.push(...sideEffectImports)

    return result
  }

  generateReport(): string {
    const { optimizations, totalFiles, totalSavings } = this.optimize() as any

    let report = "# 导入优化报告\n\n"
    report += `## 📊 统计信息\n\n`
    report += `- 📁 分析文件数: ${totalFiles}\n`
    report += `- 🔧 优化文件数: ${optimizations.length}\n`
    report += `- 💾 节省导入行数: ${totalSavings}\n\n`

    if (optimizations.length === 0) {
      report += "✅ 所有导入语句已经是最优状态！\n"
      return report
    }

    report += "## 🔧 优化详情\n\n"

    optimizations.forEach((opt: ImportOptimization) => {
      report += `### ${opt.file}\n`
      report += `- 原始导入数: ${opt.originalImports.length}\n`
      report += `- 优化后导入数: ${opt.optimizedImports.length}\n`
      report += `- 节省行数: ${opt.savings}\n\n`

      if (opt.savings > 0) {
        report += "**优化前:**\n```typescript\n"
        report += opt.originalImports.slice(0, 5).join("\n")
        if (opt.originalImports.length > 5) {
          report += `\n... 还有 ${opt.originalImports.length - 5} 行\n`
        }
        report += "\n```\n\n"

        report += "**优化后:**\n```typescript\n"
        report += opt.optimizedImports.slice(0, 5).join("\n")
        if (opt.optimizedImports.length > 5) {
          report += `\n... 还有 ${opt.optimizedImports.length - 5} 行\n`
        }
        report += "\n```\n\n"
      }
    })

    return report
  }
}
