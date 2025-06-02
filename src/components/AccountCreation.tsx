
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import type { User } from '@/pages/Index';

interface AccountCreationProps {
  onAccountCreated: (user: User) => void;
}

const AccountCreation = ({ onAccountCreated }: AccountCreationProps) => {
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; teamName?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; teamName?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!teamName) {
      newErrors.teamName = 'Team name is required';
    } else if (teamName.length < 2) {
      newErrors.teamName = 'Team name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAccountCreated({ email, teamName });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full animate-slide-up">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-white/70">
              Join the Christmas in July rodeo contest
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`modern-input h-12 text-lg ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm font-medium">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-white font-medium">
                Team Name
              </Label>
              <Input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className={`modern-input h-12 text-lg ${errors.teamName ? 'border-red-500/50 focus:ring-red-500/50' : ''}`}
                placeholder="Buckin' Broncos"
                maxLength={30}
              />
              {errors.teamName && (
                <p className="text-red-400 text-sm font-medium">{errors.teamName}</p>
              )}
              <p className="text-white/50 text-sm">
                {teamName.length}/30 characters
              </p>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-lg py-6 group"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  Continue to Team Builder
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
