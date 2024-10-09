// Toggle the dropdown open and closed
function toggleDropdown() {
  const dropdown = document.querySelector('.submitted-dropdown');
  dropdown.classList.toggle('active');
}

// Prevent the dropdown from closing when clicking inside it
function preventDropdownClose(event) {
  event.stopPropagation();
}

// Change the right column content based on the selected filter
function showRightColumnContent(item) {
  let rightContent = document.getElementById('submitted-right-content');
  
  if (item === 'Date') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\'9-11-2024\')">9-11-2024</p><p onclick="selectRightContent(\'9-12-2024\')">9-12-2024</p><p onclick="selectRightContent(\'9-13-2024\')">9-13-2024</p>';

  } else if (item === 'Status') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\' Pending Approval\')">Pending Approval</p><p onclick="selectRightContent(\'Approved\')">Approved</p><p onclick="selectRightContent(\'Rejected\')">Rejected</p>';
  }
}
// Change the placeholder to the selected right column content
function selectRightContent(content) {
  let placeholderText = document.querySelector('#submitted-dropdown-placeholder span:first-child');
  placeholderText.textContent = content;

  // Close the dropdown after selection
  document.querySelector('.submitted-dropdown').classList.remove('active');
}

// Add focus effect when the dropdown is clicked
function toggleDropdown() {
  const dropdown = document.querySelector('.submitted-dropdown');
  dropdown.classList.toggle('active');
  dropdown.style.borderColor = dropdown.classList.contains('active') ? '#a7a7a7' : '#ccc'; // Toggle border color
}



// Function to open the accept confirmation modal
function openAcceptModal() {
  const modal = document.getElementById('submit-accept-modal');
  const message = document.getElementById('accept-confirmation-message');
  message.textContent = 'Are you sure you want to approve this submitted invoice?';
  modal.style.display = 'block';

  // Disable body scroll
  document.body.style.overflow = 'hidden';
}

// Function to confirm the accept action
function confirmAccept() {
  alert('Submitted Invoice has been Approved.');
  closeAcceptModal();
}

// Function to close the accept confirmation modal
function closeAcceptModal() {
  const modal = document.getElementById('submit-accept-modal');
  modal.style.display = 'none';

  // Re-enable body scroll
  document.body.style.overflow = 'auto';
}




// Function to open the reject confirmation modal
function openRejectModal() {
  const modal = document.getElementById('submit-reject-modal');
  const message = document.getElementById('reject-confirmation-message');
  message.textContent = 'Are you sure you want to reject this submitted invoice?';
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
      alert('Invoice has been rejected for the following reason: ' + reason);
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

