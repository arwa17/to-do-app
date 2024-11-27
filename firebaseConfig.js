// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig={
    apiKey: "AIzaSyDnc9kX9i-yN4MOzGYOjMFMr-_2cOlczUs",
    authDomain: "my-todo-list-app-2024.firebaseapp.com",
    projectId: "my-todo-list-app-2024",
    storageBucket: "my-todo-list-app-2024.appspot.com",
    messagingSenderId: "224977505383",
    appId: "1:224977505383:web:43d9fc2eff29695b0298c2"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };