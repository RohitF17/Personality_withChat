import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDr_vWTnHer04S9apEpIDCoWmF2DsU2bEU",
  authDomain: "chatapps-a05d5.firebaseapp.com",
  projectId: "chatapps-a05d5",
  storageBucket: "chatapps-a05d5.appspot.com",
  messagingSenderId: "355006101773",
  appId: "1:355006101773:web:c39c646e0104397addd844",
  
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();