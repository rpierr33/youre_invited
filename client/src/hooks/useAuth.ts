import { useState, useEffect, useCallback } from 'react'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) {
      setToken(stored)
      setIsAuthenticated(true)
    }
  }, [])

  const saveToken = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
  }, [])

  return { token, isAuthenticated, saveToken, logout }
}
