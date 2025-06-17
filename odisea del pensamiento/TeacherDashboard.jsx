import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  TrendingUp, 
  Award, 
  AlertTriangle,
  Eye,
  Download,
  Filter,
  Search,
  LogOut,
  Settings,
  RefreshCw
} from 'lucide-react';

const TeacherDashboard = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo para el dashboard del profesor
  const stats = {
    totalStudents: 24,
    activitiesCompleted: 156,
    averageProgress: 78,
    alerts: 3
  };

  const students = [
    { id: 1, name: 'Juan Pérez', progress: 85, lastActivity: 'Hace 2 horas', avatar: '👨‍🎓' },
    { id: 2, name: 'María López', progress: 92, lastActivity: 'Hace 1 hora', avatar: '👩‍🎓' },
    { id: 3, name: 'David Ramírez', progress: 67, lastActivity: 'Hace 3 días', avatar: '👨‍🎓' },
    { id: 4, name: 'Ana Martínez', progress: 88, lastActivity: 'Hace 1 día', avatar: '👩‍🎓' },
    { id: 5, name: 'Carlos Sánchez', progress: 73, lastActivity: 'Hace 2 días', avatar: '👨‍🎓' },
    { id: 6, name: 'Isabel Torres', progress: 95, lastActivity: 'Hace 30 min', avatar: '👩‍🎓' },
    { id: 7, name: 'Luis González', progress: 45, lastActivity: 'Hace 1 semana', avatar: '👨‍🎓' },
    { id: 8, name: 'Sofia Herrera', progress: 82, lastActivity: 'Hace 4 horas', avatar: '👩‍🎓' }
  ];

  const recentActivities = [
    { student: 'María López', activity: 'Completó "El Dilema de Maquiavelo"', time: 'Hace 1 hora', score: 95 },
    { student: 'Isabel Torres', activity: 'Participó en debate sobre Sócrates', time: 'Hace 30 min', score: null },
    { student: 'Juan Pérez', activity: 'Escribió reflexión sobre mitos griegos', time: 'Hace 2 horas', score: 88 },
    { student: 'Ana Martínez', activity: 'Completó línea de tiempo filosófica', time: 'Hace 1 día', score: 92 }
  ];
  
  // Función para cerrar sesión
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para simular actualización de datos
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };
  
  // Filtrar estudiantes según término de búsqueda
  const filteredStudents = searchTerm
    ? students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : students;

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-cinzel text-white mb-2">
                  Observatorio del Pensamiento
                </h1>
                <p className="text-gold/80 font-playfair">
                  Panel de control para el seguimiento de estudiantes
                </p>
                <div className="mt-2 text-white/70 text-sm">
                  <span>Sesión iniciada como: </span>
                  <span className="font-medium text-gold">{userProfile?.profile?.name || 'Profesor'}</span>
                  <span className="mx-2">•</span>
                  <span>Última actualización: {lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleRefresh}
                  disabled={loading}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors inline-flex items-center"
                  title="Actualizar datos"
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors inline-flex items-center" title="Configuración">
                  <Settings className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-red-500/70 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </button>
                <button className="bg-gold/80 hover:bg-gold text-deep-blue px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Exportar Datos</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 parchment-texture shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Estudiantes</p>
                <p className="text-3xl font-bold text-deep-blue">{stats.totalStudents}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 parchment-texture shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Actividades Completadas</p>
                <p className="text-3xl font-bold text-deep-blue">{stats.activitiesCompleted}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 parchment-texture shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Progreso Promedio</p>
                <p className="text-3xl font-bold text-deep-blue">{stats.averageProgress}%</p>
              </div>
              <div className="bg-gold/20 p-3 rounded-lg">
                <Award className="h-6 w-6 text-gold" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 parchment-texture shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Alertas</p>
                <p className="text-3xl font-bold text-deep-blue">{stats.alerts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de estudiantes */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-playfair text-deep-blue">Estudiantes</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar estudiante..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-deep-blue">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.lastActivity}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-deep-blue">{student.progress}%</div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              student.progress >= 80 ? 'bg-green-500' :
                              student.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button className="p-2 text-gray-400 hover:text-deep-blue transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )))
                : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No se encontraron estudiantes con "{searchTerm}"</p>
                  </div>
                )}
              </div>

              <div className="mt-6 text-center">
                <button className="text-deep-blue hover:text-gold transition-colors font-medium">
                  Ver Todos los Estudiantes
                </button>
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Actividad reciente */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h3 className="text-lg font-playfair text-deep-blue mb-4">Actividad Reciente</h3>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="border-l-4 border-gold pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-deep-blue text-sm">{activity.student}</h4>
                      {activity.score && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {activity.score}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{activity.activity}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h3 className="text-lg font-playfair text-deep-blue mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Alertas
              </h3>
              
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm font-medium">Luis González</p>
                  <p className="text-red-600 text-xs">Sin actividad por más de 1 semana</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm font-medium">David Ramírez</p>
                  <p className="text-yellow-600 text-xs">Progreso por debajo del promedio</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm font-medium">Sistema</p>
                  <p className="text-blue-600 text-xs">Actualización disponible</p>
                </div>
              </div>
            </div>

            {/* Herramientas rápidas */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 parchment-texture shadow-2xl">
              <h3 className="text-lg font-playfair text-deep-blue mb-4">Herramientas</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gradient-to-r from-gold/20 to-gold/10 rounded-lg border border-gold/30 hover:bg-gold/20 transition-colors">
                  <div className="font-medium text-deep-blue">Generar Reporte</div>
                  <div className="text-sm text-gray-600">Progreso semanal</div>
                </button>
                
                <button className="w-full text-left p-3 bg-gradient-to-r from-blue/20 to-blue/10 rounded-lg border border-blue/30 hover:bg-blue/20 transition-colors">
                  <div className="font-medium text-deep-blue">Enviar Mensaje</div>
                  <div className="text-sm text-gray-600">A todos los estudiantes</div>
                </button>
                
                <button className="w-full text-left p-3 bg-gradient-to-r from-purple/20 to-purple/10 rounded-lg border border-purple/30 hover:bg-purple/20 transition-colors">
                  <div className="font-medium text-deep-blue">Configurar Actividad</div>
                  <div className="text-sm text-gray-600">Nueva misión</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

