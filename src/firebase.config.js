import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC12D74900Goy6VkrmjgYLRI18fGgxYEVY",
    authDomain: "house-marketplace-app-3dac0.firebaseapp.com",
    projectId: "house-marketplace-app-3dac0",
    storageBucket: "house-marketplace-app-3dac0.appspot.com",
    messagingSenderId: "979178105389",
    appId: "1:979178105389:web:29546a14379463430726a4",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
