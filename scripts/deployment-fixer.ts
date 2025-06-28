// 自动修复常见部署问题
import { execSync } from "child_process"
import fs from "fs"

export class DeploymentFixer {
  // 修复缺失的模块导出
  static fixMissingExports() {
    const missingExports = [
      "components/brand/logo.tsx",
      "components/analytics/prediction-models.tsx",
      "components/analytics/trend-reports.tsx",
      "components/ui/date-picker.tsx",
      "services/mobile-app-enhancement-service.ts",
    ]

    console.log("🔧 检查缺失的导出...")

    missingExports.forEach((filePath) => {
      if (!fs.existsSync(filePath)) {
        console.log(`❌ 缺失文件: ${filePath}`)
      } else {
        console.log(`✅ 文件存在: ${filePath}`)
      }
    })
  }

  // 清理和重建
  static cleanAndRebuild() {
    try {
      console.log("🧹 清理项目...")
      execSync("rm -rf .next node_modules package-lock.json", { stdio: "inherit" })

      console.log("📦 重新安装依赖...")
      execSync("npm install", { stdio: "inherit" })

      console.log("🔨 构建项目...")
      execSync("npm run build", { stdio: "inherit" })

      console.log("✅ 项目重建完成!")
    } catch (error) {
      console.error("❌ 重建失败:", error)
    }
  }

  // 检查TypeScript错误
  static checkTypeScript() {
    try {
      console.log("🔍 检查TypeScript错误...")
      execSync("npx tsc --noEmit", { stdio: "inherit" })
      console.log("✅ TypeScript检查通过!")
    } catch (error) {
      console.error("❌ TypeScript错误:", error)
    }
  }

  // 验证环境变量
  static checkEnvironmentVariables() {
    const requiredEnvVars = ["NEXT_PUBLIC_API_BASE_URL", "JWT_SECRET", "NEXT_PUBLIC_APP_URL"]

    console.log("🔍 检查环境变量...")

    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        console.log(`⚠️  缺失环境变量: ${envVar}`)
      } else {
        console.log(`✅ 环境变量存在: ${envVar}`)
      }
    })
  }
}

// 运行所有检查
if (require.main === module) {
  console.log("🚀 开始部署前检查...\n")

  DeploymentFixer.fixMissingExports()
  console.log("\n")

  DeploymentFixer.checkEnvironmentVariables()
  console.log("\n")

  DeploymentFixer.checkTypeScript()
  console.log("\n")

  console.log("📋 检查完成! 如果发现问题，请根据提示进行修复。")
}
