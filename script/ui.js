// doc
const DaySpan = document.getElementById("currentDay");
const net = document.getElementById("net");
const Dswitch = document.getElementById("Dswitch"); // view Dimentions switch
const DswitchBox = document.getElementById("DswitchBox");
const OOBs = document.querySelectorAll(".object-box:not(.center)"); // Orbitting Object Boxes

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
            OOBs.forEach((objectBox) => {
                const facingAni = objectBox
                    .querySelector(".object")
                    .getAnimations()[0];
                facingAni.playbackRate = -1;
                facingAni.pause();
                facingAni.currentTime =
                    facingAni.effect.getComputedTiming().duration;
            });
        } else {
            net.classList.remove("d2");
            OOBs.forEach((objectBox) => {
                const orbitAni = objectBox
                    .querySelector(".orbitor")
                    .getAnimations()[0];
                const facingAni = objectBox
                    .querySelector(".object")
                    .getAnimations()[0];
                facingAni.playbackRate = 1;
                facingAni.currentTime = orbitAni.currentTime;
                facingAni.play();
            });
        }

        setTimeout(() => {
            DswitchClickable = true;
        }, 300);
    }
}

//code
setInterval(displayDay, dayDur);
