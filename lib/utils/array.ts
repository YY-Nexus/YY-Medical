// 数组工具函数

/**
 * 对数组进行分组
 * @param array 要分组的数组
 * @param keyFn 用于生成分组键的函数
 * @returns 分组后的对象，键为分组键，值为分组项数组
 */
export function groupBy<T, K extends string | number | symbol>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return array.reduce(
    (result, item) => {
      const key = keyFn(item)
      result[key] = result[key] || []
      result[key].push(item)
      return result
    },
    {} as Record<K, T[]>,
  )
}

/**
 * 对数组进行排序
 * @param array 要排序的数组
 * @param keyFn 用于获取排序键的函数
 * @param order 排序顺序，'asc' 为升序，'desc' 为降序
 * @returns 排序后的新数组
 */
export function sortBy<T>(array: T[], keyFn: (item: T) => string | number | Date, order: "asc" | "desc" = "asc"): T[] {
  const multiplier = order === "asc" ? 1 : -1

  return [...array].sort((a, b) => {
    const keyA = keyFn(a)
    const keyB = keyFn(b)

    if (keyA instanceof Date && keyB instanceof Date) {
      return multiplier * (keyA.getTime() - keyB.getTime())
    }

    if (typeof keyA === "string" && typeof keyB === "string") {
      return multiplier * keyA.localeCompare(keyB)
    }

    if (typeof keyA === "number" && typeof keyB === "number") {
      return multiplier * (keyA - keyB)
    }

    return 0
  })
}

/**
 * 从数组中移除重复项
 * @param array 要处理的数组
 * @param keyFn 可选的用于生成唯一键的函数
 * @returns 去重后的新数组
 */
export function uniqueBy<T>(array: T[], keyFn?: (item: T) => any): T[] {
  if (!keyFn) {
    return [...new Set(array)]
  }

  const seen = new Set()
  return array.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

/**
 * 将数组分割成指定大小的块
 * @param array 要分割的数组
 * @param size 每个块的大小
 * @returns 包含分割后块的数组
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

/**
 * 从数组中随机选择一个或多个元素
 * @param array 源数组
 * @param count 要选择的元素数量，默认为 1
 * @returns 随机选择的元素或元素数组
 */
export function sample<T>(array: T[], count = 1): T | T[] {
  if (array.length === 0) return count === 1 ? (undefined as any) : []

  if (count === 1) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  const result: T[] = []
  const copy = [...array]
  const n = Math.min(count, array.length)

  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * copy.length)
    result.push(copy[index])
    copy.splice(index, 1)
  }

  return result
}

/**
 * 计算两个数组的交集
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((item) => b.includes(item))
}

/**
 * 计算两个数组的差集 (a - b)
 */
export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter((item) => !b.includes(item))
}

/**
 * 计算两个数组的并集
 */
export function union<T>(a: T[], b: T[]): T[] {
  return [...new Set([...a, ...b])]
}

/**
 * 将数组平铺一层
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? item : [item])
  }, [] as T[])
}
