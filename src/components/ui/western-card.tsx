import React from 'react';
import { cn } from '@/lib/utils';
import { styleGuide } from '@/styles/style-guide';
import { motion, HTMLMotionProps } from 'framer-motion';

// Card variants
export type WesternCardVariant = 'default' | 'primary' | 'accent' | 'dark' | 'glass';

// Card sizes
export type WesternCardSize = 'sm' | 'md' | 'lg';

// Props for the static div version
type StaticDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

// Props for the motion div version
type MotionDivProps = Omit<HTMLMotionProps<"div">, 'title'>;

// Combined props interface
interface WesternCardProps extends StaticDivProps {
  /**
   * Card variant
   */
  variant?: WesternCardVariant;
  
  /**
   * Card size
   */
  size?: WesternCardSize;
  
  /**
   * Whether to include animation effects
   */
  animated?: boolean;
  
  /**
   * Whether to use a gradient header
   */
  gradientHeader?: boolean;
  
  /**
   * Whether to add a border
   */
  bordered?: boolean;
  
  /**
   * Whether to add a shadow
   */
  shadowed?: boolean;
  
  /**
   * Card title
   */
  title?: React.ReactNode;
  
  /**
   * Card subtitle
   */
  subtitle?: React.ReactNode;
  
  /**
   * Badge text to display in the header
   */
  badgeText?: string;
  
  /**
   * Icon to display in the header
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  
  /**
   * Additional CSS classes for the content
   */
  contentClassName?: string;
  
  /**
   * Content to render in the card
   */
  children: React.ReactNode;
  
  /**
   * Accessible label for the card
   */
  ariaLabel?: string;
}

/**
 * WesternCard component
 * 
 * A themed card component that follows the western theme from our style guide.
 */
export const WesternCard = React.forwardRef<HTMLDivElement, WesternCardProps>(({
  variant = 'default',
  size = 'md',
  animated = false,
  gradientHeader = true,
  bordered = true,
  shadowed = true,
  title,
  subtitle,
  badgeText,
  icon,
  headerClassName,
  contentClassName,
  children,
  ariaLabel,
  className,
  ...props
}, ref) => {
  // Determine card classes based on variant
  const variantClasses = {
    default: 'bg-gray-900 border-gray-700',
    primary: 'bg-gray-900 border-red-600',
    accent: 'bg-gray-900 border-amber-600',
    dark: 'bg-black border-gray-800',
    glass: 'bg-black/40 backdrop-blur-md border-white/20',
  };
  
  // Determine size classes
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  // Determine header classes
  const headerClasses = {
    default: 'bg-gray-800',
    primary: gradientHeader ? 'bg-gradient-to-r from-red-700 to-red-600' : 'bg-red-600',
    accent: gradientHeader ? 'bg-gradient-to-r from-amber-700 to-amber-600' : 'bg-amber-600',
    dark: 'bg-black',
    glass: 'bg-black/60 backdrop-blur-md',
  };
  
  // Determine border classes
  const borderClasses = bordered ? `border-2 ${variantClasses[variant]}` : '';
  
  // Determine shadow classes
  const shadowClasses = shadowed ? 'shadow-lg' : '';
  
  // Combined card classes
  const cardClasses = cn(
    'rounded-lg overflow-hidden',
    borderClasses,
    shadowClasses,
    className
  );
  
  // Animation variants for the card
  const cardAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: animated ? { y: -5, transition: { duration: 0.2 } } : {},
  };
  
  // Card content rendering
  const cardContent = (
    <>
      {/* Card Header (if title or subtitle is provided) */}
      {(title || subtitle || badgeText) && (
        <div className={cn(
          'p-4',
          headerClasses[variant],
          headerClassName
        )}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {icon && (
                <div className="mr-3 text-white">
                  {icon}
                </div>
              )}
              
              <div>
                {title && (
                  <h3 className="text-xl font-bold text-white">
                    {title}
                  </h3>
                )}
                
                {subtitle && (
                  <p className="text-sm text-gray-200 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            
            {badgeText && (
              <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {badgeText}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className={cn(
        sizeClasses[size],
        'bg-gray-900',
        contentClassName
      )}>
        {children}
      </div>
    </>
  );
  
  // Render with or without animations
  if (animated) {
    return (
      <motion.div 
        className={cardClasses}
        ref={ref}
        role={ariaLabel ? "region" : undefined}
        aria-label={ariaLabel}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardAnimations}
        {...props as unknown as HTMLMotionProps<"div">}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return (
    <div 
      className={cardClasses}
      ref={ref}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {cardContent}
    </div>
  );
});

WesternCard.displayName = "WesternCard";

export default WesternCard; 