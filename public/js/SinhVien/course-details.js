import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
let giang_vien_course_details = document.getElementById('giang_vien_course_details');

let notification = document.getElementById('notification');

let thoiluonghoc = document.getElementById('thoiluonghoc');
let sotinchi = document.getElementById('sotinchi');
let sogio = document.getElementById('sogio');

window.addEventListener('load', () => {
    title_course_details.innerHTML = ten_mon_hoc + ' - ' + lop;
    get(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/giang_vien')).then((snapshot) => {
        if (snapshot.exists()) {
            giang_vien_course_details.innerHTML = 'Giảng Viên: ' +  snapshot.val();
        }
        else{
            giang_vien_course_details.innerHTML = 'Chưa cập nhật giảng viên cho môn học này';
        }
    });

    onValue(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/thong_bao'), (snapshot) => {
        if(snapshot.exists()){
            notification.innerHTML = snapshot.val();
        }
        else{
            notification.innerHTML = 'Chưa có thông báo';
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

