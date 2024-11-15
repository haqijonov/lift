const floorNumber = document.querySelectorAll(".floor-number");
const elevator = document.querySelector(".elevator");
const floor = document.querySelectorAll(".floor");
const elevatorIndicator = document.querySelectorAll(".elevator-indicator");
const buttonUp = document.querySelectorAll(".button-up");
const buttonDown = document.querySelectorAll(".button-down");
let currentFloor = 1;
let targetFloors = [];
let direction = null;

Array.from(buttonUp)
  .reverse()
  .forEach((button, index) => {
    button.addEventListener("click", () => {
      addToQueue(index + 1, "up");
    });
  });

Array.from(buttonDown)
  .reverse()
  .forEach((button, index) => {
    button.addEventListener("click", () => {
      addToQueue(index + 1, "down");
    });
  });

floorNumber.forEach((button, index) => {
  button.addEventListener("click", () => {
    addToQueue(index + 1);
  });
});

function addToQueue(floor, dir = null) {
  if (!targetFloors.includes(floor)) {
    targetFloors.push(floor);
    targetFloors.sort((a, b) => (direction === "up" ? a - b : b - a));
  }
  if (!direction) {
    direction = dir || (floor > currentFloor ? "up" : "down");
    moveElevator();
  }
}

function moveElevator() {
  if (targetFloors.length === 0) {
    direction = null;
    return;
  }

  const nextFloor = targetFloors.shift();
  const moveTime = Math.abs(nextFloor - currentFloor) * 500;

  elevator.style.transform = `translateY(${-(nextFloor - 1) * 135}px)`;
  elevatorIndicator.forEach((indicator) => {
    indicator.textContent = ` ${nextFloor}`;
  });

  setTimeout(() => {
    currentFloor = nextFloor;
    moveElevator();
  }, moveTime);
}

function updateIndicators() {
  elevatorIndicator.forEach((indicator) => {
    indicator.textContent = `Hozirgi qavat: ${currentFloor}`;
  });
}
