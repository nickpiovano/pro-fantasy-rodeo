import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds role="region" and aria-label for accessibility */
  ariaLabel?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ariaLabel, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-white p-4 shadow-sm",
        className
      )}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-3", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold text-gray-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex items-center justify-between", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  position?: 'top' | 'bottom';
  /** Alt text is required for accessibility */
  alt: string;
}

const CardImage = React.forwardRef<
  HTMLDivElement,
  CardImageProps
>(({ src, alt, className, position = 'top', ...props }, ref) => {
  const positionClass = position === 'top' ? 'mb-4 -mt-4 -mx-4' : 'mt-4 -mb-4 -mx-4';
  
  return (
    <div 
      ref={ref}
      className={cn("relative overflow-hidden", positionClass, className)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        {...props}
      />
    </div>
  );
})
CardImage.displayName = "CardImage"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage }