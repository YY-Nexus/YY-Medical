import type { Locale } from "./config"

const dictionaries = {
  "zh-CN": () => import("./dictionaries/zh-CN.json").then((module) => module.default),
  "en-US": () => import("./dictionaries/en-US.json").then((module) => module.default),
  "ja-JP": () => import("./dictionaries/ja-JP.json").then((module) => module.default),
  "ko-KR": () => import("./dictionaries/ko-KR.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  try {
    return await dictionaries[locale]()
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}`)
    return await dictionaries["zh-CN"]() // 回退到中文
  }
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
