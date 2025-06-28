// 多中心研究协作服务
export interface ResearchCenter {
  id: string
  name: string
  institution: string
  country: string
  city: string
  principalInvestigator: {
    name: string
    email: string
    phone: string
    credentials: string[]
  }
  capabilities: string[]
  certifications: string[]
  activeStudies: number
  totalPatients: number
  status: "active" | "inactive" | "pending"
}

export interface MultiCenterStudy {
  id: string
  title: string
  description: string
  phase: "I" | "II" | "III" | "IV"
  status: "planning" | "recruiting" | "active" | "completed" | "suspended"
  leadCenter: string
  participatingCenters: string[]
  primaryEndpoint: string
  secondaryEndpoints: string[]
  inclusionCriteria: string[]
  exclusionCriteria: string[]
  targetEnrollment: number
  currentEnrollment: number
  startDate: string
  estimatedCompletionDate: string
  dataStandards: {
    format: string
    version: string
    requirements: string[]
  }
  ethicsApproval: {
    centralIRB: boolean
    localApprovals: {
      centerId: string
      approvalDate: string
      expiryDate: string
      status: "approved" | "pending" | "expired"
    }[]
  }
  dataSharing: {
    policy: string
    restrictions: string[]
    accessLevel: "open" | "restricted" | "private"
  }
}

export interface DataStandardization {
  id: string
  name: string
  version: string
  description: string
  dataElements: {
    name: string
    type: string
    format: string
    required: boolean
    validation: string[]
  }[]
  mappingRules: {
    sourceField: string
    targetField: string
    transformation: string
  }[]
  qualityChecks: {
    rule: string
    severity: "error" | "warning" | "info"
    description: string
  }[]
}

// 模拟研究中心数据
const mockResearchCenters: ResearchCenter[] = [
  {
    id: "center-001",
    name: "北京协和医院临床研究中心",
    institution: "北京协和医院",
    country: "中国",
    city: "北京",
    principalInvestigator: {
      name: "张教授",
      email: "zhang@pumch.cn",
      phone: "+86-10-69156114",
      credentials: ["MD", "PhD", "主任医师"],
    },
    capabilities: ["肿瘤学", "心血管", "神经科学", "药物代谢"],
    certifications: ["GCP", "ISO 14155", "CFDA"],
    activeStudies: 15,
    totalPatients: 2500,
    status: "active",
  },
  {
    id: "center-002",
    name: "上海交通大学医学院附属瑞金医院",
    institution: "瑞金医院",
    country: "中国",
    city: "上海",
    principalInvestigator: {
      name: "李教授",
      email: "li@rjh.com.cn",
      phone: "+86-21-64370045",
      credentials: ["MD", "PhD", "博士生导师"],
    },
    capabilities: ["内分泌", "血液病", "消化科", "影像学"],
    certifications: ["GCP", "ISO 14155"],
    activeStudies: 12,
    totalPatients: 1800,
    status: "active",
  },
  {
    id: "center-003",
    name: "广州中山大学附属第一医院",
    institution: "中山一院",
    country: "中国",
    city: "广州",
    principalInvestigator: {
      name: "王教授",
      email: "wang@mail.sysu.edu.cn",
      phone: "+86-20-87755766",
      credentials: ["MD", "PhD", "长江学者"],
    },
    capabilities: ["器官移植", "微创外科", "重症医学"],
    certifications: ["GCP", "AAALAC"],
    activeStudies: 8,
    totalPatients: 1200,
    status: "active",
  },
]

const mockMultiCenterStudies: MultiCenterStudy[] = [
  {
    id: "study-001",
    title: "新型抗癌药物多中心随机对照试验",
    description: "评估新型靶向药物在晚期肺癌患者中的疗效和安全性",
    phase: "III",
    status: "recruiting",
    leadCenter: "center-001",
    participatingCenters: ["center-001", "center-002", "center-003"],
    primaryEndpoint: "总生存期(OS)",
    secondaryEndpoints: ["无进展生存期(PFS)", "客观缓解率(ORR)", "安全性评估"],
    inclusionCriteria: ["年龄18-75岁", "组织学确诊的非小细胞肺癌", "ECOG评分0-2分", "预期生存期≥3个月"],
    exclusionCriteria: ["既往接受过同类药物治疗", "严重心肝肾功能不全", "活动性感染", "妊娠或哺乳期女性"],
    targetEnrollment: 300,
    currentEnrollment: 156,
    startDate: "2024-01-15",
    estimatedCompletionDate: "2025-12-31",
    dataStandards: {
      format: "CDISC SDTM",
      version: "3.3",
      requirements: ["eCRF标准化", "数据质量检查", "审计追踪"],
    },
    ethicsApproval: {
      centralIRB: true,
      localApprovals: [
        {
          centerId: "center-001",
          approvalDate: "2023-12-01",
          expiryDate: "2024-12-01",
          status: "approved",
        },
        {
          centerId: "center-002",
          approvalDate: "2023-12-15",
          expiryDate: "2024-12-15",
          status: "approved",
        },
        {
          centerId: "center-003",
          approvalDate: "2024-01-01",
          expiryDate: "2025-01-01",
          status: "approved",
        },
      ],
    },
    dataSharing: {
      policy: "研究结束后2年内开放数据",
      restrictions: ["去标识化处理", "仅限学术用途"],
      accessLevel: "restricted",
    },
  },
]

const mockDataStandards: DataStandardization[] = [
  {
    id: "std-001",
    name: "临床试验数据标准",
    version: "1.0",
    description: "多中心临床试验数据收集和交换标准",
    dataElements: [
      {
        name: "患者ID",
        type: "string",
        format: "SITE-XXXX-XXXX",
        required: true,
        validation: ["唯一性检查", "格式验证"],
      },
      {
        name: "入组日期",
        type: "date",
        format: "YYYY-MM-DD",
        required: true,
        validation: ["日期格式", "逻辑性检查"],
      },
      {
        name: "生命体征",
        type: "object",
        format: "JSON",
        required: true,
        validation: ["数值范围", "单位一致性"],
      },
    ],
    mappingRules: [
      {
        sourceField: "patient_id",
        targetField: "USUBJID",
        transformation: "格式转换为CDISC标准",
      },
      {
        sourceField: "visit_date",
        targetField: "RFSTDTC",
        transformation: "日期格式标准化",
      },
    ],
    qualityChecks: [
      {
        rule: "必填字段完整性检查",
        severity: "error",
        description: "确保所有必填字段都有值",
      },
      {
        rule: "数值范围合理性检查",
        severity: "warning",
        description: "检查生命体征等数值是否在合理范围内",
      },
    ],
  },
]

export const multiCenterResearchService = {
  // 获取研究中心列表
  getResearchCenters: async (): Promise<ResearchCenter[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResearchCenters), 500)
    })
  },

  // 获取多中心研究列表
  getMultiCenterStudies: async (): Promise<MultiCenterStudy[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMultiCenterStudies), 500)
    })
  },

  // 获取数据标准化配置
  getDataStandards: async (): Promise<DataStandardization[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDataStandards), 500)
    })
  },

  // 创建多中心研究
  createMultiCenterStudy: async (study: Omit<MultiCenterStudy, "id">): Promise<MultiCenterStudy> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudy: MultiCenterStudy = {
          id: `study-${Date.now()}`,
          ...study,
        }
        mockMultiCenterStudies.push(newStudy)
        resolve(newStudy)
      }, 500)
    })
  },

  // 申请加入研究
  applyToJoinStudy: async (studyId: string, centerId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const study = mockMultiCenterStudies.find((s) => s.id === studyId)
        if (study && !study.participatingCenters.includes(centerId)) {
          study.participatingCenters.push(centerId)
          resolve(true)
        }
        resolve(false)
      }, 500)
    })
  },

  // 数据质量检查
  performDataQualityCheck: async (
    studyId: string,
    centerId: string,
  ): Promise<{
    totalRecords: number
    errorCount: number
    warningCount: number
    issues: {
      type: "error" | "warning" | "info"
      field: string
      message: string
      recordId: string
    }[]
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟数据质量检查结果
        resolve({
          totalRecords: 150,
          errorCount: 3,
          warningCount: 12,
          issues: [
            {
              type: "error",
              field: "患者ID",
              message: "患者ID格式不正确",
              recordId: "REC-001",
            },
            {
              type: "warning",
              field: "血压",
              message: "血压值超出正常范围",
              recordId: "REC-045",
            },
            {
              type: "info",
              field: "用药记录",
              message: "建议补充用药时间",
              recordId: "REC-089",
            },
          ],
        })
      }, 500)
    })
  },

  // 生成研究进度报告
  generateProgressReport: async (
    studyId: string,
  ): Promise<{
    studyInfo: MultiCenterStudy
    enrollmentProgress: {
      centerId: string
      centerName: string
      target: number
      current: number
      percentage: number
    }[]
    dataCompleteness: {
      centerId: string
      completeness: number
      lastUpdate: string
    }[]
    milestones: {
      name: string
      targetDate: string
      actualDate?: string
      status: "completed" | "pending" | "delayed"
    }[]
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const study = mockMultiCenterStudies.find((s) => s.id === studyId)
        if (!study) return resolve(null)

        resolve({
          studyInfo: study,
          enrollmentProgress: study.participatingCenters.map((centerId, index) => {
            const center = mockResearchCenters.find((c) => c.id === centerId)
            const target = Math.floor(study.targetEnrollment / study.participatingCenters.length)
            const current = Math.floor(target * (0.4 + Math.random() * 0.6))
            return {
              centerId,
              centerName: center?.name || "未知中心",
              target,
              current,
              percentage: Math.round((current / target) * 100),
            }
          }),
          dataCompleteness: study.participatingCenters.map((centerId) => {
            const center = mockResearchCenters.find((c) => c.id === centerId)
            return {
              centerId,
              completeness: Math.floor(80 + Math.random() * 20),
              lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            }
          }),
          milestones: [
            {
              name: "首例患者入组",
              targetDate: "2024-01-15",
              actualDate: "2024-01-18",
              status: "completed",
            },
            {
              name: "50%入组完成",
              targetDate: "2024-06-30",
              actualDate: "2024-07-15",
              status: "completed",
            },
            {
              name: "入组完成",
              targetDate: "2024-12-31",
              status: "pending",
            },
          ],
        })
      }, 500)
    })
  },
}
