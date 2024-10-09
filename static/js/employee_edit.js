document.addEventListener("DOMContentLoaded", function() {
    // Get the Edit button
    const editButton = document.querySelector('.edit-employee');
    
    // Get all text fields, dropdowns, and date pickers
    const inputs = document.querySelectorAll('input[type="text"], input[type="date"], select');

    // Make all fields read-only by default
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        if (input.tagName === 'SELECT' || input.type === 'date') {
            input.disabled = true;
        }
    });

    // Set a flag to check if editing is enabled or not
    let isEditing = false;

    // Add click event to the Edit button
    editButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Toggle between editable and read-only modes
        if (isEditing) {
            // Disable editing for all fields
            inputs.forEach(input => {
                input.setAttribute('readonly', true);
                if (input.tagName === 'SELECT' || input.type === 'date') {
                    input.disabled = true;
                }
            });

            // Change the button text back to "Edit"
            editButton.textContent = "Edit";
            
            // Remove the green class
            editButton.classList.remove('editing');

            // Reset the flag
            isEditing = false;
        } else {
            // Enable editing for all fields
            inputs.forEach(input => {
                input.removeAttribute('readonly');
                if (input.tagName === 'SELECT' || input.type === 'date') {
                    input.disabled = false;
                }
            });

            // Change the button text to "Save"
            editButton.textContent = "Save";

            // Add the green class
            editButton.classList.add('editing');

            // Set the flag to true
            isEditing = true;
        }
    });
});


