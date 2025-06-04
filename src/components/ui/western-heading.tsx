import React from 'react';
import { cn } from '@/lib/utils';
import { styleGuide } from '@/styles/style-guide';

// Heading levels
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// Heading variants
export type HeadingVariant = 'default' | 'primary' | 'accent' | 'fancy' | 'display';

// Heading sizes
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface WesternHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level (h1-h6)
   */
  as?: HeadingLevel;
  
  /**
   * Visual style variant
   */
  variant?: HeadingVariant;
  
  /**
   * Size override (independent of heading level)
   */
  size?: HeadingSize;
  
  /**
   * Whether to use gradient text
   */
  gradient?: boolean;
  
  /**
   * Whether to use uppercase text
   */
  uppercase?: boolean;
  
  /**
   * Whether to add text shadow
   */
  textShadow?: boolean;
  
  /**
   * Whether to add decorative elements
   */
  decorated?: boolean;
  
  /**
   * Whether to center the text
   */
  centered?: boolean;
  
  /**
   * Content to render inside the heading
   */
  children: React.ReactNode;
}

/**
 * WesternHeading component
 * 
 * A themed heading component that follows the western theme from our style guide.
 */
export const WesternHeading = React.forwardRef<HTMLHeadingElement, WesternHeadingProps>(({
  as: Component = 'h2',
  variant = 'default',
  size,
  gradient = false,
  uppercase = false,
  textShadow = false,
  decorated = false,
  centered = false,
  className,
  children,
  ...props
}, ref) => {
  // Determine size classes based on heading level and size prop
  const sizeClasses = {
    h1: size ? getSizeClass(size) : 'text-4xl md:text-5xl font-bold',
    h2: size ? getSizeClass(size) : 'text-3xl md:text-4xl font-bold',
    h3: size ? getSizeClass(size) : 'text-2xl md:text-3xl font-bold',
    h4: size ? getSizeClass(size) : 'text-xl md:text-2xl font-semibold',
    h5: size ? getSizeClass(size) : 'text-lg md:text-xl font-semibold',
    h6: size ? getSizeClass(size) : 'text-base md:text-lg font-semibold',
  };
  
  // Helper function to get size class
  function getSizeClass(size: HeadingSize): string {
    switch (size) {
      case 'xs': return 'text-sm font-medium';
      case 'sm': return 'text-base font-medium';
      case 'md': return 'text-lg md:text-xl font-semibold';
      case 'lg': return 'text-xl md:text-2xl font-bold';
      case 'xl': return 'text-2xl md:text-3xl font-bold';
      case '2xl': return 'text-3xl md:text-5xl font-extrabold';
      default: return 'text-xl font-semibold';
    }
  }
  
  // Determine variant classes
  const variantClasses = {
    default: 'text-white',
    primary: 'text-red-500',
    accent: 'text-amber-400',
    fancy: `font-western tracking-wide ${gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400' : 'text-red-500'}`,
    display: `font-display tracking-wide ${gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400' : 'text-white'}`,
  };
  
  // Text transform class
  const textTransformClass = uppercase ? 'uppercase' : '';
  
  // Text shadow class
  const textShadowClass = textShadow ? 'drop-shadow-md' : '';
  
  // Text alignment class
  const textAlignClass = centered ? 'text-center' : '';
  
  // Combined classes
  const headingClasses = cn(
    sizeClasses[Component],
    variantClasses[variant],
    textTransformClass,
    textShadowClass,
    textAlignClass,
    className
  );
  
  // Render the heading with decorative elements if needed
  if (decorated) {
    return (
      <div className={cn('relative flex items-center justify-center gap-4', textAlignClass)}>
        {variant === 'primary' && <div className="hidden md:block h-0.5 flex-1 bg-gradient-to-r from-transparent to-red-600/70" />}
        {variant === 'accent' && <div className="hidden md:block h-0.5 flex-1 bg-gradient-to-r from-transparent to-amber-500/70" />}
        
        {React.createElement(
          Component,
          {
            className: headingClasses,
            ref,
            ...props
          },
          children
        )}
        
        {variant === 'primary' && <div className="hidden md:block h-0.5 flex-1 bg-gradient-to-l from-transparent to-red-600/70" />}
        {variant === 'accent' && <div className="hidden md:block h-0.5 flex-1 bg-gradient-to-l from-transparent to-amber-500/70" />}
      </div>
    );
  }
  
  // Render simple heading
  return React.createElement(
    Component,
    {
      className: headingClasses,
      ref,
      ...props
    },
    children
  );
});

WesternHeading.displayName = "WesternHeading";

export default WesternHeading; 