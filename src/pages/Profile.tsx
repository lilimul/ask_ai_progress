import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Clock, 
  BookOpen, 
  Trophy, 
  Target,
  TrendingUp,
  Calendar,
  Award,
  Lock,
  Settings
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { mockCourses } from '../services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const achievementIcons: Record<string, string> = {
  flame: '🔥',
  book: '📚',
  trophy: '🏆',
  clock: '⏰',
  star: '⭐',
  moon: '🌙',
};

export default function Profile() {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    totalStudyTime, 
    wordsLearned, 
    achievements
  } = useProgressStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to view your profile and learning progress.
          </p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const weeklyData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 25 },
    { day: 'Fri', minutes: 55 },
    { day: 'Sat', minutes: 40 },
    { day: 'Sun', minutes: 35 },
  ];

  const skillsData = [
    { skill: 'Vocabulary', value: 75 },
    { skill: 'Grammar', value: 60 },
    { skill: 'Speaking', value: 45 },
    { skill: 'Listening', value: 55 },
    { skill: 'Reading', value: 70 },
    { skill: 'Writing', value: 50 },
  ];

  const recommendedCourses = mockCourses
    .filter(c => user.learningLanguages.includes(c.language))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-3xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-white text-4xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-display text-3xl font-bold mb-2">{user.username}</h1>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 text-accent-600">
                    <Flame className="w-5 h-5" />
                    <span className="font-semibold">{user.streak} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-600">
                    <span className="font-semibold">{user.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success-100 text-success-600">
                    <Target className="w-5 h-5" />
                    <span className="font-semibold">Level {Math.floor(user.xp / 1000) + 1}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/profile/settings"
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-100 flex items-center justify-center">
                <Flame className="w-6 h-6 text-accent-500" />
              </div>
              <p className="text-3xl font-bold text-gradient">{user.streak}</p>
              <p className="text-sm text-gray-500">Day Streak</p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-500" />
              </div>
              <p className="text-3xl font-bold text-gradient">{Math.floor(totalStudyTime / 60)}</p>
              <p className="text-sm text-gray-500">Hours Studied</p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-success-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-success-500" />
              </div>
              <p className="text-3xl font-bold text-gradient">{wordsLearned}</p>
              <p className="text-sm text-gray-500">Words Learned</p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gradient">{unlockedAchievements.length}</p>
              <p className="text-sm text-gray-500">Achievements</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  Weekly Activity
                </h2>
                <span className="text-sm text-gray-500">This Week</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#6366f1' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-500" />
                  Skills Overview
                </h2>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis stroke="#9ca3af" />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Award className="w-6 h-6 text-primary-500" />
                Achievements
              </h2>
              <span className="text-sm text-gray-500">
                {unlockedAchievements.length} / {achievements.length} unlocked
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`glass rounded-2xl p-4 text-center ${
                    achievement.unlocked ? '' : 'opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-3xl ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-primary-400 to-accent-400' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {achievement.unlocked ? achievementIcons[achievement.icon] : '🔒'}
                  </div>
                  <h3 className="font-semibold mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary transition-all"
                        style={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary-500" />
                Recommended for You
              </h2>
              <Link to="/courses" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <Link key={course.id} to={`/courses/${course.language}/${course.id}`}>
                  <div className="glass rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">
                        {course.language === 'english' ? '🇬🇧' : 
                         course.language === 'japanese' ? '🇯🇵' : 
                         course.language === 'korean' ? '🇰🇷' : '🇨🇳'}
                      </span>
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.level}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
