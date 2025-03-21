import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (userData) => set({
        user: userData,
        token: userData?.token,
        isAuthenticated: !!userData
      }),
      clearUser: () => set({
        user: null,
        token: null,
        isAuthenticated: false
      }),
      updateToken: (newToken) => set({
        token: newToken
      })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);