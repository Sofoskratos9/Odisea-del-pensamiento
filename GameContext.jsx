import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { doc, updateDoc, increment, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const GameContext = createContext({});

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Configuración de XP y niveles
const XP_REWARDS = {
  activity_completion: 10,
  first_attempt_correct: 5,
  creative_response: 15,
  debate_participation: 8,
  vote_received: 2,
  session_completion: 20,
  theme_completion: 50,
  partial_completion: 100,
  challenge_completion: 25,
  team_challenge_completion: 30,
  reflection_submission: 15,
  real_world_application: 35,
  mentor_others: 20,
  community_contribution: 25
};

const LEVEL_THRESHOLDS = [
  0,    // Nivel 1: Aprendiz Navegante
  100,  // Nivel 2: Explorador Curioso
  250,  // Nivel 3: Buscador de Sabiduría
  450,  // Nivel 4: Pensador Crítico
  700,  // Nivel 5: Filósofo en Formación
  1000, // Nivel 6: Maestro del Pensamiento
];

const LEVEL_NAMES = [
  'Aprendiz Navegante',
  'Explorador Curioso',
  'Buscador de Sabiduría',
  'Pensador Crítico',
  'Filósofo en Formación',
  'Maestro del Pensamiento'
];

// Configuración de insignias
const BADGES = {
  philosophers: [
    {
      id: 'socrates_questioner',
      name: 'El Interrogador',
      description: 'Has dominado el arte de hacer las preguntas correctas',
      requirement: 'complete_socrates_activities',
      icon: '🤔'
    },
    {
      id: 'plato_idealist',
      name: 'Guardián de las Ideas',
      description: 'Has explorado las profundidades del pensamiento platónico',
      requirement: 'complete_plato_activities',
      icon: '🏛️'
    },
    {
      id: 'aristotle_logician',
      name: 'El Lógico',
      description: 'Has demostrado maestría en el razonamiento aristotélico',
      requirement: 'complete_aristotle_activities',
      icon: '⚖️'
    }
  ],
  skills: [
    {
      id: 'critical_thinker',
      name: 'Pensador Crítico',
      description: 'Has demostrado excelencia en el análisis de dilemas éticos',
      requirement: 'ethical_dilemmas_mastery',
      icon: '🎯'
    },
    {
      id: 'creative_writer',
      name: 'Escritor Filosófico',
      description: 'Tus reflexiones escritas muestran profundidad y creatividad',
      requirement: 'creative_writing_excellence',
      icon: '✍️'
    },
    {
      id: 'timeline_master',
      name: 'Cronista del Tiempo',
      description: 'Has dominado las líneas temporales filosóficas',
      requirement: 'timeline_mastery',
      icon: '⏰'
    }
  ],
  achievements: [
    {
      id: 'early_bird',
      name: 'Madrugador del Pensamiento',
      description: 'Completaste actividades antes del plazo',
      requirement: 'early_completion_streak',
      icon: '🌅'
    },
    {
      id: 'debate_champion',
      name: 'Campeón del Debate',
      description: 'Tus respuestas han recibido muchos votos positivos',
      requirement: 'debate_votes_threshold',
      icon: '🗣️'
    }
  ],
  lifeSkills: [
    {
      id: 'empathy_master',
      name: 'Maestro de la Empatía',
      description: 'Has demostrado una extraordinaria capacidad para entender diferentes perspectivas',
      requirement: 'complete_empathy_challenges',
      icon: '❤️'
    },
    {
      id: 'problem_solver',
      name: 'Solucionador de Problemas',
      description: 'Has resuelto situaciones complejas aplicando el pensamiento filosófico',
      requirement: 'solve_real_world_problems',
      icon: '🧩'
    },
    {
      id: 'resilience_champion',
      name: 'Campeón de la Resiliencia',
      description: 'Has perseverado a través de desafíos difíciles sin rendirte',
      requirement: 'overcome_difficult_challenges',
      icon: '🌱'
    },
    {
      id: 'mindfulness_guru',
      name: 'Gurú de la Atención Plena',
      description: 'Has dominado técnicas de reflexión y autoconciencia',
      requirement: 'practice_mindfulness_regularly',
      icon: '🧘'
    }
  ],
  socialSkills: [
    {
      id: 'team_synergy',
      name: 'Sinergia de Equipo',
      description: 'Has colaborado efectivamente en proyectos grupales filosóficos',
      requirement: 'successful_team_collaborations',
      icon: '👥'
    },
    {
      id: 'conflict_mediator',
      name: 'Mediador de Conflictos',
      description: 'Has ayudado a resolver debates acalorados con diplomacia',
      requirement: 'mediate_philosophical_debates',
      icon: '☮️'
    },
    {
      id: 'community_builder',
      name: 'Constructor de Comunidad',
      description: 'Has contribuido significativamente a la comunidad de aprendizaje',
      requirement: 'contribute_to_learning_community',
      icon: '🌍'
    },
    {
      id: 'active_listener',
      name: 'Escucha Activa',
      description: 'Has demostrado una capacidad excepcional para escuchar y responder con empatía',
      requirement: 'practice_active_listening',
      icon: '👂'
    }
  ]
};

export const GameProvider = ({ children }) => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos de gamificación
  useEffect(() => {
    if (userProfile?.gameData) {
      setGameData(userProfile.gameData);
    }
    setLoading(false);
  }, [userProfile]);

  // Calcular nivel basado en XP
  const calculateLevel = (xp) => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  // Obtener nombre del nivel
  const getLevelName = (level) => {
    return LEVEL_NAMES[level - 1] || 'Navegante Desconocido';
  };

  // Otorgar XP
  const awardXP = async (amount, reason) => {
    if (!user || !gameData) return;

    try {
      const newXP = gameData.totalXP + amount;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > gameData.level;

      const updates = {
        'gameData.totalXP': newXP,
        'gameData.level': newLevel
      };

      await updateUserProfile(updates);

      setGameData(prev => ({
        ...prev,
        totalXP: newXP,
        level: newLevel
      }));

      // Si subió de nivel, mostrar celebración
      if (leveledUp) {
        showLevelUpCelebration(newLevel);
      }

      return { success: true, leveledUp, newLevel };
    } catch (error) {
      console.error('Error awarding XP:', error);
      return { success: false, error: error.message };
    }
  };

  // Otorgar insignia
  const awardBadge = async (badgeId) => {
    if (!user || !gameData) return;

    // Verificar si ya tiene la insignia
    if (gameData.badges.some(badge => badge.id === badgeId)) {
      return { success: false, error: 'Badge already earned' };
    }

    try {
      const badge = findBadgeById(badgeId);
      if (!badge) {
        return { success: false, error: 'Badge not found' };
      }

      const newBadge = {
        ...badge,
        earnedAt: new Date()
      };

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'gameData.badges': arrayUnion(newBadge)
      });

      setGameData(prev => ({
        ...prev,
        badges: [...prev.badges, newBadge]
      }));

      showBadgeEarnedCelebration(badge);

      return { success: true, badge: newBadge };
    } catch (error) {
      console.error('Error awarding badge:', error);
      return { success: false, error: error.message };
    }
  };

  // Buscar insignia por ID
  const findBadgeById = (badgeId) => {
    const allBadges = [
      ...BADGES.philosophers,
      ...BADGES.skills,
      ...BADGES.achievements,
      ...BADGES.lifeSkills,
      ...BADGES.socialSkills
    ];
    return allBadges.find(badge => badge.id === badgeId);
  };

  // Desbloquear contenido
  const unlockContent = async (contentId) => {
    if (!user || !gameData) return;

    if (gameData.unlockedContent.includes(contentId)) {
      return { success: false, error: 'Content already unlocked' };
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'gameData.unlockedContent': arrayUnion(contentId)
      });

      setGameData(prev => ({
        ...prev,
        unlockedContent: [...prev.unlockedContent, contentId]
      }));

      return { success: true };
    } catch (error) {
      console.error('Error unlocking content:', error);
      return { success: false, error: error.message };
    }
  };

  // Verificar si el contenido está desbloqueado
  const isContentUnlocked = (contentId) => {
    return gameData?.unlockedContent?.includes(contentId) || false;
  };

  // Completar actividad
  const completeActivity = async (activityId, activityType = 'standard', performance = {}) => {
    if (!user) return;

    try {
      // Otorgar XP base por completar actividad
      await awardXP(XP_REWARDS.activity_completion, 'activity_completion');

      // XP adicional basado en el tipo de actividad y rendimiento
      const score = performance.score || 0;
      
      if (score >= 95) {
        await awardXP(XP_REWARDS.first_attempt_correct, 'excellent_score');
      }
      
      if (activityType === 'creative') {
        await awardXP(XP_REWARDS.creative_response, 'creative_activity');
      } else if (activityType === 'debate') {
        await awardXP(XP_REWARDS.debate_participation, 'debate_participation');
      } else if (activityType === 'challenge') {
        await awardXP(XP_REWARDS.challenge_completion, 'challenge_completion');
      } else if (activityType === 'team_challenge') {
        await awardXP(XP_REWARDS.team_challenge_completion, 'team_challenge');
      } else if (activityType === 'reflection') {
        await awardXP(XP_REWARDS.reflection_submission, 'reflection_submitted');
      } else if (activityType === 'real_world') {
        await awardXP(XP_REWARDS.real_world_application, 'real_world_application');
      } else if (activityType === 'mentoring') {
        await awardXP(XP_REWARDS.mentor_others, 'mentoring_activity');
      } else if (activityType === 'community') {
        await awardXP(XP_REWARDS.community_contribution, 'community_contribution');
      }

      // Verificar si merece insignias
      await checkBadgeEligibility(activityId, activityType, performance);

      return { success: true };
    } catch (error) {
      console.error('Error completing activity:', error);
      return { success: false, error: error.message };
    }
  };

  // Verificar elegibilidad para insignias
  const checkBadgeEligibility = async (activityId, activityType, performance = {}) => {
    if (!user || !gameData) return;
    
    // Lógica para verificar si el estudiante merece insignias
    // basado en la actividad completada, su tipo y su historial
    
    // Verificación de insignias de filósofos
    if (activityId.includes('socrates')) {
      await awardBadge('socrates_questioner');
    } else if (activityId.includes('plato')) {
      await awardBadge('plato_idealist');
    } else if (activityId.includes('aristotle')) {
      await awardBadge('aristotle_logician');
    }
    
    // Verificación de insignias de habilidades para la vida
    if (activityType === 'empathy_challenge' && performance.score >= 90) {
      await awardBadge('empathy_master');
    } else if (activityType === 'problem_solving' && performance.score >= 85) {
      await awardBadge('problem_solver');
    } else if (activityType === 'resilience_test' && performance.attempts > 3 && performance.completed) {
      await awardBadge('resilience_champion');
    } else if (activityType === 'mindfulness_practice' && performance.duration >= 10) {
      await awardBadge('mindfulness_guru');
    }
    
    // Verificación de insignias de habilidades sociales
    if (activityType === 'team_project' && performance.teamScore >= 90) {
      await awardBadge('team_synergy');
    } else if (activityType === 'debate_mediation' && performance.conflictsResolved >= 3) {
      await awardBadge('conflict_mediator');
    } else if (activityType === 'community_activity' && performance.contributions >= 5) {
      await awardBadge('community_builder');
    } else if (activityType === 'active_listening' && performance.score >= 85) {
      await awardBadge('active_listener');
    }
  };

  // Actualizar progreso semanal
  const updateWeeklyProgress = async (progress) => {
    if (!user) return;

    try {
      const updates = {
        'gameData.weeklyMissionStatus.progress': progress,
        'gameData.weeklyMissionStatus.completed': progress >= 100
      };

      await updateUserProfile(updates);

      setGameData(prev => ({
        ...prev,
        weeklyMissionStatus: {
          ...prev.weeklyMissionStatus,
          progress,
          completed: progress >= 100
        }
      }));

      // Si completó la misión semanal, otorgar XP bonus
      if (progress >= 100) {
        await awardXP(XP_REWARDS.session_completion, 'weekly_mission_complete');
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating weekly progress:', error);
      return { success: false, error: error.message };
    }
  };

  // Mostrar celebración de subida de nivel
  const showLevelUpCelebration = (newLevel) => {
    // Implementar notificación/modal de celebración
    console.log(`¡Felicidades! Has alcanzado el nivel ${newLevel}: ${getLevelName(newLevel)}`);
  };

  // Mostrar celebración de insignia obtenida
  const showBadgeEarnedCelebration = (badge) => {
    // Implementar notificación/modal de celebración
    console.log(`¡Nueva insignia obtenida! ${badge.name}: ${badge.description}`);
  };

  // Obtener progreso hacia el siguiente nivel
  const getProgressToNextLevel = () => {
    if (!gameData) return { current: 0, next: 100, percentage: 0 };

    const currentLevel = gameData.level;
    const currentXP = gameData.totalXP;
    
    if (currentLevel >= LEVEL_THRESHOLDS.length) {
      return { current: currentXP, next: currentXP, percentage: 100 };
    }

    const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1];
    const nextThreshold = LEVEL_THRESHOLDS[currentLevel];
    const progress = currentXP - currentThreshold;
    const total = nextThreshold - currentThreshold;
    const percentage = Math.round((progress / total) * 100);

    return {
      current: progress,
      next: total,
      percentage: Math.min(percentage, 100)
    };
  };

  // Obtener todas las insignias disponibles
  const getAllBadges = () => {
    return [
      ...BADGES.philosophers,
      ...BADGES.skills,
      ...BADGES.achievements,
      ...BADGES.lifeSkills,
      ...BADGES.socialSkills
    ];
  };

  // Obtener insignias por categoría
  const getBadgesByCategory = (category) => {
    return BADGES[category] || [];
  };

  const value = {
    gameData,
    loading,
    awardXP,
    awardBadge,
    unlockContent,
    isContentUnlocked,
    completeActivity,
    updateWeeklyProgress,
    calculateLevel,
    getLevelName,
    getProgressToNextLevel,
    getAllBadges,
    getBadgesByCategory,
    XP_REWARDS,
    BADGES,
    LEVEL_NAMES
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

