import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Web app's Firebase configuration provided by user
export const firebaseConfig = {
  apiKey: "AIzaSyDR447yNhmiZcFCU4UbdqVGQj1ASJVAqR4",
  authDomain: "flowforgeai-3f78a.firebaseapp.com",
  projectId: "flowforgeai-3f78a",
  storageBucket: "flowforgeai-3f78a.firebasestorage.app",
  messagingSenderId: "816958048833",
  appId: "1:816958048833:web:f3b19ca242cfa6088854c0",
  measurementId: "G-E4SZMJE768",
};

// Initialize Firebase App (Singleton pattern)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Analytics (safe for SSR / Next.js)
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

// Firebase Auth Helper Functions
export async function loginWithEmail(email: string, pass: string) {
  return signInWithEmailAndPassword(auth, email, pass);
}

export async function registerWithEmail(email: string, pass: string, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function logoutFirebase() {
  return signOut(auth);
}

export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
