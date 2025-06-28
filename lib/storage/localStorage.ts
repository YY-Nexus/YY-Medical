/**
 * localStorage 工具函数
 * 提供对 localStorage 的安全访问和类型支持
 */

// 存储项目到 localStorage
export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

// 从 localStorage 获取项目
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return defaultValue
    }
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error)
    return defaultValue
  }
}

// 从 localStorage 移除项目
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

// 清空 localStorage
export function clear(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}

// 检查 localStorage 中是否存在某个键
export function hasKey(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null
  } catch (error) {
    console.error(`Error checking localStorage key "${key}":`, error)
    return false
  }
}

// 获取所有键
export function getAllKeys(): string[] {
  try {
    return Object.keys(localStorage)
  } catch (error) {
    console.error("Error getting all localStorage keys:", error)
    return []
  }
}

// 获取 localStorage 已使用空间（以字节为单位）
export function getUsedSpace(): number {
  try {
    let total = 0
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2 // UTF-16 编码每个字符占用 2 字节
      }
    }
    return total
  } catch (error) {
    console.error("Error calculating localStorage used space:", error)
    return 0
  }
}

// 检查 localStorage 是否可用
export function isAvailable(): boolean {
  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    const result = localStorage.getItem(testKey) === testKey
    localStorage.removeItem(testKey)
    return result
  } catch (error) {
    return false
  }
}

// 命名空间前缀
export function createNamespacedStorage(namespace: string) {
  const prefix = `${namespace}:`

  return {
    setItem: <T,>(key: string, value: T): void => {
      setItem<T>(`${prefix}${key}`, value)
    },
    getItem: <T,>(key: string, defaultValue: T): T => getItem<T>(`${prefix}${key}`, defaultValue),
    removeItem: (key: string): void => {
      removeItem(`${prefix}${key}`)
    },
    clear: (): void => {
      const allKeys = getAllKeys()
      const namespacedKeys = allKeys.filter((key) => key.startsWith(prefix))
      namespacedKeys.forEach((namespacedKey) => removeItem(namespacedKey))
    },
    hasKey: (key: string): boolean => hasKey(`${prefix}${key}`),
    getAllKeys: (): string[] => {
      const allKeys = getAllKeys()
      return allKeys.filter((key) => key.startsWith(prefix)).map((key) => key.substring(prefix.length))
    },
  }
}

// 创建医疗系统专用的存储命名空间
export const medicalStorage = createNamespacedStorage("medinexus")
