function checkPassword() {
    let p = document.getElementById('passwordInp').value;
    let cp = document.getElementById('confirmInp').value;
    //console.log(p, cp);

    let message = document.getElementById('message');
    if (p.length != 0) {
        if (p == cp) {
            message.style.color = 'orange';
            message.textContent = 'Password is matching!';
        }
        else {
            message.style.color = 'white';
            message.textContent = 'Password is not matching!';
        }
    }
    else {
        message.style.color = 'red';
        message.textContent = 'Password is empty!';
    }
}