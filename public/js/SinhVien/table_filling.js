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

function formatProcData(proc) {
    let formattedString = '';
    // Duyệt qua từng key trong object proc
    for (const key in proc) {
        // Kiểm tra xem thuộc tính có phải là thuộc tính của đối tượng không (để tránh lấy thuộc tính từ prototype chain)
        if (proc.hasOwnProperty(key)) {
            const component = proc[key];
            // Tạo chuỗi với định dạng "Tên: Điểm | "
            formattedString += `${component.ten ||"N/A"}: ${component.diem || "N/A"} | `;
        }
    }
    // Cắt bỏ ký tự '|' cuối cùng khỏi chuỗi
    return formattedString.slice(0, -2);
}

function Status(fi_Re, proc){
    for (const key in proc) {
        if (proc.hasOwnProperty(key)) {
            const component = proc[key];
            if(!component.ten || !component.diem)
                return "N/A";
        }
    }
    if(fi_Re == 0)
         return "Không đạt";
    else if(fi_Re == "N/A" || !fi_Re)
        return "N/A";
    else
         return "Đạt";
}
function AddItemToTable(name, id, proc, fi, cre) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');



    td1.innerHTML = ++stdNo;
    td2.innerHTML = name || "N/A";
    td3.innerHTML = id || "N/A";
    td4.innerHTML = cre || "N/A";
    td5.innerHTML = formatProcData(proc);
    td6.innerHTML = fi || "N/A";
    td7.innerHTML = Status(fi, proc);

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    tbody.appendChild(trow);
}

function addSemesterRow(semester) {
    let table = document.getElementById("tbody1");
    let newRow = table.insertRow(-1); // Thêm vào cuối bảng
    let newCell = newRow.insertCell(0); // Tạo một ô mới

    // Sử dụng thuộc tính colspan để gộp ô
    // Giả sử bảng của bạn có 4 cột, thay đổi số lượng này tùy thuộc vào bảng cụ thể của bạn
    newCell.colSpan = "7";
    newCell.innerHTML = `Học kỳ: ${semester}`;
    newCell.style.textAlign = "center"; // Canh giữa nội dung trong ô

    // Thêm các thuộc tính CSS cho phông chữ to hơn và màu nền
    newCell.style.fontSize = "20px"; // Làm cho phông chữ to hơn
    newCell.style.backgroundColor = "#87CEEB";
    newCell.style.color = "white";
    newCell.style.borderTop = "2px solid black"; // Thêm đường viền phía trên
    newCell.style.borderBottom = "2px solid black"; // Thêm đường viền phía dưới

}

const Credit = { Total_Credit: 0, Total_Se_cre: 0 }; // Số tín chỉ: tổng tích lũy, tích lũy học kỳ

function Credit_Calc(subject) {
    if (subject.so_tin_chi) {
        Credit.Total_Credit += subject.so_tin_chi;
        Credit.Total_Se_cre += subject.so_tin_chi;
    }
}

function AddAllItemsToTable(TheSemester) {
    stdNo = 0;
    Credit.Total_Credit = 0; // Khởi tạo lại tổng số tín chỉ

    TheSemester.forEach(semester => {
        addSemesterRow(semester.ten_hoc_ki);
        Credit.Total_Se_cre = 0; // Khởi tạo lại số tín chỉ tích lũy cho học kỳ
        stdNo = 0;
        Object.keys(semester).forEach(subjectKey => {
            if (subjectKey !== "ten_hoc_ki") {
                let subject = semester[subjectKey];
                AddItemToTable(subject.ten_mon_hoc, subjectKey, subject.so_cot_diem, subject.DTB_10, subject.so_tin_chi);
                Credit_Calc(subject);
            }
        });
    });

    var tt_Cre = document.getElementById('ttCre');
    var se_Cre = document.getElementById('seCre');
    tt_Cre.innerText = Credit.Total_Credit;
    se_Cre.innerText = Credit.Total_Se_cre;
}

function GetAllDataRealtime() {


    let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

    const dbRef = ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki');


    onValue(dbRef, (snapshot) => {
        var semesters = [];
        snapshot.forEach(childSnapshot => {
            semesters.push(childSnapshot.val());
        });
        tbody.innerHTML = "";
        AddAllItemsToTable(semesters);
    })
}
window.onload = GetAllDataRealtime;

let SignOutBtn = document.getElementById('signoutbutton');
let SignOut = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "index.html";
}
SignOutBtn.addEventListener('click', SignOut);


