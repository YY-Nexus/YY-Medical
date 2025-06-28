"use client"

import { useEffect, type RefObject } from "react"

/**
 * 监听元素外部点击的 Hook
 * @param ref 要监听的元素引用
 * @param handler 点击外部时的处理函数
 * @param excludeRefs 要排除的元素引用数组
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  excludeRefs: RefObject<HTMLElement>[] = [],
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node

      // 如果点击的是引用元素内部，不触发处理函数
      if (!ref.current || ref.current.contains(target)) {
        return
      }

      // 如果点击的是排除元素内部，不触发处理函数
      for (const excludeRef of excludeRefs) {
        if (excludeRef.current && excludeRef.current.contains(target)) {
          return
        }
      }

      handler(event)
    }

    // 添加事件监听器
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    // 清理函数
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler, excludeRefs])
}
