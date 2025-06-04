import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type TooltipSize = 'sm' | 'md' | 'lg';
export type TooltipVariant = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'western';

export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: ReactNode;
  
  /**
   * Element that triggers the tooltip
   */
  children: ReactNode;
  
  /**
   * Tooltip position
   */
  position?: TooltipPosition;
  
  /**
   * Tooltip size
   */
  size?: TooltipSize;
  
  /**
   * Tooltip variant
   */
  variant?: TooltipVariant;
  
  /**
   * Delay before showing tooltip (ms)
   */
  showDelay?: number;
  
  /**
   * Delay before hiding tooltip (ms)
   */
  hideDelay?: number;
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Whether to show an arrow pointing to the trigger
   */
  showArrow?: boolean;
  
  /**
   * Max width of the tooltip
   */
  maxWidth?: number;
  
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean;
  
  /**
   * Additional class name for the tooltip container
   */
  className?: string;
  
  /**
   * Additional class name for the tooltip content
   */
  contentClassName?: string;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  size = 'md',
  variant = 'default',
  showDelay = 200,
  hideDelay = 100,
  useGlass = false,
  showArrow = true,
  maxWidth = 250,
  disabled = false,
  className = '',
  contentClassName = '',
}: TooltipProps) => {
  // State for tooltip visibility
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for trigger and tooltip
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Refs for delay timers
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // State for tooltip position
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  
  // State for arrow position
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return;
    
    // Clear any hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    // Set show timeout
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, showDelay);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    if (disabled) return;
    
    // Clear any show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    // Set hide timeout
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  };
  
  // Calculate and update tooltip position
  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    // Calculate position based on placement
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollLeft + 8;
        break;
    }
    
    // Adjust for viewport boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Keep tooltip within horizontal bounds
    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }
    
    // Keep tooltip within vertical bounds
    if (top < 10) {
      top = 10;
    } else if (top + tooltipRect.height > viewportHeight + scrollTop - 10) {
      top = viewportHeight + scrollTop - tooltipRect.height - 10;
    }
    
    setTooltipPosition({ top, left });
    
    // Update arrow position
    updateArrowPosition(triggerRect, { top, left }, tooltipRect);
  };
  
  // Update arrow position
  const updateArrowPosition = (
    triggerRect: DOMRect,
    tooltipPos: { top: number; left: number },
    tooltipRect: DOMRect
  ) => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    const arrowStyle: React.CSSProperties = {};
    
    switch (position) {
      case 'top':
        arrowStyle.bottom = '-4px';
        arrowStyle.left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipPos.left;
        arrowStyle.transform = 'rotate(45deg)';
        break;
      case 'bottom':
        arrowStyle.top = '-4px';
        arrowStyle.left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipPos.left;
        arrowStyle.transform = 'rotate(45deg)';
        break;
      case 'left':
        arrowStyle.right = '-4px';
        arrowStyle.top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipPos.top;
        arrowStyle.transform = 'rotate(45deg)';
        break;
      case 'right':
        arrowStyle.left = '-4px';
        arrowStyle.top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipPos.top;
        arrowStyle.transform = 'rotate(45deg)';
        break;
    }
    
    setArrowStyle(arrowStyle);
  };
  
  // Update position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        updatePosition();
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isVisible]);
  
  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);
  
  // Get tooltip size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'py-1 px-2 text-xs';
      case 'md': return 'py-1.5 px-3 text-sm';
      case 'lg': return 'py-2 px-4 text-base';
      default: return 'py-1.5 px-3 text-sm';
    }
  };
  
  // Get tooltip variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'info': return 'bg-blue-600 text-white';
      case 'success': return 'bg-green-600 text-white';
      case 'warning': return 'bg-yellow-600 text-white';
      case 'danger': return 'bg-red-600 text-white';
      case 'western': return 'bg-accent-500 text-secondary-900 border-2 border-accent-600';
      case 'default':
      default: return 'bg-gray-900 text-white';
    }
  };
  
  // Get animation variants based on position
  const getAnimationVariants = () => {
    switch (position) {
      case 'top':
        return {
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 8 }
        };
      case 'bottom':
        return {
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 8 },
          visible: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 8 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -8 },
          visible: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -8 }
        };
    }
  };
  
  // Get arrow color
  const getArrowColor = () => {
    switch (variant) {
      case 'info': return 'bg-blue-600';
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'danger': return 'bg-red-600';
      case 'western': return 'bg-accent-500';
      case 'default':
      default: return 'bg-gray-900';
    }
  };
  
  // Tooltip container classes
  const tooltipClasses = `
    absolute z-50 rounded-md shadow-md
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${useGlass ? 'backdrop-blur-md bg-opacity-90' : ''}
    ${className}
  `.trim();
  
  // Content classes
  const innerContentClasses = `
    max-w-[${maxWidth}px] ${contentClassName}
  `.trim();
  
  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </div>
      
      {/* Portal for tooltip */}
      {typeof document !== 'undefined' && (
        <AnimatePresence>
          {isVisible && (
            <div
              ref={tooltipRef}
              style={{
                position: 'absolute',
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
                zIndex: 9999,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className={tooltipClasses}
                style={{ maxWidth }}
                variants={getAnimationVariants()}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.15 }}
              >
                <div className={innerContentClasses}>
                  {content}
                </div>
                
                {/* Arrow */}
                {showArrow && (
                  <div
                    className={`absolute w-2 h-2 ${getArrowColor()}`}
                    style={arrowStyle}
                  />
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}; 