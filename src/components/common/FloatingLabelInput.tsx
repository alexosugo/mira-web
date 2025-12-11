import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, required, icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== '';
    const isActive = isFocused || hasValue;

    return (
      <div className="relative">
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            placeholder=" "
            className={cn(
              'peer w-full px-4 py-4 bg-white/5 backdrop-blur-sm',
              'border rounded-xl text-white placeholder-transparent',
              'transition-all duration-300 ease-premium',
              'focus:outline-none',
              icon && 'pl-12',
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-white/15 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20 focus:bg-white/8',
              className
            )}
          />
          <label
            className={cn(
              'absolute left-4 transition-all duration-300 ease-premium pointer-events-none',
              icon && 'left-12',
              isActive
                ? 'top-1 text-xs font-medium'
                : 'top-1/2 -translate-y-1/2 text-base',
              error
                ? 'text-red-400'
                : isActive
                ? 'text-lime-500'
                : 'text-gray-400'
            )}
          >
            {label}
            {required && <span className="text-lime-500 ml-1">*</span>}
          </label>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400 animate-slide-down">{error}</p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

export default FloatingLabelInput;
