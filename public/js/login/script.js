const title = document.querySelector('.title h1')

const letter = 'Welcome !'

var index = 0

setInterval(() => {
  title.textContent += letter[index]
  index++
  if (index == letter.length + 1) {
    index = 0
    title.textContent = ''
  }
}, 500)

const passwordInput = document.getElementById('passwordInp');
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');

showPasswordCheckbox.addEventListener('change', function() {
    passwordInput.type = this.checked ? 'text' : 'password';
});