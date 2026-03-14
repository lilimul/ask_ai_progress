import type { Course, Lesson, ModuleContent, Achievement, Activity, CommunityUser } from '../types';
export { LANGUAGE_NAMES, LEVEL_NAMES } from '../types';

export const mockCourses: Course[] = [
  {
    id: 'en-a1-01',
    language: 'english',
    title: 'English for Beginners',
    titleNative: 'English for Beginners',
    description: 'Start your English journey with essential vocabulary and basic grammar. Perfect for absolute beginners.',
    level: 'A1',
    thumbnail: 'https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=400&h=300&fit=crop',
    totalLessons: 12,
    duration: 360,
    rating: 4.8,
    enrolledCount: 15420,
    lessons: [],
  },
  {
    id: 'en-a2-01',
    language: 'english',
    title: 'Everyday English',
    titleNative: 'Everyday English',
    description: 'Build confidence in daily conversations with practical phrases and intermediate grammar.',
    level: 'A2',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    totalLessons: 15,
    duration: 450,
    rating: 4.7,
    enrolledCount: 12350,
    lessons: [],
  },
  {
    id: 'en-b1-01',
    language: 'english',
    title: 'Business English Essentials',
    titleNative: 'Business English Essentials',
    description: 'Master professional communication for the workplace with business vocabulary and formal expressions.',
    level: 'B1',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    totalLessons: 18,
    duration: 540,
    rating: 4.9,
    enrolledCount: 8920,
    lessons: [],
  },
  {
    id: 'jp-a1-01',
    language: 'japanese',
    title: 'Japanese Foundations',
    titleNative: '日本語の基礎',
    description: 'Learn hiragana, katakana, and basic greetings. Your first step into the Japanese language.',
    level: 'A1',
    thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop',
    totalLessons: 10,
    duration: 300,
    rating: 4.9,
    enrolledCount: 18230,
    lessons: [],
  },
  {
    id: 'jp-a2-01',
    language: 'japanese',
    title: 'Conversational Japanese',
    titleNative: '日常会話日本語',
    description: 'Build conversational skills with everyday topics and essential kanji.',
    level: 'A2',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
    totalLessons: 14,
    duration: 420,
    rating: 4.8,
    enrolledCount: 11540,
    lessons: [],
  },
  {
    id: 'jp-b1-01',
    language: 'japanese',
    title: 'Japanese for Travel',
    titleNative: '旅行のための日本語',
    description: 'Navigate Japan with confidence. Learn travel-specific vocabulary and cultural tips.',
    level: 'B1',
    thumbnail: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop',
    totalLessons: 16,
    duration: 480,
    rating: 4.7,
    enrolledCount: 7890,
    lessons: [],
  },
  {
    id: 'kr-a1-01',
    language: 'korean',
    title: 'Korean Basics',
    titleNative: '한국어 기초',
    description: 'Master Hangul and basic Korean expressions. Start your K-culture journey here.',
    level: 'A1',
    thumbnail: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop',
    totalLessons: 10,
    duration: 300,
    rating: 4.9,
    enrolledCount: 21650,
    lessons: [],
  },
  {
    id: 'kr-a2-01',
    language: 'korean',
    title: 'Korean Daily Life',
    titleNative: '일상 한국어',
    description: 'Express yourself in daily situations with practical vocabulary and grammar patterns.',
    level: 'A2',
    thumbnail: 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=400&h=300&fit=crop',
    totalLessons: 14,
    duration: 420,
    rating: 4.8,
    enrolledCount: 14320,
    lessons: [],
  },
  {
    id: 'kr-b1-01',
    language: 'korean',
    title: 'K-Pop Korean',
    titleNative: 'K-POP 한국어',
    description: 'Understand your favorite K-pop songs and variety shows with this fun course.',
    level: 'B1',
    thumbnail: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400&h=300&fit=crop',
    totalLessons: 12,
    duration: 360,
    rating: 4.9,
    enrolledCount: 19870,
    lessons: [],
  },
  {
    id: 'es-a1-01',
    language: 'spanish',
    title: 'Spanish Starter',
    titleNative: 'Español Inicial',
    description: 'Begin your Spanish adventure with essential vocabulary and basic conversations.',
    level: 'A1',
    thumbnail: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop',
    totalLessons: 12,
    duration: 360,
    rating: 4.7,
    enrolledCount: 9870,
    lessons: [],
  },
  {
    id: 'fr-a1-01',
    language: 'french',
    title: 'French Foundations',
    titleNative: 'Français Fondamental',
    description: 'Learn the language of love with essential French vocabulary and pronunciation.',
    level: 'A1',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    totalLessons: 12,
    duration: 360,
    rating: 4.8,
    enrolledCount: 7650,
    lessons: [],
  },
  {
    id: 'de-a1-01',
    language: 'german',
    title: 'German Basics',
    titleNative: 'Deutsch Grundlagen',
    description: 'Start speaking German with confidence. Learn essential vocabulary and grammar structures.',
    level: 'A1',
    thumbnail: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
    totalLessons: 12,
    duration: 360,
    rating: 4.6,
    enrolledCount: 5430,
    lessons: [],
  },
];

export const mockLessons: Record<string, Lesson[]> = {
  'en-a1-01': [
    {
      id: 'en-a1-01-l1',
      courseId: 'en-a1-01',
      title: 'Greetings and Introductions',
      description: 'Learn how to greet people and introduce yourself in English.',
      order: 1,
      duration: 30,
      modules: [
        { id: 'en-a1-01-l1-m1', lessonId: 'en-a1-01-l1', type: 'vocabulary', title: 'Basic Greetings' },
        { id: 'en-a1-01-l1-m2', lessonId: 'en-a1-01-l1', type: 'grammar', title: 'Subject Pronouns' },
        { id: 'en-a1-01-l1-m3', lessonId: 'en-a1-01-l1', type: 'speaking', title: 'Introduce Yourself' },
        { id: 'en-a1-01-l1-m4', lessonId: 'en-a1-01-l1', type: 'listening', title: 'Greeting Dialogues' },
      ],
    },
    {
      id: 'en-a1-01-l2',
      courseId: 'en-a1-01',
      title: 'Numbers and Time',
      description: 'Master numbers, telling time, and basic counting.',
      order: 2,
      duration: 30,
      modules: [
        { id: 'en-a1-01-l2-m1', lessonId: 'en-a1-01-l2', type: 'vocabulary', title: 'Numbers 1-100' },
        { id: 'en-a1-01-l2-m2', lessonId: 'en-a1-01-l2', type: 'grammar', title: 'Plural Forms' },
        { id: 'en-a1-01-l2-m3', lessonId: 'en-a1-01-l2', type: 'listening', title: 'Time Expressions' },
      ],
    },
    {
      id: 'en-a1-01-l3',
      courseId: 'en-a1-01',
      title: 'Family and Friends',
      description: 'Talk about your family members and relationships.',
      order: 3,
      duration: 30,
      modules: [
        { id: 'en-a1-01-l3-m1', lessonId: 'en-a1-01-l3', type: 'vocabulary', title: 'Family Members' },
        { id: 'en-a1-01-l3-m2', lessonId: 'en-a1-01-l3', type: 'grammar', title: 'Possessive Adjectives' },
        { id: 'en-a1-01-l3-m3', lessonId: 'en-a1-01-l3', type: 'speaking', title: 'Describe Your Family' },
      ],
    },
  ],
  'jp-a1-01': [
    {
      id: 'jp-a1-01-l1',
      courseId: 'jp-a1-01',
      title: 'Hiragana Basics',
      description: 'Learn the first 46 hiragana characters.',
      order: 1,
      duration: 30,
      modules: [
        { id: 'jp-a1-01-l1-m1', lessonId: 'jp-a1-01-l1', type: 'vocabulary', title: 'Hiragana A-Ko' },
        { id: 'jp-a1-01-l1-m2', lessonId: 'jp-a1-01-l1', type: 'grammar', title: 'Writing Practice' },
        { id: 'jp-a1-01-l1-m3', lessonId: 'jp-a1-01-l1', type: 'listening', title: 'Hiragana Sounds' },
      ],
    },
    {
      id: 'jp-a1-01-l2',
      courseId: 'jp-a1-01',
      title: 'Basic Greetings',
      description: 'Essential Japanese greetings for daily use.',
      order: 2,
      duration: 30,
      modules: [
        { id: 'jp-a1-01-l2-m1', lessonId: 'jp-a1-01-l2', type: 'vocabulary', title: 'Common Greetings' },
        { id: 'jp-a1-01-l2-m2', lessonId: 'jp-a1-01-l2', type: 'speaking', title: 'Practice Greetings' },
        { id: 'jp-a1-01-l2-m3', lessonId: 'jp-a1-01-l2', type: 'listening', title: 'Greeting Dialogues' },
      ],
    },
  ],
  'kr-a1-01': [
    {
      id: 'kr-a1-01-l1',
      courseId: 'kr-a1-01',
      title: 'Hangul Introduction',
      description: 'Learn the Korean alphabet Hangul.',
      order: 1,
      duration: 30,
      modules: [
        { id: 'kr-a1-01-l1-m1', lessonId: 'kr-a1-01-l1', type: 'vocabulary', title: 'Consonants' },
        { id: 'kr-a1-01-l1-m2', lessonId: 'kr-a1-01-l1', type: 'vocabulary', title: 'Vowels' },
        { id: 'kr-a1-01-l1-m3', lessonId: 'kr-a1-01-l1', type: 'listening', title: 'Hangul Sounds' },
      ],
    },
    {
      id: 'kr-a1-01-l2',
      courseId: 'kr-a1-01',
      title: 'Basic Expressions',
      description: 'Essential Korean phrases for beginners.',
      order: 2,
      duration: 30,
      modules: [
        { id: 'kr-a1-01-l2-m1', lessonId: 'kr-a1-01-l2', type: 'vocabulary', title: 'Greetings' },
        { id: 'kr-a1-01-l2-m2', lessonId: 'kr-a1-01-l2', type: 'speaking', title: 'Practice Phrases' },
        { id: 'kr-a1-01-l2-m3', lessonId: 'kr-a1-01-l2', type: 'listening', title: 'Basic Dialogues' },
      ],
    },
  ],
};

export const mockModuleContent: Record<string, ModuleContent> = {
  'en-a1-01-l1-m1': {
    vocabulary: {
      words: [
        { id: 'w1', word: 'Hello', pronunciation: '/həˈloʊ/', meaning: 'A greeting used when meeting someone', example: 'Hello, nice to meet you!' },
        { id: 'w2', word: 'Goodbye', pronunciation: '/ɡʊdˈbaɪ/', meaning: 'A word used when leaving someone', example: 'Goodbye, see you tomorrow!' },
        { id: 'w3', word: 'Good morning', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/', meaning: 'A greeting used in the morning', example: 'Good morning! How are you?' },
        { id: 'w4', word: 'Good evening', pronunciation: '/ɡʊd ˈiːvnɪŋ/', meaning: 'A greeting used in the evening', example: 'Good evening, everyone.' },
        { id: 'w5', word: 'Nice to meet you', pronunciation: '/naɪs tuː miːt juː/', meaning: 'A phrase used when meeting someone for the first time', example: 'Hello, nice to meet you!' },
        { id: 'w6', word: 'How are you?', pronunciation: '/haʊ ɑːr juː/', meaning: 'A question asking about someone\'s well-being', example: 'Hi John, how are you?' },
        { id: 'w7', word: 'I\'m fine', pronunciation: '/aɪm faɪn/', meaning: 'A response indicating you are well', example: 'I\'m fine, thank you.' },
        { id: 'w8', word: 'Thank you', pronunciation: '/θæŋk juː/', meaning: 'An expression of gratitude', example: 'Thank you for your help!' },
      ],
    },
  },
  'en-a1-01-l1-m2': {
    grammar: {
      rules: [
        {
          id: 'g1',
          title: 'Subject Pronouns',
          explanation: 'Subject pronouns are used as the subject of a sentence. They indicate who is performing the action.',
          examples: ['I am a student.', 'You are my friend.', 'He is from Japan.', 'She speaks English.', 'We are happy.', 'They are teachers.'],
        },
        {
          id: 'g2',
          title: 'Verb "to be"',
          explanation: 'The verb "to be" changes form based on the subject: am (I), is (he/she/it), are (you/we/they).',
          examples: ['I am happy.', 'She is a doctor.', 'We are students.', 'They are from Korea.'],
        },
      ],
      exercises: [
        { id: 'e1', type: 'fill-blank', question: '___ am a student.', answer: 'I', explanation: '"I" is the subject pronoun for the speaker.' },
        { id: 'e2', type: 'fill-blank', question: 'She ___ a teacher.', answer: 'is', explanation: 'Use "is" with he/she/it.' },
        { id: 'e3', type: 'choice', question: '___ are my friends.', options: ['They', 'He', 'She', 'It'], answer: 'They', explanation: '"They" is used for plural people.' },
        { id: 'e4', type: 'choice', question: 'We ___ from Japan.', options: ['am', 'is', 'are', 'be'], answer: 'are', explanation: 'Use "are" with we/you/they.' },
      ],
    },
  },
  'en-a1-01-l1-m3': {
    speaking: {
      phrases: [
        { id: 's1', text: 'Hello, my name is John.', translation: '你好，我叫约翰。', difficulty: 1 },
        { id: 's2', text: 'Nice to meet you.', translation: '很高兴认识你。', difficulty: 1 },
        { id: 's3', text: 'I am from the United States.', translation: '我来自美国。', difficulty: 2 },
        { id: 's4', text: 'How are you today?', translation: '你今天好吗？', difficulty: 1 },
        { id: 's5', text: 'I am fine, thank you.', translation: '我很好，谢谢。', difficulty: 1 },
      ],
    },
  },
  'en-a1-01-l1-m4': {
    listening: {
      transcript: 'A: Hello, my name is Sarah. Nice to meet you.\nB: Hi Sarah, I\'m Tom. Nice to meet you too.\nA: Where are you from, Tom?\nB: I\'m from Canada. How about you?\nA: I\'m from Australia. I\'m here to study English.\nB: That\'s great! Welcome to our class!',
      questions: [
        { id: 'lq1', type: 'choice', question: 'What is the woman\'s name?', options: ['Sarah', 'Tom', 'Canada', 'Australia'], answer: 'Sarah' },
        { id: 'lq2', type: 'choice', question: 'Where is Tom from?', options: ['Australia', 'Canada', 'United States', 'England'], answer: 'Canada' },
        { id: 'lq3', type: 'choice', question: 'Why is Sarah here?', options: ['To work', 'To study English', 'To travel', 'To visit friends'], answer: 'To study English' },
      ],
    },
  },
  'jp-a1-01-l1-m1': {
    vocabulary: {
      words: [
        { id: 'jw1', word: 'あ', pronunciation: 'a', meaning: 'The first hiragana character', example: 'あさ (asa) - morning' },
        { id: 'jw2', word: 'い', pronunciation: 'i', meaning: 'The second hiragana character', example: 'いぬ (inu) - dog' },
        { id: 'jw3', word: 'う', pronunciation: 'u', meaning: 'The third hiragana character', example: 'うみ (umi) - sea' },
        { id: 'jw4', word: 'え', pronunciation: 'e', meaning: 'The fourth hiragana character', example: 'えき (eki) - station' },
        { id: 'jw5', word: 'お', pronunciation: 'o', meaning: 'The fifth hiragana character', example: 'おちゃ (ocha) - tea' },
        { id: 'jw6', word: 'か', pronunciation: 'ka', meaning: 'Hiragana "ka"', example: 'かさ (kasa) - umbrella' },
        { id: 'jw7', word: 'き', pronunciation: 'ki', meaning: 'Hiragana "ki"', example: 'き (ki) - tree' },
        { id: 'jw8', word: 'く', pronunciation: 'ku', meaning: 'Hiragana "ku"', example: 'くち (kuchi) - mouth' },
      ],
    },
  },
  'jp-a1-01-l2-m1': {
    vocabulary: {
      words: [
        { id: 'jg1', word: 'こんにちは', pronunciation: 'konnichiwa', meaning: 'Hello (daytime)', example: 'こんにちは、お元気ですか？' },
        { id: 'jg2', word: 'おはようございます', pronunciation: 'ohayou gozaimasu', meaning: 'Good morning (polite)', example: 'おはようございます、先生。' },
        { id: 'jg3', word: 'こんばんは', pronunciation: 'konbanwa', meaning: 'Good evening', example: 'こんばんは、今日はどうでしたか？' },
        { id: 'jg4', word: 'さようなら', pronunciation: 'sayounara', meaning: 'Goodbye', example: 'さようなら、また明日。' },
        { id: 'jg5', word: 'ありがとう', pronunciation: 'arigatou', meaning: 'Thank you', example: 'ありがとう、助かりました。' },
        { id: 'jg6', word: 'すみません', pronunciation: 'sumimasen', meaning: 'Excuse me / I\'m sorry', example: 'すみません、道を教えてください。' },
      ],
    },
  },
  'kr-a1-01-l1-m1': {
    vocabulary: {
      words: [
        { id: 'kw1', word: 'ㄱ', pronunciation: 'g/k', meaning: 'The first consonant, sounds like g or k', example: '가 (ga) - go' },
        { id: 'kw2', word: 'ㄴ', pronunciation: 'n', meaning: 'The second consonant, sounds like n', example: '나 (na) - me/I' },
        { id: 'kw3', word: 'ㄷ', pronunciation: 'd/t', meaning: 'The third consonant, sounds like d or t', example: '다 (da) - all' },
        { id: 'kw4', word: 'ㅏ', pronunciation: 'a', meaning: 'The first vowel, sounds like a in father', example: '아 (a) - ah!' },
        { id: 'kw5', word: 'ㅑ', pronunciation: 'ya', meaning: 'The second vowel, sounds like ya', example: '야 (ya) - hey!' },
        { id: 'kw6', word: 'ㅓ', pronunciation: 'eo', meaning: 'A vowel, sounds like u in but', example: '어 (eo) - language' },
      ],
    },
  },
  'kr-a1-01-l2-m1': {
    vocabulary: {
      words: [
        { id: 'kg1', word: '안녕하세요', pronunciation: 'annyeonghaseyo', meaning: 'Hello (polite)', example: '안녕하세요, 만나서 반갑습니다.' },
        { id: 'kg2', word: '감사합니다', pronunciation: 'gamsahamnida', meaning: 'Thank you (polite)', example: '감사합니다, 도와주셔서.' },
        { id: 'kg3', word: '미안합니다', pronunciation: 'mianhamnida', meaning: 'I\'m sorry (polite)', example: '미안합니다, 늦어서.' },
        { id: 'kg4', word: '안녕히 가세요', pronunciation: 'annyeonghi gaseyo', meaning: 'Goodbye (to someone leaving)', example: '안녕히 가세요, 내일 봐요!' },
        { id: 'kg5', word: '네', pronunciation: 'ne', meaning: 'Yes', example: '네, 알겠습니다.' },
        { id: 'kg6', word: '아니요', pronunciation: 'aniyo', meaning: 'No', example: '아니요, 괜찮아요.' },
      ],
    },
  },
};

export const mockAchievements: Achievement[] = [
  { id: 'ach-1', type: 'streak', name: 'First Steps', description: 'Study for 3 days in a row', icon: 'flame', requirement: 3, unlocked: false, progress: 0 },
  { id: 'ach-2', type: 'streak', name: 'On Fire', description: 'Maintain a 7-day streak', icon: 'flame', requirement: 7, unlocked: false, progress: 0 },
  { id: 'ach-3', type: 'streak', name: 'Unstoppable', description: 'Maintain a 30-day streak', icon: 'flame', requirement: 30, unlocked: false, progress: 0 },
  { id: 'ach-4', type: 'words', name: 'Word Collector', description: 'Learn 100 words', icon: 'book', requirement: 100, unlocked: false, progress: 0 },
  { id: 'ach-5', type: 'words', name: 'Vocabulary Master', description: 'Learn 500 words', icon: 'book', requirement: 500, unlocked: false, progress: 0 },
  { id: 'ach-6', type: 'words', name: 'Dictionary', description: 'Learn 1000 words', icon: 'book', requirement: 1000, unlocked: false, progress: 0 },
  { id: 'ach-7', type: 'courses', name: 'First Course', description: 'Complete your first course', icon: 'trophy', requirement: 1, unlocked: false, progress: 0 },
  { id: 'ach-8', type: 'courses', name: 'Polyglot', description: 'Complete 5 courses', icon: 'trophy', requirement: 5, unlocked: false, progress: 0 },
  { id: 'ach-9', type: 'time', name: 'Dedicated Learner', description: 'Study for 10 hours total', icon: 'clock', requirement: 600, unlocked: false, progress: 0 },
  { id: 'ach-10', type: 'time', name: 'Study Champion', description: 'Study for 50 hours total', icon: 'clock', requirement: 3000, unlocked: false, progress: 0 },
  { id: 'ach-11', type: 'special', name: 'Perfect Score', description: 'Get 100% on any exercise', icon: 'star', requirement: 1, unlocked: false, progress: 0 },
  { id: 'ach-12', type: 'special', name: 'Night Owl', description: 'Study after midnight', icon: 'moon', requirement: 1, unlocked: false, progress: 0 },
];

export const mockCommunityUsers: CommunityUser[] = [
  { id: 'u1', username: 'LanguageMaster', avatar: undefined, xp: 15420, streak: 156, level: 42 },
  { id: 'u2', username: 'PolyglotPro', avatar: undefined, xp: 12890, streak: 89, level: 38 },
  { id: 'u3', username: 'StudyChamp', avatar: undefined, xp: 11250, streak: 234, level: 35 },
  { id: 'u4', username: 'WordNinja', avatar: undefined, xp: 9870, streak: 45, level: 32 },
  { id: 'u5', username: 'GrammarGuru', avatar: undefined, xp: 8540, streak: 67, level: 29 },
  { id: 'u6', username: 'KoreanFan', avatar: undefined, xp: 7230, streak: 123, level: 26 },
  { id: 'u7', username: 'JapanLover', avatar: undefined, xp: 6540, streak: 34, level: 24 },
  { id: 'u8', username: 'EnglishPro', avatar: undefined, xp: 5890, streak: 78, level: 22 },
  { id: 'u9', username: 'NewLearner', avatar: undefined, xp: 4320, streak: 12, level: 18 },
  { id: 'u10', username: 'LanguageLover', avatar: undefined, xp: 3650, streak: 56, level: 15 },
];

export const mockActivities: Activity[] = [
  { id: 'act1', userId: 'u1', username: 'LanguageMaster', type: 'achievement_unlocked', content: 'Unlocked "Unstoppable" achievement for 30-day streak!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), likes: 42 },
  { id: 'act2', userId: 'u2', username: 'PolyglotPro', type: 'course_completed', content: 'Completed "Japanese for Travel" course!', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), likes: 28 },
  { id: 'act3', userId: 'u3', username: 'StudyChamp', type: 'streak_milestone', content: 'Reached 200-day streak! 🔥', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), likes: 156 },
  { id: 'act4', userId: 'u4', username: 'WordNinja', type: 'words_learned', content: 'Learned 500th Korean word!', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), likes: 34 },
  { id: 'act5', userId: 'u5', username: 'GrammarGuru', type: 'course_completed', content: 'Completed "Business English Essentials"!', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), likes: 19 },
];

export function getCourseById(id: string): Course | undefined {
  const course = mockCourses.find(c => c.id === id);
  if (course) {
    const lessons = mockLessons[id] || [];
    return { ...course, lessons };
  }
  return undefined;
}

export function getCoursesByLanguage(language: string): Course[] {
  return mockCourses.filter(c => c.language === language);
}

export function getLessonById(courseId: string, lessonId: string): Lesson | undefined {
  const lessons = mockLessons[courseId] || [];
  return lessons.find(l => l.id === lessonId);
}

export function getModuleContent(moduleId: string): ModuleContent | undefined {
  return mockModuleContent[moduleId];
}
