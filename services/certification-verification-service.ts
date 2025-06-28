// 定义资质验证结果类型
export interface CertificationVerificationResult {
  isValid: boolean
  name?: string
  institution?: string
  specialty?: string
  validUntil?: string
  message?: string
  verificationId?: string
  verificationDate?: string
  verificationProvider?: string
  details?: any
}

// 验证机构类型
export interface VerificationProvider {
  id: string
  name: string
  isOfficial: boolean
  isFast: boolean
  supportedTypes: string[]
  verificationTime: string
  fee: string
}

// 可用的验证机构
export const availableProviders: VerificationProvider[] = [
  {
    id: "nhc",
    name: "国家卫健委医师资格认证中心",
    isOfficial: true,
    isFast: false,
    supportedTypes: ["doctor-license", "specialist-certificate"],
    verificationTime: "1-2个工作日",
    fee: "免费",
  },
  {
    id: "cmda",
    name: "中国医师协会认证中心",
    isOfficial: true,
    isFast: false,
    supportedTypes: ["doctor-license", "specialist-certificate", "continuing-education"],
    verificationTime: "2-3个工作日",
    fee: "会员免费，非会员收费",
  },
  {
    id: "medverify",
    name: "医证通快速验证服务",
    isOfficial: false,
    isFast: true,
    supportedTypes: ["doctor-license", "specialist-certificate", "practice-permit", "continuing-education"],
    verificationTime: "4小时内",
    fee: "每次验证30元",
  },
  {
    id: "healthcert",
    name: "健康证书验证联盟",
    isOfficial: false,
    isFast: true,
    supportedTypes: ["doctor-license", "specialist-certificate", "practice-permit"],
    verificationTime: "1个工作日",
    fee: "包月服务",
  },
]

// 导出服务 - 注意这里使用小写开头，与导入保持一致
export const certificationVerificationService = {
  /**
   * 获取可用的验证机构
   * @param certificationType 资质类型
   * @returns 支持该资质类型的验证机构列表
   */
  getAvailableProviders: (certificationType?: string): VerificationProvider[] => {
    if (!certificationType) {
      return availableProviders
    }
    return availableProviders.filter((provider) => provider.supportedTypes.includes(certificationType))
  },

  /**
   * 验证执业医师资格证
   * @param licenseNumber 执业医师资格证编号
   * @param name 医生姓名
   * @param providerId 验证机构ID
   * @returns 验证结果
   */
  verifyDoctorLicense: async (
    licenseNumber: string,
    name: string,
    providerId = "nhc",
  ): Promise<CertificationVerificationResult> => {
    // 获取验证机构信息
    const provider = availableProviders.find((p) => p.id === providerId) || availableProviders[0]

    // 模拟API调用延迟 - 快速验证服务更快
    const delay = provider.isFast ? 800 : 1500
    await new Promise((resolve) => setTimeout(resolve, delay))

    // 模拟验证结果
    if (licenseNumber.startsWith("110")) {
      return {
        isValid: true,
        name: "张三",
        institution: "北京协和医院",
        validUntil: "2028-12-31",
        message: "执业医师资格证有效",
        verificationId: `VER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        verificationDate: new Date().toISOString(),
        verificationProvider: provider.name,
      }
    } else if (licenseNumber.startsWith("123")) {
      return {
        isValid: false,
        message: "执业医师资格证无效",
        verificationProvider: provider.name,
        verificationDate: new Date().toISOString(),
      }
    } else {
      return {
        isValid: false,
        message: "未找到匹配的执业医师资格证",
        verificationProvider: provider.name,
        verificationDate: new Date().toISOString(),
      }
    }
  },

  /**
   * 验证专科医师资格证
   * @param certificateNumber 专科医师资格证编号
   * @param name 医生姓名
   * @param specialty 专科名称
   * @param providerId 验证机构ID
   * @returns 验证结果
   */
  verifySpecialistCertificate: async (
    certificateNumber: string,
    name: string,
    specialty: string,
    providerId = "nhc",
  ): Promise<CertificationVerificationResult> => {
    // 获取验证机构信息
    const provider = availableProviders.find((p) => p.id === providerId) || availableProviders[0]

    // 模拟API调用延迟 - 快速验证服务更快
    const delay = provider.isFast ? 800 : 1500
    await new Promise((resolve) => setTimeout(resolve, delay))

    // 模拟验证结果
    if (certificateNumber.startsWith("220")) {
      return {
        isValid: true,
        name: "张三",
        specialty: "心血管内科",
        institution: "北京协和医院",
        validUntil: "2027-06-30",
        message: "专科医师资格证有效",
        verificationId: `VER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        verificationDate: new Date().toISOString(),
        verificationProvider: provider.name,
      }
    } else if (certificateNumber.startsWith("234")) {
      return {
        isValid: false,
        message: "专科医师资格证无效",
        verificationProvider: provider.name,
        verificationDate: new Date().toISOString(),
      }
    } else {
      return {
        isValid: false,
        message: "未找到匹配的专科医师资格证",
        verificationProvider: provider.name,
        verificationDate: new Date().toISOString(),
      }
    }
  },

  /**
   * 检查资质状态
   * @param certificationId 资质ID
   * @returns 验证状态
   */
  checkCertificationStatus: async (certificationId: string): Promise<CertificationVerificationResult> => {
    try {
      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        isValid: true,
        message: "资质验证有效",
        verificationId: certificationId,
        verificationDate: new Date().toISOString(),
        verificationProvider: "国家卫健委医师资格认证中心",
      }
    } catch (error) {
      console.error("资质状态检查失败:", error)
      return {
        isValid: false,
        message: "无法获取验证状态，请稍后重试",
      }
    }
  },
}
