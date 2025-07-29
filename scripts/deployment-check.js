#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

console.log("🔍 部署前检查开始...\n")

console.log("📋 Node.js版本:", process.version)

console.log("🌍 环境变量检查:")
const requiredEnvs = ["NEXT_PUBLIC_APP_VERSION"]
let hasAllEnvs = true

requiredEnvs.forEach((env) => {
  if (process.env[env]) {
    console.log(`✅ ${env}: ${process.env[env]}`)
  } else {
    console.log(`❌ ${env}: 未设置`)
    hasAllEnvs = false
  }
})

console.log("\n📁 文件结构检查:")
const criticalFiles = ["package.json", "next.config.mjs", "vercel.json"]
criticalFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}: 存在`)
  } else {
    console.log(`❌ ${file}: 缺失`)
  }
})

console.log("\n📦 依赖检查:")
try {
  const packageJsonPath = path.join(process.cwd(), "package.json")
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
  console.log(`✅ 项目名称: ${packageJson.name || "未设置"}`)
  console.log(`✅ 版本: ${packageJson.version || "未设置"}`)

  const criticalDeps = ["next", "react", "react-dom"]
  criticalDeps.forEach((dep) => {
    if (packageJson.dependencies?.[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`)
    } else {
      console.log(`❌ ${dep}: 未安装`)
      hasAllEnvs = false
    }
  })
} catch (error) {
  console.log(`❌ 无法读取 package.json: ${error.message}`)
  hasAllEnvs = false
}

console.log("\n🏗️ 构建检查:")
const buildDir = path.join(process.cwd(), ".next")
if (fs.existsSync(buildDir)) {
  console.log("✅ .next 目录存在")
} else {
  console.log("⚠️ .next 目录不存在，需要先运行 npm run build")
}

console.log("\n🎯 检查完成!")
if (hasAllEnvs) {
  console.log("✅ 所有检查通过，可以部署")
  process.exit(0)
} else {
  console.log("❌ 存在问题，请修复后再部署")
  process.exit(1)
}
