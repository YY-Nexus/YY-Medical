import type {
  ImagingFeature,
  CTFeature,
  MRIFeature,
  XRayFeature,
  UltrasoundFeature,
  FeatureDiseaseAssociation,
  ModalityType,
  AnatomicalRegion,
} from "../types/imaging-features"
import { medicalKnowledgeService, type DiseaseReference } from "./medical-knowledge-service"

// 模拟CT特征数据库
const ctFeaturesDatabase: CTFeature[] = [
  {
    id: "ct-feature-1",
    name: "磨玻璃结节",
    description:
      "磨玻璃结节(Ground-glass nodule, GGN)是指CT上显示为局灶性、密度略高于肺实质的模糊阴影，其内可见支气管血管束穿行，边界清晰或模糊。",
    modalities: ["CT"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["lung-nodule", "lung-adenocarcinoma", "pneumonia"],
    keyCharacteristics: ["密度介于正常肺实质与实性结节之间", "边界可清晰可模糊", "内部可见血管和支气管影"],
    differentialFeatures: ["纯磨玻璃与混合磨玻璃的区分", "单发与多发的区分", "大小变化的观察"],
    density: "混合密度",
    border: "清晰",
    shape: "圆形",
    hounsfield: {
      min: -600,
      max: -300,
    },
    imageExamples: ["/examples/ggo-nodule.jpg"],
  },
  {
    id: "ct-feature-2",
    name: "肺气肿改变",
    description: "肺气肿在CT上表现为肺实质密度减低，呈黑色区域，常伴有肺大泡形成，肺血管减少和变细。",
    modalities: ["CT"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["emphysema", "copd"],
    keyCharacteristics: ["肺实质密度减低", "肺大泡形成", "肺血管减少和变细"],
    differentialFeatures: ["与囊性支气管扩张的区分", "与蜂窝肺的区分", "与淋巴管平滑肌瘤病的区分"],
    density: "低密度",
    border: "模糊",
    shape: "不规则",
    hounsfield: {
      min: -950,
      max: -850,
    },
    imageExamples: ["/examples/emphysema.jpg"],
  },
  {
    id: "ct-feature-3",
    name: "肺实变",
    description: "肺实变是指肺泡腔内充满液体、细胞或组织，导致肺组织密度增高，在CT上表现为高密度阴影，常见于肺炎。",
    modalities: ["CT"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["pneumonia", "pulmonary-edema", "lung-cancer"],
    keyCharacteristics: ["密度增高", "支气管充气征", "边界模糊"],
    differentialFeatures: ["与肺不张的区分", "与肺水肿的区分", "与肺癌的区分"],
    density: "高密度",
    border: "模糊",
    shape: "片状",
    hounsfield: {
      min: 0,
      max: 100,
    },
    imageExamples: ["/examples/consolidation.jpg"],
  },
  {
    id: "ct-feature-4",
    name: "肺间质改变",
    description:
      "肺间质改变在CT上表现为网格状、线状或结节状影，常见于间质性肺疾病，如特发性肺纤维化、结缔组织病相关间质性肺疾病等。",
    modalities: ["CT"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["pulmonary-fibrosis", "interstitial-lung-disease"],
    keyCharacteristics: ["网格状影", "蜂窝状改变", "牵拉性支气管扩张", "胸膜下分布"],
    differentialFeatures: ["与肺水肿的区分", "与淋巴管癌病的区分", "与肺泡蛋白沉着症的区分"],
    density: "高密度",
    border: "模糊",
    shape: "网格状",
    hounsfield: {
      min: -600,
      max: -200,
    },
    imageExamples: ["/examples/interstitial-changes.jpg"],
  },
  {
    id: "ct-feature-5",
    name: "支气管扩张",
    description: "支气管扩张在CT上表现为支气管内径增宽，管壁增厚，常呈现'戒指征'和'电车轨征'。",
    modalities: ["CT"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["bronchiectasis", "cystic-fibrosis"],
    keyCharacteristics: ["支气管内径增宽", "管壁增厚", "戒指征", "电车轨征"],
    differentialFeatures: ["与囊性肺疾病的区分", "与蜂窝肺的区分", "与肺气肿的区分"],
    density: "混合密度",
    border: "清晰",
    shape: "条带状",
    hounsfield: {
      min: -800,
      max: -600,
    },
    imageExamples: ["/examples/bronchiectasis.jpg"],
  },
]

// 模拟MRI特征数据库
const mriFeaturesDatabase: MRIFeature[] = [
  {
    id: "mri-feature-1",
    name: "脑梗死",
    description:
      "急性脑梗死在MRI上表现为DWI高信号，ADC低信号（弥散受限），T2和FLAIR序列上呈高信号，T1序列上呈等或低信号。",
    modalities: ["MRI"],
    anatomicalRegions: ["脑部"],
    associatedDiseaseIds: ["cerebral-ischemia", "stroke"],
    keyCharacteristics: ["DWI高信号", "ADC低信号", "T2/FLAIR高信号", "血管分布区域"],
    differentialFeatures: ["与脑肿瘤的区分", "与脑炎的区分", "与脱髓鞘病变的区分"],
    t1Signal: "T1低信号",
    t2Signal: "T2高信号",
    diffusionRestriction: true,
    enhancement: "无强化",
    border: "模糊",
    shape: "不规则",
    imageExamples: ["/examples/cerebral-infarction.jpg"],
  },
  {
    id: "mri-feature-2",
    name: "脑胶质瘤",
    description: "脑胶质瘤在MRI上表现为T1低信号，T2和FLAIR高信号，常伴有水肿，高级别胶质瘤常有不规则强化，坏死和出血。",
    modalities: ["MRI"],
    anatomicalRegions: ["脑部"],
    associatedDiseaseIds: ["glioma", "brain-tumor"],
    keyCharacteristics: ["T1低信号", "T2/FLAIR高信号", "不规则强化", "水肿", "坏死", "出血"],
    differentialFeatures: ["与脑转移瘤的区分", "与脑脓肿的区分", "与脱髓鞘病变的区分"],
    t1Signal: "T1低信号",
    t2Signal: "T2高信号",
    diffusionRestriction: false,
    enhancement: "不均匀强化",
    border: "浸润",
    shape: "不规则",
    imageExamples: ["/examples/glioma.jpg"],
  },
  {
    id: "mri-feature-3",
    name: "脑膜瘤",
    description: "脑膜瘤在MRI上表现为T1等信号，T2等或高信号，均匀强烈强化，常有硬脑膜尾征，可见钙化和囊变。",
    modalities: ["MRI"],
    anatomicalRegions: ["脑部"],
    associatedDiseaseIds: ["meningioma"],
    keyCharacteristics: ["T1等信号", "T2等或高信号", "均匀强烈强化", "硬脑膜尾征", "钙化", "囊变"],
    differentialFeatures: ["与神经鞘瘤的区分", "与转移瘤的区分", "与硬脑膜转移的区分"],
    t1Signal: "T1等信号",
    t2Signal: "T2等信号",
    diffusionRestriction: false,
    enhancement: "均匀强化",
    border: "清晰",
    shape: "圆形",
    imageExamples: ["/examples/meningioma.jpg"],
  },
]

// 模拟X光特征数据库
const xrayFeaturesDatabase: XRayFeature[] = [
  {
    id: "xray-feature-1",
    name: "肺炎实变影",
    description: "肺炎在X光上表现为斑片状、片状或大片状致密影，边缘模糊，可见气管支气管充气征。",
    modalities: ["X光"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["pneumonia"],
    keyCharacteristics: ["斑片状或片状致密影", "边缘模糊", "气管支气管充气征"],
    differentialFeatures: ["与肺水肿的区分", "与肺不张的区分", "与肺癌的区分"],
    opacity: "高密度",
    border: "模糊",
    shape: "片状",
    silhouetteSign: true,
    airBronchogram: true,
    imageExamples: ["/examples/pneumonia-xray.jpg"],
  },
  {
    id: "xray-feature-2",
    name: "气胸",
    description: "气胸在X光上表现为肺外周透亮区，无肺纹理，可见肺萎陷线。",
    modalities: ["X光"],
    anatomicalRegions: ["肺部"],
    associatedDiseaseIds: ["pneumothorax"],
    keyCharacteristics: ["肺外周透亮区", "无肺纹理", "肺萎陷线"],
    differentialFeatures: ["与大疱的区分", "与纵隔气肿的区分", "与皮下气肿的区分"],
    opacity: "低密度",
    border: "清晰",
    shape: "不规则",
    silhouetteSign: false,
    airBronchogram: false,
    imageExamples: ["/examples/pneumothorax-xray.jpg"],
  },
]

// 模拟超声特征数据库
const ultrasoundFeaturesDatabase: UltrasoundFeature[] = [
  {
    id: "us-feature-1",
    name: "甲状腺结节",
    description:
      "甲状腺结节在超声上可表现为低回声、等回声、高回声或混合回声结节，边界清晰或模糊，可伴有钙化、血流信号等。",
    modalities: ["超声"],
    anatomicalRegions: ["头部"],
    associatedDiseaseIds: ["thyroid-nodule", "thyroid-cancer"],
    keyCharacteristics: ["回声改变", "边界特征", "钙化", "血流信号", "形态"],
    differentialFeatures: ["良恶性结节的区分", "与甲状腺囊肿的区分", "与甲状腺炎的区分"],
    echogenicity: "低回声",
    border: "不规则",
    shape: "不规则",
    vascularity: "高血供",
    posteriorAcoustic: "无变化",
    imageExamples: ["/examples/thyroid-nodule-us.jpg"],
  },
  {
    id: "us-feature-2",
    name: "肝脏囊肿",
    description: "肝脏囊肿在超声上表现为无回声区，边界清晰，后方回声增强，无血流信号。",
    modalities: ["超声"],
    anatomicalRegions: ["腹部", "肝脏"],
    associatedDiseaseIds: ["liver-cyst"],
    keyCharacteristics: ["无回声", "边界清晰", "后方回声增强", "无血流信号"],
    differentialFeatures: ["与肝脓肿的区分", "与肝血管瘤的区分", "与胆管囊肿的区分"],
    echogenicity: "无回声",
    border: "清晰",
    shape: "圆形",
    vascularity: "无血供",
    posteriorAcoustic: "增强",
    imageExamples: ["/examples/liver-cyst-us.jpg"],
  },
]

// 模拟特征-疾病关联数据库
const featureDiseaseAssociationsDatabase: FeatureDiseaseAssociation[] = [
  {
    featureId: "ct-feature-1",
    diseaseId: "lung-nodule",
    confidence: 0.9,
    description: "磨玻璃结节是肺结节的常见CT表现，尤其是早期肺腺癌常表现为磨玻璃结节。",
    differentialDiagnosis: ["炎症", "出血", "非特异性间质性肺炎"],
    references: ["ref-1", "ref-6"],
  },
  {
    featureId: "ct-feature-2",
    diseaseId: "emphysema",
    confidence: 0.95,
    description: "肺气肿的典型CT表现是肺实质密度减低，呈黑色区域，常伴有肺大泡形成。",
    differentialDiagnosis: ["囊性支气管扩张", "蜂窝肺", "淋巴管平滑肌瘤病"],
    references: ["ref-2"],
  },
  {
    featureId: "ct-feature-3",
    diseaseId: "pneumonia",
    confidence: 0.85,
    description: "肺实变是肺炎的典型CT表现，表现为肺组织密度增高，在CT上表现为高密度阴影。",
    differentialDiagnosis: ["肺不张", "肺水肿", "肺癌"],
    references: ["ref-4"],
  },
  {
    featureId: "mri-feature-1",
    diseaseId: "cerebral-ischemia",
    confidence: 0.9,
    description: "急性脑梗死在MRI上的典型表现是DWI高信号，ADC低信号（弥散受限），T2和FLAIR序列上呈高信号。",
    differentialDiagnosis: ["脑肿瘤", "脑炎", "脱髓鞘病变"],
    references: ["ref-3"],
  },
  {
    featureId: "xray-feature-1",
    diseaseId: "pneumonia",
    confidence: 0.8,
    description: "肺炎在X光上典型表现为斑片状、片状或大片状致密影，边缘模糊，可见气管支气管充气征。",
    differentialDiagnosis: ["肺水肿", "肺不张", "肺癌"],
    references: ["ref-4"],
  },
  {
    featureId: "us-feature-1",
    diseaseId: "thyroid-nodule",
    confidence: 0.85,
    description:
      "甲状腺结节在超声上可表现为低回声、等回声、高回声或混合回声结节，边界清晰或模糊，可伴有钙化、血流信号等。",
    differentialDiagnosis: ["甲状腺囊肿", "甲状腺炎"],
    references: ["ref-7"],
  },
]

// 合并所有特征数据库
const allFeaturesDatabase: ImagingFeature[] = [
  ...ctFeaturesDatabase,
  ...mriFeaturesDatabase,
  ...xrayFeaturesDatabase,
  ...ultrasoundFeaturesDatabase,
]

// 影像特征服务
export const imagingFeatureService = {
  // 获取所有影像特征
  getAllFeatures: () => {
    return allFeaturesDatabase
  },

  // 根据ID获取特征
  getFeatureById: (id: string) => {
    return allFeaturesDatabase.find((feature) => feature.id === id)
  },

  // 根据模态获取特征
  getFeaturesByModality: (modality: ModalityType) => {
    return allFeaturesDatabase.filter((feature) => feature.modalities.includes(modality))
  },

  // 根据解剖区域获取特征
  getFeaturesByAnatomicalRegion: (region: AnatomicalRegion) => {
    return allFeaturesDatabase.filter((feature) => feature.anatomicalRegions.includes(region))
  },

  // 根据疾病ID获取相关特征
  getFeaturesByDiseaseId: (diseaseId: string) => {
    return allFeaturesDatabase.filter((feature) => feature.associatedDiseaseIds.includes(diseaseId))
  },

  // 根据特征ID获取关联的疾病
  getAssociatedDiseasesByFeatureId: (featureId: string) => {
    const feature = allFeaturesDatabase.find((f) => f.id === featureId)
    if (!feature) return []

    const diseases: { disease: DiseaseReference; confidence: number }[] = []
    feature.associatedDiseaseIds.forEach((diseaseId) => {
      const disease = medicalKnowledgeService.getDiseaseById(diseaseId)
      const association = featureDiseaseAssociationsDatabase.find(
        (a) => a.featureId === featureId && a.diseaseId === diseaseId,
      )
      if (disease && association) {
        diseases.push({ disease, confidence: association.confidence })
      }
    })

    return diseases.sort((a, b) => b.confidence - a.confidence)
  },

  // 获取特征与疾病的关联详情
  getFeatureDiseaseAssociation: (featureId: string, diseaseId: string) => {
    return featureDiseaseAssociationsDatabase.find(
      (association) => association.featureId === featureId && association.diseaseId === diseaseId,
    )
  },

  // 根据多个特征ID预测可能的疾病
  predictDiseasesByFeatures: (featureIds: string[]) => {
    const diseaseScores: { [diseaseId: string]: number } = {}

    // 计算每个疾病的累积置信度分数
    featureIds.forEach((featureId) => {
      const associations = featureDiseaseAssociationsDatabase.filter((a) => a.featureId === featureId)
      associations.forEach((association) => {
        const { diseaseId, confidence } = association
        if (diseaseScores[diseaseId]) {
          diseaseScores[diseaseId] += confidence
        } else {
          diseaseScores[diseaseId] = confidence
        }
      })
    })

    // 将分数转换为概率（归一化）
    const totalScore = Object.values(diseaseScores).reduce((sum, score) => sum + score, 0)
    const predictions: { diseaseId: string; disease: DiseaseReference | null; probability: number }[] = []

    Object.entries(diseaseScores).forEach(([diseaseId, score]) => {
      const disease = medicalKnowledgeService.getDiseaseById(diseaseId)
      predictions.push({
        diseaseId,
        disease,
        probability: totalScore > 0 ? score / totalScore : 0,
      })
    })

    return predictions.sort((a, b) => b.probability - a.probability)
  },

  // 搜索特征
  searchFeatures: (query: string) => {
    const normalizedQuery = query.toLowerCase()
    return allFeaturesDatabase.filter(
      (feature) =>
        feature.name.toLowerCase().includes(normalizedQuery) ||
        feature.description.toLowerCase().includes(normalizedQuery) ||
        feature.keyCharacteristics.some((char) => char.toLowerCase().includes(normalizedQuery)),
    )
  },

  // 获取特定模态和解剖区域的特征
  getFeaturesByModalityAndRegion: (modality: ModalityType, region: AnatomicalRegion) => {
    return allFeaturesDatabase.filter(
      (feature) => feature.modalities.includes(modality) && feature.anatomicalRegions.includes(region),
    )
  },

  // 获取所有CT特征
  getAllCTFeatures: () => {
    return ctFeaturesDatabase
  },

  // 获取所有MRI特征
  getAllMRIFeatures: () => {
    return mriFeaturesDatabase
  },

  // 获取所有X光特征
  getAllXRayFeatures: () => {
    return xrayFeaturesDatabase
  },

  // 获取所有超声特征
  getAllUltrasoundFeatures: () => {
    return ultrasoundFeaturesDatabase
  },

  // 获取所有特征-疾病关联
  getAllFeatureDiseaseAssociations: () => {
    return featureDiseaseAssociationsDatabase
  },
}
