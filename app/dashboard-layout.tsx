"use client"

import type React from "react"

import { AppShell } from "@/components/layout/app-shell"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return <AppShell>{children}</AppShell>
}

export default DashboardLayout
