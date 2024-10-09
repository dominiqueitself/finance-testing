// outstanding_receivables.js

// Sample data for invoices (would come from backend in real application)
const invoiceData = {
  "INV-001": {
    patientName: "John Doe",
    invoiceNumber: "INV-001",
    totalAmount: 5000,
    amountDue: 5000,
    dueDate: "2024-08-15",
    status: "overdue",
    charges: {
      room: 2000,
      doctor: 1500,
      medicines: 800,
      procedures: 700,
    },
    communications: [
      {
        date: "2024-08-16",
        method: "Email",
        message: "Payment reminder sent.",
      },
    ],
    followUps: [
      {
        date: "2024-08-17",
        action: "Called patient, no response.",
      },
    ],
  },
  "INV-002": {
    patientName: "Jane Smith",
    invoiceNumber: "INV-002",
    totalAmount: 3500,
    amountDue: 1500,
    dueDate: "2024-09-05",
    status: "due_soon",
    charges: {
      room: 1000,
      doctor: 1200,
      medicines: 500,
      procedures: 800,
    },
    communications: [],
    followUps: [],
  },
  // Add more invoices as needed
};

// Function to view invoice details
function viewDetails(invoiceNumber) {
  const invoice = invoiceData[invoiceNumber];
  if (invoice) {
    const detailsContent = `
            <p><strong>Patient Name:</strong> ${invoice.patientName}</p>
            <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
            <p><strong>Total Amount:</strong> ₱${invoice.totalAmount.toLocaleString()}</p>
            <p><strong>Amount Due:</strong> ₱${invoice.amountDue.toLocaleString()}</p>
            <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
            <h3>Breakdown of Charges:</h3>
            <ul>
                <li>Room Charges: ₱${invoice.charges.room.toLocaleString()}</li>
                <li>Doctor's Fees: ₱${invoice.charges.doctor.toLocaleString()}</li>
                <li>Medicines: ₱${invoice.charges.medicines.toLocaleString()}</li>
                <li>Procedures: ₱${invoice.charges.procedures.toLocaleString()}</li>
            </ul>
        `;
    document.getElementById("details-content").innerHTML = detailsContent;
    document.getElementById("details-modal").style.display = "block";
  } else {
    alert("Invoice details not found.");
  }
}

// Function to close invoice details modal
function closeDetailsModal() {
  document.getElementById("details-modal").style.display = "none";
}

// Function to send payment reminder
function sendReminder(invoiceNumber) {
  const invoice = invoiceData[invoiceNumber];
  if (invoice) {
    // Simulate sending reminder (would integrate with email/SMS service)
    alert(
      `Payment reminder sent to ${invoice.patientName} for ${invoice.invoiceNumber}.`
    );

    // Log communication
    const communicationEntry = {
      date: new Date().toISOString().split("T")[0],
      method: "Email",
      message: "Payment reminder sent.",
    };
    invoice.communications.push(communicationEntry);
    addCommunicationLog(communicationEntry);

    // Log follow-up action
    const followUpEntry = {
      date: new Date().toISOString().split("T")[0],
      action: `Reminder sent to ${invoice.patientName} for ${invoice.invoiceNumber}.`,
    };
    invoice.followUps.push(followUpEntry);
    addFollowUpLog(followUpEntry);
  } else {
    alert("Invoice not found.");
  }
}

// Function to add communication log entry
function addCommunicationLog(entry) {
  const logContainer = document.getElementById("communication-entries");
  const logEntry = document.createElement("p");
  logEntry.textContent = `${entry.date}: [${entry.method}] ${entry.message}`;
  logContainer.prepend(logEntry);
}

// Function to add follow-up log entry
function addFollowUpLog(entry) {
  const logContainer = document.getElementById("follow-up-entries");
  const logEntry = document.createElement("p");
  logEntry.textContent = `${entry.date}: ${entry.action}`;
  logContainer.prepend(logEntry);
}

// Function to open report generation modal
function openReportModal() {
  document.getElementById("report-modal").style.display = "block";
}

// Function to close report generation modal
function closeReportModal() {
  document.getElementById("report-modal").style.display = "none";
}

// Function to generate report (simulated)
function generateReport(event) {
  event.preventDefault();
  const reportType = document.getElementById("report-type").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const exportFormat = document.getElementById("export-format").value;

  // Simulate report generation
  alert(
    `Generating ${reportType} report from ${startDate} to ${endDate} in ${exportFormat.toUpperCase()} format.`
  );

  // Close modal after generation
  closeReportModal();
}

// Function to filter invoices based on status
function filterStatus() {
  const filterValue = document.getElementById("filter-status").value;
  const rows = document.querySelectorAll("#receivables-table tbody tr");

  rows.forEach((row) => {
    const status = row.getAttribute("data-status");
    if (filterValue === "all" || status === filterValue) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Close modals when clicking outside the modal content
window.onclick = function (event) {
  const detailsModal = document.getElementById("details-modal");
  const reportModal = document.getElementById("report-modal");

  if (event.target == detailsModal) {
    detailsModal.style.display = "none";
  }
  if (event.target == reportModal) {
    reportModal.style.display = "none";
  }
};
