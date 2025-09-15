export const BRAND_CONFIG = {
  name: {
    zh: "言语云³",
    en: "YYC³-Med",
  },
  slogan: {
    zh: "言启立方于万象，语枢智云守健康",
    en: "Words Initiate Cube Amid Vast Scenarios, Language Serves as Core, Smart Cloud Guards Health",
  },
  title: {
    zh: "言语云³医疗AI系统",
    en: "YYC³-Med | AI-Powered Intelligent Medical System",
  },
  description: {
    zh: "基于人工智能的智能医疗系统，提供诊断辅助、病例分析、知识图谱等功能",
    en: "AI-powered intelligent medical system providing diagnostic assistance, case analysis, and knowledge graph capabilities",
  },
  keywords: {
    zh: ["医疗AI", "智能诊断", "病例分析", "知识图谱", "医疗系统", "人工智能"],
    en: [
      "Medical AI",
      "Smart Diagnosis",
      "Case Analysis",
      "Knowledge Graph",
      "Medical System",
      "Artificial Intelligence",
    ],
  },
} as const

export type Language = "zh" | "en"
export type BrandKey = keyof typeof BRAND_CONFIG

export function getBrandText(key: BrandKey, language: Language = "zh") {
  return BRAND_CONFIG[key][language] || BRAND_CONFIG[key].zh
}

export function getBrandKeywords(language: Language = "zh") {
  return BRAND_CONFIG.keywords[language] || BRAND_CONFIG.keywords.zh
}
