"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { aiProviderService } from "@/services/ai-provider-service"
import type { AIProvider, AIModel } from "@/types/ai-models"
import { Send, Bot, User, Clock, DollarSign, Zap, Loader2 } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  metadata?: {
    provider: string
    model: string
    tokens: number
    cost: number
    duration: number
  }
}

export function AIChatTester() {
  const { toast } = useToast()
  const [providers] = useState<AIProvider[]>([
    { id: "openai", displayName: "OpenAI", name: "openai" } as AIProvider,
    { id: "deepseek", displayName: "DeepSeek", name: "deepseek" } as AIProvider,
    { id: "anthropic", displayName: "Claude", name: "anthropic" } as AIProvider,
  ])

  const [models] = useState<AIModel[]>([
    { id: "gpt-4", name: "GPT-4", provider: "openai" } as AIModel,
    { id: "deepseek-chat", name: "DeepSeek Chat", provider: "deepseek" } as AIModel,
    { id: "claude-3-opus", name: "Claude 3 Opus", provider: "anthropic" } as AIModel,
  ])

  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const availableModels = models.filter((model) => model.provider === selectedProvider)

  const handleSendMessage = async () => {
    if (!prompt.trim() || !selectedProvider || !selectedModel) {
      toast({
        title: "请完善信息",
        description: "请选择提供商、模型并输入消息",
        variant: "destructive",
      })
      return
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)

    try {
      const request = await aiProviderService.sendRequest({
        providerId: selectedProvider,
        modelId: selectedModel,
        prompt: prompt,
      })

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: request.response || "抱歉，没有收到响应",
        timestamp: request.timestamp,
        metadata: {
          provider: selectedProvider,
          model: selectedModel,
          tokens: request.tokens.total,
          cost: request.cost,
          duration: request.duration,
        },
      }

      setMessages((prev) => [...prev, assistantMessage])

      toast({
        title: "响应成功",
        description: `耗时 ${request.duration}ms，消耗 ${request.tokens.total} tokens`,
      })
    } catch (error) {
      toast({
        title: "请求失败",
        description: "AI模型响应失败，请重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const getTotalCost = () => {
    return messages.filter((msg) => msg.metadata).reduce((total, msg) => total + (msg.metadata?.cost || 0), 0)
  }

  const getTotalTokens = () => {
    return messages.filter((msg) => msg.metadata).reduce((total, msg) => total + (msg.metadata?.tokens || 0), 0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 聊天界面 */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>AI模型测试</span>
                </CardTitle>
                <CardDescription>测试不同AI模型的响应效果</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={clearChat}>
                清空对话
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-4">
            {/* 消息列表 */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>开始与AI模型对话</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString("zh-CN")}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                        {message.metadata && (
                          <div className="mt-2 pt-2 border-t border-border/20">
                            <div className="flex items-center space-x-4 text-xs opacity-70">
                              <span className="flex items-center space-x-1">
                                <Zap className="h-3 w-3" />
                                <span>{message.metadata.tokens} tokens</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>${message.metadata.cost.toFixed(4)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{message.metadata.duration}ms</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* 输入区域 */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择提供商" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择模型" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Textarea
                  placeholder="输入您的问题..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !prompt.trim() || !selectedProvider || !selectedModel}
                  className="px-3"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 统计面板 */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">对话统计</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">消息数量</span>
              <span className="font-medium">{messages.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">总令牌数</span>
              <span className="font-medium">{getTotalTokens()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">总费用</span>
              <span className="font-medium">${getTotalCost().toFixed(4)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">快速测试</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setPrompt("你好，请介绍一下你自己")}
            >
              基础对话测试
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setPrompt("请解释一下什么是机器学习")}
            >
              知识问答测试
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setPrompt("写一个Python函数来计算斐波那契数列")}
            >
              代码生成测试
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setPrompt("请分析一下高血压的常见症状和治疗方法")}
            >
              医疗分析测试
            </Button>
          </CardContent>
        </Card>

        {selectedProvider && selectedModel && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">当前配置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">提供商</span>
                <Badge variant="outline">{providers.find((p) => p.id === selectedProvider)?.displayName}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">模型</span>
                <Badge variant="outline">{models.find((m) => m.id === selectedModel)?.name}</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
