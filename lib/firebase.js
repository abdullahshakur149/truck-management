// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBugtcZF2yY-eU8t6zzktSNvDLp8OAKf80",
    authDomain: "truck-management-bf46f.firebaseapp.com",
    projectId: "truck-management-bf46f",
    storageBucket: "truck-management-bf46f.firebasestorage.app",
    messagingSenderId: "389806637560",
    appId: "1:389806637560:web:33bb95e34c84142a86160d",
    measurementId: "G-B09JF45PEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Only initialize analytics in the browser
let analytics = null;
if (typeof window !== "undefined") {
    analyticsIsSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}