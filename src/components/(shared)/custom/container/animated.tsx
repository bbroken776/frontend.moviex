'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import clsx from 'clsx';

type AnimationTypes = 'slideToRight' | 'slideToLeft' | 'appear';

interface AnimatedContainerProps {
  id?: string;
  className?: string;
  animation: AnimationTypes;
  duration: number;
  children: ReactNode;
}

const animationVariants: Record<AnimationTypes, { visible: any; hidden: any }> = {
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
};

const AnimatedContainer = ({ id, className = '', animation, duration, children }: AnimatedContainerProps) => {
  const animationConfig = animationVariants[animation];

  const ref = useRef(null);
  const control = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) control.start('visible');
  }, [isInView, control]);

  return (
    <motion.div
      id={id}
      ref={ref}
      variants={animationConfig}
      initial="hidden"
      animate={control}
      transition={{ duration, ease: 'easeIn' }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
