import { cn } from '@/utils/cn';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shine?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  shine = true,
  className, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 overflow-hidden group',
        'focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        'transform hover:scale-[1.02] active:scale-[0.98]',
        {
          // Primary - Pink gradient with glow
          'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-xl shadow-pink-300/40 hover:shadow-2xl hover:shadow-pink-400/50 focus:ring-pink-400': variant === 'primary',
          // Secondary - Dark elegant
          'bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white shadow-xl shadow-slate-400/20 hover:shadow-2xl focus:ring-slate-400': variant === 'secondary',
          // Outline - Border with hover fill
          'border-2 border-pink-500 text-pink-600 bg-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:border-transparent hover:shadow-xl hover:shadow-pink-300/40 focus:ring-pink-400': variant === 'outline',
          // Ghost - Minimal
          'text-slate-700 bg-transparent hover:bg-slate-100 focus:ring-slate-300': variant === 'ghost',
          // Glow - Neon effect
          'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] focus:ring-pink-400 animate-gradient bg-[length:200%_100%]': variant === 'glow',
        },
        {
          'px-4 py-2.5 text-sm': size === 'sm',
          'px-6 py-3.5 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'px-10 py-5 text-xl': size === 'xl',
        },
        className
      )}
      {...props}
    >
      {/* Shine effect */}
      {shine && (variant === 'primary' || variant === 'glow' || variant === 'secondary') && (
        <span className="absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover:left-full transition-all duration-700 ease-out" />
        </span>
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}