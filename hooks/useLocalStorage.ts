"use client"

import { useState, useEffect } from "react"
import * as ls from "@/lib/storage/localStorage"

/**
 * 使用 localStorage 持久化状态的 Hook
 * @param key localStorage 键名
 * @param initialValue 初始值
 * @returns [存储的值, 设置值的函数, 移除值的函数]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 获取初始值
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue
    }

    return ls.getItem<T>(key, initialValue)
  }

  // 状态保存实际值
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // 返回一个包装版的 setState 函数，将新值同步到 localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window === "undefined") {
      console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`)
      return
    }

    try {
      // 允许值是一个函数，类似于 useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // 保存到 state
      setStoredValue(valueToStore)

      // 保存到 localStorage
      ls.setItem(key, valueToStore)

      // 触发自定义事件，以便其他标签页可以响应存储的变化
      window.dispatchEvent(new Event("local-storage"))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  // 移除存储的值
  const removeValue = () => {
    if (typeof window === "undefined") {
      return
    }

    try {
      // 从 localStorage 中移除
      ls.removeItem(key)

      // 重置 state 为初始值
      setStoredValue(initialValue)

      // 触发自定义事件
      window.dispatchEvent(new Event("local-storage"))
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  // 监听其他标签页中的存储变化
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // 监听 storage 事件和自定义事件
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("local-storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("local-storage", handleStorageChange)
    }
  }, [])

  return [storedValue, setValue, removeValue]
}
