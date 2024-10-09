document.addEventListener("DOMContentLoaded", () => {
  const viewModal = document.getElementById("view-details-modal");
  const closeViewButton = viewModal.querySelector(".close-btn");

  // Static data for demonstration
  const staticDetails = {
    transactionId: "12345",
    timestamp: "2024-09-01 14:32:00",
    userInfo: "John Smith",
    transactionType: "Payment",
    details: "Payment of $1000.00 received",
    previousState: "Pending",
    currentState: "Completed",
    additionalNotes: "Payment processed successfully.",
  };

  // Function to open the modal and populate it with details
  const openModal = (transactionId) => {
    // Populate modal with static details
    document.getElementById("transaction-id").textContent =
      staticDetails.transactionId;
    document.getElementById("timestamp").textContent = staticDetails.timestamp;
    document.getElementById("user-info").textContent = staticDetails.userInfo;
    document.getElementById("transaction-type").textContent =
      staticDetails.transactionType;
    document.getElementById("details").textContent = staticDetails.details;
    document.getElementById("previous-state").textContent =
      staticDetails.previousState;
    document.getElementById("current-state").textContent =
      staticDetails.currentState;
    document.getElementById("additional-notes").textContent =
      staticDetails.additionalNotes;

    viewModal.style.display = "block";
  };

  // Add event listeners to view buttons
  document.querySelectorAll(".btn-view").forEach((button) => {
    button.addEventListener("click", () => {
      const transactionId = button.getAttribute("data-transaction-id");
      openModal(transactionId);
    });
  });

  // Close modal when clicking the close button or outside the modal
  closeViewButton.addEventListener("click", () => {
    viewModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === viewModal) {
      viewModal.style.display = "none";
    }
  });

  // Add event listeners to export buttons
  document.querySelectorAll(".btn-export").forEach((button) => {
    button.addEventListener("click", async () => {
      const transactionId = button.getAttribute("data-transaction-id");
      // Generate a static CSV file for export
      const csvContent = `Transaction ID,Timestamp,User,Transaction Type,Details,Previous State,Current State,Additional Notes\n${staticDetails.transactionId},${staticDetails.timestamp},${staticDetails.userInfo},${staticDetails.transactionType},${staticDetails.details},${staticDetails.previousState},${staticDetails.currentState},${staticDetails.additionalNotes}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `audit-trail-${transactionId}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    });
  });
});
