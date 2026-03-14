import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, BookOpen, Users, ChevronDown } from 'lucide-react';
import { mockCourses, LANGUAGE_NAMES } from '../services/mockData';
import type { Language, Level } from '../types';

const languages: { code: Language; flag: string }[] = [
  { code: 'english', flag: '🇬🇧' },
  { code: 'japanese', flag: '🇯🇵' },
  { code: 'korean', flag: '🇰🇷' },
  { code: 'chinese', flag: '🇨🇳' },
  { code: 'spanish', flag: '🇪🇸' },
  { code: 'french', flag: '🇫🇷' },
  { code: 'german', flag: '🇩🇪' },
];

const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredCourses = useMemo(() => {
    let courses = [...mockCourses];

    if (selectedLanguage !== 'all') {
      courses = courses.filter(c => c.language === selectedLanguage);
    }

    if (selectedLevel !== 'all') {
      courses = courses.filter(c => c.level === selectedLevel);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      courses = courses.filter(
        c => c.title.toLowerCase().includes(query) || 
             c.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'popular':
        courses.sort((a, b) => b.enrolledCount - a.enrolledCount);
        break;
      case 'rating':
        courses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        courses.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return courses;
  }, [searchQuery, selectedLanguage, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">
              <span className="text-gradient">Explore Courses</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover courses tailored to your level and interests. Start learning today!
            </p>
          </div>

          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as Language | 'all')}
                    className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="all">All Languages</option>
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {LANGUAGE_NAMES[lang.code].en}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value as Level | 'all')}
                    className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="all">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
                    className="appearance-none pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Languages
            </button>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedLanguage === lang.code
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                {LANGUAGE_NAMES[lang.code].en}
              </button>
            ))}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <Link to={`/courses/${course.language}/${course.id}`}>
                    <div className="glass rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white">
                            {course.level}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          {course.rating}
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="text-2xl">
                            {course.language === 'english' ? '🇬🇧' : 
                             course.language === 'japanese' ? '🇯🇵' : 
                             course.language === 'korean' ? '🇰🇷' :
                             course.language === 'chinese' ? '🇨🇳' :
                             course.language === 'spanish' ? '🇪🇸' :
                             course.language === 'french' ? '🇫🇷' : '🇩🇪'}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <BookOpen className="w-4 h-4" />
                            {course.totalLessons} lessons
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Users className="w-4 h-4" />
                            {(course.enrolledCount / 1000).toFixed(1)}k students
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
