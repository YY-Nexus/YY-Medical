"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AutomaticExecutionContextType {
  consentGiven: boolean
  setConsentGiven: (consent: boolean) => void
  showConsentDialog: boolean
  setShowConsentDialog: (show: boolean) => void
  checkConsentRequired: () => boolean
  requestConsent: () => void
}

const AutomaticExecutionContext = createContext<AutomaticExecutionContextType | undefined>(undefined)

export function useAutomaticExecution() {
  const context = useContext(AutomaticExecutionContext)
  if (!context) {
    throw new Error("useAutomaticExecution must be used within an AutomaticExecutionProvider")
  }
  return context
}

interface AutomaticExecutionProviderProps {
  children: ReactNode
}

export function AutomaticExecutionProvider({ children }: AutomaticExecutionProviderProps) {
  const [consentGiven, setConsentGiven] = useState<boolean>(false)
  const [showConsentDialog, setShowConsentDialog] = useState<boolean>(false)

  // Load consent state from localStorage on component mount
  useEffect(() => {
    const savedConsent = localStorage.getItem("automaticExecutionConsent")
    if (savedConsent !== null) {
      setConsentGiven(JSON.parse(savedConsent))
    }
  }, [])

  // Save consent state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("automaticExecutionConsent", JSON.stringify(consentGiven))
  }, [consentGiven])

  const checkConsentRequired = () => {
    return !consentGiven
  }

  const requestConsent = () => {
    if (!consentGiven) {
      setShowConsentDialog(true)
    }
  }

  const handleSetConsentGiven = (consent: boolean) => {
    setConsentGiven(consent)
    if (consent) {
      setShowConsentDialog(false)
    }
  }

  const value: AutomaticExecutionContextType = {
    consentGiven,
    setConsentGiven: handleSetConsentGiven,
    showConsentDialog,
    setShowConsentDialog,
    checkConsentRequired,
    requestConsent,
  }

  return (
    <AutomaticExecutionContext.Provider value={value}>
      {children}
    </AutomaticExecutionContext.Provider>
  )
}