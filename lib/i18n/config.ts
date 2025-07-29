export const defaultLocale = "zh-CN" as const
export const locales = ["zh-CN", "en-US", "ja-JP", "ko-KR"] as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "en-US": "English",
  "ja-JP": "日本語",
  "ko-KR": "한국어",
}

export const localeFlags: Record<Locale, string> = {
  "zh-CN": "🇨🇳",
  "en-US": "🇺🇸",
  "ja-JP": "🇯🇵",
  "ko-KR": "🇰🇷",
}

export function getLocaleFromUrl(pathname: string): Locale {
  const segments = pathname.split("/")
  const localeSegment = segments[1]

  if (locales.includes(localeSegment as Locale)) {
    return localeSegment as Locale
  }

  return defaultLocale
}

export function removeLocaleFromUrl(pathname: string): string {
  const segments = pathname.split("/")
  const localeSegment = segments[1]

  if (locales.includes(localeSegment as Locale)) {
    return "/" + segments.slice(2).join("/")
  }

  return pathname
}
