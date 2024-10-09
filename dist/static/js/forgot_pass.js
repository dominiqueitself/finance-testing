document.getElementById('send-reset-link-button').addEventListener('click', function() {
    const emailInput = document.querySelector('input[type="email"]');
    const inputValue = emailInput.target.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email input field is empty and not an email address
    if (emailInput.value.trim() === "") {
        alert("Please enter your email address.");
    } else if (emailRegex.test(inputValue)) {
        // Make an AJAX request to app.py
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/forgot-password/send-email', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`email=${emailInput.value}`);

        document.getElementById('popup').style.display = 'flex';
    } else {
        alert("Please enter a valid email address")
    }
});

function closePopup() {
    window.location.href = "HR Log .html"; // Redirect to the login page
}
