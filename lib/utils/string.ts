// 字符串工具函数

/**
 * 截断文本并添加省略号
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * 将字符串首字母大写
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== "string") return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将驼峰命名转换为短横线命名
 * 例如: camelCase -> camel-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

/**
 * 将短横线命名转换为驼峰命名
 * 例如: kebab-case -> kebabCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 将字符串转换为 URL 友好的 slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\- ]/g, "") // 保留中文字符、字母、数字、连字符和空格
    .replace(/[\s_]+/g, "-") // 将空格和下划线替换为连字符
    .replace(/^-+|-+$/g, "") // 移除首尾连字符
}

/**
 * 生成随机 ID
 */
export function generateId(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 格式化手机号码
 * 例如: 13812345678 -> 138 **** 5678
 */
export function formatPhoneNumber(phone: string, mask = true): string {
  if (!phone || phone.length !== 11) return phone

  if (mask) {
    return `${phone.slice(0, 3)} **** ${phone.slice(7)}`
  }

  return `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`
}

/**
 * 格式化身份证号
 * 例如: 110101199001011234 -> 1101 **** **** 1234
 */
export function formatIdCard(idCard: string, mask = true): string {
  if (!idCard || idCard.length !== 18) return idCard

  if (mask) {
    return `${idCard.slice(0, 4)} **** **** ${idCard.slice(14)}`
  }

  return `${idCard.slice(0, 6)} ${idCard.slice(6, 14)} ${idCard.slice(14)}`
}

/**
 * 从 HTML 字符串中提取纯文本
 */
export function htmlToPlainText(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent || ""
}

/**
 * 检查字符串是否为有效的电子邮件格式
 */
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

/**
 * 检查字符串是否为有效的中国大陆手机号
 */
export function isValidChinesePhone(phone: string): boolean {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}
