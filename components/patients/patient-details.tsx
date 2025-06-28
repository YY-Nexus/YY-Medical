"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Heart,
  Pill,
  Stethoscope,
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Plus,
} from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { BarChart, LineChart } from "@/components/ui/chart"
import { ResponsiveMedicalCard } from "@/components/ui/responsive-medical-card"

// 患者基本数据类型
type Patient = {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  diagnosis: string
  bloodType: string
  height: number
  weight: number
  allergies: string[]
  chronicConditions: string[]
  insuranceProvider: string
  insuranceNumber: string
  emergencyContact: string
  emergencyPhone: string
}

// 模拟患者数据
const patientData: Record<string, Patient> = {
  "P-20240428-001": {
    id: "P-20240428-001",
    name: "张伟",
    age: 45,
    gender: "男",
    phone: "13812341234",
    email: "zhangwei@example.com",
    address: "北京市海淀区中关村南路10号",
    diagnosis: "高血压，2型糖尿病",
    bloodType: "A型",
    height: 175,
    weight: 78,
    allergies: ["青霉素", "海鲜"],
    chronicConditions: ["高血压", "2型糖尿病"],
    insuranceProvider: "中国人民健康保险",
    insuranceNumber: "HEALTH-20240001",
    emergencyContact: "张丽（妻子）",
    emergencyPhone: "13987654321",
  },
  "P-20240427-015": {
    id: "P-20240427-015",
    name: "李敏",
    age: 32,
    gender: "女",
    phone: "13956785678",
    email: "limin@example.com",
    address: "上海市浦东新区陆家嘴环路1000号",
    diagnosis: "甲状腺功能亢进",
    bloodType: "O型",
    height: 165,
    weight: 52,
    allergies: ["磺胺类药物"],
    chronicConditions: ["甲状腺功能亢进"],
    insuranceProvider: "平安健康保险",
    insuranceNumber: "PINGAN-20240056",
    emergencyContact: "李强（丈夫）",
    emergencyPhone: "13765432109",
  },
  "P-20240426-042": {
    id: "P-20240426-042",
    name: "王强",
    age: 62,
    gender: "男",
    phone: "13790129012",
    email: "wangqiang@example.com",
    address: "广州市天河区天河路385号",
    diagnosis: "冠心病，心律失常",
    bloodType: "B型",
    height: 170,
    weight: 75,
    allergies: ["阿司匹林"],
    chronicConditions: ["冠心病", "心律失常", "高血压"],
    insuranceProvider: "太平洋健康保险",
    insuranceNumber: "CPIC-20231245",
    emergencyContact: "王明（儿子）",
    emergencyPhone: "13876543210",
  },
}

// 模拟生命体征数据
const vitalSigns = [
  { date: "2024-04-28", systolic: 142, diastolic: 92, pulse: 72, temperature: 36.7, respiration: 16, oxygen: 97 },
  { date: "2024-04-21", systolic: 138, diastolic: 88, pulse: 74, temperature: 36.5, respiration: 16, oxygen: 98 },
  { date: "2024-04-14", systolic: 145, diastolic: 95, pulse: 76, temperature: 36.8, respiration: 18, oxygen: 96 },
  { date: "2024-04-07", systolic: 140, diastolic: 90, pulse: 70, temperature: 36.6, respiration: 16, oxygen: 97 },
  { date: "2024-03-31", systolic: 136, diastolic: 86, pulse: 68, temperature: 36.5, respiration: 15, oxygen: 98 },
]

// 模拟就诊历史
const visitHistory = [
  {
    id: "V20240428",
    date: "2024-04-28",
    doctor: "李医生",
    department: "心内科",
    chiefComplaint: "胸闷、气短",
    diagnosis: "冠心病急性发作",
    treatment: "硝酸甘油舌下含服，阿司匹林肠溶片",
    followUp: "1周后复诊",
  },
  {
    id: "V20240405",
    date: "2024-04-05",
    doctor: "王医生",
    department: "心内科",
    chiefComplaint: "定期检查",
    diagnosis: "冠心病，心律失常",
    treatment: "继续服用倍他乐克、阿司匹林肠溶片",
    followUp: "2周后复诊",
  },
  {
    id: "V20240315",
    date: "2024-03-15",
    doctor: "赵医生",
    department: "心内科",
    chiefComplaint: "心悸、胸闷",
    diagnosis: "心律失常加重",
    treatment: "调整倍他乐克剂量，增加胺碘酮",
    followUp: "3周后复诊",
  },
]

// 模拟用药��录
const medications = [
  {
    id: "M001",
    name: "硝酸甘油片",
    dose: "0.5mg",
    frequency: "舌下含服，疼痛时使用",
    startDate: "2024-04-28",
    endDate: "长期",
    prescribedBy: "李医生",
  },
  {
    id: "M002",
    name: "阿司匹林肠溶片",
    dose: "100mg",
    frequency: "每日1次",
    startDate: "2024-01-15",
    endDate: "长期",
    prescribedBy: "王医生",
  },
  {
    id: "M003",
    name: "倍他乐克",
    dose: "50mg",
    frequency: "每日2次",
    startDate: "2023-12-10",
    endDate: "长期",
    prescribedBy: "赵医生",
  },
  {
    id: "M004",
    name: "胺碘酮",
    dose: "200mg",
    frequency: "每日1次",
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    prescribedBy: "赵医生",
  },
]

export function PatientDetails({ patientId }: { patientId: string }) {
  const [activeTab, setActiveTab] = useState("overview")

  // 尝试获取患者数据，如果不存在则使用默认数据
  const patient = patientData[patientId] || patientData["P-20240428-001"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">患者基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-medical-600 mr-2" />
                  <span className="text-lg font-medium">{patient.name}</span>
                  <span className="ml-2 px-2 py-0.5 bg-medical-100 text-medical-800 text-xs font-medium rounded-full">
                    {patient.id}
                  </span>
                </div>
                <div className="flex items-center text-sm text-medical-600">
                  <span>{patient.age}岁</span>
                  <span className="mx-1">|</span>
                  <span>{patient.gender}</span>
                  <span className="mx-1">|</span>
                  <span>血型: {patient.bloodType}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-medical-600 mr-2" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-medical-600 mr-2" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-medical-600 mr-2" />
                  <span>{patient.address}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-medical-700">健康信息</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="text-medical-600">身高:</span>
                  <span className="ml-1 font-medium">{patient.height} cm</span>
                </div>
                <div className="flex items-center">
                  <span className="text-medical-600">体重:</span>
                  <span className="ml-1 font-medium">{patient.weight} kg</span>
                </div>
                <div className="flex items-center col-span-2">
                  <span className="text-medical-600">BMI:</span>
                  <span className="ml-1 font-medium">{(patient.weight / (patient.height / 100) ** 2).toFixed(1)}</span>
                </div>
              </div>

              <div className="text-sm font-medium text-medical-700">慢性疾病</div>
              <div className="flex flex-wrap gap-1">
                {patient.chronicConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-medical-100 text-medical-800 rounded-full"
                  >
                    {condition}
                  </span>
                ))}
              </div>

              <div className="text-sm font-medium text-medical-700">过敏史</div>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {allergy}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-medical-700">保险信息</div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-medical-600">保险公司:</span>
                  <span className="ml-1">{patient.insuranceProvider}</span>
                </div>
                <div>
                  <span className="text-medical-600">保单号码:</span>
                  <span className="ml-1">{patient.insuranceNumber}</span>
                </div>
              </div>

              <div className="text-sm font-medium text-medical-700">紧急联系人</div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-medical-600">姓名关系:</span>
                  <span className="ml-1">{patient.emergencyContact}</span>
                </div>
                <div>
                  <span className="text-medical-600">联系电话:</span>
                  <span className="ml-1">{patient.emergencyPhone}</span>
                </div>
              </div>

              <div className="pt-2">
                <MedicalButton className="bg-medical-gradient text-white w-full">
                  <Stethoscope className="mr-1 h-4 w-4" />
                  开始诊疗
                </MedicalButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>健康概览</span>
          </TabsTrigger>
          <TabsTrigger value="visits" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>就诊历史</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-1">
            <Pill className="h-4 w-4" />
            <span>用药记录</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>病历档案</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 text-medical-600 mr-1" />
                  血压趋势
                </CardTitle>
                <CardDescription>最近5次检测数据</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={vitalSigns}
                  categories={[
                    {
                      name: "收缩压",
                      key: "systolic",
                      stroke: "#ef4444",
                    },
                    {
                      name: "舒张压",
                      key: "diastolic",
                      stroke: "#3b82f6",
                    },
                  ]}
                  xAxisKey="date"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 text-medical-600 mr-1" />
                  生命体征
                </CardTitle>
                <CardDescription>最新检测数据 ({vitalSigns[0].date})</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResponsiveMedicalCard className="bg-red-50 border-red-100">
                    <div className="p-4">
                      <div className="text-sm text-medical-600 mb-1">血压</div>
                      <div className="flex items-end gap-2">
                        <div className="text-2xl font-bold text-red-600">
                          {vitalSigns[0].systolic}/{vitalSigns[0].diastolic}
                        </div>
                        <div className="text-sm text-medical-600 mb-1">mmHg</div>
                      </div>
                      <div className="mt-1 text-xs text-red-500">高于正常值</div>
                    </div>
                  </ResponsiveMedicalCard>

                  <ResponsiveMedicalCard className="bg-blue-50 border-blue-100">
                    <div className="p-4">
                      <div className="text-sm text-medical-600 mb-1">脉搏</div>
                      <div className="flex items-end gap-2">
                        <div className="text-2xl font-bold text-blue-600">{vitalSigns[0].pulse}</div>
                        <div className="text-sm text-medical-600 mb-1">次/分钟</div>
                      </div>
                      <div className="mt-1 text-xs text-blue-500">正常范围</div>
                    </div>
                  </ResponsiveMedicalCard>

                  <ResponsiveMedicalCard className="bg-amber-50 border-amber-100">
                    <div className="p-4">
                      <div className="text-sm text-medical-600 mb-1">体温</div>
                      <div className="flex items-end gap-2">
                        <div className="text-2xl font-bold text-amber-600">{vitalSigns[0].temperature}</div>
                        <div className="text-sm text-medical-600 mb-1">°C</div>
                      </div>
                      <div className="mt-1 text-xs text-amber-500">正常范围</div>
                    </div>
                  </ResponsiveMedicalCard>

                  <ResponsiveMedicalCard className="bg-green-50 border-green-100">
                    <div className="p-4">
                      <div className="text-sm text-medical-600 mb-1">血氧饱和度</div>
                      <div className="flex items-end gap-2">
                        <div className="text-2xl font-bold text-green-600">{vitalSigns[0].oxygen}</div>
                        <div className="text-sm text-medical-600 mb-1">%</div>
                      </div>
                      <div className="mt-1 text-xs text-green-500">正常范围</div>
                    </div>
                  </ResponsiveMedicalCard>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 text-medical-600 mr-1" />
                就诊历史
              </CardTitle>
              <CardDescription>患者历次就诊记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {visitHistory.map((visit, index) => (
                  <div
                    key={visit.id}
                    className={`pb-6 ${index !== visitHistory.length - 1 ? "border-b border-medical-100" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-medical-600 mr-2" />
                        <span className="font-medium">{visit.date}</span>
                        <span className="ml-2 px-2 py-0.5 bg-medical-100 text-medical-700 text-xs rounded-full">
                          {visit.department}
                        </span>
                      </div>
                      <span className="text-sm text-medical-600">医生: {visit.doctor}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium mb-1 text-medical-700">主诉</div>
                        <p>{visit.chiefComplaint}</p>
                      </div>

                      <div>
                        <div className="font-medium mb-1 text-medical-700">诊断</div>
                        <p>{visit.diagnosis}</p>
                      </div>

                      <div className="md:col-span-2">
                        <div className="font-medium mb-1 text-medical-700">治疗方案</div>
                        <p>{visit.treatment}</p>
                      </div>

                      <div className="md:col-span-2">
                        <div className="font-medium mb-1 text-medical-700">随访计划</div>
                        <p>{visit.followUp}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <MedicalButton variant="outline" size="sm">
                        <FileText className="mr-1 h-4 w-4" />
                        查看详细记录
                      </MedicalButton>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Pill className="h-5 w-5 text-medical-600 mr-1" />
                用药记录
              </CardTitle>
              <CardDescription>当前和历史用药情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-medical-50 text-medical-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">药品名称</th>
                      <th className="px-4 py-3 font-medium">剂量</th>
                      <th className="px-4 py-3 font-medium">频率</th>
                      <th className="px-4 py-3 font-medium">开始日期</th>
                      <th className="px-4 py-3 font-medium">结束日期</th>
                      <th className="px-4 py-3 font-medium">处方医生</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-medical-100">
                    {medications.map((medication) => (
                      <tr key={medication.id} className="hover:bg-medical-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-medical-900">{medication.name}</td>
                        <td className="px-4 py-3 text-medical-700">{medication.dose}</td>
                        <td className="px-4 py-3 text-medical-700">{medication.frequency}</td>
                        <td className="px-4 py-3 text-medical-700">{medication.startDate}</td>
                        <td className="px-4 py-3 text-medical-700">{medication.endDate}</td>
                        <td className="px-4 py-3 text-medical-700">{medication.prescribedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <div className="font-medium mb-3 text-medical-700">用药依从性分析</div>
                <div className="h-64">
                  <BarChart
                    data={[
                      { month: "1月", adherence: 90 },
                      { month: "2月", adherence: 95 },
                      { month: "3月", adherence: 88 },
                      { month: "4月", adherence: 92 },
                    ]}
                    categories={[
                      {
                        name: "依从性",
                        key: "adherence",
                        color: "hsl(var(--chart-1))",
                      },
                    ]}
                    xAxisKey="month"
                    yAxisConfig={{
                      min: 0,
                      max: 100,
                      unit: "%",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 text-medical-600 mr-1" />
                电子病历档案
              </CardTitle>
              <CardDescription>患者完整病历记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center">
                      <FileText className="h-10 w-10 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium">初诊记录</div>
                        <div className="text-xs text-medical-600">2023-12-05</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center">
                      <Activity className="h-10 w-10 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">心电图检查报告</div>
                        <div className="text-xs text-medical-600">2024-01-15</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 border-amber-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center">
                      <Stethoscope className="h-10 w-10 text-amber-600 mr-3" />
                      <div>
                        <div className="font-medium">心内科专家会诊</div>
                        <div className="text-xs text-medical-600">2024-02-20</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center">
                      <Heart className="h-10 w-10 text-purple-600 mr-3" />
                      <div>
                        <div className="font-medium">冠状动脉造影</div>
                        <div className="text-xs text-medical-600">2024-03-10</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-pink-50 border-pink-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center">
                      <FileText className="h-10 w-10 text-pink-600 mr-3" />
                      <div>
                        <div className="font-medium">住院记录</div>
                        <div className="text-xs text-medical-600">2024-03-15 至 2024-03-22</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-medical-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-center text-medical-500">
                      <div className="text-center">
                        <Plus className="h-10 w-10 mx-auto mb-1" />
                        <div className="font-medium">上传新记录</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
