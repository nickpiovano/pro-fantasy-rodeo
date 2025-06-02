import { ReactNode, useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import BackButton from './BackButton';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullHeight?: boolean;
  hideHeader?: boolean;
  customBackAction?: () => void;
}

const PageContainer = ({
  children,
  title,
  showBackButton = true,
  className = '',
  headerClassName = '',
  contentClassName = '',
  fullHeight = true,
  hideHeader = false,
  customBackAction
}: PageContainerProps) => {
  const { setPageTitle, pageTitle } = useNavigation();

  // Update page title if provided
  useEffect(() => {
    if (title) {
      setPageTitle(title);
    }
  }, [title, setPageTitle]);

  // Use the context title if no title prop is provided
  const displayTitle = title || pageTitle;

  return (
    <div 
      className={`
        ${fullHeight ? 'min-h-screen' : ''} 
        flex flex-col 
        ${className}
      `}
    >
      {!hideHeader && (
        <header className={`
          py-3 px-4 flex items-center border-b border-stone-200
          bg-gradient-to-r from-red-700 to-red-600 text-white
          sticky top-0 z-10
          ${headerClassName}
        `}>
          {showBackButton && (
            <BackButton 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-red-800/50" 
              onCustomBack={customBackAction}
            />
          )}
          <h1 className="text-xl font-bold ml-2 flex-1 text-center pr-9">
            {displayTitle}
          </h1>
        </header>
      )}
      
      <main className={`flex-1 ${contentClassName}`}>
        {children}
      </main>

      {/* Bottom space for navigation bar */}
      <div className="h-16"></div>
    </div>
  );
};

export default PageContainer; 