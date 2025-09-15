#!/usr/bin/env node

import { MissingModulesAnalyzer } from "./missing-modules-analyzer"
import { SkeletonGenerator } from "./skeleton-generator"
import { ImportOptimizer } from "./import-optimizer"
import { DeploymentValidator } from "./deployment-validator"

async function main() {
  console.log("🚀 开始自动修复项目问题...\n")

  try {
    // 1. 分析缺失模块
    console.log("📦 步骤 1: 分析缺失模块")
    const analyzer = new MissingModulesAnalyzer()
    const { missingModules, criticalMissing } = await analyzer.analyze()

    if (missingModules.length > 0) {
      console.log(`发现 ${missingModules.length} 个缺失模块 (${criticalMissing} 个关键)`)

      // 2. 生成骨架文件
      console.log("\n🏗️ 步骤 2: 生成骨架文件")
      const generator = new SkeletonGenerator()
      await generator.generateSkeletons()
    } else {
      console.log("✅ 没有发现缺失模块")
    }

    // 3. 优化导入语句
    console.log("\n🔧 步骤 3: 优化导入语句")
    const optimizer = new ImportOptimizer()
    const { optimizations, totalSavings } = await optimizer.optimize()

    if (optimizations.length > 0) {
      console.log(`优化了 ${optimizations.length} 个文件，节省 ${totalSavings} 行导入`)
    } else {
      console.log("✅ 导入语句已经是最优状态")
    }

    // 4. 验证部署
    console.log("\n🔍 步骤 4: 验证部署状态")
    const validator = new DeploymentValidator()
    const result = await validator.validate()

    if (!result.passed) {
      console.log("⚠️ 发现部署问题，尝试自动修复...")
      await validator.autoFix()

      // 重新验证
      const revalidateResult = await validator.validate()
      if (revalidateResult.passed) {
        console.log("✅ 自动修复成功！")
      } else {
        console.log("❌ 部分问题需要手动修复")
        console.log("错误:", revalidateResult.errors.join(", "))
      }
    } else {
      console.log("✅ 项目可以安全部署")
    }

    // 5. 生成报告
    console.log("\n📊 步骤 5: 生成修复报告")

    const reports = {
      missing: analyzer.generateReport(),
      imports: optimizer.generateReport(),
      deployment: validator.generateReport(result),
    }

    // 保存报告
    const fs = await import("fs")
    fs.writeFileSync(
      "fix-report.md",
      "# 项目自动修复报告\n\n" + reports.missing + "\n\n" + reports.imports + "\n\n" + reports.deployment,
    )

    console.log("📄 修复报告已保存到 fix-report.md")
    console.log("\n🎉 自动修复完成！")
  } catch (error) {
    console.error("❌ 自动修复过程中出现错误:", error)
    process.exit(1)
  }
}

// 运行主函数
if (require.main === module) {
  main()
}
