"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 初始检查
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 首次运行
    checkIfMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkIfMobile)

    // 清理
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

export const useMobile = useIsMobile
