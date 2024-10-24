interface HighlightProps {
  color: string
  keywords: string[]
  className?: string
  children: string
}

const Highlight = ({
  color,
  keywords,
  className,
  children,
}: HighlightProps) => {
  if (!children || !keywords || keywords.length === 0) {
    return <>{children}</>
  }

  const regex = new RegExp(`(${keywords.join('|')})`, 'gi')
  const parts = children.split(regex)

  return (
    <>
      {parts.map((part, index) =>
        keywords.includes(part.toLowerCase()) ? (
          <mark key={index} className={`bg-transparent ${color} ${className}`}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default Highlight
