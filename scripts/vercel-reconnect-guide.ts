// Vercel重新连接指南
export const reconnectionSteps = {
  step1: {
    title: "检查Vercel账户状态",
    actions: ["访问 https://vercel.com/dashboard", "确认您已登录正确的账户", "检查是否有该项目的记录"],
  },
  step2: {
    title: "重新授权v0访问Vercel",
    actions: ["在v0中断开Vercel连接", "重新授权v0访问您的Vercel账户", "确认权限设置正确"],
  },
  step3: {
    title: "手动创建Vercel项目",
    actions: ["下载v0项目代码", "在Vercel中手动创建新项目", "上传代码并配置部署"],
  },
}

export const troubleshootingChecklist = [
  "✅ Vercel账户是否正常登录",
  "✅ v0是否有Vercel访问权限",
  "✅ 项目是否存在于Vercel dashboard",
  "✅ 部署是否在进行中",
  "✅ 是否有构建错误阻止部署",
]
