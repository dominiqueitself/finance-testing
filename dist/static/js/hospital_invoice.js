async function fetchPatientData() {
  const patientId = document.getElementById("patient-id").value;
  if (!patientId) {
    alert("Please enter a Patient ID.");
    return;
  }
  try {
    const response = await fetch(`/api/patient/${patientId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_API_TOKEN",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("patient-name").value = data.name || "";
    document.getElementById("contact-details").value = data.contact || "";
    document.getElementById("billing-address").value = data.address || "";
    document.getElementById("insurance-info").value = data.insurance || "";
  } catch (error) {
    console.error("Error fetching patient data:", error);
    alert("Error fetching patient data. Please try again.");
  }
}

async function fetchServiceData() {
  const serviceId = document.getElementById("service-id").value;
  if (!serviceId) {
    alert("Please enter a Service ID.");
    return;
  }
  try {
    const response = await fetch(`/api/service/${serviceId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_API_TOKEN",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("service-description").value =
      data.description || "";
    document.getElementById("cost-per-item").value = data.cost || "";
  } catch (error) {
    console.error("Error fetching service data:", error);
    alert("Error fetching service data. Please try again.");
  }
}

async function fetchLogisticsData() {
  const logisticsId = document.getElementById("logistics-id").value;
  if (!logisticsId) {
    alert("Please enter a Logistics ID.");
    return;
  }
  try {
    const response = await fetch(`/api/logistics/${logisticsId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_API_TOKEN",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("logistics-description").value =
      data.description || "";
    document.getElementById("logistics-cost-per-item").value = data.cost || "";
  } catch (error) {
    console.error("Error fetching logistics data:", error);
    alert("Error fetching logistics data. Please try again.");
  }
}

// JavaScript to handle dynamic table rows
function addRow(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector("tbody");

  // Create a new row
  const newRow = document.createElement("tr");

  // Define cell values for each column
  const cells = [
    '<td><input type="text" name="' +
      tableId +
      '_description[]" placeholder="Description"></td>',
    '<td><input type="number" name="' +
      tableId +
      '_quantity[]" placeholder="1"></td>',
    '<td><input type="number" name="' +
      tableId +
      '_cost[]" placeholder="0"></td>',
    '<td><input type="number" name="' +
      tableId +
      '_total[]" placeholder="0" readonly></td>',
    '<td><button type="button" onclick="removeRow(this)">Remove</button></td>',
  ];

  // Append cells to the new row
  cells.forEach((cell) => (newRow.innerHTML += cell));

  // Append the new row to the table body
  tbody.appendChild(newRow);
}

function removeRow(button) {
  const row = button.closest("tr");
  row.parentNode.removeChild(row);
}

function printInvoice() {
  window.print();
}

function sendInvoice() {
  alert("Send invoice functionality not yet implemented.");
}

function resetForm() {
  document.getElementById("invoice-form").reset();
}


    // JavaScript to handle dynamic table rows
    function addRow(tableId) {
      var table = document.getElementById(tableId);
      var newRow = table.insertRow(-1);
      var cells = table.rows[0].cells;
      for (var i = 0; i < cells.length; i++) {
          var cell = newRow.insertCell(i);
          var input = document.createElement('input');
          input.type = 'text';
          input.name = tableId + '_description[]';
          input.placeholder = 'New Item';
          cell.appendChild(input);
      }
      var removeCell = newRow.insertCell(cells.length);
      removeCell.innerHTML = '<button type="button" onclick="removeRow(this)">Remove</button>';
  }

  function removeRow(button) {
      var row = button.parentNode.parentNode;
      row.parentNode.removeChild(row);
  }