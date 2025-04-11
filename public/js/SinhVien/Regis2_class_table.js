import { getDatabase, set, ref, child, get, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration



const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


var stdNo = 0;
var tbody = document.getElementById('tbody1');
var header = document.getElementById('header');

let selectedSubjectKey = sessionStorage.getItem('selectedSubjectKey');
let SemesterInp = sessionStorage.getItem('currentSemester');
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

function SetHeader(){
    const studentPath = 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp + '/' + selectedSubjectKey;

    header.style.display = 'flex';
    header.style.justifyContent = 'center'; // Căn giữa theo chiều ngang
    //header.style.alignItems = 'center'; // Căn giữa theo chiều dọc, nếu bạn muốn
    //header.style.height = '100vh'; // Ví dụ: cho container chiều cao toàn màn hình

    get(ref(db, studentPath)).then((snapshot) => {
        header.innerHTML = snapshot.val().ten_mon_hoc;
    }).catch((error) => {
        header.innerHTML = "Không tìm thấy môn học";
    });

}
function StuAdd(classid, cursize, maxsize) {
    const maxSize = parseInt(maxsize, 10);
    if(cursize >= maxsize){
        alert("Lớp đã đủ số lượng, bạn vui lòng chọn lớp khác");
        return;
    }
   const studentPath = 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp + '/' + selectedSubjectKey;

    const classPath = 'MonHoc/' + selectedSubjectKey + '/LopHoc/' + classid + '/sinh_vien';

    const studentRef = ref(db, studentPath);
    const classRef = ref(db, classPath); 


    get(ref(db, classPath + '/' + UserInfo.id)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Bạn đã có trong danh sách đăng ký của lớp");
            console.log("Bạn đã có trong danh sách đăng ký của lớp");
        } else {
            // Duyệt qua các lớp của môn học này để kiểm tra
            const subjectPath = 'MonHoc/' + selectedSubjectKey + '/LopHoc';
            get(ref(db, subjectPath)).then((subjectSnapshot) => {
                if (subjectSnapshot.exists()) {
                    let isRegisteredInOtherClass = false;
                    subjectSnapshot.forEach((childSnapshot) => {
                        // Loại trừ lớp hiện tại khỏi việc kiểm tra
                        if (childSnapshot.key !== classid && childSnapshot.val().sinh_vien && childSnapshot.val().sinh_vien[UserInfo.id]) {
                            alert(`Môn học này bạn đã đăng ký vào lớp có mã là ${childSnapshot.key}, đề xuất chuyển lớp?`);
                            isRegisteredInOtherClass = true;
                            // Xóa UserInfo.id từ lớp cũ (làm nếu cần)
                            const oldClassRef = ref(db, `${subjectPath}/${childSnapshot.key}/sinh_vien/${UserInfo.id}`);
                            remove(oldClassRef).then(() => {
                                console.log(`Đã xóa sinh viên khỏi lớp ${childSnapshot.key}`);
                            });
    
                            // Thêm vào lớp mới
                            update(classRef, { [UserInfo.id]: true }).then(() => {
                                console.log("Đã thêm sinh viên vào lớp mới");
                                alert("Đã thêm sinh viên vào lớp mới");
                            });
                            update(studentRef, { lop: classid }).then(() => {
                                console.log("Đã cập nhật thông tin lớp cho sinh viên");
                            });
                            return true; // Break khỏi vòng lặp
                        }
                    });
                    if (!isRegisteredInOtherClass) {
                        // Thêm sinh viên vào lớp mới nếu không tìm thấy trong lớp khác
                        update(classRef, { [UserInfo.id]: true }).then(() => {
                            console.log("Đã thêm sinh viên vào lớp mới");
                        });
                        update(studentRef, { lop: classid }).then(() => {
                            console.log("Đã cập nhật thông tin lớp cho sinh viên");
                            alert("Đã cập nhật thông tin lớp cho sinh viên");
                        });
                    }
                }
            }).catch((error) => {
                console.error("Lỗi khi kiểm tra sinh viên trong các lớp:", error);
            });
        }
    }).catch((error) => {
        console.error("Lỗi khi kiểm tra sinh viên trong lớp:", error);
    });
}

function lecName(lecid) {
    const LecRef = ref(db, 'GiangVien/' + lecid);
    return get(LecRef).then(snapshot => {
        if (snapshot.exists()) {
            return snapshot.val().ho_va_ten; 
        } else {
            alert("No data available");
            return "N/A"; 
        }
    }).catch(error => {
        console.error(error);
        return "N/A"; 
    });
}
function StuCount(sinhVienData) {

    if (typeof sinhVienData === 'object' && sinhVienData !== null) {
        // Nếu là một đối tượng, sử dụng Object.keys() để lấy mảng các key
        return Object.keys(sinhVienData).length;
    } else if (Array.isArray(sinhVienData)) {
        // Nếu trực tiếp là một mảng, trả về độ dài của mảng
        return sinhVienData.length;
    } else {
        return 0;
    }
}
function AddItemToTable(classid, lecid, currentSize, maxSize){
    let tbody = document.getElementById('tbody1'); 
    let trow = document.createElement("tr");

    let classSize = `${StuCount(currentSize)}/${maxSize}`;

    let td5 = document.createElement('td');
    td5.innerHTML= classSize;
    td5.style.textAlign = "center";

    let td6 = document.createElement('td');
    td6.style.textAlign = "center";

    let chooseClassButton = document.createElement('button');
    chooseClassButton.innerHTML = "Chọn";
    chooseClassButton.style.display = "inline-block";
    chooseClassButton.style.margin = "auto";

    chooseClassButton.onclick = function() {
        if(confirm("Bạn có muốn chọn lớp này không?")) {
            StuAdd(classid, StuCount(currentSize), maxSize); // Sử dụng `classid` được truyền vào hàm AddItemToTable
            console.log("Lớp đã được chọn");
        }
    };
    td6.appendChild(chooseClassButton);

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.innerHTML= ++stdNo; 

    lecName(lecid).then(name => {
        td2.innerHTML = name;
    }).catch(error => {
        console.error(error);
        td2.innerHTML = "N/A";
    });
    td4.innerHTML= classid;
    td3.innerHTML= lecid;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5); 
    trow.appendChild(td6); 

    tbody.appendChild(trow);
}

function GetAllDataRealtime(){
    SetHeader();
    const classlistRef = ref(db, 'MonHoc/' + selectedSubjectKey  + '/LopHoc');

    get(ref(db, 'MonHoc/' + selectedSubjectKey)).then((snapshot) => {
        let Maxsize = ""; 
        if (snapshot.exists()) {
            Maxsize = snapshot.val().si_so_tung_lop || "9999";

            onValue(classlistRef, (classlistSnapshot) => {
                stdNo = 0;
                document.getElementById("tbody1").innerHTML = "";
                classlistSnapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    AddItemToTable(childSnapshot.key, childData.giang_vien, childData.sinh_vien, Maxsize); // số lượng sinh viên là động
                });
            });
        } else {
            alert("No data available");
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
window.onload = GetAllDataRealtime;
