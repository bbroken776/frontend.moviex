import Image from 'next/image'

interface CustomImageProps {
  src: string
  alt: string
  className?: string
}

const CustomImage = ({ src, alt, className }: CustomImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={2048}
      height={2048}
      className={className}
    />
  )
}

export default CustomImage
