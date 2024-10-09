// Function to open the modal and set the invoice and reference number
function openPaymentModal(invoiceNumber) {
    document.getElementById('invoice-number').value = invoiceNumber;
    document.getElementById('payment-modal').style.display = 'block';
}

// Function to close the modal
function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Handle form submission for processing payment
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var invoiceNumber = document.getElementById('invoice-number').value;
    var paymentDate = document.getElementById('payment-date').value;
    var paymentMethod = document.getElementById('payment-method').value;
    var amountPaid = document.getElementById('amount-paid').value;
    var referenceNumber = document.getElementById('reference-number').value;

    // Update invoice status and amount due
    updateInvoiceStatus(invoiceNumber, amountPaid);

    // Show success message
    alert('Payment of ₱' + amountPaid + ' processed for invoice ' + invoiceNumber + 
          ' on ' + paymentDate + ' using ' + paymentMethod + '. Reference: ' + referenceNumber);

    // Close the modal
    closePaymentModal();
});

function updateInvoiceStatus(invoiceNumber, amountPaid) {
    var rows = document.querySelectorAll('#pending-payments tr');
    rows.forEach(row => {
        var invoiceCell = row.querySelector('td:nth-child(1)');
        if (invoiceCell.textContent === invoiceNumber) {
            var amountDueCell = row.querySelector('td:nth-child(4)');
            var statusCell = row.querySelector('td:nth-child(5)');

            // Update Amount Due
            var currentAmountDue = parseFloat(amountDueCell.textContent.replace('₱', ''));
            var newAmountDue = currentAmountDue - parseFloat(amountPaid);
            amountDueCell.textContent = '₱' + newAmountDue.toFixed(2);

            // Update Status
            if (newAmountDue <= 0) {
                statusCell.textContent = 'Paid';
            }

            // Disable Process Payment button if fully paid
            var processButton = row.querySelector('.btn-process-payment');
            processButton.disabled = newAmountDue <= 0;
        }
    });

    // Add the payment to the invoice history
    addToInvoiceHistory(invoiceNumber, amountPaid);
}

function addToInvoiceHistory(invoiceNumber, amountPaid) {
    var historyTableBody = document.querySelector('#invoice-history');

    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${invoiceNumber}</td>
        <td>Example Patient ID</td>
        <td>₱Example Total Amount</td>
        <td>₱0</td>
        <td>Paid</td>
        <td>${new Date().toISOString().split('T')[0]}</td>
        <td>REF-12345</td>
    `;
    historyTableBody.appendChild(row);
}

function viewPaymentDetails(invoiceNumber) {
  // Fetch invoice details from somewhere (static or dynamic)
  var invoiceDetails = {
    "INV-001": {
      patientId: "OUTPNT-001",
      dateIssued: "2024-08-01",
      totalAmount: 5000,
      amountPaid: 0,
      amountDue: 5000,
      charges: {
        room: 2000,
        doctor: 1500,
        medicines: 800,
        procedures: 700,
        additional: 0,
      },
      paymentHistory: [],
    },
    "INV-002": {
      patientId: "INPNT-002",
      dateIssued: "2024-08-05",
      totalAmount: 3500,
      amountPaid: 0,
      amountDue: 3500,
      charges: {
        room: 1000,
        doctor: 1200,
        medicines: 500,
        procedures: 800,
        additional: 0,
      },
      paymentHistory: [],
    },
    // Additional invoice details can be added here
  };

  // Populate modal with invoice details
  var detailsContent = document.getElementById("invoice-details-content");
  var details = invoiceDetails[invoiceNumber];

  if (details) {
    detailsContent.innerHTML = `
            <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
            <p><strong>Patient ID:</strong> ${details.patientId}</p>
            <p><strong>Date Issued:</strong> ${details.dateIssued}</p>
            <p><strong>Total Amount:</strong> ₱${details.totalAmount.toFixed(
              2
            )}</p>
            <p><strong>Amount Paid:</strong> ₱${details.amountPaid.toFixed(
              2
            )}</p>
            <p><strong>Amount Due:</strong> ₱${details.amountDue.toFixed(2)}</p>
            <h3>Charges Breakdown:</h3>
            <ul>
                <li>Room: ₱${details.charges.room.toFixed(2)}</li>
                <li>Doctor: ₱${details.charges.doctor.toFixed(2)}</li>
                <li>Medicines: ₱${details.charges.medicines.toFixed(2)}</li>
                <li>Procedures: ₱${details.charges.procedures.toFixed(2)}</li>
                <li>Additional: ₱${details.charges.additional.toFixed(2)}</li>
            </ul>
            <h3>Payment History:</h3>
            <ul>
                ${
                  details.paymentHistory.length > 0
                    ? details.paymentHistory
                        .map(
                          (payment) =>
                            `<li>${payment.date}: ₱${payment.amount} (${payment.method})</li>`
                        )
                        .join("")
                    : "<li>No payments yet.</li>"
                }
            </ul>
        `;

    document.getElementById("invoice-details-modal").style.display = "block";
  }
}

// Function to close the invoice details modal
function closeInvoiceDetailsModal() {
  document.getElementById("invoice-details-modal").style.display = "none";
}

// Example function to populate pending payments
function loadPendingPayments() {
  var pendingPaymentsTable = document.getElementById("pending-payments");
  // Sample data
  var payments = [
    {
      invoiceNumber: "INV-001",
      patientId: "OUTPNT-001",
      totalAmount: 5000,
      amountDue: 5000,
      status: "Pending",
    },
    {
      invoiceNumber: "INV-002",
      patientId: "INPNT-002",
      totalAmount: 3500,
      amountDue: 3500,
      status: "Pending",
    },
    // Additional payment records
  ];

  payments.forEach((payment) => {
    var row = document.createElement("tr");
    row.innerHTML = `
            <td>${payment.invoiceNumber}</td>
            <td>${payment.patientId}</td>
            <td>₱${payment.totalAmount.toFixed(2)}</td>
            <td>₱${payment.amountDue.toFixed(2)}</td>
            <td>${payment.status}</td>
            <td><button class="btn-process-payment" onclick="openPaymentModal('${
              payment.invoiceNumber
            }')">Process Payment</button></td>
        `;
    pendingPaymentsTable.appendChild(row);
  });
}

// Example function to populate invoice history
function loadInvoiceHistory() {
  var invoiceHistoryTable = document.getElementById("invoice-history");
  // Sample data
  var history = [
    {
      invoiceNumber: "INV-001",
      patientId: "OUTPNT-001",
      totalAmount: 5000,
      amountDue: 0,
      status: "Paid",
      paymentDate: "2024-08-15",
      referenceNumber: "REF-12345",
    },
    {
      invoiceNumber: "INV-002",
      patientId: "INPNT-002",
      totalAmount: 3500,
      amountDue: 0,
      status: "Paid",
      paymentDate: "2024-08-16",
      referenceNumber: "REF-67890",
    },
    // Additional invoice history records
  ];

  history.forEach((entry) => {
    var row = document.createElement("tr");
    row.innerHTML = `
            <td>${entry.invoiceNumber}</td>
            <td>${entry.patientId}</td>
            <td>₱${entry.totalAmount.toFixed(2)}</td>
            <td>₱${entry.amountDue.toFixed(2)}</td>
            <td>${entry.status}</td>
            <td>${entry.paymentDate}</td>
            <td>${entry.referenceNumber}</td>
        `;
    invoiceHistoryTable.appendChild(row);
  });
}

// Load data on page load
window.onload = function () {
  loadPendingPayments();
  loadInvoiceHistory();
};
