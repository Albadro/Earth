// doc
const DaySpan = document.getElementById("currentDay");
const net = document.getElementById("net");
const Dswitch = document.getElementById("Dswitch"); // view Dimentions switch
const DswitchBox = document.getElementById("DswitchBox");
const OOBs = document.querySelectorAll(".object-box:not(.center)"); // Orbitting Object Boxes
const infoBox = document.getElementById("info");
const main = document.getElementById("main");

// vars
let dayDur = 1111; // day duration in milli seconds
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
net.addEventListener("mouseover", (event) => {
    // for hovering orbiting objects
    const trgt = event.target;
    if (
        trgt.classList.contains("object") &&
        !trgt.classList.contains("center")
    ) {
        objectHov(trgt);
    }
});
net.addEventListener("mouseout", (event) => {
    // for unhovering orbiting objects
    const trgt = event.target;
    if (
        trgt.classList.contains("object") &&
        !trgt.classList.contains("center")
    ) {
        objectUnhov(trgt);
    }
});

net.addEventListener("click", (event) => {
    // for unhovering orbiting objects
    const trgt = event.target;
    if (
        trgt.classList.contains("object") &&
        !trgt.classList.contains("center")
    ) {
        objectClick(trgt);
    }
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
    net.appendChild(objectBox);
    objectBox.appendChild(orbitor);
    orbitor.appendChild(orbited);
    orbited.appendChild(stand);
    stand.appendChild(objectDiv);

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
    if (ows.length > 19) {
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
            if (Math.abs(val - ow) <= 4) {
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

function objectHov(object) {
    const box = object.closest(".object-box");
    box.classList.add("hov");
    box.style.setProperty("--content", `"${object.id}"`);
    //
}
function objectUnhov(object) {
    object.closest(".object-box").classList.remove("hov");
}

function objectClick(object) {
    // the parameter gotta be used to pass info of the specific object
    infoBox.classList.toggle("show");
    main.classList.toggle("info");
    console.log(main.classList);
    console.log(infoBox.classList);
}

//code
// addObject(moon);
window.onload = function () {
    //code starrts here
    setInterval(displayDay, dayDur);
    setTimeout(() => {
        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                addObject(moon);
            }, 100 * i);
        }
    }, 1000);
};
