import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  BookOpen, 
  Users, 
  Clock, 
  Play,
  Lock,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { getCourseById, LANGUAGE_NAMES, LEVEL_NAMES } from '../services/mockData';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated } = useAuthStore();
  const { getCourseProgress } = useProgressStore();
  
  const course = getCourseById(courseId || '');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const completedModules = getCourseProgress(course.id);
  const progressPercentage = (completedModules / (course.totalLessons * 4)) * 100;

  return (
    <div className="min-h-screen pb-12">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Link
            to="/courses"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">
                {course.language === 'english' ? '🇬🇧' : 
                 course.language === 'japanese' ? '🇯🇵' : 
                 course.language === 'korean' ? '🇰🇷' :
                 course.language === 'chinese' ? '🇨🇳' :
                 course.language === 'spanish' ? '🇪🇸' :
                 course.language === 'french' ? '🇫🇷' : '🇩🇪'}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary-500 text-white">
                {course.level} - {LEVEL_NAMES[course.level].name}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              {course.title}
            </h1>
            <p className="text-white/80 text-lg">{course.titleNative}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-gray-500">rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="font-semibold">{(course.enrolledCount / 1000).toFixed(1)}k</span>
                <span className="text-gray-500">students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="font-semibold">{course.totalLessons}</span>
                <span className="text-gray-500">lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="font-semibold">{course.duration}</span>
                <span className="text-gray-500">minutes</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {course.description}
            </p>

            {isAuthenticated && progressPercentage > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm text-primary-500">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {!isAuthenticated ? (
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Learning
              </Link>
            ) : course.lessons.length > 0 ? (
              <Link
                to={`/learn/${course.id}/${course.lessons[0].id}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
              </Link>
            ) : (
              <button className="btn-primary inline-flex items-center gap-2" disabled>
                <Lock className="w-5 h-5" />
                Coming Soon
              </button>
            )}
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-6">Course Content</h2>
            
            {course.lessons.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2">Content Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This course is being prepared. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="glass rounded-xl overflow-hidden">
                      <div className="p-4 md:p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-semibold shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                              {lesson.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {lesson.modules.map((module) => {
                                const icons: Record<string, string> = {
                                  vocabulary: '📚',
                                  grammar: '✏️',
                                  speaking: '🎤',
                                  listening: '🎧',
                                };
                                return (
                                  <span
                                    key={module.id}
                                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800"
                                  >
                                    {icons[module.type]} {module.title}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-sm text-gray-500">
                              {lesson.duration} min
                            </span>
                            {isAuthenticated ? (
                              <Link
                                to={`/learn/${course.id}/${lesson.id}`}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </Link>
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold mb-4">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Build a strong foundation in ' + LANGUAGE_NAMES[course.language].en,
                'Master essential vocabulary and phrases',
                'Understand basic grammar structures',
                'Practice pronunciation with native audio',
                'Develop listening comprehension skills',
                'Gain confidence in everyday conversations',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
