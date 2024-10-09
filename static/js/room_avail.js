document.addEventListener("DOMContentLoaded", function() {
    const roomAvailabilityModal = document.getElementById("roomAvailabilityModal");
    const roomViewButtons = document.querySelectorAll(".room-view-button");
    const roomCloseIcon = document.getElementById("roomCloseIcon"); // New icon close button

    roomViewButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            roomAvailabilityModal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Close modal when clicking the close icon
    roomCloseIcon.addEventListener("click", function() {
        roomAvailabilityModal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore background scroll
    });

    // Close modal when clicking outside the modal
    window.addEventListener("click", function(event) {
        if (event.target == roomAvailabilityModal) {
            roomAvailabilityModal.style.display = "none";
            document.body.style.overflow = "auto"; // Restore background scroll
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.beds-patients-table tbody tr');
    const patientDetailsContainer = document.getElementById('patient-details');
    const patientInfo = document.getElementById('patient-info');
    const additionalInfo = document.getElementById('additional-info');
    const extraInfo1 = document.getElementById('extra-info1');
    const extraInfo2 = document.getElementById('extra-info2');
    const extraInfo3 = document.getElementById('extra-info3');

    rows.forEach(row => {
        row.addEventListener('mouseover', function() {
            const patientDetails = row.getAttribute('data-details');
            patientInfo.textContent = patientDetails;
            additionalInfo.style.display = 'block'; // Show the text fields on hover
            extraInfo1.style.display = 'block'; // Show the text fields on hover
            extraInfo2.style.display = 'block'; // Show the text fields on hover
            extraInfo3.style.display = 'block'; // Show the text fields on hover
        });

        row.addEventListener('mouseout', function() {
            patientInfo.textContent = 'Patient details will appear here.';
            additionalInfo.style.display = 'none'; // Hide the text fields when not hovering
            extraInfo1.style.display = 'none'; // Hide the text fields when not hovering
            extraInfo2.style.display = 'none'; // Hide the text fields when not hovering
            extraInfo3.style.display = 'none'; // Hide the text fields when not hovering
        });
    });
});

// Js for Edit Button 
function toggleEdit(button) {
    const row = button.closest('tr');
    const roomTypeCell = row.querySelector('.room-type');
    const roomRateCell = row.querySelector('.room-rate');

    if (button.textContent === "Edit") {
        // Change text to input field (set width to avoid moving layout)
        roomTypeCell.innerHTML = `<input type="text" value="${roomTypeCell.textContent}" class="room-type-input">`;
        roomRateCell.innerHTML = `<input type="text" value="${roomRateCell.textContent}" class="room-rate-input">`;
        button.textContent = "Save";
    } else {
        // Save the input values and revert to plain text
        const roomTypeInput = row.querySelector('.room-type-input').value;
        const roomRateInput = row.querySelector('.room-rate-input').value;

        roomTypeCell.textContent = roomTypeInput;
        roomRateCell.textContent = roomRateInput;
        button.textContent = "Edit";
    }
}


// Function to show the confirmation modal with the patient ID or Room Number
function showConfirmationModal(roomId) {
    const modal = document.getElementById('room-empty-modal');
    const message = document.getElementById('confirmation-message');
    message.textContent = `Are you sure you want to discharge patient (Patient Name or ID) from this bed? This action cannot be undone`;
    modal.style.display = 'block';  // This will make the modal visible when the button is clicked

    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

// Function to confirm the discharge
function confirmDischarge() {
    // Handle the discharge logic here
    alert('Patient has been discharged.');
    closeConfirmationModal();
}

// Function to close the confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('room-empty-modal');
    modal.style.display = 'none';  // This will hide the modal after clicking cancel or confirming
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}




// Toggle the dropdown open and closed
function toggleDropdown() {
    const dropdown = document.querySelector('.room-dropdown');
    dropdown.classList.toggle('active');
  }
  
  // Prevent the dropdown from closing when clicking inside it
  function preventDropdownClose(event) {
    event.stopPropagation();
  }
  
  // Change the right column content based on the selected filter
  function showRightColumnContent(item) {
    let rightContent = document.getElementById('room-right-content');
    
    if (item === 'Floor') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'001\')">001</p><p onclick="selectRightContent(\'002\')">002</p>';
    } else if (item === 'Room Type') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'Private\')">Private</p><p onclick="selectRightContent(\'Public\')">Public</p>';
    } else if (item === 'Status') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'Available\')">Available</p><p onclick="selectRightContent(\'Occupied\')">Occupied</p><p onclick="selectRightContent(\'Maintenance\')">Maintenance</p><p onclick="selectRightContent(\'Sanitation\')">Sanitation</p>';
    }
  }
  
  // Change the placeholder to the selected right column content
  function selectRightContent(content) {
      let placeholderText = document.querySelector('#room-dropdown-placeholder span:first-child');
      placeholderText.textContent = content;
  
      // Close the dropdown after selection
      document.querySelector('.room-dropdown').classList.remove('active');
  }
  

