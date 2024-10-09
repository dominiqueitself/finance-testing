// Global variables to store selected filters
let selectedApprovalStatus = "";
let selectedStatus = "";

// Toggle the dropdown visibility
function toggleDropdown() {
  const dropdown = document.querySelector(".invoice-dropdown");
  dropdown.classList.toggle("active");
  dropdown.style.borderColor = dropdown.classList.contains("active")
    ? "#a7a7a7"
    : "#ccc"; // Toggle border color
}

// Close the dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.closest(".invoice-dropdown")) {
    const dropdowns = document.getElementsByClassName(
      "invoice-dropdown-content"
    );
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

// Generate Report
function togglePopup() {
  var popup = document.getElementById("popupBox");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

// Prevent the dropdown from closing when clicking inside it
function preventDropdownClose(event) {
  event.stopPropagation();
}

// Change the right column content based on the selected filter
function showRightColumnContent(item) {
  let rightContent = document.getElementById("invoice-right-content");

  // Clear existing content
  rightContent.innerHTML = "";

  if (item === "Approval Status") {
    rightContent.innerHTML =
      "<p onclick=\"selectRightContent('Pending Approval')\">Pending Approval</p>" +
      "<p onclick=\"selectRightContent('Approved')\">Approved</p>" +
      "<p onclick=\"selectRightContent('Rejected')\">Rejected</p>";
  } else if (item === "Status") {
    rightContent.innerHTML =
      "<p onclick=\"selectRightContent('Open')\">Open</p>" +
      "<p onclick=\"selectRightContent('Fully Paid')\">Fully Paid</p>" +
      "<p onclick=\"selectRightContent('Partially Paid')\">Partially Paid</p>" +
      "<p onclick=\"selectRightContent('Overdue')\">Overdue</p>" +
      "<p onclick=\"selectRightContent('Voided')\">Voided</p>";
  }
}

// Change the placeholder to the selected right column content
function selectRightContent(content) {
    let placeholderText = document.querySelector(
        "#invoice-dropdown-placeholder span:first-child"
    );
    placeholderText.textContent = content;

    // Update the selected filter based on the content
    if (['Pending Approval', 'Approved', 'Rejected'].includes(content)) {
        selectedApprovalStatus = content;
        selectedStatus = ""; // Reset status
    } else if (['Open', 'Fully Paid', 'Partially Paid', 'Overdue', 'Voided'].includes(content)) {
        selectedStatus = content;
        selectedApprovalStatus = ""; // Reset approval status
    }

    // Close the dropdown after selection
    document.querySelector(".invoice-dropdown").classList.remove("active");

    // Call the function to filter invoices based on the selected filters
    updateInvoices();
}

// Function to fetch and update the invoices based on selected filters
function updateInvoices() {
  const xhr = new XMLHttpRequest();
  const url = `/filter_invoices?status=${selectedStatus}&approval_status=${selectedApprovalStatus}`;
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      // Update the table content with the filtered data
      document.querySelector("tbody").innerHTML = xhr.responseText; // Assuming this contains the new invoice rows
    } else {
      console.error("Error fetching invoices:", xhr.statusText);
    }
  };
  xhr.send();
}

// Toggle the insurance box visibility
function toggleInsuranceBox(invoiceId, event) {
  event.preventDefault(); // Prevent the default action of the anchor tag

  // Hide all insurance boxes first
  const allInsuranceBoxes = document.querySelectorAll(".insurance-box");
  allInsuranceBoxes.forEach((box) => {
    box.style.display = "none"; // Hide all
  });

  // Show the specific insurance box
  const insuranceBox = document.getElementById("insurance-box-" + invoiceId);
  if (insuranceBox) {
    insuranceBox.style.display =
      insuranceBox.style.display === "none" || insuranceBox.style.display === ""
        ? "block"
        : "none"; // Toggle visibility
  }

  // Close insurance box when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInside = insuranceBox.contains(event.target) || event.target.classList.contains("btn-insurance");
    if (!isClickInside) {
      insuranceBox.style.display = "none"; // Hide insurance box if click is outside
      // Remove the event listener after hiding to prevent memory leaks
      document.removeEventListener("click", arguments.callee);
    }
  });
}

// Handle coverage and reimbursement option selections
function handleCoverage() {
  alert("Coverage option selected!");
}

function handleReimbursement() {
  alert("Reimbursement option selected!");
}









// Function to open the void confirmation modal
function openVoidModal() {
  const modal = document.getElementById('void-confirmation-modal');
  const message = document.getElementById('void-confirmation-message');
  message.textContent = 'Are you sure you want to void this invoice? This action cannot be undone.';
  modal.style.display = 'block';

  // Disable body scroll
  document.body.style.overflow = 'hidden';
}

// Function to confirm the void action
function confirmVoid() {
  // Handle the void logic here (e.g., make an AJAX call, update the UI, etc.)
  alert('Invoice has been voided.');
  closeVoidModal();
}

// Function to close the void confirmation modal
function closeVoidModal() {
  const modal = document.getElementById('void-confirmation-modal');
  modal.style.display = 'none';

  // Re-enable body scroll
  document.body.style.overflow = 'auto';
}







// Disable buttons based on approval and payment status
document.addEventListener("DOMContentLoaded", function () {
  const invoiceRows = document.querySelectorAll("tbody tr");

  invoiceRows.forEach((row) => {
    const paymentStatus = row.querySelector(".btn-payment").dataset.status;
    const approvalStatus = row.querySelector(".btn-payment").dataset.approval;

    // Define button references
    const viewButton = row.querySelector(".btn-view");
    const editButton = row.querySelector(".btn-edit");
    const makePaymentButton = row.querySelector(".btn-payment");
    const applyInsuranceButton = row.querySelector(".btn-insurance");
    const voidButton = row.querySelector(".btn-void");
    const reimbursementOption = row.querySelector(".reimbursement-option");

    // Initialize all buttons to disabled state
    viewButton.disabled = false; // View is always enabled
    editButton.disabled = true;
    makePaymentButton.disabled = true;
    applyInsuranceButton.disabled = true;
    voidButton.disabled = true;
    if (reimbursementOption) reimbursementOption.disabled = true;

    // Logic based on payment and approval status
    if (paymentStatus === "Voided") {
      // If payment status is VOIDED, only View is clickable
      editButton.disabled = true;
      makePaymentButton.disabled = true;
      applyInsuranceButton.disabled = true;
      voidButton.disabled = true;
      if (reimbursementOption) reimbursementOption.disabled = true;
    } else {
      // Logic based on approval status
      if (approvalStatus === "Pending Approval") {
        // Only View is enabled
        editButton.disabled = true;
        makePaymentButton.disabled = true;
        applyInsuranceButton.disabled = true;
        voidButton.disabled = true;
      } else if (approvalStatus === "Approved") {
        // Approved status logic
        makePaymentButton.disabled = false; // Allow payment
        applyInsuranceButton.disabled = false; // Allow insurance application
        voidButton.disabled = false; // Allow voiding
        editButton.disabled = true; // You can change this if needed
      } else if (approvalStatus === "Rejected") {
        // Rejected status logic
        editButton.disabled = false; // Allow edit
        makePaymentButton.disabled = true; // Disable payment
        applyInsuranceButton.disabled = true; // Disable insurance application
        voidButton.disabled = false; // Allow void
      }

      // Logic based on payment status
      if (paymentStatus === "Open") {
        // Open payment status overrides other buttons
        if (approvalStatus === "Approved") {
          makePaymentButton.disabled = false; // Allow payment
          applyInsuranceButton.disabled = false; // Allow insurance application
          voidButton.disabled = false; // Allow voiding
        }
      } else if (paymentStatus === "Fully Paid") {
        // Fully Paid status allows applying for insurance (coverage/reimbursement)
        editButton.disabled = true; // Disable edit
        makePaymentButton.disabled = true; // Disable payment
        applyInsuranceButton.disabled = false; // Enable apply insurance
        voidButton.disabled = true; // Disable voiding

        // Enable reimbursement option for Fully Paid status
        if (reimbursementOption) reimbursementOption.disabled = false; // Allow reimbursement option
      } else if (paymentStatus === "Partially Paid") {
        // Logic for Partially Paid
        if (approvalStatus === "Approved") {
          makePaymentButton.disabled = false; // Allow payment
          applyInsuranceButton.disabled = false; // Allow insurance application
          voidButton.disabled = false; // Allow voiding
        } else if (approvalStatus === "Rejected") {
          editButton.disabled = false; // Allow edit
          voidButton.disabled = false; // Allow void
        }
      }
    }

    // Optional: Add or remove disabled class for styling
    [
      editButton,
      makePaymentButton,
      applyInsuranceButton,
      voidButton,
      reimbursementOption,
    ].forEach((button) => {
      if (button && button.disabled) {
        button.classList.add("disabled");
      } else if (button) {
        button.classList.remove("disabled");
      }
    });
  });
});

