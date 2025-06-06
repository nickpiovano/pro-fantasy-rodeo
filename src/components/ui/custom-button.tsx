import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from "@/lib/utils";

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'western' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CustomButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   */
  size?: ButtonSize;
  
  /**
   * Whether the button is in loading state
   */
  isLoading?: boolean;
  
  /**
   * Icon to show before the button text
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to show after the button text
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the button is full width
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Whether to use gradient background (only applies to primary and western variants)
   */
  useGradient?: boolean;
  
  /**
   * Whether to use glass effect (only applies to secondary and tertiary variants)
   */
  useGlass?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  useGradient = false,
  useGlass = false,
  ...props
}, ref) => {
  // Base style classes
  const baseClasses = 'relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  // Variant classes
  const variantClasses = {
    primary: useGradient 
      ? 'bg-gradient-primary text-white hover:shadow-lg active:shadow-inner active:scale-[0.98] focus:ring-primary-500 focus:ring-offset-2'
      : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md active:bg-primary-700 active:shadow-inner active:scale-[0.98] focus:ring-primary-500 focus:ring-offset-2',
    
    secondary: useGlass
      ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-md active:bg-white/30 active:shadow-inner active:scale-[0.98] focus:ring-white focus:ring-offset-1'
      : 'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-md active:bg-secondary-700 active:shadow-inner active:scale-[0.98] focus:ring-secondary-500 focus:ring-offset-2',
    
    tertiary: useGlass
      ? 'bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:shadow-sm active:bg-white/15 active:shadow-inner active:scale-[0.98] focus:ring-white focus:ring-offset-1'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-sm active:bg-gray-300 active:shadow-inner active:scale-[0.98] focus:ring-gray-500 focus:ring-offset-2',
    
    outline: 'bg-transparent border border-current text-primary-500 hover:bg-primary-50 hover:shadow-sm active:bg-primary-100 active:shadow-inner active:scale-[0.98] focus:ring-primary-500 focus:ring-offset-2',
    
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 hover:shadow-sm active:bg-primary-100 active:shadow-inner active:scale-[0.98] focus:ring-primary-500 focus:ring-offset-2',
    
    western: useGradient
      ? 'bg-gradient-accent text-secondary-900 border-2 border-accent-600 shadow-md hover:shadow-lg hover:border-accent-500 active:shadow-inner active:scale-[0.98] active:border-accent-700 focus:ring-accent-500 focus:ring-offset-2'
      : 'bg-accent-500 text-secondary-900 border-2 border-accent-600 shadow-md hover:bg-accent-400 hover:shadow-lg hover:border-accent-500 active:bg-accent-600 active:shadow-inner active:scale-[0.98] active:border-accent-700 focus:ring-accent-500 focus:ring-offset-2',
    
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md active:bg-red-700 active:shadow-inner active:scale-[0.98] focus:ring-red-500 focus:ring-offset-2',
    
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md active:bg-green-700 active:shadow-inner active:scale-[0.98] focus:ring-green-500 focus:ring-offset-2',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = props.disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : '';
  
  // Combine all classes
  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClasses,
    disabledClasses,
    className
  );
  
  // Loading spinner element
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      whileTap={!props.disabled ? { scale: 0.98 } : undefined}
      whileHover={!props.disabled ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
});

CustomButton.displayName = 'CustomButton';

export { CustomButton }; 