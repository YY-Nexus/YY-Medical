"use client"

import { useState, useEffect } from "react"

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      if (wasOffline) {
        // Trigger sync when coming back online
        if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
          navigator.serviceWorker.ready
            .then((registration) => {
              return registration.sync.register("background-sync")
            })
            .catch(console.error)
        }
        setWasOffline(false)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [wasOffline])

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline,
  }
}
