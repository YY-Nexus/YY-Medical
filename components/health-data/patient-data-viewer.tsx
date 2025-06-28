"use client"

import React from "react"

import { useState } from "react"
import { Search, Calendar, Activity, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 模拟患者数据
const patients = [
  {
    id: "P-10045",
    name: "张三",
    age: 45,
    gender: "男",
    lastVisit: "2023-05-15",
    condition: "稳定",
    vitalSigns: {
      heartRate: 72,
      bloodPressure: "120/80",
      temperature: 36.5,
      bloodOxygen: 98,
    },
    labResults: [
      { name: "血糖", value: "5.6", unit: "mmol/L", date: "2023-05-15", status: "正常" },
      { name: "总胆固醇", value: "5.2", unit: "mmol/L", date: "2023-05-15", status: "轻度升高" },
      { name: "血红蛋白", value: "150", unit: "g/L", date: "2023-05-15", status: "正常" },
    ],
    medications: [
      { name: "二甲双胍", dosage: "0.5g", frequency: "每日三次" },
      { name: "阿托伐他汀", dosage: "20mg", frequency: "每晚一次" },
    ],
  },
  {
    id: "P-10078",
    name: "李四",
    age: 62,
    gender: "男",
    lastVisit: "2023-05-16",
    condition: "需关注",
    vitalSigns: {
      heartRate: 78,
      bloodPressure: "145/90",
      temperature: 36.7,
      bloodOxygen: 96,
    },
    labResults: [
      { name: "血糖", value: "6.2", unit: "mmol/L", date: "2023-05-16", status: "轻度升高" },
      { name: "总胆固醇", value: "4.8", unit: "mmol/L", date: "2023-05-16", status: "正常" },
      { name: "血红蛋白", value: "145", unit: "g/L", date: "2023-05-16", status: "正常" },
    ],
    medications: [
      { name: "氯沙坦", dosage: "50mg", frequency: "每日一次" },
      { name: "阿司匹林", dosage: "100mg", frequency: "每日一次" },
    ],
  },
  {
    id: "P-10103",
    name: "王五",
    age: 35,
    gender: "男",
    lastVisit: "2023-05-17",
    condition: "好转中",
    vitalSigns: {
      heartRate: 70,
      bloodPressure: "118/75",
      temperature: 36.8,
      bloodOxygen: 99,
    },
    labResults: [
      { name: "血糖", value: "4.9", unit: "mmol/L", date: "2023-05-17", status: "正常" },
      { name: "总胆固醇", value: "4.5", unit: "mmol/L", date: "2023-05-17", status: "正常" },
      { name: "血红蛋白", value: "155", unit: "g/L", date: "2023-05-17", status: "正常" },
    ],
    medications: [
      { name: "左氧氟沙星", dosage: "0.5g", frequency: "每日一次" },
      { name: "布洛芬", dosage: "0.4g", frequency: "需要时" },
    ],
  },
  {
    id: "P-10156",
    name: "赵六",
    age: 50,
    gender: "男",
    lastVisit: "2023-05-18",
    condition: "稳定",
    vitalSigns: {
      heartRate: 68,
      bloodPressure: "125/82",
      temperature: 36.5,
      bloodOxygen: 97,
    },
    labResults: [
      { name: "血糖", value: "5.1", unit: "mmol/L", date: "2023-05-18", status: "正常" },
      { name: "总胆固醇", value: "4.9", unit: "mmol/L", date: "2023-05-18", status: "正常" },
      { name: "血红蛋白", value: "148", unit: "g/L", date: "2023-05-18", status: "正常" },
    ],
    medications: [
      { name: "奥美拉唑", dosage: "20mg", frequency: "每日两次" },
      { name: "枸橼酸铋钾", dosage: "0.6g", frequency: "每日四次" },
    ],
  },
  {
    id: "P-10189",
    name: "孙七",
    age: 55,
    gender: "女",
    lastVisit: "2023-05-19",
    condition: "需关注",
    vitalSigns: {
      heartRate: 75,
      bloodPressure: "135/85",
      temperature: 36.6,
      bloodOxygen: 97,
    },
    labResults: [
      { name: "血糖", value: "5.8", unit: "mmol/L", date: "2023-05-19", status: "正常" },
      { name: "总胆固醇", value: "5.5", unit: "mmol/L", date: "2023-05-19", status: "轻度升高" },
      { name: "血红蛋白", value: "135", unit: "g/L", date: "2023-05-19", status: "正常" },
    ],
    medications: [
      { name: "卡马西平", dosage: "200mg", frequency: "每日两次" },
      { name: "维生素B1", dosage: "10mg", frequency: "每日一次" },
    ],
  },
]

// 状态映射
const conditionMap = {
  稳定: { color: "default", icon: Activity },
  需关注: { color: "warning", icon: Activity },
  好转中: { color: "success", icon: Activity },
}

export function PatientDataViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)

  // 过滤患者
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>患者健康数据</CardTitle>
        <CardDescription>查看和分析个体患者的健康数据</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索患者姓名或ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>患者</TableHead>
                  <TableHead className="hidden md:table-cell">年龄</TableHead>
                  <TableHead className="hidden md:table-cell">上次就诊</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => {
                  const StatusIcon = conditionMap[patient.condition as keyof typeof conditionMap]?.icon
                  return (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{patient.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-muted-foreground">{patient.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {patient.age} 岁 ({patient.gender})
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{patient.lastVisit}</TableCell>
                      <TableCell>
                        <Badge
                          variant={conditionMap[patient.condition as keyof typeof conditionMap]?.color as any}
                          className="flex w-fit items-center gap-1"
                        >
                          {StatusIcon && React.createElement(StatusIcon, { className: "h-3 w-3" })}
                          <span>{patient.condition}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}>
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {selectedPatient && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{selectedPatient.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedPatient.name}</CardTitle>
                      <CardDescription>{selectedPatient.id}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      预约
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      病历
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vital-signs" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="vital-signs">生命体征</TabsTrigger>
                    <TabsTrigger value="lab-results">检验结果</TabsTrigger>
                    <TabsTrigger value="medications">用药情况</TabsTrigger>
                  </TabsList>

                  <TabsContent value="vital-signs" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">心率</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">
                            {selectedPatient.vitalSigns.heartRate} <span className="text-sm font-normal">bpm</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">血压</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">
                            {selectedPatient.vitalSigns.bloodPressure} <span className="text-sm font-normal">mmHg</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">体温</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">
                            {selectedPatient.vitalSigns.temperature} <span className="text-sm font-normal">°C</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">血氧</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">
                            {selectedPatient.vitalSigns.bloodOxygen} <span className="text-sm font-normal">%</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="lab-results" className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>检验项目</TableHead>
                          <TableHead>结果</TableHead>
                          <TableHead>单位</TableHead>
                          <TableHead>日期</TableHead>
                          <TableHead>状态</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPatient.labResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{result.name}</TableCell>
                            <TableCell>{result.value}</TableCell>
                            <TableCell>{result.unit}</TableCell>
                            <TableCell>{result.date}</TableCell>
                            <TableCell>
                              <Badge variant={result.status === "正常" ? "default" : "warning"}>{result.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="medications" className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>药品名称</TableHead>
                          <TableHead>剂量</TableHead>
                          <TableHead>频次</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPatient.medications.map((medication, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{medication.name}</TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
