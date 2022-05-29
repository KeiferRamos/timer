let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;
let saved = [];
let timerID;

const increment = () => {
  if (seconds < 60) {
    seconds += 1;
  } else {
    seconds = 0;
    minutes += 1;
  }
  if (minutes > 59) {
    seconds = 0;
    minutes = 0;
    hours += 1;
  }
  if (hours > 23) {
    seconds = 0;
    minutes = 0;
    hours = 0;
    days += 1;
  }
};

$(".btn").on("click", ({ target: { classList, textContent } }) => {
  if (classList.value.includes("start")) {
    if (textContent == "start") {
      $(".start").html("pause");
      isRunning = true;
      timer();
      $(".save").removeClass("hide").addClass("show");
    } else if (textContent == "pause") {
      $(".start").html("start");
      clearInterval(timerID);
      isRunning = false;
      $(".save").removeClass("show").addClass("hide");
    }
  } else if (classList.value.includes("reset")) {
    clearInterval(timerID);
    $(".start").html("start");
    saved = [];
    $(".laps").empty();
    seconds = 0;
    minutes = 0;
    hours = 0;
    days = 0;
    displayTime();
    $(".save").removeClass("show").addClass("hide");
  } else if (classList.value.includes("save")) {
    saved.push(
      `${$(".days").html()} : ${$(".hours").html()} : ${$(
        ".minutes"
      ).html()} : ${$(".seconds").html()}`
    );
    displaySaved();
  }
});

const timer = () => {
  timerID = setInterval(() => {
    if (isRunning) {
      increment();
      displayTime();
    }
  }, 1000);
};

function displayTime() {
  $(".time > .seconds").html(seconds > 9 ? seconds : `0${seconds}`);
  $(".time > .minutes").html(minutes > 9 ? minutes : `0${minutes}`);
  $(".time > .hours").html(hours > 9 ? hours : `0${hours}`);
  $(".time > .days").html(days > 9 ? days : `0${days}`);
}

function displaySaved() {
  const saveLaps = saved.map((item, i) => {
    return `
        <div class="lap">
            <span>${i + 1}</span>
            <p>${item}</p>
        </div>`;
  });
  $(".laps").html(saveLaps);
}
