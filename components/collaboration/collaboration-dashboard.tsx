"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CollaboratorsPanel } from "./collaborators-panel"
import { VersionHistory } from "./version-history"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, History, MessageSquare, Bell, Calendar, Clock, Lock, Unlock, Share2, Settings } from "lucide-react"

interface CollaborationDashboardProps {
  experimentId: string
}

export function CollaborationDashboard({ experimentId }: CollaborationDashboardProps) {
  const [activeTab, setActiveTab] = useState("collaborators")

  // 模拟协作统计数据
  const collaborationStats = {
    collaborators: 4,
    pendingInvitations: 1,
    comments: 12,
    resolvedComments: 8,
    versions: 5,
    lastUpdated: "今天 14:30",
    updatedBy: "张医生",
    updaterAvatar: "/placeholder.svg?height=40&width=40&query=张",
    progress: 75,
    status: "进行中",
    nextMeeting: "2023-09-25 10:00",
    isLocked: false,
    notifications: 3,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              协作者
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{collaborationStats.collaborators}</div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {collaborationStats.pendingInvitations} 待接受
              </Badge>
            </div>
            <div className="flex -space-x-2 mt-2">
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=40&width=40&query=张" alt="张医生" />
                <AvatarFallback>张</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=40&width=40&query=李" alt="李教授" />
                <AvatarFallback>李</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=40&width=40&query=王" alt="王研究员" />
                <AvatarFallback>王</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=40&width=40&query=赵" alt="赵医生" />
                <AvatarFallback>赵</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              评论
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{collaborationStats.comments}</div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {collaborationStats.resolvedComments} 已解决
              </Badge>
            </div>
            <Progress
              value={(collaborationStats.resolvedComments / collaborationStats.comments) * 100}
              className="h-2 mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>已解决</span>
              <span>
                {collaborationStats.resolvedComments}/{collaborationStats.comments}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <History className="h-4 w-4 text-purple-500" />
              版本
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{collaborationStats.versions}</div>
              <div className="text-xs text-muted-foreground">最后更新: {collaborationStats.lastUpdated}</div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={collaborationStats.updaterAvatar || "/placeholder.svg"}
                  alt={collaborationStats.updatedBy}
                />
                <AvatarFallback>{collaborationStats.updatedBy.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{collaborationStats.updatedBy}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{collaborationStats.progress}%</div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {collaborationStats.status}
              </Badge>
            </div>
            <Progress value={collaborationStats.progress} className="h-2 mt-2" />
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>下次会议: {collaborationStats.nextMeeting}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="collaborators" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              协作者
            </TabsTrigger>
            <TabsTrigger value="versions" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              版本历史
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            通知
            {collaborationStats.notifications > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                {collaborationStats.notifications}
              </Badge>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            {collaborationStats.isLocked ? (
              <>
                <Lock className="h-4 w-4" />
                锁定
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4" />
                解锁
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            分享
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            设置
          </Button>
        </div>
      </div>

      <TabsContent value="collaborators" className="m-0">
        <CollaboratorsPanel experimentId={experimentId} />
      </TabsContent>

      <TabsContent value="versions" className="m-0">
        <VersionHistory experimentId={experimentId} />
      </TabsContent>
    </div>
  )
}
