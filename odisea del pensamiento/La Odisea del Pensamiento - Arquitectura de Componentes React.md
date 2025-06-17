# La Odisea del Pensamiento - Arquitectura de Componentes React

## 1. Estructura de Carpetas del Proyecto

```
la-odisea-del-pensamiento/
├── public/
│   ├── icons/
│   ├── images/
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── student/
│   │   ├── teacher/
│   │   └── activities/
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   ├── data/
│   └── App.jsx
├── firebase.json
├── firestore.rules
└── package.json
```

## 2. Componentes Principales

### 2.1 Componentes Comunes (src/components/common/)

#### Layout.jsx
```jsx
// Componente principal de layout
const Layout = ({ children, userType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navigation userType={userType} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
```

#### Navigation.jsx
```jsx
// Navegación adaptativa para estudiante/profesor
const Navigation = ({ userType }) => {
  const studentNavItems = [
    { path: '/dashboard', label: 'Mi Odisea', icon: 'map' },
    { path: '/profile', label: 'Mi Diario', icon: 'book' },
    { path: '/badges', label: 'Insignias', icon: 'star' }
  ];
  
  const teacherNavItems = [
    { path: '/teacher/dashboard', label: 'Observatorio', icon: 'dashboard' },
    { path: '/teacher/students', label: 'Estudiantes', icon: 'users' },
    { path: '/teacher/activities', label: 'Actividades', icon: 'clipboard' }
  ];
  
  // Implementación de navegación responsiva
};
```

#### LoadingSpinner.jsx
```jsx
// Spinner temático de navegación
const LoadingSpinner = ({ message = "Navegando por el tiempo..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold-400 border-t-transparent"></div>
      <p className="mt-4 text-gold-300 font-medieval">{message}</p>
    </div>
  );
};
```

#### Modal.jsx
```jsx
// Modal reutilizable con animaciones
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  // Implementación con portal y animaciones
};
```

### 2.2 Componentes de Estudiante (src/components/student/)

#### StudentDashboard.jsx
```jsx
// Dashboard principal del estudiante
const StudentDashboard = () => {
  const { user, progress, currentMission } = useStudent();
  
  return (
    <div className="space-y-8">
      <WelcomeHeader user={user} />
      <ProgressMap progress={progress} />
      <CurrentMission mission={currentMission} />
      <RecentAchievements />
    </div>
  );
};
```

#### ProgressMap.jsx
```jsx
// Mapa visual de progreso tipo videojuego
const ProgressMap = ({ progress }) => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  
  return (
    <div className="bg-parchment rounded-lg p-6 shadow-lg">
      <SemesterSelector 
        selected={selectedSemester} 
        onChange={setSelectedSemester} 
      />
      <div className="relative">
        <MapBackground />
        {progress.partials.map(partial => (
          <PartialIsland 
            key={partial.id}
            partial={partial}
            onClick={() => navigateToPartial(partial.id)}
          />
        ))}
        <NavigatorShip position={progress.currentPosition} />
      </div>
    </div>
  );
};
```

#### StudentProfile.jsx
```jsx
// Perfil y diario del navegante
const StudentProfile = () => {
  const { user, badges, writings } = useStudent();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ProfileCard user={user} />
        <BadgeCollection badges={badges} />
      </div>
      <div className="lg:col-span-2">
        <WritingJournal writings={writings} />
      </div>
    </div>
  );
};
```

### 2.3 Componentes de Profesor (src/components/teacher/)

#### TeacherDashboard.jsx
```jsx
// Dashboard del profesor
const TeacherDashboard = () => {
  const { students, analytics } = useTeacher();
  
  return (
    <div className="space-y-8">
      <AnalyticsOverview analytics={analytics} />
      <StudentProgressGrid students={students} />
      <RecentActivity />
    </div>
  );
};
```

#### StudentProgressGrid.jsx
```jsx
// Grid de progreso de estudiantes
const StudentProgressGrid = ({ students }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map(student => (
        <StudentCard 
          key={student.id}
          student={student}
          onClick={() => viewStudentDetail(student.id)}
        />
      ))}
    </div>
  );
};
```

### 2.4 Componentes de Actividades (src/components/activities/)

#### ActivityContainer.jsx
```jsx
// Contenedor base para todas las actividades
const ActivityContainer = ({ activity, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState({});
  
  const ActivityComponent = getActivityComponent(activity.type);
  
  return (
    <div className="max-w-4xl mx-auto">
      <ActivityHeader activity={activity} progress={progress} />
      <ActivityComponent 
        config={activity.config}
        onProgress={setProgress}
        onResponse={setResponses}
        onComplete={onComplete}
      />
      <ActivityFooter />
    </div>
  );
};
```

#### EthicalDilemma.jsx
```jsx
// Componente para dilemas éticos
const EthicalDilemma = ({ config, onResponse, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [justification, setJustification] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleSubmit = () => {
    onResponse({
      selectedOption,
      justification,
      timestamp: new Date()
    });
    setShowFeedback(true);
  };
  
  return (
    <div className="space-y-6">
      <ScenarioCard scenario={config.scenario} />
      <OptionsGrid 
        options={config.options}
        selected={selectedOption}
        onSelect={setSelectedOption}
      />
      <JustificationInput 
        value={justification}
        onChange={setJustification}
        placeholder={config.followUpQuestion}
      />
      {!showFeedback ? (
        <SubmitButton onClick={handleSubmit} disabled={!selectedOption || !justification} />
      ) : (
        <FeedbackPanel 
          feedback={config.feedback[selectedOption]}
          onContinue={onComplete}
        />
      )}
    </div>
  );
};
```

#### InteractiveTimeline.jsx
```jsx
// Componente para líneas de tiempo interactivas
const InteractiveTimeline = ({ config, onResponse, onComplete }) => {
  const [items, setItems] = useState(shuffleArray(config.items));
  const [userOrder, setUserOrder] = useState([]);
  const [feedback, setFeedback] = useState(null);
  
  const handleDrop = (draggedItem, targetIndex) => {
    // Lógica de drag & drop
  };
  
  const checkAnswer = () => {
    const score = calculateTimelineScore(userOrder, config.items);
    setFeedback(generateTimelineFeedback(score, config.feedback));
  };
  
  return (
    <div className="space-y-6">
      <TimelineInstructions instructions={config.instructions} />
      <DragDropTimeline 
        items={items}
        onDrop={handleDrop}
      />
      <CheckButton onClick={checkAnswer} />
      {feedback && (
        <TimelineFeedback 
          feedback={feedback}
          onContinue={onComplete}
        />
      )}
    </div>
  );
};
```

#### PhilosophicalChatbot.jsx
```jsx
// Chatbot filosófico simulado
const PhilosophicalChatbot = ({ config, onResponse, onComplete }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: config.philosopher.greeting }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [conversationState, setConversationState] = useState('active');
  
  const handleSendMessage = () => {
    const userMessage = { sender: 'user', text: currentInput };
    const botResponse = generateBotResponse(currentInput, config.conversation);
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setCurrentInput('');
    
    // Verificar si se completaron los objetivos
    if (checkConversationObjectives(messages, config.objectives)) {
      setConversationState('completed');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <PhilosopherAvatar philosopher={config.philosopher} />
      <ChatWindow messages={messages} />
      <ChatInput 
        value={currentInput}
        onChange={setCurrentInput}
        onSend={handleSendMessage}
        disabled={conversationState === 'completed'}
      />
      {conversationState === 'completed' && (
        <ConversationSummary 
          messages={messages}
          objectives={config.objectives}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};
```

#### TextGenerator.jsx
```jsx
// Generador de texto creativo
const TextGenerator = ({ config, onResponse, onComplete }) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showRubric, setShowRubric] = useState(false);
  
  const handleTextChange = (value) => {
    setText(value);
    setWordCount(countWords(value));
  };
  
  const handleSubmit = () => {
    onResponse({
      text,
      wordCount,
      timestamp: new Date()
    });
    onComplete();
  };
  
  return (
    <div className="space-y-6">
      <PromptCard prompt={config.prompt} />
      <ExamplesCarousel examples={config.examples} />
      <TextEditor 
        value={text}
        onChange={handleTextChange}
        placeholder="Comienza tu reflexión aquí..."
        minWords={config.minWords}
        maxWords={config.maxWords}
      />
      <WritingStats 
        wordCount={wordCount}
        minWords={config.minWords}
        maxWords={config.maxWords}
      />
      <div className="flex justify-between">
        <RubricButton onClick={() => setShowRubric(true)} />
        <SubmitButton 
          onClick={handleSubmit}
          disabled={wordCount < config.minWords}
        />
      </div>
      {showRubric && (
        <RubricModal 
          rubric={config.rubric}
          onClose={() => setShowRubric(false)}
        />
      )}
    </div>
  );
};
```

#### QuickQuiz.jsx
```jsx
// Quiz rápido con retroalimentación
const QuickQuiz = ({ config, onResponse, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowFeedback(true);
  };
  
  const nextQuestion = () => {
    if (currentQuestion < config.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <QuizProgress 
        current={currentQuestion + 1}
        total={config.questions.length}
      />
      <QuestionCard 
        question={config.questions[currentQuestion]}
        onAnswer={handleAnswer}
        showFeedback={showFeedback}
        userAnswer={answers[config.questions[currentQuestion].id]}
      />
      {showFeedback && (
        <QuestionFeedback 
          question={config.questions[currentQuestion]}
          userAnswer={answers[config.questions[currentQuestion].id]}
          onNext={nextQuestion}
        />
      )}
      {quizComplete && (
        <QuizResults 
          questions={config.questions}
          answers={answers}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};
```

#### DebateWall.jsx
```jsx
// Muro de debate colaborativo
const DebateWall = ({ config, onResponse, onComplete }) => {
  const [responses, setResponses] = useState([]);
  const [userResponse, setUserResponse] = useState('');
  const [hasResponded, setHasResponded] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  
  const submitResponse = async () => {
    await debateService.submitResponse(config.id, userResponse);
    setHasResponded(true);
    setUserResponse('');
    loadResponses();
  };
  
  const voteResponse = async (responseId) => {
    await debateService.voteResponse(responseId);
    loadResponses();
  };
  
  return (
    <div className="space-y-6">
      <DebateQuestion question={config.question} />
      <DebateGuidelines guidelines={config.guidelines} />
      
      {!hasResponded ? (
        <ResponseForm 
          value={userResponse}
          onChange={setUserResponse}
          onSubmit={submitResponse}
          maxLength={config.settings.maxResponseLength}
        />
      ) : (
        <ThankYouMessage onContinue={onComplete} />
      )}
      
      <ResponseFilters 
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <ResponseList 
        responses={responses}
        onVote={voteResponse}
        sortBy={sortBy}
      />
    </div>
  );
};
```

## 3. Hooks Personalizados

### 3.1 useStudent.js
```javascript
// Hook para datos del estudiante
export const useStudent = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [badges, setBadges] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  
  // Lógica de carga y actualización de datos
  
  return {
    user,
    progress,
    badges,
    currentMission,
    updateProgress,
    earnBadge,
    completeActivity
  };
};
```

### 3.2 useTeacher.js
```javascript
// Hook para datos del profesor
export const useTeacher = () => {
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Lógica de gestión de datos del profesor
  
  return {
    students,
    analytics,
    selectedStudent,
    getStudentDetail,
    getActivityResponses,
    exportData
  };
};
```

### 3.3 useActivity.js
```javascript
// Hook para gestión de actividades
export const useActivity = (activityId) => {
  const [activity, setActivity] = useState(null);
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState({});
  
  const completeActivity = async (finalResponses) => {
    // Lógica de completación
    await activityService.complete(activityId, finalResponses);
    // Actualizar XP y badges
    await gamificationService.processCompletion(activityId);
  };
  
  return {
    activity,
    progress,
    responses,
    updateProgress,
    saveResponse,
    completeActivity
  };
};
```

## 4. Servicios (src/services/)

### 4.1 authService.js
```javascript
// Servicio de autenticación
export const authService = {
  registerStudent: async (email, password, profile) => {
    // Implementación con Firebase Auth
  },
  
  loginStudent: async (email, password) => {
    // Implementación de login
  },
  
  loginTeacher: async (masterPassword) => {
    // Autenticación especial para profesores
  },
  
  getCurrentUser: () => {
    // Obtener usuario actual
  }
};
```

### 4.2 contentService.js
```javascript
// Servicio de contenido
export const contentService = {
  getContent: async (contentId) => {
    // Obtener contenido específico
  },
  
  getContentTree: async (semesterId) => {
    // Obtener estructura completa
  },
  
  checkUnlockStatus: async (userId, contentId) => {
    // Verificar si el contenido está desbloqueado
  }
};
```

### 4.3 gamificationService.js
```javascript
// Servicio de gamificación
export const gamificationService = {
  awardXP: async (userId, amount, reason) => {
    // Otorgar puntos XP
  },
  
  checkBadgeEligibility: async (userId, activityId) => {
    // Verificar si merece insignias
  },
  
  updateLevel: async (userId) => {
    // Actualizar nivel basado en XP
  }
};
```

Esta arquitectura de componentes está diseñada para ser modular, reutilizable y fácil de mantener. Cada componente tiene una responsabilidad específica y utiliza los principios de React moderno con hooks y context para el manejo de estado.

