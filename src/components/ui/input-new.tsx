import React, { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outline' | 'western';

export interface InputProps extends Omit<HTMLMotionProps<"input">, 'size'> {
  /**
   * Label for the input
   */
  label?: string;
  
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  
  /**
   * Error message displayed below the input
   */
  error?: string;
  
  /**
   * Left icon
   */
  leftIcon?: ReactNode;
  
  /**
   * Right icon
   */
  rightIcon?: ReactNode;
  
  /**
   * Input size
   */
  size?: InputSize;
  
  /**
   * Full width input
   */
  fullWidth?: boolean;
  
  /**
   * Input variant
   */
  variant?: InputVariant;
  
  /**
   * Use glass effect (transparent background with blur)
   */
  useGlass?: boolean;
  
  /**
   * Whether the input is in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Whether the input is successful/valid
   */
  isSuccess?: boolean;
  
  /**
   * Additional className
   */
  className?: string;
  
  /**
   * Container className
   */
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  variant = 'default',
  useGlass = false,
  isLoading = false,
  isSuccess = false,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}, ref) => {
  // Container classes
  const containerClasses = `
    relative flex flex-col
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50' : ''}
    ${containerClassName}
  `.trim();
  
  // Label classes
  const labelClasses = `
    mb-1 font-medium text-gray-800
    ${size === 'sm' ? 'text-xs' : ''}
    ${size === 'md' ? 'text-sm' : ''}
    ${size === 'lg' ? 'text-base' : ''}
  `.trim();
  
  // Input wrapper classes
  const wrapperClasses = `
    relative flex items-center overflow-hidden
    ${fullWidth ? 'w-full' : ''}
  `.trim();
  
  // Base input classes
  const baseInputClasses = `
    w-full py-2 px-3 transition-all duration-200
    focus:outline-none
    ${leftIcon ? 'pl-9' : ''}
    ${rightIcon || isLoading || isSuccess ? 'pr-9' : ''}
    ${disabled ? 'cursor-not-allowed' : ''}
  `.trim();
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs h-8 rounded-md',
    md: 'text-sm h-10 rounded-md',
    lg: 'text-base h-12 rounded-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: useGlass
      ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-1 focus:ring-white/30'
      : 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    
    filled: useGlass
      ? 'bg-white/5 backdrop-blur-sm border-0 border-b-2 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:bg-white/10'
      : 'bg-gray-100 border-0 border-b-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:bg-gray-50',
    
    outline: 'bg-transparent border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    
    western: 'bg-offwhite border-2 border-accent-500 text-secondary-800 placeholder:text-secondary-500/60 shadow-sm focus:border-accent-600 focus:ring-1 focus:ring-accent-400',
  };
  
  // Status classes
  let statusClasses = '';
  if (error) {
    statusClasses = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  } else if (isSuccess) {
    statusClasses = 'border-green-500 focus:ring-green-500 focus:border-green-500';
  }
  
  // Combine all input classes
  const inputClasses = `
    ${baseInputClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${statusClasses}
    ${className}
  `.trim();
  
  // Error and helper text classes
  const messageClasses = `
    mt-1
    ${size === 'sm' ? 'text-xs' : 'text-sm'}
  `.trim();
  
  const errorClasses = `${messageClasses} text-red-500`;
  const helperClasses = `${messageClasses} text-gray-500`;
  
  // Status icons
  const SuccessIcon = () => (
    <svg 
      className="absolute right-3 w-5 h-5 text-green-500" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
        clipRule="evenodd" 
      />
    </svg>
  );
  
  const LoadingSpinner = () => (
    <svg 
      className="absolute right-3 w-5 h-5 text-primary-500 animate-spin" 
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
    <div className={containerClasses}>
      {label && (
        <label htmlFor={props.id} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={wrapperClasses}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          {...props}
        />
        
        {isLoading && <LoadingSpinner />}
        {isSuccess && !isLoading && <SuccessIcon />}
        {rightIcon && !isLoading && !isSuccess && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && <p className={errorClasses}>{error}</p>}
      {!error && helperText && <p className={helperClasses}>{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input'; 