 // Password visibility toggle
 document.getElementById('togglePassword').addEventListener('click', function (e) {
    const password = document.getElementById('password');
    if (password.type === 'password') {
        password.type = 'text';
        e.target.classList.remove('bi-eye');
        e.target.classList.add('bi-eye-slash');
    } else {
        password.type = 'password';
        e.target.classList.remove('bi-eye-slash');
        e.target.classList.add('bi-eye');
    }
});

document.getElementById('toggleRepeatPassword').addEventListener('click', function (e) {
    const repeatPassword = document.getElementById('repeatPassword');
    if (repeatPassword.type === 'password') {
        repeatPassword.type = 'text';
        e.target.classList.remove('bi-eye');
        e.target.classList.add('bi-eye-slash');
    } else {
        repeatPassword.type = 'password';
        e.target.classList.remove('bi-eye-slash');
        e.target.classList.add('bi-eye');
    }
});

// Password match validation
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatPassword');
const passwordMismatch = document.getElementById('passwordMismatch');
const signupForm = document.getElementById('signupForm');

function validatePasswords() {
    if (password.value !== repeatPassword.value) {
        passwordMismatch.style.display = 'block';
        repeatPassword.setCustomValidity('Passwords do not match');
    } else {
        passwordMismatch.style.display = 'none';
        repeatPassword.setCustomValidity('');
    }
}

password.addEventListener('input', validatePasswords);
repeatPassword.addEventListener('input', validatePasswords);

signupForm.addEventListener('submit', function (event) {
    validatePasswords();
    if (!signupForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    signupForm.classList.add('was-validated');
});

// Bootstrap validation
(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})();