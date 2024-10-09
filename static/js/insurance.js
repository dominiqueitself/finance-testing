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
