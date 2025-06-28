import type {
  ClinicalCase,
  CaseLibraryFilterOptions,
  CaseLibrarySortOption,
  CaseTag,
  CaseType,
  CaseSeverity,
  CaseStatus,
  CaseComment,
} from "../types/case-library"

// 模拟病例标签数据
const caseTags: CaseTag[] = [
  { id: "tag-1", name: "肺结节", color: "#3B82F6" },
  { id: "tag-2", name: "肺癌", color: "#EF4444" },
  { id: "tag-3", name: "肺炎", color: "#10B981" },
  { id: "tag-4", name: "肺气肿", color: "#F59E0B" },
  { id: "tag-5", name: "肺结核", color: "#8B5CF6" },
  { id: "tag-6", name: "胸腔积液", color: "#EC4899" },
  { id: "tag-7", name: "支气管扩张", color: "#6366F1" },
  { id: "tag-8", name: "间质性肺病", color: "#14B8A6" },
  { id: "tag-9", name: "肺栓塞", color: "#F97316" },
  { id: "tag-10", name: "气胸", color: "#A855F7" },
]

// 模拟典型病例数据
const clinicalCases: ClinicalCase[] = [
  {
    id: "case-1",
    title: "早期肺腺癌表现为磨玻璃结节的典型病例",
    patientInfo: {
      age: 62,
      gender: "女",
      occupation: "退休教师",
      medicalHistory: ["高血压(10年)", "2型糖尿病(5年)"],
      familyHistory: ["父亲肺癌"],
      allergies: ["青霉素"],
      lifestyle: ["不吸烟", "不饮酒"],
    },
    chiefComplaint: "体检发现右肺结节2周",
    presentIllness:
      "患者在常规体检中胸部CT发现右肺上叶磨玻璃结节，大小约1.2cm，边界清晰，无明显症状，无咳嗽、咳痰、咯血、胸痛等不适。",
    physicalExamination: ["生命体征平稳", "双肺呼吸音清晰", "未闻及干湿啰音", "心腹查体未见异常"],
    diagnosis: {
      primary: "右肺上叶磨玻璃结节，考虑早期肺腺癌",
      differential: ["炎性病变", "肺错构瘤", "肺结核"],
      icd10Code: "C34.102",
    },
    images: [
      {
        id: "img-1-1",
        url: "/placeholder.svg?key=i170j",
        type: "CT",
        description: "右肺上叶磨玻璃结节，大小约1.2cm，边界清晰",
        findings: ["右肺上叶磨玻璃结节", "无钙化", "无空洞", "无胸腔积液"],
        date: "2023-03-15",
      },
      {
        id: "img-1-2",
        url: "/placeholder.svg?key=hk4dz",
        type: "CT",
        description: "PET-CT显示右肺上叶结节轻度FDG摄取增高，SUVmax=2.3",
        findings: ["右肺上叶结节FDG摄取轻度增高", "无其他异常摄取灶"],
        date: "2023-03-20",
      },
    ],
    labTests: [
      {
        id: "lab-1-1",
        name: "CEA",
        value: "3.2",
        unit: "ng/mL",
        referenceRange: "0-5.0",
        isAbnormal: false,
        date: "2023-03-16",
      },
      {
        id: "lab-1-2",
        name: "CYFRA21-1",
        value: "2.1",
        unit: "ng/mL",
        referenceRange: "0-3.3",
        isAbnormal: false,
        date: "2023-03-16",
      },
      {
        id: "lab-1-3",
        name: "血常规",
        value: "正常",
        unit: "",
        referenceRange: "",
        isAbnormal: false,
        date: "2023-03-16",
      },
    ],
    treatments: [
      {
        id: "treatment-1-1",
        type: "手术",
        name: "胸腔镜下右肺上叶楔形切除术",
        description: "在全麻下行胸腔镜下右肺上叶楔形切除术，术中冰冻病理提示腺癌",
        outcome: "手术顺利，术后恢复良好",
        startDate: "2023-04-05",
      },
      {
        id: "treatment-1-2",
        type: "手术",
        name: "胸腔镜下右肺上叶切除术+纵隔淋巴结清扫术",
        description: "根据冰冻病理结果，继续行右肺上叶切除术和系统性纵隔淋巴结清扫",
        outcome: "手术顺利，术后恢复良好",
        startDate: "2023-04-05",
      },
    ],
    followUps: [
      {
        id: "followup-1-1",
        date: "2023-05-10",
        status: "改善",
        description: "患者恢复良好，切口愈合良好，无明显不适",
        findings: ["胸部CT未见新发病灶", "肺功能正常"],
        recommendations: ["定期随访", "3个月后复查胸部CT"],
      },
      {
        id: "followup-1-2",
        date: "2023-08-15",
        status: "稳定",
        description: "患者无明显不适，日常活动正常",
        findings: ["胸部CT未见复发或转移征象"],
        recommendations: ["继续定期随访", "6个月后复查胸部CT和肿瘤标志物"],
      },
    ],
    outcome: "术后病理确诊为微浸润性腺癌(MIA)，TNM分期T1aN0M0，IA1期。预后良好，无需辅助治疗，定期随访。",
    knowledgePoints: [
      {
        id: "kp-1-1",
        title: "磨玻璃结节(GGN)与早期肺腺癌",
        description:
          "磨玻璃结节是CT上表现为密度轻度增高但不掩盖血管和支气管轮廓的病变，是早期肺腺癌的常见表现。纯磨玻璃结节(pGGN)和部分实性结节(混合GGN)与不同病理亚型相关。",
        importance: 9,
        relatedNodeIds: ["imaging-ground-glass", "disease-lung-cancer"],
      },
      {
        id: "kp-1-2",
        title: "肺腺癌的病理分类",
        description:
          "根据IASLC/ATS/ERS分类，肺腺癌可分为原位腺癌(AIS)、微浸润性腺癌(MIA)和浸润性腺癌。AIS和MIA预后极佳，5年生存率接近100%。",
        importance: 8,
        relatedNodeIds: ["disease-lung-cancer"],
      },
      {
        id: "kp-1-3",
        title: "早期肺癌的外科治疗",
        description:
          "对于早期肺癌(尤其是AIS和MIA)，亚肺叶切除(如楔形切除或肺段切除)可能是合适的治疗选择，可以保留更多肺功能。但对于浸润性腺癌，肺叶切除+纵隔淋巴结清扫仍是标准治疗。",
        importance: 8,
        relatedNodeIds: ["disease-lung-cancer", "treatment-surgery"],
      },
    ],
    tags: [
      { id: "tag-1", name: "肺结节", color: "#3B82F6" },
      { id: "tag-2", name: "肺癌", color: "#EF4444" },
    ],
    type: "典型病例",
    severity: "中度",
    status: "已完成",
    createdBy: {
      id: "user-1",
      name: "张医生",
      role: "胸外科主任医师",
    },
    createdAt: "2023-04-20T08:30:00Z",
    updatedAt: "2023-08-20T14:15:00Z",
    viewCount: 328,
    saveCount: 45,
    comments: [
      {
        id: "comment-1-1",
        userId: "user-2",
        userName: "李医生",
        userRole: "放射科副主任医师",
        content:
          "这是一个非常典型的早期肺腺癌影像学表现。磨玻璃结节，尤其是混合型GGN，恶性的可能性很高。这个病例的处理非常规范，值得学习。",
        timestamp: "2023-05-10T09:45:00Z",
        replies: [
          {
            id: "reply-1-1-1",
            userId: "user-1",
            userName: "张医生",
            userRole: "胸外科主任医师",
            content: "谢谢李医生的评价。对于这类病例，多学科协作非常重要，放射科的精准诊断对治疗决策至关重要。",
            timestamp: "2023-05-10T10:20:00Z",
          },
        ],
      },
    ],
    relatedCaseIds: ["case-3"],
    relatedNodeIds: ["disease-lung-cancer", "imaging-ground-glass", "treatment-surgery"],
  },
  {
    id: "case-2",
    title: "肺结核引起的结节样病变病例",
    patientInfo: {
      age: 42,
      gender: "男",
      occupation: "建筑工人",
      medicalHistory: ["乙型肝炎病毒携带者"],
      familyHistory: ["无特殊"],
      allergies: ["无"],
      lifestyle: ["吸烟20年，每日1包", "偶尔饮酒"],
    },
    chiefComplaint: "咳嗽、低热3周",
    presentIllness:
      "患者3周前开始出现咳嗽，少量白痰，伴有低热(最高38.2℃)，夜间轻度盗汗，近1周感觉乏力，食欲下降，体重减轻约2kg。",
    physicalExamination: ["体温37.5℃", "右肺呼吸音稍减低", "未闻及明显干湿啰音", "余查体��见明显异常"],
    diagnosis: {
      primary: "肺结核",
      differential: ["肺癌", "肺炎", "肺真菌感染"],
      icd10Code: "A15.0",
    },
    images: [
      {
        id: "img-2-1",
        url: "/placeholder.svg?key=wgrc6",
        type: "CT",
        description: "右肺上叶结节样病变，周围有卫星病灶，部分呈树芽征",
        findings: ["右肺上叶结节", "卫星病灶", "树芽征", "右侧肺门淋巴结肿大"],
        date: "2023-02-10",
      },
    ],
    labTests: [
      {
        id: "lab-2-1",
        name: "T-SPOT.TB",
        value: "阳性",
        unit: "",
        referenceRange: "阴性",
        isAbnormal: true,
        date: "2023-02-12",
      },
      {
        id: "lab-2-2",
        name: "痰抗酸杆菌涂片",
        value: "阳性(1+)",
        unit: "",
        referenceRange: "阴性",
        isAbnormal: true,
        date: "2023-02-12",
      },
      {
        id: "lab-2-3",
        name: "血沉",
        value: "45",
        unit: "mm/h",
        referenceRange: "0-15",
        isAbnormal: true,
        date: "2023-02-12",
      },
    ],
    treatments: [
      {
        id: "treatment-2-1",
        type: "药物",
        name: "抗结核治疗",
        description: "异烟肼(0.3g qd) + 利福平(0.45g qd) + 吡嗪酰胺(0.5g tid) + 乙胺丁醇(0.75g qd)",
        dosage: "按标准剂量",
        duration: "2HRZE/4HR",
        outcome: "症状明显改善，影像学病灶吸收",
        sideEffects: ["轻度肝功能异常", "一过性视力模糊"],
        startDate: "2023-02-15",
        endDate: "2023-08-15",
      },
    ],
    followUps: [
      {
        id: "followup-2-1",
        date: "2023-04-20",
        status: "改善",
        description: "患者咳嗽、低热症状消失，食欲恢复，体重增加1.5kg",
        findings: ["胸部CT显示病灶明显吸收", "痰培养转阴"],
        recommendations: ["继续规律抗结核治疗", "定期复查肝功能"],
      },
      {
        id: "followup-2-2",
        date: "2023-08-25",
        status: "痊愈",
        description: "患者无不适症状，完成全程抗结核治疗",
        findings: ["胸部CT显示病灶明显吸收，残留纤维灶", "各项实验室检查正常"],
        recommendations: ["定期随访", "6个月后复查胸部CT"],
      },
    ],
    outcome:
      "经过6个月规范抗结核治疗，患者临床症状完全消失，影像学显示病灶明显吸收，残留少量纤维灶，痰培养持续阴性，判定为治愈。",
    knowledgePoints: [
      {
        id: "kp-2-1",
        title: "肺结核的影像学表现",
        description:
          "肺结核的CT表现多样，可表现为结节、浸润影、空洞、树芽征、纤维化等。结节型肺结核可能与肺癌影像学表现相似，需要鉴别诊断。",
        importance: 8,
        relatedNodeIds: ["disease-tuberculosis", "disease-lung-nodule"],
      },
      {
        id: "kp-2-2",
        title: "肺结核的诊断方法",
        description:
          "肺结核的诊断依赖于病原学检查(痰涂片、培养、核酸扩增)、免疫学检查(T-SPOT.TB、PPD)、影像学检查等综合判断。痰培养是金标准但耗时长。",
        importance: 9,
        relatedNodeIds: ["disease-tuberculosis", "exam-biopsy"],
      },
      {
        id: "kp-2-3",
        title: "肺结核的标准治疗方案",
        description:
          "初治肺结核的标准方案为2HRZE/4HR，即强化期2个月使用异烟肼、利福平、吡嗪酰胺和乙胺丁醇四联，继续期4个月使用异烟肼和利福平。全程治疗至少6个月。",
        importance: 9,
        relatedNodeIds: ["disease-tuberculosis"],
      },
    ],
    tags: [
      { id: "tag-1", name: "肺结节", color: "#3B82F6" },
      { id: "tag-5", name: "肺结核", color: "#8B5CF6" },
    ],
    type: "典型病例",
    severity: "中度",
    status: "已完成",
    createdBy: {
      id: "user-3",
      name: "王医生",
      role: "呼吸科主治医师",
    },
    createdAt: "2023-03-10T10:15:00Z",
    updatedAt: "2023-08-30T11:20:00Z",
    viewCount: 256,
    saveCount: 38,
    comments: [
      {
        id: "comment-2-1",
        userId: "user-4",
        userName: "赵医生",
        userRole: "感染科副主任医师",
        content:
          "这个病例很好地展示了肺结核的典型临床和影像学特点。值得注意的是，肺结核和肺癌在影像学上可能有重叠，需要结合病原学和免疫学检查进行鉴别。",
        timestamp: "2023-04-05T14:30:00Z",
      },
    ],
    relatedCaseIds: [],
    relatedNodeIds: ["disease-tuberculosis", "disease-lung-nodule", "pathophysiology-inflammation"],
  },
  {
    id: "case-3",
    title: "肺部磨玻璃结节随访进展为浸润性腺癌病例",
    patientInfo: {
      age: 58,
      gender: "男",
      occupation: "公司经理",
      medicalHistory: ["高血压(5年)", "高脂血症(3年)"],
      familyHistory: ["母亲乳腺癌"],
      allergies: ["无"],
      lifestyle: ["吸烟30年，每日1包", "社交饮酒"],
    },
    chiefComplaint: "体检发现左肺结节随访2年",
    presentIllness:
      "患者2年前体检发现左肺下叶小磨玻璃结节(0.8cm)，建议随访观察。近2年来定期复查胸部CT，结节逐渐增大并出现实性成分增加，目前大小约1.5cm，实性成分占比约60%。患者无明显症状。",
    physicalExamination: ["生命体征平稳", "双肺呼吸音清晰", "未闻及干湿啰音", "心腹查体未见异常"],
    diagnosis: {
      primary: "左肺下叶结节，考虑浸润性腺癌",
      differential: ["转移瘤", "肺错构瘤", "炎性假瘤"],
      icd10Code: "C34.302",
    },
    images: [
      {
        id: "img-3-1",
        url: "/placeholder.svg?key=4vlg0",
        type: "CT",
        description: "2年前：左肺下叶小磨玻璃结节，大小约0.8cm，实性成分<10%",
        findings: ["左肺下叶磨玻璃结节", "实性成分少", "边界清晰"],
        date: "2021-05-10",
      },
      {
        id: "img-3-2",
        url: "/placeholder.svg?key=m41uc",
        type: "CT",
        description: "当前：左肺下叶部分实性结节，大小约1.5cm，实性成分约60%",
        findings: ["左肺下叶部分实性结节", "实性成分明显增加", "边界略不规则"],
        date: "2023-05-15",
      },
    ],
    labTests: [
      {
        id: "lab-3-1",
        name: "CEA",
        value: "4.8",
        unit: "ng/mL",
        referenceRange: "0-5.0",
        isAbnormal: false,
        date: "2023-05-20",
      },
      {
        id: "lab-3-2",
        name: "CYFRA21-1",
        value: "3.5",
        unit: "ng/mL",
        referenceRange: "0-3.3",
        isAbnormal: true,
        date: "2023-05-20",
      },
    ],
    treatments: [
      {
        id: "treatment-3-1",
        type: "手术",
        name: "胸腔镜下左肺下叶切除术+纵隔淋巴结清扫术",
        description: "在全麻下行胸腔镜下左肺下叶切除术和系统性纵隔淋巴结清扫",
        outcome: "手术顺利，术后恢复良好",
        startDate: "2023-06-10",
      },
    ],
    followUps: [
      {
        id: "followup-3-1",
        date: "2023-07-15",
        status: "改善",
        description: "患者恢复良好，切口愈合良好，无明显不适",
        findings: ["胸部CT未见新发病灶", "肺功能轻度受限"],
        recommendations: ["定期随访", "3个月后复查胸部CT和肿瘤标志物"],
      },
    ],
    outcome:
      "术后病理确诊为浸润性腺癌(腺泡型为主)，TNM分期T1bN0M0，IA2期。因无高危因素，未行辅助治疗，定期随访。该病例展示了肺部磨玻璃结节随时间进展为浸润性腺癌的过程，强调了对肺部磨玻璃结节定期随访的重要性。",
    knowledgePoints: [
      {
        id: "kp-3-1",
        title: "肺部磨玻璃结节的自然史",
        description:
          "肺部磨玻璃结节可以长期稳定，也可能逐渐增大并出现实性成分增加，提示向浸润性腺癌进展。研究表明，结节增大和实性成分增加是恶性进展的重要指标。",
        importance: 9,
        relatedNodeIds: ["imaging-ground-glass", "disease-lung-cancer"],
      },
      {
        id: "kp-3-2",
        title: "肺部磨玻璃结节的随访策略",
        description:
          "对于小于6mm的纯磨玻璃结节，可每2-3年随访一次；对于6-10mm的纯磨玻璃结节，首次随访为6-12个月，然后每2年随访；对于部分实性结节，随访间隔应更短，通常为3-6个月。",
        importance: 8,
        relatedNodeIds: ["imaging-ground-glass", "treatment-follow-up"],
      },
      {
        id: "kp-3-3",
        title: "肺癌的TNM分期与治疗选择",
        description:
          "肺癌TNM分期是治疗决策的重要依据。早期肺癌(I-II期)以手术为主；局部晚期(III期)通常需要多学科综合治疗；晚期(IV期)以系统治疗为主，包括化疗、靶向治疗、免疫治疗等。",
        importance: 9,
        relatedNodeIds: ["disease-lung-cancer", "treatment-surgery", "treatment-chemotherapy", "treatment-radiation"],
      },
    ],
    tags: [
      { id: "tag-1", name: "肺结节", color: "#3B82F6" },
      { id: "tag-2", name: "肺癌", color: "#EF4444" },
    ],
    type: "教学病例",
    severity: "中度",
    status: "已完成",
    createdBy: {
      id: "user-1",
      name: "张医生",
      role: "胸外科主任医师",
    },
    createdAt: "2023-07-05T09:45:00Z",
    updatedAt: "2023-07-25T16:30:00Z",
    viewCount: 189,
    saveCount: 27,
    comments: [
      {
        id: "comment-3-1",
        userId: "user-5",
        userName: "刘医生",
        userRole: "肿瘤科主治医师",
        content:
          "这个病例很好地展示了肺部磨玻璃结节的自然进展过程。对于这类病例，定期随访非常重要，可以在适当的时机进行干预，避免错过最佳治疗时机。",
        timestamp: "2023-07-10T11:20:00Z",
      },
    ],
    relatedCaseIds: ["case-1"],
    relatedNodeIds: ["disease-lung-cancer", "imaging-ground-glass", "imaging-part-solid", "treatment-surgery"],
  },
]

// 典型病例库服务
export const caseLibraryService = {
  // 获取所有病例
  getAllCases: () => {
    return clinicalCases
  },

  // 根据ID获取特定病例
  getCaseById: (caseId: string) => {
    return clinicalCases.find((c) => c.id === caseId)
  },

  // 根据过滤条件获取病例
  getFilteredCases: (options: CaseLibraryFilterOptions) => {
    let filteredCases = [...clinicalCases]

    // 按搜索查询过滤
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase()
      filteredCases = filteredCases.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.diagnosis.primary.toLowerCase().includes(query) ||
          c.chiefComplaint.toLowerCase().includes(query) ||
          c.presentIllness.toLowerCase().includes(query),
      )
    }

    // 按标签过滤
    if (options.tags && options.tags.length > 0) {
      filteredCases = filteredCases.filter((c) => c.tags.some((tag) => options.tags?.includes(tag.id)))
    }

    // 按类型过滤
    if (options.type && options.type.length > 0) {
      filteredCases = filteredCases.filter((c) => options.type?.includes(c.type))
    }

    // 按严重程度过滤
    if (options.severity && options.severity.length > 0) {
      filteredCases = filteredCases.filter((c) => options.severity?.includes(c.severity))
    }

    // 按状态过滤
    if (options.status && options.status.length > 0) {
      filteredCases = filteredCases.filter((c) => options.status?.includes(c.status))
    }

    // 按日期范围过滤
    if (options.dateRange) {
      const { start, end } = options.dateRange
      filteredCases = filteredCases.filter(
        (c) => new Date(c.createdAt) >= new Date(start) && new Date(c.createdAt) <= new Date(end),
      )
    }

    // 按创建者过滤
    if (options.createdBy && options.createdBy.length > 0) {
      filteredCases = filteredCases.filter((c) => options.createdBy?.includes(c.createdBy.id))
    }

    // 按关联的知识图谱节点过滤
    if (options.relatedNodeIds && options.relatedNodeIds.length > 0) {
      filteredCases = filteredCases.filter((c) =>
        c.relatedNodeIds.some((nodeId) => options.relatedNodeIds?.includes(nodeId)),
      )
    }

    return filteredCases
  },

  // 根据排序选项排序病例
  sortCases: (cases: ClinicalCase[], sortOption: CaseLibrarySortOption) => {
    const casesCopy = [...cases]

    switch (sortOption) {
      case "最新添加":
        return casesCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "最多查看":
        return casesCopy.sort((a, b) => b.viewCount - a.viewCount)
      case "最多保存":
        return casesCopy.sort((a, b) => b.saveCount - a.saveCount)
      case "最新更新":
        return casesCopy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      case "严重程度":
        const severityOrder: Record<CaseSeverity, number> = {
          危重: 3,
          重度: 2,
          中度: 1,
          轻度: 0,
        }
        return casesCopy.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity])
      case "相关性":
        // 相关性排序需要额外的上下文，这里简单实现
        return casesCopy
      default:
        return casesCopy
    }
  },

  // 获取所有病例标签
  getAllTags: () => {
    return caseTags
  },

  // 获取所有病例类型
  getAllCaseTypes: (): CaseType[] => {
    return ["典型病例", "疑难病例", "教学病例", "研究病例"]
  },

  // 获取所有严重程度
  getAllSeverities: (): CaseSeverity[] => {
    return ["轻度", "中度", "重度", "危重"]
  },

  // 获取所有状态
  getAllStatuses: (): CaseStatus[] => {
    return ["进行中", "已完成", "已归档"]
  },

  // 根据知识图谱节点ID获取相关病例
  getCasesByNodeId: (nodeId: string) => {
    return clinicalCases.filter((c) => c.relatedNodeIds.includes(nodeId))
  },

  // 根据多个知识图谱节点ID获取相关病例
  getCasesByNodeIds: (nodeIds: string[]) => {
    return clinicalCases.filter((c) => c.relatedNodeIds.some((id) => nodeIds.includes(id)))
  },

  // 获取相关病例
  getRelatedCases: (caseId: string) => {
    const currentCase = clinicalCases.find((c) => c.id === caseId)
    if (!currentCase) return []

    // 首先获取直接关联的病例
    const directlyRelatedCases = clinicalCases.filter(
      (c) => c.id !== caseId && (c.relatedCaseIds.includes(caseId) || currentCase.relatedCaseIds.includes(c.id)),
    )

    // 如果直接关联的病例少于3个，添加基于相同标签和知识图谱节点的病例
    if (directlyRelatedCases.length < 3) {
      const currentTags = new Set(currentCase.tags.map((tag) => tag.id))
      const currentNodes = new Set(currentCase.relatedNodeIds)

      const indirectlyRelatedCases = clinicalCases.filter((c) => {
        if (c.id === caseId || directlyRelatedCases.some((rc) => rc.id === c.id)) return false

        // 计算标签和节点的重叠度
        const tagOverlap = c.tags.filter((tag) => currentTags.has(tag.id)).length
        const nodeOverlap = c.relatedNodeIds.filter((nodeId) => currentNodes.has(nodeId)).length

        // 如果有足够的重叠，认为是相关病例
        return tagOverlap > 0 || nodeOverlap > 0
      })

      // 按重叠度排序并限制数量
      const sortedIndirectCases = indirectlyRelatedCases
        .map((c) => {
          const tagOverlap = c.tags.filter((tag) => currentTags.has(tag.id)).length
          const nodeOverlap = c.relatedNodeIds.filter((nodeId) => currentNodes.has(nodeId)).length
          return { case: c, relevance: tagOverlap + nodeOverlap }
        })
        .sort((a, b) => b.relevance - a.relevance)
        .map((item) => item.case)

      return [...directlyRelatedCases, ...sortedIndirectCases].slice(0, 5)
    }

    return directlyRelatedCases
  },

  // 获取病例统计信息
  getCaseStats: () => {
    // 按类型统计
    const typeStats: Record<string, number> = {}
    clinicalCases.forEach((c) => {
      typeStats[c.type] = (typeStats[c.type] || 0) + 1
    })

    // 按严重程度统计
    const severityStats: Record<string, number> = {}
    clinicalCases.forEach((c) => {
      severityStats[c.severity] = (severityStats[c.severity] || 0) + 1
    })

    // 按标签统计
    const tagStats: Record<string, number> = {}
    clinicalCases.forEach((c) => {
      c.tags.forEach((tag) => {
        tagStats[tag.name] = (tagStats[tag.name] || 0) + 1
      })
    })

    // 按创建者统计
    const creatorStats: Record<string, number> = {}
    clinicalCases.forEach((c) => {
      creatorStats[c.createdBy.name] = (creatorStats[c.createdBy.name] || 0) + 1
    })

    return {
      totalCases: clinicalCases.length,
      typeStats,
      severityStats,
      tagStats,
      creatorStats,
      mostViewed: clinicalCases.sort((a, b) => b.viewCount - a.viewCount)[0],
      mostSaved: clinicalCases.sort((a, b) => b.saveCount - a.saveCount)[0],
    }
  },

  // 增加病例查看次数
  incrementViewCount: (caseId: string) => {
    const caseIndex = clinicalCases.findIndex((c) => c.id === caseId)
    if (caseIndex !== -1) {
      clinicalCases[caseIndex].viewCount += 1
      return clinicalCases[caseIndex].viewCount
    }
    return null
  },

  // 增加病例保存次数
  incrementSaveCount: (caseId: string) => {
    const caseIndex = clinicalCases.findIndex((c) => c.id === caseId)
    if (caseIndex !== -1) {
      clinicalCases[caseIndex].saveCount += 1
      return clinicalCases[caseIndex].saveCount
    }
    return null
  },

  // 添加病例评论
  addComment: (caseId: string, comment: Omit<CaseComment, "id" | "timestamp">) => {
    const caseIndex = clinicalCases.findIndex((c) => c.id === caseId)
    if (caseIndex !== -1) {
      const newComment: CaseComment = {
        ...comment,
        id: `comment-${Date.now()}`,
        timestamp: new Date().toISOString(),
      }
      clinicalCases[caseIndex].comments.push(newComment)
      return newComment
    }
    return null
  },
}
