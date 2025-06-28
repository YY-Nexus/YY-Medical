"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { KnowledgeIntegration } from "./knowledge-integration"
import type { DiagnosticFinding } from "../../types/medical-records"

interface KnowledgeButtonProps {
  findings: DiagnosticFinding[]
  patientId?: string
  label?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function KnowledgeButton({
  findings,
  patientId,
  label = "医学知识库",
  variant = "outline",
  size = "default",
  className = "border-blue-200 text-blue-700 hover:bg-blue-50",
}: KnowledgeButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setError(null)
    }
  }

  const handleError = (message: string) => {
    setError(message)
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setIsOpen(true)}>
        <BookOpen className="mr-2 h-4 w-4" />
        {label}
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>医学知识库集成</DialogTitle>
          </DialogHeader>

          {error && (
            <div className="px-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="overflow-y-auto px-6 pb-6 flex-1">
            {findings.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">无诊断结果</h3>
                  <p className="text-gray-500">没有可用的诊断结果来查询医学知识库</p>
                </div>
              </div>
            ) : (
              <KnowledgeIntegration findings={findings} patientId={patientId} onError={handleError} />
            )}
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
