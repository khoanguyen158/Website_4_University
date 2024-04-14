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
let IDGV = UserInfo.id;
let SemesterValue1 = document.getElementById('Semester_in_header');
let SemesterValue;
let numOfCourses = 0;

let ten_mon_hoc_1 = document.getElementById('ten_mon_hoc_1');
let ten_mon_hoc_2 = document.getElementById('ten_mon_hoc_2');
let ten_mon_hoc_3 = document.getElementById('ten_mon_hoc_3');
let ten_mon_hoc_4 = document.getElementById('ten_mon_hoc_4');
let ten_mon_hoc_5 = document.getElementById('ten_mon_hoc_5');
let ten_mon_hoc_6 = document.getElementById('ten_mon_hoc_6');
let ten_mon_hoc_7 = document.getElementById('ten_mon_hoc_7');
let ten_mon_hoc_8 = document.getElementById('ten_mon_hoc_8');
let ten_mon_hoc_9 = document.getElementById('ten_mon_hoc_9');
let ten_mon_hoc_10 = document.getElementById('ten_mon_hoc_10');

let getInfo = async () => {
    get(ref(db, 'GiangVien/' + IDGV + '/mon_chi_tiet/')).then(async(snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    numOfCourses++;
                    let dbRef = ref(db, 'MonHoc/' + key + '/mo_ta_mon_hoc/ten_mon_hoc/');
                    let dbData = await get(dbRef);
                    let data = dbData.val();
                    document.getElementById('ten_mon_hoc_' + numOfCourses).innerHTML = data;
                    sessionStorage.setItem('ten_mon_hoc_' + numOfCourses, data);
                    document.getElementById('ma_mon_' + numOfCourses).innerHTML = key;
                    sessionStorage.setItem('ma_mon_' + numOfCourses, key);

                    let dbRef2 = ref(db, 'GiangVien/' + IDGV + '/mon_chi_tiet/' + key);
                    let dbData2 = await get(dbRef2);
                    let data2 = dbData2.val();
                    let numOfClasses = 0;
                    for (const key in data2) {
                        if (data2.hasOwnProperty(key)) {
                            numOfClasses++;
                            document.getElementById('lop_' + numOfClasses + '_ma_mon_' + numOfCourses).innerHTML = key;
                            sessionStorage.setItem('lop_' + numOfClasses + '_ma_mon_' + numOfCourses, key);
                        }
                    }
                }
            }
            for(let i = 1; i <= numOfCourses; i++) {
                document.getElementById('c' + i).style.display = '';
            }
        }
        else {
            alert("Giảng viên không giảng dạy môn học nào trong học kì này!!!");
            for(let i = 1; i <= 10; i++) {
                document.getElementById('c' + i).style.display = 'none';
            }
        }
    }).catch((error) => {  
        console.error(error);
    });
};

for(let i = 1; i <= 10; i++) {
    for(let j = 1; j <= 5; j++) {
        document.getElementById('lop_' + j + '_ma_mon_' + i).addEventListener('click', () => {
            sessionStorage.setItem("lop", sessionStorage.getItem('lop_' + j + '_ma_mon_' + i));
            sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_' + i));
            sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_' + i));
        });
    }
};


window.addEventListener('load', () => {
    getInfo();
});