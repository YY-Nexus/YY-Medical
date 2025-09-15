import fs from "fs"
import path from "path"
import { MissingModulesAnalyzer } from "./missing-modules-analyzer"

interface SkeletonTemplate {
  type: string
  template: (name: string, importPath: string) => string
}

export class SkeletonGenerator {
  private templates: Map<string, SkeletonTemplate> = new Map()

  constructor() {
    this.initializeTemplates()
  }

  private initializeTemplates(): void {
    // React组件模板
    this.templates.set("component", {
      type: "component",
      template: (name: string, importPath: string) => `"use client"

import type React from "react"

interface ${name}Props {
  children?: React.ReactNode
  className?: string
}

export function ${name}({ children, className }: ${name}Props) {
  return (
    <div className={className}>
      {/* TODO: 实现 ${name} 组件 */}
      {children}
    </div>
  )
}

export default ${name}
`,
    })

    // 页面组件模板
    this.templates.set("page", {
      type: "page",
      template: (name: string, importPath: string) => `import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "${name} | 言语云³",
  description: "${name}页面",
}

export default function ${name}Page() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">${name}</h1>
      <p className="text-muted-foreground">
        TODO: 实现 ${name} 页面内容
      </p>
    </div>
  )
}
`,
    })

    // Hook模板
    this.templates.set("hook", {
      type: "hook",
      template: (name: string, importPath: string) => `import { useState, useEffect } from "react"

export function ${name}() {
  // TODO: 实现 ${name} hook
  const [state, setState] = useState(null)

  useEffect(() => {
    // TODO: 添加副作用逻辑
  }, [])

  return {
    state,
    setState,
  }
}

export default ${name}
`,
    })

    // 工具函数模板
    this.templates.set("utility", {
      type: "utility",
      template: (name: string, importPath: string) => `/**
 * ${name} 工具函数
 * TODO: 实现具体功能
 */

export function ${name}() {
  // TODO: 实现工具函数逻辑
  return null
}

export default ${name}
`,
    })

    // 类型定义模板
    this.templates.set("type", {
      type: "type",
      template: (name: string, importPath: string) => `/**
 * ${name} 类型定义
 * TODO: 定义具体类型
 */

export interface ${name} {
  // TODO: 添加类型属性
  id?: string
}

export type ${name}Props = {
  // TODO: 添加属性类型
}

export default ${name}
`,
    })

    // 服务模块模板
    this.templates.set("service", {
      type: "service",
      template: (name: string, importPath: string) => `/**
 * ${name} 服务
 * TODO: 实现服务逻辑
 */

export class ${name}Service {
  // TODO: 实现服务方法
  
  async getData() {
    // TODO: 实现数据获取逻辑
    return null
  }
}

export const ${name.toLowerCase()}Service = new ${name}Service()

export default ${name}Service
`,
    })
  }

  async generateSkeletons(): Promise<void> {
    const analyzer = new MissingModulesAnalyzer()
    const { missingModules } = await analyzer.analyze()

    console.log(`🏗️ 生成 ${missingModules.length} 个骨架文件...`)

    for (const module of missingModules) {
      try {
        await this.generateSkeleton(module)
        console.log(`✅ 生成: ${module.suggestedPath}`)
      } catch (error) {
        console.error(`❌ 生成失败: ${module.importPath}`, error)
      }
    }

    console.log("🎉 骨架文件生成完成！")
  }

  private async generateSkeleton(module: any): Promise<void> {
    const template = this.templates.get(module.type)
    if (!template) {
      console.warn(`⚠️ 未找到 ${module.type} 类型的模板`)
      return
    }

    // 从导入路径推断组件名称
    const componentName = this.extractComponentName(module.importPath)
    const content = template.template(componentName, module.importPath)

    // 确定文件路径和扩展名
    const filePath = this.determineFilePath(module.suggestedPath, module.type)

    // 确保目录存在
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // 写入文件
    fs.writeFileSync(filePath, content, "utf-8")
  }

  private extractComponentName(importPath: string): string {
    // 从路径中提取组件名称
    const segments = importPath.split("/")
    let name = segments[segments.length - 1]

    // 移除文件扩展名
    name = name.replace(/\.(ts|tsx|js|jsx)$/, "")

    // 转换为PascalCase
    if (name === "index") {
      // 如果是index文件，使用父目录名
      name = segments[segments.length - 2] || "Component"
    }

    return name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  }

  private determineFilePath(suggestedPath: string, type: string): string {
    // 根据类型确定文件扩展名
    const extension = type === "type" ? ".ts" : ".tsx"

    // 如果路径已经有扩展名，直接使用
    if (path.extname(suggestedPath)) {
      return suggestedPath
    }

    return suggestedPath + extension
  }
}
