//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Home.html~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let Dot1Btn = document.getElementById("dot1");
let Dot2Btn = document.getElementById("dot2");
let SignOutBtn = document.getElementById("signoutbutton");

let dot_nao = () => {
    let flag;
    get(ref(db, 'MonHoc/dot_dki/')).then((snapshot) => {
        if (snapshot.exists()) {
            flag = snapshot.val();
            if (flag == "Đợt 1") {
                Dot2Btn.disabled = true;
                Dot2Btn.style.backgroundColor = "gray";
            }
            else if (flag == "Đợt 2") {
                Dot1Btn.disabled = true;
                Dot1Btn.style.backgroundColor = "gray";
            }
            else {
                Dot1Btn.disabled = true;
                Dot2Btn.disabled = true;
                Dot1Btn.style.backgroundColor = "gray";
                Dot2Btn.style.backgroundColor = "gray";

            }
        }
    });
}
window.addEventListener('load', dot_nao);



Dot1Btn.addEventListener('click', () => {
    window.location.href = "dkimonhoc.html";
});

Dot2Btn.addEventListener('click', () => {
    window.location.href = "dkimonhoc_dot2.html";
});

let SignOut = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "index.html";
}

SignOutBtn.addEventListener('click', SignOut);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~