$(document).ready(function () {
    $('#toggleSidebar').click(function () {
        $('#sidebar').toggleClass('collapsed');
        $('#content').toggleClass('collapsed');
    });

    // Pie Chart
    var ctxPie = document.getElementById('pieChart').getContext('2d');
    var pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Open', 'In Progress', 'Closed', 'On Hold', 'Cancelled'],
            datasets: [{
                label: 'Ticket Status',
                data: [12, 19, 3, 5, 2],
                backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6c757d'],
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Bar Chart
    var ctxBar = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Tickets Created',
                data: [10, 15, 8, 12, 20, 25],
                backgroundColor: '#007bff',
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

    // Area Chart
    var ctxArea = document.getElementById('areaChart').getContext('2d');
    var areaChart = new Chart(ctxArea, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Number of Users',
                data: [15, 16, 32, 88, 31, 55],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: '#007bff',
                fill: true,
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