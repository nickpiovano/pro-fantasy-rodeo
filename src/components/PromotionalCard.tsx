import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button-new';
import { ButtonVariant } from '@/components/ui/button-new';
import { ArrowRight } from 'lucide-react';

export interface PromotionalCardProps {
  /**
   * Card title
   */
  title: string;
  
  /**
   * Card description
   */
  description: string;
  
  /**
   * Primary call-to-action text
   */
  ctaText: string;
  
  /**
   * Primary call-to-action handler
   */
  onCtaClick: () => void;
  
  /**
   * Secondary call-to-action text (optional)
   */
  secondaryCtaText?: string;
  
  /**
   * Secondary call-to-action handler (optional)
   */
  onSecondaryCtaClick?: () => void;
  
  /**
   * Image URL for the card background or illustration
   */
  imageUrl?: string;
  
  /**
   * Badge text to display (optional)
   */
  badgeText?: string;
  
  /**
   * Icon to display (optional)
   */
  icon?: React.ReactNode;
  
  /**
   * Whether to use western styling
   */
  western?: boolean;
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
}

const PromotionalCard: React.FC<PromotionalCardProps> = ({
  title,
  description,
  ctaText,
  onCtaClick,
  secondaryCtaText,
  onSecondaryCtaClick,
  imageUrl,
  badgeText,
  icon,
  western = true,
  useGlass = false,
  className = '',
}) => {
  // Card container classes
  const containerClasses = `
    overflow-hidden rounded-lg shadow-lg
    ${western ? 'border-2 border-red-500' : 'border border-gray-200'}
    ${useGlass ? 'bg-white/95' : 'bg-white'}
    ${className}
  `.trim();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Determine button variants based on western style
  const primaryVariant: ButtonVariant = western ? "western" : "primary";
  const secondaryVariant: ButtonVariant = western ? "outline" : "secondary";

  return (
    <motion.div
      className={containerClasses}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Image section */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge overlay */}
          {badgeText && (
            <div className={`
              absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold
              ${western ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}
            `}>
              {badgeText}
            </div>
          )}
        </div>
      )}
      
      {/* Content section */}
      <div className="p-6">
        {/* Icon and title row */}
        <div className="flex items-center mb-3">
          {icon && (
            <div className={`
              mr-3 p-2 rounded-full
              ${western ? 'text-red-600' : 'text-blue-600'}
            `}>
              {icon}
            </div>
          )}
          
          <h3 className={`
            text-xl font-bold
            ${western ? 'text-gray-900' : 'text-gray-900'}
          `}>
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 mb-6">
          {description}
        </p>
        
        {/* Call to action buttons */}
        <div className={`flex flex-wrap gap-3 ${secondaryCtaText ? 'justify-start' : 'justify-between'}`}>
          <Button
            variant={primaryVariant}
            onClick={onCtaClick}
            className={`${western ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {ctaText}
          </Button>
          
          {secondaryCtaText && onSecondaryCtaClick && (
            <Button
              variant={secondaryVariant}
              onClick={onSecondaryCtaClick}
              className={western ? 'border-red-600 text-red-700 hover:bg-red-50' : ''}
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PromotionalCard; 