import { Suspense } from "react"
import { DoctorCertificationMain } from "@/components/certifications/doctor-certification-main"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function CertificationSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="flex h-screen">
        {/* 左侧骨架 */}
        <div className="w-80 border-r border-blue-200 bg-white/80 p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>

        {/* 主内容骨架 */}
        <div className="flex-1 p-6">
          <Skeleton className="h-12 w-full mb-6" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧骨架 */}
        <div className="w-64 border-l border-blue-200 bg-white/80 p-4">
          <Skeleton className="h-6 w-full mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DoctorCertificationPage() {
  return (
    <Suspense fallback={<CertificationSkeleton />}>
      <DoctorCertificationMain />
    </Suspense>
  )
}
