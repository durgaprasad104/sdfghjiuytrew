import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAdkc1Nrza-bQQ12hJpmwO9Ap6EIg1C3Uo",
    authDomain: "projectsuite-7f124.firebaseapp.com",
    projectId: "projectsuite-7f124",
    storageBucket: "projectsuite-7f124.firebasestorage.app",
    messagingSenderId: "355213268191",
    appId: "1:355213268191:web:9ce99140edb9f1dbe1c56a",
    measurementId: "G-1VZ4LSG1GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
