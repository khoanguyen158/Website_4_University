let id_tl = sessionStorage.getItem('ID_TL');
let link = sessionStorage.getItem('TL_' + id_tl);
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

function getSrc() {
    console.log(id_tl);
    console.log(link);
    return document.getElementById('tl_inp').setAttribute('src', link);
}
window.addEventListener('load', getSrc);

function whoami() {
    let id = UserInfo.id;
    id = id.toString();
    id = id.substring(0, 2);
    if(id == 'GV') {
        document.getElementById('goback').setAttribute('href', 'course-detailsGV.html');
    }
    else {
        document.getElementById('goback').setAttribute('href', 'course-details.html');
    }
}
window.addEventListener('load', whoami);