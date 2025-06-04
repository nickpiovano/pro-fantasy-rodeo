import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownPlacement = 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';

export interface DropdownProps {
  /**
   * Element that triggers the dropdown
   */
  trigger: ReactNode;
  
  /**
   * Dropdown content
   */
  children: ReactNode;
  
  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;
  
  /**
   * Callback when dropdown open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Dropdown placement
   */
  placement?: DropdownPlacement;
  
  /**
   * Dropdown size
   */
  size?: DropdownSize;
  
  /**
   * Use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Whether to use western style
   */
  western?: boolean;
  
  /**
   * Disable dropdown
   */
  disabled?: boolean;
  
  /**
   * Additional class name for the container
   */
  className?: string;
  
  /**
   * Additional class name for dropdown content
   */
  contentClassName?: string;
}

export const Dropdown = ({
  trigger,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  placement = 'bottom-start',
  size = 'md',
  useGlass = false,
  western = false,
  disabled = false,
  className = '',
  contentClassName = '',
}: DropdownProps) => {
  // For uncontrolled usage
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    
    if (isControlled) {
      onOpenChange?.(!isOpen);
    } else {
      setUncontrolledIsOpen(!isOpen);
    }
  };
  
  // Handle outside click
  const handleClickOutside = () => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setUncontrolledIsOpen(false);
    }
  };
  
  // Ref for dropdown container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setUncontrolledIsOpen(false);
        }
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, isControlled, onOpenChange]);
  
  // Container classes
  const containerClasses = `
    relative inline-block
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();
  
  // Get placement classes
  const getPlacementClasses = () => {
    switch (placement) {
      case 'bottom-start':
        return 'top-full left-0';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2';
      case 'bottom-end':
        return 'top-full right-0';
      case 'top-start':
        return 'bottom-full left-0';
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2';
      case 'top-end':
        return 'bottom-full right-0';
      default:
        return 'top-full left-0';
    }
  };
  
  // Content classes
  const contentClasses = `
    min-w-[12rem] rounded-md overflow-hidden shadow-lg z-50
    ${placement.startsWith('top') ? 'mb-1' : 'mt-1'}
    ${getPlacementClasses()}
    ${useGlass ? 'bg-white/90 backdrop-blur-md' : 'bg-white'}
    ${western ? 'border-2 border-accent-400' : 'border border-gray-200'}
    ${contentClassName}
  `.trim();
  
  // Animation variants based on placement
  const getAnimationVariants = () => {
    if (placement.startsWith('top')) {
      return {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          }
        },
        exit: { 
          opacity: 0, 
          y: -10, 
          scale: 0.95,
          transition: { 
            duration: 0.15
          } 
        }
      };
    }
    
    return {
      hidden: { opacity: 0, y: 10, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 20 
        }
      },
      exit: { 
        opacity: 0, 
        y: 10, 
        scale: 0.95,
        transition: { 
          duration: 0.15
        } 
      }
    };
  };
  
  return (
    <div className={containerClasses} ref={containerRef}>
      {/* Trigger element */}
      <div onClick={handleToggle} className={disabled ? 'pointer-events-none' : ''}>
        {trigger}
      </div>
      
      {/* Dropdown content */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 z-40"
              onClick={handleClickOutside}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              className={`absolute ${contentClasses}`}
              variants={getAnimationVariants()}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Create dropdown menu item component
export interface DropdownMenuItemProps {
  /**
   * Item content
   */
  children: ReactNode;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Whether the item is active
   */
  active?: boolean;
  
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  
  /**
   * Icon displayed before the text
   */
  icon?: ReactNode;
  
  /**
   * Right-aligned content (e.g., shortcut)
   */
  rightContent?: ReactNode;
  
  /**
   * Additional class name
   */
  className?: string;
}

export const DropdownMenuItem = ({
  children,
  onClick,
  active = false,
  disabled = false,
  icon,
  rightContent,
  className = '',
}: DropdownMenuItemProps) => {
  const itemClasses = `
    flex items-center px-4 py-2 text-sm cursor-pointer transition-all duration-150
    ${active ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `.trim();
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  return (
    <motion.div
      className={itemClasses}
      onClick={handleClick}
      whileHover={!disabled ? { x: 5 } : undefined}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="flex-1">{children}</span>
      {rightContent && <span className="ml-2 text-gray-400">{rightContent}</span>}
    </motion.div>
  );
};

// Dropdown section separator
export const DropdownSeparator = ({ className = '' }: { className?: string }) => (
  <div className={`h-px my-1 bg-gray-200 ${className}`} />
);

// Dropdown section label
export interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

export const DropdownLabel = ({ children, className = '' }: DropdownLabelProps) => (
  <div className={`px-4 py-2 text-xs font-semibold text-gray-500 ${className}`}>
    {children}
  </div>
); 