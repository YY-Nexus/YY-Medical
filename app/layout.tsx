import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Noto_Sans_SC } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { AutomaticExecutionProvider } from "@/contexts/automatic-execution-context"
import { OfflineNotification } from "@/components/offline-notification"
import { Logo } from "@/components/brand/logo"

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
    default: "言语云³医疗AI系统 - 智能医疗诊断平台",
    template: "%s | 言语云³医疗AI系统",
  },
  description:
    "言语云³是领先的医疗AI智能诊断平台，提供AI辅助诊断、患者管理、临床决策支持、远程医疗等全方位医疗信息化解决方案。",
  keywords: [
    "医疗AI",
    "智能诊断",
    "医疗信息化",
    "临床决策支持",
    "远程医疗",
    "患者管理",
    "医学影像AI",
    "电子病历",
    "医疗大数据",
    "言语云",
  ],
  authors: [{ name: "言语云³团队" }],
  creator: "言语云³",
  publisher: "言语云³医疗科技",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yanyu-cloud.com"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/zh-CN",
      "en-US": "/en-US",
      "ja-JP": "/ja-JP",
      "ko-KR": "/ko-KR",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yanyu-cloud.com",
    title: "言语云³医疗AI系统 - 智能医疗诊断平台",
    description: "领先的医疗AI智能诊断平台，提供全方位医疗信息化解决方案",
    siteName: "言语云³医疗AI系统",
    images: [
      {
        url: "/images/yanyu-cloud-logo.png",
        width: 1200,
        height: 630,
        alt: "言语云³医疗AI系统",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "言语云³医疗AI系统",
    description: "领先的医疗AI智能诊断平台",
    images: ["/images/yanyu-cloud-logo.png"],
    creator: "@yanyucloud",
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
    generator: 'v0.dev'
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
        <link rel="icon" href="/images/yanyu-cloud-logo.png" />
        <link rel="apple-touch-icon" href="/images/yanyu-cloud-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="言语云³医疗AI系统" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="言语云³" />
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
              name: "言语云³医疗AI系统",
              description: "领先的医疗AI智能诊断平台，提供全方位医疗信息化解决方案",
              url: "https://yanyu-cloud.com",
              logo: "https://yanyu-cloud.com/images/yanyu-cloud-logo.png",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CNY",
              },
              provider: {
                "@type": "Organization",
                name: "言语云³医疗科技",
                url: "https://yanyu-cloud.com",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AutomaticExecutionProvider>
              <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container flex h-14 items-center">
                    <Logo size="sm" />
                  </div>
                </header>
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6 md:py-0">
                  <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                      <Logo size="sm" showText={false} />
                      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2024 言语云³医疗科技. 保留所有权利.
                      </p>
                    </div>
                  </div>
                </footer>
              </div>
              <OfflineNotification />
              <Toaster />
            </AutomaticExecutionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
