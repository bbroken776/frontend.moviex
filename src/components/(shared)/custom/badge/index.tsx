import { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  className?: string;
  children: ReactNode;
  preserveDefaultClassName?: boolean;
}

const Badge = ({ className, children }: BadgeProps) => {
  const defaultClassName = 'w-fit h-fit text-[11px] text-amber-400 bg-amber-400/10 rounded py-[1px] px-2';
  const finalClassName = clsx(defaultClassName, className);
  
  return <span className={finalClassName}>{children}</span>;
};

export default Badge;
