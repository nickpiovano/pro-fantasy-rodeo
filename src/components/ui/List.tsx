import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ListItemProps {
  /**
   * Unique identifier for the item
   */
  id: string | number;
  
  /**
   * Primary text content
   */
  primary: ReactNode;
  
  /**
   * Secondary text content
   */
  secondary?: ReactNode;
  
  /**
   * Tertiary text content (e.g. stats or additional info)
   */
  tertiary?: ReactNode;
  
  /**
   * Left side content (usually an avatar or icon)
   */
  leading?: ReactNode;
  
  /**
   * Right side content (e.g. action buttons or indicators)
   */
  trailing?: ReactNode;
  
  /**
   * Badge or chip (typically used for status or category)
   */
  badge?: ReactNode;
  
  /**
   * Whether the item is currently selected
   */
  selected?: boolean;
  
  /**
   * Whether the item is currently disabled
   */
  disabled?: boolean;
  
  /**
   * Function to call when the item is clicked
   */
  onClick?: () => void;
  
  /**
   * Additional className for the item
   */
  className?: string;
}

export interface ListProps {
  /**
   * List items to display
   */
  items: ListItemProps[];
  
  /**
   * Title for the list
   */
  title?: ReactNode;
  
  /**
   * Whether to use Western styling
   */
  westernStyle?: boolean;
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Whether selection is enabled
   */
  selectable?: boolean;
  
  /**
   * Maximum number of items that can be selected
   */
  maxSelections?: number;
  
  /**
   * Function to call when selection changes
   */
  onSelectionChange?: (selectedIds: Array<string | number>) => void;
  
  /**
   * Custom renderer for list items
   */
  renderItem?: (item: ListItemProps) => ReactNode;
  
  /**
   * Empty state content
   */
  emptyState?: ReactNode;
  
  /**
   * Additional className for the list container
   */
  className?: string;
  
  /**
   * Additional className for list items
   */
  itemClassName?: string;
}

/**
 * Modern list component with selection states
 */
export const List: React.FC<ListProps> = ({
  items,
  title,
  westernStyle = false,
  useGlass = false,
  selectable = false,
  maxSelections,
  onSelectionChange,
  renderItem,
  emptyState,
  className = '',
  itemClassName = '',
}) => {
  // Track selected items
  const [selectedIds, setSelectedIds] = React.useState<Array<string | number>>([]);
  
  // Handle selection changes
  React.useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedIds);
    }
  }, [selectedIds, onSelectionChange]);
  
  // Toggle selection for an item
  const toggleSelection = (id: string | number) => {
    setSelectedIds(prevSelected => {
      const isSelected = prevSelected.includes(id);
      
      if (isSelected) {
        // Remove from selection
        return prevSelected.filter(itemId => itemId !== id);
      } else {
        // Add to selection if under max limit
        if (maxSelections !== undefined && prevSelected.length >= maxSelections) {
          // At selection limit, replace oldest selection
          const newSelection = [...prevSelected];
          newSelection.shift(); // Remove first item
          return [...newSelection, id];
        }
        return [...prevSelected, id];
      }
    });
  };
  
  // Container classes
  const containerClasses = `
    rounded-lg overflow-hidden
    ${useGlass ? 'bg-white/10 backdrop-blur-md border border-white/20' : 
      westernStyle ? 'bg-offwhite border-2 border-accent-500' : 
      'bg-white border border-gray-200'}
    ${className}
  `.trim();
  
  // List classes
  const listClasses = `
    divide-y
    ${westernStyle ? 'divide-accent-300/30' : 'divide-gray-200'}
  `.trim();
  
  // Title classes
  const titleClasses = `
    px-4 py-3 font-semibold
    ${westernStyle ? 'text-secondary-800 bg-accent-100/40 border-b-2 border-accent-300/30 font-display' : 
      'text-gray-800 bg-gray-50 border-b border-gray-200'}
  `.trim();
  
  // Empty state classes
  const emptyStateClasses = `
    p-8 text-center text-gray-500 italic
  `.trim();
  
  // Get classes for an individual list item
  const getItemClasses = (item: ListItemProps) => `
    relative px-4 py-3 flex items-center
    ${selectable ? 'cursor-pointer' : ''}
    ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${item.selected || selectedIds.includes(item.id) ? 
      westernStyle ? 'bg-accent-100/50' : 'bg-primary-50' : ''}
    ${westernStyle && (item.selected || selectedIds.includes(item.id)) ? 'border-l-4 border-accent-500' : ''}
    ${itemClassName}
    ${item.className || ''}
  `.trim();
  
  // Western-style decorative elements
  const WesternDecoration = () => westernStyle ? (
    <>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-500"></div>
    </>
  ) : null;
  
  // Selection indicator variants
  const selectionIndicatorVariants = {
    unselected: { opacity: 0, scale: 0.8 },
    selected: { opacity: 1, scale: 1 }
  };
  
  // Default item renderer
  const defaultRenderItem = (item: ListItemProps) => {
    const isSelected = item.selected || selectedIds.includes(item.id);
    
    // Handle click on item
    const handleClick = () => {
      if (item.disabled) return;
      
      if (selectable) {
        toggleSelection(item.id);
      }
      
      if (item.onClick) {
        item.onClick();
      }
    };
    
    return (
      <motion.li
        key={item.id}
        className={getItemClasses(item)}
        onClick={handleClick}
        whileTap={!item.disabled ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        layout
      >
        {/* Leading content (avatar, icon, etc.) */}
        {item.leading && (
          <div className="mr-4 flex-shrink-0">
            {item.leading}
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Primary text */}
          <div className="text-sm font-medium text-gray-900 truncate">
            {item.primary}
          </div>
          
          {/* Secondary text */}
          {item.secondary && (
            <div className="text-sm text-gray-500 truncate">
              {item.secondary}
            </div>
          )}
          
          {/* Tertiary text */}
          {item.tertiary && (
            <div className="text-xs text-gray-400 mt-1">
              {item.tertiary}
            </div>
          )}
          
          {/* Badge */}
          {item.badge && (
            <div className="mt-1">
              {item.badge}
            </div>
          )}
        </div>
        
        {/* Selection indicator */}
        {selectable && (
          <div className="ml-4 flex-shrink-0">
            <motion.div 
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isSelected ?
                  westernStyle ? 'border-accent-500 bg-accent-100' : 'border-primary-500 bg-primary-100' :
                  'border-gray-300 bg-white'
                }`}
              initial="unselected"
              animate={isSelected ? "selected" : "unselected"}
              variants={selectionIndicatorVariants}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {isSelected && (
                <motion.div 
                  className={`w-2.5 h-2.5 rounded-full ${westernStyle ? 'bg-accent-500' : 'bg-primary-500'}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                />
              )}
            </motion.div>
          </div>
        )}
        
        {/* Trailing content */}
        {item.trailing && (
          <div className="ml-4 flex-shrink-0">
            {item.trailing}
          </div>
        )}
      </motion.li>
    );
  };
  
  return (
    <div className={containerClasses}>
      {westernStyle && <WesternDecoration />}
      
      {/* List title */}
      {title && (
        <div className={titleClasses}>
          {title}
        </div>
      )}
      
      {/* List items */}
      {items.length > 0 ? (
        <ul className={listClasses}>
          <AnimatePresence>
            {items.map(item => (
              renderItem ? renderItem(item) : defaultRenderItem(item)
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className={emptyStateClasses}>
          {emptyState || "No items to display"}
        </div>
      )}
    </div>
  );
}; 