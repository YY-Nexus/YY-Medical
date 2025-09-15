import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_SC } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
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
  // ...existing code...
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
  generator: "v0.app"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
