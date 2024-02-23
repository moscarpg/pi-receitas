// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2MPc95VUji_ewrUos-agYQuRel4_X-d4",
  authDomain: "receitas-5ab61.firebaseapp.com",
  databaseURL: "https://receitas-5ab61-default-rtdb.firebaseio.com",
  projectId: "receitas-5ab61",
  storageBucket: "receitas-5ab61.appspot.com",
  messagingSenderId: "441970733996",
  appId: "1:441970733996:web:84dbdaec1816f372640009",
  measurementId: "G-8ZKZBMCKK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, getApp, getAuth };