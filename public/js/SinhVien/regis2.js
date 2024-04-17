import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

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

import { getDatabase, set, ref, onValue, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth(app);

let IdInp = document.getElementById("idInp");
let SemesterInp = document.getElementById("semesterInp");
let SubInp = document.getElementById("subInp");

let Ficlass = document.getElementById("Ficlass");
let RetSubBtn = document.getElementById("RetSubBtn");

let SignOutBtn = document.getElementById("signoutbutton");
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MsgHead = document.getElementById("msg");
let GreetHead = document.getElementById("greet");



let getclasstable = () => {
    const dbRef = ref(db);
    if(idInp.value == ""){
        alert("Bạn chưa nhập mã môn học");
    }
    else{
        get(child(dbRef, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value)).then((snapshot) => {
            if (snapshot.exists()) {
                const subjects = snapshot.val();
                delete subjects.ten_hoc_ki;

                const subjectKeys = Object.keys(subjects);
                if (!subjectKeys.includes(idInp.value)) {
                    alert("Bạn không có đăng ký môn học này ở đợt 1");
                    return; 
                }
                if (subjectKeys.length > 0) {
                    sessionStorage.setItem('selectedSubjectKey', idInp.value);
                    sessionStorage.setItem('currentSemester', SemesterInp.value);

                    window.open("regis2/Regis2_class_table.html", '_blank');
                } else {
                    SubInp.value = "Chưa có môn nào";
                }
            } else {
                SubInp.value = "Chưa có môn nào";
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}

function Registered_Subjects_addSubs(subject){        
    if(subject.key != "ten_hoc_ki"){   
        let class_name = subject.val().lop || "N/A";
        const subjectString = `${subject.val().ten_mon_hoc} (${subject.key}), lớp: ${class_name}`;
        if (subInp.value === "") {
            subInp.value = subjectString;
        } else {
            subInp.value += "; " + subjectString;
        }
    }
}
let Registered_Subjects = () => {
    const dbRef = ref(db, 'SinhVien/' + UserInfo.id +'/Hoc_ki/' + SemesterInp.value);
    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()){
            subInp.value = "";
            snapshot.forEach((childSnapshot) => {
                Registered_Subjects_addSubs(childSnapshot);
            });
        } else {
            subInp.value = "Không tìm thấy dữ liệu trong học kỳ này của sinh viên";
        }
    });
};

Ficlass.addEventListener('click', evt => {
    evt.preventDefault();
    getclasstable();
});

RetSubBtn.addEventListener('click', evt => {
    evt.preventDefault();
    window.location.reload();

});

let SignOut = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "index.html";
}


SignOutBtn.addEventListener('click', SignOut);
SignOutBtn.addEventListener('click', SignOut);
window.addEventListener('load', () => {
    const dbRef = ref(db);
    get(child(dbRef, 'MonHoc/hoc_ki_hien_tai')).then((snapshot) => {
        if (snapshot.exists()) {
            SemesterInp.value = snapshot.val();
            SemesterInp.innerHTML = snapshot.val();
        } else {
            alert("No data available");
            console.log("No data available");
        }
        Registered_Subjects(); // Displays the number of subjects registered for round 1 
    }).catch((error) => {
        console.error(error);
    });
});
