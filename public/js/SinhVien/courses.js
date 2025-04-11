import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration


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
                                sessionStorage.setItem('ten_mon_hoc_' + numOfCourses, element.ten_mon_hoc);
                                document.getElementById('lop_' + numOfCourses).innerHTML = element.lop;
                                sessionStorage.setItem('lop_' + numOfCourses, element.lop);
                                document.getElementById('ma_mon_' + numOfCourses).innerHTML = key;
                                sessionStorage.setItem('ma_mon_' + numOfCourses, key);
                            }
                        }
                    }
                    for(let i = 1; i <= numOfCourses; i++) {
                        document.getElementById('c' + i).style.display = '';
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

ten_mon_hoc_1.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_1'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_1'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_1'));
    //window.open("course-details.html", '_blank');
});

ten_mon_hoc_2.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_2'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_2'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_2'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_3.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_3'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_3'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_3'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_4.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_4'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_4'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_4'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_5.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_5'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_5'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_5'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_6.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_6'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_6'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_6'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_7.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_7'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_7'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_7'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_8.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_8'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_8'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_8'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_9.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_9'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_9'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_9'));
    //window.open("course-details.html", '_blank');
});
ten_mon_hoc_10.addEventListener('click', () => {
    sessionStorage.setItem("ten_mon_hoc", sessionStorage.getItem('ten_mon_hoc_10'));
    sessionStorage.setItem("lop", sessionStorage.getItem('lop_10'));
    sessionStorage.setItem("ma_mon", sessionStorage.getItem('ma_mon_10'));
    //window.open("course-details.html", '_blank');
});


window.addEventListener('load', () => {
    getSemester();
});