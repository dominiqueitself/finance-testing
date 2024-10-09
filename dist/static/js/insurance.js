document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("apply-coverage-modal");
  const openModalButtons = document.querySelectorAll(".btn-apply-coverage");
  const closeButton = modal.querySelector(".close-btn");
  const form = document.getElementById("apply-coverage-form");

  // Open modal on button click
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const claimId = button.getAttribute("data-claim-id");
      document.getElementById("invoice-id").value = claimId;
      modal.style.display = "block";
    });
  });

  // Close modal on close button click
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside of the modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch("/apply-insurance-coverage", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Insurance coverage applied successfully.");
      modal.style.display = "none";
      // Optionally, refresh the page or update the claims table
      location.reload();
    } else {
      alert("Failed to apply insurance coverage.");
    }
  });

  // Update button states based on claim status
  const rows = document.querySelectorAll("#claims-table tbody tr");
  rows.forEach((row) => {
    const statusCell = row.querySelector(".status");
    const button = row.querySelector(".btn-apply-coverage");

    if (statusCell.textContent.trim() === "Approved") {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "true");
    }
  });
});


// Toggle the dropdown open and closed
function toggleDropdown() {
  const dropdown = document.querySelector('.insurance-dropdown');
  dropdown.classList.toggle('active');
}

// Prevent the dropdown from closing when clicking inside it
function preventDropdownClose(event) {
  event.stopPropagation();
}

// Change the right column content based on the selected filter
function showRightColumnContent(item) {
  let rightContent = document.getElementById('insurance-right-content');
  
  if (item === 'Insurance Provider') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\'Coco Life\')">Coco Life</p><p onclick="selectRightContent(\'Pacific Cross\')">Pacific Cross</p><p onclick="selectRightContent(\' Inlife\')"> Inlife</p><p onclick="selectRightContent(\' HMI\')"> HMI</p><p onclick="selectRightContent(\' Etiqa\')"> Etiqa</p><p onclick="selectRightContent(\' ValueCare\')"> ValueCare</p><p onclick="selectRightContent(\' PhilCare\')"> PhilCare</p>';
  } else if (item === 'Month Issued') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\'January\')">January</p><p onclick="selectRightContent(\'February\')">February</p><p onclick="selectRightContent(\'March\')">March</p>';
  } else if (item === 'Status') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\'Pending Approval\')">Pending Approval</p><p onclick="selectRightContent(\'Approved\')">Approved</p><p onclick="selectRightContent(\'Rejected\')">Rejected</p>';
  }
}

// Change the placeholder to the selected right column content
function selectRightContent(content) {
  let placeholderText = document.querySelector('#insurance-dropdown-placeholder span:first-child');
  placeholderText.textContent = content;

  // Close the dropdown after selection
  document.querySelector('.insurance-dropdown').classList.remove('active');
}

// Add focus effect when the dropdown is clicked
function toggleDropdown() {
  const dropdown = document.querySelector('.insurance-dropdown');
  dropdown.classList.toggle('active');
  dropdown.style.borderColor = dropdown.classList.contains('active') ? '#a7a7a7' : '#ccc'; // Toggle border color
}




// Get modal element
var modal = document.getElementById('insurance-modal');

// Get the button that opens the modal
var btn = document.querySelector('.insurance-btn');

// Get the close icon
var closeIcon = document.querySelector('.insurance-close-icon');

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = 'block';
}

// When the user clicks the close icon, close the modal
closeIcon.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}





// Function to open the view-only modal
function openViewModal() {
  document.getElementById('view-modal').style.display = 'block';
}

// Function to close the view-only modal
function closeViewModal() {
  document.getElementById('view-modal').style.display = 'none';
}

// Function to close the original insurance modal
function closeInsuranceModal() {
  document.getElementById('insurance-modal').style.display = 'none';
}

// Add event listener to the Edit buttons
document.querySelectorAll('.ins-btn-view').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault();
      openViewModal();
  });
});

// Function to open the edit modal
function openEditModal() {
  document.getElementById('edit-modal').style.display = 'block';
}

// Function to close the edit modal
function closeEditModal() {
  document.getElementById('edit-modal').style.display = 'none';
}

// Add event listener to the Edit buttons
document.querySelectorAll('.ins-btn-edit').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault();
      openEditModal();
  });
});



// Function to open the approve confirmation modal
function openApproveModal() {
  const modal = document.getElementById('insurance-approve-modal');
  const message = document.getElementById('approve-confirmation-message');
  message.textContent = 'Are you sure you want to approve this Insurance Claim?';
  modal.style.display = 'block';

  // Disable body scroll
  document.body.style.overflow = 'hidden';
}

// Function to confirm the approve action
function confirmApprove() {
  alert('Insurance Claims has been approved.');
  closeApproveModal();
}

// Function to close the approve confirmation modal
function closeApproveModal() {
  const modal = document.getElementById('insurance-approve-modal');
  modal.style.display = 'none';

  // Re-enable body scroll
  document.body.style.overflow = 'auto';
}



// Function to open the reject confirmation modal
function openRejectModal() {
  const modal = document.getElementById('submit-reject-modal');
  const message = document.getElementById('reject-confirmation-message');
  message.textContent = 'Are you sure you want to reject this Insurance Claim?';
  modal.style.display = 'block';

  // Disable body scroll
  document.body.style.overflow = 'hidden';
}

// Function to open the reason modal
function openReasonModal() {
  closeRejectModal(); // Close the reject modal
  const reasonModal = document.getElementById('reason-reject-modal');
  reasonModal.style.display = 'block';

  // Disable body scroll
  document.body.style.overflow = 'hidden';
}

// Function to confirm the reject action with a reason
function confirmReasonReject() {
  const reason = document.getElementById('rejection-reason').value;
  if (reason) {
      alert('Insurance Claim has been rejected for the following reason: ' + reason);
      closeReasonModal();
  } else {
      alert('Please provide a reason for rejection.');
  }
}

// Function to close the reject confirmation modal
function closeRejectModal() {
  const modal = document.getElementById('submit-reject-modal');
  modal.style.display = 'none';

  // Re-enable body scroll
  document.body.style.overflow = 'auto';
}

// Function to close the reason modal
function closeReasonModal() {
  const reasonModal = document.getElementById('reason-reject-modal');
  reasonModal.style.display = 'none';

  // Re-enable body scroll
  document.body.style.overflow = 'auto';
}
