"use client"

import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function EnhancedLanguageSwitcher() {
  const {
    locale,
    setLocale,
    availableLocales,
    localeName,
    isTranslating,
    isAutoTranslateEnabled,
    setAutoTranslateEnabled,
    clearTranslatedTexts,
  } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          {isTranslating && (
            <div className="absolute -top-1 -right-1">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <div className="flex items-center justify-between space-x-2 mb-4">
            <Label htmlFor="auto-translate" className="text-sm">
              自动翻译
            </Label>
            <Switch id="auto-translate" checked={isAutoTranslateEnabled} onCheckedChange={setAutoTranslateEnabled} />
          </div>

          <div className="text-xs text-muted-foreground mb-2">
            {isAutoTranslateEnabled ? "系统将自动翻译缺失的内容" : "仅显示已有的翻译内容"}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mb-2"
            onClick={() => {
              clearTranslatedTexts()
              setIsOpen(false)
            }}
          >
            清除翻译缓存
          </Button>
        </div>

        <div className="h-px bg-border my-1" />

        {availableLocales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className="flex items-center justify-between"
            onSelect={() => {
              setLocale(lang)
              setIsOpen(false)
            }}
          >
            <span>{localeName[lang]}</span>
            {locale === lang && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
