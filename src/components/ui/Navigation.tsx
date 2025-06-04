import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

export interface NavigationItem {
  /**
   * Label for the navigation item
   */
  label: string;
  
  /**
   * Path to navigate to
   */
  path: string;
  
  /**
   * Icon for the navigation item
   */
  icon: ReactNode;
  
  /**
   * Active icon for the navigation item
   */
  activeIcon?: ReactNode;
  
  /**
   * Badge count or indicator (optional)
   */
  badge?: number | string;
  
  /**
   * Whether to display this item
   */
  visible?: boolean;
}

export interface NavigationProps {
  /**
   * Navigation items to display
   */
  items: NavigationItem[];
  
  /**
   * Floating action button details
   */
  actionButton?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'western' | 'glass';
  };
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Whether to use a western style
   */
  westernStyle?: boolean;
  
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Modern bottom navigation bar with optional floating action button
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  actionButton,
  useGlass = false,
  westernStyle = false,
  className = '',
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const filteredItems = items.filter(item => item.visible !== false);
  const itemWidth = `${100 / (filteredItems.length + (actionButton ? 1 : 0))}%`;
  
  // Split items into left and right sides if there's an action button
  const middleIndex = actionButton 
    ? Math.floor(filteredItems.length / 2)
    : filteredItems.length;
  
  const leftItems = filteredItems.slice(0, middleIndex);
  const rightItems = filteredItems.slice(middleIndex);
  
  // Base navigation container classes
  const navClasses = `
    fixed bottom-0 left-0 right-0 z-40
    h-16 px-2 flex items-center justify-between
    ${useGlass ? 'bg-white/10 backdrop-blur-md border-t border-white/20' : 
      westernStyle ? 'bg-secondary-900 border-t-2 border-accent-500' : 
      'bg-white border-t border-gray-200'}
    ${className}
  `.trim();
  
  // Item base classes
  const itemBaseClasses = `
    flex flex-col items-center justify-center
    py-1 relative transition-all duration-200
  `;
  
  // Active item indicator variants
  const activeIndicatorVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  
  // Get classes for an individual nav item
  const getItemClasses = (isActive: boolean) => `
    ${itemBaseClasses}
    ${isActive ? 'text-primary-500 font-medium' : 'text-gray-500'}
    ${westernStyle && isActive ? 'text-accent-400' : ''}
  `.trim();
  
  // Western-styled badge classes
  const badgeClasses = `
    absolute -top-1 -right-1 min-w-5 h-5
    flex items-center justify-center
    text-xs font-bold rounded-full px-1
    ${westernStyle ? 
      'bg-accent-500 text-secondary-900 border border-secondary-900' : 
      'bg-primary-500 text-white'}
  `.trim();
  
  // Action button classes
  const actionButtonClasses = `
    h-14 w-14 rounded-full shadow-lg
    flex items-center justify-center
    transform -translate-y-8
    ${actionButton?.variant === 'western' ? 
      'bg-accent-500 text-secondary-900 border-2 border-accent-600' : 
    actionButton?.variant === 'glass' ? 
      'bg-white/20 backdrop-blur-xl border border-white/30 text-white' : 
      'bg-primary-500 text-white'}
  `.trim();
  
  // Western-style decorative elements
  const WesternDecoration = () => westernStyle ? (
    <>
      {/* Top decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent-500"></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-500"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-500"></div>
    </>
  ) : null;
  
  // Custom styles for Western motif
  const westernMotifStyle = westernStyle ? {
    boxShadow: '0 -4px 12px rgba(212, 175, 55, 0.15)'
  } : {};
  
  // Render a navigation item
  const renderNavItem = (item: NavigationItem) => {
    const isActive = currentPath === item.path;
    
    return (
      <Link 
        key={item.path} 
        to={item.path} 
        className={getItemClasses(isActive)}
        style={{ width: itemWidth }}
      >
        <div className="relative">
          {isActive ? (item.activeIcon || item.icon) : item.icon}
          
          {item.badge && (
            <span className={badgeClasses}>
              {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
            </span>
          )}
        </div>
        
        <span className="text-xs mt-1">{item.label}</span>
        
        {/* Active indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={`absolute bottom-0 w-12 h-1 rounded-t-full ${westernStyle ? 'bg-accent-500' : 'bg-primary-500'}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={activeIndicatorVariants}
              layoutId="activeIndicator"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </Link>
    );
  };
  
  return (
    <nav className={navClasses} style={westernMotifStyle}>
      <WesternDecoration />
      
      {/* Left side items */}
      <div className="flex items-center justify-around" style={{ width: actionButton ? '40%' : '50%' }}>
        {leftItems.map(renderNavItem)}
      </div>
      
      {/* Action button (if provided) */}
      {actionButton && (
        <motion.button
          className={actionButtonClasses}
          onClick={actionButton.onClick}
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -35, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {actionButton.icon}
        </motion.button>
      )}
      
      {/* Right side items */}
      <div className="flex items-center justify-around" style={{ width: actionButton ? '40%' : '50%' }}>
        {rightItems.map(renderNavItem)}
      </div>
    </nav>
  );
}; 