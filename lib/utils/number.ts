// 数字工具函数

/**
 * 格式化数字为带千位分隔符的字符串
 */
export function formatNumber(
  num: number,
  options: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {},
): string {
  const { locale = "zh-CN", minimumFractionDigits = 0, maximumFractionDigits = 2 } = options

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num)
}

/**
 * 格式化货币
 */
export function formatCurrency(
  amount: number,
  options: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {},
): string {
  const { currency = "CNY", locale = "zh-CN", minimumFractionDigits = 2, maximumFractionDigits = 2 } = options

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}

/**
 * 格式化百分比
 */
export function formatPercent(
  value: number,
  options: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {},
): string {
  const { locale = "zh-CN", minimumFractionDigits = 0, maximumFractionDigits = 2 } = options

  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

/**
 * 将数字限制在指定范围内
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * 四舍五入到指定小数位
 */
export function roundTo(num: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

/**
 * 格式化文件大小
 * 例如: 1024 -> 1 KB
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * 生成指定范围内的随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 计算数组的平均值
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

/**
 * 计算数组的中位数
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0

  const sorted = [...numbers].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }

  return sorted[middle]
}
