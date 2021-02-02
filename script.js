// form elements
const countDownForm = document.getElementById("count-down-form");
const formContainer = document.getElementById("from-container");
const dateElement = document.getElementById("date");

// count down elements
const countDownContainer = document.getElementById("count-down-container");
const countDownTitle = document.getElementById("count-down-title");
const timeElements = document.querySelectorAll(".box h1");
const reset = document.getElementById("reset");
var leftTime = 0;
var countDownDate = new Date();
var title = "";
var clearUpdateTime;

// complete elements
const completeContainer = document.getElementById("complete-container");
const finished = document.getElementById("finished");
const newCountDown = document.getElementById("new-count-down");

function getLeftTime(time) {
  var days = Math.floor(time / 1000 / 60 / 60 / 24);
  var hours = Math.floor(time / 1000 / 60 / 60) % 24;
  var minutes = Math.floor(time / 1000 / 60) % 60;
  var seconds = Math.floor(time / 1000) % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

// update time dom elements
function updateTimeElements(time) {
  timeElements[0].textContent = time.days;
  timeElements[1].textContent = time.hours;
  timeElements[2].textContent = time.minutes;
  timeElements[3].textContent = time.seconds;
}

//excuted every second
function updateTime() {
  if (leftTime === 0) {
    completeContainer.hidden = false;
    countDownContainer.hidden = true;
    finished.textContent = countDownDate;
    clearInterval(clearUpdateTime);
    localStorage.removeItem("countDownDate");
  } else {
    leftTime -= 1000;
    updateTimeElements(getLeftTime(leftTime));
  }
}

function setCountDown() {
  formContainer.hidden = true;
  countDownContainer.hidden = false;
  updateTimeElements(getLeftTime(leftTime));
  clearUpdateTime = setInterval(updateTime, 1000);
}

// create countdown event listner

function countDownHandler(event) {
  event.preventDefault();
  title = event.srcElement.elements[0].value;
  event.srcElement.elements[0].value = "";
  countDownTitle.textContent = title;
  countDownDate = event.srcElement.elements[1].value;
  if (!countDownDate || !title) {
    return alert("please enter a valid Informations");
  }
  event.srcElement.elements[1].value = "";
  leftTime = new Date(countDownDate) - new Date() - 3600000;
  if (leftTime <= 0) {
    completeContainer.hidden = false;
    countDownContainer.hidden = true;
  } else {
    localStorage.setItem("countDownDate", countDownDate);
    setCountDown();
  }
}
// resset button event listner

function resetCountDownHandler() {
  leftTime = 0;
  formContainer.hidden = false;
  countDownContainer.hidden = true;
  clearInterval(clearUpdateTime);
  localStorage.removeItem("countDownDate");
}

// new button event listner
function newCountDownHandler() {
  leftTime = 0;
  completeContainer.hidden = true;
  formContainer.hidden = false;
  localStorage.removeItem("leftTime");
}

// Event Listners

countDownForm.addEventListener("submit", countDownHandler);
reset.addEventListener("click", resetCountDownHandler);
newCountDown.addEventListener("click", newCountDownHandler);

const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute("min", today);

if (localStorage.getItem("countDownDate")) {
  countDownDate = localStorage.getItem("countDownDate");
  leftTime = new Date(countDownDate) - new Date() - 3600000;
  setCountDown();
}
