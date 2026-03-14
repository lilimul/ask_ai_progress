import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, DailyStats, Achievement } from '../types';
import { mockAchievements } from '../services/mockData';

interface ProgressState {
  progress: UserProgress[];
  dailyStats: DailyStats[];
  achievements: Achievement[];
  totalStudyTime: number;
  wordsLearned: number;
  
  addProgress: (progress: UserProgress) => void;
  updateProgress: (id: string, updates: Partial<UserProgress>) => void;
  addDailyStats: (stats: DailyStats) => void;
  updateAchievement: (id: string, progress: number) => void;
  unlockAchievement: (id: string) => void;
  incrementStudyTime: (minutes: number) => void;
  incrementWordsLearned: (count: number) => void;
  getCourseProgress: (courseId: string) => number;
  getLessonProgress: (lessonId: string) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: [],
      dailyStats: [],
      achievements: mockAchievements.map(a => ({ ...a, progress: 0, unlocked: false })),
      totalStudyTime: 0,
      wordsLearned: 0,

      addProgress: (newProgress) => {
        set((state) => ({
          progress: [...state.progress, newProgress],
        }));
      },

      updateProgress: (id, updates) => {
        set((state) => ({
          progress: state.progress.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      addDailyStats: (stats) => {
        set((state) => ({
          dailyStats: [...state.dailyStats, stats],
        }));
      },

      updateAchievement: (id, progress) => {
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, progress } : a
          ),
        }));
      },

      unlockAchievement: (id) => {
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
          ),
        }));
      },

      incrementStudyTime: (minutes) => {
        set((state) => ({
          totalStudyTime: state.totalStudyTime + minutes,
        }));
      },

      incrementWordsLearned: (count) => {
        set((state) => ({
          wordsLearned: state.wordsLearned + count,
        }));
      },

      getCourseProgress: (courseId) => {
        const { progress } = get();
        const courseProgress = progress.filter((p) => p.courseId === courseId && p.completed);
        return courseProgress.length;
      },

      getLessonProgress: (lessonId) => {
        const { progress } = get();
        const lessonProgress = progress.filter((p) => p.lessonId === lessonId && p.completed);
        return lessonProgress.length;
      },
    }),
    {
      name: 'linguaflow_progress',
    }
  )
);
