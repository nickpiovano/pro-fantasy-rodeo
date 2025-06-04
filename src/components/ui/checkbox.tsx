import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'western' | 'outline';

export interface CheckboxProps extends Omit<HTMLMotionProps<'input'>, 'size'> {
  /**
   * Label for the checkbox
   */
  label?: ReactNode;

  /**
   * Size of the checkbox
   */
  size?: CheckboxSize;

  /**
   * Variant of the checkbox
   */
  variant?: CheckboxVariant;

  /**
   * Whether the checkbox is indeterminate
   */
  indeterminate?: boolean;

  /**
   * Helper text below the checkbox
   */
  helperText?: string;

  /**
   * Error message displayed instead of helper text
   */
  error?: string;

  /**
   * Additional className for the container
   */
  containerClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  size = 'md',
  variant = 'default',
  indeterminate = false,
  helperText,
  error,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}, ref) => {
  // Handle indeterminate state
  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  // Container classes
  const containerClasses = `
    flex items-start
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${containerClassName}
  `.trim();

  // Size classes for the checkbox
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  // Size classes for the label
  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-300 text-primary-500 focus:ring-primary-500 rounded',
    western: 'bg-offwhite border-2 border-accent-500 text-primary-500 focus:ring-accent-400 rounded-sm',
    outline: 'bg-transparent border border-gray-300 text-primary-500 focus:ring-primary-500 rounded',
  };

  // Combine checkbox classes
  const checkboxClasses = `
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    focus:ring-2 focus:ring-offset-2
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    transition-colors duration-200
    ${className}
  `.trim();

  // Label classes
  const labelClasses = `
    ml-2 ${labelSizeClasses[size]} text-gray-800
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
  `.trim();

  // Message classes
  const messageClasses = `mt-1 ml-6 text-sm`;
  const errorClasses = `${messageClasses} text-red-500`;
  const helperClasses = `${messageClasses} text-gray-500`;

  // Custom checkbox icon variants
  const checkVariants = {
    unchecked: { pathLength: 0, opacity: 0 },
    checked: { pathLength: 1, opacity: 1 }
  };

  // Handle indeterminate icon variants
  const indeterminateVariants = {
    unchecked: { scaleX: 0, opacity: 0 },
    checked: { scaleX: 1, opacity: 1 }
  };

  // Custom checkbox wrapper with animation
  const CheckboxIcon = ({ checked, indeterminate }: { checked: boolean, indeterminate: boolean }) => (
    <div className={`absolute top-0 left-0 flex items-center justify-center ${sizeClasses[size]}`}>
      {indeterminate ? (
        <motion.div 
          initial="unchecked"
          animate={checked ? "checked" : "unchecked"}
          variants={indeterminateVariants}
          transition={{ duration: 0.2 }}
          className="h-[2px] w-[60%] bg-current origin-center"
        />
      ) : (
        <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current stroke-[3]">
          <motion.path
            d="M5 13l4 4L19 7"
            initial="unchecked"
            animate={checked ? "checked" : "unchecked"}
            variants={checkVariants}
            transition={{ duration: 0.2 }}
          />
        </svg>
      )}
    </div>
  );

  // Western style decoration (optional)
  const WesternDecoration = variant === 'western' ? (
    <div className="absolute -right-1 -bottom-1 h-2 w-2 bg-accent-500 rounded-full" />
  ) : null;

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center">
        <div className="relative">
          <motion.input
            ref={ref}
            type="checkbox"
            className={checkboxClasses}
            disabled={disabled}
            whileTap={!disabled ? { scale: 0.9 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...props}
          />
          {variant === 'western' && WesternDecoration}
          <CheckboxIcon checked={!!props.checked} indeterminate={indeterminate} />
        </div>
        
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
      </div>
      
      {error && <p className={errorClasses}>{error}</p>}
      {!error && helperText && <p className={helperClasses}>{helperText}</p>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
