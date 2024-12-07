import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

interface PixelatedContainerProps {
  borderClasses?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const PixelatedContainer = ({
  borderClasses = 'border-amber-500 border-t-amber-500 border-b-amber-500 border-l-amber-500 border-r-amber-500 bg-zinc-800',
  className = 'h-fit',
  style,
  children,
}: PixelatedContainerProps) => {
  const splitClasses = borderClasses.split(' ');

  const getClass = (side: string, defaultClass: string) => {
    const className = splitClasses.find(cls => cls.includes(side));
    return className || defaultClass;
  };

  const containerClass = clsx(
    'relative inline-block border px-3 py-2',
    getClass('border', 'border-amber-500'),
    getClass('bg', 'bg-zinc-800'),
    className,
  );
  const cornerClass = (position: string, borderClasses: string) =>
    clsx('absolute w-[7px] h-[7px] border', position, borderClasses);

  return (
    <div className={containerClass} style={style}>
      <div
        className={cornerClass(
          '-top-[1px] -left-[1px]',
          `${getClass('border-r', 'border-r-amber-500')} ${getClass('border-b', 'border-b-amber-500')} border-t-transparent border-l-transparent`,
        )}
      />
      <div
        className={cornerClass(
          '-bottom-[1px] -left-[1px]',
          `${getClass('border-r', 'border-r-amber-500')} ${getClass('border-t', 'border-t-amber-500')} border-b-transparent border-l-transparent`,
        )}
      />
      {children}
      <div
        className={cornerClass(
          '-top-[1px] -right-[1px]',
          `${getClass('border-l', 'border-l-amber-500')} ${getClass('border-b', 'border-b-amber-500')} border-t-transparent border-r-transparent`,
        )}
      />
      <div
        className={cornerClass(
          '-bottom-[1px] -right-[1px]',
          `${getClass('border-l', 'border-l-amber-500')} ${getClass('border-t', 'border-t-amber-500')} border-b-transparent border-r-transparent`,
        )}
      />
    </div>
  );
};

export default PixelatedContainer;
