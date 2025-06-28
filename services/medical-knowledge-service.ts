// 定义医学知识库的数据类型
export interface DiseaseReference {
  id: string
  name: string
  description: string
  symptoms: string[]
  causes: string[]
  riskFactors: string[]
  complications: string[]
  diagnosticCriteria: string[]
  differentialDiagnosis: string[]
  prevalence?: string
  icd10Code?: string
}

export interface TreatmentGuideline {
  id: string
  diseaseId: string
  title: string
  recommendationLevel: "强烈推荐" | "推荐" | "可考虑" | "谨慎使用" | "不推荐"
  evidenceLevel: "A" | "B" | "C" | "D" | "E" // A最高，E最低
  description: string
  details: string
  contraindications?: string[]
  sideEffects?: string[]
  specialPopulations?: {
    population: string
    recommendations: string
  }[]
}

export interface MedicalReference {
  id: string
  title: string
  authors: string[]
  journal?: string
  publicationDate: string
  doi?: string
  url?: string
  abstract?: string
  diseaseIds: string[]
  treatmentIds: string[]
}

// 模拟医学知识库数据
const diseasesDatabase: DiseaseReference[] = [
  {
    id: "lung-nodule",
    name: "肺结节",
    description:
      "肺结节是肺部的小型圆形病变，直径通常小于3厘米。它们可能是良性的，如感染或炎症引起，也可能是恶性的，如早期肺癌。",
    symptoms: ["通常无症状", "如果位置靠近气道可能引起咳嗽", "偶尔可能引起胸痛"],
    causes: ["感染", "炎症", "良性肿瘤", "恶性肿瘤", "血管畸形"],
    riskFactors: ["吸烟", "职业暴露（如石棉、铀）", "家族肺癌史", "既往肺部疾病史"],
    complications: ["恶性转化", "出血", "感染"],
    diagnosticCriteria: [
      "影像学特征：边缘、密度、钙化、生长速度",
      "大小：通常<3cm",
      "PET-CT代谢活跃度",
      "活检病理结果",
    ],
    differentialDiagnosis: ["肺炎", "肺结核", "肺癌", "肺错构瘤", "肺血管畸形"],
    prevalence: "成人胸部CT检查中约15-30%可见肺结节",
    icd10Code: "R91.1",
  },
  {
    id: "emphysema",
    name: "肺气肿",
    description:
      "肺气肿是一种慢性肺部疾病，特征是肺泡壁破坏，导致肺泡异常扩大，肺弹性减退，呼气受阻。常见于慢性阻塞性肺疾病(COPD)患者。",
    symptoms: ["呼吸困难，尤其是活动时", "慢性咳嗽", "胸闷", "体重减轻", "疲劳"],
    causes: ["长期吸烟", "空气污染", "职业暴露", "遗传因素（如α1-抗胰蛋白酶缺乏）"],
    riskFactors: ["吸烟", "二手烟暴露", "空气污染", "职业粉尘和化学物质暴露", "年龄增长", "遗传因素"],
    complications: ["肺部感染", "肺心病", "气胸", "呼吸衰竭", "心力衰竭"],
    diagnosticCriteria: [
      "肺功能测试：FEV1/FVC比值降低",
      "影像学：肺气肿改变，如肺大泡、蜂窝肺",
      "临床症状：进行性呼吸困难",
    ],
    differentialDiagnosis: ["慢性支气管炎", "哮喘", "支气管扩张", "间质性肺疾病", "充血性心力衰竭"],
    prevalence: "全球约1.8亿人患有COPD，其中肺气肿是主要类型之一",
    icd10Code: "J43",
  },
  {
    id: "cerebral-ischemia",
    name: "脑缺血",
    description:
      "脑缺血是指由于脑血流减少导致的脑组织缺氧状态，可能是暂时性的（如短暂性脑缺血发作）或永久性的（如缺血性脑卒中）。",
    symptoms: ["突发的单侧肢体无力或麻木", "言语障碍", "视力障碍", "平衡和协调能力下降", "严重头痛", "意识障碍"],
    causes: ["动脉粥样硬化", "心源性栓塞", "小血管疾病", "血管炎", "血液高凝状态"],
    riskFactors: ["高血压", "糖尿病", "高脂血症", "吸烟", "心房颤动", "年龄增长", "既往脑卒中或短暂性脑缺血发作史"],
    complications: ["永久性神经功能缺损", "认知障碍", "抑郁", "癫痫", "肺炎", "深静脉血栓"],
    diagnosticCriteria: [
      "临床症状：突发的局灶性神经功能缺损",
      "影像学：CT或MRI显示缺血性改变",
      "血管评估：超声、CTA、MRA或DSA评估血管状态",
    ],
    differentialDiagnosis: ["脑出血", "脑肿瘤", "脑炎", "偏头痛", "癫痫", "代谢性脑病"],
    prevalence: "全球每年约有1500万人发生脑卒中，其中约80%为缺血性",
    icd10Code: "I63",
  },
  {
    id: "pneumonia",
    name: "肺炎",
    description:
      "肺炎是肺部的炎症，通常由感染引起，可影响一个或两个肺。它会导致肺泡充满液体或脓液，引起咳嗽、发热和呼吸困难。",
    symptoms: ["咳嗽（可能有痰）", "发热", "呼吸急促", "胸痛", "疲劳", "食欲不振"],
    causes: ["细菌（如肺炎链球菌）", "病毒（如流感病毒）", "真菌", "吸入异物"],
    riskFactors: [
      "年龄（非常年轻或老年）",
      "慢性疾病（如COPD、心脏病）",
      "吸烟",
      "免疫系统受损",
      "住院治疗",
      "使用呼吸机",
    ],
    complications: ["呼吸衰竭", "脓胸", "肺脓肿", "败血症", "急性呼吸窘迫综合征"],
    diagnosticCriteria: [
      "临床症状：咳嗽、发热、呼吸困难",
      "体格检查：肺部听诊异常",
      "影像学：胸部X光或CT显示肺部浸润",
      "实验室检查：白细��计数升高，痰培养阳性",
    ],
    differentialDiagnosis: ["支气管炎", "肺结核", "肺癌", "肺水肿", "肺栓塞"],
    prevalence: "全球每年约4.5亿例肺炎病例",
    icd10Code: "J18",
  },
  {
    id: "cardiomegaly",
    name: "心脏扩大",
    description: "心脏扩大（心肥大）是指心脏尺寸增大，可能是由于心脏肌肉增厚或心腔扩张。它通常是其他心脏问题的征兆。",
    symptoms: ["呼吸困难，尤其是活动时或平卧时", "水肿，尤其是腿部和脚踝", "心悸", "疲劳", "腹部肿胀"],
    causes: ["高血压", "冠心病", "心脏瓣膜疾病", "心肌病", "先天性心脏病", "心律失常"],
    riskFactors: ["高血压", "冠心病", "糖尿病", "肥胖", "家族史", "年龄增长"],
    complications: ["心力衰竭", "心律失常", "血栓形成", "猝死"],
    diagnosticCriteria: [
      "影像学：胸部X光、超声心动图、CT或MRI显示心脏增大",
      "心电图：可能显示左心室肥大",
      "临床症状：心力衰竭症状",
    ],
    differentialDiagnosis: ["心包积液", "纵隔肿瘤", "肺气肿导致的心脏位置改变"],
    prevalence: "心脏扩大常见于心力衰竭患者，全球约有2600万心力衰竭患者",
    icd10Code: "I51.7",
  },
]

const treatmentGuidelinesDatabase: TreatmentGuideline[] = [
  {
    id: "lung-nodule-treatment-1",
    diseaseId: "lung-nodule",
    title: "肺结节监测指南",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "对于低风险肺结节（<8mm，无高危因素），建议定期CT随访",
    details:
      "对于直径<6mm的实性结节，如无高危因素，无需常规随访；6-8mm结节建议6-12个月后���查CT，如稳定可延长随访间隔至18-24个月；>8mm结节考虑PET-CT或活检。",
    contraindications: ["妊娠期（应避免频繁CT检查）", "终末期疾病患者（随访意义有限）"],
    specialPopulations: [
      {
        population: "高危人群（重度吸烟者，有肺癌家族史）",
        recommendations: "可考虑缩短随访间隔，或更早进行PET-CT或活检",
      },
    ],
  },
  {
    id: "lung-nodule-treatment-2",
    diseaseId: "lung-nodule",
    title: "肺结节手术治疗",
    recommendationLevel: "推荐",
    evidenceLevel: "B",
    description: "对于高度怀疑恶性的肺结节，建议手术切除",
    details:
      "对于临床高度怀疑恶性的肺结节（>8mm，边缘不规则，生长迅速，PET-CT阳性），在患者身体条件允许的情况下，建议手术切除。可选择胸腔镜微创手术（VATS）或开胸手术。",
    contraindications: ["严重心肺功能不全", "多发转移灶", "患者拒绝手术"],
    sideEffects: ["手术风险", "肺功能下降", "术后疼痛", "感染风险"],
    specialPopulations: [
      {
        population: "老年患者",
        recommendations: "应充分评估手术耐受性，优先考虑微创手术",
      },
    ],
  },
  {
    id: "emphysema-treatment-1",
    diseaseId: "emphysema",
    title: "肺气肿戒烟干预",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "对所有肺气肿患者实施戒烟干���是最重要的治疗措施",
    details:
      "戒烟可显著减缓肺功能下降速度，改善症状和预后。应结合行为干预和药物治疗（如尼古丁替代疗法、安非他酮、伐尼克兰）提高戒烟成功率。",
    specialPopulations: [
      {
        population: "有精神疾病史患者",
        recommendations: "使用伐尼克兰或安非他酮时需密切监测精神状态变化",
      },
    ],
  },
  {
    id: "emphysema-treatment-2",
    diseaseId: "emphysema",
    title: "肺气肿支气管扩张剂治疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "长效支气管扩张剂是肺气肿症状控制的基础治疗",
    details:
      "可使用长效β2激动剂(LABA)和/或长效抗胆碱能药物(LAMA)。对于症状明显或急性加重风险高的患者，推荐LABA与LAMA联合使用。",
    contraindications: ["对药物成分过敏", "严重心律失常"],
    sideEffects: ["心悸", "口干", "头痛", "尿潴留风险"],
    specialPopulations: [
      {
        population: "合并心血管疾病患者",
        recommendations: "使用β2激动剂时需监测心率和血压",
      },
    ],
  },
  {
    id: "emphysema-treatment-3",
    diseaseId: "emphysema",
    title: "肺气肿氧疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "对于重度肺气肿伴慢性呼吸衰竭的患者，长期家庭氧疗可改善生存率",
    details:
      "当静息状态下动脉血氧分压≤55mmHg或氧饱和度≤88%时，建议长期氧疗（每天>15小时）。也适用于动脉血氧分压为56-59mmHg但伴有肺动脉高压、右心衰竭或红细胞增多的患者。",
    contraindications: ["持续吸烟（相对禁忌，存在安全隐患）"],
    specialPopulations: [
      {
        population: "需要高流量氧疗的患者",
        recommendations: "考虑使用便携式氧气浓缩器以提高活动能力和依从性",
      },
    ],
  },
  {
    id: "cerebral-ischemia-treatment-1",
    diseaseId: "cerebral-ischemia",
    title: "急性缺血性脑卒中溶栓治疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "对于符合条件的急性缺血性脑卒中患者，静脉注射rt-PA溶栓治疗可改善预后",
    details:
      "对于发病时间<4.5小时的急性缺血性脑卒中患者，在排除禁忌症后，推荐静脉注射rt-PA（0.9mg/kg，最大剂量90mg）溶栓治疗。发病后尽早治疗效果更佳。",
    contraindications: [
      "颅内出血",
      "大面积脑梗死（ASPECTS评分<6分）",
      "近期重大手术",
      "活动性内出血",
      "血小板<100,000/mm³",
      "INR>1.7",
      "使用肝素导致的aPTT延长",
      "血糖<50mg/dL或>400mg/dL",
    ],
    sideEffects: ["颅内出血风险", "全身出血风险", "过敏反应"],
    specialPopulations: [
      {
        population: "80岁以上老年患者",
        recommendations: "需权衡获益与风险，但年龄本身不是禁忌症",
      },
      {
        population: "轻微卒中症状患者",
        recommendations: "需个体化评估溶栓获益与风险",
      },
    ],
  },
  {
    id: "cerebral-ischemia-treatment-2",
    diseaseId: "cerebral-ischemia",
    title: "脑缺血二级预防抗血小板治疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "非心源性缺血性脑卒中或TIA患者应长期服用抗血小板药物预防复发",
    details:
      "可选用阿司匹林（75-100mg/日）、氯吡格雷（75mg/日）或阿司匹林联合双嘧达莫缓释剂。急性期（首次发病后21天内）可考虑短期双联抗血小板治疗（阿司匹林+氯吡格雷），之后转为单药治疗。",
    contraindications: ["活动性消化道溃疡或出血", "对药物成分过敏"],
    sideEffects: ["胃肠道不适", "出血风险增加", "皮疹"],
    specialPopulations: [
      {
        population: "有出血高风险的患者",
        recommendations: "考虑使用质子泵抑制剂减少胃肠道出血风险",
      },
    ],
  },
  {
    id: "pneumonia-treatment-1",
    diseaseId: "pneumonia",
    title: "社区获得性肺炎抗生素治疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "对于社区获得性肺炎，应根据严重程度和风险因素选择适当的抗生素治疗",
    details:
      "轻度社区获得性肺炎（门诊治疗）：首选口服阿莫西林或多西环素；中重度（需住院）：β-内酰胺类联合大环内酯类或呼吸喹诺酮类；重症（ICU）：β-内酰胺类联合大环内酯类或呼吸喹诺酮类，考虑覆盖铜绿假单胞菌。",
    contraindications: ["对药物成分过敏"],
    sideEffects: ["胃肠道不适", "过敏反应", "艰难梭菌感染风险", "药物相互作用"],
    specialPopulations: [
      {
        population: "老年患者",
        recommendations: "注意药物剂量调整和肾功能监测",
      },
      {
        population: "有耐药风险的患者",
        recommendations: "考虑覆盖耐药病原体的经验性治疗",
      },
    ],
  },
  {
    id: "cardiomegaly-treatment-1",
    diseaseId: "cardiomegaly",
    title: "心脏扩大的病因治疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "心脏扩大的治疗应针对原发病因",
    details:
      "高血压性心脏病：控制血压（目标<130/80mmHg）；冠心病：抗血小板、他汀类、β阻滞剂、血运重建；瓣膜性心脏病：药物治疗或瓣膜修复/置换；扩张型心肌病：标准心力衰竭治疗。",
    specialPopulations: [
      {
        population: "妊娠期患者",
        recommendations: "避免使用ACEI/ARB，可考虑甲基多巴、拉贝洛尔等",
      },
    ],
  },
  {
    id: "cardiomegaly-treatment-2",
    diseaseId: "cardiomegaly",
    title: "心力衰竭标准药物治疗",
    recommendationLevel: "强烈推荐",
    evidenceLevel: "A",
    description: "对于心脏扩大伴射血分数降低的心力衰竭，推荐四大类药物治疗",
    details:
      "ACEI/ARB/ARNI：减轻心脏负荷，逆转重构；β阻滞剂：减慢心率，改善心肌能量代谢；醛固酮拮抗剂：抑制心肌纤维化；SGLT2抑制剂：减轻心脏负荷，改善预后。根据患者情况可加用利尿剂控制症状。",
    contraindications: [
      "ACEI/ARB/ARNI：高钾血症、严重肾功能不全、双侧肾动脉狭窄",
      "β阻滞剂：严重心动过缓、高度房室传导阻滞",
      "醛固酮拮抗剂：严重肾功能不全、高钾血症",
    ],
    sideEffects: [
      "ACEI/ARB：咳嗽、低血压、肾功能恶化、高钾血症",
      "β阻滞剂：乏力、心动过缓、支气管痉挛",
      "醛固酮拮抗剂：高钾血症、男性乳腺发育",
      "SGLT2抑制剂：生殖道感染、酮症",
    ],
    specialPopulations: [
      {
        population: "老年患者",
        recommendations: "从小剂量开始，根据耐受性逐渐增加",
      },
      {
        population: "肾功能不全患者",
        recommendations: "密切监测肾功能和电解质，调整用药剂量",
      },
    ],
  },
]

const medicalReferencesDatabase: MedicalReference[] = [
  {
    id: "ref-1",
    title: "Evaluation of the Solitary Pulmonary Nodule",
    authors: ["Gould MK", "Donington J", "Lynch WR", "et al"],
    journal: "Chest",
    publicationDate: "2013-05",
    doi: "10.1378/chest.12-2351",
    abstract: "本指南提供了对孤立性肺结节评估的最新建议，包括影像学随访策略、PET-CT应用和活检指征。",
    diseaseIds: ["lung-nodule"],
    treatmentIds: ["lung-nodule-treatment-1", "lung-nodule-treatment-2"],
  },
  {
    id: "ref-2",
    title: "Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease",
    authors: ["Global Initiative for Chronic Obstructive Lung Disease (GOLD)"],
    publicationDate: "2023",
    url: "https://goldcopd.org",
    abstract: "GOLD指南提供了COPD（包括肺气肿）的最新诊断和治疗建议，包括药物治疗、非药物治疗和急性加重管理。",
    diseaseIds: ["emphysema"],
    treatmentIds: ["emphysema-treatment-1", "emphysema-treatment-2", "emphysema-treatment-3"],
  },
  {
    id: "ref-3",
    title: "Guidelines for the Early Management of Patients With Acute Ischemic Stroke",
    authors: ["Powers WJ", "Rabinstein AA", "Ackerson T", "et al"],
    journal: "Stroke",
    publicationDate: "2019-12",
    doi: "10.1161/STR.0000000000000211",
    abstract:
      "美国心脏协会/美国卒中协会指南，提供了急性缺血性脑卒中的最新治疗建议，包括溶栓和机械取栓的适应症和时间窗。",
    diseaseIds: ["cerebral-ischemia"],
    treatmentIds: ["cerebral-ischemia-treatment-1"],
  },
  {
    id: "ref-4",
    title: "Diagnosis and Treatment of Adults with Community-acquired Pneumonia",
    authors: ["Metlay JP", "Waterer GW", "Long AC", "et al"],
    journal: "American Journal of Respiratory and Critical Care Medicine",
    publicationDate: "2019-10",
    doi: "10.1164/rccm.201908-1581ST",
    abstract: "美国胸科学会/美国感染病学会指南，提供了社区获得性肺炎的诊断和治疗建议，包括抗生素选择和疗程。",
    diseaseIds: ["pneumonia"],
    treatmentIds: ["pneumonia-treatment-1"],
  },
  {
    id: "ref-5",
    title: "2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure",
    authors: ["McDonagh TA", "Metra M", "Adamo M", "et al"],
    journal: "European Heart Journal",
    publicationDate: "2021-09",
    doi: "10.1093/eurheartj/ehab368",
    abstract:
      "欧洲心脏病学会指南，提供了心力衰竭（包括心脏扩大）的最新诊断和治疗建议，包括药物治疗、器械治疗和生活方式干预。",
    diseaseIds: ["cardiomegaly"],
    treatmentIds: ["cardiomegaly-treatment-1", "cardiomegaly-treatment-2"],
  },
]

// 医学知识库服务
export const medicalKnowledgeService = {
  // 根据疾病名称或关键词搜索疾病信息
  searchDiseases: (query: string) => {
    const normalizedQuery = query.toLowerCase()
    return diseasesDatabase.filter(
      (disease) =>
        disease.name.toLowerCase().includes(normalizedQuery) ||
        disease.description.toLowerCase().includes(normalizedQuery) ||
        disease.symptoms.some((symptom) => symptom.toLowerCase().includes(normalizedQuery)) ||
        disease.icd10Code?.toLowerCase().includes(normalizedQuery),
    )
  },

  // 获取特定疾病的详细信息
  getDiseaseById: (diseaseId: string) => {
    return diseasesDatabase.find((disease) => disease.id === diseaseId)
  },

  // 获取与特定疾病相关的治疗指南
  getTreatmentGuidelinesForDisease: (diseaseId: string) => {
    return treatmentGuidelinesDatabase.filter((guideline) => guideline.diseaseId === diseaseId)
  },

  // 获取与特定疾病相关的医学参考文献
  getReferencesForDisease: (diseaseId: string) => {
    return medicalReferencesDatabase.filter((reference) => reference.diseaseIds.includes(diseaseId))
  },

  // 根据诊断结果查找相关疾病信息
  findDiseasesByDiagnosticFindings: (findings: string[]) => {
    const matchedDiseases: { disease: DiseaseReference; relevanceScore: number }[] = []

    // 对每个诊断发现，在疾病数据库中查找相关疾病
    findings.forEach((finding) => {
      const normalizedFinding = finding.toLowerCase()

      diseasesDatabase.forEach((disease) => {
        // 计算相关性分数
        let relevanceScore = 0

        // 检查疾病名称
        if (disease.name.toLowerCase().includes(normalizedFinding)) {
          relevanceScore += 10
        }

        // 检查疾病描述
        if (disease.description.toLowerCase().includes(normalizedFinding)) {
          relevanceScore += 5
        }

        // 检查症状
        const matchedSymptoms = disease.symptoms.filter((symptom) => symptom.toLowerCase().includes(normalizedFinding))
        relevanceScore += matchedSymptoms.length * 3

        // 检查诊断标准
        const matchedCriteria = disease.diagnosticCriteria.filter((criteria) =>
          criteria.toLowerCase().includes(normalizedFinding),
        )
        relevanceScore += matchedCriteria.length * 4

        // 如果有相关性，添加到结果中
        if (relevanceScore > 0) {
          const existingMatch = matchedDiseases.find((match) => match.disease.id === disease.id)
          if (existingMatch) {
            existingMatch.relevanceScore += relevanceScore
          } else {
            matchedDiseases.push({ disease, relevanceScore })
          }
        }
      })
    })

    // 按相关性分数排序
    return matchedDiseases.sort((a, b) => b.relevanceScore - a.relevanceScore)
  },

  // 获取所有疾病
  getAllDiseases: () => {
    return diseasesDatabase
  },

  // 获取所有治疗指南
  getAllTreatmentGuidelines: () => {
    return treatmentGuidelinesDatabase
  },

  // 获取所有医学参考文献
  getAllReferences: () => {
    return medicalReferencesDatabase
  },

  // 获取疾病的相关症状
  getRelatedSymptoms: (diseaseId: string) => {
    const disease = diseasesDatabase.find((d) => d.id === diseaseId)
    return disease ? disease.symptoms : []
  },

  // 根据症状查找可能的疾病
  findDiseasesBySymptoms: (symptoms: string[]) => {
    const matchedDiseases: { disease: DiseaseReference; relevanceScore: number }[] = []

    symptoms.forEach((symptom) => {
      const normalizedSymptom = symptom.toLowerCase()

      diseasesDatabase.forEach((disease) => {
        const matchedSymptoms = disease.symptoms.filter((s) => s.toLowerCase().includes(normalizedSymptom))

        if (matchedSymptoms.length > 0) {
          const relevanceScore = matchedSymptoms.length / disease.symptoms.length

          const existingMatch = matchedDiseases.find((m) => m.disease.id === disease.id)
          if (existingMatch) {
            existingMatch.relevanceScore += relevanceScore
          } else {
            matchedDiseases.push({ disease, relevanceScore })
          }
        }
      })
    })

    return matchedDiseases.sort((a, b) => b.relevanceScore - a.relevanceScore)
  },

  // 获取治疗指南的详细信息
  getTreatmentGuidelineById: (guidelineId: string) => {
    return treatmentGuidelinesDatabase.find((guideline) => guideline.id === guidelineId)
  },

  // 获取参考文献的详细信息
  getReferenceById: (referenceId: string) => {
    return medicalReferencesDatabase.find((reference) => reference.id === referenceId)
  },

  // 根据ICD-10代码查找疾病
  findDiseaseByICD10: (icd10Code: string) => {
    return diseasesDatabase.find((disease) => disease.icd10Code?.toLowerCase() === icd10Code.toLowerCase())
  },

  // 获取与特定治疗指南相关的参考文献
  getReferencesForTreatmentGuideline: (guidelineId: string) => {
    return medicalReferencesDatabase.filter((reference) => reference.treatmentIds.includes(guidelineId))
  },

  // 根据严重程度过滤治疗指南
  filterTreatmentGuidelinesByRecommendationLevel: (diseaseId: string, level: string) => {
    return treatmentGuidelinesDatabase.filter(
      (guideline) => guideline.diseaseId === diseaseId && guideline.recommendationLevel === level,
    )
  },

  // 根据证据级别过滤治疗指南
  filterTreatmentGuidelinesByEvidenceLevel: (diseaseId: string, level: string) => {
    return treatmentGuidelinesDatabase.filter(
      (guideline) => guideline.diseaseId === diseaseId && guideline.evidenceLevel === level,
    )
  },
}
