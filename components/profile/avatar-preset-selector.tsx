"use client"

import { useState } from "react"
import Image from "next/image"
import { AVATAR_PRESETS } from "@/types/avatar-presets"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from "lucide-react"

interface AvatarPresetSelectorProps {
  onSelect: (avatarPath: string) => void
  currentAvatar?: string
  className?: string
}

export function AvatarPresetSelector({ onSelect, currentAvatar, className }: AvatarPresetSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(currentAvatar)

  const handleSelect = (path: string) => {
    setSelectedAvatar(path)
  }

  const handleConfirm = () => {
    if (selectedAvatar) {
      onSelect(selectedAvatar)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={cn("text-xs", className)}>
          选择预设头像
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>选择预设头像</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
            {AVATAR_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className={cn(
                  "relative flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all",
                  selectedAvatar === preset.path
                    ? "border-medical-500 bg-medical-50 ring-2 ring-medical-500 ring-opacity-50"
                    : "border-gray-200 hover:border-medical-300 hover:bg-gray-50",
                )}
                onClick={() => handleSelect(preset.path)}
              >
                <div className="relative w-20 h-20 mb-2">
                  <Image
                    src={preset.path || "/placeholder.svg"}
                    alt={preset.name}
                    fill
                    className="object-cover rounded-full"
                  />
                  {selectedAvatar === preset.path && (
                    <div className="absolute -top-1 -right-1 bg-medical-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">{preset.name}</span>
                <span className="text-xs text-gray-500">{preset.description}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedAvatar}>
            确认选择
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
