"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { CaseComment } from "../../types/case-library"
import { MessageSquare, Send, Reply, ThumbsUp, Paperclip, ImageIcon, File, X } from "lucide-react"

interface CaseCommentsProps {
  comments: CaseComment[]
  caseId: string
}

export function CaseComments({ comments, caseId }: CaseCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  // 处理添加评论
  const handleAddComment = () => {
    if (newComment.trim() === "") return
    // 在实际应用中，这里应该调用API来保存新的评论
    console.log("添加评论:", newComment)
    setNewComment("")
  }

  // 处理添加回复
  const handleAddReply = (commentId: string) => {
    if (replyContent.trim() === "") return
    // 在实际应用中，这里应该调用API来保存新的回复
    console.log("添加回复:", { commentId, content: replyContent })
    setReplyTo(null)
    setReplyContent("")
  }

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setAttachments([...attachments, ...fileArray])
    }
  }

  // 处理移除附件
  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // 获取用户角色颜色
  const getRoleColor = (role: string) => {
    switch (role) {
      case "医生":
        return "bg-blue-100 text-blue-800"
      case "专家":
        return "bg-purple-100 text-purple-800"
      case "研究员":
        return "bg-green-100 text-green-800"
      case "学生":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取用户头像
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          讨论与评论 ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 评论列表 */}
        <ScrollArea className="h-[400px] pr-4 mb-4">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500">暂无评论，成为第一个评论的人吧！</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>{getUserInitials(comment.userName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.userName}</span>
                        <Badge className={getRoleColor(comment.userRole)}>{comment.userRole}</Badge>
                        <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-800">{comment.content}</p>

                      {/* 附件 */}
                      {comment.attachments && comment.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {comment.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center p-2 bg-gray-50 rounded-md text-sm">
                              {attachment.type.startsWith("image/") ? (
                                <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
                              ) : (
                                <File className="h-4 w-4 mr-2 text-blue-500" />
                              )}
                              <a
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline truncate"
                              >
                                {attachment.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          赞同
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          回复
                        </Button>
                      </div>

                      {/* 回复框 */}
                      {replyTo === comment.id && (
                        <div className="mt-3">
                          <Textarea
                            placeholder="写下你的回复..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[80px] mb-2"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                              取消
                            </Button>
                            <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              发送回复
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* 回复列表 */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">{getUserInitials(reply.userName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{reply.userName}</span>
                                  <Badge className={getRoleColor(reply.userRole)}>{reply.userRole}</Badge>
                                  <span className="text-xs text-gray-500">{formatTime(reply.timestamp)}</span>
                                </div>
                                <p className="text-gray-800">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* 评论输入框 */}
        <div className="mt-4">
          <Textarea
            placeholder="写下你的评论..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] mb-2"
          />

          {/* 附件预览 */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md text-sm">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
                  ) : (
                    <File className="h-4 w-4 mr-2 text-blue-500" />
                  )}
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-1"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Paperclip className="h-4 w-4 mr-2" />
                  添加附件
                  <input type="file" className="hidden" onChange={handleFileSelect} />
                </label>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  添加图片
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
              </Button>
            </div>
            <Button onClick={handleAddComment}>
              <Send className="h-4 w-4 mr-2" />
              发送评论
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
