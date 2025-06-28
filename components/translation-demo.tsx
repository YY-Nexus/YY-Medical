"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function TranslationDemo() {
  const { t, tSync, locale, isTranslating } = useTranslation()
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // 处理翻译
  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      // 使用增强的翻译函数翻译文本
      const result = await t(inputText, inputText)
      setTranslatedText(result)
    } catch (error) {
      console.error("翻译失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{tSync("common.translation_demo", "翻译演示")}</CardTitle>
        <CardDescription>
          {tSync("common.translation_demo_description", "输入任何文本，系统将自动翻译成当前语言")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">{tSync("common.input_text", "输入文本")}</label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={tSync("common.enter_text_to_translate", "输入要翻译的文本...")}
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block flex items-center">
            <span>{tSync("common.translated_text", "翻译结果")}</span>
            {(isLoading || isTranslating) && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
          </label>
          <Textarea
            value={translatedText}
            readOnly
            placeholder={tSync("common.translation_result_placeholder", "翻译结果将显示在这里...")}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {tSync("common.current_language", "当前语言")}: {locale}
        </div>
        <Button onClick={handleTranslate} disabled={isLoading || !inputText.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {tSync("common.translating", "翻译中...")}
            </>
          ) : (
            tSync("common.translate", "翻译")
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
