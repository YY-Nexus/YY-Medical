"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Users,
  Share2,
  FileText,
  MoreVertical,
  Send,
  Phone,
  ImageIcon,
  FilePlus,
  Paperclip,
  CalendarClock,
} from "lucide-react"
import Link from "next/link"

// 模拟参与者数据
const participants = [
  {
    id: 1,
    name: "王医生",
    role: "心脏科主任",
    hospital: "中心医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
  },
  {
    id: 2,
    name: "李医生",
    role: "心脏外科医生",
    hospital: "中心医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
  },
  {
    id: 3,
    name: "张医生",
    role: "放射科医生",
    hospital: "区域医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
  },
  {
    id: 4,
    name: "赵医生",
    role: "内科医生",
    hospital: "社区医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "offline",
  },
  {
    id: 5,
    name: "刘护士",
    role: "主管护士",
    hospital: "中心医院",
    avatar: "/compassionate-caregiver.png",
    status: "online",
  },
]

// 模拟聊天消息
const initialMessages = [
  {
    id: 1,
    sender: "王医生",
    content: "各位好，今天我们将讨论张先生的心脏病例。",
    time: "14:30",
    avatar: "/compassionate-doctor-consultation.png",
  },
  {
    id: 2,
    sender: "李医生",
    content: "我已经查看了患者的心电图和超声心动图，发现有明显的心肌缺血迹象。",
    time: "14:32",
    avatar: "/compassionate-doctor-consultation.png",
  },
  {
    id: 3,
    sender: "张医生",
    content: "CT扫描显示左前降支有约70%的狭窄，建议考虑介入治疗。",
    time: "14:35",
    avatar: "/compassionate-doctor-consultation.png",
  },
  {
    id: 4,
    sender: "王医生",
    content: "我同意张医生的意见，患者的症状和影像学检查都支持介入治疗。",
    time: "14:38",
    avatar: "/compassionate-doctor-consultation.png",
  },
]

export function ConsultationRoom() {
  const [activeTab, setActiveTab] = useState("video")
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  // 发送消息
  const sendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date()
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "王医生",
          content: newMessage,
          time,
          avatar: "/compassionate-doctor-consultation.png",
        },
      ])
      setNewMessage("")
    }
  }

  // 处理按键事件
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>心脏病例远程会诊</CardTitle>
          <div className="flex gap-2">
            <Link href="/teleconsultation/records">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                查看记录
              </Button>
            </Link>
            <Link href="/teleconsultation/schedule">
              <Button variant="outline" size="sm">
                <CalendarClock className="w-4 h-4 mr-2" />
                排程
              </Button>
            </Link>
            <Button variant="destructive" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              结束会诊
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="video">视频会议</TabsTrigger>
            <TabsTrigger value="chat">聊天</TabsTrigger>
            <TabsTrigger value="documents">病例文档</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="bg-gray-900 rounded-lg aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Video className="w-16 h-16 mx-auto mb-2 opacity-20" />
                      <p className="text-lg opacity-50">主视频窗口</p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      variant={videoEnabled ? "default" : "destructive"}
                      size="icon"
                      onClick={() => setVideoEnabled(!videoEnabled)}
                    >
                      {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={audioEnabled ? "default" : "destructive"}
                      size="icon"
                      onClick={() => setAudioEnabled(!audioEnabled)}
                    >
                      {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="default" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="default" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                    <Button variant="default" size="icon">
                      <Link href="/teleconsultation/experts">
                        <Users className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {participants.slice(0, 4).map((participant) => (
                    <div key={participant.id} className="relative">
                      <div
                        className={`bg-gray-800 rounded-lg aspect-video flex items-center justify-center ${
                          participant.status === "offline" ? "opacity-50" : ""
                        }`}
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute bottom-1 left-1 right-1 text-center">
                        <div className="bg-black bg-opacity-50 text-white text-xs rounded px-1 py-0.5 truncate">
                          {participant.name}
                        </div>
                      </div>
                      <div
                        className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                          participant.status === "online" ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="border rounded-lg p-3">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    参会人员 ({participants.filter((p) => p.status === "online").length}/{participants.length})
                  </h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                              participant.status === "online" ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {participant.role} · {participant.hospital}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-3 mt-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    患者信息
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground">姓名</div>
                      <div className="font-medium">张明</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">年龄</div>
                      <div className="font-medium">58岁</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">主诉</div>
                      <div className="font-medium">胸痛、气短2周</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">诊断</div>
                      <div className="font-medium">冠心病，心肌缺血</div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      查看完整病历
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="pt-4">
            <div className="border rounded-lg h-[600px] flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                        <AvatarFallback>{message.sender.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline">
                          <div className="font-medium">{message.sender}</div>
                          <div className="text-xs text-muted-foreground ml-2">{message.time}</div>
                        </div>
                        <div className="mt-1">{message.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 border-t">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="输入消息..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <FilePlus className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button size="icon" onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">病例文档</h3>
                <div className="space-y-2">
                  <div className="flex items-center p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <FileText className="w-5 h-5 text-blue-500 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium">患者病历摘要.pdf</div>
                      <div className="text-xs text-muted-foreground">上传于 2025-04-25</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                  <div className="flex items-center p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <FileText className="w-5 h-5 text-emerald-500 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium">心电图报告.pdf</div>
                      <div className="text-xs text-muted-foreground">上传于 2025-04-26</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                  <div className="flex items-center p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <FileText className="w-5 h-5 text-purple-500 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium">超声心动图.pdf</div>
                      <div className="text-xs text-muted-foreground">上传于 2025-04-26</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                  <div className="flex items-center p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <FileText className="w-5 h-5 text-amber-500 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium">CT扫描报告.pdf</div>
                      <div className="text-xs text-muted-foreground">上传于 2025-04-27</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <FilePlus className="w-4 h-4 mr-2" />
                  上传文档
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">会诊笔记</h3>
                <Textarea
                  placeholder="在此记录会诊笔记..."
                  className="min-h-[200px]"
                  defaultValue="患者张明，58岁，男性，主诉胸痛、气短2周。
                  
心电图显示ST段压低，超声心动图显示左室前壁运动减弱。

CT扫描显示左前降支有约70%的狭窄。

初步诊断为冠心病，心肌缺血。

建议：
1. 考虑冠状动脉介入治疗（PCI）
2. 继续抗血小板和他汀类药物治疗
3. 严格控制血压和血糖
4. 定期随访"
                />
                <div className="flex justify-between mt-3">
                  <Button variant="outline" size="sm">
                    清除
                  </Button>
                  <Button size="sm">保存笔记</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
