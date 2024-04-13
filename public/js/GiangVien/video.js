let id_vid = sessionStorage.getItem('ID_VIDEO');
let link = sessionStorage.getItem('VIDEO_' + id_vid);

function getSrc() {
    console.log(id_vid);
    console.log(link);
    return document.getElementById('video_inp').setAttribute('src', link);
}
window.addEventListener('load', getSrc);