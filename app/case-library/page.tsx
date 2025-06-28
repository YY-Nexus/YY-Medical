"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CaseBrowser } from "@/components/case-library/case-browser"
import { CaseDetail } from "@/components/case-library/case-detail"
import { PageTransition } from "@/components/ui/page-transition"

export default function CaseLibraryPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [nodeId, setNodeId] = useState<string | null>(null)

  // 从URL参数中获取caseId和nodeId
  useEffect(() => {
    const caseId = searchParams.get("caseId")
    const node = searchParams.get("nodeId")

    if (caseId) {
      setSelectedCaseId(caseId)
    }

    if (node) {
      setNodeId(node)
    }
  }, [searchParams])

  // 处理病例选择
  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId)
    // 更新URL，但不刷新页面
    router.push(`/case-library?caseId=${caseId}${nodeId ? `&nodeId=${nodeId}` : ""}`, { scroll: false })
  }

  // 处理返回到病例列表
  const handleBackToList = () => {
    setSelectedCaseId(null)
    // 更新URL，但不刷新页面
    router.push(`/case-library${nodeId ? `?nodeId=${nodeId}` : ""}`, { scroll: false })
  }

  // 处理知识图谱节点点击
  const handleNodeClick = (nodeId: string) => {
    router.push(`/knowledge-graph?focusNode=${nodeId}`)
  }

  return (
    <PageTransition>
      <div className="container py-6">
        {selectedCaseId ? (
          <CaseDetail caseId={selectedCaseId} onBack={handleBackToList} onNodeClick={handleNodeClick} />
        ) : (
          <CaseBrowser initialNodeIds={nodeId ? [nodeId] : []} onCaseSelect={handleCaseSelect} />
        )}
      </div>
    </PageTransition>
  )
}
