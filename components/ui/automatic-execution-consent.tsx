"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Bot, Clock } from "lucide-react"

interface AutomaticExecutionConsentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConsent: (consented: boolean) => void
}

export function AutomaticExecutionConsent({ 
  open, 
  onOpenChange, 
  onConsent 
}: AutomaticExecutionConsentProps) {
  const [understood, setUnderstood] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleAgree = () => {
    onConsent(true)
    onOpenChange(false)
  }

  const handleDisagree = () => {
    onConsent(false)
    onOpenChange(false)
  }

  // Reset checkboxes when dialog opens
  useEffect(() => {
    if (open) {
      setUnderstood(false)
      setAgreed(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            自动执行功能
          </DialogTitle>
          <DialogDescription className="text-left space-y-2">
            <p>
              系统将启用自动执行功能，包括但不限于：
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>自动保存表单和编辑内容</li>
              <li>OCR识别结果自动处理</li>
              <li>任务失败时自动重试</li>
              <li>自动备份系统数据</li>
              <li>资质自动验证</li>
              <li>AI模型自动部署</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">重要提示</p>
                <p>
                  启用自动执行功能将减少人工干预，提高工作效率，但请确保您理解各项功能的作用和潜在影响。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="understood" 
                checked={understood}
                onCheckedChange={(checked) => setUnderstood(checked === true)}
              />
              <Label htmlFor="understood" className="text-sm leading-relaxed">
                我已理解自动执行功能的作用和影响
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="agreed" 
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="agreed" className="text-sm leading-relaxed">
                我同意启用自动执行功能，并允许系统在必要时自动执行相关操作
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDisagree}>
            不同意
          </Button>
          <Button 
            onClick={handleAgree}
            disabled={!understood || !agreed}
          >
            同意，并允许自动执行
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}