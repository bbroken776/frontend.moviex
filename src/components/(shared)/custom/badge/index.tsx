import { ReactNode } from 'react'

interface BadgeProps {
  className?: string
  children: ReactNode
  preserveDefaultClassName?: boolean
}

const defaultClassName = 'w-fit h-fit text-[11px] text-pink-400 bg-pink-400/10 rounded-full py-[1px] px-2'

const Badge = ({
  className,
  children,
  preserveDefaultClassName = true,
}: BadgeProps) => {
  const finalClassName = preserveDefaultClassName
    ? defaultClassName + ' ' + className
    : className

  return <span className={finalClassName}>{children}</span>
}

export default Badge
