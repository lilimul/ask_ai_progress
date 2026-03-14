import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Language } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateXP: (amount: number) => void;
  updateStreak: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storedUsers = localStorage.getItem('linguaflow_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const user = users.find((u: User & { password: string }) => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (username: string, email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storedUsers = localStorage.getItem('linguaflow_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        if (users.find((u: User) => u.email === email)) {
          return false;
        }

        const newUser: User = {
          id: generateId(),
          username,
          email,
          nativeLanguage: 'chinese' as Language,
          learningLanguages: ['english'] as Language[],
          level: { english: 1 },
          xp: 0,
          streak: 0,
          createdAt: new Date().toISOString(),
        };

        users.push({ ...newUser, password });
        localStorage.setItem('linguaflow_users', JSON.stringify(users));
        
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateXP: (amount: number) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, xp: user.xp + amount } });
        }
      },

      updateStreak: () => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, streak: user.streak + 1 } });
        }
      },
    }),
    {
      name: 'linguaflow_auth',
    }
  )
);
