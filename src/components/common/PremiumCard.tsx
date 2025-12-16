import React, { ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'premium' | 'dark' | 'gradient';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  glow?: boolean;
  accentBorder?: boolean;
  onClick?: () => void;
}

const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({
    children,
    className = '',
    variant = 'solid',
    hover = true,
    padding = 'lg',
    rounded = '2xl',
    glow = false,
    accentBorder = false,
    onClick,
    ...props
  }, ref) => {
    const baseClasses = cn(
      'relative overflow-hidden',
      'transition-all duration-400 ease-premium will-change-transform'
    );

    const variantClasses = {
      glass: cn(
        'glass-card',
        hover && 'hover:shadow-premium hover:-translate-y-2 cursor-pointer'
      ),
      solid: cn(
        'bg-white',
        'border border-gray-100',
        'shadow-lg',
        hover && 'hover:shadow-xl hover:-translate-y-2 cursor-pointer'
      ),
      premium: cn(
        'bg-white',
        'border border-gray-100',
        'shadow-lg',
        hover && 'card-premium cursor-pointer'
      ),
      dark: cn(
        'bg-gradient-to-br from-navy-800 to-navy-950',
        'border border-lime-500/10',
        'shadow-xl',
        hover && 'hover:shadow-2xl hover:border-lime-500/20 hover:-translate-y-2 cursor-pointer'
      ),
      gradient: cn(
        'bg-gradient-to-br from-lime-500/5 via-white to-navy-500/5',
        'border border-gray-100',
        'shadow-lg',
        hover && 'hover:shadow-xl hover:-translate-y-2 cursor-pointer'
      ),
    };

    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const roundedClasses = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
    };

    const glowClasses = glow ? 'shadow-glow animate-pulse-glow' : '';

    const combinedClasses = cn(
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      roundedClasses[rounded],
      glowClasses,
      accentBorder && 'accent-border-left pl-6',
      className
    );

    return (
      <div
        ref={ref}
        className={combinedClasses}
        onClick={onClick}
        {...props}
      >
        {/* Gradient border overlay for premium variant */}
        {variant === 'premium' && (
          <div className="absolute inset-0 rounded-inherit pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div className="absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-br from-lime-500/0 via-lime-500/30 to-lime-500/0" 
                 style={{ 
                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                   WebkitMaskComposite: 'xor',
                   mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                   maskComposite: 'exclude'
                 }} />
          </div>
        )}

        {/* Top highlight line for glass variant */}
        {variant === 'glass' && (
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}

        {children}

        {/* Hover light effect */}
        {hover && (
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
          </div>
        )}
      </div>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';

export default PremiumCard;