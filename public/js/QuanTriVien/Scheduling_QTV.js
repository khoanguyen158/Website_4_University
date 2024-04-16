import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
var closepop = document.getElementById('closepop');

function showEditPopup(Room, Camp, ClassTime, Week, ClassID, subId, day) {
    const editContent = document.getElementById('editContent');
    editContent.innerHTML = ''; 

    editContent.innerHTML = `
        <label>Phòng học: </label><input type="text" id="editRoom" value="${Room}"><br>
        <label>Cơ sở: </label><input type="text" id="editCamp" value="${Camp}"><br>
        <label>Thứ: </label><input type="text" id="editDaytime" value="${day}"><br>
        <label>Giờ học: </label><input type="text" id="editClassTime" value="${ClassTime}"><br>
        <label>Tuần học: </label><input type="text" id="editWeek" value="${Week}"><br>
    `;

    editContent.innerHTML += '<button id="confirmBtn">Xác nhận</button>';

    // Hiển thị pop-up và overlay
    document.getElementById('editPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Xử lý sự kiện click trên nút Xác Nhận
    document.getElementById('confirmBtn').onclick = function() {
        const newRoom = document.getElementById('editRoom').value;
        const newCamp = document.getElementById('editCamp').value;
        const newClassTime = document.getElementById('editClassTime').value;
        const newWeek = document.getElementById('editWeek').value;
        const newDay = document.getElementById('editDaytime').value;

        update(ref(db, 'MonHoc/' +subId  + '/LopHoc/' +  ClassID), {
            phong: newRoom,
            co_so: newCamp,
            thoi_luong: newClassTime,
            thu: newDay,
        });
        update(ref(db, 'MonHoc/' +subId), {
            thong_tin_tuan_hoc: newWeek,
        });
        alert('Cập nhật thông tin thành công!');
        closeEditPopup();
    };
}
function closeEditPopup() {
    // Ẩn pop-up
    document.getElementById('editPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
function AddItemToTable(subname, subId, ClassID, Room,
     Camp, ClassTime, Week, day) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');
    let td9 = document.createElement('td');
    let td10 = document.createElement('td');



    td1.innerHTML = ++stdNo;
    td2.innerHTML = subname;
    td3.innerHTML = subId;
    td4.innerHTML = ClassID;
    td5.innerHTML = Room;
    td6.innerHTML = Camp;
    td7.innerHTML = day;

    td8.innerHTML = ClassTime;
    td9.innerHTML = Week;
    td10.innerHTML = '<button class="edit-btn">Điều chỉnh</button>';

    const editBtn = td10.querySelector('.edit-btn');
    editBtn.onclick = function() {
        showEditPopup(Room, Camp, ClassTime, Week, ClassID, subId, day); 
    };
 

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    trow.appendChild(td10);

    tbody.appendChild(trow);
}

function getName(SubID) {
    const subjectData = SubID.val();
    return subjectData.mo_ta_mon_hoc && subjectData.mo_ta_mon_hoc.ten_mon_hoc
           ? subjectData.mo_ta_mon_hoc.ten_mon_hoc
           : "N/A";
}

function AddAllItemsToTable(Subjects) {
    stdNo = 0;
    Subjects.forEach((subjectSnapshot) => {
        const subject = subjectSnapshot.val();
        const SubID = subjectSnapshot.key;
        const StuWeek = subject.thong_tin_tuan_hoc;
        const SubName = getName(subjectSnapshot);
        // Kiểm tra xem 'LopHoc' có tồn tại không và có phải là một đối tượng không
        const lopHocs = subject.LopHoc;
        if(lopHocs && typeof lopHocs === 'object') {
            // Lặp qua từng lớp học
            Object.keys(lopHocs).forEach((ClassID) => {
                const lopHoc = lopHocs[ClassID];
                AddItemToTable(SubName, SubID, ClassID, lopHoc.phong || "N/A", 
                lopHoc.co_so || "N/A", lopHoc.thoi_luong || "N/A", 
                StuWeek|| "N/A",  lopHoc.thu || "N/A");
            });
        }
    });
}

function GetAllDataRealtime() {
   const dbRef = ref(db, 'MonHoc');
    onValue(dbRef, (snapshot) => {
        const subs = [];
        snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            if(key !== 'dot_dki' && key !== 'hoc_ki_hien_tai') {
                subs.push(childSnapshot);
            }
        });
        tbody.innerHTML = "";
        AddAllItemsToTable(subs);
    });
}
closepop.addEventListener('click', evt => {
    closeEditPopup();
});

window.onload = GetAllDataRealtime;



