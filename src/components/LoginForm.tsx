import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/services/auth';
import { isValidEmail } from '@/utils/validators';
import type { User } from '@/pages/Index';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }: LoginFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Call the authentication service to login the user
      const result = await authService.login(email);
      
      if (result.success) {
        onLoginSuccess(result.user);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${result.user.email}`,
        });
      } else {
        setError(result.message || 'Login failed. Please try again.');
        toast({
          title: "Login failed",
          description: result.message || "No account found with this email. Please register.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-white/70">
          Sign in to continue your rodeo fantasy journey
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
            className={`modern-input h-12 text-lg ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}`}
            placeholder="your.email@example.com"
          />
          {error && (
            <p className="text-red-400 text-sm font-medium">{error}</p>
          )}
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full text-lg py-6 group"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Logging In...
            </div>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className="text-amber-300 hover:text-amber-200 underline"
          >
            Create one now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 