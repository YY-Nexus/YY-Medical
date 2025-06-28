// 部署错误分析工具
export interface DeploymentError {
  type: "build" | "runtime" | "config" | "dependency"
  message: string
  solution: string
  priority: "high" | "medium" | "low"
}

export const commonErrors: DeploymentError[] = [
  {
    type: "build",
    message: "Module not found",
    solution: "检查导入路径和文件是否存在",
    priority: "high",
  },
  {
    type: "build",
    message: "Type error",
    solution: "修复TypeScript类型错误",
    priority: "high",
  },
  {
    type: "dependency",
    message: "npm ERR! peer dep missing",
    solution: "安装缺失的peer dependencies",
    priority: "medium",
  },
  {
    type: "config",
    message: "Environment variable not defined",
    solution: "在Vercel中设置环境变量",
    priority: "high",
  },
  {
    type: "runtime",
    message: "Build timeout",
    solution: "优化构建性能或增加超时时间",
    priority: "medium",
  },
]

export function analyzeError(errorMessage: string): DeploymentError | null {
  return commonErrors.find((error) => errorMessage.toLowerCase().includes(error.message.toLowerCase())) || null
}

export function getQuickFix(errorType: string): string[] {
  const fixes: Record<string, string[]> = {
    build: ["运行 npm run build 本地测试", "检查所有导入路径", "修复TypeScript错误"],
    dependency: ["删除 node_modules 和 package-lock.json", "重新运行 npm install", "检查package.json中的依赖版本"],
    config: ["检查 next.config.mjs 配置", "验证环境变量设置", "确认 vercel.json 配置正确"],
    runtime: ["优化代码性能", "减少构建时间", "检查内存使用"],
  }

  return fixes[errorType] || ["联系技术支持获取帮助"]
}
