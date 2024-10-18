// Toggle the dropdown open and closed
function toggleDropdown() {
    const dropdown = document.querySelector('.hospital-dropdown');
    dropdown.classList.toggle('active');
  }
  
  // Prevent the dropdown from closing when clicking inside it
  function preventDropdownClose(event) {
    event.stopPropagation();
  }
  
  // Change the right column content based on the selected filter
function showRightColumnContent(item) {
    let rightContent = document.getElementById('providers-right-content');
    
    if (item === 'Patient ID') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'001\')">001</p><p onclick="selectRightContent(\'002\')">002</p><p onclick="selectRightContent(\'003\')">003</p>';
    } else if (item === 'Type of Insurance') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'HMO\')">HMO</p><p onclick="selectRightContent(\'Public\')">Public</p><p onclick="selectRightContent(\'Private\')">Private</p>';
    } else if (item === 'Accreditation Status') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'Active\')">Active</p><p onclick="selectRightContent(\'Inactive\')">Inactive</p>';
    }
}

// Change the placeholder to the selected right column content
function selectRightContent(content) {
    let placeholderText = document.querySelector('#providers-dropdown-placeholder span:first-child');
    placeholderText.textContent = content;

    // Close the dropdown after selection
    document.querySelector('.providers-dropdown').classList.remove('active');
}

// Add focus effect when the dropdown is clicked
function toggleDropdown() {
    const dropdown = document.querySelector('.providers-dropdown');
    dropdown.classList.toggle('active');
    dropdown.style.borderColor = dropdown.classList.contains('active') ? '#a7a7a7' : '#ccc'; // Toggle border color
}




// Function to open the modal (Insurance Provider Button )
function openProviderModal() {
    document.getElementById('provider-modal').style.display = 'block';
}

// Function to close the modal
function closeProviderModal() {
    document.getElementById('provider-modal').style.display = 'none';
}

// Function to open the modal in read-only mode
function openProviderModalReadOnly() {
    document.getElementById('provider-modal-view').style.display = 'block'; 
}

// Function to close the modal
function closeProviderModalModalReadOnly() {
    document.getElementById('provider-modal-view').style.display = 'none';
}

// Function to open the modal in read-only mode
function openProviderModalEdit() {
    document.getElementById('provider-modal-edit').style.display = 'block'; 
}

// Function to close the modal
function closeProviderModalEdit() {
    document.getElementById('provider-modal-edit').style.display = 'none';
}

// Deactivate Button Modal for Deactivation confirmation
function openDeactivatebutton() {
    const modal = document.getElementById('provider-empty-modal');
    const message = document.getElementById('provider-confirmation-message');
    message.textContent = `Are you sure you want to deactivate Insurance Provider? 
    This action will remove them from the list of active providers. 
    You can reactivate them later if needed.`;
    modal.style.display = 'block';  

    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

// Function to confirm the discharge
function providerconfirmDischarge() {
    // Handle the discharge logic here
    alert('Insurance Provider has been deactivated.');
    closeProviderModalDeactivate();
}

// Function to close the confirmation modal
function closeProviderModalDeactivate() {
    const modal = document.getElementById('provider-empty-modal');
    modal.style.display = 'none';  
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}

