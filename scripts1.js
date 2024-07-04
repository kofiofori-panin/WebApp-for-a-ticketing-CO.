$(document).ready(function() {
    $('#toggleSidebar').click(function () {
        $('#sidebar').toggleClass('collapsed');
        $('#content').toggleClass('collapsed');
    });
    // Selectors for DOM elements
    var form = $('#myForm');
    var nameInput = $('#name');
    var passwordInput = $('#password');
    var emailInput = $('#email');
    var fullNameInput = $('#fullName');
    var dateInput = $('#date');
    var submitBtn = $('.submit');
    var userInfo = $('#data');
    var modal = $('#Userform');
    var modalTitle = $('#Userform .modal-title');
    var newUserBtn = $('.newUser');

    let getData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
    let isEdit = false, editId;

    showInfo();

    newUserBtn.on('click', function() {
        submitBtn.text('Submit');
        modalTitle.text('Fill the form');
        isEdit = false;
        form[0].reset();
    });

    function showInfo() {
        userInfo.empty(); // Clear existing rows
        getData.forEach(function(element, index) {
            let createElement = `<tr>
                <td>${index + 1}</td>
                <td>${element.userName}</td>
                <td>${element.password}</td>
                <td>${element.email}</td>
                <td>${element.fullName}</td>
                <td>${element.createdAt}</td>
                <td>
                    <button class="btn btn-success view-btn" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye" title="View"></i></button>
                    <button class="btn btn-primary edit-btn"><i class="bi bi-pencil-square" title="Update"></i></button>
                    <button class="btn btn-danger delete-btn"><i class="bi bi-trash" title="Delete"></i></button>
                </td>
            </tr>`;
            userInfo.append(createElement);
        });
    }

    function readInfo(index) {
        var element = getData[index];
        // Populate modal fields with data from getData[index]
        $('#readData #name').val(element.userName);
        $('#readData #password').val(element.password);
        $('#readData #email').val(element.email);
        $('#readData #fullName').val(element.fullName);
        $('#readData #date').val(element.createdAt);
    }

    function editInfo(index) {
        var element = getData[index];
        isEdit = true;
        editId = index;
        //  form fields with  getData[index]
        nameInput.val(element.userName);
        passwordInput.val(element.password);
        emailInput.val(element.email);
        fullNameInput.val(element.fullName);
        dateInput.val(element.createdAt);

        submitBtn.text('Update');
        modalTitle.text('Update the form');
    }

    function deleteInfo(index) {
        if (confirm('Are you sure you want to delete this record?')) {
            getData.splice(index, 1);
            localStorage.setItem('userData', JSON.stringify(getData));
            showInfo();
        }
    }

    // Event handlers
    userInfo.on('click', '.view-btn', function() {
        var index = $(this).closest('tr').index();
        readInfo(index);
        $('#readData').modal('show');
    });

    userInfo.on('click', '.edit-btn', function() {
        var index = $(this).closest('tr').index();
        editInfo(index);
        modal.modal('show');
    });

    userInfo.on('click', '.delete-btn', function() {
        var index = $(this).closest('tr').index();
        deleteInfo(index);
    });

    form.on('submit', function(event) {
        event.preventDefault();

        var information = {
            userName: nameInput.val(),
            password: passwordInput.val(),
            email: emailInput.val(),
            fullName: fullNameInput.val(),
            createdAt: dateInput.val()
        };

        if (!isEdit) {
            getData.push(information);
        } else {
            getData[editId] = information;
            isEdit = false;
        }

        localStorage.setItem('userData', JSON.stringify(getData));

        submitBtn.text('Submit');
        modalTitle.text('Fill the form');
        showInfo();
        form[0].reset();
        modal.modal('hide');
    });

});




