import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Heart,
  MessageCircle,
  Share2,
  Medal,
  Crown,
  Star
} from 'lucide-react';
import { mockCommunityUsers, mockActivities } from '../services/mockData';

type LeaderboardType = 'xp' | 'streak' | 'time';

export default function Community() {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('xp');
  const [activeView, setActiveView] = useState<'leaderboard' | 'activity'>('leaderboard');

  const sortedUsers = [...mockCommunityUsers].sort((a, b) => {
    switch (activeTab) {
      case 'streak':
        return b.streak - a.streak;
      case 'time':
        return b.xp - a.xp;
      default:
        return b.xp - a.xp;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400/20 to-amber-400/20 border-yellow-400/50';
      case 2:
        return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/50';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50';
      default:
        return 'glass';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement_unlocked':
        return '🏆';
      case 'course_completed':
        return '📚';
      case 'streak_milestone':
        return '🔥';
      case 'words_learned':
        return '📝';
      default:
        return '⭐';
    }
  };

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
              <span className="text-gradient">Community</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with fellow learners, compete on leaderboards, and celebrate achievements together.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveView('leaderboard')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeView === 'leaderboard'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Trophy className="w-5 h-5 inline mr-2" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveView('activity')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeView === 'activity'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Activity Feed
            </button>
          </div>

          {activeView === 'leaderboard' && (
            <>
              <div className="flex justify-center gap-2 mb-8">
                <button
                  onClick={() => setActiveTab('xp')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'xp'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Star className="w-4 h-4 inline mr-1" />
                  XP
                </button>
                <button
                  onClick={() => setActiveTab('streak')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'streak'
                      ? 'bg-accent-100 text-accent-600'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Flame className="w-4 h-4 inline mr-1" />
                  Streak
                </button>
                <button
                  onClick={() => setActiveTab('time')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'time'
                      ? 'bg-success-100 text-success-600'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-1" />
                  Study Time
                </button>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center items-end gap-4 mb-8">
                  {sortedUsers.slice(0, 3).map((_, index) => {
                    const positions = [1, 0, 2];
                    const actualIndex = positions[index];
                    const actualUser = sortedUsers[actualIndex];
                    const heights = ['h-32', 'h-40', 'h-28'];
                    const delays = [0.2, 0, 0.4];
                    
                    return (
                      <motion.div
                        key={actualUser.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: delays[index] }}
                        className={`flex flex-col items-center ${actualIndex === 0 ? 'order-2' : actualIndex === 1 ? 'order-1' : 'order-3'}`}
                      >
                        <div className={`w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold mb-2 ${
                          actualIndex === 0 ? 'ring-4 ring-yellow-400' : ''
                        }`}>
                          {actualUser.username.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold text-sm mb-1">{actualUser.username}</p>
                        <div className={`w-24 ${heights[index]} rounded-t-2xl flex flex-col items-center justify-end p-3 ${
                          actualIndex === 0 ? 'bg-gradient-to-t from-yellow-400 to-yellow-300' :
                          actualIndex === 1 ? 'bg-gradient-to-t from-gray-400 to-gray-300' :
                          'bg-gradient-to-t from-amber-600 to-amber-500'
                        }`}>
                          <span className="text-white font-bold text-lg">
                            {activeTab === 'streak' ? `${actualUser.streak}🔥` : actualUser.xp.toLocaleString()}
                          </span>
                          <span className="text-white/80 text-xs">
                            {activeTab === 'streak' ? 'days' : 'XP'}
                          </span>
                        </div>
                        <div className={`w-24 py-2 rounded-b-2xl text-center text-white font-bold ${
                          actualIndex === 0 ? 'bg-yellow-500' :
                          actualIndex === 1 ? 'bg-gray-500' :
                          'bg-amber-700'
                        }`}>
                          #{actualIndex + 1}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {sortedUsers.slice(3).map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`glass rounded-2xl p-4 border ${getRankBg(index + 4)}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center">
                          {getRankIcon(index + 4)}
                        </div>
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{user.username}</h3>
                          <p className="text-sm text-gray-500">Level {user.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gradient">
                            {activeTab === 'streak' ? `${user.streak}🔥` : user.xp.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activeTab === 'streak' ? 'day streak' : 'XP'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeView === 'activity' && (
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {mockActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                        {activity.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                          <span className="font-semibold">{activity.username}</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {activity.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-error-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{activity.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-primary-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">Comment</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-primary-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
