"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Loader2, RefreshCw, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockGenerateAIAvatar, type AvatarGenerationParams } from "@/services/ai-avatar-service"
import { useToast } from "@/components/ui/use-toast"

interface AIAvatarGeneratorProps {
  onSelect: (avatarUrl: string) => void
  className?: string
}

export function AIAvatarGenerator({ onSelect, className }: AIAvatarGeneratorProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null)
  const { toast } = useToast()

  // 基本参数
  const [gender, setGender] = useState<"male" | "female" | "other">("male")
  const [ageRange, setAgeRange] = useState<"young" | "middle" | "senior">("middle")
  const [specialty, setSpecialty] = useState("")
  const [style, setStyle] = useState<"realistic" | "cartoon" | "artistic" | "minimalist">("realistic")

  // 高级参数
  const [hairColor, setHairColor] = useState("")
  const [hairStyle, setHairStyle] = useState("")
  const [medicalAttire, setMedicalAttire] = useState("white coat")
  const [backgroundColor, setBackgroundColor] = useState("light blue")
  const [accessories, setAccessories] = useState<string[]>([])
  const [facialFeatures, setFacialFeatures] = useState<string[]>([])
  const [additionalPrompt, setAdditionalPrompt] = useState("")

  const handleAccessoryToggle = (value: string) => {
    setAccessories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleFeatureToggle = (value: string) => {
    setFacialFeatures((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    setGeneratedAvatar(null)

    try {
      const params: AvatarGenerationParams = {
        gender,
        ageRange,
        specialty: specialty || undefined,
        style,
        hairColor: hairColor || undefined,
        hairStyle: hairStyle || undefined,
        medicalAttire: medicalAttire || undefined,
        backgroundColor: backgroundColor || undefined,
        accessories: accessories.length > 0 ? accessories : undefined,
        facialFeatures: facialFeatures.length > 0 ? facialFeatures : undefined,
        additionalPrompt: additionalPrompt || undefined,
      }

      // 在生产环境中使用实际API，在开发环境中使用模拟数据
      const result = await mockGenerateAIAvatar(params)

      if (result.success && result.imageUrl) {
        setGeneratedAvatar(result.imageUrl)
      } else {
        toast({
          title: "生成失败",
          description: result.error || "无法生成头像，请稍后重试",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("头像生成错误:", error)
      toast({
        title: "生成失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }, [
    gender,
    ageRange,
    specialty,
    style,
    hairColor,
    hairStyle,
    medicalAttire,
    backgroundColor,
    accessories,
    facialFeatures,
    additionalPrompt,
    toast,
  ])

  const handleSelect = () => {
    if (generatedAvatar) {
      onSelect(generatedAvatar)
      setOpen(false)
      toast({
        title: "头像已应用",
        description: "AI生成的头像已成功应用到您的个人资料",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={cn("text-xs", className)}>
          <Sparkles className="mr-1 h-3 w-3" />
          AI生成头像
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wand2 className="mr-2 h-5 w-5 text-primary" />
            AI医疗头像生成
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">基本设置</TabsTrigger>
                <TabsTrigger value="advanced">高级设置</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>性别</Label>
                  <RadioGroup
                    value={gender}
                    onValueChange={(value) => setGender(value as any)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">男性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">女性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">其他</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>年龄段</Label>
                  <Select value={ageRange} onValueChange={(value) => setAgeRange(value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择年龄段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="young">青年 (25-35岁)</SelectItem>
                      <SelectItem value="middle">中年 (35-50岁)</SelectItem>
                      <SelectItem value="senior">资深 (50-65岁)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>专业领域</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择专业领域" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general medicine">全科医学</SelectItem>
                      <SelectItem value="surgery">外科</SelectItem>
                      <SelectItem value="pediatrics">儿科</SelectItem>
                      <SelectItem value="cardiology">心脏病学</SelectItem>
                      <SelectItem value="neurology">神经学</SelectItem>
                      <SelectItem value="oncology">肿瘤学</SelectItem>
                      <SelectItem value="radiology">放射学</SelectItem>
                      <SelectItem value="anesthesiology">麻醉学</SelectItem>
                      <SelectItem value="psychiatry">精神病学</SelectItem>
                      <SelectItem value="dermatology">皮肤科</SelectItem>
                      <SelectItem value="ophthalmology">眼科</SelectItem>
                      <SelectItem value="orthopedics">骨科</SelectItem>
                      <SelectItem value="gynecology">妇科</SelectItem>
                      <SelectItem value="urology">泌尿科</SelectItem>
                      <SelectItem value="emergency medicine">急诊医学</SelectItem>
                      <SelectItem value="family medicine">家庭医学</SelectItem>
                      <SelectItem value="internal medicine">内科</SelectItem>
                      <SelectItem value="pathology">病理学</SelectItem>
                      <SelectItem value="pharmacy">药剂学</SelectItem>
                      <SelectItem value="physical therapy">物理治疗</SelectItem>
                      <SelectItem value="nursing">护理学</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>风格</Label>
                  <Select value={style} onValueChange={(value) => setStyle(value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择风格" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">写实风格</SelectItem>
                      <SelectItem value="cartoon">卡通风格</SelectItem>
                      <SelectItem value="artistic">艺术风格</SelectItem>
                      <SelectItem value="minimalist">极简风格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>发色</Label>
                  <Input
                    placeholder="例如：黑色、棕色、金色..."
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>发型</Label>
                  <Input
                    placeholder="例如：短发、长发、卷发..."
                    value={hairStyle}
                    onChange={(e) => setHairStyle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>医疗服装</Label>
                  <Select value={medicalAttire} onValueChange={setMedicalAttire}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择医疗服装" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="white coat">白大褂</SelectItem>
                      <SelectItem value="scrubs">手术服</SelectItem>
                      <SelectItem value="lab coat">实验室大衣</SelectItem>
                      <SelectItem value="formal attire with white coat">正装配白大褂</SelectItem>
                      <SelectItem value="nursing uniform">护士制服</SelectItem>
                      <SelectItem value="business casual with stethoscope">商务休闲装配听诊器</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>背景颜色</Label>
                  <Select value={backgroundColor} onValueChange={setBackgroundColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择背景颜色" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light blue">淡蓝色</SelectItem>
                      <SelectItem value="white">白色</SelectItem>
                      <SelectItem value="light gray">浅灰色</SelectItem>
                      <SelectItem value="teal">蓝绿色</SelectItem>
                      <SelectItem value="navy blue">海军蓝</SelectItem>
                      <SelectItem value="soft gradient">柔和渐变</SelectItem>
                      <SelectItem value="hospital background">医院背景</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>配饰</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="stethoscope"
                        checked={accessories.includes("stethoscope")}
                        onCheckedChange={() => handleAccessoryToggle("stethoscope")}
                      />
                      <Label htmlFor="stethoscope">听诊器</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="glasses"
                        checked={accessories.includes("glasses")}
                        onCheckedChange={() => handleAccessoryToggle("glasses")}
                      />
                      <Label htmlFor="glasses">眼镜</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="surgical mask"
                        checked={accessories.includes("surgical mask")}
                        onCheckedChange={() => handleAccessoryToggle("surgical mask")}
                      />
                      <Label htmlFor="surgical mask">口罩</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="name badge"
                        checked={accessories.includes("name badge")}
                        onCheckedChange={() => handleAccessoryToggle("name badge")}
                      />
                      <Label htmlFor="name badge">胸牌</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="surgical cap"
                        checked={accessories.includes("surgical cap")}
                        onCheckedChange={() => handleAccessoryToggle("surgical cap")}
                      />
                      <Label htmlFor="surgical cap">手术帽</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pen in pocket"
                        checked={accessories.includes("pen in pocket")}
                        onCheckedChange={() => handleAccessoryToggle("pen in pocket")}
                      />
                      <Label htmlFor="pen in pocket">口袋笔</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>面部特征</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smile"
                        checked={facialFeatures.includes("smile")}
                        onCheckedChange={() => handleFeatureToggle("smile")}
                      />
                      <Label htmlFor="smile">微笑</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="serious expression"
                        checked={facialFeatures.includes("serious expression")}
                        onCheckedChange={() => handleFeatureToggle("serious expression")}
                      />
                      <Label htmlFor="serious expression">严肃表情</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="beard"
                        checked={facialFeatures.includes("beard")}
                        onCheckedChange={() => handleFeatureToggle("beard")}
                      />
                      <Label htmlFor="beard">胡须</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="freckles"
                        checked={facialFeatures.includes("freckles")}
                        onCheckedChange={() => handleFeatureToggle("freckles")}
                      />
                      <Label htmlFor="freckles">雀斑</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>附加提示词</Label>
                  <Input
                    placeholder="添加其他特征描述..."
                    value={additionalPrompt}
                    onChange={(e) => setAdditionalPrompt(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4">
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    生成AI头像
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 border rounded-lg p-6">
            {generatedAvatar ? (
              <>
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={generatedAvatar || "/placeholder.svg"}
                    alt="AI生成头像"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                    <RefreshCw className="mr-1 h-4 w-4" />
                    重新生成
                  </Button>
                  <Button size="sm" onClick={handleSelect}>
                    使用此头像
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-16 w-16 text-primary/50 animate-spin" />
                    <p className="text-muted-foreground">AI正在创建您的专业医疗头像...</p>
                  </>
                ) : (
                  <>
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <div>
                      <p className="font-medium">您的AI医疗头像将在这里显示</p>
                      <p className="text-sm text-muted-foreground">根据您的特征和偏好生成专业医疗头像</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
