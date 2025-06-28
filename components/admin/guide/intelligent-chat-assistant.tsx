"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, HelpCircle, ExternalLink, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { AdminGuideService } from "@/services/admin-guide-service"
import type { ChatMessage } from "@/types/admin-guide"
import Link from "next/link"

export function IntelligentChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "您好！我是言语云³医疗AI系统的智能助手。我可以帮您了解系统功能、解答医疗AI相关问题，或指导您完成管理后台的配置。请问有什么可以帮助您的吗？",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 常见问题快捷按钮
  const quickQuestions = [
    "如何配置AI模型？",
    "什么是医疗AI？",
    "如何保护患者隐私？",
    "系统如何与HIS集成？",
    "AI诊断准确率如何？",
    "如何设置用户权限？",
  ]

  // 知识库分类
  const categories = AdminGuideService.getKnowledgeCategories()

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // 发送消息
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // 模拟AI响应
    setTimeout(
      () => {
        const response = generateAIResponse(content.trim())
        setMessages((prev) => [...prev, response])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  // 生成AI响应
  const generateAIResponse = (query: string): ChatMessage => {
    // 搜索知识库
    const searchResults = AdminGuideService.searchKnowledge(query)

    if (searchResults.length > 0) {
      const bestMatch = searchResults[0]
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: bestMatch.answer,
        timestamp: new Date(),
        type: "text",
        metadata: {
          guideId: bestMatch.id,
        },
      }
    }

    // 检查是否是操作指导类问题
    if (query.includes("如何") || query.includes("怎么") || query.includes("配置") || query.includes("设置")) {
      const guideSteps = AdminGuideService.getGuideSteps()
      const relevantStep = guideSteps.find(
        (step) =>
          step.title.toLowerCase().includes(query.toLowerCase()) ||
          step.description.toLowerCase().includes(query.toLowerCase()),
      )

      if (relevantStep) {
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `关于"${query}"，我建议您查看"${relevantStep.title}"部分。${relevantStep.description}`,
          timestamp: new Date(),
          type: "guide",
          metadata: {
            guideId: relevantStep.id,
            route: relevantStep.route,
          },
        }
      }
    }

    // 默认响应
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: `感谢您的问题："${query}"。我正在学习更多相关知识来更好地回答您。目前建议您：\n\n1. 查看管理后台使用指南\n2. 浏览相关文档\n3. 联系技术支持获取详细帮助\n\n有其他问题随时可以问我！`,
      timestamp: new Date(),
      type: "text",
    }
  }

  // 复制消息内容
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  // 消息反馈
  const handleFeedback = (messageId: string, isPositive: boolean) => {
    console.log(`Message ${messageId} feedback: ${isPositive ? "positive" : "negative"}`)
  }

  return (
    <div className="h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            智能科普助手
            <Badge variant="secondary" className="ml-auto">
              医疗AI专家
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* 消息区域 */}
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-lg rounded-br-sm"
                        : "bg-gray-100 rounded-lg rounded-bl-sm"
                    } p-3`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>

                    {/* 操作按钮 */}
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyMessage(message.content)}
                          className="h-6 px-2 text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          复制
                        </Button>

                        {message.metadata?.route && (
                          <Button variant="ghost" size="sm" asChild className="h-6 px-2 text-xs">
                            <Link href={message.metadata.route}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              查看
                            </Link>
                          </Button>
                        )}

                        <div className="flex gap-1 ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback(message.id, true)}
                            className="h-6 w-6 p-0"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback(message.id, false)}
                            className="h-6 w-6 p-0"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {/* 正在输入指示器 */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg rounded-bl-sm p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* 快捷问题 */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">常见问题：</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => sendMessage(question)}
                  className="text-xs"
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* 输入区域 */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入您的问题..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(inputValue)
                }
              }}
              disabled={isTyping}
            />
            <Button onClick={() => sendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
