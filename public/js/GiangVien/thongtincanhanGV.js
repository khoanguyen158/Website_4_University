import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const realdb = getDatabase(app);
const auth = getAuth(app);

//-------------------------------------------------------------
let EmailInp = document.getElementById('emailInp');
let NameInp = document.getElementById('nameInp');
let IdInp = document.getElementById('idInp');
let AddressInp = document.getElementById('addressInp');
let PhoneInp = document.getElementById('phoneInp');
let SexInp = document.getElementById('sexInp');
let DobInp = document.getElementById('dobInp');
let CccdInp = document.getElementById('cccd');
let bangcap = document.getElementById('bangcap');

let UpdBtn = document.getElementById('UpdBtn');

//let updBtn      = document.getElementById('UpdBtn');
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

const storage = getStorage();

var files = [];
var reader = new FileReader();
var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('upprogress');

var UpBtn = document.getElementById('upbtn');

let msgv = UserInfo.id;

var input = document.createElement('input');
input.type = 'file';

input.onchange = e => {
    files = e.target.files;

    var extension = msgv;
    var name = msgv;

    namebox.value = name;
    extlab.innerHTML = extension;

    reader.readAsDataURL(files[0]);
};

reader.onload = function () {
    myimg.src = reader.result;
    uploadNewImage(); // Automatically upload the selected image
};
// Function to upload a new image
async function uploadNewImage() {
    try {
        // Check if there is a previous image to delete
        const previousImageName = namebox.value.trim(); // Assuming namebox and extlab are defined elsewhere

        // Upload the new image
        const ImgToUpload = files[0];
        const ImgName = namebox.value.trim();

        const metaData = {
            contentType: ImgToUpload.type
        };

        const storageRef = sRef(storage, 'Img/imgUser/imgGV/' + msgv);
        const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

        UploadTask.on('state-changed', (snapshot) => {

        },
            () => {
                getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    SaveURLtoRealtimeDB(downloadURL);
                });
            });
    } catch (error) {
        console.error("Error uploading new image:", error);
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function displayAvt() {
    const storageRef = sRef(storage, 'Img/imgUser/imgGV/' + msgv);
    getDownloadURL(storageRef).then((url) => {
        document.getElementById('myimg').src = url;
    }).catch((error) => {
        console.error('Error getting image URL:', error);
    });
}

UpBtn.onclick = function () {
    input.click();
};

function getData() {
    const userRef = ref(realdb, `GiangVien/${UserInfo.id}`);

    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            // Hiển thị dữ liệu người dùng trên giao diện người dùng
            document.getElementById('nameInp').innerHTML = userData.ho_va_ten;
            document.getElementById('emailInp').innerHTML = userData.email;
            document.getElementById('idInp').value = userData.id;
            document.getElementById('addressInp').value = userData.dia_chi;
            document.getElementById('phoneInp').value = userData.so_dien_thoai;
            document.getElementById('dobInp').value = userData.ngay_sinh;
            document.getElementById('sexInp').value = userData.gioi_tinh;
            document.getElementById('cccd').value = userData.cccd;
            document.getElementById('bangcap').value = userData.bang_cap;
        } else {
            console.log("Không tìm thấy thông tin người dùng trong cơ sở dữ liệu.");
        }
    }).catch((error) => {
        console.error("Lỗi khi truy xuất dữ liệu từ cơ sở dữ liệu:", error);
    });

}

let UpdData = () => {
    const db = getDatabase(app);
    update(ref(db, 'GiangVien/' + UserInfo.id), {
        so_dien_thoai: PhoneInp.value,
        dia_chi: AddressInp.value,
        ngay_sinh: DobInp.value,
        gioi_tinh: SexInp.value,
        cccd: CccdInp.value,
        bang_cap: bangcap.value
    }).then(() => {
        alert("Cập nhật dữ liệu thành công!");
    }).catch((error) => {
        alert("Data could not be updated!" + error);
        console.error(error);
    });
}

window.addEventListener('load', () => {
    const UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    if (UserInfo) {
        getData();
        displayAvt();
    } else {
        console.log('User info not found in session storage.');
    }
})

UpdBtn.addEventListener('click', evt => {
    evt.preventDefault();
    UpdData();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // Sign out
// let SignOutBtn = document.getElementById("signoutbutton");
// let SignOut = () => {
//     sessionStorage.removeItem("user-creds");
//     sessionStorage.removeItem("user-info");
//     window.location.href = "index.html";
// }
// SignOutBtn.addEventListener('click', SignOut);