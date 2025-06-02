import { Home, Award, List, User, TrendingUp } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

const MobileNavigation = () => {
  const { navigateTo } = useNavigation();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: <Home size={24} />
    },
    {
      path: '/roster',
      label: 'Build Team',
      icon: <List size={24} />
    },
    {
      path: '/leaderboard',
      label: 'Standings',
      icon: <TrendingUp size={24} />
    },
    {
      path: '/prizes',
      label: 'Prizes',
      icon: <Award size={24} />
    },
    {
      path: '/account',
      label: 'Account',
      icon: <User size={24} />
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-stone-900 to-gray-900 border-t border-stone-700 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigateTo(item.path, item.label)}
            className={`flex flex-col items-center justify-center h-full w-full min-w-[48px] py-1 px-2 
              ${isActive(item.path) 
                ? 'text-red-500 border-t-2 border-red-500 -mt-[2px] bg-stone-800/50' 
                : 'text-stone-400 hover:text-white'
              } transition-colors`}
            aria-label={item.label}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation; 