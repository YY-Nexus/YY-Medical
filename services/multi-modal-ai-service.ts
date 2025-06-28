import type {
  ModalityConfig,
  AIModel,
  ModalityAnalysisResult,
  CrossModalAnalysisResult,
} from "../types/medical-records"

// 可用的影像模态配置
export const availableModalities: ModalityConfig[] = [
  {
    id: "ct",
    name: "CT扫描",
    icon: "layers",
    description: "计算机断层扫描，提供人体内部的横断面图像",
    supportedFormats: ["DICOM", "NIfTI"],
    isAvailable: true,
  },
  {
    id: "mri",
    name: "核磁共振成像",
    icon: "activity",
    description: "利用磁场和射频脉冲生成人体内部的详细图像",
    supportedFormats: ["DICOM", "NIfTI"],
    isAvailable: true,
  },
  {
    id: "xray",
    name: "X光片",
    icon: "image",
    description: "使用X射线的二维投影成像",
    supportedFormats: ["DICOM", "JPG", "PNG"],
    isAvailable: true,
  },
  {
    id: "ultrasound",
    name: "超声波",
    icon: "radio",
    description: "利用声波回声生成实时图像",
    supportedFormats: ["DICOM", "MP4", "AVI"],
    isAvailable: true,
  },
  {
    id: "pet",
    name: "PET扫描",
    icon: "zap",
    description: "正电子发射断层扫描，显示组织的代谢活动",
    supportedFormats: ["DICOM", "NIfTI"],
    isAvailable: true,
  },
  {
    id: "mammography",
    name: "乳腺X光检查",
    icon: "search",
    description: "专门用于乳房检查的低剂量X光检查",
    supportedFormats: ["DICOM", "JPG"],
    isAvailable: true,
  },
  {
    id: "pathology",
    name: "病理切片",
    icon: "grid",
    description: "组织样本的显微镜检查图像",
    supportedFormats: ["SVS", "TIFF", "JPG"],
    isAvailable: true,
  },
  {
    id: "endoscopy",
    name: "内窥镜检查",
    icon: "video",
    description: "使用内窥镜检查体内器官和腔体",
    supportedFormats: ["MP4", "AVI", "JPG"],
    isAvailable: false,
  },
]

// 可用的AI模型
export const availableAIModels: AIModel[] = [
  {
    id: "pulmonary-ct-analyzer",
    name: "肺部CT分析器",
    version: "2.3.0",
    modalities: ["ct"],
    description: "专门用于肺部CT扫描的分析，可检测结节、肺气肿和间质性肺病等",
    accuracy: 0.94,
    lastUpdated: "2023-09-15",
  },
  {
    id: "neuro-mri-analyzer",
    name: "神经系统MRI分析器",
    version: "1.8.5",
    modalities: ["mri"],
    description: "分析脑部和脊髓MRI，检测肿瘤、梗塞、脱髓鞘和萎缩等",
    accuracy: 0.91,
    lastUpdated: "2023-10-02",
  },
  {
    id: "chest-xray-analyzer",
    name: "胸部X光分析器",
    version: "3.2.1",
    modalities: ["xray"],
    description: "分析胸部X光片，检测肺炎、肺结核、心脏扩大等",
    accuracy: 0.89,
    lastUpdated: "2023-08-20",
  },
  {
    id: "abdominal-ultrasound-analyzer",
    name: "腹部超声分析器",
    version: "1.5.0",
    modalities: ["ultrasound"],
    description: "分析腹部超声图像，检测肝、胆、胰、脾和肾脏异常",
    accuracy: 0.87,
    lastUpdated: "2023-07-10",
  },
  {
    id: "multi-modal-thoracic-analyzer",
    name: "多模态胸部分析器",
    version: "2.0.0",
    modalities: ["ct", "xray", "pet"],
    description: "综合分析胸部的CT、X光和PET扫描，提供更全面的诊断",
    accuracy: 0.95,
    lastUpdated: "2023-11-05",
  },
  {
    id: "neuro-multi-modal-analyzer",
    name: "多模态神经系统分析器",
    version: "1.2.0",
    modalities: ["mri", "ct", "pet"],
    description: "综合分析脑部的MRI、CT和PET扫描，提供更全面的神经系统诊断",
    accuracy: 0.93,
    lastUpdated: "2023-10-28",
  },
]

// 模拟CT扫描的分析结果
export const mockCTAnalysisResult: ModalityAnalysisResult = {
  modalityId: "ct",
  modalityName: "CT扫描",
  findings: [
    {
      id: "ct-finding-1",
      modality: "ct",
      area: "右肺上叶",
      finding: "磨玻璃结节",
      size: "8mm x 6mm",
      confidence: 0.92,
      severity: "moderate",
      recommendation: "建议3个月后复查CT",
      coordinates: {
        x: 120,
        y: 85,
        width: 15,
        height: 15,
      },
    },
    {
      id: "ct-finding-2",
      modality: "ct",
      area: "左肺下叶",
      finding: "肺气肿早期征象",
      size: "区域性",
      confidence: 0.78,
      severity: "mild",
      recommendation: "临床随访，戒烟建议",
      coordinates: {
        x: 180,
        y: 150,
        width: 30,
        height: 25,
      },
    },
  ],
  processingTime: 12.5,
  modelId: "pulmonary-ct-analyzer",
  modelVersion: "2.3.0",
  timestamp: new Date().toISOString(),
}

// 模拟MRI扫描的分析结果
export const mockMRIAnalysisResult: ModalityAnalysisResult = {
  modalityId: "mri",
  modalityName: "核磁共振成像",
  findings: [
    {
      id: "mri-finding-1",
      modality: "mri",
      area: "右侧颞叶",
      finding: "小血管缺血性改变",
      size: "5mm",
      confidence: 0.85,
      severity: "mild",
      recommendation: "临床随访，控制血压和血脂",
      coordinates: {
        x: 110,
        y: 95,
        width: 10,
        height: 10,
      },
    },
  ],
  processingTime: 18.2,
  modelId: "neuro-mri-analyzer",
  modelVersion: "1.8.5",
  timestamp: new Date().toISOString(),
}

// 模拟X光片的分析结果
export const mockXRayAnalysisResult: ModalityAnalysisResult = {
  modalityId: "xray",
  modalityName: "X光片",
  findings: [
    {
      id: "xray-finding-1",
      modality: "xray",
      area: "右肺中野",
      finding: "斑片状阴影",
      confidence: 0.88,
      severity: "moderate",
      recommendation: "建议进一步CT检查",
      coordinates: {
        x: 130,
        y: 100,
        width: 25,
        height: 20,
      },
    },
    {
      id: "xray-finding-2",
      modality: "xray",
      area: "心影",
      finding: "轻度心影增大",
      confidence: 0.75,
      severity: "mild",
      recommendation: "建议心脏超声检查",
      coordinates: {
        x: 160,
        y: 140,
        width: 35,
        height: 30,
      },
    },
  ],
  processingTime: 8.7,
  modelId: "chest-xray-analyzer",
  modelVersion: "3.2.1",
  timestamp: new Date().toISOString(),
}

// 模拟跨模态分析结果
export const mockCrossModalAnalysisResult: CrossModalAnalysisResult = {
  id: "cross-modal-analysis-1",
  patientId: "P12345",
  modalityResults: [mockCTAnalysisResult, mockXRayAnalysisResult],
  integratedFindings: [
    {
      id: "integrated-finding-1",
      modality: "cross-modal",
      area: "右肺上叶",
      finding: "疑似早期肺癌",
      size: "8mm x 6mm",
      confidence: 0.89,
      severity: "severe",
      recommendation: "建议PET-CT检查和肺穿刺活检",
      details: "综合CT和X光结果，该结节具有恶性特征",
    },
    {
      id: "integrated-finding-2",
      modality: "cross-modal",
      area: "左肺下叶",
      finding: "慢性阻塞性肺疾病",
      confidence: 0.82,
      severity: "moderate",
      recommendation: "肺功能检查，支气管舒张剂治疗",
      details: "CT和X光均显示肺气肿征象",
    },
  ],
  confidenceScore: 0.91,
  analysisDate: new Date().toISOString(),
  clinicalContext: "50岁男性，吸烟史30年，近期咳嗽加重",
  recommendations: ["建议进行PET-CT检查", "肺功能检查评估", "戒烟干预", "3个月后复查胸部CT"],
}

// 模拟多模态AI分析服务
export const multiModalAIService = {
  // 获取可用模态
  getAvailableModalities: () => {
    return Promise.resolve(availableModalities)
  },

  // 获取可用AI模型
  getAvailableModels: () => {
    return Promise.resolve(availableAIModels)
  },

  // 获取特定模态的AI模型
  getModelsForModality: (modalityId: string) => {
    return Promise.resolve(availableAIModels.filter((model) => model.modalities.includes(modalityId)))
  },

  // 分析单个模态的图像
  analyzeModality: (modalityId: string, imageId: string, modelId?: string) => {
    // 模拟分析延迟
    return new Promise<ModalityAnalysisResult>((resolve) => {
      setTimeout(() => {
        switch (modalityId) {
          case "ct":
            resolve(mockCTAnalysisResult)
            break
          case "mri":
            resolve(mockMRIAnalysisResult)
            break
          case "xray":
            resolve(mockXRayAnalysisResult)
            break
          default:
            resolve({
              modalityId,
              modalityName: availableModalities.find((m) => m.id === modalityId)?.name || modalityId,
              findings: [],
              processingTime: 10.0,
              modelId: modelId || "default-model",
              modelVersion: "1.0.0",
              timestamp: new Date().toISOString(),
            })
        }
      }, 3000) // 模拟3秒的处理时间
    })
  },

  // 执行跨模态分析
  performCrossModalAnalysis: (modalityResults: ModalityAnalysisResult[], patientId?: string) => {
    // 模拟分析延迟
    return new Promise<CrossModalAnalysisResult>((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockCrossModalAnalysisResult,
          modalityResults,
          patientId,
        })
      }, 5000) // 模拟5秒的处理时间
    })
  },
}
