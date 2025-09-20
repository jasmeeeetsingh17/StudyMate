// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFVhpcRlU5yOCwECeI2VnJ5hJxmpIDZsc",
    authDomain: "studymate-561c1.firebaseapp.com",
    projectId: "studymate-561c1",
    storageBucket: "studymate-561c1.firebasestorage.app",
    messagingSenderId: "838681260862",
    appId: "1:838681260862:web:8654dd45156bff5c28f26f",
    measurementId: "G-SBVD2SQHTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth, analytics };