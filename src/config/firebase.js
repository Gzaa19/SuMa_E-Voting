// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app"; 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const firebaseConfig = { 
   apiKey: "AIzaSyD8AG9RYktXzfPh7JK8B28TdCSYCsjYtuU", 
   authDomain: "suma-a6d34.firebaseapp.com", 
   projectId: "suma-a6d34", 
   storageBucket: "suma-a6d34.firebasestorage.app", 
   messagingSenderId: "892145852878", 
   appId: "1:892145852878:web:6abdea8e14f1dfb0760b9f", 
   measurementId: "G-PW04GJQBHE" 
 }; 

const app = initializeApp(firebaseConfig); 
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export default app;