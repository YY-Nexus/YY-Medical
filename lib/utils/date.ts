// 日期工具函数

/**
 * 格式化日期为本地字符串
 * @param date 日期对象或日期字符串
 * @param format 格式选项 'full' | 'date' | 'time' | 'datetime' | 'relative'
 * @param locale 区域设置
 */
export function formatDate(
  date: Date | string | number,
  format: "full" | "date" | "time" | "datetime" | "relative" = "datetime",
  locale = "zh-CN",
): string {
  const dateObj = date instanceof Date ? date : new Date(date)

  if (isNaN(dateObj.getTime())) {
    return "无效日期"
  }

  // 相对时间格式化
  if (format === "relative") {
    return formatRelativeTime(dateObj, locale)
  }

  // 其他格式化选项
  const options: Intl.DateTimeFormatOptions = {}

  switch (format) {
    case "full":
      options.dateStyle = "full"
      options.timeStyle = "long"
      break
    case "date":
      options.year = "numeric"
      options.month = "long"
      options.day = "numeric"
      break
    case "time":
      options.hour = "2-digit"
      options.minute = "2-digit"
      options.second = "2-digit"
      break
    case "datetime":
    default:
      options.year = "numeric"
      options.month = "short"
      options.day = "numeric"
      options.hour = "2-digit"
      options.minute = "2-digit"
      break
  }

  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * 格式化相对时间（如"3小时前"）
 */
function formatRelativeTime(date: Date, locale = "zh-CN"): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // 不同时间单位的秒数
  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7
  const MONTH = DAY * 30
  const YEAR = DAY * 365

  // 相对时间格式化器
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

  if (diffInSeconds < MINUTE) {
    return rtf.format(-diffInSeconds, "second")
  } else if (diffInSeconds < HOUR) {
    return rtf.format(-Math.floor(diffInSeconds / MINUTE), "minute")
  } else if (diffInSeconds < DAY) {
    return rtf.format(-Math.floor(diffInSeconds / HOUR), "hour")
  } else if (diffInSeconds < WEEK) {
    return rtf.format(-Math.floor(diffInSeconds / DAY), "day")
  } else if (diffInSeconds < MONTH) {
    return rtf.format(-Math.floor(diffInSeconds / WEEK), "week")
  } else if (diffInSeconds < YEAR) {
    return rtf.format(-Math.floor(diffInSeconds / MONTH), "month")
  } else {
    return rtf.format(-Math.floor(diffInSeconds / YEAR), "year")
  }
}

/**
 * 计算两个日期之间的差异
 * @returns 返回包含年、月、日、小时等差异的对象
 */
export function dateDifference(
  startDate: Date | string | number,
  endDate: Date | string | number,
): {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
} {
  const start = startDate instanceof Date ? startDate : new Date(startDate)
  const end = endDate instanceof Date ? endDate : new Date(endDate)

  const diffInMs = end.getTime() - start.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)

  // 计算各时间单位的差异
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth() + years * 12
  const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const days = Math.floor(diffInSeconds / (60 * 60 * 24))
  const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60)
  const seconds = diffInSeconds % 60

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
  }
}

/**
 * 获取日期范围内的所有日期
 */
export function getDateRange(startDate: Date | string | number, endDate: Date | string | number): Date[] {
  const start = startDate instanceof Date ? startDate : new Date(startDate)
  const end = endDate instanceof Date ? endDate : new Date(endDate)

  const dates: Date[] = []
  const currentDate = new Date(start)

  while (currentDate <= end) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

/**
 * 检查日期是否在指定范围内
 */
export function isDateInRange(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
): boolean {
  const checkDate = date instanceof Date ? date : new Date(date)
  const start = startDate instanceof Date ? startDate : new Date(startDate)
  const end = endDate instanceof Date ? endDate : new Date(endDate)

  return checkDate >= start && checkDate <= end
}

/**
 * 将日期格式化为 ISO 字符串的日期部分 (YYYY-MM-DD)
 */
export function formatISODate(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().split("T")[0]
}

/**
 * 获取日期的年龄（以年为单位）
 */
export function getAge(birthDate: Date | string | number): number {
  const birth = birthDate instanceof Date ? birthDate : new Date(birthDate)
  const now = new Date()

  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--
  }

  return age
}
