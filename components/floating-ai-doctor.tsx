"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Brain, X, Minimize2, Maximize2, MessageSquare } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export function FloatingAiDoctor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState([
    { role: "assistant", content: "您好！我是言语医枢³智能助手，有什么可以帮助您的吗？" },
  ])
  const [input, setInput] = useState("")
  const isMobile = useIsMobile()

  const floatingRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 在移动设备上调整位置
  useEffect(() => {
    if (isMobile) {
      setPosition({ x: 10, y: window.innerHeight - 180 }) // 避免与底部导航栏重叠
    } else {
      setPosition({ x: 20, y: window.innerHeight - 100 })
    }
  }, [isMobile])

  // 处理拖拽开始
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (floatingRef.current) {
      const rect = floatingRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  // 处理触摸开始
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (floatingRef.current) {
      const rect = floatingRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  // 处理拖拽移动
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && floatingRef.current) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // 确保不超出屏幕边界
      const maxX = window.innerWidth - floatingRef.current.offsetWidth
      const maxY = window.innerHeight - floatingRef.current.offsetHeight

      // 在移动设备上，保持一定距离避免与底部导航栏重叠
      const minY = isMobile ? 0 : 0
      const maxYMobile = isMobile ? window.innerHeight - floatingRef.current.offsetHeight - 80 : maxY

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, isMobile ? maxYMobile : maxY)),
      })
    }
  }

  // 处理触摸移动
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && floatingRef.current) {
      const touch = e.touches[0]
      const newX = touch.clientX - dragOffset.x
      const newY = touch.clientY - dragOffset.y

      // 确保不超出屏幕边界
      const maxX = window.innerWidth - floatingRef.current.offsetWidth
      const maxY = window.innerHeight - floatingRef.current.offsetHeight

      // 在移动设备上，保持一定距离避免与底部导航栏重叠
      const minY = isMobile ? 0 : 0
      const maxYMobile = isMobile ? window.innerHeight - floatingRef.current.offsetHeight - 80 : maxY

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, isMobile ? maxYMobile : maxY)),
      })
    }
  }

  // 处理拖拽结束
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // 发送消息
  const sendMessage = () => {
    if (input.trim()) {
      // 添加用户消息
      setMessages([...messages, { role: "user", content: input }])

      // 模拟AI回复
      setTimeout(() => {
        const responses = [
          "根据您的描述，这可能是季节性过敏的症状。建议您避免接触过敏原，可以考虑使用抗组胺药物缓解症状。",
          "您的症状需要进一步检查才能确定。建议您预约专科医生进行面诊。",
          "这些症状可能与多种疾病相关。请问您还有其他不适感吗？",
          "根据AI模型分析，您的症状与感冒较为相符。建议多休息，多喝水，必要时使用对症药物。",
          "您的情况可能需要进行一些基础检查，如血常规和胸部X光片，以排除更严重的问题。",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
      }, 1000)

      // 清空输入框
      setInput("")
    }
  }

  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 添加和移除全局事件监听器
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleDragEnd)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleDragEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  if (!isOpen) {
    return (
      <div
        ref={floatingRef}
        className="fixed z-50 shadow-medical-3d rounded-full cursor-pointer"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onClick={() => setIsOpen(true)}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      >
        <div className="bg-medical-gradient text-white p-3 rounded-full flex items-center justify-center h-14 w-14 animate-pulse-medical">
          <Brain className="h-8 w-8" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={floatingRef}
      className={cn(
        "fixed z-50 bg-white rounded-xl border border-medical-100 shadow-medical-3d transition-all duration-300",
        isMinimized ? "w-64 h-12" : isMobile ? "w-[90%] h-[60%] max-w-md" : "w-80 h-96",
      )}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* 头部 - 可拖拽区域 */}
      <div
        className="bg-medical-gradient text-white p-2 rounded-t-xl flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          <span className="font-medium">言语医枢³ AI助手</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-white/20 rounded" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button className="p-1 hover:bg-white/20 rounded" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-3 overflow-y-auto h-[calc(100%-96px)]">
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-2",
                      msg.role === "user"
                        ? "bg-medical-gradient text-white rounded-tr-none"
                        : "bg-medical-50 text-medical-800 rounded-tl-none",
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 输入区域 */}
          <div className="p-3 border-t border-medical-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="请描述您的症状..."
                className="flex-1 px-3 py-2 text-sm border border-medical-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500"
              />
              <MedicalButton size="sm" onClick={sendMessage}>
                <MessageSquare className="h-4 w-4" />
              </MedicalButton>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
