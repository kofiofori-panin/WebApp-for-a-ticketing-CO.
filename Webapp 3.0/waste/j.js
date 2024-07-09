// Show or hide the back to top button
window.onscroll = function () {
    var backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Scroll to top when the button is clicked
document.getElementById("backToTop").onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// Handle form submission
document.getElementById('myForm').onsubmit = function (event) {
    event.preventDefault();
    addUser();
    document.getElementById('myForm').reset();
    var userFormModal = new bootstrap.Modal(document.getElementById('Userform'));
    userFormModal.hide();
};

// Function to add user to the table
function addUser() {
    var table = document.getElementById('data');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var fullname = document.getElementById('fullname').value;
    var createdAt = document.getElementById('createdat').value;

    row.insertCell(0).innerHTML = rowCount + 1;
    row.insertCell(1).innerHTML = username;
    row.insertCell(2).innerHTML = password;
    row.insertCell(3).innerHTML = email;
    row.insertCell(4).innerHTML = fullname;
    row.insertCell(5).innerHTML = createdAt;
    row.insertCell(6).innerHTML = `
        <button class="btn btn-success" title="View"><i class="bi bi-eye"></i></button>
        <button class="btn btn-primary" title="Update"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-danger" title="Delete" onclick="deleteUser(this)"><i class="bi bi-trash"></i></button>
    `;
}

// Function to delete a user from the table
function deleteUser(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Update row numbers
    var table = document.getElementById('data');
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i + 1;
    }
}

// Sample data for the charts
document.addEventListener('DOMContentLoaded', function () {
    // Pie Chart
    var ctxP = document.getElementById('pieChart').getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
        },
        options: {
            responsive: true
        }
    });

    // Bar Chart
    var ctxB = document.getElementById('barChart').getContext('2d');
    var myBarChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: 'Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
