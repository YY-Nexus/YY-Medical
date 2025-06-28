"use client"

import { useState, useMemo } from "react"

interface PaginationOptions {
  totalItems: number
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: number[]
}

interface PaginationResult {
  page: number
  pageSize: number
  totalPages: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPrevPage: boolean
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  setPageSize: (pageSize: number) => void
  pageSizeOptions: number[]
}

/**
 * 分页逻辑的 Hook
 */
export function usePagination({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationOptions): PaginationResult {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  // 当总项目数或页面大小变化时，确保当前页面有效
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize])

  // 如果当前页超出范围，重置为最后一页
  if (page > totalPages) {
    setPage(totalPages)
  }

  // 计算当前页的起始和结束索引
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

  // 检查是否有下一页或上一页
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  // 页面导航函数
  const goToPage = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages))
    setPage(validPage)
  }

  const nextPage = () => {
    if (hasNextPage) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (hasPrevPage) {
      setPage(page - 1)
    }
  }

  // 更改页面大小
  const changePageSize = (newPageSize: number) => {
    // 计算新的页面索引，尽量保持相同的起始项
    const newPage = Math.floor(startIndex / newPageSize) + 1
    setPageSize(newPageSize)
    setPage(newPage)
  }

  return {
    page,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    setPage: goToPage,
    nextPage,
    prevPage,
    setPageSize: changePageSize,
    pageSizeOptions,
  }
}
