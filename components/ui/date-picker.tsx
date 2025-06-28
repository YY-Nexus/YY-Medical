"use client"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Locale } from "date-fns"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  locale?: Locale
  dateFormat?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "选择日期",
  className,
  locale = zhCN,
  dateFormat = "yyyy-MM-dd",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal h-8", !value && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {value ? format(value, dateFormat, { locale }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus locale={locale} />
      </PopoverContent>
    </Popover>
  )
}

// 添加DateRangePicker组件
interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange?: (date: Date | undefined) => void
  onEndDateChange?: (date: Date | undefined) => void
  className?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <DatePicker value={startDate} onChange={onStartDateChange} placeholder="开始日期" />
      <DatePicker value={endDate} onChange={onEndDateChange} placeholder="结束日期" />
    </div>
  )
}
