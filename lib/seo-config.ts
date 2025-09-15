import type { Metadata } from "next"

export const siteConfig = {
  name: "YYC³-Med",
  title: "YYC³-Med | AI-Powered Intelligent Medical System",
  description:
    "AI-powered intelligent medical system providing diagnostic assistance, case analysis, and knowledge graph capabilities",
  url: "https://yyc-med.vercel.app",
  ogImage: "https://yyc-med.vercel.app/logo-512.png",
  links: {
    twitter: "https://twitter.com/yyc_med",
    github: "https://github.com/yyc-med",
  },
  keywords: [
    "Medical AI",
    "Smart Diagnosis",
    "Case Analysis",
    "Knowledge Graph",
    "Medical System",
    "Artificial Intelligence",
  ],
  authors: [
    {
      name: "YYC³-Med",
      url: "https://yyc-med.vercel.app",
    },
  ],
  creator: "YYC³-Med",
  themeColor: "#2563eb",
  manifest: "/manifest.json",
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    themeColor: siteConfig.themeColor,
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yyc_med",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: siteConfig.manifest,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

// 结构化数据
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YYC³-Med",
  description:
    "AI-powered intelligent medical system providing diagnostic assistance, case analysis, and knowledge graph capabilities",
  url: "https://yyc-med.vercel.app",
  logo: "https://yyc-med.vercel.app/logo-512.png",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "YYC³-Med",
  },
}
