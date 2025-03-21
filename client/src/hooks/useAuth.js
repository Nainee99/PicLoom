import { useCallback } from 'react';
import { useAuthStore } from '../stores/auth/authStore';
import { authService } from '../services/api/authService';

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, clearUser, updateToken } = useAuthStore();

  const login = useCallback(async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  }, [setUser]);

  const register = useCallback(async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      clearUser();
    } catch (error) {
      throw error;
    }
  }, [clearUser]);

  const refreshUserToken = useCallback(async () => {
    try {
      const response = await authService.refreshToken();
      updateToken(response.data.token);
      return response;
    } catch (error) {
      throw error;
    }
  }, [updateToken]);

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUserToken
  };
};