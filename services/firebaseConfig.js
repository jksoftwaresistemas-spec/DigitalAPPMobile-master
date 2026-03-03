import { initializeApp } from "firebase/app";
import { 
  initializeAuth, 
  getReactNativePersistence, 
  getAuth 
} from "firebase/auth"; // Importe do caminho principal
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBBbXwkrHzBPSkWXg_I9dyj9UKdqGdEYuM",
  authDomain: "digitalmobile-31b8c.firebaseapp.com",
  projectId: "digitalmobile-31b8c",
  storageBucket: "digitalmobile-31b8c.firebasestorage.app",
  messagingSenderId: "192435595387",
  appId: "1:192435595387:web:c1b6eb36a3cdecb9bddade",
  measurementId: "G-ZN9BZMB137"
};

// Inicializa o App
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com verificação de plataforma
// Isso resolve o erro de persistência no Expo
const auth = Platform.OS === 'web' 
  ? getAuth(app) 
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });

// Inicializa o Firestore
const db = getFirestore(app);

export { auth, db };