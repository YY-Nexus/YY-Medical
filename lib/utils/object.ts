// 对象工具函数

/**
 * 深度合并对象
 */
export function deepMerge<T extends object = object, U extends object = T>(target: T, source: U): T & U {
  const output = { ...target } as T & U

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key as keyof U])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof U] })
        } else {
          output[key as keyof T & U] = deepMerge(
            target[key as keyof T] as object,
            source[key as keyof U] as object,
          ) as any
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof U] })
      }
    })
  }

  return output
}

/**
 * 检查值是否为对象
 */
export function isObject(item: any): item is object {
  return item && typeof item === "object" && !Array.isArray(item)
}

/**
 * 从对象中选择指定的属性
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>,
  )
}

/**
 * 从对象中排除指定的属性
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}

/**
 * 将对象转换为查询字符串
 */
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`).join("&")
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    })
    .join("&")
}

/**
 * 将查询字符串转换为对象
 */
export function queryStringToObject(queryString: string): Record<string, string | string[]> {
  if (!queryString || queryString === "?") return {}

  const query = queryString.startsWith("?") ? queryString.substring(1) : queryString

  return query.split("&").reduce(
    (result, param) => {
      const [key, value] = param.split("=")
      if (!key) return result

      const decodedKey = decodeURIComponent(key)
      const decodedValue = value ? decodeURIComponent(value) : ""

      if (decodedKey in result) {
        const existingValue = result[decodedKey]
        if (Array.isArray(existingValue)) {
          existingValue.push(decodedValue)
        } else {
          result[decodedKey] = [existingValue, decodedValue]
        }
      } else {
        result[decodedKey] = decodedValue
      }

      return result
    },
    {} as Record<string, string | string[]>,
  )
}

/**
 * 检查对象是否为空
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

/**
 * 扁平化嵌套对象
 * 例如: { a: { b: 1 } } -> { 'a.b': 1 }
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = "",
  result: Record<string, any> = {},
): Record<string, any> {
  for (const key in obj) {
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (isObject(obj[key]) && !Array.isArray(obj[key])) {
      flattenObject(obj[key], prefixedKey, result)
    } else {
      result[prefixedKey] = obj[key]
    }
  }

  return result
}

/**
 * 将扁平化对象转回嵌套对象
 * 例如: { 'a.b': 1 } -> { a: { b: 1 } }
 */
export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    const parts = key.split(".")
    let current = result

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      if (i === parts.length - 1) {
        current[part] = obj[key]
      } else {
        current[part] = current[part] || {}
        current = current[part]
      }
    }
  }

  return result
}
