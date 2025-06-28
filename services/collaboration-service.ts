import type { DoctorNote, DoctorNoteReply } from "../types/knowledge-base"

// 模拟医生笔记数据库
const doctorNotesDatabase: DoctorNote[] = [
  {
    id: "note-1",
    doctorId: "doctor-1",
    doctorName: "张医生",
    doctorSpecialty: "心血管内科",
    targetType: "disease",
    targetId: "cardiomegaly",
    content: "在临床实践中，我发现心脏扩大患者常合并有睡眠呼吸暂停综合征，建议在评估心脏扩大患者时考虑进行睡眠监测。",
    rating: 5,
    tags: ["临床经验", "共病管理", "睡眠呼吸暂停"],
    createdAt: "2023-08-15T09:30:00Z",
    upvotes: 12,
    downvotes: 1,
    replies: [
      {
        id: "reply-1",
        doctorId: "doctor-2",
        doctorName: "李医生",
        content: "非常同意这一观察。我们科室最近也在对这类患者进行睡眠监测，发现阳性率高达60%。",
        createdAt: "2023-08-15T14:20:00Z",
        upvotes: 5,
        downvotes: 0,
      },
    ],
    isPrivate: false,
  },
  {
    id: "note-2",
    doctorId: "doctor-2",
    doctorName: "李医生",
    doctorSpecialty: "呼吸内科",
    targetType: "treatment",
    targetId: "emphysema-treatment-2",
    content:
      "在使用长效支气管扩张剂治疗肺气肿时，我发现吸入装置的选择对患者依从性影响很大。老年患者通常更容易使用定量雾化吸入器配合吸入辅助器，而非干粉吸入器。",
    rating: 4,
    tags: ["用药技巧", "老年患者", "依从性"],
    createdAt: "2023-09-01T10:15:00Z",
    upvotes: 8,
    downvotes: 0,
    isPrivate: false,
  },
]

// 协作服务
export const collaborationService = {
  // 获取特定目标的所有笔记
  getNotesByTarget: (targetType: "disease" | "treatment" | "reference" | "medication", targetId: string) => {
    return doctorNotesDatabase.filter(
      (note) => note.targetType === targetType && note.targetId === targetId && !note.isPrivate,
    )
  },

  // 获取医生的所有笔记
  getNotesByDoctor: (doctorId: string, includePrivate = false) => {
    return doctorNotesDatabase.filter((note) => note.doctorId === doctorId && (includePrivate || !note.isPrivate))
  },

  // 添加新笔记
  addNote: (note: Omit<DoctorNote, "id" | "createdAt" | "upvotes" | "downvotes" | "replies">) => {
    const newNote: DoctorNote = {
      ...note,
      id: `note-${doctorNotesDatabase.length + 1}`,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: [],
    }

    doctorNotesDatabase.push(newNote)
    return newNote
  },

  // 更新笔记
  updateNote: (noteId: string, doctorId: string, updates: Partial<DoctorNote>) => {
    const noteIndex = doctorNotesDatabase.findIndex((note) => note.id === noteId && note.doctorId === doctorId)
    if (noteIndex === -1) return null

    const updatedNote = {
      ...doctorNotesDatabase[noteIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    doctorNotesDatabase[noteIndex] = updatedNote
    return updatedNote
  },

  // 删除笔记
  deleteNote: (noteId: string, doctorId: string) => {
    const noteIndex = doctorNotesDatabase.findIndex((note) => note.id === noteId && note.doctorId === doctorId)
    if (noteIndex === -1) return false

    doctorNotesDatabase.splice(noteIndex, 1)
    return true
  },

  // 添加回复
  addReply: (noteId: string, reply: Omit<DoctorNoteReply, "id" | "createdAt" | "upvotes" | "downvotes">) => {
    const note = doctorNotesDatabase.find((note) => note.id === noteId)
    if (!note) return null

    const newReply: DoctorNoteReply = {
      ...reply,
      id: `reply-${note.replies?.length ? note.replies.length + 1 : 1}`,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
    }

    note.replies = note.replies || []
    note.replies.push(newReply)
    return newReply
  },

  // 更新回复
  updateReply: (noteId: string, replyId: string, doctorId: string, content: string) => {
    const note = doctorNotesDatabase.find((note) => note.id === noteId)
    if (!note || !note.replies) return null

    const replyIndex = note.replies.findIndex((reply) => reply.id === replyId && reply.doctorId === doctorId)
    if (replyIndex === -1) return null

    note.replies[replyIndex] = {
      ...note.replies[replyIndex],
      content,
      updatedAt: new Date().toISOString(),
    }

    return note.replies[replyIndex]
  },

  // 删除回复
  deleteReply: (noteId: string, replyId: string, doctorId: string) => {
    const note = doctorNotesDatabase.find((note) => note.id === noteId)
    if (!note || !note.replies) return false

    const replyIndex = note.replies.findIndex((reply) => reply.id === replyId && reply.doctorId === doctorId)
    if (replyIndex === -1) return false

    note.replies.splice(replyIndex, 1)
    return true
  },

  // 投票（点赞/踩）笔记
  voteNote: (noteId: string, doctorId: string, isUpvote: boolean) => {
    const note = doctorNotesDatabase.find((note) => note.id === noteId)
    if (!note) return false

    if (isUpvote) {
      note.upvotes += 1
    } else {
      note.downvotes += 1
    }

    return true
  },

  // 投票（点赞/踩）回复
  voteReply: (noteId: string, replyId: string, doctorId: string, isUpvote: boolean) => {
    const note = doctorNotesDatabase.find((note) => note.id === noteId)
    if (!note || !note.replies) return false

    const reply = note.replies.find((reply) => reply.id === replyId)
    if (!reply) return false

    if (isUpvote) {
      reply.upvotes += 1
    } else {
      reply.downvotes += 1
    }

    return true
  },

  // 搜索笔记
  searchNotes: (query: string) => {
    const normalizedQuery = query.toLowerCase()
    return doctorNotesDatabase.filter(
      (note) =>
        !note.isPrivate &&
        (note.content.toLowerCase().includes(normalizedQuery) ||
          note.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))),
    )
  },

  // 获取热门笔记
  getPopularNotes: (limit = 10) => {
    return doctorNotesDatabase
      .filter((note) => !note.isPrivate)
      .sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes))
      .slice(0, limit)
  },

  // 获取最新笔记
  getRecentNotes: (limit = 10) => {
    return doctorNotesDatabase
      .filter((note) => !note.isPrivate)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  },

  // 获取特定标签的笔记
  getNotesByTag: (tag: string) => {
    return doctorNotesDatabase.filter((note) => !note.isPrivate && note.tags?.includes(tag))
  },

  // 获取所有标签及其使用次数
  getAllTags: () => {
    const tagCounts: Record<string, number> = {}

    doctorNotesDatabase.forEach((note) => {
      if (note.isPrivate || !note.tags) return

      note.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  },
}
