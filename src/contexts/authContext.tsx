'use client'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

import Notification from '@components/(shared)/custom/notification/notification'
import ILoginFormData from '@interfaces/iLoginFormData'
import IRegisterFormData from '@interfaces/iRegisterFormData'
import IUser from '@interfaces/iUser'
import apiClient from '@services/apiClient'


type AuthContextType = {
  isAuthenticated: boolean
  user: IUser | null
  setUser: (user: IUser | null) => void
  login: (data: ILoginFormData) => Promise<void>
  register: (data: IRegisterFormData) => Promise<void>
  logout: () => void
  recoverUser: () => void
}

const AuthContext = createContext({} as AuthContextType)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { ['moviex.session']: token } = parseCookies()
    if (token) recoverUser()
  }, [])

  const recoverUser = async (): Promise<void> => {
    await apiClient
      .get('/users/me')
      .then(r => {
        setUser(r.data)
      })
      .catch((error: any) => {
        setUser(null)
        Notification({ message: error?.response?.data?.message, type: 'ERROR' })
      })
  }

  const login = async ({email, password}: ILoginFormData) => {
    await apiClient.post("/auth/login", {email, password})
    .then(r => {
      setUser(r.data.user)
      setCookie(null, "moviex.session", r.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      Notification({message: "You have successfully logged in", type: "SUCCESS"})

      window.location.href = "/"
    })
    .catch((error: any) => {
      Notification({message: error?.response?.data?.message, type: "ERROR"})
    })
  }

  const register = async ({firstName, lastName, email, password}: IRegisterFormData): Promise<void> => {
    await apiClient.post("/auth/register", {firstName, lastName, email, password})
    .then(r => {
      setUser(r.data.user)
      setCookie(null, "moviex.session", r.data.token, {
        maxAge: 30 * 24 * 60 * 60,
         path: '/'
      })

      Notification({message: "You have successfully registered", type: "SUCCESS"})

      window.location.href = "/"
    })
    .catch((error: any) => {
      Notification({message: error?.response?.data?.message, type: "ERROR"})
    })
  }

  const logout = async (): Promise<void> => {
    destroyCookie(null, 'moviex.session')
    setUser(null)

    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, login, register, logout, recoverUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

