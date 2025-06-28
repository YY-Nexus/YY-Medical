"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Database, BookMarked, Pill } from "lucide-react"
import { medicalKnowledgeService, type DiseaseReference } from "../../services/medical-knowledge-service"
import { KnowledgeIntegration } from "./knowledge-integration"
import type { DiagnosticFinding } from "../../types/medical-records"

export function KnowledgeBaseClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("search")
  const [searchResults, setSearchResults] = useState<DiseaseReference[]>([])
  const [selectedDisease, setSelectedDisease] = useState<DiseaseReference | null>(null)
  const [mockFindings, setMockFindings] = useState<DiagnosticFinding[]>([])

  // 处理搜索
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    const results = medicalKnowledgeService.searchDiseases(searchQuery)
    setSearchResults(results)

    if (results.length > 0) {
      handleSelectDisease(results[0])
    }
  }

  // 处理疾病选择
  const handleSelectDisease = (disease: DiseaseReference) => {
    setSelectedDisease(disease)

    // 创建模拟的诊断发现，用于知识库集成组件
    const mockFinding: DiagnosticFinding = {
      id: "search-result",
      modality: "search",
      area: "搜索结果",
      finding: disease.name,
      confidence: 1.0,
      severity: "moderate",
      recommendation: "基于搜索结果",
      relatedDiseaseIds: [disease.id],
    }

    setMockFindings([mockFinding])
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            医学知识库
          </CardTitle>
          <CardDescription>搜索和浏览医学知识，获取疾病信息、治疗指南和参考文献</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="search">
                <Search className="mr-2 h-4 w-4" />
                搜索知识库
              </TabsTrigger>
              <TabsTrigger value="browse">
                <Database className="mr-2 h-4 w-4" />
                浏览疾病
              </TabsTrigger>
              <TabsTrigger value="guidelines">
                <Pill className="mr-2 h-4 w-4" />
                治疗指南
              </TabsTrigger>
              <TabsTrigger value="references">
                <BookMarked className="mr-2 h-4 w-4" />
                参考文献
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="输入疾病名称、症状或ICD-10代码..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    搜索
                  </Button>
                </div>

                {searchResults.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {searchResults.map((disease) => (
                      <Card
                        key={disease.id}
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          selectedDisease?.id === disease.id ? "border-blue-500 ring-1 ring-blue-500" : ""
                        }`}
                        onClick={() => handleSelectDisease(disease)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">{disease.name}</CardTitle>
                          {disease.icd10Code && <CardDescription>ICD-10: {disease.icd10Code}</CardDescription>}
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-gray-700 line-clamp-3">{disease.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {selectedDisease && mockFindings.length > 0 && <KnowledgeIntegration findings={mockFindings} />}
              </div>
            </TabsContent>

            <TabsContent value="browse">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">浏览疾病分类</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {medicalKnowledgeService.getAllDiseases().map((disease) => (
                    <Card
                      key={disease.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        handleSelectDisease(disease)
                        setActiveTab("search")
                      }}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{disease.name}</CardTitle>
                        {disease.icd10Code && <CardDescription>ICD-10: {disease.icd10Code}</CardDescription>}
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-700 line-clamp-2">{disease.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guidelines">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">治疗指南集合</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {medicalKnowledgeService.getAllTreatmentGuidelines().map((guideline) => {
                    const disease = medicalKnowledgeService.getDiseaseById(guideline.diseaseId)
                    return (
                      <Card key={guideline.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-50 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{guideline.title}</CardTitle>
                              {disease && <CardDescription>适用疾病: {disease.name}</CardDescription>}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-700 mb-2">{guideline.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (disease) {
                                  handleSelectDisease(disease)
                                  setActiveTab("search")
                                }
                              }}
                            >
                              查看详情
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="references">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">医学参考文献</h2>

                <div className="space-y-4">
                  {medicalKnowledgeService.getAllReferences().map((reference) => (
                    <Card key={reference.id} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{reference.title}</CardTitle>
                        <CardDescription>
                          {reference.authors.join(", ")} ({reference.publicationDate})
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        {reference.abstract && <p className="text-sm text-gray-700 mb-4">{reference.abstract}</p>}
                        <div className="flex flex-wrap gap-2">
                          {reference.diseaseIds.map((diseaseId) => {
                            const disease = medicalKnowledgeService.getDiseaseById(diseaseId)
                            return disease ? (
                              <Button
                                key={diseaseId}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  handleSelectDisease(disease)
                                  setActiveTab("search")
                                }}
                              >
                                {disease.name}
                              </Button>
                            ) : null
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
