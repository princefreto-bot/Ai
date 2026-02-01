import { cn } from '@/utils/cn';
import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200 shadow-sm',
        hover && 'hover:shadow-lg hover:border-pink-200 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
