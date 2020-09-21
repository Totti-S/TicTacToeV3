import "./styles.css";
// jQuary things are nice
var $ = function (id) {
  return document.getElementById(id);
};

// First we make the gameboard, timebar and misc setup
var board = document.createElement("div");
board.classList.add("container");
document.body.append(board);
var table = document.createElement("div");
table.classList.add("gameboard");

var size = 5; // How large is our board (X*X)
var activePlayer = "X";
var bar = document.createElement("div");
bar.classList.add("progress");
bar.style.height = "20px";

document.body.append(bar);

// Timer for game stalling reasons. Every 10s, if move isn't made, other player gets turn
var time = 0;
var timer = setInterval(() => {
  bar.style.width = String(time + "%");
  if (time === 100) {
    if (activePlayer === "X") {
      activePlayer = "O";
    } else {
      activePlayer = "X";
    }
    time = 0;
  }
  time += 10;
}, 1000);

board.id = "TicTacToe";
board.appendChild(table);

// After making the game board, we make 5x5 cells
for (let i = 0; i < size; i++) {
  var row = document.createElement("div");
  row.classList.add("row");

  var firstCell = document.createElement("div");
  firstCell.classList.add("col", "s2", "offset-s1");
  firstCell.addEventListener("click", function () {
    move(this);
  });
  firstCell.id = String(i) + "0";
  row.appendChild(firstCell);

  for (let j = 1; j < size; j++) {
    var cell = document.createElement("div");
    cell.classList.add("col", "s2");
    cell.addEventListener("click", function () {
      move(this);
    });
    cell.id = String(i) + String(j);
    row.appendChild(cell);
  }

  table.appendChild(row);
}

function move(cell) {
  cell.innerHTML = activePlayer;
  if (activePlayer === "X") {
    activePlayer = "O";
    cell.classList.add("x");
  } else {
    activePlayer = "X";
    cell.classList.add("o");
  }
  time = 0;
  doWeHaveWinner();
}

function doWeHaveWinner() {
  // Horizontal wincheck
  for (let i = 0; i < size; i++) {
    let checker = 0;
    for (let j = 0; j < size; j++) {
      let cell = $(String(i) + String(j));

      if (checker === 0) {
        if (cell.innerHTML === "") {
          break;
        } else if (cell.innerHTML === "X") {
          checker = 1;
          continue;
        } else {
          checker = 2;
          continue;
        }
      } else if (checker === 1) {
        if (cell.innerHTML === "O" || cell.innerHTML === "") {
          break;
        }
      } else {
        if (cell.innerHTML === "X" || cell.innerHTML === "") {
          break;
        }
      }
      if (j === 4) {
        alert("Player " + String(checker) + " won!");
        clearTimeout(timer);
        break;
      }
    }
  }
  // Vertical check, only cell indcies are changed
  for (let i = 0; i < size; i++) {
    let checker = 0;
    for (let j = 0; j < size; j++) {
      let cell = $(String(j) + String(i));

      if (checker === 0) {
        if (cell.innerHTML === "") {
          break;
        } else if (cell.innerHTML === "X") {
          checker = 1;
          continue;
        } else {
          checker = 2;
          continue;
        }
      } else if (checker === 1) {
        if (cell.innerHTML === "O" || cell.innerHTML === "") {
          break;
        }
      } else {
        if (cell.innerHTML === "X" || cell.innerHTML === "") {
          break;
        }
      }
      if (j === 4) {
        alert("Player " + String(checker) + " won!");
        clearTimeout(timer);
        break;
      }
    }
  }
  // UpLeft to DownRight Diagonial check
  let checker = 0;
  for (let i = 0; i < size; i++) {
    let cell = $(String(i) + String(i));
    if (checker === 0) {
      if (cell.innerHTML === "") {
        break;
      } else if (cell.innerHTML === "X") {
        checker = 1;
        continue;
      } else {
        checker = 2;
        continue;
      }
    } else if (checker === 1) {
      if (cell.innerHTML === "O" || cell.innerHTML === "") {
        break;
      }
    } else {
      if (cell.innerHTML === "X" || cell.innerHTML === "") {
        break;
      }
    }
    if (i === 4) {
      alert("Player " + String(checker) + " won!");
      clearTimeout(timer);
      break;
    }
  }
  // DownLeft to UpRight Diagonial check
  checker = 0;
  for (let i = 0; i < size; i++) {
    let cell = $(String(i) + String(4 - i));
    if (checker === 0) {
      if (cell.innerHTML === "") {
        break;
      } else if (cell.innerHTML === "X") {
        checker = 1;
        continue;
      } else {
        checker = 2;
        continue;
      }
    } else if (checker === 1) {
      if (cell.innerHTML === "O" || cell.innerHTML === "") {
        break;
      }
    } else {
      if (cell.innerHTML === "X" || cell.innerHTML === "") {
        break;
      }
    }
    if (i === 4) {
      alert("Player " + String(checker) + " won!");
      clearTimeout(timer);
      break;
    }
  }
}

console.log(board);
console.log(bar);
