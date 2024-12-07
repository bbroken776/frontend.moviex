import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  const defaultClassName = 'container max-w-9xl mx-auto px-4 md:px-8';
  
  return <div className={clsx(defaultClassName, className)}>{children}</div>;
};

export default Container;