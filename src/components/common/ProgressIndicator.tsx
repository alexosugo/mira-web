import React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface ProgressStep {
  label: string;
  description?: string;
}

export interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'font-semibold text-sm transition-all duration-400 ease-premium',
                    isCompleted && 'bg-lime-500/20 border-2 border-lime-500 text-lime-500',
                    isActive && 'bg-lime-500 border-2 border-lime-500 text-navy-800 shadow-glow',
                    !isCompleted && !isActive && 'bg-white/5 border-2 border-white/20 text-white/50'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-mono">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors duration-300',
                    isActive ? 'text-lime-500' : isCompleted ? 'text-white/70' : 'text-white/40'
                  )}
                >
                  {step.label}
                </span>
              </div>
              
              {!isLast && (
                <div className="flex-1 mx-3 relative">
                  <div className="h-0.5 bg-white/10 rounded-full" />
                  <div
                    className={cn(
                      'absolute top-0 left-0 h-0.5 rounded-full bg-lime-500',
                      'transition-all duration-500 ease-premium'
                    )}
                    style={{
                      width: isCompleted ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
