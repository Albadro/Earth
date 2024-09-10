// doc
const DaySpan = document.getElementById("currentDay");
const net = document.getElementById("net");
const Dswitch = document.getElementById("Dswitch"); // view Dimentions switch
const DswitchBox = document.getElementById("DswitchBox");

// vars
let dayDur = 100; // day duration in milli seconds
let currentDay = 0;
let DswitchClickable = true;

// event Listeners

Dswitch.addEventListener("change", (event) => {
    to2d(event.target);
});

// functions
function displayDay() {
    currentDay++;
    DaySpan.innerText = currentDay;
}

function to2d(checkbox) {
    if (DswitchClickable) {
        DswitchClickable = false;
        if (checkbox.checked) {
            net.classList.add("d2");
        } else {
            net.classList.remove("d2");
        }
        net.classList.add("freeze");
        setTimeout(() => {
            net.classList.remove("freeze");
            currentDay = 0;
            displayDay();
            DswitchClickable = true;
        }, 1);
    }
}

//code
setInterval(displayDay, dayDur);
