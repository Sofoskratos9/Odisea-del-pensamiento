import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { 
  Map, 
  Award, 
  Target, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight,
  Compass,
  Puzzle,
  Brain,
  Users
} from 'lucide-react';

const StudentDashboard = () => {
  const { userProfile } = useAuth();
  const { gameData, getLevelName, getProgressToNextLevel } = useGame();

  if (!userProfile || !gameData) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center">
        <div className="text-white text-center">
          <Compass className="h-16 w-16 mx-auto mb-4 animate-spin" />
          <p>Cargando tu odisea...</p>
        </div>
      </div>
    );
  }

  const progressToNext = getProgressToNextLevel();
  const currentLevel = gameData.level || 1;
  const totalXP = gameData.totalXP || 0;
  const badgeCount = gameData.badges?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de bienvenida */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-cinzel text-white mb-2">
                  ¡Bienvenido, {userProfile.profile.name}!
                </h1>
                <p className="text-gold/80 font-playfair text-lg">
                  {getLevelName(currentLevel)} • {totalXP} XP
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Continúa tu viaje por la historia del pensamiento
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">{badgeCount}</div>
                  <div className="text-white/70 text-sm">Insignias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">Nivel {currentLevel}</div>
                  <div className="text-white/70 text-sm">Navegante</div>
                </div>
              </div>
            </div>
            
            {/* Barra de progreso hacia siguiente nivel */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Progreso al siguiente nivel</span>
                <span>{progressToNext.percentage}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-gold transition-all duration-500"
                  style={{ width: `${progressToNext.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Mapa de progreso */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cinzel text-deep-blue">
                  Tu Mapa de Progreso
                </h2>
                <Map className="h-6 w-6 text-gold" />
              </div>
              
              {/* Mapa visual simplificado */}
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 min-h-96">
                {/* Continentes/Parciales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                  {/* Primer Parcial */}
                  <div className="relative">
                    <div className="bg-emerald-500 rounded-lg p-4 shadow-lg interactive-card">
                      <h3 className="font-playfair text-white font-semibold mb-2">
                        Las Grandes Preguntas
                      </h3>
                      <div className="text-white/90 text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-3 h-3 bg-gold rounded-full"></div>
                          <span>Del Mito a la Razón</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                          <span>Sócrates y la Sabiduría</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Segundo Parcial */}
                  <div className="relative">
                    <div className="bg-gray-400 rounded-lg p-4 shadow-lg opacity-60">
                      <h3 className="font-playfair text-white font-semibold mb-2">
                        Los Grandes Maestros
                      </h3>
                      <div className="text-white/90 text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                          <span>Platón - Mundo de Ideas</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                          <span>Aristóteles - Pensador Práctico</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">Bloqueado</span>
                    </div>
                  </div>

                  {/* Tercer Parcial */}
                  <div className="relative">
                    <div className="bg-gray-400 rounded-lg p-4 shadow-lg opacity-60">
                      <h3 className="font-playfair text-white font-semibold mb-2">
                        Fe y Razón
                      </h3>
                      <div className="text-white/90 text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                          <span>Pensadores Cristianos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                          <span>Síntesis Medieval</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">Bloqueado</span>
                    </div>
                  </div>
                </div>

                {/* Barco navegante */}
                <div className="absolute bottom-4 left-4">
                  <div className="text-4xl animate-float">🚢</div>
                </div>

                {/* Brújula */}
                <div className="absolute top-4 right-4">
                  <Compass className="h-8 w-8 text-gold animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>

              {/* Botón para ver mapa completo */}
              <div className="mt-6 text-center">
                <button className="bg-gradient-gold text-deep-blue px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform inline-flex items-center space-x-2">
                  <span>Explorar Mapa Completo</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Columna derecha - Misión actual e insignias */}
          <div className="space-y-8">
            {/* Misión Actual */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-playfair text-deep-blue">Misión Actual</h3>
                <Target className="h-6 w-6 text-gold" />
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-lg p-4 border border-gold/30">
                  <h4 className="font-semibold text-deep-blue mb-2">
                    Del Mito a la Razón
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Explora cómo la humanidad pasó de explicar el mundo con mitos a usar la razón.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progreso</span>
                      <span className="text-deep-blue font-medium">2/4 actividades</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-gold h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-deep-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-deep-blue/90 transition-colors">
                  Continuar Misión
                </button>
              </div>
            </div>

            {/* Desafíos */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-playfair text-deep-blue">Desafíos para la Vida</h3>
                <Puzzle className="h-6 w-6 text-gold" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="bg-deep-blue/90 p-2 rounded-full text-white">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-deep-blue">Pensamiento Crítico</h4>
                    <p className="text-xs text-gray-600">3 desafíos disponibles</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="bg-amber-500 p-2 rounded-full text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-deep-blue">Habilidades Sociales</h4>
                    <p className="text-xs text-gray-600">2 desafíos disponibles</p>
                  </div>
                </div>

                <a 
                  href="/challenges" 
                  className="block w-full bg-gradient-gold text-deep-blue py-3 px-4 rounded-lg font-semibold hover:bg-deep-blue/90 transition-colors text-center mt-4"
                >
                  Explorar Todos los Desafíos
                </a>
              </div>
            </div>

            {/* Insignias Recientes */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-playfair text-deep-blue">Insignias Recientes</h3>
                <Award className="h-6 w-6 text-gold" />
              </div>
              
              {badgeCount > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {gameData.badges.slice(-4).map((badge, index) => (
                    <div key={index} className="text-center p-3 bg-gradient-to-br from-gold/20 to-gold/10 rounded-lg border border-gold/30 badge-shine">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium text-deep-blue">{badge.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Completa actividades para ganar tus primeras insignias
                  </p>
                </div>
              )}
              
              <button className="w-full mt-4 text-deep-blue hover:text-gold transition-colors text-sm font-medium">
                Ver Todas las Insignias
              </button>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-playfair text-deep-blue">Estadísticas</h3>
                <TrendingUp className="h-6 w-6 text-gold" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Tiempo total</span>
                  </div>
                  <span className="text-deep-blue font-medium">2h 30m</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Actividades completadas</span>
                  </div>
                  <span className="text-deep-blue font-medium">8</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Puntuación promedio</span>
                  </div>
                  <span className="text-deep-blue font-medium">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

