import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDQk0PGIztg7qltOimH1_9_lLl5rluKsV8",
    authDomain: "fir-d023a.firebaseapp.com",
    databaseURL: "https://fir-d023a-default-rtdb.firebaseio.com",
    projectId: "fir-d023a",
    storageBucket: "fir-d023a.appspot.com",
    messagingSenderId: "81322751429",
    appId: "1:81322751429:web:eeb12e1ec56b1970c807ac",
    measurementId: "G-KZQQJNVVWJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let SignOutBtn = document.getElementById("signoutbutton");
let SignOut = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "index.html";
}

SignOutBtn.addEventListener('click', SignOut);