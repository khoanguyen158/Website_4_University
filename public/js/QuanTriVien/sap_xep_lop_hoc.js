import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

import { firebaseConfig  } from "../../../firebase-config.js"; // Import your Firebase configuration


const app = initializeApp(firebaseConfig);

import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth(app);

let Msg = document.getElementById('msg');
let dot_dki = document.getElementById('dot_dki');
let IdInp = document.getElementById('idInp');
let MinnumOfSvInp = document.getElementById('min_numofsvInp');
let NumOfClassInp = document.getElementById('numofclassInp');
let SiSoInp = document.getElementById('sisoInp');
let DkiGvInp = document.getElementById('dkigvInp');

let CloseBtn = document.getElementById('closeBtn');
let UpdkiBtn = document.getElementById('updkiBtn');
let FindBtn = document.getElementById('findBtn');
let AddBtn = document.getElementById('AddBtn');
let UpdBtn = document.getElementById('UpdBtn');
let tuan_hoc = document.getElementById('tuan_hoc');
let Sche = document.getElementById('Sche');
let submit_tuan_hoc_Btn = document.getElementById('submit_tuan_hoc'); 


let Update_dot_dki = () => {
    if (dot_dki.value == "Đợt 1") {
        dot_dki.value = "Đóng đợt 1";
    }
    else if (dot_dki.value == "Đóng đợt 1") {
        dot_dki.value = "Đợt 2";
    }
    else if (dot_dki.value == "Đợt 2") {
        dot_dki.value = "Đóng đợt 2";
    }
    else if (dot_dki.value == "Đóng đợt 2") {
        dot_dki.value = "Close";
    }
    else {
        dot_dki.value = "Đợt 1";
    }
    update(ref(db, 'MonHoc/'), {
        dot_dki: dot_dki.value
    });
    alert('Cập nhật đợt đăng kí môn học thành công');
    window.location.reload();
}

let Mo_dong_dot_dki = () => {
    if (dot_dki.value == "Close") {
        dot_dki.value = "Đợt 1";
        alert('Mở đợt đăng kí môn học thành công');
    }
    else {
        dot_dki.value = "Close";
        alert('Kết thúc đợt đăng kí môn học thành công');
    }
    update(ref(db, 'MonHoc/'), {
        dot_dki: dot_dki.value
    });
    window.location.reload();
}

let dulieudot = async () => {
    //cho code ké khúc load dữ liệu này lên nha
    get(ref(db, 'MonHoc/hoc_ki_hien_tai')).then((snapshot) => {
        if (snapshot.exists()) {
            Msg.innerHTML = "SẮP XẾP LỚP HỌC CHO " + snapshot.val();
        }
    })
    //~~~~~~~~~~~~~~~~ cảm ơn ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let dbref = ref(db, 'MonHoc/');
    let dbdata = await get(dbref);
    let data = dbdata.val();
    dot_dki.value = data.dot_dki;

    if(dot_dki.value == "Đóng đợt 1"){
        NumOfClassInp.disabled = false;
        SiSoInp.disabled = false;
        DkiGvInp.disabled = false;
        tuan_hoc.disabled = true;
        AddBtn.disabled = false;
        UpdBtn.disabled = false;
        submit_tuan_hoc_Btn.disabled = true;
        Sche.disabled = true;
    }

    else if(dot_dki.value == "Đóng đợt 2"){
        NumOfClassInp.disabled = true;
        SiSoInp.disabled = true;
        DkiGvInp.disabled = true;
        tuan_hoc.disabled = false;
        AddBtn.disabled = true;
        UpdBtn.disabled = true;
        submit_tuan_hoc_Btn.disabled = false;
        Sche.disabled = false;
    }

    else{
        NumOfClassInp.disabled = true;
        SiSoInp.disabled = true;
        DkiGvInp.disabled = true;
        tuan_hoc.disabled = true;
        AddBtn.disabled = true;
        UpdBtn.disabled = true;
        submit_tuan_hoc_Btn.disabled = true;
        Sche.disabled = true;
    }
}


let Find = async () => {
    if(IdInp.value == "") {
        alert('Vui lòng nhập mã môn học');
        return;
    }
    let id = IdInp.value;
    let dbref = ref(db, 'MonHoc/' + id);

    let dbdata = await get(dbref);
    let data = dbdata.val();
    if (data) {
        MinnumOfSvInp.value = data.mo_ta_mon_hoc.si_so_toi_thieu;
        let dbref1 = ref(db, 'MonHoc/' + id);
        let dbdata1 = await get(dbref1);
        let data1 = dbdata1.val();
        NumOfClassInp.value = data1.so_luong_lop;
        SiSoInp.value = data1.si_so_tung_lop;
        DkiGvInp.value = data1.gv_day_tung_lop;
        // Navigate to the new page if data exists

        sessionStorage.setItem("currentId", id);
        window.open("class_list.html", '_blank');
    } else {
        alert('Không tìm thấy môn học');
    }
}

let Add = async () => {
    if(IdInp.value == "") {
        alert('Vui lòng nhập mã môn học');
        return;
    }

    if(confirm('Bạn có chắc chắn muốn đăng kí lớp học không?') == false) {
        return;
    }
    let id = IdInp.value;
    let numofsv = Number(MinnumOfSvInp.value);
    let numofclass = NumOfClassInp.value;
    let siso = Number(SiSoInp.value);
    let dkigv = DkiGvInp.value;

    let dbref = ref(db, 'MonHoc/' + id);
    let dbdata = await get(dbref);
    let data = dbdata.val();
    if (siso < numofsv) {
        alert('Sĩ số mỗi lớp phải lớn hơn sĩ số tối thiểu');
        return;
    }

    if (data) {
        let dbref = ref(db, 'MonHoc/' + id + '/LopHoc/');
        let dbdata = await get(dbref);
        let data1 = dbdata.val();
        if (data1) {
            alert('Lớp học đã tồn tại, vui lòng sử dụng chức năng cập nhật thông tin');
        }
        else {
            update(ref(db, 'MonHoc/' + id), {
                so_luong_lop: numofclass,
                si_so_tung_lop: siso.toString(),
                gv_day_tung_lop: dkigv
            });
            for(let i = 0; i < dkigv.length; i++) {
                if(dkigv[i] == '-' || dkigv[i] == 'G' || dkigv[i] == 'V' || (dkigv[i] >= '0' && dkigv[i] <= '9')) {}
                else{
                    alert('Danh sách giảng viên không hợp lệ');
                    return;
                }
            }
            let s = dkigv.split('-');
            
            if(s.length != numofclass) {
                alert('Số lượng giảng viên không đúng với số lớp học');
                return;
            }
            for (let i = 1; i <= numofclass; i++) {
                let x;
                if (i < 10) {
                    x = id + '_L0' + i;
                } else {
                    x = id + '_L' + i;
                }
                set(ref(db, 'MonHoc/' + id + '/LopHoc/' + x), {
                    giang_vien: s[i - 1],
                    sinh_vien: "0",
                    thong_bao: "Chưa có thông báo"
                });
                update(ref(db, 'GiangVien/' + s[i - 1] + '/mon_chi_tiet/' + id + '/' + x), {
                    Null: "Null"
                })
            }
            alert('Đăng kí lớp học thành công');
        }
    } else {
        alert('Không tìm thấy môn học');
    }
}
let Sched = async () => {
    window.location.href = "Scheduling_QTV.html";
}


let Upd = async () => {
    if(IdInp.value == "") {
        alert('Vui lòng nhập mã môn học');
        return;
    }

    if(confirm('Bạn có chắc chắn muốn cập nhật thông tin lớp học không?') == false) {
        return;
    }
    let id = IdInp.value; //mã môn học
    let numofsv = Number(MinnumOfSvInp.value);
    let numofclass = NumOfClassInp.value;
    let siso = Number(SiSoInp.value);
    let dkigv = DkiGvInp.value;

    let dbref = ref(db, 'MonHoc/' + id);
    let dbdata = await get(dbref);
    let data = dbdata.val();

    for(let i = 0; i < dkigv.length; i++) {
        if(dkigv[i] == '-' || dkigv[i] == 'G' || dkigv[i] == 'V' || (dkigv[i] >= '0' && dkigv[i] <= '9')) {}
        else{
            alert('Danh sách giảng viên không hợp lệ');
            return;
        }
    }

    let str = dkigv.split('-');
    if (str.length != numofclass) {
        alert('Số lượng giảng viên không đúng với số lớp học');
        return;
    }
    if (siso < numofsv) {
        alert('Sĩ số mỗi lớp phải lớn hơn sĩ số tối thiểu');
        return;
    }
    if (data) {
        //xóa thông tin cũ
        get(ref(db, 'MonHoc/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let num = data.so_luong_lop;
                let s = data.gv_day_tung_lop.split('-');
                for (let i = 1; i <= num; i++) {
                    let x;
                    if (i < 10) {
                        x = id + '_L0' + i;
                    } else {
                        x = id + '_L' + i;
                    }
                    remove(ref(db, 'GiangVien/' + s[i - 1] + '/mon_chi_tiet/' + id + '/' + x));
                }
            }
        });
        let dbref = ref(db, 'MonHoc/' + id + '/LopHoc');
        let dbdata = await get(dbref);
        let data = dbdata.val();

        update(ref(db, 'MonHoc/' + id), {
            so_luong_lop: numofclass,
            si_so_tung_lop: siso.toString(),
            gv_day_tung_lop: dkigv
        });
        remove(ref(db, 'MonHoc/' + id + '/LopHoc'));
        
        for (let i = 1; i <= numofclass; i++) {
            let x;
            if (i < 10) {
                x = id + '_L0' + i;
            } else {
                x = id + '_L' + i;
            }
            update(ref(db, 'MonHoc/' + id + '/LopHoc/' + x), {
                giang_vien: str[i - 1],
                sinh_vien: "0",
            });
            update(ref(db, 'GiangVien/' + str[i - 1] + '/mon_chi_tiet/' + id + '/' + x), {
                Null: "Null"
            })
        }
        alert('Cập nhật thông tin thành công');

    } else {
        alert('Không tìm thấy môn học');
    }
}

let thong_tin_tuan_hoc_inp = async () => {

    if(IdInp.value == "") {

        alert('Vui lòng nhập mã môn học');

        return;

    }



    if(confirm('Bạn có chắc chắn muốn cập nhật thông tin tuần học không?') == false) {

        return;

    }

    let id = IdInp.value;

    let tuan = tuan_hoc.value;



    let dbref = ref(db, 'MonHoc/' + id);

    let dbdata = await get(dbref);

    let data = dbdata.val();



    if (data) {

        update(ref(db, 'MonHoc/' + id), {

            thong_tin_tuan_hoc: tuan

        });

        alert('Cập nhật thông tin tuần học thành công');

    } else {

        alert('Không tìm thấy môn học');

    }

}

UpdkiBtn.addEventListener('click', Update_dot_dki);
CloseBtn.addEventListener('click', Mo_dong_dot_dki);
FindBtn.addEventListener('click', Find);
AddBtn.addEventListener('click', Add);
UpdBtn.addEventListener('click', Upd);
window.addEventListener('load', dulieudot);
submit_tuan_hoc_Btn.addEventListener('click', thong_tin_tuan_hoc_inp);
Sche.addEventListener('click', Sched);
