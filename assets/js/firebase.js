import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyCXxgO0OU9k-LvRhYY7bIuhvVpY5XgMWdk",
  authDomain: "nuralam-90162.firebaseapp.com",
  databaseURL: "https://nuralam-90162-default-rtdb.firebaseio.com",
  projectId: "nuralam-90162",
  storageBucket: "nuralam-90162.firebasestorage.app",
  messagingSenderId: "371833786531",
  appId: "1:371833786531:web:fc49153e527ac617612f16",
  measurementId: "G-T16MWNKY0V"
};

/* INIT */
const app = initializeApp(firebaseConfig);

/* AUTH */
const auth = getAuth(app);

/* FIRESTORE */
const db = getFirestore(app);

/* STORAGE */
const storage = getStorage(app);

/* EXPORT */
export {
  app,
  auth,
  db,
  storage,

  auth as firebaseAuth,
  signInWithEmailAndPassword as firebaseSignIn,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut
};

/* OPTIONAL GLOBAL */
window.firebaseAuth = auth;
window.firebaseSignIn = signInWithEmailAndPassword;
window.firebaseOnAuthStateChanged = onAuthStateChanged;
window.firebaseSignOut = signOut;
