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



    td1.innerHTML = ++stdNo;
    td2.innerHTML = subname;
    td3.innerHTML = subId;
    td4.innerHTML = ClassID;
    td5.innerHTML = Room;
    td6.innerHTML = Camp;
    td7.innerHTML = day;

    td8.innerHTML = ClassTime;
    td9.innerHTML = Week;
 
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    tbody.appendChild(trow);
}

function getName(SubID) {
    const subjectData = SubID.val();
    return subjectData.mo_ta_mon_hoc && subjectData.mo_ta_mon_hoc.ten_mon_hoc
           ? subjectData.mo_ta_mon_hoc.ten_mon_hoc
           : "N/A";
}

function AddRow(SubID, ClassID, SubName){
    get(ref(db, 'MonHoc/' + SubID)).then((snapshot) => {
        let week = "";
        if (snapshot.exists()) {
            week = snapshot.val().thong_tin_tuan_hoc;
        }
        return week; // Trả về giá trị của week
    }).then((week) => {
        get(ref(db, 'MonHoc/' + SubID + '/LopHoc/' + ClassID)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                AddItemToTable(SubName || "N/A", SubID || "N/A",
                ClassID || "N/A", data.phong || "N/A", data.co_so || "N/A" ,
                data.thoi_luong || "N/A", week || "N/A", data.thu || "N/A");
            }
            else{
                AddItemToTable(SubName || "N/A", SubID || "N/A",
                ClassID || "N/A", "N/A", "N/A",
                 "N/A", week || "N/A", "N/A");
            }
        });
    });
}

function AddAllItemsToTable(Subjects) {
    stdNo = 0;
    Subjects.forEach((subject) => {
        AddRow(subject.key, subject.lop, subject.ten_mon_hoc);  
    });
}

function GetAllDataRealtime() {
    let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    var seID = "N/A";
    get(ref(db, 'MonHoc/hoc_ki_hien_tai')).then((snapshot) => {
         if (snapshot.exists()) {
             seID = snapshot.val();
             const dbRef = ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + seID);
             onValue(dbRef, (snapshot) => {
                 const subs = [];
                 snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const lop = childSnapshot.val().lop;  
                    const ten_mon_hoc = childSnapshot.val().ten_mon_hoc; 
                    if (key !== 'ten_hoc_ki') {
                        subs.push({ key: key, lop: lop,ten_mon_hoc: ten_mon_hoc });
                    }
                 });
                 tbody.innerHTML = "";
                 AddAllItemsToTable(subs);
             });
         } else {
             alert("Dữ liệu học kỳ hiện tại tạm thời đang cập nhật");
         }
     });
 }
 
window.onload = GetAllDataRealtime;



