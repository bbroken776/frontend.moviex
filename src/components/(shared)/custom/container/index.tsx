import { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  children: ReactNode
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={`container max-w-9xl mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  )
}

export default Container
