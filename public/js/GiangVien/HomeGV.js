import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

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

import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth(app);

let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let GreetHead = document.getElementById("greet");
let UpdBtn = document.getElementById("dialog-submit");
let Input = document.getElementById("dialog-input");


let checkCred = () => {
    if (!sessionStorage.getItem("user-creds")) {
        window.location.href = "index.html";
    }
    else {
        GreetHead.innerText = `${UserInfo.ho_va_ten}`;
    }
}

let UpdData = () => {
    update(ref(db, 'GiangVien/' + UserInfo.id), {
        mat_khau: Input.value
    }).then(() => {
        alert("Data updated successfully!");
    }).catch((error) => {
        alert("Data could not be updated!" + error);
        console.error(error);
    });
}

window.addEventListener('load', checkCred);