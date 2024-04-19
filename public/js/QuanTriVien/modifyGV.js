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
let SubInp = document.getElementById('subInp');
let CancelSubInp = document.getElementById('cancelsubInp');
let AddSubInp = document.getElementById('addsubInp');
let SexInp = document.getElementById('sexInp');
let DobInp = document.getElementById('dobInp');
let CccdInp = document.getElementById('cccdInp');
let BangCapInp = document.getElementById('bangcapInp');

let AddBtn = document.getElementById('AddBtn');
let RetBtn = document.getElementById('RetBtn');
let UpdBtn = document.getElementById('UpdBtn');
let DelBtn = document.getElementById('DelBtn');
let AddSubBtn = document.getElementById('AddSubBtn');
let CanSubBtn = document.getElementById('CanSubBtn');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let AddData = evt => {
    if(IdInp.value == "" || NameInp.value == "" || EmailInp.value == "" || PassInp.value == "" || AddressInp.value == "" || PhoneInp.value == "" || CccdInp.value == "" || BangCapInp.value == "" || SexInp.value == "" || DobInp.value == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn thêm giảng viên này?") == false) {
        return;
    }
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
        .then((credentials) => {
            set(ref(db, 'GiangVien/' + IdInp.value), {
                ho_va_ten: NameInp.value,
                email: EmailInp.value,
                id: IdInp.value,
                so_dien_thoai: PhoneInp.value,
                mat_khau: PassInp.value,
                dia_chi: AddressInp.value,
                cccd: CccdInp.value,
                gioi_tinh: SexInp.value,
                ngay_sinh: DobInp.value,
                bang_cap: BangCapInp.value
            });
            alert("Đăng ký thông tin thành công! ");
        }

        )
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let AddSubjectData = () => {
    if(IdInp.value == "") {
        alert("Vui lòng nhập mã số giảng viên!");
        return;
    }
    if(AddSubInp.value == "" ) {
        alert("Vui lòng nhập môn học cần thêm!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn thêm môn học này?") == false) {
        return;
    }
    let s1 = new String(AddSubInp.value);
    for(let i = 0; i < s1.length; i++) {
        if(s1[i] == ',' || (s1[i] >= '0' && s1[i] <= '9') || (s1[i] >= 'A' && s1[i] <= 'Z')) {}
        else {
            alert("Môn học không hợp lệ!");
            return;
        }
    }
    let str = new String();
    const dbRef = ref(db);
    get(child(dbRef, 'GiangVien/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().mon != null) {
                str = snapshot.val().mon; //gán môn học cũ vào str
            }
            else {
                str = "";
            }
        } else {
            alert("No data available");
            console.log("No data available");
            return;
        }

        if (str.length > 0) {
            str += ("," + AddSubInp.value); //thêm môn học mới vào str
        }
        else {
            str = AddSubInp.value;
        }
        update(ref(db, 'GiangVien/' + IdInp.value), {
            mon: str
        });
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let s = new String(AddSubInp.value);
        let n = s.length;
        let arr = new Array();
        for (let i = 0; i < n; i++) {
            if (s[i] == ',') {
                arr.push(s.substring(0, i));
                s = s.substring(i + 1, n);
                n = s.length;
                i = 0;
            }
            else if (i == n - 1) arr.push(s);
        }
        let sophantucuamang = arr.length;


        for (let i = 0; i < sophantucuamang; i++) {
            set(ref(db, 'MonHoc/' + arr[i] + '/tong_so_giang_vien/' + IdInp.value), {
                ho_va_ten: NameInp.value
            });
        }
        alert("Thêm " + sophantucuamang + " môn mới thành công!");
        AddSubInp.value = "";
    });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let CancelSubjectData = () => {
    if(IdInp.value == "") {
        alert("Vui lòng nhập mã số giảng viên!");
        return;
    }
    if(CancelSubInp.value == "") {
        alert("Vui lòng nhập môn học cần xóa!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn xóa môn học này?") == false) {
        return;
    }
    let s1 = new String(CancelSubInp.value);
    for(let i = 0; i < s1.length; i++) {
        if(s1[i] == ',' || (s1[i] >= '0' && s1[i] <= '9') || (s1[i] >= 'A' && s1[i] <= 'Z')) {}
        else {
            alert("Môn học không hợp lệ!");
            return;
        }
    }
    let str = new String(); //chuỗi môn học cũ
    const dbRef = ref(db);
    get(child(dbRef, 'GiangVien/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().mon != null) {
                str = snapshot.val().mon;
            }
            else {
                str = "";
                alert("Chưa có môn nào để xóa!");
                return;
            }
        } else {
            alert("No data available");
            console.log("No data available");
            return;
        }

        let s = new String(CancelSubInp.value); // chuỗi môn học cần xóa
        let n = s.length;
        let arr = new Array(); //mảng chứa các môn học cần xóa
        for (let i = 0; i < n; i++) {
            if (s[i] == ',') {
                arr.push(s.substring(0, i));
                s = s.substring(i + 1, n);
                n = s.length;
                i = 0;
            }
            else if (i == n - 1) arr.push(s);
        }
        let sophantucuamang = arr.length;
        for (let i = 0; i < sophantucuamang; i++) {
            remove(ref(db, 'MonHoc/' + arr[i] + '/tong_so_giang_vien/' + IdInp.value));
        }

        let s_tmp = new String(str);
        let n_tmp = s_tmp.length;
        let arr_tmp = new Array();
        for (let i = 0; i < n_tmp; i++) {
            if (s_tmp[i] == ',') {
                arr_tmp.push(s_tmp.substring(0, i));
                s_tmp = s_tmp.substring(i + 1, n_tmp);
                n_tmp = s_tmp.length;
                i = 0;
            }
            else if (i == n_tmp - 1) arr_tmp.push(s_tmp);
        }
        let sophantucuamang_tmp = arr_tmp.length;
        if (sophantucuamang_tmp == sophantucuamang) {
            update(ref(db, 'GiangVien/' + IdInp.value), {
                mon: null
            });
            alert("Đã xóa hết môn giảng viên này giảng dạy!");
            CancelSubInp.value = "";
            return;
        }


        let tenmonhoccuoicung = new String("");
        for (let i = 0; i < sophantucuamang_tmp; i++) {
            let flag = false;
            for (let j = 0; j < sophantucuamang; j++) {
                if (arr_tmp[i] == arr[j]) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                tenmonhoccuoicung += (arr_tmp[i] + ",");
            }
        }
        if (tenmonhoccuoicung.length > 0) {
            tenmonhoccuoicung = tenmonhoccuoicung.substring(0, tenmonhoccuoicung.length - 1);
        }
        else {
            alert("Đã xóa hết môn giảng viên này giảng dạy!");
            tenmonhoccuoicung = null;
        }
        update(ref(db, 'GiangVien/' + IdInp.value), {
            mon: tenmonhoccuoicung
        });

        alert("Xóa " + sophantucuamang + " môn cũ thành công!");
        CancelSubInp.value = "";
    });

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let RetData = () => {
    if(IdInp.value == "") {
        alert("Vui lòng nhập mã số giảng viên!");
        return;
    }
    const dbRef = ref(db);
    get(child(dbRef, 'GiangVien/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            NameInp.value = snapshot.val().ho_va_ten;
            EmailInp.value = snapshot.val().email;
            PhoneInp.value = snapshot.val().so_dien_thoai;
            PassInp.value = snapshot.val().mat_khau;
            AddressInp.value = snapshot.val().dia_chi;
            CccdInp.value = snapshot.val().cccd;
            SexInp.value = snapshot.val().gioi_tinh;
            DobInp.value = snapshot.val().ngay_sinh;
            BangCapInp.value = snapshot.val().bang_cap;
            if (snapshot.val().mon != null) {
                SubInp.value = snapshot.val().mon;
            }
            else {
                SubInp.value = "Chưa có môn nào";
            }
        } else {
            alert("No data available");
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let UpdData = () => {
    if(IdInp.value == "") {
        alert("Vui lòng nhập mã số giảng viên!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn cập nhật giảng viên này?") == false) {
        return;
    }
    let str = new String();
    const dbRef = ref(db);
    get(child(dbRef, 'GiangVien/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().mon != null) {
                str = snapshot.val().mon;
            }
            else {
                str = "";
            }
        } else {
            alert("No data available");
            console.log("No data available");
        }

        update(ref(db, 'GiangVien/' + IdInp.value), {
            ho_va_ten: NameInp.value,
            so_dien_thoai: PhoneInp.value,
            mat_khau: PassInp.value,
            dia_chi: AddressInp.value,
            cccd: CccdInp.value,
            gioi_tinh: SexInp.value,
            ngay_sinh: DobInp.value,
            bang_cap: BangCapInp.value,
            email: EmailInp.value
        });

        let s = new String(str);
        let n = s.length;
        let arr = new Array();
        for (let i = 0; i < n; i++) {
            if (s[i] == ',') {
                arr.push(s.substring(0, i));
                s = s.substring(i + 1, n);
                n = s.length;
                i = 0;
            }
            else if (i == n - 1) arr.push(s);
        }
        let sophantucuamang = arr.length;


        for (let i = 0; i < sophantucuamang; i++) {
            update(ref(db, 'MonHoc/' + arr[i] + '/tong_so_giang_vien/' + IdInp.value), {
                ho_va_ten: NameInp.value
            })
        }
        alert("Cập nhật thông tin thành công!");
    });
}

let DelData = () => {
    if(IdInp.value == "") {
        alert("Vui lòng nhập mã số giảng viên!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn xóa giảng viên này?") == false) {
        return;
    }
    remove(ref(db, 'GiangVien/' + IdInp.value));
    let s = new String(SubInp.value);
    let n = s.length;
    let arr = new Array();
    for (let i = 0; i < n; i++) {
        if (s[i] == ',') {
            arr.push(s.substring(0, i));
            s = s.substring(i + 1, n);
            n = s.length;
            i = 0;
        }
        else if (i == n - 1) arr.push(s);
    }
    let sophantucuamang = arr.length;
    for (let i = 0; i < sophantucuamang; i++) {
        remove(ref(db, 'MonHoc/' + arr[i] + '/tong_so_giang_vien/' + IdInp.value));
    }
    alert("Data deleted successfully!");
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

AddSubBtn.addEventListener('click', evt => {
    evt.preventDefault();
    AddSubjectData();

});

CanSubBtn.addEventListener('click', evt => {
    evt.preventDefault();
    CancelSubjectData();
});
let SignOutBtn = document.getElementById("signoutbutton");


let SignOut = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "index.html";
}

SignOutBtn.addEventListener('click', SignOut);