import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa3d29dlq7j56eePPSPElTueojpPT99T0",
  authDomain: "userwimesh.firebaseapp.com",
  projectId: "userwimesh",
  storageBucket: "userwimesh.appspot.com",
  messagingSenderId: "439339650481",
  appId: "1:439339650481:web:08b4792875786576244190",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
export const db = getFirestore(app);
