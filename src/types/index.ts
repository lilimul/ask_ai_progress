export type Language = 'english' | 'japanese' | 'korean' | 'chinese' | 'spanish' | 'french' | 'german';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type ModuleType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  nativeLanguage: Language;
  learningLanguages: Language[];
  level: Record<string, number>;
  xp: number;
  streak: number;
  createdAt: string;
}

export interface Course {
  id: string;
  language: Language;
  title: string;
  titleNative: string;
  description: string;
  level: Level;
  thumbnail: string;
  totalLessons: number;
  duration: number;
  rating: number;
  enrolledCount: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  modules: LearningModule[];
  duration: number;
}

export interface LearningModule {
  id: string;
  lessonId: string;
  type: ModuleType;
  title: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  audio?: string;
}

export interface VocabularyContent {
  words: VocabularyWord[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
}

export interface GrammarExercise {
  id: string;
  type: 'fill-blank' | 'choice' | 'correction';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface GrammarContent {
  rules: GrammarRule[];
  exercises: GrammarExercise[];
}

export interface SpeakingPhrase {
  id: string;
  text: string;
  translation: string;
  audio?: string;
  difficulty: number;
}

export interface SpeakingContent {
  phrases: SpeakingPhrase[];
}

export interface ListeningQuestion {
  id: string;
  type: 'choice' | 'fill-blank';
  question: string;
  options?: string[];
  answer: string;
}

export interface ListeningContent {
  audioUrl?: string;
  transcript: string;
  questions: ListeningQuestion[];
}

export interface ModuleContent {
  vocabulary?: VocabularyContent;
  grammar?: GrammarContent;
  speaking?: SpeakingContent;
  listening?: ListeningContent;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  moduleId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  completedAt?: string;
}

export interface DailyStats {
  date: string;
  studyTime: number;
  wordsLearned: number;
  exercisesCompleted: number;
  accuracy: number;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  type: 'streak' | 'words' | 'courses' | 'time' | 'special';
  name: string;
  description: string;
  icon: string;
  requirement: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
}

export interface CommunityUser {
  id: string;
  username: string;
  avatar?: string;
  xp: number;
  streak: number;
  level: number;
}

export interface Activity {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  type: 'course_completed' | 'achievement_unlocked' | 'streak_milestone' | 'words_learned';
  content: string;
  timestamp: string;
  likes: number;
}

export const LANGUAGE_NAMES: Record<Language, { en: string; native: string }> = {
  english: { en: 'English', native: 'English' },
  japanese: { en: 'Japanese', native: '日本語' },
  korean: { en: 'Korean', native: '한국어' },
  chinese: { en: 'Chinese', native: '中文' },
  spanish: { en: 'Spanish', native: 'Español' },
  french: { en: 'French', native: 'Français' },
  german: { en: 'German', native: 'Deutsch' },
};

export const LEVEL_NAMES: Record<Level, { name: string; description: string }> = {
  A1: { name: 'Beginner', description: 'Basic words and phrases' },
  A2: { name: 'Elementary', description: 'Simple conversations' },
  B1: { name: 'Intermediate', description: 'Daily communication' },
  B2: { name: 'Upper-Intermediate', description: 'Complex topics' },
  C1: { name: 'Advanced', description: 'Fluent expression' },
  C2: { name: 'Proficiency', description: 'Near-native level' },
};
