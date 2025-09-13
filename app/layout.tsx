import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Noto_Sans_SC } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { OfflineNotification } from "@/components/offline-notification"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "YYC³-Med | AI-Powered Intelligent Medical System",
    template: "%s | YYC³-Med",
  },
  description:
    "言启立方于万象，语枢智云守健康 - YYC³医疗AI系统提供智能诊断、患者管理、临床决策支持等全方位医疗信息化解决方案。",
  keywords: [
    "YYC³",
    "言语云³",
    "医疗AI",
    "智能诊断",
    "医疗信息化",
    "临床决策支持",
    "远程医疗",
    "患者管理",
    "医学影像AI",
    "电子病历",
    "医疗大数据",
    "AI-Powered Medical System",
    "Intelligent Healthcare",
    "Medical AI Platform",
  ],
  authors: [{ name: "YYC³医疗科技团队" }],
  creator: "YYC³-Med",
  publisher: "言语云³医疗科技",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yyc3-med.com"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/zh-CN",
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yyc3-med.com",
    title: "YYC³-Med | AI-Powered Intelligent Medical System",
    description: "言启立方于万象，语枢智云守健康 - 领先的医疗AI智能诊断平台",
    siteName: "YYC³-Med医疗AI系统",
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
    description: "言启立方于万象，语枢智云守健康 - 领先的医疗AI智能诊断平台",
    images: ["/logo-512.png"],
    creator: "@yyc3med",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "healthcare",
  classification: "Medical AI Platform",
  referrer: "origin-when-cross-origin",
  generator: "YYC³-Med v1.0",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1d4ed8" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="YYC³-Med" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YYC³-Med" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "YYC³-Med医疗AI系统",
              description: "言启立方于万象，语枢智云守健康 - 领先的医疗AI智能诊断平台，提供全方位医疗信息化解决方案",
              url: "https://yyc3-med.com",
              logo: "https://yyc3-med.com/logo-512.png",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CNY",
              },
              provider: {
                "@type": "Organization",
                name: "YYC³医疗科技",
                url: "https://yyc3-med.com",
                slogan: "言启立方于万象，语枢智云守健康",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
            <OfflineNotification />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
