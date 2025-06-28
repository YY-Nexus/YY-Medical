import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface Patient {
  id: string
  name: string
  gender: string
  age: number
  medicalRecordNumber: string
  contactInfo: string
  // 其他患者信息...
}

interface PatientState {
  patients: Patient[]
  selectedPatient: Patient | null
  isLoading: boolean
  error: string | null

  // 操作
  fetchPatients: () => Promise<void>
  fetchPatientById: (id: string) => Promise<void>
  addPatient: (patient: Omit<Patient, "id">) => Promise<void>
  updatePatient: (id: string, data: Partial<Patient>) => Promise<void>
  deletePatient: (id: string) => Promise<void>
  selectPatient: (id: string | null) => void
  clearError: () => void
}

export const usePatientStore = create<PatientState>()(
  immer((set, get) => ({
    patients: [],
    selectedPatient: null,
    isLoading: false,
    error: null,

    fetchPatients: async () => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // 实际项目中替换为真实API调用
        const response = await fetch("/api/patients")

        if (!response.ok) {
          throw new Error("获取患者列表失败")
        }

        const data = await response.json()

        set((state) => {
          state.patients = data
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
          state.error = error instanceof Error ? error.message : "获取患者数据时发生错误"
        })
      }
    },

    fetchPatientById: async (id) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // 实际项目中替换为真实API调用
        const response = await fetch(`/api/patients/${id}`)

        if (!response.ok) {
          throw new Error("获取患者详情失败")
        }

        const data = await response.json()

        set((state) => {
          state.selectedPatient = data
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
          state.error = error instanceof Error ? error.message : "获取患者详情时发生错误"
        })
      }
    },

    addPatient: async (patient) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // 实际项目中替换为真实API调用
        const response = await fetch("/api/patients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patient),
        })

        if (!response.ok) {
          throw new Error("添加患者失败")
        }

        const newPatient = await response.json()

        set((state) => {
          state.patients.push(newPatient)
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
          state.error = error instanceof Error ? error.message : "添加患者时发生错误"
        })
      }
    },

    updatePatient: async (id, data) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // 实际项目中替换为真实API调用
        const response = await fetch(`/api/patients/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error("更新患者信息失败")
        }

        const updatedPatient = await response.json()

        set((state) => {
          const index = state.patients.findIndex((p) => p.id === id)
          if (index !== -1) {
            state.patients[index] = updatedPatient
          }
          if (state.selectedPatient?.id === id) {
            state.selectedPatient = updatedPatient
          }
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
          state.error = error instanceof Error ? error.message : "更新患者信息时发生错误"
        })
      }
    },

    deletePatient: async (id) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        // 实际项目中替换为真实API调用
        const response = await fetch(`/api/patients/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("删除患者失败")
        }

        set((state) => {
          state.patients = state.patients.filter((p) => p.id !== id)
          if (state.selectedPatient?.id === id) {
            state.selectedPatient = null
          }
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
          state.error = error instanceof Error ? error.message : "删除患者时发生错误"
        })
      }
    },

    selectPatient: (id) => {
      if (id === null) {
        set((state) => {
          state.selectedPatient = null
        })
        return
      }

      const { patients } = get()
      const patient = patients.find((p) => p.id === id) || null

      set((state) => {
        state.selectedPatient = patient
      })
    },

    clearError: () =>
      set((state) => {
        state.error = null
      }),
  })),
)
