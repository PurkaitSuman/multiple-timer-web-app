document.addEventListener("DOMContentLoaded", function () {
  updateTimerDisplay("hh : mm : ss");
});

function isValidInput(input) {
  return /^\d+$/.test(input) && parseInt(input, 10) >= 0;
}

function startNewTimer() {
  let hours = parseInt(prompt("Enter hours:", 0), 10);
  let minutes = parseInt(prompt("Enter minutes:", 0), 10);
  let seconds = parseInt(prompt("Enter seconds:", 0), 10);
  if (
    isValidInput(hours) != 0 &&
    isValidInput(minutes) != 0 &&
    isValidInput(seconds) != 0
  ) {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    updateTimerDisplay(formatTime(totalSeconds));

    let timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.innerHTML = `
        <div class="card-text">Set Time :</div>
        <div class="timer-display">${formatTime(totalSeconds)}</div>
        <div class="btn"><button class="stop-btn" onclick="stopTimer(this)">Stop</button></d9v>
        `;

    document.getElementById("active-timers").appendChild(timerElement);

    timerElement.intervalId = setInterval(function () {
      if (totalSeconds <= 0) {
        clearInterval(timerElement.intervalId);
        timerElement.classList.add("timer-ended");

        let stopButton = timerElement.querySelector(".stop-btn");
        stopButton.classList.remove("stop-btn");
        stopButton.classList.add("after-zero");
        timerElement.innerHTML = `
            <p class="after-zero-text">Timer Is Up !</p>
            <div class="btn"><button class="after-zero" onclick="stopTimer(this)">Delete</button></div>
        `;
        playAudioAlert();
      } else {
        totalSeconds--;
        timerElement.querySelector(".timer-display").innerText =
          formatTime(totalSeconds);
      }
    }, 1000);
  } else {
    return;
  }
}

const audioAlert = new Audio("alarm.mp3");
function playAudioAlert() {
  audioAlert.play();
}

function pauseAudioAlert() {
  audioAlert.pause();
}

function updateTimerDisplay(timeString) {
  document.getElementById("timer-display").innerText = timeString;
}

function stopTimer(button) {
  let timerElement = button.parentElement;
  clearInterval(timerElement.intervalId);
  timerElement.parentElement.remove();
  pauseAudioAlert();
}

function showActiveTimers() {
  let activeTimersContainer = document.getElementById("active-timers");

  activeTimersContainer.innerHTML = "";

  let activeTimerElements = document.querySelectorAll(".timer");

  if (activeTimerElements.length === 0) {
    activeTimersContainer.innerHTML = "<p>You have no timers currently active timers.</p>";
    return;
  }

  activeTimerElements.forEach((timerElement, index) => {
    let timerDisplay = timerElement.querySelector(".timer-display").innerText;

    let timerInfo = document.createElement("div");
    timerInfo.classList.add("timer-info");
    timerInfo.innerHTML = `
            <p><strong>Timer ${index + 1}:</strong> ${timerDisplay}</p>
        `;

    activeTimersContainer.appendChild(timerInfo);
  });
}

function formatTime(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${padZero(hours)} : ${padZero(minutes)} : ${padZero(seconds)}`;
}

function padZero(number) {
  return number < 10 ? "0" + number : number;
}
