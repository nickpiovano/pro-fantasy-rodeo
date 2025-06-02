import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountCreation from './AccountCreation';
import LoginForm from './LoginForm';
import { User } from '@/pages/Index';

interface AuthenticationContainerProps {
  onAuthSuccess: (user: User) => void;
}

const AuthenticationContainer = ({ onAuthSuccess }: AuthenticationContainerProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');

  const handleSwitchToRegister = () => {
    setActiveTab('register');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full animate-slide-up">
        <Card className="glass-card overflow-hidden">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')}>
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger 
                  value="register" 
                  className="text-lg data-[state=active]:text-white data-[state=active]:bg-red-700"
                >
                  Sign Up
                </TabsTrigger>
                <TabsTrigger 
                  value="login"
                  className="text-lg data-[state=active]:text-white data-[state=active]:bg-red-700"
                >
                  Login
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="register" className="mt-0">
              <AccountCreation 
                onAccountCreated={onAuthSuccess} 
              />
            </TabsContent>
            
            <TabsContent value="login" className="mt-0">
              <LoginForm 
                onLoginSuccess={onAuthSuccess}
                onSwitchToRegister={handleSwitchToRegister}
              />
            </TabsContent>
          </Tabs>
        </Card>
        
        {activeTab === 'register' && (
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={handleSwitchToLogin}
                className="text-amber-300 hover:text-amber-200 underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationContainer; 