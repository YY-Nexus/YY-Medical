"use client"

import { useParams, useRouter } from "next/navigation"
import { CaseDetail } from "@/components/case-library/case-detail"
import { PageTransition } from "@/components/ui/page-transition"

export default function CaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const caseId = params.id as string

  // 处理返回到病例列表
  const handleBackToList = () => {
    router.push("/case-library")
  }

  // 处理知识图谱节点点击
  const handleNodeClick = (nodeId: string) => {
    router.push(`/knowledge-graph?focusNode=${nodeId}`)
  }

  return (
    <PageTransition>
      <div className="container py-6">
        <CaseDetail caseId={caseId} onBack={handleBackToList} onNodeClick={handleNodeClick} />
      </div>
    </PageTransition>
  )
}
