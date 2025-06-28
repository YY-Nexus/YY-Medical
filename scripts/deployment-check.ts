import * as fs from "fs"
import * as path from "path"

interface PackageJson {
  name?: string
  version?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

interface TsConfig {
  compilerOptions?: {
    strict?: boolean
    target?: string
    module?: string
  }
}

console.log("🔍 部署前检查开始...\n")

// 检查Node.js版本
console.log("📋 Node.js版本:", process.version)

// 检查环境变量
console.log("\n🌍 环境变量检查:")
const requiredEnvs: string[] = ["NEXT_PUBLIC_APP_VERSION", "JWT_SECRET"]

let hasAllEnvs = true
requiredEnvs.forEach((env) => {
  if (process.env[env]) {
    console.log(`✅ ${env}: ${process.env[env]}`)
  } else {
    console.log(`❌ ${env}: 未设置`)
    hasAllEnvs = false
  }
})

// 检查关键文件
console.log("\n📁 文件结构检查:")
const criticalFiles: string[] = [
  "package.json",
  "next.config.mjs",
  "tailwind.config.ts",
  "tsconfig.json",
  "app/layout.tsx",
  "app/page.tsx",
]

criticalFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}: 存在`)
  } else {
    console.log(`❌ ${file}: 缺失`)
  }
})

// 检查 package.json 依赖
console.log("\n📦 依赖检查:")
try {
  const packageJsonPath = path.join(process.cwd(), "package.json")
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  console.log(`✅ 项目名称: ${packageJson.name || "未设置"}`)
  console.log(`✅ 版本: ${packageJson.version || "未设置"}`)

  // 检查关键依赖
  const criticalDeps: string[] = ["next", "react", "react-dom", "typescript"]
  criticalDeps.forEach((dep) => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      const version = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]
      console.log(`✅ ${dep}: ${version}`)
    } else {
      console.log(`❌ ${dep}: 未安装`)
      hasAllEnvs = false
    }
  })

  // 检查依赖数量
  const depCount = Object.keys(packageJson.dependencies || {}).length
  const devDepCount = Object.keys(packageJson.devDependencies || {}).length
  console.log(`📊 生产依赖: ${depCount} 个`)
  console.log(`📊 开发依赖: ${devDepCount} 个`)
} catch (error) {
  console.log(`❌ 无法读取 package.json: ${(error as Error).message}`)
  hasAllEnvs = false
}

// 检查构建目录
console.log("\n🏗️ 构建检查:")
const buildDir = path.join(process.cwd(), ".next")
if (fs.existsSync(buildDir)) {
  console.log("✅ .next 目录存在")
} else {
  console.log("⚠️ .next 目录不存在，需要先运行 npm run build")
}

// 检查public目录
console.log("\n📂 静态资源检查:")
const publicDir = path.join(process.cwd(), "public")
if (fs.existsSync(publicDir)) {
  console.log("✅ public 目录存在")

  // 检查logo文件
  const logoPath = path.join(publicDir, "images", "yanyu-cloud-logo.png")
  if (fs.existsSync(logoPath)) {
    console.log("✅ Logo文件存在")
  } else {
    console.log("⚠️ Logo文件缺失")
  }
} else {
  console.log("❌ public 目录不存在")
}

// 检查TypeScript配置
console.log("\n🔧 TypeScript配置检查:")
const tsconfigPath = path.join(process.cwd(), "tsconfig.json")
if (fs.existsSync(tsconfigPath)) {
  try {
    const tsconfig: TsConfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"))
    console.log("✅ tsconfig.json 解析成功")
    if (tsconfig.compilerOptions?.strict) {
      console.log("✅ 严格模式已启用")
    }
  } catch (error) {
    console.log(`❌ tsconfig.json 解析失败: ${(error as Error).message}`)
  }
} else {
  console.log("❌ tsconfig.json 不存在")
}

console.log("\n🎯 检查完成!")

if (hasAllEnvs) {
  console.log("✅ 所有检查通过，可以部署")
  process.exit(0)
} else {
  console.log("❌ 存在问题，请修复后再部署")
  process.exit(1)
}
