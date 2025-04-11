import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration


const app = initializeApp(firebaseConfig);

import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth(app);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let NameInp = document.getElementById('nameInp');
let IdInp = document.getElementById('idInp');
let CityInp = document.getElementById('cityInp');
let DistrictInp = document.getElementById('districtInp');
let XaInp = document.getElementById('xaInp');
let AddressInp = document.getElementById('addressInp');
let PhoneInp = document.getElementById('phoneInp');
let TinChiInp = document.getElementById('tinchihoanthanh');
let SexInp = document.getElementById('sexInp');
let DobInp = document.getElementById('dobInp');
let CccdInp = document.getElementById('cccdInp');
let NganhInp = document.getElementById('nganhInp');
let HeDaoTaoInp = document.getElementById('hedaotaoInp');
let StartStudyInp = document.getElementById('startstudyInp');
let EndStudyInp = document.getElementById('endstudyInp');

let AddBtn = document.getElementById('AddBtn');
let RetBtn = document.getElementById('RetBtn');
let UpdBtn = document.getElementById('UpdBtn');
let DelBtn = document.getElementById('DelBtn');

let AddData = evt => {
    if(IdInp.value == "" || NameInp.value == "" || EmailInp.value == "" || PassInp.value == "" || CityInp.value == "" || AddressInp.value == "" || PhoneInp.value == "" || SexInp.value == "" || DobInp.value == "" || CccdInp.value == "" || NganhInp.value == "" || HeDaoTaoInp.value == "" || StartStudyInp.value == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn thêm sinh viên này?") == false) {
        return;
    }
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value, IdInp.value)
        .then((credentials) => {
            set(ref(db, 'SinhVien/' + IdInp.value), {
                ho_va_ten: NameInp.value,
                email: EmailInp.value,
                id: IdInp.value,
                so_dien_thoai: PhoneInp.value,
                mat_khau: PassInp.value,
                dia_chi: AddressInp.value,
                cccd: CccdInp.value,
                gioi_tinh: SexInp.value,
                ngay_sinh: DobInp.value,
                nganh: NganhInp.value,
                he_dao_tao: HeDaoTaoInp.value,
                ngay_bat_dau_hoc: StartStudyInp.value,
                so_tin_chi_hoan_thanh: "0",
            });
            if (HeDaoTaoInp.value == "Chính quy") {
                EndStudyInp.value = StartStudyInp.value.trim().substring(0, 6) + (parseInt(StartStudyInp.value.trim().substring(6, 10)) + 4).toString();
            }
            else if (HeDaoTaoInp.value == "Chất lượng cao") {
                EndStudyInp.value = StartStudyInp.value.trim().substring(0, 6) + (parseInt(StartStudyInp.value.trim().substring(6, 10)) + 5).toString();
            }
            else if (HeDaoTaoInp.value == "Vừa học vừa làm") {
                EndStudyInp.value = StartStudyInp.value.trim().substring(0, 6) + (parseInt(StartStudyInp.value.trim().substring(6, 10)) + 3).toString();
            }
            update(ref(db, 'SinhVien/' + IdInp.value), {
                ngay_ket_thuc_hoc: EndStudyInp.value
            });

            alert("Đăng ký thành công!");
        }

        )
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });

}

let RetData = () => {
    if (IdInp.value == "") {
        alert("Vui lòng nhập mã số sinh viên!");
        return;
    }
    const dbRef = ref(db);
    get(child(dbRef, 'SinhVien/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            NameInp.value = snapshot.val().ho_va_ten;
            EmailInp.value = snapshot.val().email;
            PhoneInp.value = snapshot.val().so_dien_thoai;
            PassInp.value = snapshot.val().mat_khau;
            AddressInp.value = snapshot.val().dia_chi;
            CccdInp.value = snapshot.val().cccd;
            SexInp.value = snapshot.val().gioi_tinh;
            DobInp.value = snapshot.val().ngay_sinh;
            NganhInp.value = snapshot.val().nganh;
            HeDaoTaoInp.value = snapshot.val().he_dao_tao;
            StartStudyInp.value = snapshot.val().ngay_bat_dau_hoc;
            EndStudyInp.value = snapshot.val().ngay_ket_thuc_hoc;
            so_tin_chi_hoan_thanh.value = snapshot.val().so_tin_chi_hoan_thanh;
        } else {
            alert("Không có dữ liệu sinh viên này!");
        }
    }).catch((error) => {
        console.error(error);
    });
}

let UpdData = () => {
    if (IdInp.value == "") {
        alert("Vui lòng nhập mã số sinh viên!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn cập nhật sinh viên này?") == false) {
        return;
    }
    update(ref(db, 'SinhVien/' + IdInp.value), {
        ho_va_ten: NameInp.value,
        email: EmailInp.value,
        so_dien_thoai: PhoneInp.value,
        mat_khau: PassInp.value,
        dia_chi: AddressInp.value,
        cccd: CccdInp.value,
        ngay_sinh: DobInp.value,
        gioi_tinh: SexInp.value,
        nganh: NganhInp.value,
        he_dao_tao: HeDaoTaoInp.value,
        ngay_bat_dau_hoc: StartStudyInp.value
    }).then(() => {
        if (HeDaoTaoInp.value == "Chính quy") {
            EndStudyInp.value = StartStudyInp.value.trim().substring(0, 6) + (parseInt(StartStudyInp.value.trim().substring(6, 10)) + 4).toString();
        }
        else if (HeDaoTaoInp.value == "Chất lượng cao") {
            EndStudyInp.value = StartStudyInp.value.trim().substring(0, 6) + (parseInt(StartStudyInp.value.trim().substring(6, 10)) + 5).toString();
        }
        else if (HeDaoTaoInp.value == "Vừa học vừa làm") {
            EndStudyInp.value = StartStudyInp.value.trim().substring(0, 6) + (parseInt(StartStudyInp.value.trim().substring(6, 10)) + 3).toString();
        }
        update(ref(db, 'SinhVien/' + IdInp.value), {
            ngay_ket_thuc_hoc: EndStudyInp.value
        });
        alert("Cập nhật thành công!");
    }).catch((error) => {
        alert("Cập nhật không thành công!");
    });
}

let DelData = () => {
    if (IdInp.value == "") {
        alert("Vui lòng nhập mã số sinh viên!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?") == false) {
        return;
    }
    remove(ref(db, 'SinhVien/' + IdInp.value)).then(() => {
        alert("Data deleted successfully!");
    }).catch((error) => {
        alert("Data could not be deleted!" + error);
        console.error(error);
    });
}

AddBtn.addEventListener('click', AddData);

RetBtn.addEventListener('click', evt => {
    evt.preventDefault();
    RetData();
});

UpdBtn.addEventListener('click', evt => {
    evt.preventDefault();
    UpdData();
});

DelBtn.addEventListener('click', evt => {
    evt.preventDefault();
    DelData();
});

let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let MsgHead = document.getElementById("msg");
let GreetHead = document.getElementById("greet");
let SignOutBtn = document.getElementById("signoutbutton");


let SignOut = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "index.html";
}

SignOutBtn.addEventListener('click', SignOut);