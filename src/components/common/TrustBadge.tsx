import React from 'react';
import { cn } from '../../utils/cn';

export interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
  subtext?: string;
  variant?: 'security' | 'trust' | 'premium' | 'feature';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const TrustBadge = ({
  icon,
  text,
  subtext,
  variant = 'trust',
  size = 'md',
  animated = true,
  className = '',
}: TrustBadgeProps) => {
  const baseClasses = 'flex items-center gap-3 transition-all duration-300';

  const variantClasses = {
    security: cn(
      'trust-badge-premium border-emerald-300/30',
      'bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10'
    ),
    trust: cn(
      'trust-badge-premium border-sky-300/30',
      'bg-gradient-to-r from-sky-50 to-sky-100/50 dark:from-sky-900/20 dark:to-sky-800/10'
    ),
    premium: cn(
      'glass-premium border-lime-300/30',
      'bg-gradient-to-r from-lime-50 to-lime-100/50 dark:from-lime-900/20 dark:to-lime-800/10'
    ),
    feature: cn(
      'glass-card border-warm-300/30',
      'bg-gradient-to-r from-warm-50 to-warm-100/50 dark:from-warm-900/20 dark:to-warm-800/10'
    ),
  };

  const sizeClasses = {
    sm: 'px-3 py-2 rounded-lg text-sm',
    md: 'px-4 py-3 rounded-xl text-base',
    lg: 'px-5 py-4 rounded-2xl text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const subtextClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  const animationClasses = animated ? 'animate-pulse' : '';

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    animationClasses,
    className
  );

  return (
    <div className={combinedClasses}>
      {/* Icon with glow effect */}
      <div className={cn(
        'flex-shrink-0 relative',
        iconSizeClasses[size],
        variant === 'premium' && 'animate-pulse-glow'
      )}>
        <div className="absolute inset-0 bg-lime-400/20 rounded-full blur-sm" />
        <div className="relative text-lime-600 dark:text-lime-400">
          {icon}
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className={cn(
          'font-semibold text-navy-900 dark:text-warm-50',
          textClasses[size]
        )}>
          {text}
        </div>
        {subtext && (
          <div className={cn(
            'text-navy-600 dark:text-warm-300 mt-0.5',
            subtextClasses[size]
          )}>
            {subtext}
          </div>
        )}
      </div>

      {/* Subtle right indicator */}
      <div className="flex-shrink-0">
        <svg
          className={cn(
            'w-4 h-4 text-navy-400 dark:text-warm-500',
            iconSizeClasses[size]
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default TrustBadge;