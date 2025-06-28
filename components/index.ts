// 桶文件 (Barrel file) - 简化导入
// 这种方式可以让我们从 @/components 直接导入组件，而不需要指定完整路径

// UI 组件
export * from "./ui/button"
export * from "./ui/card"
export * from "./ui/input"
export * from "./ui/label"
export * from "./ui/select"
export * from "./ui/checkbox"
export * from "./ui/radio-group"
export * from "./ui/textarea"
export * from "./ui/toast"
export * from "./ui/tooltip"
export * from "./ui/dialog"
export * from "./ui/dropdown-menu"
export * from "./ui/tabs"
export * from "./ui/table"
export * from "./ui/loading-spinner"
export * from "./ui/progress"
export * from "./ui/calendar"
export * from "./ui/date-picker"
export * from "./ui/popover"
export * from "./ui/medical-button"
export * from "./ui/medical-card"
export * from "./ui/responsive-medical-card"
export * from "./ui/advanced-search"
export * from "./ui/loading-fallback"
export * from "./ui/chart"

// 布局组件
export * from "./layout/page-header"
export * from "./layout/sidebar"
export * from "./layout/main-nav"
export * from "./layout/mobile-nav"
export * from "./layout/breadcrumb"
export * from "./layout/global-navigation"

// 认证组件
export * from "./auth/login-form"
export * from "./auth/register-form"
export * from "./auth/auth-guard"
export * from "./auth/forgot-password-form"
export * from "./auth/reset-password-form"

// 患者相关组件
export * from "./patients/patient-list"
export * from "./patients/patient-details"
export * from "./patients/add-patient-dialog"
export * from "./patients/patient-groups-client"
export * from "./patients/followup-client"
export * from "./patients/medical-records-client"

// 医疗记录组件
export * from "./medical-records/medical-imaging-uploader"
export * from "./medical-records/prescription-uploader"
export * from "./medical-records/batch-processor"
export * from "./medical-records/medical-records-client"
export * from "./medical-records/ai-model-selector"
export * from "./medical-records/multi-modal-ai-diagnosis"
export * from "./medical-records/modality-specific-analysis"
export * from "./medical-records/cross-modal-analysis"
export * from "./medical-records/ocr-service"
export * from "./medical-records/knowledge-integration"
export * from "./medical-records/knowledge-button"
export * from "./medical-records/3d-medical-viewer"
export * from "./medical-records/dicom-viewer"
export * from "./medical-records/ai-diagnosis"
export * from "./medical-records/record-association"

// AI 模型组件
export * from "./ai-model/model-overview"
export * from "./ai-model/model-performance"
export * from "./ai-model/model-integration"
export * from "./ai-model/ai-model-client"
export * from "./ai-model/model-performance-client"
export * from "./ai-model/model-management"
export * from "./ai-model/model-version-history"
export * from "./ai-model/model-deployment"
export * from "./ai-model/model-monitoring"
export * from "./ai-model/model-navigation"

// 导出 ModelDeployment 组件 (默认导出需要单独处理)
export { default as ModelDeployment } from "./model-deployment/ModelDeployment"

// 其他组件...
