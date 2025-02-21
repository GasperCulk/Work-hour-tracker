import { loadWorkDays } from './data_handler.js';

// data
const currentDate = new Date();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var FebruaryDays = [];
var MarchDays = [];
var AprilDays = [];





// calendar days
window.addEventListener("DOMContentLoaded", async function() {

    FebruaryDays = await loadWorkDays('./dataFeb.json');  
    MarchDays    = await loadWorkDays('./dataMar.json');    
    AprilDays    = await loadWorkDays('./dataApr.json');    

    var hFeb = document.getElementById("monthYearFeb");
    var hMar = document.getElementById("monthYearMar");
    var hApr = document.getElementById("monthYearApr");


    // header month and year
    var year = currentDate.getFullYear();
    hFeb.innerHTML = months[1] + " " + year;
    hMar.innerHTML = months[2] + " " + year;
    hApr.innerHTML = months[3] + " " + year;

    // month calendar days
    renderDays("listOfFebruaryDays", FebruaryDays, "sumFeb");
    renderDays("listOfMarchDays", MarchDays, "sumMar");
    renderDays("listOfAprilDays", AprilDays, "sumApr");

  });




// render days
function renderDays(elementIdOfList, arrayOfMonthDays, sumMonth) {

  var ul = document.getElementById(elementIdOfList);
  var sumHours = document.getElementById(sumMonth);

  var sum = 0;
  ul.innerHTML = "";

  arrayOfMonthDays.forEach(day => {

    var workInMinutes = calculateWorkigHours(day.workStart, day.workFinish);
    sum+= workInMinutes;
    var workInHours = Math.floor(workInMinutes / 60) + "h " + workInMinutes % 60 + "min";

    const li = document.createElement("li");
    if (day.workStart == "" || day.workFinish == "") {
      li.innerHTML = `<p class="DayNumber">${day.id}</p><p>  <br>  </p>${day.date.split("-")[0]}`;
    } else {
      li.innerHTML = `<p class="DayNumber">${day.id}</p><p>${day.workStart} - ${day.workFinish}<br>${workInHours}</p>${day.date.split("-")[0]}`;
      li.classList.add("pastDays");
    }
    li.addEventListener("click", () => openModal(day));
    ul.appendChild(li);
  });

  // sum of all working hours
  sumHours.innerHTML='Skupne ure: '+ Math.floor(sum / 60) + "h " + sum % 60 + "min";
}




// calculate workig hours [min]
function calculateWorkigHours(timeStart, timeFinish) {
  if (timeStart == "" || timeFinish == "") {
    return 0;
  }

  const [startHour, startMin] = timeStart.split(":").map(Number);
  const [endHour, endMin] = timeFinish.split(":").map(Number);

  const startTotal = startHour * 60 + startMin;
  const endTotal = endHour * 60 + endMin;

  return endTotal - startTotal; // Work duration in minutes
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
    renderDays();
  }

  // Close the modal without saving
  function closeModal() {
    document.getElementById("editModal").style.display = "none";
  }


  


