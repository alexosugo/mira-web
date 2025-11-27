import React from 'react';
import { cn } from '../../utils/cn';

export interface GradientMeshProps {
  variant?: 'primary' | 'secondary' | 'premium' | 'subtle';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const GradientMesh = ({
  variant = 'primary',
  intensity = 'medium',
  animated = true,
  className = '',
  children,
}: GradientMeshProps) => {
  const baseClasses = 'relative overflow-hidden';

  const variantClasses = {
    primary: cn(
      'gradient-mesh-premium',
      intensity === 'low' && 'opacity-60',
      intensity === 'medium' && 'opacity-80',
      intensity === 'high' && 'opacity-100'
    ),
    secondary: cn(
      'bg-gradient-to-br from-warm-50 via-lime-50 to-sky-50 dark:from-navy-900 dark:via-navy-800 dark:to-sky-900/20',
      animated && 'animate-gradient',
      intensity === 'low' && 'opacity-40',
      intensity === 'medium' && 'opacity-60',
      intensity === 'high' && 'opacity-80'
    ),
    premium: cn(
      'bg-gradient-to-br from-navy-300 via-lime-400/20 to-emerald-400/10',
      animated && 'animate-gradient-mesh',
      intensity === 'low' && 'opacity-30',
      intensity === 'medium' && 'opacity-50',
      intensity === 'high' && 'opacity-70'
    ),
    subtle: cn(
      'bg-gradient-to-br from-warm-100 to-white dark:from-navy-900 dark:to-navy-800',
      intensity === 'low' && 'opacity-80',
      intensity === 'medium' && 'opacity-90',
      intensity === 'high' && 'opacity-100'
    ),
  };

  const combinedClasses = cn(baseClasses, variantClasses[variant], className);

  return (
    <div className={combinedClasses}>
      {/* Base gradient background */}
      <div className="absolute inset-0" />

      {/* Animated overlay elements */}
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0">
            <div
              className={cn(
                "absolute top-1/4 left-1/4 w-96 h-96 rounded-full",
                "bg-lime-400/5 blur-3xl",
                animated && "animate-parallax-slow"
              )}
            />
            <div
              className={cn(
                "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full",
                "bg-emerald-400/5 blur-3xl",
                animated && "animate-float-slow"
              )}
            />
            <div
              className={cn(
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full",
                "bg-sky-400/3 blur-2xl",
                animated && "animate-float-reverse"
              )}
            />
          </div>
        </>
      )}

      {/* Premium mesh overlay */}
      {variant === 'premium' && (
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c0dc2d' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeBlend mode='multiply'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientMesh;