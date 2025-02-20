// data
const currentDate = new Date();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var FebruaryDays = [];

// get data from data_base.txt
async function loadFebruaryDays() {
    // try {
    //     const response = await fetch('data_base.txt'); // Load the file
    //     const text = await response.text(); // Read file contents


    //     FebruaryDays = text
    //         .trim()
    //         .split("\n") // Split lines
    //         .map(line => {
    //             const parts = line.split("##"); // Split by delimiter
    //             return {
    //                 id: parseInt(parts[0]),
    //                 date: parts[1],
    //                 location: parts[2],
    //                 workStart: parts[3],
    //                 workFinish: parts[4],
    //                 description: parts[5]
    //             };
    //         });

        
    //     console.log(FebruaryDays); // Debugging: Check parsed data
    //     renderDays();

    // } catch (error) {
    //     console.error("Error loading data:", error);
    // }
}


// calendar days
window.addEventListener("DOMContentLoaded", function() {
    loadFebruaryDays();
    var h1 = document.getElementById("monthYear");

    // header month and year
    var month = months[currentDate.getMonth()];
    var year = currentDate.getFullYear();
    h1.innerHTML = month + " " + year;

    // february calendar days
    renderDays();
  });

// render days
function renderDays() {
var ul = document.getElementById("listOfFebruaryDays");

ul.innerHTML = "";
FebruaryDays.forEach(day => {
    const li = document.createElement("li");
    li.innerHTML = `<p class="DayCss">${day.date.split("-")[0]}</p>
                    ${day.workStart} - ${day.workFinish}`;
    li.addEventListener("click", () => openModal(day));
    ul.appendChild(li);
});
}

// Modal 
  function openModal(day) {
    document.getElementById("editDate").innerHTML = day.date;
    document.getElementById("editLocation").value = day.location;
    document.getElementById("editWorkStart").value = day.workStart;
    document.getElementById("editWorkFinish").value = day.workFinish;
    document.getElementById("editDescription").value = day.description;

    document.getElementById("editModal").style.display = "block";

    // Save button functionality
    document.getElementById("saveButton").onclick = function() {
      saveChanges(day);
    };

    // Close the modal
    document.getElementById("closeModal").onclick = function() {
      closeModal();
    };
  }

// Save the edited data
  function saveChanges(day) {
    day.location = document.getElementById("editLocation").value;
    day.workStart = document.getElementById("editWorkStart").value;
    day.workFinish = document.getElementById("editWorkFinish").value;
    day.description = document.getElementById("editDescription").value;


    closeModal();

    // Re-render the list to reflect changes
    ul.innerHTML = ''; // Clear existing list
    FebruaryDays.forEach(day => {
      var li = document.createElement("li");
      const dayOfMonth = day.date.split("-")[0];
      li.innerHTML = `Day ${dayOfMonth}: ${day.workStart} - ${day.workFinish}`;
      li.addEventListener('click', function() {
        openModal(day);
      });
      ul.appendChild(li);
    });
  }

// Close the modal without saving
  function closeModal() {
    document.getElementById("editModal").style.display = "none";
  }


  


