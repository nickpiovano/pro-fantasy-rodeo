import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface EmptyStateProps {
  /**
   * Title text for the empty state
   */
  title: string;
  
  /**
   * Description text for the empty state
   */
  description?: string;
  
  /**
   * Icon or image to display
   */
  icon?: ReactNode;
  
  /**
   * Action button or component
   */
  action?: ReactNode;
  
  /**
   * Use Western theme styling
   */
  westernStyle?: boolean;
  
  /**
   * Use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Whether to animate the empty state
   */
  animated?: boolean;
  
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Empty state component with Western styling option
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  westernStyle = false,
  useGlass = false,
  animated = true,
  className = '',
}) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };
  
  // Children animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  
  // Container classes
  const containerClasses = `
    py-10 px-6 flex flex-col items-center justify-center text-center
    ${useGlass ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg' : 
      westernStyle ? 'bg-offwhite/80 border-2 border-accent-500 rounded-lg' : 
      'bg-white border border-gray-200 rounded-lg'}
    ${className}
  `.trim();
  
  // Western-style decorative elements
  const WesternDecorations = () => westernStyle ? (
    <>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent-500"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent-500"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent-500"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent-500"></div>
      
      {/* Top decorative rope/lasso element */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-accent-500 rounded-full opacity-10"></div>
      
      {/* Western star */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-500">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
        </svg>
      </div>
    </>
  ) : null;
  
  // Default icon (a tumbleweed for Western style, or a standard empty box)
  const DefaultIcon = () => {
    if (westernStyle) {
      return (
        <div className="relative w-20 h-20 mb-4">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-500">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
            <path d="M9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9Z" stroke="currentColor" strokeWidth="2" />
            <path d="M5 19L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 19L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }
    
    return (
      <div className="w-20 h-20 mb-4 text-gray-300">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7V17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H18C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 7L12 13L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  };
  
  return (
    <motion.div
      className={`relative ${containerClasses}`}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      variants={containerVariants}
    >
      {westernStyle && <WesternDecorations />}
      
      <motion.div variants={itemVariants} className="mb-4">
        {icon || <DefaultIcon />}
      </motion.div>
      
      <motion.h3 
        variants={itemVariants}
        className={`text-xl font-bold mb-2 
          ${westernStyle ? 'text-secondary-800 font-display' : 'text-gray-900'}`}
      >
        {title}
      </motion.h3>
      
      {description && (
        <motion.p 
          variants={itemVariants}
          className={`mb-6 
            ${westernStyle ? 'text-secondary-600' : 'text-gray-500'}`}
        >
          {description}
        </motion.p>
      )}
      
      {action && (
        <motion.div variants={itemVariants}>
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}; 