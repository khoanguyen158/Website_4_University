
document.addEventListener('DOMContentLoaded', function() {
    var otpInputs = document.querySelectorAll('.otp-input');

    for (var i = 0; i < otpInputs.length; i++) {
        otpInputs[i].addEventListener('input', function() {
            if (this.value.length === this.maxLength) {
                var currentIndex = Array.from(otpInputs).indexOf(this);
                var nextIndex = currentIndex + 1;

                if (otpInputs[nextIndex]) {
                    otpInputs[nextIndex].focus();
                }
            }
        });
    }
});