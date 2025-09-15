import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { LoadingProvider } from "@/contexts/loading-context"
import { UserAvatarProvider } from "@/contexts/user-avatar-context"
import { AutoTranslationProvider } from "@/contexts/auto-translation-context"
import { Toaster } from "@/components/ui/toaster"
import { jsonLd } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "YYC³-Med | AI-Powered Intelligent Medical System",
    template: "%s | YYC³-Med",
  },
  description:
    "AI-powered intelligent medical system providing diagnostic assistance, case analysis, and knowledge graph capabilities",
  keywords: [
    "Medical AI",
    "Smart Diagnosis",
    "Case Analysis",
    "Knowledge Graph",
    "Medical System",
    "Artificial Intelligence",
  ],
  authors: [{ name: "YYC³-Med" }],
  creator: "YYC³-Med",
  publisher: "YYC³-Med",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yyc-med.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/zh",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yyc-med.vercel.app",
    title: "YYC³-Med | AI-Powered Intelligent Medical System",
    description:
      "AI-powered intelligent medical system providing diagnostic assistance, case analysis, and knowledge graph capabilities",
    siteName: "YYC³-Med",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "YYC³-Med Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³-Med | AI-Powered Intelligent Medical System",
    description:
      "AI-powered intelligent medical system providing diagnostic assistance, case analysis, and knowledge graph capabilities",
    images: ["/logo-512.png"],
    creator: "@yyc_med",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-192.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo-192.png",
    },
  },
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <LoadingProvider>
              <UserAvatarProvider>
                <AutoTranslationProvider>
                  {children}
                  <Toaster />
                </AutoTranslationProvider>
              </UserAvatarProvider>
            </LoadingProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
