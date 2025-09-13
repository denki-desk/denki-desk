import { User } from '../types';
import { createContext, ReactNode, useContext } from 'react';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from './api-client';
import { Loader2 } from 'lucide-react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  login: UseMutationResult<User, unknown, { email: string; password: string }>;
  logout: UseMutationResult<void, unknown, void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const userQuery = useQuery<{ data: User }>({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const res = await api.get('auth/me', { withCredentials: true });
      return res.data;
    },
  });

  const login = useMutation<
    User,
    unknown,
    { email: string; password: string; redirectTo?: string }
  >({
    mutationFn: async ({ email, password }) => {
      const res = await api.post('/auth/login', { email, password });
      return res.data.user;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['auth-user'],
      });
    },
    onError: async (error) => {
      // Todo: create a separate ticket to handle error management
      if (error instanceof AxiosError) {
        const errMsg = error.response?.data.message || error.message;
        toast.error(errMsg);
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['auth-user'],
      });
    },
  });

  const user = userQuery.data?.data || null;
  const isAuthenticated = !!user;

  if (userQuery.isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
