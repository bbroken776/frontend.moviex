import { CSSProperties, ReactNode } from 'react'

interface PixelatedContainerProps {
  borderColor?: string
  borderTColor?: string
  borderBColor?: string
  borderLColor?: string
  borderRColor?: string
  borderBackground?: string
  background?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const PixelatedContainer = ({
  borderColor = 'border-orange-500',
  borderTColor = 'border-t-orange-500',
  borderBColor = 'border-b-orange-500',
  borderLColor = 'border-l-orange-500',
  borderRColor = 'border-r-orange-500',
  borderBackground = 'bg-zinc-800',
  background = 'bg-zinc-800',
  className = 'h-fit',
  style,
  children,
}: PixelatedContainerProps) => {
  return (
    <div
      className={`w-fit relative ${className} px-3 py-2 border ${borderColor} ${background}`}
      style={style}
    >
      <div
        className={`absolute -top-[1px] -left-[1px] w-[7px] h-[7px] border ${borderRColor} ${borderBColor} border-t-transparent border-l-transparent ${borderBackground}`}
      />
      <div
        className={`absolute -bottom-[1px] -left-[1px] w-[7px] h-[7px] border ${borderRColor} ${borderTColor} border-l-transparent border-b-transparent ${borderBackground}`}
      />
      {children != null && children}
      <div
        className={`absolute -top-[1px] -right-[1px] w-[7px] h-[7px] border ${borderLColor} ${borderBColor} border-t-transparent border-r-transparent ${borderBackground}`}
      />
      <div
        className={`absolute -bottom-[1px] -right-[1px] w-[7px] h-[7px] border ${borderLColor} ${borderTColor} border-b-transparent border-r-transparent ${borderBackground}`}
      />
    </div>
  )
}

export default PixelatedContainer
