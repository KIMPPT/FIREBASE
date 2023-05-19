// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//인증을 위한 getAuth 가져오기
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPl2gbzXf9JnnUwIodkc4Q4atTQGt1pYo",
  authDomain: "fir-648aa.firebaseapp.com",
  projectId: "fir-648aa",
  storageBucket: "fir-648aa.appspot.com",
  messagingSenderId: "376439799230",
  appId: "1:376439799230:web:1afeeed58d867d12948def",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//사용하고자 하는 서비스를 들고와서 사용
//인증서비스에 관한 내용 들고와서 사용
export const auth=getAuth(app);