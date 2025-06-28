"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalImagingUploader } from "./medical-imaging-uploader"
import { PrescriptionUploader } from "./prescription-uploader"
import { OCRService } from "./ocr-service"
import { DicomViewer } from "./dicom-viewer"
import { AIDiagnosis } from "./ai-diagnosis"
import { RecordAssociation } from "./record-association"
import { BatchProcessor } from "./batch-processor"
import { MultiModalAIDiagnosis } from "./multi-modal-ai-diagnosis"

export function MedicalRecordsClient() {
  const [activeTab, setActiveTab] = useState("imaging")
  const [selectedImage, setSelectedImage] = useState<string | undefined>()
  const [selectedPrescription, setSelectedPrescription] = useState<string | undefined>()
  const [patientId, setPatientId] = useState<string | undefined>()
  const [showDicomViewer, setShowDicomViewer] = useState(false)
  const [showAIDiagnosis, setShowAIDiagnosis] = useState(false)
  const [showMultiModalAI, setShowMultiModalAI] = useState(false)
  const [showOCR, setShowOCR] = useState(false)
  const [showAssociation, setShowAssociation] = useState(false)
  const [showBatchProcessor, setShowBatchProcessor] = useState(false)

  // 处理影像选择
  const handleImageSelect = (imagePath: string) => {
    setSelectedImage(imagePath)
    setShowDicomViewer(false)
    setShowAIDiagnosis(false)
    setShowMultiModalAI(false)
  }

  // 处理处方选择
  const handlePrescriptionSelect = (prescriptionPath: string) => {
    setSelectedPrescription(prescriptionPath)
    setShowOCR(false)
  }

  // 打开DICOM查看器
  const openDicomViewer = () => {
    if (selectedImage) {
      setShowDicomViewer(true)
      setShowAIDiagnosis(false)
      setShowMultiModalAI(false)
      setShowOCR(false)
      setShowAssociation(false)
      setShowBatchProcessor(false)
    }
  }

  // 打开AI诊断
  const openAIDiagnosis = () => {
    if (selectedImage) {
      setShowAIDiagnosis(true)
      setShowDicomViewer(false)
      setShowMultiModalAI(false)
      setShowOCR(false)
      setShowAssociation(false)
      setShowBatchProcessor(false)
    }
  }

  // 打开多模态AI诊断
  const openMultiModalAI = () => {
    setShowMultiModalAI(true)
    setShowDicomViewer(false)
    setShowAIDiagnosis(false)
    setShowOCR(false)
    setShowAssociation(false)
    setShowBatchProcessor(false)
  }

  // 打开OCR服务
  const openOCR = () => {
    if (selectedPrescription) {
      setShowOCR(true)
      setShowDicomViewer(false)
      setShowAIDiagnosis(false)
      setShowMultiModalAI(false)
      setShowAssociation(false)
      setShowBatchProcessor(false)
    }
  }

  // 打开病历关联
  const openAssociation = () => {
    setShowAssociation(true)
    setShowDicomViewer(false)
    setShowAIDiagnosis(false)
    setShowMultiModalAI(false)
    setShowOCR(false)
    setShowBatchProcessor(false)
  }

  // 打开批量处理
  const openBatchProcessor = () => {
    setShowBatchProcessor(true)
    setShowDicomViewer(false)
    setShowAIDiagnosis(false)
    setShowMultiModalAI(false)
    setShowOCR(false)
    setShowAssociation(false)
  }

  // 关闭所有工具面板
  const closeAllPanels = () => {
    setShowDicomViewer(false)
    setShowAIDiagnosis(false)
    setShowMultiModalAI(false)
    setShowOCR(false)
    setShowAssociation(false)
    setShowBatchProcessor(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">医疗记录管理中心</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="imaging">医学影像</TabsTrigger>
              <TabsTrigger value="prescriptions">处方管理</TabsTrigger>
            </TabsList>

            <TabsContent value="imaging" className="mt-4">
              <MedicalImagingUploader onImageSelect={handleImageSelect} selectedImage={selectedImage} />

              {selectedImage && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={openDicomViewer}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <span>打开DICOM查看器</span>
                  </button>

                  <button
                    onClick={openAIDiagnosis}
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                    <span>AI辅助诊断</span>
                  </button>

                  <button
                    onClick={openAssociation}
                    className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                  >
                    <span>关联到病历</span>
                  </button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="prescriptions" className="mt-4">
              <PrescriptionUploader
                onPrescriptionSelect={handlePrescriptionSelect}
                selectedPrescription={selectedPrescription}
              />

              {selectedPrescription && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={openOCR}
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center justify-center gap-2"
                  >
                    <span>OCR文字识别</span>
                  </button>

                  <button
                    onClick={openAssociation}
                    className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                  >
                    <span>关联到病历</span>
                  </button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-2">
            <button
              onClick={openMultiModalAI}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center gap-2"
            >
              <span>多模态AI诊断</span>
            </button>

            <button
              onClick={openBatchProcessor}
              className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition flex items-center justify-center gap-2"
            >
              <span>批量处理工具</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!showDicomViewer &&
            !showAIDiagnosis &&
            !showMultiModalAI &&
            !showOCR &&
            !showAssociation &&
            !showBatchProcessor && (
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-12 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">选择操作</h3>
                  <p className="text-gray-500">请从左侧选择医学影像或处方，然后选择要执行的操作</p>
                </div>
              </div>
            )}

          {showDicomViewer && selectedImage && (
            <div className="relative">
              <button
                onClick={closeAllPanels}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <DicomViewer imagePath={selectedImage} patientId={patientId} />
            </div>
          )}

          {showAIDiagnosis && selectedImage && (
            <div className="relative">
              <button
                onClick={closeAllPanels}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <AIDiagnosis selectedImage={selectedImage} patientId={patientId} />
            </div>
          )}

          {showMultiModalAI && (
            <div className="relative">
              <button
                onClick={closeAllPanels}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <MultiModalAIDiagnosis patientId={patientId} />
            </div>
          )}

          {showOCR && selectedPrescription && (
            <div className="relative">
              <button
                onClick={closeAllPanels}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <OCRService prescriptionPath={selectedPrescription} />
            </div>
          )}

          {showAssociation && (
            <div className="relative">
              <button
                onClick={closeAllPanels}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <RecordAssociation
                selectedImage={selectedImage}
                selectedPrescription={selectedPrescription}
                onPatientIdSelected={(id) => setPatientId(id)}
              />
            </div>
          )}

          {showBatchProcessor && (
            <div className="relative">
              <button
                onClick={closeAllPanels}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <BatchProcessor />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
