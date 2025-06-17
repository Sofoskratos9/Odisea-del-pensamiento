import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Brain, 
  Users, 
  Heart, 
  Puzzle, 
  Lightbulb, 
  MessageCircle,
  Clock,
  Star,
  CheckCircle,
  Lock,
  ChevronRight
} from 'lucide-react';

const ChallengesPage = () => {
  const { userProfile } = useAuth();
  const { gameData, completeActivity } = useGame();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('lifeSkills');
  const [challenges, setChallenges] = useState([]);

  // Categorías de desafíos
  const challengeCategories = [
    { id: 'lifeSkills', name: 'Habilidades para la Vida', icon: <Brain className="h-5 w-5" /> },
    { id: 'criticalThinking', name: 'Pensamiento Crítico', icon: <Lightbulb className="h-5 w-5" /> },
    { id: 'social', name: 'Socialización', icon: <Users className="h-5 w-5" /> },
    { id: 'emotional', name: 'Inteligencia Emocional', icon: <Heart className="h-5 w-5" /> },
  ];

  // Desafíos por categoría
  const challengesData = {
    lifeSkills: [
      {
        id: 'daily_reflection',
        title: 'Diario de Reflexión',
        description: 'Escribe una reflexión diaria sobre cómo un concepto filosófico se aplica a tu vida cotidiana',
        difficulty: 'Fácil',
        duration: '10 min',
        xpReward: 15,
        badgeId: 'mindfulness_guru',
        type: 'reflection',
        icon: '🧘',
        unlocked: true
      },
      {
        id: 'problem_solving',
        title: 'Resolución de Problemas',
        description: 'Aplica el método socrático para resolver un problema real en tu comunidad escolar',
        difficulty: 'Medio',
        duration: '30 min',
        xpReward: 35,
        badgeId: 'problem_solver',
        type: 'real_world',
        icon: '🧩',
        unlocked: true
      },
      {
        id: 'resilience_challenge',
        title: 'Desafío de Resiliencia',
        description: 'Completa una serie de ejercicios filosóficos que requieren perseverancia y superación',
        difficulty: 'Difícil',
        duration: '45 min',
        xpReward: 50,
        badgeId: 'resilience_champion',
        type: 'resilience_test',
        icon: '🌱',
        unlocked: gameData?.level >= 2
      }
    ],
    criticalThinking: [
      {
        id: 'logical_fallacies',
        title: 'Detector de Falacias',
        description: 'Identifica falacias lógicas en argumentos cotidianos y explica por qué son erróneas',
        difficulty: 'Medio',
        duration: '20 min',
        xpReward: 25,
        badgeId: 'critical_thinker',
        type: 'challenge',
        icon: '🔍',
        unlocked: true
      },
      {
        id: 'ethical_dilemma',
        title: 'Dilema Ético',
        description: 'Analiza un dilema ético contemporáneo desde múltiples perspectivas filosóficas',
        difficulty: 'Difícil',
        duration: '40 min',
        xpReward: 40,
        badgeId: 'critical_thinker',
        type: 'challenge',
        icon: '⚖️',
        unlocked: true
      },
      {
        id: 'socratic_dialogue',
        title: 'Diálogo Socrático',
        description: 'Crea un diálogo socrático sobre un tema contemporáneo relevante para los adolescentes',
        difficulty: 'Medio',
        duration: '30 min',
        xpReward: 30,
        badgeId: 'creative_writer',
        type: 'creative',
        icon: '💬',
        unlocked: gameData?.level >= 2
      }
    ],
    social: [
      {
        id: 'philosophical_debate',
        title: 'Debate Filosófico',
        description: 'Participa en un debate estructurado sobre un tema filosófico con tus compañeros',
        difficulty: 'Medio',
        duration: '45 min',
        xpReward: 35,
        badgeId: 'debate_champion',
        type: 'debate',
        icon: '🗣️',
        unlocked: true
      },
      {
        id: 'team_project',
        title: 'Proyecto en Equipo',
        description: 'Colabora con otros estudiantes para crear una presentación sobre un filósofo',
        difficulty: 'Difícil',
        duration: '60 min',
        xpReward: 50,
        badgeId: 'team_synergy',
        type: 'team_challenge',
        icon: '👥',
        unlocked: true
      },
      {
        id: 'conflict_resolution',
        title: 'Resolución de Conflictos',
        description: 'Aprende y aplica técnicas filosóficas para mediar en debates acalorados',
        difficulty: 'Difícil',
        duration: '40 min',
        xpReward: 45,
        badgeId: 'conflict_mediator',
        type: 'debate_mediation',
        icon: '☮️',
        unlocked: gameData?.level >= 3
      }
    ],
    emotional: [
      {
        id: 'empathy_exercise',
        title: 'Ejercicio de Empatía',
        description: 'Analiza una situación desde múltiples perspectivas para desarrollar empatía',
        difficulty: 'Fácil',
        duration: '20 min',
        xpReward: 20,
        badgeId: 'empathy_master',
        type: 'empathy_challenge',
        icon: '❤️',
        unlocked: true
      },
      {
        id: 'active_listening',
        title: 'Escucha Activa',
        description: 'Practica técnicas de escucha activa en conversaciones filosóficas',
        difficulty: 'Medio',
        duration: '25 min',
        xpReward: 25,
        badgeId: 'active_listener',
        type: 'active_listening',
        icon: '👂',
        unlocked: true
      },
      {
        id: 'emotional_awareness',
        title: 'Conciencia Emocional',
        description: 'Explora cómo las emociones influyen en nuestro pensamiento y toma de decisiones',
        difficulty: 'Medio',
        duration: '30 min',
        xpReward: 30,
        badgeId: 'mindfulness_guru',
        type: 'mindfulness_practice',
        icon: '🧠',
        unlocked: gameData?.level >= 2
      }
    ]
  };

  useEffect(() => {
    // Actualizar los desafíos cuando cambia la categoría seleccionada
    setChallenges(challengesData[selectedCategory] || []);
  }, [selectedCategory, gameData]);

  const handleStartChallenge = (challenge) => {
    if (!challenge.unlocked) return;
    
    // Aquí se implementaría la navegación al desafío específico
    // Por ahora, simularemos la finalización del desafío
    console.log(`Iniciando desafío: ${challenge.title}`);
    
    // En una implementación real, esto se llamaría cuando el usuario complete el desafío
    // completeActivity(challenge.id, challenge.type, { score: 95 });
    
    // Navegar a la página del desafío (a implementar)
    navigate(`/challenge/${challenge.id}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return 'text-emerald-500';
      case 'Medio': return 'text-amber-500';
      case 'Difícil': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (!userProfile || !gameData) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center">
        <div className="text-white">Cargando desafíos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/30">
            <h1 className="text-3xl font-cinzel text-white mb-2">
              Desafíos Filosóficos
            </h1>
            <p className="text-gold/80 font-playfair text-lg">
              Desarrolla habilidades para la vida a través del pensamiento filosófico
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Barra lateral - Categorías */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h2 className="text-xl font-playfair text-deep-blue mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-gold" />
                Categorías
              </h2>
              
              <div className="space-y-2">
                {challengeCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${selectedCategory === category.id ? 'bg-gold/20 text-deep-blue' : 'hover:bg-gold/10 text-gray-600'}`}
                  >
                    <div className={`${selectedCategory === category.id ? 'text-gold' : 'text-gray-500'}`}>
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-deep-blue mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-gold" />
                  ¿Por qué son importantes?
                </h3>
                <p className="text-sm text-gray-600">
                  Estos desafíos te ayudarán a desarrollar habilidades esenciales para la vida, mejorar tu pensamiento crítico y fortalecer tus relaciones sociales.
                </p>
              </div>
            </div>
          </div>

          {/* Lista de desafíos */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cinzel text-deep-blue">
                  {challengeCategories.find(c => c.id === selectedCategory)?.name || 'Desafíos'}
                </h2>
                <div className="text-gold">
                  {challengeCategories.find(c => c.id === selectedCategory)?.icon}
                </div>
              </div>
              
              <div className="space-y-4">
                {challenges.map(challenge => (
                  <div 
                    key={challenge.id}
                    className={`border rounded-xl overflow-hidden transition-all ${challenge.unlocked ? 'hover:shadow-md cursor-pointer' : 'opacity-70'}`}
                    onClick={() => challenge.unlocked && handleStartChallenge(challenge)}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Icono del desafío */}
                      <div className="bg-gradient-to-br from-deep-blue to-deep-blue/80 p-6 flex items-center justify-center md:w-24">
                        <div className="text-4xl">{challenge.icon}</div>
                      </div>
                      
                      {/* Información del desafío */}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-deep-blue mb-2">{challenge.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                          </div>
                          {!challenge.unlocked && (
                            <div className="ml-4 flex-shrink-0">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className={`font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {challenge.duration}
                          </span>
                          <span className="flex items-center text-gold">
                            <Star className="h-3 w-3 mr-1" />
                            {challenge.xpReward} XP
                          </span>
                        </div>
                      </div>
                      
                      {/* Botón de acción */}
                      <div className="bg-gray-50 p-5 flex items-center justify-center md:w-32">
                        {challenge.unlocked ? (
                          <button className="bg-deep-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-deep-blue/90 transition-colors flex items-center">
                            <span>Iniciar</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        ) : (
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Desbloqueado en</p>
                            <p className="text-sm font-medium text-deep-blue">Nivel {challenge.unlocked ? 1 : (gameData?.level >= 3 ? 3 : gameData?.level + 1)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {challenges.length === 0 && (
                <div className="text-center py-12">
                  <Puzzle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay desafíos disponibles en esta categoría</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;