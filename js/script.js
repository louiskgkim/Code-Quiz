// DOM Elements
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#time");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Quiz Screen Variables
var currentQuestionIndex = 0;
var timeLeft = questions.length * 15;
var timerId;

/*
Landing page where everything is hidden until start button is clicked.
Once clicked, questions will be unhidden and timer begins
*/
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = timeLeft;

  getQuestion();
}

/* 
Grabs questions from array while updating the title and clearing out old
question choices. A loop was added to create a new button for each choice
*/
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  
  currentQuestion.choices.forEach(function (choice, i) {
    var option = document.createElement("button");
    option.setAttribute("class", "choice");
    option.setAttribute("value", choice);

    option.textContent = i + 1 + ". " + choice;

    option.onclick = questionClick;

    choicesEl.appendChild(option);
  });
}

/* 
Checks if user guessed incorrectly and penalizes time if they did while displaying
the new time on the page. It should flash whether the answer was correct or incorrect 
and proceed to the next question.
*/
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }

    timerEl.textContent = timeLeft;
    feedbackEl.textContent = "Incorrect!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

/* 
Quiz ends and timer stops where the end screen will display with the final score
and any further questions hidden from being shown.
*/
function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = timeLeft;

  questionsEl.setAttribute("class", "hide");
}

/* 
Time being updated and checking if the user ran out of time.
*/
function clockTick() {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (time <= 0) {
    quizEnd();
  }
}

/* 
Save final score ot local storage or if not any, set to an empty array.
Page will then redirect to the highscore page.
*/
function saveHighscore() {

  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: timeLeft,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscore.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;