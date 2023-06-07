// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbUWyyXt8AEzYcpRTQYo9YHuh3lf6428U",
  authDomain: "test-efa9f.firebaseapp.com",
  projectId: "test-efa9f",
  storageBucket: "test-efa9f.appspot.com",
  messagingSenderId: "706924134219",
  appId: "1:706924134219:web:eb2ea3ac5718daa859f2ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//인증에 관한 내용 추가
export const auth = getAuth(app);
export const db= getFirestore(app);
