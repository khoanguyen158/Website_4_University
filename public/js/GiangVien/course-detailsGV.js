import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, onValue, ref, set, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
// let deleteVideo = (videoId) => {
//     let videoRef = ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/video/' + videoId);
//     remove(videoRef)
//       .then(() => {
//         alert("Video đã được xóa thành công");
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error removing video: ", error);
//       });
// };

var tbody = document.getElementById('tbody1');
function AddVideoToTable(x0, x1, x2) {
    let trow = document.createElement("tr");
    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    


    td0.innerHTML = x0;
    td1.innerHTML = x1;
    td2.innerHTML = x2;
    td3.innerHTML = '<a href="video.html" id=VIDEO_HAS_ID_' + x1 + '>Xem</a>';

let btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'Xóa';
    btnDelete.className = 'btn btn-danger';
    btnDelete.addEventListener('click', (event) => {
        if(confirm('Bạn có chắc muốn xoá video này không?') == false) return;
        // Xóa dòng đại diện cho video ra khỏi table
        tbody.removeChild(trow);
         // Xóa video khỏi firebase 
        deleteVideo(x1);
        alert('Xoá video thành công');
        window.location.reload();
       
    });
    td4.appendChild(btnDelete);

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    

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


function deleteVideo(videoId) {
    // Nhận tham chiếu đến vị trí của video cần xóa
   
    const videoRef = ref(db, `MonHoc/${ma_mon}/LopHoc/${lop}/video/${videoId}`);
    
    // Xóa video
    remove(videoRef)        
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Tai Lieu ~~~~~~~~~~~~~~~~~~~~~~~~~~~
var tbody2 = document.getElementById('tbody2');
function AddTLToTable(x0, x1, x2) {
    let trow = document.createElement("tr");
    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    


    td0.innerHTML = x0;
    td1.innerHTML = x1;
    td2.innerHTML = x2;
    td3.innerHTML = '<a href="bai_kiem_tra.html" id=TL_HAS_ID_' + x1 + '>Xem</a>';

let btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'Xóa';
    btnDelete.className = 'btn btn-danger';
    btnDelete.addEventListener('click', (event) => {
        if(confirm('Bạn có chắc muốn xoá tài liệu này không?') == false) return;
        // Xóa dòng đại diện cho video ra khỏi table
        tbody2.removeChild(trow);
         // Xóa video khỏi firebase 
        deletetl(x1);
        alert('Xoá tài liệu thành công');
        window.location.reload();
       
    });
    td4.appendChild(btnDelete);

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    

    tbody2.appendChild(trow);
}

function AddAllTLToTable(ID_tl) {
    let idx = 0;
    ID_tl.forEach(id => {
        onValue(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/tailieu/' + id), (snapshot) => {
            if (snapshot.exists()) {
                idx++;
                let tl = snapshot.val();
                AddTLToTable(idx, id, tl.ten);
                document.getElementById('TL_HAS_ID_' + id).addEventListener('click', () => {
                    sessionStorage.setItem('ID_TL', id);
                    sessionStorage.setItem('TL_' + id, tl.link);
                });
            }
        });
    });
}

function GetAllTLRealTime() {
    const dbRef = ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/tailieu');
    onValue(dbRef, (snapshot) => {
        if (!snapshot.exists()) {
            return;
        }
        document.getElementById('Table2').style.display = '';
        var ID_tl = [];
        snapshot.forEach(childSnapshot => {
            ID_tl.push(childSnapshot.key);
        });
        //tbody.innerHTML = "";
        AddAllTLToTable(ID_tl);
    })
}

window.addEventListener('load', GetAllTLRealTime);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let Id_tl = document.getElementById('id_tl');
let Title_tl = document.getElementById('title_tl');
let Ma_nhungtl = document.getElementById('ma_nhungtl');
let themtl_Btn = document.getElementById('themtl_btn');

let them_tl = () => {
    if(confirm('Bạn có chắc muốn thêm tài liệu này không?') == false) return;
    //hàm sẽ thêm video mới vào firebase realtime
    
        // let videoIdMatch = Ma_nhung.value.match(/[?&]v=(.{11})/);
        // let videoId = videoIdMatch ? videoIdMatch[1] : null;
    
        // if(videoId === null){
        //     videoIdMatch = Ma_nhung.value.match(/youtu.be\/(.{11})/);
        //     videoId = videoIdMatch ? videoIdMatch[1] : null;
        // }
    
        
    
    set(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/tailieu/' + Id_tl.value),{
        link: Ma_nhungtl.value,
        ten: Title_tl.value,
    });

    alert('Thêm tài liệu thành công');
    window.location.reload();
};

themtl_Btn.addEventListener('click', them_tl);


function deletetl(tlId) {
    // Nhận tham chiếu đến vị trí của video cần xóa
   
    const tlRef = ref(db, `MonHoc/${ma_mon}/LopHoc/${lop}/tailieu/${tlId}`);
    
    // Xóa video
    remove(tlRef);        
}

//~~~~~~~~~~Tài liệu học tập~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let get_tai_lieu = () => {
    let dbRef1 = ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/tailieuhoctap');
    onValue(dbRef1, (snapshot) => {
        if (snapshot.exists()) {
            let tl = snapshot.val();
            document.getElementById('tai_lieu_message').innerHTML = "Link tài liệu hiện tại: " + '<a href=' + tl + '>' + tl + '</a>';
        }
        else {
            document.getElementById('tai_lieu_message').innerHTML = 'Chưa có tài liệu học tập';
        }
    });
}

let them_tai_lieu_btn = document.getElementById('them_tai_lieu_btn');

let them_tai_lieu = () => {
    let link_tai_lieu = document.getElementById('link_tai_lieu').value;
    set(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/tailieuhoctap'), link_tai_lieu);
    alert('Chỉnh sửa tài liệu học tập thành công');
};

them_tai_lieu_btn.onclick = () => {
    if(confirm('Bạn có chắc muốn thêm/chỉnh sửa tài liệu này không?') == false) return;
    them_tai_lieu();
    window.location.reload();
};

let xoa_tai_lieu_btn = document.getElementById('xoa_tai_lieu_btn');

let xoa_tai_lieu = () => {
    remove(ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/tailieuhoctap'));
    alert('Xoá tài liệu học tập thành công');
}

xoa_tai_lieu_btn.onclick = () => {
    if(confirm('Bạn có chắc muốn xoá tài liệu này không?') == false) return;
    xoa_tai_lieu();
    get_tai_lieu();
};

window.addEventListener('load', get_tai_lieu);