document.addEventListener("DOMContentLoaded", function() {
    const roomAvailabilityModal = document.getElementById("roomAvailabilityModal");
    const roomViewButtons = document.querySelectorAll(".room-view-button");
    const roomAvailabilityClose = document.querySelector(".room-availability-close");

    roomViewButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            roomAvailabilityModal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    roomAvailabilityClose.addEventListener("click", function() {
        roomAvailabilityModal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore background scroll
    });

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

    rows.forEach(row => {
        row.addEventListener('mouseover', function() {
            const patientDetails = row.getAttribute('data-details');
            patientInfo.textContent = patientDetails;
            additionalInfo.style.display = 'block'; // Show the text fields on hover
            extraInfo1.style.display = 'block'; // Show the text fields on hover
            extraInfo2.style.display = 'block'; // Show the text fields on hover
        });

        row.addEventListener('mouseout', function() {
            patientInfo.textContent = 'Patient details will appear here.';
            additionalInfo.style.display = 'none'; // Hide the text fields when not hovering
            extraInfo1.style.display = 'none'; // Hide the text fields when not hovering
            extraInfo2.style.display = 'none'; // Hide the text fields when not hovering
        });
    });
});

function toggleDropdown() {
    const dropdown = document.getElementById("roomSearchDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}
