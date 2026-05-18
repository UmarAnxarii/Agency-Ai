import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpvmS9bOxLM0ztAJZO7mOaV7sUMV7B8eI",
  authDomain: "agency-ai-35bdb.firebaseapp.com",
  projectId: "agency-ai-35bdb",
  storageBucket: "agency-ai-35bdb.firebasestorage.app",
  messagingSenderId: "1080862371371",
  appId: "1:1080862371371:web:57b2a7683bb67fcabc846e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();