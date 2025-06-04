import React, { createContext, useContext, ReactNode } from 'react';
import { styleGuide } from '@/styles/style-guide';

// Create a context for the style guide
export const StyleContext = createContext(styleGuide);

// Custom hook to use the style guide
export const useStyles = () => useContext(StyleContext);

interface StyleProviderProps {
  children: ReactNode;
  theme?: 'default' | 'western';
}

/**
 * StyleProvider component
 * 
 * Provides consistent styling across the application by making the style guide
 * available through context and applying global styles.
 */
export const StyleProvider: React.FC<StyleProviderProps> = ({ 
  children,
  theme = 'western' 
}) => {
  // Add any theme-specific overrides here
  const themeStyles = theme === 'western' ? styleGuide.westernTheme : {};
  
  // Combine the base style guide with any theme-specific overrides
  const combinedStyles = {
    ...styleGuide,
    currentTheme: themeStyles
  };
  
  return (
    <StyleContext.Provider value={combinedStyles}>
      <GlobalStyles theme={theme} />
      {children}
    </StyleContext.Provider>
  );
};

/**
 * GlobalStyles component
 * 
 * Applies global styles to the application based on the selected theme.
 */
const GlobalStyles: React.FC<{ theme: 'default' | 'western' }> = ({ theme }) => {
  // Add any global CSS here if needed
  React.useEffect(() => {
    // Apply theme-specific body styles
    if (theme === 'western') {
      document.body.classList.add('theme-western');
      document.body.style.backgroundColor = styleGuide.colors.background.default;
      document.body.style.color = styleGuide.colors.text.primary;
      
      // Add custom font for western theme if not already in the document
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Rye&family=Playfair+Display:wght@400;700&display=swap';
      
      if (!document.head.querySelector('link[href*="Rye"]')) {
        document.head.appendChild(fontLink);
      }
    } else {
      document.body.classList.remove('theme-western');
    }
    
    return () => {
      document.body.classList.remove('theme-western');
    };
  }, [theme]);
  
  return null;
};

export default StyleProvider; 