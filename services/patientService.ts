import { api } from "@/lib/api/client"
import { API_ENDPOINTS } from "@/lib/api/endpoints"

export interface Patient {
  id: string
  name: string
  gender: string
  age: number
  medicalRecordNumber: string
  contactInfo: string
  // 其他患者信息...
}

export interface MedicalRecord {
  id: string
  patientId: string
  date: string
  doctorId: string
  doctorName: string
  diagnosis: string
  treatment: string
  notes: string
  // 其他医疗记录信息...
}

export const patientService = {
  // 获取患者列表
  getPatients: async (params?: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }) => {
    return api.get<Patient[]>(API_ENDPOINTS.PATIENTS.LIST, { params })
  },

  // 获取患者详情
  getPatientById: async (id: string) => {
    return api.get<Patient>(API_ENDPOINTS.PATIENTS.DETAIL(id))
  },

  // 创建患者
  createPatient: async (patientData: Omit<Patient, "id">) => {
    return api.post<Patient>(API_ENDPOINTS.PATIENTS.CREATE, patientData)
  },

  // 更新患者信息
  updatePatient: async (id: string, patientData: Partial<Patient>) => {
    return api.patch<Patient>(API_ENDPOINTS.PATIENTS.UPDATE(id), patientData)
  },

  // 删除患者
  deletePatient: async (id: string) => {
    return api.delete(API_ENDPOINTS.PATIENTS.DELETE(id))
  },

  // 获取患者医疗记录
  getPatientMedicalRecords: async (
    patientId: string,
    params?: {
      page?: number
      limit?: number
      startDate?: string
      endDate?: string
    },
  ) => {
    return api.get<MedicalRecord[]>(API_ENDPOINTS.PATIENTS.MEDICAL_RECORDS(patientId), { params })
  },

  // 创建医疗记录
  createMedicalRecord: async (medicalRecordData: Omit<MedicalRecord, "id">) => {
    return api.post<MedicalRecord>(API_ENDPOINTS.MEDICAL_RECORDS.CREATE, medicalRecordData)
  },

  // 更新医疗记录
  updateMedicalRecord: async (id: string, medicalRecordData: Partial<MedicalRecord>) => {
    return api.patch<MedicalRecord>(API_ENDPOINTS.MEDICAL_RECORDS.UPDATE(id), medicalRecordData)
  },

  // 删除医疗记录
  deleteMedicalRecord: async (id: string) => {
    return api.delete(API_ENDPOINTS.MEDICAL_RECORDS.DELETE(id))
  },

  // 上传医疗图像
  uploadMedicalImage: async (
    file: File,
    metadata: {
      patientId: string
      recordId?: string
      imageType: string
      description?: string
    },
  ) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("metadata", JSON.stringify(metadata))

    return api.post(API_ENDPOINTS.MEDICAL_RECORDS.UPLOAD_IMAGE, formData, {
      headers: {
        // 不设置 Content-Type，让浏览器自动设置带边界的 multipart/form-data
      },
    })
  },
}
