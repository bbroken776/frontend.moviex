'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

type animationTypes = 'slideToRight' | 'slideToLeft' | 'appear'
interface AnimatedContainerProps {
  id?: string
  className?: string
  animation: animationTypes
  duration: number
  children: ReactNode
}

interface Animation {
  [key: string]: {
    visible: any
    hidden: any
  }
}

const animations: Animation = {
  slideToRight: {
    visible: { x: 0, opacity: 1 },
    hidden: { x: '-100%', opacity: 0 },
  },
  slideToLeft: {
    visible: { x: 0, opacity: 1 },
    hidden: { x: '100%', opacity: 0 },
  },
  appear: {
    visible: { scale: 1, opacity: 1 },
    hidden: { scale: 0.1, opacity: 0 },
  },
}

const AnimatedContainer = ({
  id,
  className,
  animation,
  duration,
  children,
}: AnimatedContainerProps) => {
  const chosenAnimation = animations[animation] || null

  const ref = useRef(null)
  const control = useAnimation()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) control.start('visible')
  }, [isInView, control])

  return (
    <motion.div
      id={id}
      ref={ref}
      variants={chosenAnimation}
      initial="hidden"
      animate={control}
      transition={{ duration: duration, ease: 'easeIn' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedContainer
