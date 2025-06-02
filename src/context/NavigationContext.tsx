import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavigationHistoryItem = {
  path: string;
  label: string;
};

interface NavigationContextType {
  history: NavigationHistoryItem[];
  currentPath: string;
  navigateTo: (path: string, label: string) => void;
  goBack: () => void;
  canGoBack: boolean;
  setPageTitle: (title: string) => void;
  pageTitle: string;
  resetHistory: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [history, setHistory] = useState<NavigationHistoryItem[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('Pro Fantasy Rodeo');
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize or update current path when location changes
  useEffect(() => {
    // Only add to history if it's a new path
    if (history.length === 0 || history[history.length - 1].path !== location.pathname) {
      // Don't add duplicates right next to each other
      setHistory(prev => [...prev, { path: location.pathname, label: pageTitle }]);
    }
  }, [location.pathname]);

  const navigateTo = (path: string, label: string) => {
    navigate(path);
    setPageTitle(label);
  };

  const goBack = () => {
    if (history.length > 1) {
      // Remove current page from history
      const newHistory = [...history];
      newHistory.pop();
      // Get the previous page
      const previousPage = newHistory[newHistory.length - 1];
      // Update history
      setHistory(newHistory);
      // Navigate to previous page
      navigate(previousPage.path);
      setPageTitle(previousPage.label);
    } else {
      // If no history, go to home
      navigate('/');
      setPageTitle('Pro Fantasy Rodeo');
    }
  };

  const resetHistory = () => {
    setHistory([{ path: location.pathname, label: pageTitle }]);
  };

  const canGoBack = history.length > 1;

  return (
    <NavigationContext.Provider
      value={{
        history,
        currentPath: location.pathname,
        navigateTo,
        goBack,
        canGoBack,
        setPageTitle,
        pageTitle,
        resetHistory
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationContext; 