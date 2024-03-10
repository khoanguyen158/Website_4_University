document.getElementById('editBtn').addEventListener('click', function() {
    var inputs = document.querySelectorAll('input[readonly]');
    inputs.forEach(function(input) {
        input.removeAttribute('readonly');
    });
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'block';
});

document.getElementById('updateBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var inputs = document.querySelectorAll('input:not([readonly])');
    inputs.forEach(function(input) {
        input.setAttribute('readonly', true);
    });
    document.getElementById('editBtn').style.display = 'block';
    document.getElementById('updateBtn').style.display = 'none';
});

