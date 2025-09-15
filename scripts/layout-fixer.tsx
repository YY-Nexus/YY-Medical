import fs from "fs"
import path from "path"
import { glob } from "glob"

interface LayoutIssue {
  file: string
  issue: string
  severity: "error" | "warning"
  line?: number
  suggestion: string
}

export class LayoutFixer {
  private projectRoot: string
  private issues: LayoutIssue[] = []

  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot
  }

  async fixLayout(): Promise<{
    issues: LayoutIssue[]
    fixed: number
    total: number
  }> {
    console.log("🔧 开始修复布局问题...")

    this.issues = []

    // 1. 检查双页眉问题
    await this.checkDuplicateHeaders()

    // 2. 检查双页脚问题
    await this.checkDuplicateFooters()

    // 3. 检查布局结构
    await this.checkLayoutStructure()

    // 4. 修复发现的问题
    const fixed = await this.autoFixIssues()

    return {
      issues: this.issues,
      fixed,
      total: this.issues.length,
    }
  }

  private async checkDuplicateHeaders(): Promise<void> {
    console.log("🔍 检查双页眉问题...")

    const files = await glob("app/**/*.{ts,tsx}", {
      cwd: this.projectRoot,
    })

    for (const file of files) {
      const content = fs.readFileSync(path.join(this.projectRoot, file), "utf-8")
      const lines = content.split("\n")

      let headerCount = 0
      const headerPatterns = [/<header/gi, /<Header/gi, /className.*header/gi, /AppHeader/gi, /MainHeader/gi]

      lines.forEach((line, index) => {
        headerPatterns.forEach((pattern) => {
          if (pattern.test(line)) {
            headerCount++
            if (headerCount > 1) {
              this.issues.push({
                file,
                issue: "检测到重复的页眉组件",
                severity: "error",
                line: index + 1,
                suggestion: "移除重复的页眉组件，保持单一页眉结构",
              })
            }
          }
        })
      })
    }
  }

  private async checkDuplicateFooters(): Promise<void> {
    console.log("🔍 检查双页脚问题...")

    const files = await glob("app/**/*.{ts,tsx}", {
      cwd: this.projectRoot,
    })

    for (const file of files) {
      const content = fs.readFileSync(path.join(this.projectRoot, file), "utf-8")
      const lines = content.split("\n")

      let footerCount = 0
      const footerPatterns = [/<footer/gi, /<Footer/gi, /className.*footer/gi, /AppFooter/gi, /MainFooter/gi]

      lines.forEach((line, index) => {
        footerPatterns.forEach((pattern) => {
          if (pattern.test(line)) {
            footerCount++
            if (footerCount > 1) {
              this.issues.push({
                file,
                issue: "检测到重复的页脚组件",
                severity: "error",
                line: index + 1,
                suggestion: "移除重复的页脚组件，保持单一页脚结构",
              })
            }
          }
        })
      })
    }
  }

  private async checkLayoutStructure(): Promise<void> {
    console.log("🔍 检查布局结构...")

    // 检查app/layout.tsx
    const layoutPath = path.join(this.projectRoot, "app/layout.tsx")
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, "utf-8")

      // 检查是否有重复的布局组件
      if (content.includes("<html") && content.includes("<body")) {
        const htmlCount = (content.match(/<html/g) || []).length
        const bodyCount = (content.match(/<body/g) || []).length

        if (htmlCount > 1) {
          this.issues.push({
            file: "app/layout.tsx",
            issue: "检测到重复的<html>标签",
            severity: "error",
            suggestion: "移除重复的<html>标签",
          })
        }

        if (bodyCount > 1) {
          this.issues.push({
            file: "app/layout.tsx",
            issue: "检测到重复的<body>标签",
            severity: "error",
            suggestion: "移除重复的<body>标签",
          })
        }
      }
    }

    // 检查app/page.tsx
    const pagePath = path.join(this.projectRoot, "app/page.tsx")
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, "utf-8")

      // 检查是否在页面组件中包含了布局元素
      if (content.includes("<html") || content.includes("<body")) {
        this.issues.push({
          file: "app/page.tsx",
          issue: "页面组件中不应包含<html>或<body>标签",
          severity: "error",
          suggestion: "将<html>和<body>标签移动到app/layout.tsx中",
        })
      }
    }
  }

  private async autoFixIssues(): Promise<number> {
    console.log("🔧 自动修复布局问题...")

    let fixedCount = 0

    for (const issue of this.issues) {
      try {
        if (await this.fixIssue(issue)) {
          fixedCount++
          console.log(`✅ 修复: ${issue.file} - ${issue.issue}`)
        }
      } catch (error) {
        console.log(`❌ 修复失败: ${issue.file} - ${issue.issue}`)
      }
    }

    return fixedCount
  }

  private async fixIssue(issue: LayoutIssue): Promise<boolean> {
    const filePath = path.join(this.projectRoot, issue.file)
    if (!fs.existsSync(filePath)) {
      return false
    }

    let content = fs.readFileSync(filePath, "utf-8")
    let modified = false

    // 根据问题类型进行修复
    if (issue.issue.includes("重复的页眉")) {
      // 移除重复的页眉组件
      content = this.removeDuplicateComponents(content, ["header", "Header", "AppHeader"])
      modified = true
    } else if (issue.issue.includes("重复的页脚")) {
      // 移除重复的页脚组件
      content = this.removeDuplicateComponents(content, ["footer", "Footer", "AppFooter"])
      modified = true
    } else if (issue.issue.includes("重复的<html>")) {
      // 移除重复的html标签
      const htmlMatches = content.match(/<html[^>]*>/g)
      if (htmlMatches && htmlMatches.length > 1) {
        // 保留第一个，移除其他的
        for (let i = 1; i < htmlMatches.length; i++) {
          content = content.replace(htmlMatches[i], "")
        }
        modified = true
      }
    } else if (issue.issue.includes("重复的<body>")) {
      // 移除重复的body标签
      const bodyMatches = content.match(/<body[^>]*>/g)
      if (bodyMatches && bodyMatches.length > 1) {
        // 保留第一个，移除其他的
        for (let i = 1; i < bodyMatches.length; i++) {
          content = content.replace(bodyMatches[i], "")
        }
        modified = true
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf-8")
      return true
    }

    return false
  }

  private removeDuplicateComponents(content: string, componentNames: string[]): string {
    let result = content

    for (const componentName of componentNames) {
      // 匹配组件标签
      const regex = new RegExp(`<${componentName}[^>]*>.*?</${componentName}>`, "gs")
      const matches = result.match(regex)

      if (matches && matches.length > 1) {
        // 保留第一个，移除其他的
        for (let i = 1; i < matches.length; i++) {
          result = result.replace(matches[i], "")
        }
      }

      // 匹配自闭合标签
      const selfClosingRegex = new RegExp(`<${componentName}[^>]*/>`, "g")
      const selfClosingMatches = result.match(selfClosingRegex)

      if (selfClosingMatches && selfClosingMatches.length > 1) {
        // 保留第一个，移除其他的
        for (let i = 1; i < selfClosingMatches.length; i++) {
          result = result.replace(selfClosingMatches[i], "")
        }
      }
    }

    return result
  }

  generateReport(): string {
    let report = "# 布局修复报告\n\n"

    if (this.issues.length === 0) {
      report += "✅ 没有发现布局问题！\n"
      return report
    }

    report += `## 📊 问题统计\n\n`
    report += `- 总问题数: ${this.issues.length}\n`
    report += `- 错误: ${this.issues.filter((i) => i.severity === "error").length}\n`
    report += `- 警告: ${this.issues.filter((i) => i.severity === "warning").length}\n\n`

    // 按严重程度分组
    const errors = this.issues.filter((i) => i.severity === "error")
    const warnings = this.issues.filter((i) => i.severity === "warning")

    if (errors.length > 0) {
      report += "## ❌ 错误\n\n"
      errors.forEach((issue) => {
        report += `### ${issue.file}\n`
        report += `- **问题**: ${issue.issue}\n`
        if (issue.line) {
          report += `- **行号**: ${issue.line}\n`
        }
        report += `- **建议**: ${issue.suggestion}\n\n`
      })
    }

    if (warnings.length > 0) {
      report += "## ⚠️ 警告\n\n"
      warnings.forEach((issue) => {
        report += `### ${issue.file}\n`
        report += `- **问题**: ${issue.issue}\n`
        if (issue.line) {
          report += `- **行号**: ${issue.line}\n`
        }
        report += `- **建议**: ${issue.suggestion}\n\n`
      })
    }

    return report
  }
}
