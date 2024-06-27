$(document).ready(function() {
    // Selectors for DOM elements
    var ticketForm = $('#ticketForm');
    var userIdInput = $('#userId');
    var descriptionInput = $('#description');
    var priorityInput = $('#priority');
    var statusInput = $('#status');
    var createdAtInput = $('#createdAt');
    var addTicketButton = $('.btn-primary[data-bs-target="#TicketForm"]');
    var modalTicketForm = $('#TicketForm');
    var modalReadData = $('#readData');
    var viewButtons = $('.table .btn-success');
    var updateButtons = $('.table .btn-primary');
    var deleteButtons = $('.table .btn-danger');
    var dataContainer = $('#data');

    // Array to hold ticket data (simulating local storage)
    let ticketData = [];

    // Function to add ticket data to array
    function showTickets() {
        dataContainer.empty(); // Clear existing rows
        ticketData.forEach(function(ticket, index) {
            let row = `<tr>
                <td>${index + 1}</td>
                <td>${ticket.userId}</td>
                <td>${ticket.description}</td>
                <td>${ticket.priority}</td>
                <td>${ticket.status}</td>
                <td>${ticket.createdAt}</td>
                <td>
                    <button class="btn btn-success view-btn" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye" title="View"></i></button>
                    <button class="btn btn-primary edit-btn"><i class="bi bi-pencil-square" title="Update"></i></button>
                    <button class="btn btn-danger delete-btn"><i class="bi bi-trash" title="Delete"></i></button>
                </td>
            </tr>`;
            dataContainer.append(row);
        });
    }

    // Function to view ticket data 
    function readTicket(index) {
        var ticket = ticketData[index];
        // Populate modal fields with data from getData[index]
        $('#readData #userId').val(ticket.userId);
        $('#readData #description').val(ticket.description);
        $('#readData #priority').val(ticket.priority);
        $('#readData #status').val(ticket.status);
        $('#readData #createdAt').val(ticket.createdAt);
    }

  
    // Function to edit ticket data
    function editTicket(index) {
        var ticket = ticketData[index];
        userIdInput.val(ticket.userId);
        descriptionInput.val(ticket.description);
        priorityInput.val(ticket.priority);
        statusInput.val(ticket.status);
        createdAtInput.val(ticket.createdAt);
    }

    // Function to delete ticket data
    function deleteTicket(index) {
        if (confirm('Are you sure you want to delete this ticket?')) {
            ticketData.splice(index, 1);
            showTickets();
        }
    }

    // Event listener for "Add Ticket" button
    addTicketButton.on('click', function() {
        // Reset form fields
        ticketForm[0].reset();
    });

    // Event listeners for view, edit, and delete buttons
    dataContainer.on('click', '.view-btn', function() {
        var index = $(this).closest('tr').index();
        readTicket(index);
        modalReadData.modal('show');
    });

    dataContainer.on('click', '.edit-btn', function() {
        var index = $(this).closest('tr').index();
        editTicket(index);
        modalTicketForm.modal('show');
    });

    dataContainer.on('click', '.delete-btn', function() {
        var index = $(this).closest('tr').index();
        deleteTicket(index);
    });

    // Event listener for ticket form submission
    ticketForm.on('submit', function(event) {
        event.preventDefault();

        var ticket = {
            userId: userIdInput.val(),
            description: descriptionInput.val(),
            priority: priorityInput.val(),
            status: statusInput.val(),
            createdAt: createdAtInput.val()
        };

        ticketData.push(ticket);
        showTickets();
        ticketForm[0].reset();
        modalTicketForm.modal('hide');
    });

  
    showTickets();
});
