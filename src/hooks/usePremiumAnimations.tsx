import { useEffect, useRef, useState } from 'react';

export interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  staggerDelay?: number;
  disableOnMobile?: boolean;
  reduceMotion?: boolean;
}

export const usePremiumAnimations = (options: AnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    staggerDelay = 0,
    disableOnMobile = true,
    reduceMotion = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if we should disable animations
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ((disableOnMobile && isMobile) || (reduceMotion && prefersReducedMotion)) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated || !triggerOnce)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated, disableOnMobile, reduceMotion]);

  const getAnimationClasses = (animationType: 'fade' | 'slide' | 'scale' | 'premium' = 'fade') => {
    const baseClasses = 'transition-all duration-700 will-change-transform';

    const animationClasses = {
      fade: isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      slide: isVisible ? 'animate-fade-in-left opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
      scale: isVisible ? 'animate-scale-in opacity-100 scale-100' : 'opacity-0 scale-95',
      premium: isVisible ? 'animate-sophisticated-entrance opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'
    };

    return cn(baseClasses, animationClasses[animationType]);
  };

  const getStaggeredClasses = (index: number, animationType: 'fade' | 'slide' | 'scale' | 'premium' = 'fade') => {
    const staggerDelayAmount = delay + (index * staggerDelay);
    const style = { animationDelay: `${staggerDelayAmount}ms` };

    return {
      className: getAnimationClasses(animationType),
      style
    };
  };

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
    getAnimationClasses,
    getStaggeredClasses
  };
};

// Helper function for className merging (in case cn is not imported)
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}