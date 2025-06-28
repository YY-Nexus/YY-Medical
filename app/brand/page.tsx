import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorSystem } from "@/components/brand/color-system"
import { IconSystem } from "@/components/brand/icon-system"
import { IllustrationSystem } from "@/components/brand/illustration-system"
import { VoiceSystem } from "@/components/brand/voice-system"
import { StorySystem } from "@/components/brand/story-system"
import { UXConsistency } from "@/components/brand/ux-consistency"
import { AssetManagement } from "@/components/brand/asset-management"
import { BrandLogo } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "品牌系统 | 言语医枢³智能诊疗系统",
  description: "言语医枢³智能诊疗系统的完整品牌系统，包括视觉系统、语音设计、品牌故事和资产管理",
}

export default function BrandPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">言语「 医枢³」品牌系统</h1>
          <p className="text-medical-600">完整的品牌视觉系统、语音设计、品牌故事和资产管理</p>
        </div>
        <BrandLogo variant="compact" />
      </div>

      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-8">
          <TabsTrigger value="visual">视觉系统</TabsTrigger>
          <TabsTrigger value="voice">语音设计</TabsTrigger>
          <TabsTrigger value="story">品牌故事</TabsTrigger>
          <TabsTrigger value="ux">用户体验</TabsTrigger>
          <TabsTrigger value="assets">资产管理</TabsTrigger>
        </TabsList>
        <TabsContent value="visual" className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">品牌色彩系统</h2>
            <ColorSystem />
          </section>
          <section>
            <h2 className="text-xl font-bold mb-4">品牌图标系统</h2>
            <IconSystem />
          </section>
          <section>
            <h2 className="text-xl font-bold mb-4">品牌插图风格</h2>
            <IllustrationSystem />
          </section>
        </TabsContent>
        <TabsContent value="voice">
          <section>
            <h2 className="text-xl font-bold mb-4">品牌语音设计</h2>
            <VoiceSystem />
          </section>
        </TabsContent>
        <TabsContent value="story">
          <section>
            <h2 className="text-xl font-bold mb-4">品牌故事与场景</h2>
            <StorySystem />
          </section>
        </TabsContent>
        <TabsContent value="ux">
          <section>
            <h2 className="text-xl font-bold mb-4">用户体验一致性</h2>
            <UXConsistency />
          </section>
        </TabsContent>
        <TabsContent value="assets">
          <section>
            <h2 className="text-xl font-bold mb-4">品牌资产管理</h2>
            <AssetManagement />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
