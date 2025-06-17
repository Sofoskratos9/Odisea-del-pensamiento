import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { useAuth } from './contexts/AuthContext';
import './App.css';

// Componentes principales
import Layout from './components/Layout';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ActivityPage from './components/activities/ActivityPage';
import ProfilePage from './components/student/ProfilePage';
import ChallengesPage from './pages/ChallengesPage';
import ChallengePage from './pages/ChallengePage';
import LoadingSpinner from './components/common/LoadingSpinner';

// Componente de rutas protegidas
const ProtectedRoute = ({ children, requireAuth = true, userType = null }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Cargando tu odisea..." />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (userType && userProfile?.type !== userType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Componente principal de la aplicación
const AppContent = () => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Iniciando La Odisea del Pensamiento..." />;
  }

  return (
    <Layout>
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage />
            )
          } 
        />

        {/* Ruta principal - redirige según tipo de usuario */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              {userProfile?.type === 'student' ? (
                <Navigate to="/dashboard" replace />
              ) : userProfile?.type === 'teacher' ? (
                <Navigate to="/teacher" replace />
              ) : (
                <Navigate to="/login" replace />
              )}
            </ProtectedRoute>
          } 
        />

        {/* Rutas de estudiante */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute userType="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute userType="student">
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/activity/:activityId" 
          element={
            <ProtectedRoute userType="student">
              <ActivityPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/challenges" 
          element={
            <ProtectedRoute userType="student">
              <ChallengesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/challenge/:challengeId" 
          element={
            <ProtectedRoute userType="student">
              <ChallengePage />
            </ProtectedRoute>
          } 
        />

        {/* Rutas de profesor */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute userType="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Ruta 404 */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-mystical">
              <div className="text-center text-white">
                <h1 className="text-6xl font-cinzel mb-4">404</h1>
                <p className="text-xl font-playfair mb-8">Esta página se perdió en el tiempo...</p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-gold text-deep-blue px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  Regresar a la Odisea
                </button>
              </div>
            </div>
          } 
        />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <AppContent />
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;

