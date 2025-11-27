import { useEffect, useRef, useState } from 'react';

export interface MagneticHoverOptions {
  strength?: number;
  disabled?: boolean;
  resetOnLeave?: boolean;
}

export const useMagneticHover = (options: MagneticHoverOptions = {}) => {
  const {
    strength = 0.3,
    disabled = false,
    resetOnLeave = true
  } = options;

  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Apply transform in next animation frame for smooth performance
      animationFrameRef.current = requestAnimationFrame(() => {
        element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        element.style.transition = 'none';
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (resetOnLeave) {
        element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Reset element position with smooth transition
      animationFrameRef.current = requestAnimationFrame(() => {
        element.style.transform = 'translate(0px, 0px) scale(1)';
        element.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);

      // Clean up any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, strength, disabled, resetOnLeave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    ref: elementRef,
    isHovered,
    style: {
      transformStyle: 'preserve-3d' as const,
      backfaceVisibility: 'hidden' as const,
    }
  };
};