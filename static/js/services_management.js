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
