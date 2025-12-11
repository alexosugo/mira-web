import React, { ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ArrowRight } from 'lucide-react';

export interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  showArrow?: boolean;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    icon,
    showArrow = false,
    ...props
  }, ref) => {
    const baseClasses = cn(
      'relative inline-flex items-center justify-center font-semibold',
      'transition-all duration-300 ease-premium will-change-transform',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      'focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:ring-offset-2',
      'overflow-hidden group'
    );

    const variantClasses = {
      primary: cn(
        'bg-lime-500 hover:bg-lime-400 text-navy-800',
        'shadow-lg hover:shadow-glow-lg',
        'hover:-translate-y-0.5 hover:scale-[1.02]',
        'active:scale-[0.98] active:translate-y-0'
      ),
      secondary: cn(
        'bg-navy-700 hover:bg-navy-600 text-white',
        'shadow-lg hover:shadow-xl',
        'hover:-translate-y-0.5',
        'border border-navy-600'
      ),
      outline: cn(
        'bg-transparent border-2 border-lime-500/50 text-lime-500',
        'hover:bg-lime-500/10 hover:border-lime-500',
        'hover:shadow-glow hover:-translate-y-0.5'
      ),
      glass: cn(
        'btn-premium-glass text-navy-800 font-semibold',
        'hover:-translate-y-1 hover:shadow-glow-lg'
      ),
      ghost: cn(
        'bg-transparent text-gray-600 hover:text-navy-800',
        'hover:bg-gray-100'
      ),
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
      md: 'px-6 py-3 text-base rounded-xl gap-2',
      lg: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
      xl: 'px-10 py-5 text-xl rounded-3xl gap-3',
    };

    const combinedClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      loading && 'cursor-wait',
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClasses}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {showArrow && !loading && (
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;