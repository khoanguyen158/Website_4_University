import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration


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