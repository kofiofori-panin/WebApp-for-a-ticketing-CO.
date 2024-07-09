$(document).ready(function() {
    // Toggle sidebar
    $('#toggleSidebar').click(function () {
        $('#sidebar').toggleClass('collapsed');
        $('#content').toggleClass('collapsed');
    });

    // Selectors for DOM elements
    var form = $('#ticketForm');
    var userIdInput = $('#userId');
    var descriptionInput = $('#description');
    var priorityInput = $('#priority');
    var statusInput = $('#status');
    var createdAtInput = $('#createdAt');
    var submitBtn = $('.btn-primary[form="ticketForm"]'); // selector to target submit button within the form
    var userInfo = $('#data');
    var modal = $('#TicketForm');
    var modalTitle = $('#TicketForm .modal-title');
    var newUserBtn = $('.btn-primary[data-bs-target="#TicketForm"]'); // selector to target new user button

    let getData = localStorage.getItem('ticketData') ? JSON.parse(localStorage.getItem('ticketData')) : [];
    let isEdit = false, editId;

    showInfo();

    newUserBtn.on('click', function() {
        submitBtn.text('Submit');
        modalTitle.text('Fill the form');
        isEdit = false;
        form[0].reset();
        userIdInput.prop('disabled', false); // Enable userId field for new entry
        statusInput.prop('disabled', false); // Enable status field for new entry
        createdAtInput.prop('disabled', false); // Enable createdAt field for new entry
    });

    function showInfo() {
        userInfo.empty(); // Clear existing rows
        getData.forEach(function(element, index) {
            let createElement = `<tr>
                <td>${index + 1}</td>
                <td>${element.userId}</td>
                <td>${element.description}</td>
                <td>${element.priority}</td>
                <td>${element.status}</td>
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
        $('#readData #userId').val(element.userId);
        $('#readData #description').val(element.description);
        $('#readData #priority').val(element.priority);
        $('#readData #status').val(element.status);
        $('#readData #createdAt').val(element.createdAt);
    }

    function editInfo(index) {
        var element = getData[index];
        isEdit = true;
        editId = index;
        // Populate form fields with data from getData[index]
        userIdInput.val(element.userId).prop('disabled', true); // Disabled userId field for update
        descriptionInput.val(element.description);
        priorityInput.val(element.priority);
        statusInput.val(element.status).prop('disabled', true); // Disabled status field for update
        createdAtInput.val(element.createdAt).prop('disabled', true); // Disabled createdAt field for update

        submitBtn.text('Update');
        modalTitle.text('Update the form');
    }

    function deleteInfo(index) {
        if (confirm('Are you sure you want to delete this record?')) {
            getData.splice(index, 1);
            localStorage.setItem('ticketData', JSON.stringify(getData));
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
            userId: userIdInput.val(),
            description: descriptionInput.val(),
            priority: priorityInput.val(),
            status: statusInput.val(),
            createdAt: createdAtInput.val()
        };

        if (!isEdit) {
            getData.push(information);
        } else {
            getData[editId] = information;
            isEdit = false;
        }

        localStorage.setItem('ticketData', JSON.stringify(getData));

        submitBtn.text('Submit');
        modalTitle.text('Fill the form');
        showInfo();
        form[0].reset();
        modal.modal('hide');
        userIdInput.prop('disabled', false); // Enable userId field after submit
        statusInput.prop('disabled', false); // Enable status field after submit
        createdAtInput.prop('disabled', false); // Enable createdAt field after submit
    });
});
