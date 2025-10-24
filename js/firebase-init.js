// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// Tu configuración de Firebase usando variables de entorno
const FIREBASE_CONFIG = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// ----------------------------------------------------
// Variables Globales Exportables
// ----------------------------------------------------
let app;
let auth;
let db;
let storage;
let userId = null;

// Función de inicialización
export async function initFirebase() {
    try {
        // Inicializar la aplicación
        app = initializeApp(FIREBASE_CONFIG);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app); // Obtener el Storage

        // Intentar iniciar sesión anónimamente
        const userCredential = await signInAnonymously(auth);
        userId = userCredential.user.uid;
        
        return true; // Éxito en la conexión y autenticación
    } catch (e) {
        console.error("🔴 ERROR CRÍTICO en la inicialización de Firebase:", e);
        // Si la autenticación falla (auth/configuration-not-found, etc.), lo capturamos aquí.
        return false;
    }
}

// Exportar las instancias
export { db, auth, storage, userId };
 