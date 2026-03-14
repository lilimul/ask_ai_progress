import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../types';

interface SettingsState {
  theme: 'light' | 'dark';
  interfaceLanguage: 'en' | 'zh' | 'ja' | 'ko';
  selectedLearningLanguage: Language;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  
  setTheme: (theme: 'light' | 'dark') => void;
  setInterfaceLanguage: (lang: 'en' | 'zh' | 'ja' | 'ko') => void;
  setSelectedLearningLanguage: (lang: Language) => void;
  toggleSound: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      interfaceLanguage: 'en',
      selectedLearningLanguage: 'english',
      soundEnabled: true,
      notificationsEnabled: true,

      setTheme: (theme) => set({ theme }),
      setInterfaceLanguage: (interfaceLanguage) => set({ interfaceLanguage }),
      setSelectedLearningLanguage: (selectedLearningLanguage) => set({ selectedLearningLanguage }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
    }),
    {
      name: 'linguaflow_settings',
    }
  )
);
