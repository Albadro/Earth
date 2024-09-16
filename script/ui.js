// doc
const DaySpan = document.getElementById("currentDay");
const net = document.getElementById("net");
const Dswitch = document.getElementById("Dswitch"); // view Dimentions switch
const DswitchBox = document.getElementById("DswitchBox");
const OOBs = document.querySelectorAll(".object-box:not(.center)"); // Orbitting Object Boxes

// vars
let dayDur = 500; // day duration in milli seconds
let currentDay = 0;
let DswitchClickable = true;
let ows = [100];
let ws = [100];
// objects
const moon = {
    name: "moon",
    od: 27.321661, // object orbit duratio in days
    ow: "15em", // the diameter of the orbit
    w: "2em",
    imgPath: `imgs/moon.png`,
};

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

function addObject(object) {
    const ow = randOW();
    object.name = object.name + ow;
    // Create the objectBox div
    const objectBox = document.createElement("div");
    objectBox.className = `object-box orbit ${object.name}`;
    // Create the orbitor div
    const orbitor = document.createElement("div");
    orbitor.className = "orbitor";
    // Create the orbited div
    const orbited = document.createElement("div");
    orbited.className = "orbited";
    // Create the stand div
    const stand = document.createElement("div");
    stand.className = "stand";
    // Create the object div
    const objectDiv = document.createElement("div");
    objectDiv.id = object.name;
    objectDiv.className = "object";
    // Append the elements in the correct order
    stand.appendChild(objectDiv);
    orbited.appendChild(stand);
    orbitor.appendChild(orbited);
    objectBox.appendChild(orbitor);
    net.appendChild(objectBox);

    const style = document.createElement("style");

    const rules = `
        .${object.name}.orbit {
            --od: ${object.od * dayDur}ms;
            width: ${ow}em;
            height: ${ow}em;
        }
        #${object.name} {
            width: ${object.w};
            height: ${object.w};
            background-image: url(${object.imgPath});
            background-size: 125%;
            background-position: 50% 55%;
        }
    `;
    style.innerHTML = rules;
    document.head.appendChild(style);
}

function randOW() {
    // returns an orbit width for new objects
    if (ows.length > 30) {
        // checks if there is space for a new orbit
        console.error("Too many objects to create");
        return;
    }
    let val;
    let valid = true;
    while (true) {
        valid = true;
        val = Math.floor(Math.random() * 61) + 20;
        for (let ow of ows) {
            // ensure that the orbit is away from other orbits
            if (Math.abs(val - ow) <= 2) {
                // the range
                valid = false;
                break;
            }
        }
        if (valid) {
            ows.push(val);
            return val;
        }
    }
}

//code

setInterval(displayDay, dayDur);
setTimeout(() => {
    for (let i = 0; i < 11; i++) {
        setTimeout(() => {
            addObject(moon);
        }, 500 * i);
    }
}, 1000);

//
// addObject(moon);
