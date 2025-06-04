import React, { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'default' | 'western' | 'minimal';

export interface CustomToggleProps {
  /**
   * Whether the toggle is checked
   */
  checked?: boolean;
  
  /**
   * Callback when the toggle changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Label for the toggle
   */
  label?: ReactNode;

  /**
   * Size of the toggle
   */
  size?: ToggleSize;

  /**
   * Variant style
   */
  variant?: ToggleVariant;

  /**
   * Helper text displayed below the toggle
   */
  helperText?: string;

  /**
   * Error message displayed instead of helper text
   */
  error?: string;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  
  /**
   * Additional className for the container
   */
  containerClassName?: string;

  /**
   * Additional className for the toggle
   */
  className?: string;
  
  /**
   * Icon to display in the toggle knob when on
   */
  onIcon?: ReactNode;

  /**
   * Icon to display in the toggle knob when off
   */
  offIcon?: ReactNode;

  /**
   * Text to display when toggle is on
   */
  onLabel?: string;

  /**
   * Text to display when toggle is off
   */
  offLabel?: string;
  
  /**
   * ID for the input element
   */
  id?: string;
  
  /**
   * Name for the input element
   */
  name?: string;
}

const CustomToggle = forwardRef<HTMLInputElement, CustomToggleProps>(({
  checked = false,
  onChange,
  label,
  size = 'md',
  variant = 'default',
  helperText,
  error,
  disabled = false,
  className = '',
  containerClassName = '',
  onIcon,
  offIcon,
  onLabel,
  offLabel,
  id,
  name,
}, ref) => {
  // Size classes
  const sizeDimensions = {
    sm: { width: 36, height: 20, knobSize: 16 },
    md: { width: 44, height: 24, knobSize: 20 },
    lg: { width: 52, height: 28, knobSize: 24 },
  };

  const { width, height, knobSize } = sizeDimensions[size];

  // Font sizes for labels
  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Container classes
  const containerClasses = cn(
    "flex items-start",
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    containerClassName
  );

  // Label classes
  const labelClasses = cn(
    "font-medium text-gray-800",
    fontSizes[size],
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  );

  // Message classes
  const messageClasses = cn(`mt-1 ${fontSizes[size]} text-gray-500`);
  const errorClasses = cn(`mt-1 ${fontSizes[size]} text-red-500`);

  // Checkbox is visually hidden but still accessible
  const inputClasses = 'absolute opacity-0 w-0 h-0';

  // Western style extra elements
  const westernAccent = variant === 'western' ? (
    <>
      <div className={cn(`absolute -right-1 -top-1 h-2 w-2 bg-accent-400 rounded-full ${checked ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`)} />
      <div className={cn(`absolute -left-1 -bottom-1 h-2 w-2 bg-accent-400 rounded-full ${checked ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`)} />
    </>
  ) : null;

  // Variant colors and styles
  const getToggleStyles = () => {
    switch (variant) {
      case 'western':
        return {
          track: {
            on: 'bg-primary-500 border-2 border-accent-500',
            off: 'bg-gray-300 border-2 border-accent-500',
          },
          knob: {
            on: 'bg-white border-2 border-accent-400',
            off: 'bg-white border-2 border-accent-400',
          }
        };
      case 'minimal':
        return {
          track: {
            on: 'bg-primary-500',
            off: 'bg-gray-300',
          },
          knob: {
            on: 'bg-white',
            off: 'bg-white',
          }
        };
      default:
        return {
          track: {
            on: 'bg-primary-500',
            off: 'bg-gray-300',
          },
          knob: {
            on: 'bg-white',
            off: 'bg-white',
          }
        };
    }
  };

  const toggleStyles = getToggleStyles();

  // Track style
  const trackStyle = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${height / 2}px`,
  };

  // Track classes
  const trackClasses = cn(
    "relative inline-block transition-colors duration-300",
    checked ? toggleStyles.track.on : toggleStyles.track.off,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className
  );

  // Knob style
  const knobStyle = {
    width: `${knobSize}px`,
    height: `${knobSize}px`,
    borderRadius: '50%',
  };

  // Knob classes
  const knobClasses = cn(
    "absolute top-[2px] flex items-center justify-center transition-all duration-300 shadow-sm",
    checked ? toggleStyles.knob.on : toggleStyles.knob.off
  );

  // Text labels beside the toggle
  const labelTextClasses = `ml-2 ${fontSizes[size]}`;

  // Status label styles
  const statusLabelClasses = cn(
    "absolute transform transition-all duration-300",
    fontSizes[size],
    "font-medium"
  );

  const onLabelClasses = cn(
    statusLabelClasses,
    "text-white",
    checked ? 'opacity-100 left-2' : 'opacity-0 left-8'
  );

  const offLabelClasses = cn(
    statusLabelClasses,
    "text-gray-600",
    !checked ? 'opacity-100 right-2' : 'opacity-0 right-8'
  );

  // Handle toggle click
  const handleToggleClick = () => {
    if (disabled) return;
    
    if (onChange) {
      const event = {
        target: { 
          checked: !checked,
          name,
          id,
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(event);
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex items-center">
        <div className="relative">
          {/* Real checkbox (hidden) */}
          <input
            ref={ref}
            type="checkbox"
            className={inputClasses}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            id={id}
            name={name}
          />
          
          {/* Custom toggle UI */}
          <div 
            className={trackClasses}
            style={trackStyle}
            onClick={handleToggleClick}
          >
            {westernAccent}
            
            {onLabel && <span className={onLabelClasses}>{onLabel}</span>}
            {offLabel && <span className={offLabelClasses}>{offLabel}</span>}
            
            <motion.div
              className={knobClasses}
              style={knobStyle}
              animate={{
                left: checked ? `${width - knobSize - 2}px` : '2px',
                rotate: checked ? 180 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {checked ? onIcon : offIcon}
            </motion.div>
          </div>
        </div>
        
        {label && (
          <label 
            className={cn(labelTextClasses, labelClasses)} 
            onClick={!disabled ? handleToggleClick : undefined}
          >
            {label}
          </label>
        )}
      </div>
      
      {error && <p className={errorClasses}>{error}</p>}
      {!error && helperText && <p className={messageClasses}>{helperText}</p>}
    </div>
  );
});

CustomToggle.displayName = 'CustomToggle';

export { CustomToggle }; 