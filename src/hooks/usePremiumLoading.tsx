import { useState, useEffect } from 'react';

export interface LoadingState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  error?: Error;
  progress: number;
}

export const usePremiumLoading = (
  asyncFn: () => Promise<any>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    progress: 0,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, isLoading: true, hasError: false, error: undefined, progress: 0 }));

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setState(prev => {
          if (prev.progress < 90) {
            return { ...prev, progress: Math.min(prev.progress + Math.random() * 15, 90) };
          }
          return prev;
        });
      }, 100);

      const result = await asyncFn();

      clearInterval(progressInterval);

      setState({
        isLoading: false,
        isLoaded: true,
        hasError: false,
        progress: 100,
      });

      return result;
    } catch (error) {
      clearInterval(progressInterval);

      setState({
        isLoading: false,
        isLoaded: false,
        hasError: true,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
        progress: 0,
      });

      throw error;
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      isLoaded: false,
      hasError: false,
      error: undefined,
      progress: 0,
    });
  };

  const retry = () => {
    reset();
    return execute();
  };

  // Auto-execute when dependencies change
  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // Skeleton component based on loading state
  const Skeleton = ({
    width = '100%',
    height = '1rem',
    className = '',
    lines = 1
  }: {
    width?: string;
    height?: string;
    className?: string;
    lines?: number;
  }) => {
    if (state.isLoaded) return null;

    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="skeleton-premium"
            style={{
              width: index === lines - 1 && lines > 1 ? '70%' : width,
              height,
            }}
          />
        ))}
      </div>
    );
  };

  // Premium spinner component
  const Spinner = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => {
    if (!state.isLoading) return null;

    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };

    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 border-2 border-lime-200/30 rounded-full" />
          <div className="absolute inset-0 border-2 border-lime-500 rounded-full animate-spin border-t-transparent" />
          <div className="absolute inset-1 border border-lime-400/20 rounded-full animate-ping" />
        </div>
      </div>
    );
  };

  return {
    ...state,
    execute,
    reset,
    retry,
    Skeleton,
    Spinner,
  };
};

// Hook for staggered loading animations
export const useStaggeredLoading = (items: any[], delay = 100) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    setVisibleItems(new Set());

    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, index * delay);
    });
  }, [items, delay]);

  const isItemVisible = (index: number) => visibleItems.has(index);

  return {
    isItemVisible,
    visibleItems,
  };
};