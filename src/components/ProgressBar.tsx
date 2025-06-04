import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProgressBarProps {
  /**
   * Current progress value (0-100)
   */
  value: number;
  
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  
  /**
   * Show percentage text
   */
  showPercentage?: boolean;
  
  /**
   * Show value text
   */
  showValue?: boolean;
  
  /**
   * Label to display
   */
  label?: string;
  
  /**
   * Size of the progress bar
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Visual variant
   */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'western';
  
  /**
   * Whether to animate the progress
   */
  animate?: boolean;
  
  /**
   * Whether to show milestone markers
   */
  showMilestones?: boolean;
  
  /**
   * Milestone positions (0-100)
   */
  milestones?: number[];
  
  /**
   * Whether to use striped design
   */
  striped?: boolean;
  
  /**
   * Whether to animate stripes
   */
  animated?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Callback when a milestone is reached
   */
  onMilestoneReached?: (milestone: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showPercentage = false,
  showValue = false,
  label,
  size = 'md',
  variant = 'default',
  animate = true,
  showMilestones = false,
  milestones = [25, 50, 75, 100],
  striped = false,
  animated = false,
  className = '',
  onMilestoneReached
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // State to track if tooltip is shown
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  
  // Height based on size
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'lg': return 'h-6';
      case 'md':
      default: return 'h-4';
    }
  };
  
  // Get background color based on variant
  const getVariantClasses = () => {
    const baseClasses = {
      default: 'bg-primary-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
      info: 'bg-blue-500',
      western: 'bg-accent-500'
    };
    
    const trackClasses = {
      default: 'bg-gray-200',
      success: 'bg-green-100',
      warning: 'bg-yellow-100',
      danger: 'bg-red-100',
      info: 'bg-blue-100',
      western: 'bg-secondary-800'
    };
    
    return {
      bar: baseClasses[variant],
      track: trackClasses[variant]
    };
  };
  
  // Get text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case 'western': return 'text-accent-500';
      case 'danger': return 'text-red-600';
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-primary-600';
    }
  };
  
  // Handle mouse move for interactive tooltip
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const position = Math.min(100, Math.max(0, (x / width) * 100));
    
    setTooltipPosition(position);
    setShowTooltip(true);
  };
  
  // Striped pattern classes
  const stripedClasses = striped ? 'bg-stripes' : '';
  const animatedStripesClasses = animated && striped ? 'animate-stripes' : '';
  
  const variantClasses = getVariantClasses();
  const heightClass = getHeight();
  const textColorClass = getTextColor();
  
  return (
    <div className={`w-full ${className}`}>
      {/* Label and value display */}
      {(label || showValue || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className={`text-sm font-medium ${textColorClass}`}>
              {label}
            </span>
          )}
          
          <div className="flex items-center space-x-2">
            {showValue && (
              <span className="text-sm font-medium text-gray-700">
                {value}/{max}
              </span>
            )}
            
            {showPercentage && (
              <span className="text-sm font-medium text-gray-700">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Progress bar container */}
      <div 
        className={`relative w-full ${heightClass} rounded-full overflow-hidden ${variantClasses.track}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Animated progress bar */}
        <motion.div
          className={`absolute top-0 left-0 h-full rounded-full ${variantClasses.bar} ${stripedClasses} ${animatedStripesClasses}`}
          initial={animate ? { width: '0%' } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animate ? 0.8 : 0, ease: "easeOut" }}
        />
        
        {/* Milestone markers */}
        {showMilestones && milestones.map((milestone) => {
          const milestonePercentage = (milestone / max) * 100;
          return (
            <div 
              key={milestone}
              className={`absolute top-0 w-0.5 ${heightClass} bg-white`}
              style={{ left: `${milestonePercentage}%` }}
            >
              <div 
                className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs ${textColorClass}`}
              >
                {milestone}
              </div>
            </div>
          );
        })}
        
        {/* Interactive tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2"
              style={{ left: `${tooltipPosition}%` }}
            >
              {Math.round((tooltipPosition / 100) * max)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProgressBar; 