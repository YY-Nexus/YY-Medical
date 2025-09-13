import type { Metadata } from "next"

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  return {
    title: {
      default: config.title,
      template: "%s | YYC³-Med",
    },
    description: config.description,
    keywords: [...config.keywords, "YYC³", "言语云³", "医疗AI", "智能诊断", "AI-Powered Medical System"],
    openGraph: {
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : ["/logo-512.png"],
      type: "website",
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : ["/logo-512.png"],
    },
    alternates: {
      canonical: config.canonical,
    },
  }
}

export const defaultSEOConfig: SEOConfig = {
  title: "YYC³-Med | AI-Powered Intelligent Medical System",
  description:
    "言启立方于万象，语枢智云守健康 - YYC³医疗AI系统提供智能诊断、患者管理、临床决策支持等全方位医疗信息化解决方案。",
  keywords: [
    "医疗信息化",
    "临床决策支持",
    "远程医疗",
    "患者管理",
    "医学影像AI",
    "电子病历",
    "医疗大数据",
    "Intelligent Healthcare",
    "Medical AI Platform",
  ],
}
