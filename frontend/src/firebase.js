// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { apiKey, appId, messagingSenderId } from "./config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "se-project-a81e7.firebaseapp.com",
  projectId: "se-project-a81e7",
  storageBucket: "se-project-a81e7.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
