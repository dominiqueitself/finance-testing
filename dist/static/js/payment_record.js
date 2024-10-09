// Toggle the dropdown open and closed
function toggleDropdown() {
    const dropdown = document.querySelector('.payrec-dropdown');
    dropdown.classList.toggle('active');
}

// Prevent the dropdown from closing when clicking inside it
function preventDropdownClose(event) {
    event.stopPropagation();
}

// Change the right column content based on the selected filter
function showRightColumnContent(item) {
    let rightContent = document.getElementById('payrec-right-content');
    
    if (item === 'Patient ID') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'001\')">001</p><p onclick="selectRightContent(\'002\')">002</p><p onclick="selectRightContent(\'003\')">003</p>';
    } else if (item === 'Patient Type') {
        rightContent.innerHTML = '<p onclick="selectRightContent(\'In-Patient\')">In-Patient</p><p onclick="selectRightContent(\'Out-Patient\')">Out-Patient</p>';
    }
}

// Change the placeholder to the selected right column content
function selectRightContent(content) {
    let placeholderText = document.querySelector('#payrec-dropdown-placeholder span:first-child');
    placeholderText.textContent = content;

    // Close the dropdown after selection
    document.querySelector('.payrec-dropdown').classList.remove('active');
}

// Add focus effect when the dropdown is clicked
function toggleDropdown() {
    const dropdown = document.querySelector('.payrec-dropdown');
    dropdown.classList.toggle('active');
    dropdown.style.borderColor = dropdown.classList.contains('active') ? '#a7a7a7' : '#ccc'; // Toggle border color
}
