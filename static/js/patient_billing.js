function printReceipt(billId) {
  var receiptDate = document.getElementById("receipt-date");
  var receiptDetails = document.getElementById("receipt-details");
  var totalDue = document.getElementById("total-due");
  var paymentsMade = document.getElementById("payments-made");
  var outstandingBalance = document.getElementById("outstanding-balance");
  var receiptContainer = document.getElementById("receipt-container");

  var billRow = document.getElementById(billId + "-details");
  var cells = billRow.querySelectorAll(".billing-details table tbody tr");

  receiptDate.innerText = "Date: " + billRow.querySelector("td").innerText;

  receiptDetails.innerHTML = "";
  let totalDueAmount = 0;
  let paymentsMadeAmount = 0;
  let outstandingAmount = 0;

  cells.forEach(function (cell) {
    var description = cell.children[0].innerText;
    var details = cell.children[1].innerText;
    var quantity = cell.children[2].innerText;
    var unitCost = cell.children[3].innerText;
    var totalCost = cell.children[4].innerText;

    var row = receiptDetails.insertRow();
    row.insertCell(0).innerText = description;
    row.insertCell(1).innerText = details;
    row.insertCell(2).innerText = quantity;
    row.insertCell(3).innerText = unitCost;
    row.insertCell(4).innerText = totalCost;

    totalDueAmount += parseFloat(totalCost.replace("₱", "").replace(",", ""));
  });

  totalDue.innerText = "₱" + totalDueAmount.toFixed(2);
  paymentsMade.innerText = "₱" + paymentsMadeAmount.toFixed(2);
  outstandingBalance.innerText = "₱" + outstandingAmount.toFixed(2);

  receiptContainer.style.display = "block";

  // Use setTimeout to ensure the container is visible before printing
  setTimeout(function () {
    window.print();
    receiptContainer.style.display = "none"; // Hide receipt container after printing
  }, 100); // Adjust timeout if necessary
}
