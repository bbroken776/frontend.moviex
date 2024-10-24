'use client'

import { ReactNode, useEffect } from 'react'

interface ProtectedClientProps {
  children: ReactNode
}

const DEV_TOOL_KEYS = {
  I: { ctrl: true, shift: true },
  C: { ctrl: true, shift: true },
  J: { ctrl: true, shift: true },
  F12: { keyCode: 123 },
}

const ProtectedClient = ({ children }: ProtectedClientProps) => {
  useEffect(() => {
    const blockContextMenu = (event: MouseEvent) => event.preventDefault()

    const blockKeyCombination = (event: KeyboardEvent) => {
      const { ctrlKey, shiftKey, key, keyCode } = event
      const isDevToolKeySet = (ctrlKey && shiftKey && key in DEV_TOOL_KEYS) || keyCode === DEV_TOOL_KEYS.F12.keyCode

      if (isDevToolKeySet) event.preventDefault()
    }

    window.addEventListener('contextmenu', blockContextMenu)
    window.addEventListener('keydown', blockKeyCombination)

    return () => {
      window.removeEventListener('contextmenu', blockContextMenu)
      window.removeEventListener('keydown', blockKeyCombination)
    }
  }, [])

  return <>{children}</>
}

export default ProtectedClient
