"use client"

import type React from "react"

import { useState } from "react"
import { Button3d } from "@/components/ui/3d-button"
import { Card3d, Card3dContent, Card3dHeader, Card3dTitle } from "@/components/ui/3d-card"
import { EnhancedForm, EnhancedInput, FormField } from "@/components/ui/enhanced-form"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { DynamicLoading } from "@/components/ui/dynamic-loading"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { PageTransition } from "@/components/ui/page-transition"
import { Brain, Heart, User, Mail, Lock, Calendar, Activity, Stethoscope, Pill, FileText } from "lucide-react"

export default function UIShowcasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("表单提交成功！")
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const tableData = [
    { id: 1, name: "张三", age: 32, department: "内科", status: "在线" },
    { id: 2, name: "李四", age: 45, department: "外科", status: "离线" },
    { id: 3, name: "王五", age: 28, department: "儿科", status: "在线" },
  ]

  const tableColumns = [
    { header: "ID", accessorKey: "id" as const, sortable: true },
    { header: "姓名", accessorKey: "name" as const, sortable: true },
    { header: "年龄", accessorKey: "age" as const, sortable: true },
    { header: "科室", accessorKey: "department" as const },
    {
      header: "状态",
      accessorKey: "status" as const,
      cell: (item: (typeof tableData)[0]) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.status === "在线" ? "bg-success-100 text-success-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          <span
            className={`mr-1 h-1.5 w-1.5 rounded-full ${item.status === "在线" ? "bg-success-500" : "bg-gray-500"}`}
          />
          {item.status}
        </span>
      ),
    },
  ]

  return (
    <PageTransition animation="slide-up">
      <div className="container mx-auto p-4 md:p-6 space-y-8 pb-20 md:pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-medical-800 mb-6">MediNexus³ UI组件展示</h1>

        {/* 按钮展示 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">立体按钮</h2>
          <Card3d className="p-6">
            <Card3dHeader>
              <Card3dTitle>按钮变体</Card3dTitle>
            </Card3dHeader>
            <Card3dContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button3d>默认按钮</Button3d>
                <Button3d variant="secondary">次要按钮</Button3d>
                <Button3d variant="outline">轮廓按钮</Button3d>
                <Button3d variant="destructive">危险按钮</Button3d>
                <Button3d variant="success">成功按钮</Button3d>
                <Button3d variant="warning">警告按钮</Button3d>
                <Button3d variant="ghost">幽灵按钮</Button3d>
                <Button3d variant="link">链接按钮</Button3d>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-medical-800 mb-3">按钮尺寸</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button3d size="sm">小按钮</Button3d>
                  <Button3d>默认按钮</Button3d>
                  <Button3d size="lg">大按钮</Button3d>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-medical-800 mb-3">带图标按钮</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button3d icon={<Brain className="h-4 w-4" />}>AI诊断</Button3d>
                  <Button3d variant="secondary" icon={<Heart className="h-4 w-4" />} iconPosition="right">
                    健康数据
                  </Button3d>
                  <Button3d variant="outline" icon={<User className="h-4 w-4" />}>
                    用户信息
                  </Button3d>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-medical-800 mb-3">动画效果</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button3d animation="bounce">弹跳效果</Button3d>
                  <Button3d animation="scale" variant="secondary">
                    缩放效果
                  </Button3d>
                  <Button3d animation="glow" variant="outline">
                    发光效果
                  </Button3d>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-medical-800 mb-3">加载状态</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button3d isLoading>加载中</Button3d>
                  <Button3d variant="secondary" isLoading>
                    处理中
                  </Button3d>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-medical-800 mb-3">圆角变体</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button3d rounded="full">圆形按钮</Button3d>
                  <Button3d variant="secondary" rounded="full">
                    圆形按钮
                  </Button3d>
                </div>
              </div>
            </Card3dContent>
          </Card3d>
        </section>

        {/* 卡片展示 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">立体卡片</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card3d variant="default">
              <Card3dHeader>
                <Card3dTitle>默认卡片</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>这是一个默认样式的卡片组件，适用于展示一般内容。</Card3dContent>
            </Card3d>

            <Card3d variant="elevated">
              <Card3dHeader>
                <Card3dTitle>浮起卡片</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>这是一个浮起样式的卡片，悬停时会有轻微上浮效果。</Card3dContent>
            </Card3d>

            <Card3d variant="floating">
              <Card3dHeader>
                <Card3dTitle>漂浮卡片</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>这是一个漂浮样式的卡片，悬停时会有明显上浮效果。</Card3dContent>
            </Card3d>

            <Card3d variant="flat">
              <Card3dHeader>
                <Card3dTitle>扁平卡片</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>这是一个扁平样式的卡片，没有明显的阴影效果。</Card3dContent>
            </Card3d>

            <Card3d variant="gradient">
              <Card3dHeader>
                <Card3dTitle className="text-white">渐变卡片</Card3dTitle>
              </Card3dHeader>
              <Card3dContent className="text-white">这是一个渐变背景的卡片，适用于强调重要内容。</Card3dContent>
            </Card3d>

            <Card3d variant="3d">
              <Card3dHeader>
                <Card3dTitle>3D卡片</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>这是一个3D效果的卡片，有明显的立体感。</Card3dContent>
            </Card3d>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-medical-800 mb-3">卡片动画效果</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card3d variant="default" animation="float" interactive>
                <Card3dHeader>
                  <Card3dTitle>漂浮动画</Card3dTitle>
                </Card3dHeader>
                <Card3dContent>悬停时会有上下漂浮的动画效果。</Card3dContent>
              </Card3d>

              <Card3d variant="default" animation="scale" interactive>
                <Card3dHeader>
                  <Card3dTitle>缩放动画</Card3dTitle>
                </Card3dHeader>
                <Card3dContent>悬停时会有轻微放大的动画效果。</Card3dContent>
              </Card3d>

              <Card3d variant="default" animation="rotate" interactive>
                <Card3dHeader>
                  <Card3dTitle>旋转动画</Card3dTitle>
                </Card3dHeader>
                <Card3dContent>悬停时会有轻微旋转的动画效果。</Card3dContent>
              </Card3d>

              <Card3d variant="default" animation="bounce" interactive>
                <Card3dHeader>
                  <Card3dTitle>弹跳动画</Card3dTitle>
                </Card3dHeader>
                <Card3dContent>悬停时会有弹跳的动画效果。</Card3dContent>
              </Card3d>
            </div>
          </div>
        </section>

        {/* 交互式卡片 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">交互式卡片</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InteractiveCard
              title="AI诊断"
              description="使用人工智能辅助医疗诊断"
              icon={<Brain className="h-5 w-5" />}
              onClick={() => alert("点击了AI诊断卡片")}
              variant="3d"
            >
              <p className="text-sm text-medical-600">基于深度学习的医学影像分析和自然语言处理技术。</p>
            </InteractiveCard>

            <InteractiveCard
              title="健康监测"
              description="实时监测患者生命体征"
              icon={<Activity className="h-5 w-5" />}
              isActive
              onClick={() => alert("点击了健康监测卡片")}
              animation="float"
            >
              <p className="text-sm">支持心率、血压、血氧等多项指标的连续监测。</p>
            </InteractiveCard>

            <InteractiveCard
              title="预约管理"
              description="管理医生和患者的预约"
              icon={<Calendar className="h-5 w-5" />}
              isDisabled
              onClick={() => alert("此功能暂未开放")}
              variant="elevated"
            >
              <p className="text-sm text-medical-600">智能排班系统，自动匹配最佳预约时间。</p>
            </InteractiveCard>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <InteractiveCard
              title="医生咨询"
              icon={<Stethoscope className="h-5 w-5" />}
              variant="neuromorphic"
              animation="scale"
            />
            <InteractiveCard title="药物管理" icon={<Pill className="h-5 w-5" />} variant="flat" animation="rotate" />
            <InteractiveCard
              title="病历查看"
              icon={<FileText className="h-5 w-5" />}
              variant="floating"
              animation="bounce"
            />
            <InteractiveCard
              title="健康报告"
              icon={<Heart className="h-5 w-5" />}
              variant="gradient"
              animation="none"
            />
          </div>
        </section>

        {/* 表单组件 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">增强表单</h2>
          <Card3d className="p-6" variant="3d">
            <EnhancedForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              submitText="提交表单"
              cancelText="取消"
              onCancel={() => alert("取消表单")}
            >
              <FormField label="姓名" htmlFor="name" required>
                <EnhancedInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="请输入姓名"
                  icon={<User className="h-4 w-4" />}
                />
              </FormField>

              <FormField
                label="邮箱"
                htmlFor="email"
                required
                error={formData.email && !formData.email.includes("@") ? "请输入有效的邮箱地址" : undefined}
              >
                <EnhancedInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="请输入邮箱"
                  icon={<Mail className="h-4 w-4" />}
                  error={formData.email && !formData.email.includes("@")}
                />
              </FormField>

              <FormField label="密码" htmlFor="password" required description="密码长度至少为8位，包含字母和数字">
                <EnhancedInput
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="请输入密码"
                  icon={<Lock className="h-4 w-4" />}
                />
              </FormField>
            </EnhancedForm>
          </Card3d>
        </section>

        {/* 加载组件 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">动态加载</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card3d variant="elevated">
              <DynamicLoading isLoading={true} size="sm" variant="medical">
                <p>内容已加载</p>
              </DynamicLoading>
            </Card3d>

            <Card3d variant="elevated">
              <DynamicLoading isLoading={true} loadingText="数据加载中..." size="md" variant="accent">
                <p>内容已加载</p>
              </DynamicLoading>
            </Card3d>

            <Card3d variant="elevated">
              <DynamicLoading isLoading={true} loadingText="请稍候..." size="lg" variant="success">
                <p>内容已加载</p>
              </DynamicLoading>
            </Card3d>
          </div>
        </section>

        {/* 响应式表格 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">响应式表格</h2>
          <Card3d className="p-0 overflow-hidden" variant="3d">
            <ResponsiveTable
              data={tableData}
              columns={tableColumns}
              onRowClick={(item) => alert(`点击了 ${item.name} 的行`)}
            />
          </Card3d>
        </section>

        {/* 页面过渡动画 */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">页面过渡动画</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card3d variant="elevated">
              <Card3dHeader>
                <Card3dTitle>页面过渡动画类型</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>
                <ul className="list-disc list-inside space-y-2 text-medical-700">
                  <li>淡入淡出 (fade)</li>
                  <li>向上滑入 (slide-up)</li>
                  <li>向下滑入 (slide-down)</li>
                  <li>向左滑入 (slide-left)</li>
                  <li>向右滑入 (slide-right)</li>
                  <li>缩放 (scale)</li>
                  <li>旋转 (rotate)</li>
                </ul>
              </Card3dContent>
            </Card3d>

            <Card3d variant="elevated">
              <Card3dHeader>
                <Card3dTitle>使用方法</Card3dTitle>
              </Card3dHeader>
              <Card3dContent>
                <p className="text-medical-700 mb-4">
                  将页面内容包裹在 PageTransition 组件中，并指定动画类型和持续时间：
                </p>
                <pre className="bg-medical-50 p-3 rounded-md text-xs overflow-auto">
                  {`<PageTransition animation="slide-up" duration={0.5}>
  <YourPageContent />
</PageTransition>`}
                </pre>
              </Card3dContent>
            </Card3d>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
