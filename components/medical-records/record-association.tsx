"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  Check,
  X,
  FileText,
  FlaskRoundIcon as Flask,
  ImageIcon,
  Clipboard,
  Stethoscope,
} from "lucide-react"

interface RecordAssociationProps {
  patientId?: string
  recordId?: string
  className?: string
}

interface Record {
  id: string
  type: "lab" | "imaging" | "note" | "prescription" | "procedure"
  title: string
  date: string
  provider: string
  associated: boolean
}

export function RecordAssociation({ patientId, recordId, className = "" }: RecordAssociationProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [recordType, setRecordType] = useState<string>("all")
  const [records, setRecords] = useState<Record[]>([
    {
      id: "rec001",
      type: "lab",
      title: "血常规检查",
      date: "2023-10-15",
      provider: "中心实验室",
      associated: true,
    },
    {
      id: "rec002",
      type: "imaging",
      title: "胸部X光片",
      date: "2023-10-12",
      provider: "放射科",
      associated: false,
    },
    {
      id: "rec003",
      type: "note",
      title: "初诊记录",
      date: "2023-10-10",
      provider: "王医生",
      associated: true,
    },
    {
      id: "rec004",
      type: "prescription",
      title: "抗生素处方",
      date: "2023-10-10",
      provider: "王医生",
      associated: false,
    },
    {
      id: "rec005",
      type: "lab",
      title: "肝功能检查",
      date: "2023-10-08",
      provider: "中心实验室",
      associated: false,
    },
    {
      id: "rec006",
      type: "procedure",
      title: "肺功能测试",
      date: "2023-10-05",
      provider: "呼吸科",
      associated: true,
    },
    {
      id: "rec007",
      type: "imaging",
      title: "腹部超声",
      date: "2023-09-28",
      provider: "超声科",
      associated: false,
    },
    {
      id: "rec008",
      type: "note",
      title: "随访记录",
      date: "2023-09-25",
      provider: "李医生",
      associated: true,
    },
  ])

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // 处理记录类型筛选变化
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordType(e.target.value)
  }

  // 切换记录关联状态
  const toggleAssociation = (id: string) => {
    setRecords(records.map((record) => (record.id === id ? { ...record, associated: !record.associated } : record)))
  }

  // 获取记录类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <Flask className="h-4 w-4 text-blue-500" />
      case "imaging":
        return <ImageIcon className="h-4 w-4 text-purple-500" />
      case "note":
        return <FileText className="h-4 w-4 text-green-500" />
      case "prescription":
        return <Clipboard className="h-4 w-4 text-red-500" />
      case "procedure":
        return <Stethoscope className="h-4 w-4 text-amber-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  // 筛选记录
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = recordType === "all" || record.type === recordType
    return matchesSearch && matchesType
  })

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <h2 className="text-xl font-semibold mb-4">记录关联</h2>

      {/* 搜索和筛选区域 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索记录..."
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={recordType}
            onChange={handleTypeChange}
          >
            <option value="all">所有类型</option>
            <option value="lab">检验</option>
            <option value="imaging">影像</option>
            <option value="note">记录</option>
            <option value="prescription">处方</option>
            <option value="procedure">操作</option>
          </select>
        </div>
      </div>

      {/* 记录列表 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className={`flex items-center justify-between p-3 rounded-md border ${
                record.associated ? "border-green-200 bg-green-50" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                {getTypeIcon(record.type)}
                <div>
                  <h3 className="font-medium">{record.title}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(record.date)} · {record.provider}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleAssociation(record.id)}
                className={`p-1.5 rounded-full ${
                  record.associated
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                aria-label={record.associated ? "取消关联" : "关联记录"}
              >
                {record.associated ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">未找到匹配的记录</div>
        )}
      </div>

      {/* 统计信息 */}
      <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        <span>共 {filteredRecords.length} 条记录</span>
        <span>已关联: {filteredRecords.filter((r) => r.associated).length} 条</span>
      </div>

      {/* 操作按钮 */}
      <div className="mt-4 flex justify-end space-x-3">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => setRecords(records.map((record) => ({ ...record, associated: false })))}
        >
          全部取消关联
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setRecords(records.map((record) => ({ ...record, associated: true })))}
        >
          全部关联
        </button>
      </div>
    </div>
  )
}
