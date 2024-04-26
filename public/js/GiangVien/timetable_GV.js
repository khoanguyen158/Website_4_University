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
async function AddRow(SubID, ClassID, SubName) {
    try {
        const weekSnapshot = await get(ref(db, 'MonHoc/' + SubID));
        let week = weekSnapshot.exists() ? weekSnapshot.val().thong_tin_tuan_hoc : "N/A";
        const classSnapshot = await get(ref(db, 'MonHoc/' + SubID + '/LopHoc/' + ClassID));
        if (classSnapshot.exists()) {
            var data = classSnapshot.val();
            get(ref(db, 'MonHoc/' + SubID + '/mo_ta_mon_hoc/so_gio_mot_tiet_hoc')).then((snapshot) => {
                let ClassTime = "";
                if (snapshot.exists()) {
                    ClassTime = snapshot.val();
                }
                return ClassTime; // Trả về giá trị của ClassTime
            }).then((ClassTime) => {
                let x = 0;
                if (data.thoi_luong && ClassTime) {
                    x = Number(data.thoi_luong) + Number(ClassTime) - 1;
                }
                AddItemToTable(SubName || "N/A", SubID || "N/A",
                    ClassID || "N/A", data.phong || "N/A", data.co_so || "N/A",
                    data.thoi_luong + " -> " + x || "N/A", week || "N/A", data.thu || "N/A");
            });
        } else {
            AddItemToTable(SubName || "N/A", SubID || "N/A",
                ClassID || "N/A", "N/A", "N/A",
                "N/A", week || "N/A", "N/A");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function AddAllItemsToTable(subs) {
    stdNo = 0;
    tbody.innerHTML = "";
    for (const subject of subs) {
        AddRow(subject.key, subject.lop, subject.ten_mon_hoc);
    }
}

async function GetAllDataRealtime() {

    let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    const dbRef = ref(db, 'GiangVien/' + UserInfo.id + '/mon_chi_tiet');
    onValue(dbRef, async (snapshot) => {
        const subIDs = [];
        snapshot.forEach(childSnapshot => {
            childSnapshot.forEach(subChildSnapshot => {
                const key = childSnapshot.key;
                const lop = subChildSnapshot.key;
                subIDs.push({ key: key, lop: lop });
            });
        });

        for (let item of subIDs) {
            try {
                const ten_mon_hoc = await getSubName(item.key);
                item.ten_mon_hoc = ten_mon_hoc;
            } catch (error) {
                console.error("Error fetching subject name:", error);
                item.ten_mon_hoc = "Error";
            }
        }

        AddAllItemsToTable(subIDs);
    })
}

function getSubName(subID) {
    return new Promise((resolve, reject) => {
        get(ref(db, 'MonHoc/' + subID + '/mo_ta_mon_hoc/ten_mon_hoc')).then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val());
            } else {
                resolve("N/A");
            }
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}


window.onload = GetAllDataRealtime;



