"use client"

import { useState, useRef, useEffect } from "react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, HelpCircle, FileText, Clock, CheckCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface CertificationChatProps {
  currentStep: number
  certificationSteps: any[]
  onStepChange: (step: number) => void
}

export function CertificationChat({ currentStep, certificationSteps, onStepChange }: CertificationChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "您好！我是言语云³认证助手，很高兴为您服务。我将协助您完成医生资格认证流程。",
      timestamp: new Date(),
      suggestions: ["查看认证进度", "上传证书文件", "常见问题解答", "联系人工客服"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    { label: "认证进度", icon: Clock, action: () => handleQuickAction("查看我的认证进度") },
    { label: "上传文件", icon: FileText, action: () => handleQuickAction("如何上传证书文件？") },
    { label: "常见问题", icon: HelpCircle, action: () => handleQuickAction("认证常见问题") },
    { label: "完成认证", icon: CheckCircle, action: () => handleQuickAction("如何快速完成认证？") },
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleQuickAction = (question: string) => {
    handleSendMessage(question)
  }

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // 模拟AI回复
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateResponse(messageText),
        timestamp: new Date(),
        suggestions: generateSuggestions(messageText),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("进度") || lowerQuestion.includes("状态")) {
      const completedSteps = certificationSteps.filter((s) => s.status === "completed").length
      const totalSteps = certificationSteps.length
      return `您当前的认证进度：已完成 ${completedSteps}/${totalSteps} 个步骤。当前正在进行"${certificationSteps[currentStep]?.title}"步骤。建议您优先完成必需的认证项目。`
    }

    if (lowerQuestion.includes("上传") || lowerQuestion.includes("文件")) {
      return "上传证书文件很简单：\n1. 点击对应认证步骤\n2. 选择上传文件按钮\n3. 支持JPG、PNG、PDF格式\n4. 文件大小不超过10MB\n5. 系统会自动进行OCR识别\n\n需要我帮您跳转到上传页面吗？"
    }

    if (lowerQuestion.includes("常见问题") || lowerQuestion.includes("问题")) {
      return "认证过程中的常见问题：\n\n📋 证书不清晰怎么办？\n• 请确保照片清晰、光线充足\n• 避免反光和阴影\n• 可以重新拍照上传\n\n⏰ 认证需要多长时间？\n• 自动审核：5-10分钟\n• 人工审核：1-3个工作日\n\n❓ 认证失败怎么办？\n• 查看失败原因\n• 重新上传正确文件\n• 联系客服协助处理"
    }

    if (lowerQuestion.includes("快速") || lowerQuestion.includes("完成")) {
      return "快速完成认证的建议：\n\n✅ 准备齐全的证书文件\n✅ 确保照片清晰可读\n✅ 按顺序完成必需步骤\n✅ 及时响应审核反馈\n\n当前您需要完成：\n• 执业证书上传（进行中）\n• 继续教育证明\n• 医院信息确认\n\n需要我帮您跳转到下一步吗？"
    }

    return "感谢您的提问！我正在为您查找相关信息。如果您有具体的认证问题，请详细描述，我会为您提供针对性的帮助。您也可以点击下方的快捷操作按钮。"
  }

  const generateSuggestions = (question: string): string[] => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("进度")) {
      return ["跳转到下一步", "查看详细进度", "设置提醒通知"]
    }

    if (lowerQuestion.includes("上传")) {
      return ["开始上传文件", "查看上传要求", "重新上传文件"]
    }

    if (lowerQuestion.includes("问题")) {
      return ["联系人工客服", "查看帮助文档", "提交反馈"]
    }

    return ["查看认证进度", "继续认证流程", "联系客服"]
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "跳转到下一步") {
      const nextStep = certificationSteps.findIndex((s) => s.status === "pending")
      if (nextStep !== -1) {
        onStepChange(nextStep)
      }
    } else if (suggestion === "开始上传文件") {
      onStepChange(1) // 跳转到上传步骤
    } else {
      handleSendMessage(suggestion)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <CardHeader className="border-b border-blue-200 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-1 bg-white/20 rounded-full">
            <Bot className="h-5 w-5" />
          </div>
          <span>认证助手</span>
          <Badge className="bg-white/20 text-white border-white/30">在线</Badge>
        </CardTitle>
      </CardHeader>

      {/* 快捷操作 */}
      <div className="p-3 border-b border-blue-200 bg-blue-50">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={action.action}
              className="justify-start text-xs border-blue-200 text-blue-700 hover:bg-blue-100 bg-transparent"
            >
              {action.icon && <action.icon className="h-3 w-3 mr-1" />}
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 消息区域 */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  {message.type === "user" ? (
                    <>
                      <AvatarFallback className="bg-blue-600 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-white border border-blue-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>

                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="h-6 px-2 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-blue-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 输入区域 */}
      <div className="p-3 border-t border-blue-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的问题..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="border-blue-200 focus:border-blue-400"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
