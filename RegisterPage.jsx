import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, School, Compass } from 'lucide-react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    school: '',
    grade: '3ro Secundaria'
  });

  const { registerStudent } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.nickname.trim()) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      const profileData = {
        name: formData.name.trim(),
        nickname: formData.nickname.trim(),
        school: formData.school.trim() || 'No especificada',
        grade: formData.grade
      };

      const result = await registerStudent(formData.email, formData.password, profileData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 parchment-texture">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <Compass className="h-16 w-16 text-gold animate-float" />
              </div>
              <h2 className="text-2xl font-cinzel text-deep-blue mb-2">
                ¡Bienvenido a la Odisea!
              </h2>
              <p className="text-gray-600 font-playfair">
                Tu cuenta ha sido creada exitosamente. Preparando tu aventura filosófica...
              </p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-gold animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Únete a la Odisea
          </h1>
          <p className="text-gold/80 font-playfair">
            Crea tu cuenta y comienza tu viaje filosófico
          </p>
        </div>

        {/* Formulario de registro */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 parchment-texture">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre completo */}
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Apodo de Navegante
              </label>
              <div className="relative">
                <Compass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Ej: FilósofoValiente"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Este nombre aparecerá en los debates (mantén el anonimato)
              </p>
            </div>

            {/* Email */}
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

            {/* Escuela (opcional) */}
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Escuela (Opcional)
              </label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Nombre de tu escuela"
                />
              </div>
            </div>

            {/* Grado */}
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Grado Escolar
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="3ro Secundaria">3ro de Secundaria</option>
                <option value="2do Secundaria">2do de Secundaria</option>
                <option value="1ro Secundaria">1ro de Secundaria</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Contraseña */}
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
                  placeholder="Mínimo 6 caracteres"
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

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Repite tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

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
                  <span>Creando tu cuenta...</span>
                </div>
              ) : (
                'Comenzar mi Odisea'
              )}
            </button>
          </form>

          {/* Link de login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-deep-blue hover:text-gold font-medium transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          {/* Términos */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Al registrarte, aceptas nuestros términos de uso y política de privacidad. 
              Esta aplicación está diseñada con fines educativos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

