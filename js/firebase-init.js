// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// Tu configuración de Firebase (LA CORRECTA)
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBrf6rvGUALFG-EcSH_FwCAmLiC3BLNFcY",
    authDomain: "o-ktrends.firebaseapp.com",
    projectId: "o-ktrends",
    // 🛑 ARREGLADO: El nombre real del bucket de Storage es este, no el .appspot.com
    storageBucket: "o-ktrends.firebasestorage.app", 
    messagingSenderId: "606996556956",
    appId: "1:606996556956:web:a25b5bb59417ca43089159",
    measurementId: "G-VBCPRH4CLV"
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
