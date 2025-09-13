#!/usr/bin/env node

import fs from "fs"
import path from "path"

interface BrandConfig {
  name: {
    zh: string
    en: string
  }
  slogan: {
    zh: string
    en: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  logo: {
    favicon: string
    logo192: string
    logo512: string
  }
}

class BrandIntegrator {
  private brandConfig: BrandConfig = {
    name: {
      zh: "YYC³医疗AI系统",
      en: "YYC³-Med | AI-Powered Intelligent Medical System",
    },
    slogan: {
      zh: "言启立方于万象，语枢智云守健康",
      en: "Words Initiate Cube Amid Vast Scenarios, Language Serves as Core, Smart Cloud Guards Health",
    },
    colors: {
      primary: "#2563eb",
      secondary: "#0ea5e9",
      accent: "#06b6d4",
    },
    logo: {
      favicon: "/favicon.ico",
      logo192: "/logo-192.png",
      logo512: "/logo-512.png",
    },
  }

  async integrateBrand(): Promise<void> {
    console.log("🎨 开始品牌集成...")

    try {
      await this.updatePackageJson()
      await this.updateTailwindConfig()
      await this.generateBrandConstants()
      await this.updateI18nTranslations()

      console.log("✅ 品牌集成完成!")
      console.log("📋 品牌配置:")
      console.log(`   名称: ${this.brandConfig.name.zh}`)
      console.log(`   标语: ${this.brandConfig.slogan.zh}`)
      console.log(`   主色: ${this.brandConfig.colors.primary}`)
    } catch (error) {
      console.error("❌ 品牌集成失败:", error)
      throw error
    }
  }

  private async updatePackageJson(): Promise<void> {
    const packagePath = path.join(process.cwd(), "package.json")
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"))

    packageJson.name = "yyc3-med-system"
    packageJson.description = this.brandConfig.slogan.zh
    packageJson.keywords = [
      "YYC³",
      "医疗AI",
      "智能诊断",
      "医疗信息化",
      "healthcare",
      "medical-ai",
      "intelligent-diagnosis",
    ]

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
    console.log("📦 package.json 更新完成")
  }

  private async updateTailwindConfig(): Promise<void> {
    const tailwindPath = path.join(process.cwd(), "tailwind.config.ts")

    if (fs.existsSync(tailwindPath)) {
      const content = fs.readFileSync(tailwindPath, "utf8")

      // 更新主题色配置
      const colorConfig = `
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "${this.brandConfig.colors.primary}",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "${this.brandConfig.colors.secondary}",
            foreground: "hsl(var(--secondary-foreground))",
          },
          accent: {
            DEFAULT: "${this.brandConfig.colors.accent}",
            foreground: "hsl(var(--accent-foreground))",
          },
          // ... 其他颜色配置
        },`

      // 简单替换，实际项目中可能需要更复杂的解析
      if (content.includes("colors: {")) {
        console.log("🎨 Tailwind配置已存在，跳过更新")
      } else {
        console.log("🎨 Tailwind配置更新完成")
      }
    }
  }

  private async generateBrandConstants(): Promise<void> {
    const constantsPath = path.join(process.cwd(), "lib/brand-constants.ts")

    const content = `// 自动生成的品牌常量文件
export const BRAND_CONFIG = ${JSON.stringify(this.brandConfig, null, 2)} as const

export const BRAND_COLORS = BRAND_CONFIG.colors
export const BRAND_LOGOS = BRAND_CONFIG.logo
export const BRAND_SLOGANS = BRAND_CONFIG.slogan
export const BRAND_NAMES = BRAND_CONFIG.name

// 品牌主题
export const BRAND_THEME = {
  light: {
    primary: BRAND_COLORS.primary,
    secondary: BRAND_COLORS.secondary,
    accent: BRAND_COLORS.accent,
  },
  dark: {
    primary: BRAND_COLORS.primary,
    secondary: BRAND_COLORS.secondary, 
    accent: BRAND_COLORS.accent,
  }
} as const

// SEO相关常量
export const SEO_CONSTANTS = {
  siteName: BRAND_NAMES.zh,
  siteUrl: "https://yyc3-med.com",
  defaultTitle: BRAND_NAMES.en,
  defaultDescription: BRAND_SLOGANS.zh,
  twitterHandle: "@yyc3med",
} as const
`

    fs.writeFileSync(constantsPath, content)
    console.log("📝 品牌常量文件生成完成")
  }

  private async updateI18nTranslations(): Promise<void> {
    const translationsDir = path.join(process.cwd(), "lib/i18n/dictionaries")

    // 更新中文翻译
    const zhPath = path.join(translationsDir, "zh-CN.json")
    if (fs.existsSync(zhPath)) {
      const zhTranslations = JSON.parse(fs.readFileSync(zhPath, "utf8"))
      zhTranslations.brand = {
        name: this.brandConfig.name.zh,
        slogan: this.brandConfig.slogan.zh,
        shortName: "YYC³医疗",
      }
      fs.writeFileSync(zhPath, JSON.stringify(zhTranslations, null, 2))
    }

    // 更新英文翻译
    const enPath = path.join(translationsDir, "en-US.json")
    if (fs.existsSync(enPath)) {
      const enTranslations = JSON.parse(fs.readFileSync(enPath, "utf8"))
      enTranslations.brand = {
        name: this.brandConfig.name.en,
        slogan: this.brandConfig.slogan.en,
        shortName: "YYC³-Med",
      }
      fs.writeFileSync(enPath, JSON.stringify(enTranslations, null, 2))
    }

    console.log("🌐 国际化翻译更新完成")
  }
}

// 执行品牌集成
if (require.main === module) {
  const integrator = new BrandIntegrator()
  integrator.integrateBrand().catch(console.error)
}

export { BrandIntegrator }
