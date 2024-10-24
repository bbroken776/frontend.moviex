'use client'

import { createContext, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

import IUser from '@interfaces/iUser'
import { recoverUser, logIn, logOut } from '@services/authService'

interface AuthContextType  {
  isAuthenticated: boolean
  user: IUser | null
  setUser: (user: IUser | null) => void
  logIn: typeof logIn
  logOut: typeof logOut
  recoverUser: typeof recoverUser
}

const AuthContext = createContext<AuthContextType | null>(null)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { ['moviex.session']: token } = parseCookies()
    if (token) recoverUser(setUser)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, logIn, logOut, recoverUser }}
    >{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
