// Store configuration for Zustand (optional state management)
// This is ready for future global state management needs

import { create } from 'zustand';
import { User, Theme } from '@types/index';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface UIStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

interface AppStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Auth store
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

// UI store
export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
}));

// App store
export const useAppStore = create<AppStore>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
