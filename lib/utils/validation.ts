// 表单验证工具函数

/**
 * 验证电子邮件
 */
export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

/**
 * 验证密码强度
 * @returns 包含验证结果和强度评分的对象
 */
export function validatePassword(password: string): {
  isValid: boolean
  score: number // 0-4, 0 最弱，4 最强
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  // 长度检查
  if (password.length < 8) {
    feedback.push("密码长度应至少为 8 个字符")
  } else {
    score += 1
  }

  // 包含数字
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push("密码应包含至少一个数字")
  }

  // 包含小写字母
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push("密码应包含至少一个小写字母")
  }

  // 包含大写字母
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push("密码应包含至少一个大写字母")
  }

  // 包含特殊字符
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push("密码应包含至少一个特殊字符")
  }

  // 常见密码检查
  const commonPasswords = ["password", "123456", "qwerty", "admin", "111111"]
  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0
    feedback.push("请勿使用常见密码")
  }

  // 重复字符检查
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1)
    feedback.push("密码不应包含连续重复的字符")
  }

  // 连续字符检查
  if (
    /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(
      password,
    )
  ) {
    score = Math.max(0, score - 1)
    feedback.push("密码不应包含连续的字母或数字序列")
  }

  return {
    isValid: score >= 3 && password.length >= 8,
    score: Math.min(4, score), // 最高分为 4
    feedback: feedback.length > 0 ? feedback : ["密码强度良好"],
  }
}

/**
 * 验证中国大陆手机号
 */
export function validateChinesePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 验证中国大陆身份证号
 */
export function validateChineseIdCard(idCard: string): boolean {
  // 基本格式检查
  if (!/^\d{17}[\dXx]$/.test(idCard)) {
    return false
  }

  // 检查出生日期
  const year = Number.parseInt(idCard.substr(6, 4))
  const month = Number.parseInt(idCard.substr(10, 2))
  const day = Number.parseInt(idCard.substr(12, 2))

  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return false
  }

  // 简单的校验码检查
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]

  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += Number.parseInt(idCard.charAt(i)) * factors[i]
  }

  const checkCode = checkCodes[sum % 11]
  return checkCode === idCard.charAt(17).toUpperCase()
}

/**
 * 验证 URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证日期是否在指定范围内
 */
export function validateDateRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) return false
  if (maxDate && date > maxDate) return false
  return true
}

/**
 * 验证文件类型
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

/**
 * 验证文件大小
 * @param maxSizeInBytes 最大文件大小（字节）
 */
export function validateFileSize(file: File, maxSizeInBytes: number): boolean {
  return file.size <= maxSizeInBytes
}
