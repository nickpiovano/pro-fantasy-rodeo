import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"

export type SkeletonVariant = 'default' | 'text' | 'circular' | 'rectangular' | 'western';
export type SkeletonSize = 'sm' | 'md' | 'lg' | 'xl' | 'custom';

export interface SkeletonProps {
  /**
   * Shape variant
   */
  variant?: SkeletonVariant;
  
  /**
   * Predefined size
   */
  size?: SkeletonSize;
  
  /**
   * Width (if size is 'custom')
   */
  width?: string | number;
  
  /**
   * Height (if size is 'custom')
   */
  height?: string | number;
  
  /**
   * Custom border radius
   */
  borderRadius?: string | number;
  
  /**
   * Whether to use western-themed styling
   */
  westernStyle?: boolean;
  
  /**
   * Whether to show with animation
   */
  animated?: boolean;
  
  /**
   * Additional className
   */
  className?: string;

  /**
   * Children elements (used for complex skeletons)
   */
  children?: ReactNode;
}

/**
 * Component skeleton with animated loading effect
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'default',
  size = 'md',
  width,
  height,
  borderRadius,
  westernStyle = false,
  animated = true,
  className = '',
  children
}) => {
  // Size dimensions based on variant and size
  const getSizeDimensions = () => {
    if (size === 'custom' && width !== undefined && height !== undefined) {
      return { width, height };
    }
    
    // Default sizes by variant
    const sizes = {
      default: {
        sm: { width: '100%', height: '16px' },
        md: { width: '100%', height: '24px' },
        lg: { width: '100%', height: '32px' },
        xl: { width: '100%', height: '48px' },
      },
      text: {
        sm: { width: '100%', height: '12px' },
        md: { width: '100%', height: '16px' },
        lg: { width: '100%', height: '20px' },
        xl: { width: '100%', height: '24px' },
      },
      circular: {
        sm: { width: '24px', height: '24px' },
        md: { width: '40px', height: '40px' },
        lg: { width: '56px', height: '56px' },
        xl: { width: '72px', height: '72px' },
      },
      rectangular: {
        sm: { width: '100%', height: '60px' },
        md: { width: '100%', height: '100px' },
        lg: { width: '100%', height: '160px' },
        xl: { width: '100%', height: '220px' },
      },
      western: {
        sm: { width: '100%', height: '20px' },
        md: { width: '100%', height: '32px' },
        lg: { width: '100%', height: '44px' },
        xl: { width: '100%', height: '56px' },
      }
    };
    
    return sizes[variant][size];
  };
  
  // Get border radius based on variant
  const getBorderRadius = () => {
    if (borderRadius !== undefined) {
      return borderRadius;
    }
    
    switch (variant) {
      case 'circular':
        return '50%';
      case 'text':
        return '4px';
      case 'western':
        return westernStyle ? '0px' : '4px';
      case 'rectangular':
        return '8px';
      default:
        return '4px';
    }
  };
  
  // Base styles
  const dimensions = getSizeDimensions();
  const radius = getBorderRadius();
  
  const skeletonStyle = {
    width: dimensions.width,
    height: dimensions.height,
    borderRadius: radius,
  };
  
  // Animation variants
  const pulseVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const shimmerVariants = {
    initial: { 
      backgroundPosition: "-300px 0" 
    },
    animate: { 
      backgroundPosition: ["calc(-300px)", "calc(300px)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  // Western style elements
  const westernAccent = westernStyle && variant === 'western' ? (
    <div className="absolute inset-0 border-2 border-accent-300/30 pointer-events-none" style={{ borderRadius: radius }} />
  ) : null;
  
  // Base classes
  const baseClasses = `
    relative overflow-hidden
    ${westernStyle ? 'bg-accent-100/40' : 'bg-gray-200'}
  `.trim();
  
  // Animation classes
  const animationClasses = animated ? `
    ${westernStyle ? 'skeleton-pulse-western' : 'skeleton-pulse'}
  `.trim() : '';
  
  // Combined classes
  const skeletonClasses = `
    ${baseClasses}
    ${animationClasses}
    ${className}
  `.trim();
  
  // Generate skeleton items for text
  const renderTextLines = () => {
    if (variant !== 'text' || children) return null;
    
    return (
      <>
        <div className="w-full h-full" />
        <div className="w-[85%] h-full mt-2" />
        <div className="w-[70%] h-full mt-2" />
      </>
    );
  };
  
  return (
    <motion.div
      className={skeletonClasses}
      style={skeletonStyle}
      initial="initial"
      animate={animated ? "animate" : "initial"}
      variants={westernStyle ? pulseVariants : shimmerVariants}
    >
      {westernAccent}
      {children || renderTextLines()}
      
      {/* For shimmer effect */}
      {animated && !westernStyle && (
        <div className="absolute inset-0 skeleton-shimmer" />
      )}
    </motion.div>
  );
};

// Predefined skeleton components
export const SkeletonText: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="text" {...props} />
);

export const SkeletonCircle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="circular" {...props} />
);

export const SkeletonRectangle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="rectangular" {...props} />
);

// Compound components for complex skeletons
export const SkeletonListItem: React.FC<{ westernStyle?: boolean }> = ({ westernStyle = false }) => (
  <div className="flex items-center p-4">
    <SkeletonCircle size="md" westernStyle={westernStyle} />
    <div className="ml-3 flex-1">
      <SkeletonText size="md" westernStyle={westernStyle} />
      <SkeletonText size="sm" className="mt-2" width="60%" westernStyle={westernStyle} />
    </div>
  </div>
);

export const SkeletonCard: React.FC<{ westernStyle?: boolean }> = ({ westernStyle = false }) => (
  <div className={`p-4 rounded-lg border ${westernStyle ? 'border-accent-300/30' : 'border-gray-200'}`}>
    <SkeletonRectangle size="lg" westernStyle={westernStyle} />
    <SkeletonText size="lg" className="mt-4" westernStyle={westernStyle} />
    <SkeletonText size="md" className="mt-2" westernStyle={westernStyle} />
    <SkeletonText size="md" className="mt-2" width="80%" westernStyle={westernStyle} />
    <div className="flex justify-end mt-4">
      <SkeletonText size="md" width="100px" westernStyle={westernStyle} />
    </div>
  </div>
);

// Additional CSS needed for shimmer effect (add to global CSS)
// .skeleton-shimmer {
//   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
//   background-size: 600px 100%;
// }
// .skeleton-pulse {
//   animation: pulse 1.5s ease-in-out infinite;
// }
// .skeleton-pulse-western {
//   animation: pulse-western 1.5s ease-in-out infinite;
// }
// @keyframes pulse {
//   0%, 100% { opacity: 0.5; }
//   50% { opacity: 0.8; }
// }
// @keyframes pulse-western {
//   0%, 100% { opacity: 0.5; background-color: rgba(212, 175, 55, 0.1); }
//   50% { opacity: 0.8; background-color: rgba(212, 175, 55, 0.2); }
// }
