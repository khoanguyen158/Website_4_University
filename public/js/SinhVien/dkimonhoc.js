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
import { getAuth} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth(app);

let IdInp = document.getElementById("idInp");
let NameInp = document.getElementById("nameInp");
let TimeInp = document.getElementById("timeInp");
let TCInp = document.getElementById("tcInp");
let SemesterInp = document.getElementById("semesterInp");
let SubInp = document.getElementById("subInp");
let CancelSubInp = document.getElementById("cancelsubInp");
let AddSubInp = document.getElementById("addsubInp");

let RetBtn = document.getElementById("RetBtn");
let AddSubBtn = document.getElementById("AddSubBtn");
let CanSubBtn = document.getElementById("CanSubBtn");
let RetSubBtn = document.getElementById("RetSubBtn");

let SignOutBtn = document.getElementById("signoutbutton");
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));


let RetData = () => {
    const dbRef = ref(db);
    get(child(dbRef, 'MonHoc/' + IdInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            NameInp.value = snapshot.val().mo_ta_mon_hoc.ten_mon_hoc;
            TimeInp.value = snapshot.val().mo_ta_mon_hoc.thoi_gian_hoc;
            TCInp.value = snapshot.val().mo_ta_mon_hoc.so_tin_chi;
        } else {
            alert("Không tìm thấy môn học!");
        }
    }).catch((error) => {
        console.error(error);
    });
}

let RetSubData = () => {
    const dbRef = ref(db);
    get(child(dbRef, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            const subjects = snapshot.val();
            delete subjects.ten_hoc_ki;

            const subjectKeys = Object.keys(subjects);

            if (subjectKeys.length > 0) {

                SubInp.value = subjectKeys.join(',');
            } else {
                SubInp.value = "Chưa có môn nào";
            }
        } else {
            SubInp.value = "Chưa có môn nào";
        }
    }).catch((error) => {
        console.error(error);
    });
};




let AddSubjectData = async () => {
    if (AddSubInp.value == "") {
        alert("Vui lòng nhập mã (các) môn học cần thêm!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn thêm môn học này?") == false) return;
    let str = new String();
    const dbRef = ref(db);
    let s = new String(AddSubInp.value);
    let n = s.length;
    let arr = new Array();
    for (let i = 0; i < n; i++) {
        if (s[i] == ',' || (s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= '0' && s[i] <= '9')) { }
        else {
            alert("Dữ liệu nhập vào không hợp lệ!");
            return;
        }
    }
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
    for (let i = 0; i < arr.length; i++) {
        get(child(dbRef, 'MonHoc/' + arr[i])).then((snapshot) => {
            if (!snapshot.exists()) {
                alert("Không tìm thấy môn học " + arr[i]);
                return;
            }
        }).catch((error) => {
            console.error(error);
        });
        // let snapshot = get((dbRef, 'MonHoc/' + arr[i]));
        // alert("Tìm thấy môn học");
        // if (!snapshot.exists()) {
        //     alert("Không tìm thấy môn học " + arr[i]);
        //     return;
        // }
        // else{
        //     alert("Tìm thấy môn học " + arr[i]);
        // }
    };
    update(ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value), {
        ten_hoc_ki: (SemesterInp.value).trim().substring(2)
    });
    for (let i = 0; i < arr.length; i++) {
        get(child(dbRef, 'MonHoc/' + arr[i])).then((snapshot) => {
            if (snapshot.exists()) {
                NameInp.value = snapshot.val().mo_ta_mon_hoc.ten_mon_hoc;
                TimeInp.value = snapshot.val().mo_ta_mon_hoc.thoi_gian_hoc;
                TCInp.value = snapshot.val().mo_ta_mon_hoc.so_tin_chi;
                set(ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value + '/' + arr[i]), {
                    DTB_10: "0",
                    ten_mon_hoc: NameInp.value,
                    thoi_gian_hoc: TimeInp.value,
                    so_tin_chi: TCInp.value,
                    Pass_Fail: 'waiting',
                });
            }

        }).catch((error) => {
            console.error(error);
        });
    }

    for (let i = 0; i < arr.length; i++) {
        get(child(dbRef, 'MonHoc/' + arr[i] + '/mo_ta_mon_hoc/so_cot_diem')).then((snapshot) => {
            if (snapshot.exists()) {
                let so_cot_diem = snapshot.val();
                // Duyệt qua từng cột điểm
                for (let cot in so_cot_diem) {
                    let phan_tram = so_cot_diem[cot].phan_tram;
                    let diem_toi_thieu = so_cot_diem[cot].diem_toi_thieu;
                    let ten = so_cot_diem[cot].ten;
                    // Cập nhật thông tin cột điểm vào cơ sở dữ liệu sinh viên
                    set(ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value + '/' + arr[i] + '/so_cot_diem/' + cot), {
                        phan_tram: phan_tram,
                        diem_toi_thieu: diem_toi_thieu,
                        ten: ten,
                    });
                }
            } else {
                console.error("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    for (let i = 0; i < sophantucuamang; i++) {
        set(ref(db, 'MonHoc/' + arr[i] + '/tong_so_sinh_vien/' + UserInfo.id), {
            ho_va_ten: UserInfo.ho_va_ten
        })

    }
    alert("Thêm " + sophantucuamang + " môn mới thành công!");
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


let CancelSubjectData = () => {
    if (CancelSubInp.value == "") {
        alert("Vui lòng nhập mã (các) môn học cần xóa!");
        return;
    }
    if (confirm("Bạn có chắc chắn muốn xóa môn học này?") == false) return;

    for (let i = 0; i < CancelSubInp.value.length; i++) {
        if (CancelSubInp.value[i] == ',' || (CancelSubInp.value[i] >= 'A' && CancelSubInp.value[i] <= 'Z') || (CancelSubInp.value[i] >= '0' && CancelSubInp.value[i] <= '9')) { }
        else {
            alert("Dữ liệu nhập vào không hợp lệ!");
            return;
        }
    }
    const dbRef = ref(db);
    get(child(dbRef, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Tìm thấy học kì");
            let s = new String(CancelSubInp.value);
            let n = s.length;
            let arr = new Array();
            let notEnrolledSubjects = [];
            for (let i = 0; i < n; i++) {
                if (s[i] == ',') {
                    arr.push(s.substring(0, i));
                    s = s.substring(i + 1, n);
                    n = s.length;
                    i = 0;
                } else if (i == n - 1) arr.push(s);
            }
            let sophantucuamang = arr.length;

            if (sophantucuamang == 0) {
                alert("Không có môn học nào được xóa!");
                return;
            }

            let deletedCount = arr.length;

            // Xóa dữ liệu môn học của sinh viên
            Promise.all(arr.map(subject => {
                return get(child(dbRef, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value + '/' + subject)).then((snapshot) => {
                    if (snapshot.exists()) {
                        remove(ref(db, 'SinhVien/' + UserInfo.id + '/Hoc_ki/' + SemesterInp.value + '/' + subject));
                        remove(ref(db, 'MonHoc/' + subject + '/tong_so_sinh_vien/' + UserInfo.id));
                        get(child(dbRef, 'MonHoc/' + subject + '/tong_so_sinh_vien/')).then((snapshot) => {
                            if (!snapshot.exists()) {
                                update(ref(db, 'MonHoc/' + subject), {
                                    tong_so_sinh_vien: "0",
                                });
                            }
                        });
                    } else {
                        notEnrolledSubjects.push(subject);
                        deletedCount--;
                    }
                });
            })).then(() => {
                alert("Xóa " + deletedCount + " môn cũ thành công!");
                if (notEnrolledSubjects.length > 0) {
                    alert("Sinh viên chưa đăng kí môn: " + notEnrolledSubjects.join(", "));
                }
            });
        } else {
            alert("No data available");
            console.log("No data available");
        }
    }).catch((error) => {
        alert("No data available");
        console.error(error);
    });
};

RetBtn.addEventListener('click', evt => {
    evt.preventDefault();
    RetData();
});

RetSubBtn.addEventListener('click', evt => {
    evt.preventDefault();
    RetSubData();
});

AddSubBtn.addEventListener('click', evt => {
    evt.preventDefault();
    AddSubjectData();
    window.location.reload();
});

CanSubBtn.addEventListener('click', evt => {
    evt.preventDefault();
    CancelSubjectData();
    window.location.reload();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', () => {
    const dbRef = ref(db);
    get(child(dbRef, 'MonHoc/hoc_ki_hien_tai')).then((snapshot) => {
        if (snapshot.exists()) {
            SemesterInp.innerHTML = snapshot.val();
            SemesterInp.value = snapshot.val();
            //RetSubData();
        } else {
            alert("Không tìm thấy dữ liệu học kì!");
        }
    });
});