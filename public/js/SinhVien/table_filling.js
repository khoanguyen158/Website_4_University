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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import { getDatabase, set, ref, child, get, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


var stdNo = 0;
var tbody = document.getElementById('tbody1');

/*function calculateYearlyAverage(process, final, processWeight, finalWeight) {
    // Tính điểm trung bình cả năm
    let yearlyAverage = (process * processWeight) + (final * finalWeight);

    // Làm tròn đến 2 chữ số sau dấu phẩy và chuyển chuỗi trở lại thành số
    yearlyAverage = parseFloat(yearlyAverage.toFixed(2));

    return yearlyAverage;
}*/
function formatProcData(proc) {
    let formattedString = '';
    // Duyệt qua từng key trong object proc
    for (const key in proc) {
        // Kiểm tra xem thuộc tính có phải là thuộc tính của đối tượng không (để tránh lấy thuộc tính từ prototype chain)
        if (proc.hasOwnProperty(key)) {
            const component = proc[key];
            // Tạo chuỗi với định dạng "Tên: Điểm | "
            formattedString += `${component.ten}: ${component.diem} | `;
        }
    }
    // Cắt bỏ ký tự '|' cuối cùng khỏi chuỗi
    return formattedString.slice(0, -2);
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
    td2.innerHTML = name;
    td3.innerHTML = id;
    td4.innerHTML = cre;
    td5.innerHTML = formatProcData(proc);
    td6.innerHTML = fi;
    //td7.innerHTML = calculateYearlyAverage(proc, fi, 0.4, 0.6);

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
    //newCell.style.maxWidth = "50px"; // Thiết lập chiều rộng tối đa cho ô
    //newCell.style.width = "100%"; // Ô sẽ cố gắng chiếm 100% chiều rộng có sẵn (tối đa 500px)
}
/*
const Credit = { Total_Credit: 0, Total_Se_cre: 0,  }; // sô tín chỉ: tổng tích lũy, tích lũy học kỳ
function Credit_Calc(Cre, totalCre, seCre){
    if(Cre){
        totalCre += Cre;
        seCre += Cre;
    }
}
function AddAllItemsToTable(TheSemester){
    stdNo = 0;
    Credit.Total_Credit = 0;
    Credit.Total_Se_cre = 0;
    TheSemester.forEach(semester => {
        addSemesterRow(semester.SeName);
        Credit.Total_Se_cre = 0;
        Object.keys(semester).forEach(subjectKey => {
            if (subjectKey !== "SeName") {
                let subject = semester[subjectKey];
                AddItemToTable(subject.NameOfSb, subject.SbID, subject.Process, subject.Final, subject.Cre);
                Credit_Calc(subject.Cre, Total_Credit, Total_Se_cre);
            }
        });
    });
    var tt_Cre = document.getElementById('ttCre');
    tt_Cre.innerText =  Credit.Total_Credit;
    
}
*/
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
    /*TheSemester.forEach(element => {
        AddItemToTable(element.NameOfSb, element.SbID, element.Process, element.Final) // field name source!!
    });*/
    TheSemester.forEach(semester => {
        addSemesterRow(semester.ten_hoc_ki);
        Credit.Total_Se_cre = 0; // Khởi tạo lại số tín chỉ tích lũy cho học kỳ
        stdNo = 0;
        Object.keys(semester).forEach(subjectKey => {
            if (subjectKey !== "ten_hoc_ki") {
                //alert(subjectKey + " " + semester.val);
                let subject = semester[subjectKey];
                // let namex;
                // get(child(ref(db), 'MonHoc/' + subjectKey)).then((snapshot) => {
                //     if (snapshot.exists()) {
                //         //namex = snapshot.val();
                //         namex = subjectKey;
                //     }
                // });
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
    //const dbRef = ref(db, 'NguyenVanA'); // chưa được hiện thực, chỉ có format, qua onvalue mới truy cập.
    //const dbRef = ref(db); // tham chiếu đến root

    //---------------- NEED CHANGE!!
    //var IdInlink = 'SinhVien/NguyenVanA'; // -> need semester ->an outside loop for semes
    //const dbRef = ref(db, IdInlink);
    //let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    //let Name = document.getElementById("studentName");
    //let ID = document.getElementById("studentId");
    //Name.innerText = `${UserInfo.username}!`;
    //ID.innerText = `${UserInfo.ID}!`;
    //StuName.innerText = 'Nguyễn Văn A';
    //StuID.innerText = "2222";

    let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    //var StuName = document.getElementById('studentName');
    //var StuID = document.getElementById('studentId');
    //StuName.innerText = UserInfo.ho_va_ten;
    //StuID.innerText = UserInfo.id;
    const dbRef = ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki');
    //----------------

    /*get(child(dbRef, "NguyenVanA")) // in database => lấy dữ liệu 1 lần  -> NguyenVanA -> se1{Id,name,...}; se2{Id, name}...
    .then( (snapshot)=>{
        var subjects = [];
        snapshot.forEach(childSnapshot =>{
            subjects.push(childSnapshot.val());
        });
        AddAllItemsToTable(subjects);
    });*/

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


