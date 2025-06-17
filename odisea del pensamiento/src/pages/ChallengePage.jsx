import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  CheckCircle, 
  Brain,
  Users,
  Heart,
  Lightbulb,
  MessageCircle,
  Award,
  Sparkles,
  Trophy,
  Zap,
  Target,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const ChallengePage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { gameData, completeActivity } = useGame();
  const [completed, setCompleted] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [reflection, setReflection] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Variables para el contador de palabras
  const minWordCount = 50;
  const wordCount = reflection.trim() ? reflection.trim().split(/\s+/).length : 0;
  const wordCountProgress = Math.min(100, (wordCount / minWordCount) * 100);

  // Simulación de carga del desafío desde la base de datos
  useEffect(() => {
    // En una implementación real, aquí se cargarían los datos del desafío desde Firebase
    const loadChallenge = () => {
      setLoading(true);
      
      // Ejemplos de desafíos
      const challengesData = {
        'daily_reflection': {
          id: 'daily_reflection',
          title: 'Diario de Reflexión',
          type: 'reflection',
          category: 'lifeSkills',
          icon: '🧘',
          estimatedTime: 10,
          xpReward: 15,
          badgeId: 'mindfulness_guru',
          description: 'Desarrolla el hábito de la reflexión diaria para conectar la filosofía con tu vida cotidiana.',
          instructions: 'Escribe una reflexión sobre cómo un concepto filosófico que hayas aprendido se aplica a una situación de tu vida diaria.',
          prompts: [
            '¿Qué situación de tu vida cotidiana te ha hecho pensar en un concepto filosófico?',
            '¿Cómo cambió tu perspectiva después de aplicar este concepto?',
            '¿Qué acciones concretas puedes tomar basándote en esta reflexión?'
          ],
          tips: [
            'Sé específico sobre la situación',
            'Conecta claramente con el concepto filosófico',
            'Reflexiona sobre cómo esto cambia tu forma de pensar'
          ],
          categoryIcon: <Brain className="h-5 w-5" />
        },
        'logical_fallacies': {
          id: 'logical_fallacies',
          title: 'Detector de Falacias',
          type: 'challenge',
          category: 'criticalThinking',
          icon: '🔍',
          estimatedTime: 20,
          xpReward: 25,
          badgeId: 'critical_thinker',
          description: 'Aprende a identificar falacias lógicas en argumentos cotidianos para mejorar tu pensamiento crítico.',
          instructions: 'Identifica las falacias lógicas en los siguientes argumentos y explica por qué son erróneos.',
          examples: [
            {
              argument: 'Si permitimos el matrimonio entre personas del mismo sexo, pronto la gente querrá casarse con animales.',
              fallacy: 'Pendiente resbaladiza',
              explanation: 'Asume incorrectamente que un cambio llevará inevitablemente a una cadena de eventos indeseables sin evidencia.'
            },
            {
              argument: 'Mi profesor dice que este libro es excelente, así que debe serlo.',
              fallacy: 'Apelación a la autoridad',
              explanation: 'Acepta algo como verdadero solo porque una figura de autoridad lo afirma, sin evaluar el mérito del argumento.'
            }
          ],
          task: 'Encuentra al menos dos ejemplos de falacias lógicas en medios de comunicación, redes sociales o conversaciones. Identifica qué tipo de falacia es y explica por qué es problemática.',
          categoryIcon: <Lightbulb className="h-5 w-5" />
        },
        'philosophical_debate': {
          id: 'philosophical_debate',
          title: 'Debate Filosófico',
          type: 'debate',
          category: 'social',
          icon: '🗣️',
          estimatedTime: 45,
          xpReward: 35,
          badgeId: 'debate_champion',
          description: 'Desarrolla habilidades de argumentación y diálogo respetuoso a través del debate filosófico.',
          instructions: 'Organiza un mini-debate con compañeros sobre un tema filosófico y practica la argumentación respetuosa.',
          debateTopics: [
            '¿Es la felicidad o el conocimiento el fin último de la vida humana?',
            '¿Existe el libre albedrío o nuestras acciones están determinadas?',
            '¿Tienen los animales derechos morales similares a los humanos?'
          ],
          debateRules: [
            'Cada participante tiene 2 minutos para presentar su argumento inicial',
            'Escucha activamente sin interrumpir',
            'Critica ideas, no personas',
            'Busca puntos en común, no solo diferencias'
          ],
          reflection: 'Después del debate, reflexiona sobre: ¿Qué aprendiste de las perspectivas de los demás? ¿Cambió tu opinión en algún aspecto? ¿Qué habilidades de comunicación necesitas mejorar?',
          categoryIcon: <Users className="h-5 w-5" />
        },
        'empathy_exercise': {
          id: 'empathy_exercise',
          title: 'Ejercicio de Empatía',
          type: 'empathy_challenge',
          category: 'emotional',
          icon: '❤️',
          estimatedTime: 20,
          xpReward: 20,
          badgeId: 'empathy_master',
          description: 'Desarrolla tu inteligencia emocional aprendiendo a ver situaciones desde múltiples perspectivas.',
          instructions: 'Analiza una situación de conflicto desde diferentes puntos de vista para desarrollar empatía.',
          scenario: 'Un estudiante acusa a otro de copiar su trabajo. El acusado niega haberlo hecho, pero hay similitudes en ambos trabajos.',
          perspectives: [
            'El estudiante que hace la acusación',
            'El estudiante acusado',
            'Un amigo común de ambos',
            'El profesor que debe resolver la situación'
          ],
          task: 'Escribe un breve párrafo desde cada una de estas perspectivas, considerando sus emociones, motivaciones y preocupaciones.',
          reflection: '¿Qué aprendiste al ponerte en el lugar de cada persona? ¿Cómo cambió tu comprensión de la situación? ¿Cómo podrías aplicar esto en tus propios conflictos?',
          categoryIcon: <Heart className="h-5 w-5" />
        }
      };
      
      // Buscar el desafío por ID
      if (challengesData[challengeId]) {
        setChallenge(challengesData[challengeId]);
      } else {
        // Desafío no encontrado, usar uno por defecto
        setChallenge(challengesData['daily_reflection']);
      }
      
      setLoading(false);
    };
    
    loadChallenge();
  }, [challengeId]);

  // Referencia para el efecto de confeti
  const confettiRef = useRef(null);
  
  // Eliminar definiciones duplicadas de las variables de contador de palabras
  
  const handleSubmit = () => {
    if (reflection.trim() && wordCount >= minWordCount) {
      // Lanzar confeti
      const launchConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          // Lanzar confeti desde ambos lados
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);
      };

      // Mostrar retroalimentación con animación
      setShowFeedback(true);
      setCompleted(true);
      
      // Lanzar confeti después de un breve retraso
      setTimeout(() => {
        launchConfetti();
      }, 500);
      
      // En una implementación real, aquí se guardaría el progreso
      // completeActivity(challenge.id, challenge.type, { score: 100 });
    }
  };

  const handleComplete = () => {
    // Aquí se guardaría el progreso y se otorgarían puntos XP
    navigate('/challenges');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Cargando desafío...</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center">
        <div className="text-white text-center">
          <p>Desafío no encontrado</p>
          <button 
            onClick={() => navigate('/challenges')}
            className="mt-4 bg-gradient-gold text-deep-blue px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Volver a Desafíos
          </button>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-mystical">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate('/challenges')}
              className="text-white hover:text-gold transition-colors inline-flex items-center space-x-2 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver a Desafíos</span>
            </button>
          </div>

          {/* Feedback */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 parchment-texture shadow-2xl">
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.3 
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <motion.h1 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-3xl font-cinzel text-deep-blue mb-2"
                  >
                    ¡Desafío Completado!
                  </motion.h1>
                  <motion.p 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 font-playfair"
                  >
                    Has ganado {challenge.xpReward} puntos XP
                  </motion.p>
                </div>

                {/* Retroalimentación */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-lg p-6 border border-gold/30 mb-6"
                >
                  <h3 className="text-xl font-playfair text-deep-blue mb-4">
                    Reflexión sobre el Desafío
                  </h3>
                  
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Has completado con éxito el desafío "{challenge.title}". Este tipo de ejercicios te ayuda a desarrollar habilidades importantes para la vida:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      {challenge.category === 'lifeSkills' && (
                        <>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <strong>Autoconciencia:</strong> La reflexión diaria te ayuda a comprender mejor tus pensamientos y acciones.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <strong>Pensamiento aplicado:</strong> Has practicado cómo aplicar conceptos filosóficos a situaciones reales.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <strong>Hábitos de reflexión:</strong> Estás desarrollando una práctica valiosa para el crecimiento personal continuo.
                          </motion.li>
                        </>
                      )}
                      {challenge.category === 'criticalThinking' && (
                        <>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <strong>Análisis crítico:</strong> Has aprendido a identificar errores en el razonamiento.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <strong>Evaluación de argumentos:</strong> Puedes distinguir entre argumentos sólidos y falacias.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <strong>Pensamiento independiente:</strong> Estás desarrollando la capacidad de evaluar información por ti mismo.
                          </motion.li>
                        </>
                      )}
                      {challenge.category === 'social' && (
                        <>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <strong>Comunicación efectiva:</strong> Has practicado expresar ideas complejas de manera clara.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <strong>Escucha activa:</strong> Has aprendido a considerar perspectivas diferentes a la tuya.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <strong>Argumentación respetuosa:</strong> Puedes defender tus ideas respetando a los demás.
                          </motion.li>
                        </>
                      )}
                      {challenge.category === 'emotional' && (
                        <>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <strong>Empatía:</strong> Has practicado ponerte en el lugar de otras personas.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <strong>Inteligencia emocional:</strong> Estás desarrollando la capacidad de reconocer y comprender emociones.
                          </motion.li>
                          <motion.li 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <strong>Resolución de conflictos:</strong> Has aprendido a ver situaciones desde múltiples ángulos.
                          </motion.li>
                        </>
                      )}
                    </ul>
                  </div>
                </motion.div>

                {/* Tu reflexión */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6"
                >
                  <h3 className="text-lg font-playfair text-deep-blue mb-3">
                    Tu Reflexión
                  </h3>
                  <p className="text-gray-700 italic">
                    "{reflection}"
                  </p>
                </motion.div>

                {/* Pregunta de seguimiento */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-purple-50 rounded-lg p-6 border border-purple-200 mb-8"
                >
                  <h3 className="text-lg font-playfair text-deep-blue mb-3">
                    Para Seguir Creciendo
                  </h3>
                  <p className="text-gray-700">
                    ¿Cómo podrías aplicar lo que has aprendido en este desafío en otras áreas de tu vida? 
                    Considera establecer un pequeño objetivo para practicar esta habilidad durante la próxima semana.
                  </p>
                </motion.div>

                {/* Botones de acción */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className="bg-gradient-gold text-deep-blue px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <Sparkles className="inline-block mr-2 h-5 w-5" /> Explorar Más Desafíos
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border-2 border-deep-blue text-deep-blue px-8 py-3 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition-colors"
                  >
                    <Award className="inline-block mr-2 h-5 w-5" /> Compartir Logro
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/challenges')}
            className="text-white hover:text-gold transition-colors inline-flex items-center space-x-2 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver a Desafíos</span>
          </button>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-gold/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-cinzel text-white mb-1">
                  {challenge.title}
                </h1>
                <p className="text-gold/80 text-sm flex items-center">
                  <span className="mr-2">{challenge.icon}</span>
                  <span className="mr-2">{challenge.category === 'lifeSkills' ? 'Habilidades para la Vida' : 
                         challenge.category === 'criticalThinking' ? 'Pensamiento Crítico' : 
                         challenge.category === 'social' ? 'Socialización' : 
                         'Inteligencia Emocional'}</span>
                  • {challenge.estimatedTime} minutos • {challenge.xpReward} XP
                </p>
              </div>
              <div className="flex items-center space-x-4 text-white/70">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{challenge.estimatedTime} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">{challenge.xpReward} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del desafío */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 parchment-texture shadow-2xl">
          {/* Introducción */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-deep-blue to-deep-blue/80 p-4 rounded-full text-white">
                {challenge.categoryIcon}
              </div>
            </div>
            <h2 className="text-2xl font-playfair text-deep-blue mb-4 text-center">
              {challenge.title}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {challenge.description}
            </p>
          </div>

          {/* Instrucciones */}
          <div className="bg-gradient-to-r from-blue/20 to-blue/10 rounded-lg p-6 border border-blue/30 mb-8">
            <h3 className="text-lg font-playfair text-deep-blue mb-3">
              Instrucciones
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {challenge.instructions}
            </p>

            {/* Contenido específico según el tipo de desafío */}
            {challenge.type === 'reflection' && (
              <div className="mt-4 space-y-4">
                <h4 className="font-medium text-deep-blue">Preguntas para guiar tu reflexión:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {challenge.prompts.map((prompt, index) => (
                    <li key={index}>{prompt}</li>
                  ))}
                </ul>
                
                {/* Área de reflexión con contador de palabras */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-deep-blue">Tu reflexión:</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${wordCount >= minWordCount ? 'text-green-600' : 'text-gray-600'}`}>
                        {wordCount}/{minWordCount} palabras
                      </span>
                      {wordCount >= minWordCount && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="h-2 w-full bg-gray-200 rounded-full mb-3 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${wordCountProgress}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  </div>
                  
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Escribe tu reflexión aquí..."
                    className="w-full h-40 p-4 border border-blue/30 rounded-lg focus:ring-2 focus:ring-blue/50 focus:border-blue/50 transition-all"
                    required
                  />
                  
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={wordCount < minWordCount}
                      className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 ${wordCount >= minWordCount ? 'bg-gradient-gold text-deep-blue' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                    >
                      <span>Enviar reflexión</span>
                      {wordCount >= minWordCount && <Sparkles className="h-4 w-4" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {challenge.type === 'challenge' && (
              <div className="mt-4 space-y-4">
                <h4 className="font-medium text-deep-blue">Ejemplos de falacias lógicas:</h4>
                <div className="space-y-3">
                  {challenge.examples.map((example, index) => (
                    <div key={index} className="bg-white/80 p-4 rounded-lg">
                      <p className="italic mb-2">