import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export type TabPosition = 'top' | 'bottom' | 'left' | 'right';
export type TabVariant = 'default' | 'pills' | 'underlined' | 'western';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[];
  
  /**
   * Initial active tab ID
   */
  defaultTabId?: string;
  
  /**
   * Controlled active tab ID
   */
  activeTabId?: string;
  
  /**
   * Callback when active tab changes
   */
  onTabChange?: (tabId: string) => void;
  
  /**
   * Position of tabs
   */
  position?: TabPosition;
  
  /**
   * Tab style variant
   */
  variant?: TabVariant;
  
  /**
   * Tab size
   */
  size?: TabSize;
  
  /**
   * Whether to stretch tabs to full width
   */
  fullWidth?: boolean;
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Additional class name for the container
   */
  className?: string;
  
  /**
   * Additional class name for tab buttons
   */
  tabsClassName?: string;
  
  /**
   * Additional class name for tab content
   */
  contentClassName?: string;
}

export const Tabs = ({
  tabs,
  defaultTabId,
  activeTabId: controlledActiveTabId,
  onTabChange,
  position = 'top',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  useGlass = false,
  className = '',
  tabsClassName = '',
  contentClassName = '',
}: TabsProps) => {
  // Initialize with default or first tab
  const initialTabId = defaultTabId || tabs[0]?.id;
  
  // State for active tab (uncontrolled mode)
  const [uncontrolledActiveTabId, setUncontrolledActiveTabId] = useState<string>(initialTabId);
  
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledActiveTabId !== undefined;
  const activeTabId = isControlled ? controlledActiveTabId : uncontrolledActiveTabId;
  
  // Get active tab
  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];
  
  // Ref for tab buttons for indicator positioning
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  
  // State for the indicator dimensions and position
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  
  // Update indicator position when active tab changes
  useEffect(() => {
    if (!tabsRef.current.length) return;
    
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const activeTabEl = tabsRef.current[activeTabIndex];
    
    if (!activeTabEl) return;
    
    if (position === 'top' || position === 'bottom') {
      setIndicatorStyle({
        width: activeTabEl.offsetWidth,
        height: variant === 'underlined' ? '2px' : '100%',
        left: activeTabEl.offsetLeft,
        top: variant === 'underlined' ? (position === 'bottom' ? '0' : 'auto') : '0',
        bottom: variant === 'underlined' ? (position === 'top' ? '0' : 'auto') : '0',
      });
    } else {
      setIndicatorStyle({
        width: variant === 'underlined' ? '2px' : '100%',
        height: activeTabEl.offsetHeight,
        top: activeTabEl.offsetTop,
        left: variant === 'underlined' ? (position === 'right' ? '0' : 'auto') : '0',
        right: variant === 'underlined' ? (position === 'left' ? '0' : 'auto') : '0',
      });
    }
  }, [activeTabId, tabs, position, variant]);
  
  // Handle tab click
  const handleTabClick = (tabId: string) => {
    if (isControlled) {
      onTabChange?.(tabId);
    } else {
      setUncontrolledActiveTabId(tabId);
      onTabChange?.(tabId);
    }
  };
  
  // Get container direction based on position
  const getContainerDirection = () => {
    switch (position) {
      case 'left': return 'flex-row';
      case 'right': return 'flex-row-reverse';
      case 'bottom': return 'flex-col-reverse';
      case 'top':
      default: return 'flex-col';
    }
  };
  
  // Get tabs layout based on position
  const getTabsLayout = () => {
    switch (position) {
      case 'left':
      case 'right': return 'flex-col';
      case 'top':
      case 'bottom':
      default: return 'flex-row';
    }
  };
  
  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'md': return 'text-sm';
      case 'lg': return 'text-base';
      default: return 'text-sm';
    }
  };
  
  // Get tab button padding based on size
  const getTabPadding = () => {
    switch (size) {
      case 'sm': return position === 'left' || position === 'right' 
        ? 'px-2 py-1.5' 
        : 'px-3 py-1.5';
      case 'md': return position === 'left' || position === 'right' 
        ? 'px-3 py-2' 
        : 'px-4 py-2';
      case 'lg': return position === 'left' || position === 'right' 
        ? 'px-4 py-3' 
        : 'px-6 py-3';
      default: return position === 'left' || position === 'right' 
        ? 'px-3 py-2' 
        : 'px-4 py-2';
    }
  };
  
  // Get tab variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return 'rounded-md';
      case 'western':
        return 'rounded-md border-2 border-accent-500';
      case 'underlined':
      case 'default':
      default:
        return '';
    }
  };
  
  // Get indicator colors
  const getIndicatorColors = () => {
    switch (variant) {
      case 'pills':
        return 'bg-primary-500';
      case 'underlined':
        return 'bg-primary-500';
      case 'western':
        return 'bg-accent-400';
      case 'default':
      default:
        return 'bg-primary-500';
    }
  };
  
  // Main container classes
  const containerClasses = `
    flex ${getContainerDirection()}
    ${className}
  `.trim();
  
  // Tabs container classes
  const tabsContainerClasses = `
    relative flex ${getTabsLayout()} gap-1
    ${fullWidth ? (position === 'left' || position === 'right' ? 'w-full' : '') : ''}
    ${tabsClassName}
  `.trim();
  
  // Individual tab button classes
  const getTabClasses = (tab: TabItem) => `
    relative flex items-center justify-center ${getTabPadding()} ${getSizeClasses()}
    ${getVariantClasses()}
    ${fullWidth && (position === 'top' || position === 'bottom') ? 'flex-1' : ''}
    transition-all duration-200
    ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${tab.id === activeTabId ? 'text-primary-700 font-medium' : 'text-gray-600 hover:text-gray-800'}
    ${variant === 'western' && tab.id === activeTabId ? 'text-secondary-800 font-medium' : ''}
    ${useGlass ? 'backdrop-blur-md' : ''}
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
  `.trim();
  
  // Content container classes
  const contentContainerClasses = `
    ${position === 'left' || position === 'right' ? 'flex-1' : 'w-full'}
    ${contentClassName}
  `.trim();
  
  return (
    <div className={containerClasses}>
      {/* Tabs */}
      <div className={tabsContainerClasses}>
        {/* Animated indicator */}
        {variant !== 'western' && (
          <motion.div
            className={`absolute z-0 ${getIndicatorColors()}`}
            style={indicatorStyle}
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        )}
        
        {/* Tab buttons */}
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={getTabClasses(tab)}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            aria-selected={tab.id === activeTabId}
            role="tab"
            tabIndex={tab.id === activeTabId ? 0 : -1}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className={contentContainerClasses}>
        <motion.div
          key={activeTabId}
          id={`panel-${activeTabId}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTabId}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab?.content}
        </motion.div>
      </div>
    </div>
  );
}; 