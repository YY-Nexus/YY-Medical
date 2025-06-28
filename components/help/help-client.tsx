"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, MessageSquare, Video, BookOpen, Mail, Phone } from "lucide-react"

export function HelpClient() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Tabs defaultValue="faq" className="space-y-4">
      <TabsList>
        <TabsTrigger value="faq">常见问题</TabsTrigger>
        <TabsTrigger value="guides">使用指南</TabsTrigger>
        <TabsTrigger value="videos">视频教程</TabsTrigger>
        <TabsTrigger value="contact">联系我们</TabsTrigger>
      </TabsList>

      <div className="flex items-center space-x-2 mb-4">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="搜索帮助内容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <TabsContent value="faq">
        <Card>
          <CardHeader>
            <CardTitle>常见问题</CardTitle>
            <CardDescription>查找常见问题的解答</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>如何上传和验证我的医师资质证书？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">上传和验证医师资质证书的步骤如下：</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>进入"资质验证"菜单，选择"资质上传"</li>
                    <li>点击"添加资质"按钮，选择资质类型</li>
                    <li>填写资质证书信息，包括证书编号、发证机构等</li>
                    <li>上传证书扫描件或照片</li>
                    <li>点击"验证资质"按钮，系统将自动验证证书真实性</li>
                    <li>验证成功后，点击"保存"完成上传</li>
                  </ol>
                  <p className="mt-2">验证结果通常在1-3个工作日内完成，您可以在"验证状态"页面查看进度。</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>如何使用AI辅助诊断功能？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">使用AI辅助诊断功能的步骤如下：</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>进入"智能诊断"菜单，选择"诊断中心"</li>
                    <li>选择诊断类型（如影像诊断、病历分析等）</li>
                    <li>上传相关医疗数据（如CT影像、检验报告等）</li>
                    <li>系统将自动分析数据并生成诊断建议</li>
                    <li>您可以查看详细的分析结果和参考资料</li>
                    <li>根据需要保存或导出诊断报告</li>
                  </ol>
                  <p className="mt-2">请注意，AI辅助诊断仅作为参考，最终诊断决策应由专业医师做出。</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>如何修改我的个人资料和头像？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">修改个人资料和头像的步骤如下：</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>点击页面右上角的用户头像</li>
                    <li>在下拉菜单中选择"个人资料"</li>
                    <li>在个人资料页面，点击"编辑"按钮</li>
                    <li>修改您的个人信息，如姓名、联系方式等</li>
                    <li>要更换头像，点击当前头像，选择新的图片并裁剪</li>
                    <li>完成后点击"保存"按钮应用更改</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>如何进行远程会诊？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">进行远程会诊的步骤如下：</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>进入"远程会诊"菜单，选择"会诊中心"</li>
                    <li>点击"创建会诊"按钮</li>
                    <li>填写会诊信息，包括患者资料、会诊目的等</li>
                    <li>上传相关医疗资料</li>
                    <li>选择参与会诊的专家</li>
                    <li>设置会诊时间</li>
                    <li>发送会诊邀请</li>
                    <li>在预定时间进入会诊室参与会诊</li>
                  </ol>
                  <p className="mt-2">会诊结束后，系统会自动生成会诊记录，您可以在"会诊记录"中查看。</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>如何导出患者数据和报告？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">导出患者数据和报告的步骤如下：</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>进入相应的功能模块（如患者管理、诊断记录等）</li>
                    <li>找到需要导出的数据或报告</li>
                    <li>点击数据条目右侧的"更多"按钮</li>
                    <li>在下拉菜单中选择"导出"选项</li>
                    <li>选择导出格式（如PDF、Excel、Word等）</li>
                    <li>根据提示完成导出操作</li>
                  </ol>
                  <p className="mt-2">您也可以使用批量导出功能，选择多个数据条目后点击页面上方的"导出"按钮。</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="guides">
        <Card>
          <CardHeader>
            <CardTitle>使用指南</CardTitle>
            <CardDescription>详细的系统功能使用指南</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start">
                  <FileText className="h-8 w-8 mr-4 text-medical-500" />
                  <div>
                    <h3 className="font-medium">入门指南</h3>
                    <p className="text-sm text-muted-foreground">系统基本功能和界面介绍</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start">
                  <FileText className="h-8 w-8 mr-4 text-medical-500" />
                  <div>
                    <h3 className="font-medium">资质验证指南</h3>
                    <p className="text-sm text-muted-foreground">如何上传和验证医师资质</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start">
                  <FileText className="h-8 w-8 mr-4 text-medical-500" />
                  <div>
                    <h3 className="font-medium">AI诊断使用指南</h3>
                    <p className="text-sm text-muted-foreground">AI辅助诊断功能详解</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start">
                  <FileText className="h-8 w-8 mr-4 text-medical-500" />
                  <div>
                    <h3 className="font-medium">远程会诊指南</h3>
                    <p className="text-sm text-muted-foreground">如何创建和参与远程会诊</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start">
                  <FileText className="h-8 w-8 mr-4 text-medical-500" />
                  <div>
                    <h3 className="font-medium">患者管理指南</h3>
                    <p className="text-sm text-muted-foreground">患者信息和病历管理</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-start">
                  <FileText className="h-8 w-8 mr-4 text-medical-500" />
                  <div>
                    <h3 className="font-medium">数据安全指南</h3>
                    <p className="text-sm text-muted-foreground">保护患者数据和账号安全</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="videos">
        <Card>
          <CardHeader>
            <CardTitle>视频教程</CardTitle>
            <CardDescription>观看系统功能视频教程</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">系统功能概览</h3>
                  <p className="text-sm text-muted-foreground">5:30 • 系统主要功能介绍</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">资质验证流程</h3>
                  <p className="text-sm text-muted-foreground">3:45 • 如何验证医师资质</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">AI诊断实操演示</h3>
                  <p className="text-sm text-muted-foreground">7:20 • AI辅助诊断使用演示</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">远程会诊操作指南</h3>
                  <p className="text-sm text-muted-foreground">6:15 • 远程会诊全流程演示</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact">
        <Card>
          <CardHeader>
            <CardTitle>联系我们</CardTitle>
            <CardDescription>获取技术支持和帮助</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">联系方式</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-medical-500" />
                    <div>
                      <p className="font-medium">电子邮件</p>
                      <p className="text-sm text-muted-foreground">support@medinexus.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-medical-500" />
                    <div>
                      <p className="font-medium">客服热线</p>
                      <p className="text-sm text-muted-foreground">400-888-9999（工作日 9:00-18:00）</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-3 text-medical-500" />
                    <div>
                      <p className="font-medium">在线客服</p>
                      <p className="text-sm text-muted-foreground">点击右下角客服图标</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">常用资源</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      用户手册
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      常见问题解答
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      视频教程库
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">发送反馈</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="subject">主题</Label>
                    <Input id="subject" placeholder="请输入反馈主题" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">反馈类型</Label>
                    <Select defaultValue="question">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="选择反馈类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="question">使用问题</SelectItem>
                        <SelectItem value="bug">系统故障</SelectItem>
                        <SelectItem value="suggestion">功能建议</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">详细描述</Label>
                    <Textarea id="message" placeholder="请详细描述您的问题或建议..." rows={5} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">联系方式（选填）</Label>
                    <Input id="contact" placeholder="您的邮箱或电话" />
                  </div>

                  <Button className="w-full">提交反馈</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
