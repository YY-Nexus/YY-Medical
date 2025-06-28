import { AIAssistedAnnotation } from "../../components/medical-records/ai-assisted-annotation"

export default function AIAnnotationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">AI辅助标注</h1>
      <AIAssistedAnnotation selectedImage="/placeholder.svg?key=7oh5i" modality="CT" anatomicalRegion="肺部" />
    </div>
  )
}
