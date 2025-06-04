import { useEffect, useState, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  disabled?: boolean;
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const {
    speed = 0.5,
    direction = 'up',
    easing = 'ease-out',
    disabled = false,
  } = options;

  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    let rafId: number;

    // Create intersection observer to check if element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    // Handle scroll
    const scrollListener = () => {
      if (!isVisible) return;
      
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how far the element is from the middle of the viewport
        const distanceFromCenter = elementTop + elementHeight / 2 - windowHeight / 2;
        
        // Calculate parallax offset based on distance from center
        const newOffset = distanceFromCenter * speed;
        
        setOffset(newOffset);
      });
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Initial calculation
    scrollListener();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scrollListener);
      cancelAnimationFrame(rafId);
    };
  }, [ref, speed, direction, disabled, isVisible]);

  // Calculate transform based on direction
  const getTransform = () => {
    if (disabled) return '';
    
    switch (direction) {
      case 'up':
        return `translateY(${-offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(${-offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(${-offset}px)`;
    }
  };

  const style = {
    transform: getTransform(),
    transition: `transform 0.1s ${easing}`,
  };

  return { style, offset, isVisible };
};

export default useParallax; 