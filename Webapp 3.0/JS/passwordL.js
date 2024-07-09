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

document.getElementById('loginForm').addEventListener('submit', function(event) {
    const form = event.target;

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }

    form.classList.add('was-validated');
});