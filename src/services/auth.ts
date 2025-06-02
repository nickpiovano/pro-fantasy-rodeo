import { api } from './api';
import { User } from '@/pages/Index';

interface LoginResponse {
  user: User;
  success: boolean;
  message?: string;
}

interface RegisterResponse {
  user: User;
  success: boolean;
  message?: string;
}

/**
 * Authentication service for user management
 */
export const authService = {
  /**
   * Register a new user
   */
  async register(email: string, teamName: string): Promise<RegisterResponse> {
    try {
      // For MVP, we're simplifying by just returning a success without calling the API
      // In a production app, you would make an actual API call
      
      // Uncomment this for real API integration:
      // return await api.post<RegisterResponse>('/auth/register', { email, teamName });
      
      // Simplified response for MVP
      return {
        success: true,
        user: {
          email,
          teamName
        }
      };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.',
        user: { email: '', teamName: '' }
      };
    }
  },

  /**
   * Login a user
   */
  async login(email: string): Promise<LoginResponse> {
    try {
      // For MVP, we're simplifying by just returning a success without calling the API
      // In a production app, you would validate credentials with an API
      
      // Uncomment this for real API integration:
      // return await api.post<LoginResponse>('/auth/login', { email });
      
      // Get stored user from localStorage if available
      const storedUser = localStorage.getItem('fantasy_rodeo_user');
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        if (user.email === email) {
          return {
            success: true,
            user
          };
        }
      }
      
      // If no stored user or email doesn't match, return error
      return {
        success: false,
        message: 'User not found. Please register first.',
        user: { email: '', teamName: '' }
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.',
        user: { email: '', teamName: '' }
      };
    }
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<{ success: boolean }> {
    try {
      // For MVP, we're just clearing localStorage
      // In a production app, you would also call an API endpoint to invalidate sessions
      
      // Uncomment this for real API integration:
      // await api.post<{ success: boolean }>('/auth/logout', {});
      
      localStorage.removeItem('fantasy_rodeo_user');
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false };
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const storedUser = localStorage.getItem('fantasy_rodeo_user');
    return !!storedUser;
  }
}; 