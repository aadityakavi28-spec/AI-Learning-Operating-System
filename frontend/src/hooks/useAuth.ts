import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import type { 
  User, 
  AuthResponse, 
  LoginCredentials, 
  RegisterData,
  ApiResponse 
} from '@/types';

// Auth Hooks
export function useAuth() {
  const { data: session, status } = useSession();
  const { user, setUser, logout: storeLogout } = useAuthStore();
  const router = useRouter();

  const isAuthenticated = !!session?.user;
  const isLoading = status === 'loading';

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.login(credentials.email, credentials.password);
      if (response.success && response.data) {
        setUser(response.data.user);
        router.push('/dashboard');
        return response.data;
      }
      throw new Error(response.error || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [setUser, router]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await apiClient.register(data);
      if (response.success && response.data) {
        setUser(response.data.user);
        router.push('/dashboard');
        return response.data;
      }
      throw new Error(response.error || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, [setUser, router]);

  const logout = useCallback(async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      storeLogout();
      await signOut({ callbackUrl: '/' });
    }
  }, [storeLogout, router]);

  return {
    user: session?.user || user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
}

export function useProfile() {
  const { isAuthenticated } = useAuthStore();
  
  return useQuery<ApiResponse<User>>({
    queryKey: ['profile'],
    queryFn: () => apiClient.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Partial<{ name: string; avatar: string; bio: string }>) => {
      const response = await apiClient.updateProfile(data);
      return response;
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        setUser(data.data);
      }
    },
    onError: (error) => {
      console.error('Update profile error:', error);
    },
  });
}

