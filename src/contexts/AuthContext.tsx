import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import * as authService from '../services/authService'
import type { Session } from '@supabase/supabase-js'

type User = { id: string; name?: string; email: string; role?: string } | null

type AuthContextType = {
  user: User
  session: Session | null
  loading: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  register: (payload: { name: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (payload: { email: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

function mapUser(supaUser: any): User {
  if (!supaUser) return null
  return {
    id: supaUser.id,
    name: supaUser.user_metadata?.name || undefined,
    email: supaUser.email!,
    role: supaUser.user_metadata?.role || 'Maman',
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Récupérer la session existante au chargement
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(mapUser(data.session?.user ?? null))
      setLoading(false)
    })

    // 2. Écouter les changements d'état d'auth (login, logout, token refresh…)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(mapUser(newSession?.user ?? null))
    })

    return () => subscription.unsubscribe()
  }, [])

  async function login(payload: { email: string; password: string }) {
    const data = await authService.login(payload)
    setSession(data.session)
    setUser(mapUser(data.session?.user ?? data.user))
  }

  async function register(payload: { name: string; email: string; password: string }) {
    const data = await authService.register(payload)
    setSession(data.session)
    setUser(mapUser(data.session?.user ?? data.user))
  }

  async function logout() {
    await authService.logout()
    setSession(null)
    setUser(null)
  }

  async function forgotPassword(payload: { email: string }) {
    await authService.forgotPassword(payload)
  }

  const value: AuthContextType = { user, session, loading, login, register, logout, forgotPassword }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
