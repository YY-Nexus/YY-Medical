"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { DEFAULT_AVATAR } from "@/types/avatar-presets"

interface UserAvatarContextType {
  avatarUrl: string
  updateAvatar: (newUrl: string) => void
}

const UserAvatarContext = createContext<UserAvatarContextType | undefined>(undefined)

export function UserAvatarProvider({
  children,
  initialAvatarUrl = DEFAULT_AVATAR,
}: {
  children: ReactNode
  initialAvatarUrl?: string
}) {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)

  const updateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl)
  }

  return <UserAvatarContext.Provider value={{ avatarUrl, updateAvatar }}>{children}</UserAvatarContext.Provider>
}

export function useUserAvatar() {
  const context = useContext(UserAvatarContext)
  if (context === undefined) {
    throw new Error("useUserAvatar must be used within a UserAvatarProvider")
  }
  return context
}
