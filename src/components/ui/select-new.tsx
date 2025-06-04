import React, { forwardRef, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'outline' | 'western';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * The selected option value
   */
  value?: string;
  
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  
  /**
   * Available options
   */
  options: SelectOption[];
  
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  
  /**
   * Select size
   */
  size?: SelectSize;
  
  /**
   * Label for the select
   */
  label?: string;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Error message
   */
  error?: string;
  
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the select is required
   */
  required?: boolean;
  
  /**
   * Select variant
   */
  variant?: SelectVariant;
  
  /**
   * Use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Full width select
   */
  fullWidth?: boolean;
  
  /**
   * Left icon
   */
  leftIcon?: ReactNode;
  
  /**
   * Additional container class name
   */
  containerClassName?: string;
  
  /**
   * Additional class name for the select itself
   */
  className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  size = 'md',
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  variant = 'default',
  useGlass = false,
  fullWidth = false,
  leftIcon,
  containerClassName = '',
  className = '',
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  // Get the selected option's label
  const selectedOption = options.find(option => option.value === selectedValue);
  
  // Handle option selection
  const handleSelect = (option: SelectOption) => {
    if (disabled || option.disabled) return;
    
    setSelectedValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  
  // Container classes
  const containerClasses = `
    relative flex flex-col
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${containerClassName}
  `.trim();
  
  // Label classes
  const labelClasses = `
    mb-1 font-medium text-gray-800
    ${size === 'sm' ? 'text-xs' : ''}
    ${size === 'md' ? 'text-sm' : ''}
    ${size === 'lg' ? 'text-base' : ''}
    ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
  `.trim();
  
  // Trigger base classes
  const triggerBaseClasses = `
    relative flex items-center justify-between
    w-full cursor-pointer transition-all duration-200
    ${leftIcon ? 'pl-9' : 'pl-3'}
    pr-9
  `.trim();
  
  // Size classes
  const sizeClasses = {
    sm: 'h-8 text-xs rounded-md',
    md: 'h-10 text-sm rounded-md',
    lg: 'h-12 text-base rounded-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: useGlass
      ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white focus:border-white/40 focus:ring-1 focus:ring-white/30'
      : 'bg-white border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    
    filled: useGlass
      ? 'bg-white/5 backdrop-blur-sm border-0 border-b-2 border-white/20 text-white focus:border-white focus:bg-white/10'
      : 'bg-gray-100 border-0 border-b-2 border-gray-300 text-gray-900 focus:border-primary-500 focus:bg-gray-50',
    
    outline: 'bg-transparent border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    
    western: 'bg-offwhite border-2 border-accent-500 text-secondary-800 shadow-sm focus:border-accent-600 focus:ring-1 focus:ring-accent-400',
  };
  
  // Status classes
  let statusClasses = '';
  if (error) {
    statusClasses = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  }
  
  // Combine trigger classes
  const triggerClasses = `
    ${triggerBaseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${statusClasses}
    ${className}
  `.trim();
  
  // Dropdown container classes
  const dropdownClasses = `
    absolute z-50 w-full mt-1 overflow-hidden
    bg-white border border-gray-200 rounded-md shadow-lg
    ${useGlass ? 'bg-white/90 backdrop-blur-md' : ''}
    ${variant === 'western' ? 'border-2 border-accent-400' : ''}
  `.trim();
  
  // Option base classes
  const optionBaseClasses = `
    flex items-center px-3 cursor-pointer transition-all duration-150
  `.trim();
  
  // Option size classes
  const optionSizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };
  
  // Error and helper text classes
  const messageClasses = `
    mt-1
    ${size === 'sm' ? 'text-xs' : 'text-sm'}
  `.trim();
  
  const errorClasses = `${messageClasses} text-red-500`;
  const helperClasses = `${messageClasses} text-gray-500`;
  
  // Animation variants
  const dropdownAnimation = {
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
  
  return (
    <div className={containerClasses} ref={ref}>
      {/* Label */}
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      {/* Main select trigger */}
      <div className="relative">
        <motion.div
          className={triggerClasses}
          onClick={toggleDropdown}
          whileTap={!disabled ? { scale: 0.98 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* Left icon if provided */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}
          
          {/* Selected value or placeholder */}
          <span className={!selectedValue ? 'text-gray-500' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          {/* Dropdown arrow */}
          <motion.div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </motion.div>
        </motion.div>
        
        {/* Dropdown */}
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
                className={dropdownClasses}
                variants={dropdownAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {options.map((option) => (
                  <motion.div
                    key={option.value}
                    className={`
                      ${optionBaseClasses}
                      ${optionSizeClasses[size]}
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                      ${selectedValue === option.value ? 'bg-primary-50 text-primary-700' : ''}
                      ${variant === 'western' && selectedValue === option.value ? 'bg-accent-100 text-secondary-800' : ''}
                    `}
                    onClick={() => !option.disabled && handleSelect(option)}
                    whileHover={!option.disabled ? { x: 5 } : undefined}
                  >
                    <span className="flex-1">{option.label}</span>
                    
                    {/* Check icon for selected option */}
                    {selectedValue === option.value && (
                      <Check className="h-4 w-4 text-primary-500" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Error message */}
      {error && <p className={errorClasses}>{error}</p>}
      
      {/* Helper text (only show if no error) */}
      {!error && helperText && <p className={helperClasses}>{helperText}</p>}
    </div>
  );
});

Select.displayName = 'Select'; 