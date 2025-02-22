import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  pin: string;
  unlockedApps: Set<string>;
  checkPin: (pin: string) => boolean;
  authenticate: () => void;
  logout: () => void;
  unlockApp: (appName: string) => void;
  isAppUnlocked: (appName: string) => boolean;
  areAllAppsUnlocked: () => boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  pin: '0000',
  unlockedApps: new Set(),

  checkPin: (enteredPin: string) => {
    return enteredPin === get().pin;
  },

  authenticate: () => {
    set({ isAuthenticated: true });
  },

  logout: () => {
    set({ isAuthenticated: false, unlockedApps: new Set() });
  },

  unlockApp: (appName: string) => {
    const unlockedApps = new Set(get().unlockedApps);
    unlockedApps.add(appName);
    set({ unlockedApps });
  },

  isAppUnlocked: (appName: string) => {
    return get().unlockedApps.has(appName);
  },

  areAllAppsUnlocked: () => {
    const apps = ['reasons', 'photos', 'mail'];
    return apps.every(app => get().unlockedApps.has(app));
  }
}));
