let currentFloor = 1;
let queue = [];

const elevator = document.querySelector(".elevator");
const floorButtons = document.querySelectorAll(".button");
const floorCounters = document.querySelectorAll(".floor-counter");
const qavatlar = document.querySelectorAll(".qavatlar");

const floorHeight = 187;
function moveToFloor(targetFloor) {
  if (!queue.includes(targetFloor)) {
    queue.push(targetFloor);
    queue.sort((a, b) => a - b);
  }

  processQueue();
}

function processQueue() {
  if (queue.length === 0) return;

  const nextFloor = queue[0];
  const distance = floorHeight * (nextFloor - 1);

  elevator.style.transform = `translateY(-${distance}px)`;

  currentFloor = nextFloor;

  queue.shift();

  updateFloorCounters();

  setTimeout(() => {
    if (queue.length > 0) processQueue();
  }, 1000);
}

floorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonContainer = event.target.closest(".wrapper-floor");
    const targetFloor = parseInt(buttonContainer.id);
    moveToFloor(targetFloor);
  });
});

qavatlar.forEach((button, index) => {
  button.addEventListener("click", () => {
    const targetFloor = index + 1;
    moveToFloor(targetFloor);
  });
});

function updateFloorCounters() {
  floorCounters.forEach((counter) => {
    counter.textContent = ` ${currentFloor}`;
  });
}

updateFloorCounters();
