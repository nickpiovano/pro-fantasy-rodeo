import React, { ReactNode } from 'react';
import { motion, MotionProps, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary-50 text-primary-700 ring-primary-600/20",
        secondary: "bg-secondary-50 text-secondary-700 ring-secondary-600/20",
        success: "bg-green-50 text-green-700 ring-green-600/20",
        danger: "bg-red-50 text-red-700 ring-red-600/20",
        warning: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        info: "bg-blue-50 text-blue-700 ring-blue-600/20",
        western: "bg-accent-50 text-secondary-800 ring-accent-500/30",
        outline: "bg-transparent text-foreground ring-current",
        ghost: "bg-transparent text-foreground ring-transparent",
      },
      size: {
        sm: "h-5 text-[10px]",
        md: "h-6 text-xs",
        lg: "h-7 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants>, Omit<HTMLMotionProps<"div">, 'color'> {
  /**
   * Badge content
   */
  children: ReactNode;
  
  /**
   * Icon to display before text
   */
  icon?: ReactNode;
  
  /**
   * Whether to use glass effect (translucent background)
   */
  useGlass?: boolean;
  
  /**
   * Whether to add shadow to the badge
   */
  withShadow?: boolean;
  
  /**
   * Whether to add a dot indicator
   */
  withDot?: boolean;
  
  /**
   * Color of the dot indicator
   */
  dotColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'accent';
  
  /**
   * Whether the badge is removable
   */
  removable?: boolean;
  
  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void;
}

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  animation = "none",
  className = "",
  icon,
  useGlass = false,
  withShadow = false,
  withDot = false,
  dotColor = "primary",
  removable = false,
  onRemove,
  ...props
}: BadgeProps) => {
  // Determine dot color classes
  const getDotColorClass = () => {
    switch (dotColor) {
      case 'primary': return 'bg-primary-500';
      case 'secondary': return 'bg-secondary-500';
      case 'success': return 'bg-green-500';
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      case 'accent': return 'bg-accent-500';
      default: return 'bg-primary-500';
    }
  };
  
  // Combine classes
  const badgeClasses = `
    ${badgeVariants({ variant, size, animation })}
    ${useGlass ? 'backdrop-blur-md bg-opacity-80' : ''}
    ${withShadow ? 'shadow-sm' : ''}
    ${className}
  `.trim();
  
  // Determine dot size based on badge size
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5';
  
  // Entrance animation
  const entranceAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { 
        duration: 0.15
      } 
    }
  };

  // Handle remove click
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };
  
  return (
    <motion.div
      className={badgeClasses}
      {...entranceAnimation}
      {...props}
    >
      {/* Status dot */}
      {withDot && (
        <span className={`${dotSize} ${getDotColorClass()} rounded-full mr-1`} />
      )}
      
      {/* Icon */}
      {icon && (
        <span className="mr-1">{icon}</span>
      )}
      
      {/* Content */}
      <span>{children}</span>
      
      {/* Remove button */}
      {removable && (
        <button
          className="ml-1 text-current opacity-70 hover:opacity-100 focus:outline-none"
          onClick={handleRemove}
          aria-label="Remove"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}; 