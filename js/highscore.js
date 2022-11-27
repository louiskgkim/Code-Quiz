/*
Get previous scores from local storage or set it to an empty array. Then sort
by score property in descending order and create li tags for each highscore
Got some assistance with this in https://blog.logrocket.com/localstorage-javascript-complete-guide/
*/
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printHighscores();