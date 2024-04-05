import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, onValue, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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

let ten_mon_hoc = sessionStorage.getItem('ten_mon_hoc');
let lop = sessionStorage.getItem('lop');
let ma_mon = sessionStorage.getItem('ma_mon');

let title_course_details = document.getElementById('title_course_details');
let title_lop = document.getElementById('title_lop');

let notification = document.getElementById('myInput');
let notifiBtn = document.getElementById('btn_notification');

let thoiluonghoc = document.getElementById('thoiluonghoc');
let sotinchi = document.getElementById('sotinchi');
let sogio = document.getElementById('sogio');

let change_notifi = () => {
    set(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/thong_bao'), notification.value);
    alert('Thay đổi thông báo thành công');
};

// const inputElement = document.getElementById("myInput");
// inputElement.addEventListener("input", function () {
//     // Cập nhật chiều rộng dựa trên độ dài của văn bản
//     this.style.width = (this.value.length * 10) + "px";
// });

notifiBtn.addEventListener('click', change_notifi);

window.addEventListener('load', () => {
    title_course_details.innerHTML = ten_mon_hoc;
    title_lop.innerHTML = 'Lớp: ' + lop;

    onValue(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/thong_bao'), (snapshot) => {
        if (snapshot.exists()) {
            notification.value = snapshot.val();
        }
        else {
            notification.value = 'Chưa có thông báo';
        }
    });

    onValue(ref(db, 'MonHoc/' + ma_mon + '/mo_ta_mon_hoc/'), (snapshot) => {
        if (snapshot.exists()) {
            thoiluonghoc.innerHTML = snapshot.val().thoi_gian_hoc;
            sotinchi.innerHTML = snapshot.val().so_tin_chi;
            sogio.innerHTML = snapshot.val().so_gio_mot_tiet_hoc;
        }
        else {
            thoiluonghoc.innerHTML = 'Chưa có dữ liệu';
            sotinchi.innerHTML = 'Chưa có dữ liệu';
            sogio.innerHTML = 'Chưa có dữ liệu';
        }
    });
});

