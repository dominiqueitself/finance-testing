document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("services-modal");
  var modalTitle = document.getElementById("modal-title");
  var departmentName = document.getElementById("department-name");
  var departmentCode = document.getElementById("department-code");
  var headField = document.getElementById("head-field");
  var contactField = document.getElementById("contact-field");
  var locationField = document.getElementById("location-field");
  var emailField = document.getElementById("email-field");
  var servicesTable = document.querySelector(
    ".service-information-column table tbody"
  ); // Services table body
  var closeModal = document.getElementsByClassName("services-close")[0];
  var body = document.body;

  function openModal(department, id, element) {
    modal.style.display = "block";
    body.classList.add("services-modal-open");

    modalTitle.textContent = department;
    departmentName.textContent = department;
    departmentCode.textContent = id; // Displays the department ID

    // Fetch services based on department ID
    fetch(`/services/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        servicesTable.innerHTML = ""; // Clear the table
        data.forEach((service) => {
          var row = document.createElement("tr");
          row.innerHTML = `
                    <td>${service.service_name}</td>
                    <td>${service.description}</td>
                    <td>${service.cost}</td>
                `;
          servicesTable.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Prepopulate the modal with department details
    headField.value = element.dataset.head;
    contactField.value = element.dataset.contact;
    locationField.value = element.dataset.location;
    emailField.value = element.dataset.email;
  }

  // Add click event listener for department links
  document.querySelectorAll(".department-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openModal(this.dataset.department, this.dataset.id, this); // Pass department ID and data
    });
  });

  closeModal.onclick = function () {
    modal.style.display = "none";
    body.classList.remove("services-modal-open");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      body.classList.remove("services-modal-open");
    }
  };
});




// Toggle the dropdown open and closed
function toggleDropdown() {
  const dropdown = document.querySelector('.services-dropdown');
  dropdown.classList.toggle('active');
}

// Prevent the dropdown from closing when clicking inside it
function preventDropdownClose(event) {
  event.stopPropagation();
}

// Change the right column content based on the selected filter
function showRightColumnContent(item) {
  let rightContent = document.getElementById('services-right-content');
  
  if (item === 'ID') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\'001\')">001</p><p onclick="selectRightContent(\'002\')">002</p><p onclick="selectRightContent(\'003\')">003</p>';
  } else if (item === 'Department') {
      rightContent.innerHTML = '<p onclick="selectRightContent(\'Dental\')">Dental</p><p onclick="selectRightContent(\'Pathology\')">Pathology</p></p><p onclick="selectRightContent(\'Radiology\')">Radiology</p>';
  }
}

// Change the placeholder to the selected right column content
function selectRightContent(content) {
  let placeholderText = document.querySelector('#services-dropdown-placeholder span:first-child');
  placeholderText.textContent = content;

  // Close the dropdown after selection
  document.querySelector('.services-dropdown').classList.remove('active');
}

// Add focus effect when the dropdown is clicked
function toggleDropdown() {
  const dropdown = document.querySelector('.services-dropdown');
  dropdown.classList.toggle('active');
  dropdown.style.borderColor = dropdown.classList.contains('active') ? '#a7a7a7' : '#ccc'; // Toggle border color
}
