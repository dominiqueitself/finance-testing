document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  // Handle dropdown toggling
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (event) {
      event.preventDefault();
      const dropdownContent = this.nextElementSibling;

      // Toggle dropdown display
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";

      // Close dropdown if clicking outside
      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target) && !dropdownContent.contains(e.target)) {
          dropdownContent.style.display = "none";
        }
      });
    });
  });

  // Logout functionality
  document.querySelector(".logout-link").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.redirect) {
          window.location.href = data.redirect; // Redirect to main page
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  });

  // Handle user dropdown (profile)
  document.querySelector(".user-dropdown").addEventListener("click", function () {
    const dropdownContent = this.querySelector(".profile-dropdown-content");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});
