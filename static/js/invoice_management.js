// Toggle the dropdown visibility
function toggleDropdown() {
    var dropdown = document.getElementById("dropdownContent");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('#invoiceFilter')) {
        var dropdowns = document.getElementsByClassName("invoice-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
}

function togglePopup() {
    var popup = document.getElementById("popupBox");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  }
  