"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Mail,
  Clock,
  CheckCircle,
  MessageSquare,
  Eye,
  Edit,
  Trash,
  UserCog,
  Shield,
  Users,
} from "lucide-react"

// 模拟协作者数据
const collaborators = [
  {
    id: "user-001",
    name: "张医生",
    email: "zhang@hospital.edu",
    role: "主要研究者",
    department: "内分泌科",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
    status: "active",
    lastActive: "10分钟前",
    permissions: ["edit", "invite", "admin"],
  },
  {
    id: "user-002",
    name: "李教授",
    email: "li@university.edu",
    role: "统计顾问",
    department: "医学统计系",
    avatar: "/placeholder.svg?height=40&width=40&query=李",
    status: "active",
    lastActive: "1小时前",
    permissions: ["edit", "comment"],
  },
  {
    id: "user-003",
    name: "王研究员",
    email: "wang@research.org",
    role: "研究协调员",
    department: "临床研究中心",
    avatar: "/placeholder.svg?height=40&width=40&query=王",
    status: "active",
    lastActive: "今天 09:45",
    permissions: ["edit", "invite"],
  },
  {
    id: "user-004",
    name: "赵医生",
    email: "zhao@hospital.edu",
    role: "研究医生",
    department: "内分泌科",
    avatar: "/placeholder.svg?height=40&width=40&query=赵",
    status: "pending",
    lastActive: "尚未接受邀请",
    permissions: ["view", "comment"],
  },
]

// 模拟活动历史数据
const activityHistory = [
  {
    id: "act-001",
    user: "张医生",
    action: "编辑了研究目标",
    timestamp: "今天 14:30",
    details: "更新了研究目标描述，增加了次要目标。",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
  },
  {
    id: "act-002",
    user: "李教授",
    action: "修改了统计分析方法",
    timestamp: "今天 11:15",
    details: "将t检验改为Wilcoxon秩和检验，更适合非正态分布数据。",
    avatar: "/placeholder.svg?height=40&width=40&query=李",
  },
  {
    id: "act-003",
    user: "王研究员",
    action: "添加了新的研究组",
    timestamp: "昨天 16:45",
    details: "添加了高剂量组，样本量设为50例。",
    avatar: "/placeholder.svg?height=40&width=40&query=王",
  },
  {
    id: "act-004",
    user: "张医生",
    action: "上传了伦理申请文件",
    timestamp: "昨天 10:20",
    details: "上传了伦理委员会申请表和知情同意书模板。",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
  },
  {
    id: "act-005",
    user: "李教授",
    action: "评论了样本量计算",
    timestamp: "2023-09-18 15:30",
    details: "建议考虑增加脱落率的估计，从15%调整到20%。",
    avatar: "/placeholder.svg?height=40&width=40&query=李",
  },
]

// 模拟评论数据
const comments = [
  {
    id: "comment-001",
    user: "李教授",
    content: "样本量计算需要考虑更高的脱落率，建议从15%调整到20%。",
    timestamp: "2023-09-18 15:30",
    avatar: "/placeholder.svg?height=40&width=40&query=李",
    section: "样本量计算",
    resolved: false,
  },
  {
    id: "comment-002",
    user: "王研究员",
    content: "纳入标准中年龄范围是否考虑扩大到65岁以上？这样可能更有利于招募。",
    timestamp: "2023-09-17 11:20",
    avatar: "/placeholder.svg?height=40&width=40&query=王",
    section: "纳入标准",
    resolved: true,
    resolvedBy: "张医生",
    resolvedAt: "2023-09-17 14:45",
  },
  {
    id: "comment-003",
    user: "张医生",
    content: "主要结局指标的测量时间点是否需要增加一个中期评估？",
    timestamp: "2023-09-16 09:15",
    avatar: "/placeholder.svg?height=40&width=40&query=张",
    section: "结局指标",
    resolved: false,
  },
]

interface CollaboratorsPanelProps {
  experimentId: string
}

export function CollaboratorsPanel({ experimentId }: CollaboratorsPanelProps) {
  const [activeTab, setActiveTab] = useState("collaborators")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤协作者
  const filteredCollaborators = collaborators.filter(
    (collaborator) =>
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            活跃
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            待接受
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // 获取权限标签
  const getPermissionLabel = (permission: string) => {
    switch (permission) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Shield className="h-3 w-3 mr-1" />
            管理员
          </Badge>
        )
      case "edit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Edit className="h-3 w-3 mr-1" />
            编辑
          </Badge>
        )
      case "comment":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <MessageSquare className="h-3 w-3 mr-1" />
            评论
          </Badge>
        )
      case "view":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Eye className="h-3 w-3 mr-1" />
            查看
          </Badge>
        )
      case "invite":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            <UserPlus className="h-3 w-3 mr-1" />
            邀请
          </Badge>
        )
      default:
        return <Badge variant="outline">{permission}</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>协作管理</CardTitle>
            <CardDescription>管理研究协作者和查看活动历史</CardDescription>
          </div>
          <Button onClick={() => setShowInviteDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            邀请协作者
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="collaborators">协作者</TabsTrigger>
              <TabsTrigger value="activity">活动历史</TabsTrigger>
              <TabsTrigger value="comments">评论</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="collaborators" className="flex-1 px-6">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索协作者..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-3">
                {filteredCollaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{collaborator.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {collaborator.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm">{collaborator.role}</div>
                        <div className="text-xs text-muted-foreground">{collaborator.department}</div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <div>{getStatusBadge(collaborator.status)}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {collaborator.lastActive}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>管理协作者</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <UserCog className="h-4 w-4 mr-2" />
                            修改权限
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            发送消息
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            移除协作者
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}

                {filteredCollaborators.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">未找到匹配的协作者</h3>
                    <p className="text-muted-foreground max-w-md">尝试使用不同的搜索词，或者邀请新的协作者</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="activity" className="flex-1 px-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {activityHistory.map((activity) => (
                  <div key={activity.id} className="flex gap-3 p-3 border rounded-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>{activity.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{activity.user}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                      </div>
                      <p className="text-sm mt-1">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="comments" className="flex-1 px-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`flex gap-3 p-3 border rounded-md ${comment.resolved ? "bg-gray-50" : "bg-white"}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                      <AvatarFallback>{comment.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            评论于 <span className="section-link">{comment.section}</span>
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{comment.timestamp}</div>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                      {comment.resolved && (
                        <div className="mt-2 text-xs flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          已由 {comment.resolvedBy} 解决于 {comment.resolvedAt}
                        </div>
                      )}
                      {!comment.resolved && (
                        <div className="mt-2 flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            回复
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            标记为已解决
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>邀请协作者</DialogTitle>
            <DialogDescription>邀请团队成员协作编辑此研究设计</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input id="email" placeholder="输入邮箱地址" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">角色</Label>
              <Input id="role" placeholder="输入角色，如研究医生、统计顾问等" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permission">权限</Label>
              <Select defaultValue="edit">
                <SelectTrigger>
                  <SelectValue placeholder="选择权限" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">管理员 (完全控制)</SelectItem>
                  <SelectItem value="edit">编辑 (可修改内容)</SelectItem>
                  <SelectItem value="comment">评论 (只能评论)</SelectItem>
                  <SelectItem value="view">查看 (只读权限)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">邀请消息 (可选)</Label>
              <Input id="message" placeholder="输入邀请消息" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowInviteDialog(false)}>发送邀请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
