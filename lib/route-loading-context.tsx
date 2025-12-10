'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface RouteLoadingContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const RouteLoadingContext = createContext<RouteLoadingContextType | undefined>(undefined)

export function RouteLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <RouteLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </RouteLoadingContext.Provider>
  )
}

export function useRouteLoading() {
  const context = useContext(RouteLoadingContext)
  if (!context) {
    throw new Error('useRouteLoading must be used within RouteLoadingProvider')
  }
  return context
}

