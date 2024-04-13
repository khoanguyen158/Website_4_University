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

let HkInp = document.getElementById('hkInp');
let NameInp = document.getElementById('nameInp');
let IdInp = document.getElementById('idInp');
let TimeInp = document.getElementById('timeInp');
let Sogio1tiethocInp = document.getElementById('sogio1tiethocInp');
let LimitInp = document.getElementById('limitInp');
let TCInp = document.getElementById('tcInp');
let GradeInp = document.getElementById('gradeInp');

let ChangeBtn = document.getElementById('changeBtn');
let AddBtn = document.getElementById('AddBtn');
let RetBtn = document.getElementById('RetBtn');
let UpdBtn = document.getElementById('UpdBtn');
let DelBtn = document.getElementById('DelBtn');

ChangeBtn.addEventListener('click', evt => {
    if (confirm("Bạn có chắc chắn muốn thay đổi học kì hiện tại? \nLưu ý: Việc chỉnh sửa sai học kì có thể dẫn đến cơ sở dữ liệu bị ảnh hưởng nghiêm trọng!") == false) {
        return;
    }
    evt.preventDefault();

    //cap nhat hoc_ki_hien_tai
    update(ref(db, 'MonHoc/'), {
        hoc_ki_hien_tai: HkInp.value
    });

    //xoa mon_chi_tiet cua toan bo GiangVien
    let dbRef = ref(db, 'GiangVien/');
    get((dbRef)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                let key = childSnapshot.key;
                remove(ref(db, 'GiangVien/' + key + '/mon_chi_tiet/'));
            });
        } else {
            alert("No data available");
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    //xoa trong MonHoc:
    //LopHoc
    //gv_day_tung_lop
    //si_so_tung_lop
    //so_luong_lop
    //tong_so_sinh_vien
    //thong_tin_tuan_hoc;
    let dbRef1 = ref(db, 'MonHoc/');
    get((dbRef1)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                let key = childSnapshot.key;
                if (key !== 'dot_dki' && key !== 'hoc_ki_hien_tai') {
                    remove(ref(db, 'MonHoc/' + key + '/LopHoc/'));
                    remove(ref(db, 'MonHoc/' + key + '/gv_day_tung_lop/'));
                    remove(ref(db, 'MonHoc/' + key + '/si_so_tung_lop/'));
                    remove(ref(db, 'MonHoc/' + key + '/so_luong_lop/'));
                    remove(ref(db, 'MonHoc/' + key + '/tong_so_sinh_vien/'));
                    remove(ref(db, 'MonHoc/' + key + '/thong_tin_tuan_hoc/'));
                }
            });
        } else {
            alert("No data available");
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    alert("Học kì hiện tại đã được cập nhật!");
    window.location.reload();
});

let AddData = evt => {
    if (IdInp.value == "") {
        alert("Vui lòng nhập mã số môn học!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn thêm môn học này?") == false) {
        return;
    }
    evt.preventDefault();

    let s = GradeInp.value.split("~");

    createUserWithEmailAndPassword(auth, IdInp.value + '@gmail.com', IdInp.value)
        .then((credentials) => {
            set(ref(db, 'MonHoc/' + IdInp.value), {
                tong_so_sinh_vien: "0",
                tong_so_giang_vien: "0",
                mo_ta_mon_hoc: {
                    text_hien_thi: GradeInp.value,
                    so_tin_chi: TCInp.value,
                    ten_mon_hoc: NameInp.value,
                    thoi_gian_hoc: TimeInp.value,
                    so_gio_mot_tiet_hoc: Sogio1tiethocInp.value,
                    si_so_toi_thieu: LimitInp.value
                }
            });
            for (let i = 1; i < s.length; i++) {
                let tmp = s[i].split("-");
                set(ref(db, 'MonHoc/' + IdInp.value + '/mo_ta_mon_hoc/so_cot_diem/' + 'cot' + i), {
                    ten: tmp[0].trim().substring(1),
                    phan_tram: tmp[1],
                    diem_toi_thieu: tmp[2].slice(0, -1)
                });
            }
            alert("Đăng ký thành công!")
        })
        .catch((error) => {
            alert("Vui lòng nhập mã số môn học!");
        });
}

let RetData = () => {
    const dbRef = ref(db);
    get(child(dbRef, 'MonHoc/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            NameInp.value = snapshot.val().mo_ta_mon_hoc.ten_mon_hoc;
            TimeInp.value = snapshot.val().mo_ta_mon_hoc.thoi_gian_hoc;
            Sogio1tiethocInp.value = snapshot.val().mo_ta_mon_hoc.so_gio_mot_tiet_hoc;
            TCInp.value = snapshot.val().mo_ta_mon_hoc.so_tin_chi;
            GradeInp.value = snapshot.val().mo_ta_mon_hoc.text_hien_thi;
            LimitInp.value = snapshot.val().mo_ta_mon_hoc.si_so_toi_thieu;
        } else {
            alert("Không có dữ liệu");
        }
    }).catch((error) => {
        console.error(error);
    });
}

let UpdData = () => {
    if (IdInp.value == "") {
        alert("Vui lòng nhập mã số môn học!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn cập nhật môn học này?") == false) {
        return;
    }
    let s = GradeInp.value.split("~");
    update(ref(db, 'MonHoc/' + IdInp.value), {
        mo_ta_mon_hoc: {
            text_hien_thi: GradeInp.value,
            so_tin_chi: TCInp.value,
            ten_mon_hoc: NameInp.value,
            thoi_gian_hoc: TimeInp.value,
            so_gio_mot_tiet_hoc: Sogio1tiethocInp.value,
            si_so_toi_thieu: LimitInp.value
        }
    }
    ).then(() => {
        for (let i = 1; i < s.length; i++) {
            let tmp = s[i].split("-");
            update(ref(db, 'MonHoc/' + IdInp.value + '/mo_ta_mon_hoc/so_cot_diem/' + 'cot' + i), {
                ten: tmp[0].trim().substring(1),
                phan_tram: tmp[1],
                diem_toi_thieu: tmp[2].slice(0, -1)
            });
        }
        alert("Data updated successfully!");
    }).catch((error) => {
        alert("Data could not be updated!" + error);
        console.error(error);
    });
}

let DelData = () => {
    if (IdInp.value == "") {
        alert("Vui lòng nhập mã số môn học!");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa môn học này?") == false) {
        return;
    }
    remove(ref(db, 'MonHoc/' + IdInp.value)).then(() => {
        alert("Data deleted successfully!");
    }).catch((error) => {
        alert("Data could not be deleted!" + error);
        console.error(error);
    });
}

let dulieudot = async () => {
    let dbref = ref(db, 'MonHoc/');
    let dbdata = await get(dbref);
    let data = dbdata.val();
    let tmp = data.dot_dki;

    if (tmp == "Close") {
        IdInp.disabled = true;
        NameInp.disabled = true;
        TimeInp.disabled = true;
        Sogio1tiethocInp.disabled = true;
        TCInp.disabled = true;
        GradeInp.disabled = true;
        LimitInp.disabled = true;

        AddBtn.disabled = true;
        RetBtn.disabled = true;
        UpdBtn.disabled = true;
        DelBtn.disabled = true;
    }
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

window.addEventListener('load', dulieudot);
window.addEventListener('load', () => {
    const dbRef = ref(db);
    get(child(dbRef, 'MonHoc/hoc_ki_hien_tai')).then((snapshot) => {
        if (snapshot.exists()) {
            HkInp.value = snapshot.val();
        } else {
            alert("Không có dữ liệu");
        }
    }).catch((error) => {
        console.error(error);
    });
});