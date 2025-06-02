import { useContext } from 'react';
import NavigationContext from '@/context/NavigationContext';

/**
 * Custom hook for navigation functionality
 * 
 * Provides access to:
 * - history: Array of navigation history items
 * - currentPath: Current path
 * - navigateTo: Function to navigate to a new path
 * - goBack: Function to go back to previous page
 * - canGoBack: Boolean indicating if there's history to go back to
 * - pageTitle: Current page title
 * - setPageTitle: Function to set page title
 * - resetHistory: Function to reset navigation history
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
};

export default useNavigation; 