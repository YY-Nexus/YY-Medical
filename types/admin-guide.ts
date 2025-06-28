export interface GuideStep {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  completed: boolean
  prerequisites?: string[]
  actions: GuideAction[]
}

export interface GuideAction {
  type: "navigate" | "test" | "verify" | "configure"
  label: string
  url?: string
  description: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type: "text" | "image" | "file"
  metadata?: {
    confidence?: number
    category?: string
    relatedGuides?: string[]
  }
}

export interface QuickQuestion {
  id: string
  question: string
  category: string
  answer: string
  relatedGuides: string[]
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  difficulty: "basic" | "intermediate" | "advanced"
  relatedItems: string[]
  lastUpdated: Date
}

export interface GuideProgress {
  completed: number
  total: number
  percentage: number
}
