// 影像特征类型定义

export type ModalityType = "CT" | "MRI" | "X光" | "超声" | "PET" | "内窥镜" | "病理"

export type AnatomicalRegion =
  | "头部"
  | "胸部"
  | "腹部"
  | "骨骼"
  | "心脏"
  | "肺部"
  | "肝脏"
  | "肾脏"
  | "脑部"
  | "脊柱"
  | "关节"
  | "血管"

export type DensityType = "高密度" | "低密度" | "等密度" | "混合密度"
export type EnhancementPattern = "均匀强化" | "不均匀强化" | "环形强化" | "无强化" | "延迟强化"
export type MRISignalIntensity = "T1高信号" | "T1低信号" | "T2高信号" | "T2低信号" | "弥散受限" | "弥散不受限"
export type BorderType = "光滑" | "分叶" | "毛刺" | "浸润" | "模糊" | "清晰"
export type ShapeType = "圆形" | "椭圆形" | "不规则" | "分叶状" | "结节状" | "片状" | "条带状"
export type CalcificationType = "点状钙化" | "斑状钙化" | "弧形钙化" | "爆米花样钙化" | "无钙化"
export type VascularityType = "高血供" | "低血供" | "无血供" | "异常血管"
export type TextureType = "均质" | "不均质" | "囊性" | "实性" | "混合性" | "蜂窝状" | "磨玻璃样"

// 基础影像特征接口
export interface ImagingFeature {
  id: string
  name: string
  description: string
  modalities: ModalityType[] // 适用的影像模态
  anatomicalRegions: AnatomicalRegion[] // 适用的解剖区域
  associatedDiseaseIds: string[] // 关联的疾病ID
  keyCharacteristics: string[] // 关键特征描述
  differentialFeatures: string[] // 鉴别特征
  imageExamples?: string[] // 示例图像URL
}

// CT特征
export interface CTFeature extends ImagingFeature {
  density?: DensityType
  enhancement?: EnhancementPattern
  calcification?: CalcificationType
  border?: BorderType
  shape?: ShapeType
  hounsfield?: {
    min: number
    max: number
  }
}

// MRI特征
export interface MRIFeature extends ImagingFeature {
  t1Signal?: MRISignalIntensity
  t2Signal?: MRISignalIntensity
  diffusionRestriction?: boolean
  enhancement?: EnhancementPattern
  border?: BorderType
  shape?: ShapeType
}

// X光特征
export interface XRayFeature extends ImagingFeature {
  opacity?: "高密度" | "低密度"
  border?: BorderType
  shape?: ShapeType
  calcification?: CalcificationType
  silhouetteSign?: boolean
  airBronchogram?: boolean
}

// 超声特征
export interface UltrasoundFeature extends ImagingFeature {
  echogenicity?: "高回声" | "低回声" | "等回声" | "无回声" | "混合回声"
  border?: BorderType
  shape?: ShapeType
  vascularity?: VascularityType
  posteriorAcoustic?: "增强" | "衰减" | "无变化"
}

// 影像特征与疾病关联
export interface FeatureDiseaseAssociation {
  featureId: string
  diseaseId: string
  confidence: number // 0-1之间的置信度
  description: string // 关联描述
  differentialDiagnosis: string[] // 鉴别诊断
  references: string[] // 参考文献ID
}

// 影像标记
export interface ImageMarker {
  id: string
  imageId: string
  featureId: string
  coordinates: {
    x: number
    y: number
    width?: number
    height?: number
  }
  description?: string
  createdBy: string
  createdAt: string
}

// 影像学发现
export interface ImagingFinding {
  id: string
  patientId: string
  studyId: string
  modality: ModalityType
  anatomicalRegion: AnatomicalRegion
  description: string
  features: string[] // 特征ID列表
  possibleDiagnoses: {
    diseaseId: string
    confidence: number
  }[]
  markers: ImageMarker[]
  reportedBy: string
  reportedAt: string
}
