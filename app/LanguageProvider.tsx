"use client"

import type { ReactNode } from "react"
import { LanguageProvider as Provider } from "@/contexts/language-context"

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>
}
