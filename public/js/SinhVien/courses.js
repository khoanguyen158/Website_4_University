import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


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

let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');
let c4 = document.getElementById('c4');
let c5 = document.getElementById('c5');
let c6 = document.getElementById('c6');
let c7 = document.getElementById('c7');
let c8 = document.getElementById('c8');
let c9 = document.getElementById('c9');
let c10 = document.getElementById('c10');

let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let SemesterValue1 = document.getElementById('Semester_in_header');
let SemesterValue;
let numOfCourses = 0;

let getSemester = () => {
    get(ref(db, 'MonHoc/hoc_ki_hien_tai')).then((snapshot) => {
        if (snapshot.exists()) {
            SemesterValue = snapshot.val();
            SemesterValue1.innerHTML = SemesterValue;
            get(ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterValue)).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key];
                            if (key !== 'ten_hoc_ki') {
                                numOfCourses++;
                                document.getElementById('ten_mon_hoc_' + numOfCourses).innerHTML = element.ten_mon_hoc;
                                document.getElementById('lop_' + numOfCourses).innerHTML = element.lop;
                                document.getElementById('ma_mon_' + numOfCourses).innerHTML = key;
                            }
                        }
                    }
                    for(let i = numOfCourses + 1; i <= 10; i++) {
                        document.getElementById('c' + i).style.display = 'none';
                    }
                }
                else {
                    alert("No data available!!!");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }).catch((error) => {
        console.error(error);
    });
};

window.addEventListener('load', () => {
    getSemester();
});