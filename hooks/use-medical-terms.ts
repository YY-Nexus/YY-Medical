"use client"

import { useLanguage } from "@/contexts/language-context"
import { medicalTerms, type MedicalTermKey } from "@/i18n/medical-terms"

export function useMedicalTerms() {
  const { locale } = useLanguage()

  const mt = (key: MedicalTermKey): string => {
    // 如果当前语言有这个键，返回翻译
    if (medicalTerms[locale] && medicalTerms[locale][key]) {
      return medicalTerms[locale][key]
    }

    // 如果当前语言没有这个键，尝试使用英文
    if (locale !== "en-US" && medicalTerms["en-US"] && medicalTerms["en-US"][key]) {
      return medicalTerms["en-US"][key]
    }

    // 如果英文也没有，返回键名
    return key
  }

  return { mt }
}
