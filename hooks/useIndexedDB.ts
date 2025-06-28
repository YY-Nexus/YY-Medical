"use client"

import { useState, useCallback } from "react"
import * as idb from "@/lib/storage/indexedDB"

/**
 * 使用 IndexedDB 的 Hook
 * @param storeName 存储对象名称
 * @returns IndexedDB 操作方法和状态
 */
export function useIndexedDB<T>(storeName: idb.StoreNames) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // 添加项目
  const addItem = useCallback(
    async (item: T) => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await idb.addItem<T>(storeName, item)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("添加数据时发生错误")
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [storeName],
  )

  // 更新项目
  const updateItem = useCallback(
    async (item: T) => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await idb.updateItem<T>(storeName, item)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("更新数据时发生错误")
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [storeName],
  )

  // 获取项目
  const getItem = useCallback(
    async (id: string | number) => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await idb.getItem<T>(storeName, id)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("获取数据时发生错误")
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [storeName],
  )

  // 删除项目
  const deleteItem = useCallback(
    async (id: string | number) => {
      setIsLoading(true)
      setError(null)
      try {
        await idb.deleteItem(storeName, id)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("删除数据时发生错误")
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [storeName],
  )

  // 获取所有项目
  const getAllItems = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await idb.getAllItems<T>(storeName)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("获取所有数据时发生错误")
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [storeName])

  // 使用索引查询项目
  const getItemsByIndex = useCallback(
    async (indexName: string, value: string | number) => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await idb.getItemsByIndex<T>(storeName, indexName, value)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("使用索引查询数据时发生错误")
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [storeName],
  )

  // 清空存储对象
  const clearStore = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await idb.clearStore(storeName)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("清空存储对象时发生错误")
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [storeName])

  // 计算项目数量
  const countItems = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const count = await idb.countItems(storeName)
      return count
    } catch (err) {
      const error = err instanceof Error ? err : new Error("计算项目数量时发生错误")
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [storeName])

  return {
    addItem,
    updateItem,
    getItem,
    deleteItem,
    getAllItems,
    getItemsByIndex,
    clearStore,
    countItems,
    isLoading,
    error,
  }
}
