document.getElementById('submit-request-button').addEventListener('click', function() {
    const fullName = document.getElementById('full-name');
    const emailAddress = document.getElementById('email-address');
    const issueDescription = document.getElementById('issue-description');
    const fileUpload = document.getElementById('file-upload');

    let valid = true;

    if (!fullName.value.trim()) {
        fullName.classList.add('error');
        valid = false;
    } else {
        fullName.classList.remove('error');
    }

    if (!emailAddress.value.trim()) {
        emailAddress.classList.add('error');
        valid = false;
    } else {
        emailAddress.classList.remove('error');
    }

    if (!issueDescription.value.trim()) {
        issueDescription.classList.add('error');
        valid = false;
    } else {
        issueDescription.classList.remove('error');
    }

    if (!fileUpload.files.length) {
        fileUpload.classList.add('error');
        valid = false;
    } else {
        fileUpload.classList.remove('error');
    }

    if (valid) {
        // Make an AJAX request to app.py
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/tech-support/send-email', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`full_name=${fullName.value}&email_address=${emailAddress.value}
            &issue_description=${issueDescription.value}&file_upload=${fileUpload.value}`);

        document.getElementById('popup').style.display = 'block';
    } else {
        alert("Please fill out all required fields and upload a file.");
    }
});

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    window.location.href = 'login.html';
}
