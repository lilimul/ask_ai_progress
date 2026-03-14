import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  BookOpen, 
  User, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Flame
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Globe },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/community', label: 'Community', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">LinguaFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100 text-accent-600">
                  <Flame className="w-4 h-4" />
                  <span className="font-semibold">{user.streak}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-600">
                  <span className="font-semibold">{user.xp} XP</span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-secondary text-sm"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-t border-gray-200 dark:border-gray-700"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary-100 text-primary-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-center btn-secondary w-full"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-center btn-primary w-full mt-2"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
