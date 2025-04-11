import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration


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