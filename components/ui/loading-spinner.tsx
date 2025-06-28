import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-medical-100 border-t-medical-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Loader2 className="h-5 w-5 text-medical-500 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  )
}
