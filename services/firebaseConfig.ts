import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 초기 설정 파일(Firebase Console에서 확인 가능)
const firebaseConfig = {
    apiKey: "AIzaSyCiorzdOWoeLPptWAV7xm56TmdN8lLqL4c",
    authDomain: "iot7-435d1.firebaseapp.com",
    projectId: "iot7-435d1",
    storageBucket: "iot7-435d1.firebasestorage.app",
    messagingSenderId: "981339430588",
    appId: "1:981339430588:web:7b265ed5b76d038c7afab9",
    


};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth};
