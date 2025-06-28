"use client"

import { useState, useEffect } from "react"
import { useAutoTranslation } from "@/contexts/auto-translation-context"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Search, Trash2, Download, Upload, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TranslationManagement() {
  const { translationCache, clearCache, isTranslating } = useAutoTranslation()
  const { locale, availableLocales, localeName, tSync } = useTranslation()
  const [activeTab, setActiveTab] = useState(locale)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEntries, setFilteredEntries] = useState<[string, string][]>([])

  // 当前语言的翻译缓存
  const currentCache = translationCache[activeTab as keyof typeof translationCache] || {}

  // 过滤翻译条目
  useEffect(() => {
    const entries = Object.entries(currentCache)
    if (!searchTerm) {
      setFilteredEntries(entries)
      return
    }

    const filtered = entries.filter(
      ([key, value]) =>
        key.toLowerCase().includes(searchTerm.toLowerCase()) || value.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredEntries(filtered)
  }, [currentCache, searchTerm])

  // 导出翻译缓存
  const handleExport = () => {
    const dataStr = JSON.stringify(translationCache, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `translation-cache-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // 导入翻译缓存
  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string)
          // 这里可以添加验证逻辑
          localStorage.setItem("translationCache", JSON.stringify(json))
          window.location.reload() // 重新加载页面以应用新缓存
        } catch (error) {
          console.error("导入翻译缓存失败:", error)
          alert("导入失败，请确保文件格式正确")
        }
      }
      reader.readAsText(file)
    }

    input.click()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{tSync("common.translation_management", "翻译管理")}</span>
          {isTranslating && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
        <CardDescription>
          {tSync("common.translation_management_description", "管理自动翻译的缓存，导出或导入翻译数据")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={tSync("common.search_translations", "搜索翻译...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon" onClick={clearCache} title={tSync("common.clear_cache", "清除缓存")}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleExport} title={tSync("common.export", "导出")}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleImport} title={tSync("common.import", "导入")}>
              <Upload className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              {availableLocales.map((lang) => (
                <TabsTrigger key={lang} value={lang} className="flex-1">
                  <span>{localeName[lang]}</span>
                  {translationCache[lang] && (
                    <Badge variant="secondary" className="ml-2">
                      {Object.keys(translationCache[lang] || {}).length}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {availableLocales.map((lang) => (
              <TabsContent key={lang} value={lang} className="border rounded-md mt-2">
                <ScrollArea className="h-[400px] p-4">
                  {filteredEntries.length > 0 ? (
                    <div className="space-y-4">
                      {filteredEntries.map(([original, translated], index) => (
                        <div key={index} className="border rounded-md p-3">
                          <div className="text-sm font-medium text-muted-foreground mb-1">原文:</div>
                          <div className="p-2 bg-muted rounded-md mb-2">{original}</div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">翻译:</div>
                          <div className="p-2 bg-muted rounded-md">{translated}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <RefreshCw className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? tSync("common.no_matching_translations", "没有匹配的翻译")
                          : tSync("common.no_translations_yet", "暂无翻译缓存")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {tSync("common.translations_appear_here", "使用系统时，自动翻译的内容将显示在这里")}
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>
          {tSync("common.total_translations", "总翻译数")}:{" "}
          {Object.values(translationCache).reduce((sum, langCache) => sum + Object.keys(langCache || {}).length, 0)}
        </div>
        <div>
          {tSync("common.cache_size", "缓存大小")}: {(JSON.stringify(translationCache).length / 1024).toFixed(2)} KB
        </div>
      </CardFooter>
    </Card>
  )
}
