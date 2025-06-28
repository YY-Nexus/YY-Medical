"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Tag, Clock, ArrowRight } from "lucide-react"
import { AdminGuideService } from "@/services/admin-guide-service"
import type { KnowledgeBase } from "@/types/admin-guide"

export function KnowledgeBaseBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchResults, setSearchResults] = useState<KnowledgeBase[]>([])

  const categories = AdminGuideService.getKnowledgeCategories()
  const allKnowledge = categories.reduce((acc, category) => {
    return [...acc, ...AdminGuideService.getKnowledgeByCategory(category)]
  }, [] as KnowledgeBase[])

  // 搜索知识库
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = AdminGuideService.searchKnowledge(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // 获取显示的知识条目
  const getDisplayedKnowledge = (): KnowledgeBase[] => {
    if (searchQuery.trim()) {
      return searchResults
    }

    if (selectedCategory === "all") {
      return allKnowledge
    }

    return AdminGuideService.getKnowledgeByCategory(selectedCategory)
  }

  const getDifficultyColor = (difficulty: KnowledgeBase["difficulty"]) => {
    switch (difficulty) {
      case "basic":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* 搜索区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            医疗AI知识库
          </CardTitle>
          <CardDescription>浏览和搜索医疗AI相关的科普知识和技术文档</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索知识库..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => handleSearch(searchQuery)}>
              搜索
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 分类浏览 */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">全部</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid gap-4">
            {getDisplayedKnowledge().map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty === "basic" ? "基础" : item.difficulty === "intermediate" ? "中级" : "高级"}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.lastUpdated.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>

                    {/* 关键词 */}
                    {item.keywords.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">关键词：</div>
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 相关主题 */}
                    {item.relatedTopics.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">相关主题：</div>
                        <div className="flex flex-wrap gap-2">
                          {item.relatedTopics.map((topicId, index) => {
                            const relatedItem = allKnowledge.find((k) => k.id === topicId)
                            return relatedItem ? (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="h-auto p-2 text-xs"
                                onClick={() => {
                                  // 滚动到相关主题或打开详情
                                  const element = document.getElementById(topicId)
                                  if (element) {
                                    element.scrollIntoView({ behavior: "smooth" })
                                  }
                                }}
                              >
                                <ArrowRight className="h-3 w-3 mr-1" />
                                {relatedItem.question}
                              </Button>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {getDisplayedKnowledge().length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{searchQuery ? "没有找到相关内容" : "该分类下暂无内容"}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
