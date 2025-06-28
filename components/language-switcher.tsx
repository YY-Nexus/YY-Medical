"use client"

import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useAutoTranslation } from "@/contexts/auto-translation-context"

export function LanguageSwitcher() {
  const { locale, setLocale, availableLocales, localeName } = useTranslation()
  const { isEnabled, setIsEnabled, clearCache } = useAutoTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">切换语言</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>选择语言</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableLocales.map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => setLocale(lang)} className={locale === lang ? "bg-accent" : ""}>
            {localeName[lang]}
            {locale === lang && <span className="ml-2">✓</span>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-sm">自动翻译</span>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} aria-label="自动翻译" />
        </div>
        <DropdownMenuItem onClick={clearCache}>清除翻译缓存</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
