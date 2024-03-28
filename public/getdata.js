import { getDatabase, set, ref, child, get, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


var stdNo = 0;
var tbody = document.getElementById('tbody1');
let dataIn = sessionStorage.getItem("currentId");
let Welcome = document.getElementById("welcome");

function AddItemToTable(name, id) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    td1.innerHTML = ++stdNo;
    td2.innerHTML = name;
    td3.innerHTML = id;


    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);
}



function GetAllDataRealtime() {
    const dbRef_Lec = ref(db, 'MonHoc/' + dataIn + '/tong_so_giang_vien');
    const dbRef_Stu = ref(db, 'MonHoc/' + dataIn + '/tong_so_sinh_vien');


    onValue(dbRef_Lec, (snapshot) => {
        stdNo = 0;
        document.getElementById("tbody1").innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            AddItemToTable(childData.ho_va_ten, childSnapshot.key);
        });
    });

    onValue(dbRef_Stu, (snapshot) => {
        stdNo = 0;
        document.getElementById("tbody2").innerHTML = "";
        tbody = document.getElementById('tbody2');
        document.getElementById("tbody2").innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            AddItemToTable(childData.ho_va_ten, childSnapshot.key);
        });
    });
}

let checkCred = () => {
    Welcome.innerHTML = "Thông tin về các giảng viên và sinh viên môn " + dataIn;
}

window.addEventListener('load', GetAllDataRealtime);
window.addEventListener('load', checkCred);
