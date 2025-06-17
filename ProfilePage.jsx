import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { 
  User, 
  Award, 
  BookOpen, 
  Calendar,
  Edit3,
  Star,
  Trophy,
  Target,
  Clock
} from 'lucide-react';

const ProfilePage = () => {
  const { userProfile } = useAuth();
  const { gameData, getLevelName, getProgressToNextLevel, BADGES } = useGame();

  if (!userProfile || !gameData) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center">
        <div className="text-white">Cargando perfil...</div>
      </div>
    );
  }

  const progressToNext = getProgressToNextLevel();
  const allBadges = [...BADGES.philosophers, ...BADGES.skills, ...BADGES.achievements];

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del perfil */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-deep-blue" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-deep-blue text-white text-xs px-2 py-1 rounded-full font-bold">
                    {gameData.level}
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-cinzel text-white mb-1">
                    {userProfile.profile.name}
                  </h1>
                  <p className="text-gold text-lg font-playfair">
                    {getLevelName(gameData.level)}
                  </p>
                  <p className="text-white/70 text-sm">
                    @{userProfile.profile.nickname} • {userProfile.profile.school || 'Escuela no especificada'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2">
                  <Edit3 className="h-4 w-4" />
                  <span>Editar Perfil</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Estadísticas y progreso */}
          <div className="lg:col-span-1 space-y-6">
            {/* Estadísticas principales */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h2 className="text-xl font-playfair text-deep-blue mb-6 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-gold" />
                Estadísticas
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gold/20 to-gold/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-gold" />
                    <span className="text-deep-blue font-medium">Puntos XP</span>
                  </div>
                  <span className="text-xl font-bold text-deep-blue">{gameData.totalXP}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple/20 to-purple/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-purple" />
                    <span className="text-deep-blue font-medium">Insignias</span>
                  </div>
                  <span className="text-xl font-bold text-deep-blue">{gameData.badges?.length || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald/20 to-emerald/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-emerald" />
                    <span className="text-deep-blue font-medium">Actividades</span>
                  </div>
                  <span className="text-xl font-bold text-deep-blue">8</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue/20 to-blue/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue" />
                    <span className="text-deep-blue font-medium">Tiempo total</span>
                  </div>
                  <span className="text-xl font-bold text-deep-blue">2h 30m</span>
                </div>
              </div>
            </div>

            {/* Progreso al siguiente nivel */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h3 className="text-lg font-playfair text-deep-blue mb-4">
                Progreso al Siguiente Nivel
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-deep-blue mb-1">
                  Nivel {gameData.level}
                </div>
                <div className="text-gold font-medium">
                  {getLevelName(gameData.level)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{progressToNext.current} XP</span>
                  <span>{progressToNext.next} XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-gold transition-all duration-500"
                    style={{ width: `${progressToNext.percentage}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {progressToNext.percentage}% completado
                </div>
              </div>
            </div>

            {/* Información del perfil */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h3 className="text-lg font-playfair text-deep-blue mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Información Personal
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="text-deep-blue font-medium">{userProfile.profile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Apodo:</span>
                  <span className="text-deep-blue font-medium">@{userProfile.profile.nickname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grado:</span>
                  <span className="text-deep-blue font-medium">{userProfile.profile.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Escuela:</span>
                  <span className="text-deep-blue font-medium">{userProfile.profile.school || 'No especificada'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Miembro desde:</span>
                  <span className="text-deep-blue font-medium">
                    {new Date(userProfile.profile.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Insignias y logros */}
          <div className="lg:col-span-2 space-y-6">
            {/* Colección de insignias */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h2 className="text-xl font-playfair text-deep-blue mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-gold" />
                Colección de Insignias
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allBadges.map((badge) => {
                  const earned = gameData.badges?.some(b => b.id === badge.id);
                  
                  return (
                    <div 
                      key={badge.id}
                      className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                        earned 
                          ? 'bg-gradient-to-br from-gold/20 to-gold/10 border-gold/50 badge-shine' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h4 className={`font-semibold text-sm mb-1 ${earned ? 'text-deep-blue' : 'text-gray-500'}`}>
                          {badge.name}
                        </h4>
                        <p className={`text-xs ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {badge.description}
                        </p>
                        
                        {earned && (
                          <div className="absolute -top-2 -right-2 bg-gold text-deep-blue rounded-full p-1">
                            <Star className="h-3 w-3" />
                          </div>
                        )}
                        
                        {!earned && (
                          <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">Bloqueada</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  {gameData.badges?.length || 0} de {allBadges.length} insignias obtenidas
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-gold h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((gameData.badges?.length || 0) / allBadges.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Diario de reflexiones */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h2 className="text-xl font-playfair text-deep-blue mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-gold" />
                Mi Diario Filosófico
              </h2>
              
              <div className="space-y-4">
                {/* Ejemplo de entradas del diario */}
                <div className="border-l-4 border-gold pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-deep-blue">Reflexión sobre Sócrates</h4>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Hace 2 días
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    "Después de estudiar a Sócrates, me doy cuenta de que hacer preguntas es más importante que tener respuestas. 
                    En mi vida diaria, voy a intentar cuestionar más las cosas que doy por sentado..."
                  </p>
                </div>
                
                <div className="border-l-4 border-purple pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-deep-blue">Mi Mito Moderno</h4>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Hace 1 semana
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    "Creé un mito sobre el origen de los smartphones. Me ayudó a entender cómo los antiguos griegos 
                    explicaban fenómenos que no comprendían completamente..."
                  </p>
                </div>
                
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm mb-3">
                    Tus reflexiones aparecerán aquí conforme completes actividades
                  </p>
                  <button className="text-deep-blue hover:text-gold transition-colors text-sm font-medium">
                    Escribir Nueva Reflexión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

