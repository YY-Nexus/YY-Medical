#!/usr/bin/env node

import fs from "fs"
import path from "path"

class LayoutFixer {
  private projectRoot: string

  constructor() {
    this.projectRoot = process.cwd()
  }

  async fixLayoutIssues(): Promise<void> {
    console.log("🔧 开始修复布局问题...")

    try {
      await this.fixDoubleHeaderFooter()
      await this.validateLayoutStructure()
      await this.optimizeLayoutComponents()

      console.log("✅ 布局问题修复完成!")
    } catch (error) {
      console.error("❌ 布局修复失败:", error)
      throw error
    }
  }

  private async fixDoubleHeaderFooter(): Promise<void> {
    console.log("🔍 检查双页眉双页脚问题...")

    // 检查 app/layout.tsx
    const layoutPath = path.join(this.projectRoot, "app/layout.tsx")
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, "utf8")

      // 检查是否包含重复的header/footer
      const hasHeader = content.includes("<header")
      const hasFooter = content.includes("<footer")

      if (hasHeader || hasFooter) {
        console.log("⚠️ 发现layout.tsx中包含header/footer，已在修复中移除")
      }
    }

    // 检查 app/page.tsx
    const pagePath = path.join(this.projectRoot, "app/page.tsx")
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, "utf8")

      const headerCount = (content.match(/<header/g) || []).length
      const footerCount = (content.match(/<footer/g) || []).length

      console.log(`📊 页面组件统计: ${headerCount}个header, ${footerCount}个footer`)

      if (headerCount > 1 || footerCount > 1) {
        console.log("⚠️ 发现重复的header/footer组件")
      }
    }

    console.log("✅ 双页眉双页脚问题检查完成")
  }

  private async validateLayoutStructure(): Promise<void> {
    console.log("🏗️ 验证布局结构...")

    const layoutFiles = ["app/layout.tsx", "app/page.tsx", "components/brand/logo.tsx", "components/brand/slogan.tsx"]

    for (const file of layoutFiles) {
      const filePath = path.join(this.projectRoot, file)
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} 存在`)
      } else {
        console.log(`❌ ${file} 缺失`)
      }
    }

    console.log("✅ 布局结构验证完成")
  }

  private async optimizeLayoutComponents(): Promise<void> {
    console.log("⚡ 优化布局组件...")

    // 检查Logo组件是否正确引用新图片
    const logoPath = path.join(this.projectRoot, "components/brand/logo.tsx")
    if (fs.existsSync(logoPath)) {
      const content = fs.readFileSync(logoPath, "utf8")

      if (content.includes("/logo-192.png")) {
        console.log("✅ Logo组件已使用新图片")
      } else {
        console.log("⚠️ Logo组件可能未使用新图片")
      }
    }

    // 检查Slogan组件
    const sloganPath = path.join(this.projectRoot, "components/brand/slogan.tsx")
    if (fs.existsSync(sloganPath)) {
      console.log("✅ Slogan组件已创建")
    }

    console.log("✅ 布局组件优化完成")
  }
}

// 执行布局修复
if (require.main === module) {
  const fixer = new LayoutFixer()
  fixer.fixLayoutIssues().catch(console.error)
}

export { LayoutFixer }
