// 自动生成的品牌常量文件
export const BRAND_CONFIG = {
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
} as const

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
  },
} as const

// SEO相关常量
export const SEO_CONSTANTS = {
  siteName: BRAND_NAMES.zh,
  siteUrl: "https://yyc3-med.com",
  defaultTitle: BRAND_NAMES.en,
  defaultDescription: BRAND_SLOGANS.zh,
  twitterHandle: "@yyc3med",
} as const
