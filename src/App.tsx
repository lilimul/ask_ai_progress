import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LearningModule from './pages/LearningModule';
import Profile from './pages/Profile';
import Community from './pages/Community';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:language" element={<Courses />} />
            <Route path="/courses/:language/:courseId" element={<CourseDetail />} />
            <Route
              path="/learn/:courseId/:lessonId"
              element={
                <PrivateRoute>
                  <LearningModule />
                </PrivateRoute>
              }
            />
            <Route
              path="/learn/:courseId/:lessonId/:moduleType"
              element={
                <PrivateRoute>
                  <LearningModule />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/*"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/community" element={<Community />} />
            <Route path="/community/leaderboard" element={<Community />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
