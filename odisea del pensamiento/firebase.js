// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase (usar variables de entorno en producción)
const firebaseConfig = {
  apiKey: "AIzaSyBXd4o6hxMX9rVCNPTrYhZoUVSX3D4yPwg",
  authDomain: "odisea-pensamiento.firebaseapp.com",
  projectId: "odisea-pensamiento",
  storageBucket: "odisea-pensamiento.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// NOTA: En un entorno de producción, estas claves deberían estar en variables de entorno
// y nunca expuestas directamente en el código fuente.

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configuración adicional
auth.languageCode = 'es';

export default app;

