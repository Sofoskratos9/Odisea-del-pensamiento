import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Star, CheckCircle } from 'lucide-react';

const ActivityPage = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // Actividad de ejemplo - Dilema Ético de Maquiavelo
  const activity = {
    id: 'machiavelli_dilemma',
    title: 'El Dilema de Maquiavelo',
    type: 'ethical_dilemma',
    estimatedTime: 15,
    xpReward: 25,
    description: 'Explora los principios del realismo político a través de un dilema ético.',
    scenario: `Eres el gobernante de un reino en tiempos de crisis. Puedes elegir gobernar con mano dura para mantener el orden, pero causando sufrimiento; o actuar con compasión, arriesgando la estabilidad del reino.`,
    question: '¿Qué decisión tomarías y por qué?',
    options: [
      {
        id: 'order',
        text: 'Mantener el orden',
        description: 'Usar medidas estrictas para preservar la estabilidad',
        icon: '⚖️'
      },
      {
        id: 'pragmatic',
        text: 'Actuar con pragmatismo',
        description: 'Buscar un equilibrio entre firmeza y compasión',
        icon: '👑'
      },
      {
        id: 'compassion',
        text: 'Mostrar compasión',
        description: 'Priorizar el bienestar humano sobre la estabilidad',
        icon: '❤️'
      }
    ]
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [justification, setJustification] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    if (selectedOption && justification.trim()) {
      setShowFeedback(true);
      setCompleted(true);
    }
  };

  const handleComplete = () => {
    // Aquí se guardaría el progreso y se otorgarían puntos XP
    navigate('/dashboard');
  };

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-mystical">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-gold transition-colors inline-flex items-center space-x-2 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al Dashboard</span>
            </button>
          </div>

          {/* Feedback */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 parchment-texture shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-cinzel text-deep-blue mb-2">
                ¡Actividad Completada!
              </h1>
              <p className="text-gray-600 font-playfair">
                Has ganado {activity.xpReward} puntos XP
              </p>
            </div>

            {/* Retroalimentación filosófica */}
            <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-lg p-6 border border-gold/30 mb-6">
              <h3 className="text-xl font-playfair text-deep-blue mb-4">
                Reflexión Filosófica
              </h3>
              
              {selectedOption === 'order' && (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Tu elección refleja el pensamiento realista de Maquiavelo. Él argumentaba que un príncipe debe estar dispuesto a actuar de manera aparentemente inmoral si es necesario para el bien mayor del estado.
                  </p>
                  <p className="text-gray-700">
                    <strong>Conexión histórica:</strong> Esta perspectiva influyó en el desarrollo del pensamiento político moderno y el concepto de "razón de estado".
                  </p>
                </div>
              )}
              
              {selectedOption === 'pragmatic' && (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Has elegido un enfoque equilibrado que combina la sabiduría práctica aristotélica con el realismo maquiavélico. Esta posición reconoce la complejidad de las decisiones políticas.
                  </p>
                  <p className="text-gray-700">
                    <strong>Conexión histórica:</strong> Muchos líderes exitosos han adoptado este enfoque pragmático, adaptando sus métodos a las circunstancias.
                  </p>
                </div>
              )}
              
              {selectedOption === 'compassion' && (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Tu elección prioriza los valores humanitarios sobre la eficiencia política. Esto contrasta con el enfoque maquiavélico pero se alinea con tradiciones éticas más antiguas.
                  </p>
                  <p className="text-gray-700">
                    <strong>Conexión histórica:</strong> Esta perspectiva se relaciona con el pensamiento de filósofos como Confucio y las tradiciones éticas cristianas.
                  </p>
                </div>
              )}
            </div>

            {/* Tu justificación */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
              <h3 className="text-lg font-playfair text-deep-blue mb-3">
                Tu Justificación
              </h3>
              <p className="text-gray-700 italic">
                "{justification}"
              </p>
            </div>

            {/* Pregunta de reflexión adicional */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 mb-8">
              <h3 className="text-lg font-playfair text-deep-blue mb-3">
                Para Reflexionar
              </h3>
              <p className="text-gray-700">
                ¿Cómo aplicarías estos principios en situaciones de tu vida cotidiana? 
                ¿Hay momentos en los que has tenido que elegir entre "hacer lo correcto" y "hacer lo efectivo"?
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleComplete}
                className="bg-gradient-gold text-deep-blue px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Continuar mi Odisea
              </button>
              <button className="bg-white border-2 border-deep-blue text-deep-blue px-8 py-3 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition-colors">
                Compartir Reflexión
              </button>
            </div>
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
            onClick={() => navigate('/dashboard')}
            className="text-white hover:text-gold transition-colors inline-flex items-center space-x-2 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al Dashboard</span>
          </button>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-gold/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-cinzel text-white mb-1">
                  {activity.title}
                </h1>
                <p className="text-gold/80 text-sm">
                  Dilema Ético • {activity.estimatedTime} minutos • {activity.xpReward} XP
                </p>
              </div>
              <div className="flex items-center space-x-4 text-white/70">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{activity.estimatedTime} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">{activity.xpReward} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de la actividad */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 parchment-texture shadow-2xl">
          {/* Introducción */}
          <div className="mb-8">
            <h2 className="text-2xl font-playfair text-deep-blue mb-4 text-center">
              {activity.title}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {activity.description}
            </p>
          </div>

          {/* Escenario */}
          <div className="bg-gradient-to-r from-blue/20 to-blue/10 rounded-lg p-6 border border-blue/30 mb-8">
            <h3 className="text-lg font-playfair text-deep-blue mb-3">
              El Escenario
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {activity.scenario}
            </p>
          </div>

          {/* Pregunta */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-playfair text-deep-blue mb-4">
              {activity.question}
            </h3>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {activity.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                  selectedOption === option.id
                    ? 'border-gold bg-gradient-to-br from-gold/20 to-gold/10'
                    : 'border-gray-300 hover:border-gold/50 hover:bg-gold/5'
                }`}
              >
                <div className="text-4xl mb-3">{option.icon}</div>
                <h4 className="font-semibold text-deep-blue mb-2">{option.text}</h4>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </button>
            ))}
          </div>

          {/* Justificación */}
          <div className="mb-8">
            <label className="block text-lg font-playfair text-deep-blue mb-3">
              Justifica tu decisión (mínimo 50 palabras)
            </label>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
              placeholder="Explica tu razonamiento filosófico. ¿Qué principios éticos guían tu decisión? ¿Cómo se relaciona con el pensamiento de Maquiavelo?"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{justification.split(' ').filter(word => word.length > 0).length} palabras</span>
              <span>Mínimo: 50 palabras</span>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={!selectedOption || justification.split(' ').filter(word => word.length > 0).length < 50}
              className="bg-gradient-gold text-deep-blue px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Enviar Respuesta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

