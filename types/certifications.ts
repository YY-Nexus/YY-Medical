export type CertificationType =
  | "medical_license"
  | "specialist_certificate"
  | "board_certification"
  | "practice_permit"
  | "continuing_education"
  | "other"

export type CertificationStatus = "pending" | "verified" | "rejected" | "expired"

export interface Certification {
  id: string
  userId: string
  type: CertificationType
  name: string
  issuer: string
  issueDate: string
  expiryDate: string | null
  certificateNumber: string
  status: CertificationStatus
  verificationDate?: string
  verificationMethod?: string
  verificationProvider?: string
  verificationId?: string
  documentUrl: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CertificationVerificationResult {
  isVerified: boolean
  status: CertificationStatus
  message: string
  verificationId?: string
  verificationDate?: string
  verificationProvider?: string
  details?: {
    matchScore?: number
    validityCheck?: boolean
    registryFound?: boolean
    additionalInfo?: string
  }
}
