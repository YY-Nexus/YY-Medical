"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalButton } from "@/components/ui/medical-button"
import { UserPlus, Upload } from "lucide-react"

export function AddPatientDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          添加患者
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>添加新患者</DialogTitle>
          <DialogDescription>输入患者信息以创建新的患者记录</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="manual">手动输入</TabsTrigger>
            <TabsTrigger value="import">批量导入</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input id="name" placeholder="请输入患者姓名" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">性别</Label>
                <Select id="gender">
                  <option value="">请选择</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">年龄</Label>
                <Input id="age" type="number" placeholder="请输入年龄" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">联系电话</Label>
                <Input id="phone" placeholder="请输入联系电话" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">电子邮箱</Label>
                <Input id="email" type="email" placeholder="请输入电子邮箱" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-type">证件类型</Label>
                <Select id="id-type">
                  <option value="">请选择</option>
                  <option value="id-card">身份证</option>
                  <option value="passport">护照</option>
                  <option value="other">其他</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-number">证件号码</Label>
                <Input id="id-number" placeholder="请输入证件号码" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blood-type">血型</Label>
                <Select id="blood-type">
                  <option value="">请选择</option>
                  <option value="A">A型</option>
                  <option value="B">B型</option>
                  <option value="AB">AB型</option>
                  <option value="O">O型</option>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">家庭住址</Label>
              <Input id="address" placeholder="请输入家庭住址" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical-history">病史简述</Label>
              <textarea
                id="medical-history"
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md"
                placeholder="请输入患者病史简述"
              ></textarea>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center">
                <Upload className="h-10 w-10 text-medical-500 mb-2" />
                <h3 className="text-lg font-medium">拖放文件或点击上传</h3>
                <p className="text-sm text-medical-500 mt-1">支持 .xlsx, .csv 格式文件</p>
                <Button variant="outline" className="mt-4">
                  选择文件
                </Button>
              </div>
            </div>

            <div className="bg-medical-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">批量导入说明</h4>
              <ul className="text-sm text-medical-600 space-y-1 list-disc pl-5">
                <li>请使用系统提供的模板文件进行填写</li>
                <li>确保必填字段（姓名、性别、年龄、联系方式）已填写</li>
                <li>文件大小不超过5MB</li>
                <li>一次最多可导入500条患者记录</li>
              </ul>
              <Button variant="link" className="text-medical-600 p-0 h-auto mt-2">
                下载导入模板
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <MedicalButton className="bg-medical-gradient text-white">保存患者信息</MedicalButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
