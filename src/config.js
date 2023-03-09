import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCPJUtJAuMHS6FZIR8GB6J6ClMfqtqCx70",
    authDomain: "mynotes-d6893.firebaseapp.com",
    projectId: "mynotes-d6893",
    storageBucket: "mynotes-d6893.appspot.com",
    messagingSenderId: "595631399236",
    appId: "1:595631399236:web:b0567b6d9bd668eac57711",
    measurementId: "G-ZG010GD1TF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
