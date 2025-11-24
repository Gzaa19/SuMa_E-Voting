import { initializeApp } from "firebase/app"; 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { storage } from './storage';

const firebaseConfig = { 
  apiKey: "AIzaSyD8AG9RYktXzfPh7JK8B28TdCSYCsjYtuU", 
  authDomain: "suma-a6d34.firebaseapp.com", 
  projectId: "suma-a6d34", 
  storageBucket: "suma-a6d34.firebasestorage.app", 
  messagingSenderId: "892145852878", 
  appId: "1:892145852878:web:6abdea8e14f1dfb0760b9f", 
  measurementId: "G-PW04GJQBHE" 
}; 

// MMKV Storage adapter that mimics AsyncStorage interface
const MMKVStorage = {
  async getItem(key) {
    const value = storage.getString(key);
    return value ?? null;
  },
  async setItem(key, value) {
    storage.set(key, value);
  },
  async removeItem(key) {
    storage.delete(key);
  },
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with MMKV as persistence layer
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(MMKVStorage),
});

export const db = getFirestore(app);
export default app;