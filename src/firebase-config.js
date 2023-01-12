// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_s_4fBILwsH_PzrvFo3YTucQIHJaTENw",
    authDomain: "real-estate-react-1beda.firebaseapp.com",
    projectId: "real-estate-react-1beda",
    storageBucket: "real-estate-react-1beda.appspot.com",
    messagingSenderId: "103538532885",
    appId: "1:103538532885:web:22d167a6c69962a91c241c"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore()