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

let updateResult = document.getElementById('upRe');



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

updateResult.addEventListener('click', () => {
    window.location.href = 'updateStuRe_GV.html';
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var tbody = document.getElementById('tbody1');
function AddVideoToTable(x0, x1, x2) {
    let trow = document.createElement("tr");
    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');


    td0.innerHTML = x0;
    td1.innerHTML = x1;
    td2.innerHTML = x2;
    td3.innerHTML = '<a href="video.html" id=VIDEO_HAS_ID_' + x1 + '>Xem</a>';
    td4.innerHTML = 'Xóa';
    td5.innerHTML = 'Ẩn';

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);
}

function AddAllVideosToTable(ID_video) {
    let idx = 0;
    ID_video.forEach(id => {
        onValue(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/video/' + id), (snapshot) => {
            if (snapshot.exists()) {
                idx++;
                let video = snapshot.val();
                AddVideoToTable(idx, id, video.ten);
                document.getElementById('VIDEO_HAS_ID_' + id).addEventListener('click', () => {
                    sessionStorage.setItem('ID_VIDEO', id);
                    sessionStorage.setItem('VIDEO_' + id, video.link);
                });
            }
        });
    });
}

function GetAllVideosRealTime() {
    const dbRef = ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/video');
    onValue(dbRef, (snapshot) => {
        if (!snapshot.exists()) {
            return;
        }
        document.getElementById('Table').style.display = '';
        var ID_video = [];
        snapshot.forEach(childSnapshot => {
            ID_video.push(childSnapshot.key);
        });
        //tbody.innerHTML = "";
        AddAllVideosToTable(ID_video);
    })
}

window.addEventListener('load', GetAllVideosRealTime);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let Id_video = document.getElementById('id_video');
let Title_video = document.getElementById('title_video');
let Ma_nhung = document.getElementById('ma_nhung');
let them_Btn = document.getElementById('them_btn');

let them_video = () => {
    if(confirm('Bạn có chắc muốn thêm video này không?') == false) return;
    //hàm sẽ thêm video mới vào firebase realtime
    
        let videoIdMatch = Ma_nhung.value.match(/[?&]v=(.{11})/);
        let videoId = videoIdMatch ? videoIdMatch[1] : null;
    
        if(videoId === null){
            videoIdMatch = Ma_nhung.value.match(/youtu.be\/(.{11})/);
            videoId = videoIdMatch ? videoIdMatch[1] : null;
        }
    
        
    
    set(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/video/' + Id_video.value),{
        link:"https://www.youtube.com/embed/" + videoId,
        ten: Title_video.value,
    });

    alert('Thêm video thành công');
    window.location.reload();
};

them_Btn.addEventListener('click', them_video);