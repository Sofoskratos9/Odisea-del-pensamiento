import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user, userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-mystical">
      {/* Navegación principal */}
      {user && <Navigation userType={userProfile?.type} />}
      
      {/* Contenido principal */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      {user && <Footer />}
    </div>
  );
};

export default Layout;

