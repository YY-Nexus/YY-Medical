"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { UserAvatarProvider } from "@/contexts/user-avatar-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserAvatarProvider>
        {children}
        <Toaster />
      </UserAvatarProvider>
    </ThemeProvider>
  )
}
