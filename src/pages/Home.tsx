import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  ChevronRight, 
  Flame, 
  Clock, 
  BookOpen, 
  Trophy,
  Star,
  Users
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { mockCourses, LANGUAGE_NAMES } from '../services/mockData';
import type { Language } from '../types';

const languages: { code: Language; flag: string }[] = [
  { code: 'english', flag: '🇬🇧' },
  { code: 'japanese', flag: '🇯🇵' },
  { code: 'korean', flag: '🇰🇷' },
  { code: 'chinese', flag: '🇨🇳' },
  { code: 'spanish', flag: '🇪🇸' },
  { code: 'french', flag: '🇫🇷' },
  { code: 'german', flag: '🇩🇪' },
];

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const { totalStudyTime, wordsLearned, achievements } = useProgressStore();

  const featuredCourses = mockCourses.slice(0, 4);
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Learn Languages</span>
              <br />
              <span className="text-gray-900 dark:text-white">The Smart Way</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Master English, Japanese, Korean, and more with interactive lessons, 
              personalized learning paths, and a supportive community.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {languages.map((lang) => (
                <motion.div
                  key={lang.code}
                  whileHover={{ scale: 1.05 }}
                  className="glass px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{LANGUAGE_NAMES[lang.code].en}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/courses" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  Continue Learning
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                    Start Free
                    <Play className="w-5 h-5" />
                  </Link>
                  <Link to="/courses" className="btn-secondary text-lg px-8 py-4">
                    Explore Courses
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {isAuthenticated && user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">Your Progress</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-100 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-accent-500" />
                </div>
                <p className="text-3xl font-bold text-gradient">{user.streak}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Day Streak</p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-3xl font-bold text-gradient">{Math.floor(totalStudyTime / 60)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hours Studied</p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-success-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-success-500" />
                </div>
                <p className="text-3xl font-bold text-gradient">{wordsLearned}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Words Learned</p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-gradient">{unlockedAchievements}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Achievements</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Featured Courses</h2>
            <Link to="/courses" className="text-primary-500 hover:text-primary-600 flex items-center gap-1 font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link to={`/courses/${course.language}/${course.id}`}>
                  <div className="glass rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white">
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">
                          {course.language === 'english' ? '🇬🇧' : 
                           course.language === 'japanese' ? '🇯🇵' : 
                           course.language === 'korean' ? '🇰🇷' :
                           course.language === 'chinese' ? '🇨🇳' :
                           course.language === 'spanish' ? '🇪🇸' :
                           course.language === 'french' ? '🇫🇷' : '🇩🇪'}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{course.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-gray-500">
                          <BookOpen className="w-4 h-4" />
                          {course.totalLessons} lessons
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Users className="w-4 h-4" />
                          {(course.enrolledCount / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold mb-6 text-center">Why LinguaFlow?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Engage with vocabulary, grammar, speaking, and listening exercises designed for effective learning.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor your learning journey with detailed statistics, achievements, and personalized recommendations.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-success flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with fellow learners, compete on leaderboards, and share your achievements.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {!isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-3xl p-8 lg:p-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join thousands of learners who are mastering new languages every day. 
              Start with a free account and unlock your potential.
            </p>
            <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              Create Free Account
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  );
}
