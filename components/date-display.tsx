"use client"

import { useTranslation } from "@/hooks/use-translation"
import { format } from "date-fns"
import { zhCN, enUS, ja, ko } from "date-fns/locale"

interface DateDisplayProps {
  date: Date | string | number
  format?: string
  className?: string
}

export function DateDisplay({ date, format: formatString, className }: DateDisplayProps) {
  const { locale } = useTranslation()

  // 根据当前语言选择日期格式化的区域设置
  const getLocale = () => {
    switch (locale) {
      case "zh-CN":
        return zhCN
      case "ja-JP":
        return ja
      case "ko-KR":
        return ko
      default:
        return enUS
    }
  }

  // 根据当前语言选择默认的日期格式
  const getDefaultFormat = () => {
    switch (locale) {
      case "zh-CN":
      case "ja-JP":
        return "yyyy年MM月dd日"
      case "ko-KR":
        return "yyyy년 MM월 dd일"
      default:
        return "MMM d, yyyy"
    }
  }

  const dateObj = new Date(date)
  const dateLocale = getLocale()
  const dateFormat = formatString || getDefaultFormat()

  return (
    <time dateTime={dateObj.toISOString()} className={className}>
      {format(dateObj, dateFormat, { locale: dateLocale })}
    </time>
  )
}
