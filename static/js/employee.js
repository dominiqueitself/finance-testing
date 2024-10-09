document.addEventListener('DOMContentLoaded', function() {
  const personalToggle = document.getElementById('personalToggle');
  const employmentToggle = document.getElementById('employmentToggle');
  const personalContent = document.getElementById('personalContent');
  const employmentContent = document.getElementById('employmentContent');

  function setActive(target) {
      personalToggle.classList.remove('active');
      employmentToggle.classList.remove('active');
      target.classList.add('active');
  }

  function showContent(targetContent) {
      personalContent.style.display = 'none';
      employmentContent.style.display = 'none';
      targetContent.style.display = 'block';
  }

  personalToggle.addEventListener('click', function() {
      setActive(personalToggle);
      showContent(personalContent);
  });

  employmentToggle.addEventListener('click', function() {
      setActive(employmentToggle);
      showContent(employmentContent);
  });

  // Initialize with the Personal tab content visible
  showContent(personalContent);
});

function toggleEditMode(tab) {
  let inputs, selects, editButton;

  if (tab === 'personal') {
      inputs = document.querySelectorAll('#personalContentViewOnly input');
      selects = document.querySelectorAll('#personalContentViewOnly select');
      editButton = document.getElementById('editPersonalButton');
  } else if (tab === 'employment') {
      inputs = document.querySelectorAll('#employmentContentViewOnly input');
      selects = document.querySelectorAll('#employmentContentViewOnly select');
      editButton = document.getElementById('editEmploymentButton');
  }

  const isReadMode = inputs[0].hasAttribute('readonly');

  inputs.forEach(input => {
      if (isReadMode) {
          input.removeAttribute('readonly');
      } else {
          input.setAttribute('readonly', 'readonly');
      }
  });

  selects.forEach(select => {
      select.disabled = !select.disabled;
  });

  if (isReadMode) {
      editButton.classList.add('edit-mode');
      editButton.textContent = 'Save';
  } else {
      editButton.classList.remove('edit-mode');
      editButton.textContent = 'Edit';
  }
}


// Function to show the form modal
function showForm() {
  var modal = document.getElementById("employeeFormContainer");
  var overlay = document.getElementById("dimOverlay");
  modal.style.display = "block";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Function to close the form modal
function closeForm() {
  var modal = document.getElementById("employeeFormContainer");
  var overlay = document.getElementById("dimOverlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Close the form modal if the overlay is clicked
document.getElementById("dimOverlay").addEventListener("click", closeForm);



// Function to show the View Only form modal
function showViewOnlyForm() {
  var modal = document.getElementById("viewOnlyEmployeeFormContainer");
  var overlay = document.getElementById("dimOverlay");
  modal.style.display = "block";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Function to close the View Only form modal
function closeViewOnlyForm() {
  var modal = document.getElementById("viewOnlyEmployeeFormContainer");
  var overlay = document.getElementById("dimOverlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Ensure the overlay also closes the View Only form modal
document.getElementById("dimOverlay").addEventListener("click", function() {
    closeViewOnlyForm(); // Now also close the view only modal
});


function toggleTab(tabName) {
  // Get all tab content elements
  var personalContent = document.getElementById("personalContentViewOnly");
  var employmentContent = document.getElementById("employmentContentViewOnly");
  
  // Get all tab link elements
  var personalTab = document.getElementById("personalTab");
  var employmentTab = document.getElementById("employmentTab");

  // Reset active class from all tabs
  personalTab.classList.remove("active");
  employmentTab.classList.remove("active");

  // Hide all tab content
  personalContent.classList.remove("active");
  employmentContent.classList.remove("active");

  // Show the selected tab content and set the active class to the clicked tab
  if (tabName === 'personal') {
      personalContent.classList.add("active");
      personalTab.classList.add("active");
  } else if (tabName === 'employment') {
      employmentContent.classList.add("active");
      employmentTab.classList.add("active");
  }
}



// Handle form submission
document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("/add_employee", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Employee added successfully!");
          closeForm(); // Close the modal
          window.location.reload(); // Reload the page to show the updated list
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });

  
document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const triangle = document.querySelector(".triangle");
  const userDropdown = document.querySelector(".user-dropdown");
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.querySelector(".sidebar");
  const sidebarMenuIcon = document.querySelector(".sidebar-menu-icon");
  const dimOverlay = document.querySelector(".dim-overlay");
  const sidebarHeaders = document.querySelectorAll(".sidebar-header");

  // Toggle user dropdown
  triangle.addEventListener("click", function () {
    userDropdown.classList.toggle("active");
  });

  // Toggle sidebar visibility
  menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    dimOverlay.style.display = sidebar.classList.contains("active")
      ? "block"
      : "none";
  });

  // Close sidebar with the sidebar's hamburger icon
  sidebarMenuIcon.addEventListener("click", function () {
    sidebar.classList.remove("active");
    dimOverlay.style.display = "none";
  });

  // Close sidebar when clicking on the dim overlay
  dimOverlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    dimOverlay.style.display = "none";
  });

  // Sidebar submenu toggles
  sidebarHeaders.forEach((header) => {
    if (
      !header.classList.contains("general-ledger-item") &&
      !header.classList.contains("dashboard-item") &&
      !header.classList.contains("employee-directory-item")
    ) {
      header.addEventListener("click", function () {
        this.nextElementSibling.classList.toggle("active");
      });
    }
  });

  // General Ledger submenu toggle
  const generalLedgerHeader = document.querySelector(
    ".sidebar-header.general-ledger-item"
  );
  const generalLedgerSubMenu = generalLedgerHeader.nextElementSibling;

  generalLedgerHeader.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click event from affecting the sidebar
    if (generalLedgerSubMenu.style.display === "flex") {
      generalLedgerSubMenu.style.display = "none"; // Close the submenu
      generalLedgerHeader.classList.remove("active");
    } else {
      generalLedgerSubMenu.style.display = "flex"; // Open the submenu
      generalLedgerHeader.classList.add("active");
    }
  });

  // Account Receivable submenu toggle
  const accountReceivableHeader = document.querySelector(
    ".sidebar-header.account-receivable-item"
  );
  const accountReceivableSubMenu = accountReceivableHeader.nextElementSibling;

  accountReceivableHeader.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click event from affecting the sidebar
    if (accountReceivableSubMenu.style.display === "flex") {
      accountReceivableSubMenu.style.display = "none"; // Close the submenu
      accountReceivableHeader.classList.remove("active");
    } else {
      accountReceivableSubMenu.style.display = "flex"; // Open the submenu
      accountReceivableHeader.classList.add("active");
    }
  });

  // Asset Management submenu toggle
  const assetManagementHeader = document.querySelector(
    ".sidebar-header.asset-management-item"
  );
  const assetManagementSubMenu = assetManagementHeader.nextElementSibling;

  assetManagementHeader.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click event from affecting the sidebar
    if (assetManagementSubMenu.style.display === "flex") {
      assetManagementSubMenu.style.display = "none"; // Close the submenu
      assetManagementHeader.classList.remove("active");
    } else {
      assetManagementSubMenu.style.display = "flex"; // Open the submenu
      assetManagementHeader.classList.add("active");
    }
  });
});

// Function to filter employees based on the search input
function filterEmployees() {
  var input = document.getElementById("search-bar").value.toLowerCase();
  var table = document.querySelector(".employee-table table");
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName("td");
    var found = false;

    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      if (cell.textContent.toLowerCase().includes(input)) {
        found = true;
        break;
      }
    }

    row.style.display = found ? "" : "none";
  }
}

function toggleStatus(element) {
  if (element.classList.contains('active')) {
      element.classList.remove('active');
      element.classList.add('resigned');
      element.textContent = 'Resigned';
  } else {
      element.classList.remove('resigned');
      element.classList.add('active');
      element.textContent = 'Active';
  }
}
function toggleDropdown() {
  var dropdown = document.getElementById("employee-filter-dropdown");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
  } else {
      dropdown.style.display = "none";
  }
}
