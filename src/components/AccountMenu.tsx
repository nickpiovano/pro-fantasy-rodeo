import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/hooks/useNavigation';
import { Button } from '@/components/ui/button-new';
import { Star, Shield, Settings } from 'lucide-react';

interface AccountMenuProps {
  className?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ className = '' }) => {
  const { navigateTo } = useNavigation();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      path: '/my-teams',
      label: 'My Teams',
      icon: <Star className="h-4 w-4" />
    },
    {
      path: '/privacy-security',
      label: 'Privacy & Security',
      icon: <Shield className="h-4 w-4" />
    },
    {
      path: '/account-settings',
      label: 'Account Settings',
      icon: <Settings className="h-4 w-4" />
    }
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <div className={`flex flex-wrap sm:flex-nowrap gap-2 justify-center sm:justify-end w-full sm:w-auto ${className}`}>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={isActive(item.path) ? "primary" : "outline"}
          size="sm"
          className={`${
            isActive(item.path)
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => navigateTo(item.path, item.label)}
          leftIcon={item.icon}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default AccountMenu; 