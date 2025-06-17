import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    // Verificar si hay una sesión de profesor guardada
    const checkTeacherSession = async () => {
      const teacherSession = localStorage.getItem('teacherSession');
      
      if (teacherSession) {
        try {
          const { uid, timestamp } = JSON.parse(teacherSession);
          
          // Verificar si la sesión no ha expirado (24 horas)
          const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
          const isValid = Date.now() - timestamp < SESSION_EXPIRY;
          
          if (isValid && uid) {
            // Cargar datos del profesor desde Firestore
            const teacherDoc = await getDoc(doc(db, 'teachers', uid));
            
            if (teacherDoc.exists()) {
              const teacherData = teacherDoc.data();
              setUser({ uid, email: 'profesor@odisea.edu' });
              setUserProfile(teacherData);
              setLoading(false);
              return true; // Sesión de profesor restaurada
            }
          }
          
          // Si llegamos aquí, la sesión no es válida o expiró
          localStorage.removeItem('teacherSession');
        } catch (error) {
          console.error('Error al restaurar sesión de profesor:', error);
          localStorage.removeItem('teacherSession');
        }
      }
      
      return false; // No hay sesión de profesor válida
    };
    
    const initAuth = async () => {
      // Primero intentar restaurar sesión de profesor
      const hasTeacherSession = await checkTeacherSession();
      
      if (!hasTeacherSession) {
        // Si no hay sesión de profesor, verificar autenticación normal
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            // Cargar perfil del usuario desde Firestore
            await loadUserProfile(user.uid);
          } else {
            setUser(null);
            setUserProfile(null);
          }
          setLoading(false);
        });
        
        return unsubscribe;
      }
    };
    
    const unsubscribe = initAuth();
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Cargar perfil del usuario
  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Registro de estudiante
  const registerStudent = async (email, password, profileData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil de Firebase Auth
      await updateProfile(user, {
        displayName: profileData.name
      });

      // Crear documento en Firestore
      const userData = {
        uid: user.uid,
        type: 'student',
        profile: {
          ...profileData,
          email,
          createdAt: new Date()
        },
        gameData: {
          totalXP: 0,
          level: 1,
          badges: [],
          currentSemester: 1,
          unlockedContent: ['sem1_p1_t1_s1'], // Primer sesión desbloqueada
          weeklyMissionStatus: {
            currentWeek: 1,
            completed: false,
            progress: 0
          }
        }
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserProfile(userData);
      
      return { success: true, user };
    } catch (error) {
      console.error('Error registering student:', error);
      return { success: false, error: error.message };
    }
  };

  // Login de estudiante
  const loginStudent = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user };
    } catch (error) {
      console.error('Error logging in student:', error);
      return { success: false, error: error.message };
    }
  };

  // Login de profesor (con contraseña maestra)
  const loginTeacher = async (masterPassword) => {
    // En un entorno real, esto debería validarse contra una base de datos segura
    const MASTER_PASSWORD = 'profesor2024'; // Contraseña maestra para acceso de profesor
    
    if (masterPassword === MASTER_PASSWORD) {
      try {
        // Crear un ID único para la sesión del profesor
        const teacherId = `teacher_${Date.now()}`;
        
        // Crear datos del profesor
        const teacherData = {
          uid: teacherId,
          type: 'teacher',
          profile: {
            name: 'Profesor',
            email: 'profesor@odisea.edu',
            role: 'teacher',
            lastLogin: new Date()
          }
        };
        
        // Guardar datos del profesor en Firestore para persistencia
        await setDoc(doc(db, 'teachers', teacherId), teacherData);
        
        // Establecer estado de usuario
        setUser({ uid: teacherId, email: 'profesor@odisea.edu' });
        setUserProfile(teacherData);
        
        // Guardar en localStorage para mantener la sesión
        localStorage.setItem('teacherSession', JSON.stringify({
          uid: teacherId,
          timestamp: Date.now()
        }));
        
        return { success: true, user: teacherData };
      } catch (error) {
        console.error('Error en login de profesor:', error);
        return { success: false, error: 'Error al iniciar sesión como profesor' };
      }
    } else {
      return { success: false, error: 'Contraseña incorrecta' };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      // Limpiar sesión de profesor si existe
      localStorage.removeItem('teacherSession');
      
      // Si es un usuario normal, cerrar sesión en Firebase Auth
      if (auth.currentUser) {
        await signOut(auth);
      }
      
      // Limpiar estado
      setUser(null);
      setUserProfile(null);
      
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      return { success: false, error: error.message };
    }
  };

  // Actualizar perfil
  const updateUserProfile = async (updates) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, updates, { merge: true });
      
      // Actualizar estado local
      setUserProfile(prev => ({ ...prev, ...updates }));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    registerStudent,
    loginStudent,
    loginTeacher,
    logout,
    updateUserProfile,
    isStudent: userProfile?.type === 'student',
    isTeacher: userProfile?.type === 'teacher'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

