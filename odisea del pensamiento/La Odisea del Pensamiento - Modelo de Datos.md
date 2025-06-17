# La Odisea del Pensamiento - Modelo de Datos

## 1. Estructura de Base de Datos (Firestore)

### 1.1 Colección: users
```javascript
{
  uid: string, // Firebase Auth UID
  type: 'student' | 'teacher',
  profile: {
    name: string,
    email: string,
    nickname: string, // Para estudiantes, usado en debates
    school: string,
    grade: string,
    createdAt: timestamp
  },
  // Solo para estudiantes
  gameData: {
    totalXP: number,
    level: number,
    badges: [
      {
        id: string,
        name: string,
        description: string,
        earnedAt: timestamp,
        category: 'philosopher' | 'skill' | 'achievement'
      }
    ],
    currentSemester: 1 | 2,
    unlockedContent: [string], // Array de IDs de contenido desbloqueado
    weeklyMissionStatus: {
      currentWeek: number,
      completed: boolean,
      progress: number // 0-100
    }
  }
}
```

### 1.2 Colección: content
```javascript
{
  id: string, // Identificador único del contenido
  type: 'semester' | 'partial' | 'theme' | 'session' | 'activity',
  parentId: string, // ID del contenido padre
  order: number, // Orden dentro del nivel
  title: string,
  description: string,
  
  // Metadatos pedagógicos
  pedagogicalData: {
    estimatedTime: number, // minutos
    difficulty: 1 | 2 | 3,
    skills: [string], // habilidades que desarrolla
    prerequisites: [string], // IDs de contenido prerequisito
    xpReward: number
  },
  
  // Solo para actividades
  activityData: {
    type: 'ethical_dilemma' | 'timeline' | 'chatbot' | 'text_generator' | 'quiz' | 'debate_wall',
    config: {
      // Configuración específica por tipo de actividad
      // Ver sección 2 para detalles
    }
  },
  
  // Contenido educativo
  content: {
    introduction: string, // Texto introductorio
    philosopherIntro: string, // Pregunta conectora para adolescentes
    mainContent: string, // Contenido principal
    reflection: string, // Pregunta de reflexión final
    resources: [
      {
        type: 'text' | 'image' | 'video' | 'link',
        url: string,
        title: string,
        description: string
      }
    ]
  },
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 1.3 Colección: user_progress
```javascript
{
  id: string, // {userId}_{contentId}
  userId: string,
  contentId: string,
  contentType: string,
  
  progress: {
    status: 'not_started' | 'in_progress' | 'completed',
    completedAt: timestamp,
    attempts: number,
    timeSpent: number, // segundos
    xpEarned: number
  },
  
  // Solo para actividades
  activityData: {
    responses: [
      {
        questionId: string,
        answer: any, // Tipo depende de la actividad
        timestamp: timestamp,
        isCorrect: boolean // Para quizzes
      }
    ],
    finalScore: number,
    feedback: string
  }
}
```

### 1.4 Colección: debate_responses
```javascript
{
  id: string,
  activityId: string,
  userId: string,
  userNickname: string,
  
  response: {
    text: string,
    timestamp: timestamp
  },
  
  votes: {
    count: number,
    voters: [string] // Array de userIds que votaron
  },
  
  moderation: {
    status: 'pending' | 'approved' | 'rejected',
    moderatedBy: string, // teacherId
    moderatedAt: timestamp
  }
}
```

### 1.5 Colección: teacher_settings
```javascript
{
  teacherId: string,
  
  classrooms: [
    {
      id: string,
      name: string,
      students: [string], // Array de userIds
      currentSemester: 1 | 2,
      settings: {
        allowDebates: boolean,
        moderateResponses: boolean,
        showStudentProgress: boolean
      }
    }
  ],
  
  notifications: {
    newResponses: boolean,
    studentProgress: boolean,
    weeklyReports: boolean
  }
}
```

## 2. Configuraciones de Actividades

### 2.1 Dilemas Éticos (ethical_dilemma)
```javascript
{
  scenario: string, // Descripción del dilema
  options: [
    {
      id: string,
      text: string,
      philosophicalBasis: string // Explicación filosófica de la opción
    }
  ],
  followUpQuestion: string, // Pregunta para justificación escrita
  feedback: {
    [optionId]: {
      immediate: string, // Retroalimentación inmediata
      philosophical: string, // Conexión con filósofos
      reflection: string // Pregunta adicional de reflexión
    }
  }
}
```

### 2.2 Líneas de Tiempo (timeline)
```javascript
{
  title: string,
  items: [
    {
      id: string,
      text: string,
      date: string,
      category: 'philosopher' | 'event' | 'work',
      correctPosition: number
    }
  ],
  instructions: string,
  feedback: {
    correct: string,
    partial: string,
    incorrect: string
  }
}
```

### 2.3 Chatbot Filosófico (chatbot)
```javascript
{
  philosopher: {
    name: string,
    avatar: string,
    personality: string,
    greeting: string
  },
  conversation: [
    {
      id: string,
      trigger: string, // Palabra clave o contexto
      response: string,
      followUp: [string], // Posibles preguntas de seguimiento
      philosophicalConcept: string
    }
  ],
  objectives: [string], // Conceptos que debe cubrir la conversación
  maxTurns: number
}
```

### 2.4 Generador de Texto (text_generator)
```javascript
{
  prompt: string, // Instrucciones para el estudiante
  type: 'creative' | 'reflective' | 'analytical',
  minWords: number,
  maxWords: number,
  guidelines: [string], // Criterios de evaluación
  examples: [
    {
      title: string,
      text: string,
      analysis: string // Por qué es un buen ejemplo
    }
  ],
  rubric: {
    criteria: [
      {
        name: string,
        description: string,
        maxPoints: number
      }
    ]
  }
}
```

### 2.5 Quiz Rápido (quiz)
```javascript
{
  questions: [
    {
      id: string,
      type: 'multiple_choice' | 'true_false' | 'fill_blank',
      question: string,
      options: [string], // Para multiple choice
      correctAnswer: string | number,
      explanation: string,
      hint: string, // Para respuestas incorrectas
      difficulty: 1 | 2 | 3,
      concept: string // Concepto filosófico que evalúa
    }
  ],
  settings: {
    randomizeQuestions: boolean,
    randomizeOptions: boolean,
    allowRetake: boolean,
    showCorrectAnswers: boolean
  }
}
```

### 2.6 Muro de Debate (debate_wall)
```javascript
{
  question: string,
  description: string,
  guidelines: [string], // Reglas de participación
  settings: {
    allowVoting: boolean,
    requireModeration: boolean,
    maxResponseLength: number,
    allowReplies: boolean
  },
  categories: [string], // Para organizar respuestas
  featured: [string] // IDs de respuestas destacadas por el profesor
}
```

## 3. Sistema de Gamificación

### 3.1 Cálculo de XP
```javascript
const XP_REWARDS = {
  activity_completion: 10,
  first_attempt_correct: 5,
  creative_response: 15,
  debate_participation: 8,
  vote_received: 2,
  session_completion: 20,
  theme_completion: 50,
  partial_completion: 100
};

const LEVEL_THRESHOLDS = [
  0,    // Nivel 1: Aprendiz Navegante
  100,  // Nivel 2: Explorador Curioso
  250,  // Nivel 3: Buscador de Sabiduría
  450,  // Nivel 4: Pensador Crítico
  700,  // Nivel 5: Filósofo en Formación
  1000, // Nivel 6: Maestro del Pensamiento
];
```

### 3.2 Sistema de Insignias
```javascript
const BADGES = {
  philosophers: [
    {
      id: 'socrates_questioner',
      name: 'Insignia de la Pregunta Socrática',
      description: 'Has dominado el arte de hacer las preguntas correctas',
      requirement: 'complete_socrates_activities',
      icon: 'socrates-icon.svg'
    },
    {
      id: 'plato_idealist',
      name: 'Medalla del Mundo de las Ideas',
      description: 'Has explorado las profundidades del pensamiento platónico',
      requirement: 'complete_plato_activities',
      icon: 'plato-icon.svg'
    }
    // ... más insignias por filósofo
  ],
  skills: [
    {
      id: 'critical_thinker',
      name: 'Pensador Crítico',
      description: 'Has demostrado excelencia en el análisis de dilemas éticos',
      requirement: 'ethical_dilemmas_mastery',
      icon: 'critical-thinking.svg'
    },
    {
      id: 'creative_writer',
      name: 'Escritor Filosófico',
      description: 'Tus reflexiones escritas muestran profundidad y creatividad',
      requirement: 'creative_writing_excellence',
      icon: 'writing.svg'
    }
  ],
  achievements: [
    {
      id: 'early_bird',
      name: 'Madrugador del Pensamiento',
      description: 'Completaste actividades antes del plazo',
      requirement: 'early_completion_streak',
      icon: 'early-bird.svg'
    },
    {
      id: 'debate_champion',
      name: 'Campeón del Debate',
      description: 'Tus respuestas han recibido muchos votos positivos',
      requirement: 'debate_votes_threshold',
      icon: 'debate.svg'
    }
  ]
};
```

## 4. Estructura de Contenido Curricular

### 4.1 Mapeo del Currículo
```javascript
const CURRICULUM_STRUCTURE = {
  semester1: {
    id: 'sem1',
    title: 'Primer Semestre',
    partials: [
      {
        id: 'sem1_p1',
        title: 'Las Grandes Preguntas de la Humanidad',
        weeks: 4,
        themes: [
          {
            id: 'sem1_p1_t1',
            title: '¿Cómo Explicamos el Mundo? - Del Mito a la Razón',
            weeks: 2,
            sessions: [
              {
                id: 'sem1_p1_t1_s1',
                title: 'Las preguntas que todos nos hacemos',
                activities: ['intro_questions', 'personal_reflection']
              },
              {
                id: 'sem1_p1_t1_s2',
                title: 'Los mitos griegos: primeras respuestas',
                activities: ['myth_analysis', 'create_modern_myth']
              }
              // ... más sesiones
            ]
          }
          // ... más temas
        ]
      }
      // ... más parciales
    ]
  },
  semester2: {
    // Estructura similar para segundo semestre
  }
};
```

### 4.2 Progresión y Desbloqueo
```javascript
const UNLOCK_RULES = {
  // Reglas para desbloquear contenido
  session: {
    requirement: 'previous_session_completed',
    exception: 'first_session_of_theme'
  },
  theme: {
    requirement: 'previous_theme_80_percent',
    exception: 'first_theme_of_partial'
  },
  partial: {
    requirement: 'previous_partial_completed',
    exception: 'first_partial_of_semester'
  },
  semester: {
    requirement: 'previous_semester_completed'
  }
};
```

## 5. APIs y Servicios

### 5.1 Servicios de Autenticación
```javascript
// Firebase Authentication
const authService = {
  registerStudent: (email, password, profile) => {},
  loginStudent: (email, password) => {},
  loginTeacher: (masterPassword) => {},
  logout: () => {},
  getCurrentUser: () => {},
  updateProfile: (updates) => {}
};
```

### 5.2 Servicios de Datos
```javascript
// Firestore Services
const dataService = {
  // Contenido
  getContent: (contentId) => {},
  getContentByType: (type, parentId) => {},
  
  // Progreso
  getUserProgress: (userId) => {},
  updateProgress: (userId, contentId, progressData) => {},
  
  // Gamificación
  updateXP: (userId, xpAmount) => {},
  awardBadge: (userId, badgeId) => {},
  
  // Debates
  submitDebateResponse: (activityId, userId, response) => {},
  voteResponse: (responseId, userId) => {},
  getDebateResponses: (activityId) => {},
  
  // Profesor
  getStudentList: (teacherId) => {},
  getStudentProgress: (studentId) => {},
  getActivityResponses: (activityId) => {}
};
```

Esta estructura de datos está diseñada para ser escalable, eficiente y alineada con los principios pedagógicos del proyecto. Cada colección está optimizada para las consultas más frecuentes y permite un crecimiento futuro sin reestructuración mayor.

