import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, School, Compass } from 'lucide-react';

const LoginPage = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    masterPassword: ''
  });

  const { loginStudent, loginTeacher } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (isStudent) {
        result = await loginStudent(formData.email, formData.password);
      } else {
        result = await loginTeacher(formData.masterPassword);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Compass className="h-16 w-16 text-gold animate-float" />
              <div className="absolute inset-0 bg-gold/20 rounded-full animate-glow"></div>
            </div>
          </div>
          <h1 className="text-3xl font-cinzel text-white mb-2">
            La Odisea del Pensamiento
          </h1>
          <p className="text-gold/80 font-playfair">
            Inicia tu viaje por la historia del pensamiento
          </p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 parchment-texture">
          {/* Selector de tipo de usuario */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsStudent(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isStudent 
                  ? 'bg-white text-deep-blue shadow-sm' 
                  : 'text-gray-600 hover:text-deep-blue'
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Estudiante
            </button>
            <button
              type="button"
              onClick={() => setIsStudent(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isStudent 
                  ? 'bg-white text-deep-blue shadow-sm' 
                  : 'text-gray-600 hover:text-deep-blue'
              }`}
            >
              <School className="h-4 w-4 inline mr-2" />
              Profesor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isStudent ? (
              <>
                {/* Email para estudiante */}
                <div>
                  <label className="block text-sm font-medium text-deep-blue mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Contraseña para estudiante */}
                <div>
                  <label className="block text-sm font-medium text-deep-blue mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Tu contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Contraseña maestra para profesor */}
                <div>
                  <label className="block text-sm font-medium text-deep-blue mb-2">
                    Contraseña de Profesor
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="masterPassword"
                      value={formData.masterPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Contraseña maestra"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-2 p-2 bg-gold/10 border border-gold/30 rounded-lg">
                    <p className="text-sm text-deep-blue flex items-center">
                      <span className="mr-2 text-gold">🔑</span>
                      Contraseña para acceso: <code className="ml-2 bg-white px-2 py-1 rounded font-mono text-deep-blue">profesor2024</code>
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold text-deep-blue py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-deep-blue border-t-transparent rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                `Iniciar Sesión como ${isStudent ? 'Estudiante' : 'Profesor'}`
              )}
            </button>
          </form>

          {/* Link de registro solo para estudiantes */}
          {isStudent && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/register" 
                  className="text-deep-blue hover:text-gold font-medium transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          )}

          {/* Información adicional */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500 space-y-1">
              <p>🎓 Para estudiantes: Crea tu cuenta y comienza tu odisea</p>
              <p>👨‍🏫 Para profesores: Usa la contraseña proporcionada por tu institución</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

