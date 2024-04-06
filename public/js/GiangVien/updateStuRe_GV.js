import { getDatabase, set, ref, child, get, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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
const db = getDatabase(app);
const auth = getAuth(app);

let ten_mon_hoc = sessionStorage.getItem('ten_mon_hoc');
let lop = sessionStorage.getItem('lop');
let ma_mon = sessionStorage.getItem('ma_mon');
var semes = "";
var stdNo = 0;
var tbody = document.getElementById('tbody1');
var closepop = document.getElementById('closepop');
let header = document.getElementById('header');


async function getSemes(){ // Chuyển đổi getSemes thành một hàm async
    try {
        const snapshot = await get(ref(db, 'MonHoc/hoc_ki_hien_tai'));
        if (snapshot.exists()) {
            return snapshot.val(); // Trả về giá trị ngay lập tức nếu có
        } else {
            return "N/A"; // Trả về "N/A" nếu không tồn tại
        }
    } catch (error) {
        console.error(error);
        return "N/A"; // Trả về "N/A" trong trường hợp có lỗi
    }
}

function formatProcData(proc) {
    let formattedString = '';
    for (const key in proc) {
        if (proc.hasOwnProperty(key)) {
            const component = proc[key];         
            // Tạo chuỗi với định dạng "Tên: Điểm | "
            formattedString += `${component.ten}: ${component.diem} | `;
        }
    }
    // Cắt bỏ ký tự '|' cuối cùng khỏi chuỗi
    return formattedString.slice(0, -2);
}

function getStuName(studentID) { 
    return new Promise((resolve, reject) => { //đợi kết quả từ Promise
        get(ref(db, 'SinhVien/' + studentID)).then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val().ho_va_ten);
            } else {
                resolve("N/A");
            }
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
function showEditPopup(proc, studentID) {
    const editContent = document.getElementById('editContent');
    editContent.innerHTML = ''; 

    Object.keys(proc).forEach((key, index) => {
        const component = proc[key];

        editContent.innerHTML += `<label>${component.ten}: </label><input type="text" id="input-${key}" value="${component.diem}"><br>`;
    });

    // Thêm nút Xác Nhận
    editContent.innerHTML += '<button id="confirmBtn">Xác nhận</button>';

    // Hiển thị pop-up và overlay
    document.getElementById('editPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Xử lý sự kiện click trên nút Xác Nhận
    document.getElementById('confirmBtn').onclick = function() {
        Object.keys(proc).forEach((key) => {
            // Truy xuất giá trị từ input và cập nhật vào proc
            var inputVal = document.getElementById(`input-${key}`).value;
            if(isNaN(inputVal)){
                inputVal = "N/A";
            }
            else if(inputVal < 0) 
                inputVal = 0;
            else if(inputVal > 10)
                inputVal = 10;
            proc[key].diem = inputVal;

            const updatePath = {};
            if(isNaN(inputVal))
                updatePath[key + '/diem'] = inputVal;
            else
                updatePath[key + '/diem'] = parseInt(inputVal);
            update(ref(db, 'SinhVien/' + studentID + '/Hoc_ki/' + semes + '/' + ma_mon + '/so_cot_diem'), updatePath)
            //.then(() => alert(`Đã cập nhật điểm cho ${studentID}, ${childKey}`))
            .catch((error) => console.error("Lỗi cập nhật điểm: ", error));
        });
    

        // Hiển thị thông báo cập nhật thành công
        alert('Cập nhật điểm thành công!');
    };
}

function closeEditPopup() {
    // Ẩn pop-up
    document.getElementById('editPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function AverCal(stuId, proc) {
    // Khởi tạo các biến cần thiết
    var aver = 0;
    var SubFail = false;

    for (const key in proc) {
        if (proc.hasOwnProperty(key)) {
            const component = proc[key]; // Lấy thông tin thành phần điểm
            var val = parseFloat(component.diem); // Chuyển đổi điểm sang số
            var vol = parseFloat(component.phan_tram.replace('%', '')) / 100; // Tính tỷ lệ phần trăm

            // Kiểm tra điều kiện val
            if (isNaN(val)) { // Kiểm tra nếu val không phải là số
                aver = "N/A";
                break;
            }
            if (val < 0) val = 0; // Điểm không thể âm
            if (val < parseInt(component.diem_toi_thieu)) { // Kiểm tra điểm tối thiểu
                SubFail = true;
                break;
            }
            aver += val * vol; // Tính toán điểm trung bình
        }
    }

    if (SubFail) {
        aver = 0; // Nếu không đạt điểm tối thiểu thì coi như rớt
    } else if (aver !== "N/A") {
        aver = Math.round(aver * 100) / 100; // Làm tròn điểm trung bình
    }

    // Cập nhật điểm trung bình vào cơ sở dữ liệu
    const AveRef = ref(db, 'SinhVien/' + stuId + '/Hoc_ki/' + semes + '/' + ma_mon);
    const updatePath = {'DTB_10': aver};
    update(AveRef, updatePath)
    .then(() => console.log("Điểm trung bình đã được cập nhật thành công"))
    .catch((error) => console.error("Lỗi tính điểm trung bình: ", error));
}
function AddItemToTable(name, id, proc) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');


    td1.innerHTML = ++stdNo;
    td2.innerHTML = name;
    td3.innerHTML = id;

    const procRef = ref(db, 'SinhVien/' + id + '/Hoc_ki/' + semes + '/' + ma_mon + '/so_cot_diem');
    onValue(procRef, (snapshot) =>{ 
        if (snapshot.exists()) {
            td4.innerHTML = formatProcData(proc); 
            AverCal(id, proc);
            get(ref(db, 'SinhVien/' + id + '/Hoc_ki/' + semes + '/' + ma_mon)).then((snapshot) => {
                if (snapshot.exists()) {
                    td5.innerHTML = snapshot.val().DTB_10;
                    } else {
                        td5.innerHTML = "N/A";
                        alert("No data available");
                        console.log("No data available");
                    }
            }).catch((error) => {
                console.error(error);
            });

        } else {
            alert("No data available");
            console.log("No data available");
        }
    });

    td6.innerHTML = '<button class="edit-btn">Nhập điểm</button>';
   // Tìm nút chỉnh sửa trong td4 và thêm sự kiện click
   const editBtn = td6.querySelector('.edit-btn');
   editBtn.onclick = function() {
       showEditPopup(proc, id); // proc sẽ được sử dụng để hiển thị dữ liệu hiện có trong pop-up
   };

   trow.appendChild(td1);
   trow.appendChild(td2);
   trow.appendChild(td3);
   trow.appendChild(td4);
   trow.appendChild(td5);
   trow.appendChild(td6);

    tbody.appendChild(trow);
}
function InitStuRes(studentID, val = 'N/A'){
    get(ref(db, 'SinhVien/' + studentID + '/Hoc_ki/' + semes + '/' + ma_mon + '/so_cot_diem')).then((snapshot) => {

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
            if (!childSnapshot.val().diem) {
                const updatePath = {};
                updatePath[childKey + '/diem'] = val; 
                
                update(ref(db, 'SinhVien/' + studentID + '/Hoc_ki/' + semes + '/' + ma_mon + '/so_cot_diem'), updatePath)
                .then(() => console.log(`Đã cập nhật điểm cho ${studentID}, ${childKey}`))
                .catch((error) => console.error("Lỗi cập nhật điểm: ", error));
            }
            });
            } else {
                alert("No data available");
                console.log("No data available");
            }
    }).catch((error) => {
        console.error(error);
    });
}

async function AddAllItemsToTable(StuList) {
    stdNo = 0;
    for (let studentID of StuList) {
        await InitStuRes(studentID);
        const dbref = ref(db, 'SinhVien/' + studentID + '/Hoc_ki/' + semes + '/' + ma_mon);
        get(dbref).then(async (snapshot) => {
        //onValue(dbref, (snapshot) =>{
            if (snapshot.exists()) {
                const name = await getStuName(studentID); // Đảm bảo rằng name đã sẵn sàng
                AddItemToTable(name, studentID, snapshot.val().so_cot_diem);
            } else {
                alert("No data available");
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

function showStuRe(){
    const StuList_sb_ref = ref(db, 'MonHoc/' + ma_mon + '/LopHoc/' + lop + '/sinh_vien' );
    var StuList = [];
    get(StuList_sb_ref).then(async (snapshot) => {
        snapshot.forEach(childSnapshot => {
            StuList.push(childSnapshot.key);
        });
        tbody.innerHTML = "";
        AddAllItemsToTable(StuList);
    });
}


function GetAllDataRealtime(){
    showStuRe();
}
closepop.addEventListener('click', evt => {
    closeEditPopup();
});
window.addEventListener('load', async () => {
    semes = await getSemes(); // Chờ đợi cho đến khi getSemes hoàn tất
    header.style.display = 'flex';
    header.style.justifyContent = 'center'; // Căn giữa theo chiều ngang
    GetAllDataRealtime();
});
