import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import RootLayoutClient from "./RootLayoutClient"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "言语云³医疗AI系统",
  description: "言语云³医疗AI智能诊疗系统 - 智能诊疗、精准医疗、安全可信",
  keywords: "医疗AI,智能诊疗,精准医疗,言语云,YanYu Cloud",
  authors: [{ name: "言语云³团队" }],
  icons: {
    icon: "/images/yanyu-cloud-logo.png",
    apple: "/images/yanyu-cloud-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RootLayoutClient>{children}</RootLayoutClient>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
