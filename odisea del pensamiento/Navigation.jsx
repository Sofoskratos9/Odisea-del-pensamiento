import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { 
  Compass, 
  Map, 
  User, 
  Award, 
  LogOut, 
  Menu, 
  X,
  Users,
  BarChart3,
  Settings,
  Puzzle
} from 'lucide-react';

const Navigation = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, userProfile } = useAuth();
  const { gameData } = useGame();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Elementos de navegación para estudiantes
  const studentNavItems = [
    { 
      path: '/dashboard', 
      label: 'Mi Odisea', 
      icon: Map,
      description: 'Explora tu mapa de progreso'
    },
    { 
      path: '/challenges', 
      label: 'Desafíos', 
      icon: Puzzle,
      description: 'Retos para desarrollar habilidades'
    },
    { 
      path: '/profile', 
      label: 'Mi Diario', 
      icon: User,
      description: 'Tu perfil y logros'
    }
  ];

  // Elementos de navegación para profesores
  const teacherNavItems = [
    { 
      path: '/teacher', 
      label: 'Observatorio', 
      icon: BarChart3,
      description: 'Panel de control'
    },
    { 
      path: '/teacher/students', 
      label: 'Estudiantes', 
      icon: Users,
      description: 'Gestión de estudiantes'
    }
  ];

  const navItems = userType === 'student' ? studentNavItems : teacherNavItems;

  return (
    <>
      {/* Navegación desktop */}
      <nav className="bg-deep-blue/95 backdrop-blur-sm border-b border-gold/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y título */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Compass className="h-8 w-8 text-gold animate-float" />
                <div className="absolute inset-0 bg-gold/20 rounded-full animate-glow"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-cinzel text-white group-hover:text-gold transition-colors">
                  La Odisea del Pensamiento
                </h1>
                {userType === 'student' && gameData && (
                  <p className="text-xs text-gold/80">
                    {gameData.level ? `Nivel ${gameData.level}` : 'Aprendiz Navegante'} • {gameData.totalXP || 0} XP
                  </p>
                )}
              </div>
            </Link>

            {/* Navegación desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-gold text-deep-blue' 
                        : 'text-white hover:bg-white/10 hover:text-gold'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Indicador de XP para estudiantes */}
              {userType === 'student' && gameData && (
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                  <Award className="h-5 w-5 text-gold" />
                  <div className="text-sm">
                    <div className="text-white font-medium">{gameData.totalXP || 0} XP</div>
                    <div className="text-gold/80 text-xs">
                      {gameData.badges?.length || 0} insignias
                    </div>
                  </div>
                </div>
              )}

              {/* Botón de logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white hover:text-gold transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Salir</span>
              </button>
            </div>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-gold transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden bg-deep-blue/98 backdrop-blur-sm border-t border-gold/30">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gold text-deep-blue' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm opacity-80">{item.description}</div>
                    </div>
                  </Link>
                );
              })}

              {/* Información del usuario en móvil */}
              <div className="border-t border-gold/30 pt-3 mt-3">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <User className="h-8 w-8 text-gold" />
                  <div>
                    <div className="text-white font-medium">
                      {userProfile?.profile?.name || 'Usuario'}
                    </div>
                    <div className="text-gold/80 text-sm">
                      {userType === 'student' ? 'Estudiante' : 'Profesor'}
                    </div>
                    {userType === 'student' && gameData && (
                      <div className="text-gold/60 text-xs">
                        {gameData.totalXP || 0} XP • {gameData.badges?.length || 0} insignias
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors mt-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;

