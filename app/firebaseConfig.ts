import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXRYWbipYYTBnXpb4c2lBPJyxk6KwUOVQ",
  authDomain: "advlast9.firebaseapp.com",
  projectId: "advlast9",
  storageBucket: "advlast9.firebasestorage.app",
  messagingSenderId: "514190681650",
  appId: "1:514190681650:web:7418bb8eadfb058ba6fe2b",
  measurementId: "G-BBC6ETLN50"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);